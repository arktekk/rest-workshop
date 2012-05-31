var http = require('http')
  , url = require('url')
  , util = require('util')
  , mongoose = require('mongoose');

var Grid = mongoose.mongo.Grid;
var GridStore = mongoose.mongo.GridStore;
var ObjectID = mongoose.mongo.ObjectID;

var Ad = new mongoose.Schema({
    title    : String
  , body     : String
  , pictures : [String]
});

var Db = {
  Ad: mongoose.model('Ad', Ad)
};

function assertContentType(req, res) {
  var ct = req.headers['content-type'] || '';
  if('application/json' == ct.toLowerCase()) {
    return true;
  }
  var txt = 'You have to post application/json';
  res.writeHead(415, txt, {'Content-Type': 'text/plain'});
  res.write(txt);
  res.write('\n');
  res.end();
  return false;
}

function assertMethod(req, res, method) {
  if(method == req.method) {
    return true;
  }
  var txt = 'Illegal method, you can only use: ' + method
  res.writeHead(405, txt, {'Content-Type': 'text/plain', 'Allow': method});
  res.write(txt);
  res.write('\n');
  res.end();
  return false;
}

function assertAccept(req, res, method) {
  console.log('req.headers.accept', typeof req.headers.accept, req.headers.accept);
  console.log('req.headers.accept', typeof req.headers.accept === 'undefined');
  if(typeof req.headers.accept === "undefined" ||
     req.headers.accept == 'application/json' ||
     req.headers.accept == '*/*') {
    return true;
  }
  var txt = 'Illegal accept, you can only use application/json';
  res.writeHead(406, txt, {'Content-Type': 'text/plain'});
  res.write(txt);
  res.write('\n');
  res.end();
  return false;
}

var seq = 0;
mongoose.connect('mongodb://localhost/02-basic-http', function() {
  var db = mongoose.connection.db
  http.createServer(function(req, res) {
    seq++;
    console.log(seq + ':' + req.method + ' ' + req.url);
    console.log(seq + ':' + util.inspect(req.headers));
    var u = url.parse(req.url, true);
    if(u.pathname == "/create-ad") {
      if(assertMethod(req, res, 'POST')) {
        if(assertContentType(req, res)) {
          var s = "";
          req.on('data', function(chunk) {
            s += chunk;
          });
          req.on('end', function() {
            var payload = JSON.parse(s);
            var ad = new Db.Ad();
            ad.title = payload.title;
            ad.body = payload.body;
            ad.save();
            console.log(seq + ':' + util.inspect(payload));
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({ id: ad._id }));
            res.end("\n");
          });
        }
      }
    } else if(u.pathname == "/ad") {
      console.log(seq + ': id=' + u.query.id);
      if(assertMethod(req, res, 'GET')) {
        if(assertAccept(req, res)) {
          console.log(seq + ':' + '/ad, yo');
          req.on('end', function() {
            console.log(seq + ':' + 'end');
            Db.Ad.findOne({_id: u.query.id}, function(err, doc) {
              console.log(seq + ':' + 'findOne');
              if(err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.write(JSON.stringify(err.message));
              }
              else if(doc == null) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.write("Unknown ad: " + u.query.id);
              }
              else {
                res.write(JSON.stringify({ result: "ok", data: doc}));
              }
              res.end("\n");
            });
          });
        }
      }
    } else if(u.pathname == "/add-picture") {
      var failed = false;
      var id = u.query.adId;
      var fileId = new ObjectID();
      var store = new GridStore(db, fileId, 'w');
      req.pause();
      store.open(function(err, store) {
        req.on('data', function(chunk) {
          store.write(chunk, function(err, gridStore) {
            if(err) failed = true;
          });
        });
        req.on('end', function() {
          store.close(function(err) {
            if(failed || err) {
              res.write(JSON.stringify({result: "failed"}));
              res.end();
            }
            else {
              var cmd = {$push: {pictures: fileId}}
              Db.Ad.update({_id: id}, cmd, {}, function(err, numAffected) {
                if(failed)
                  res.write(JSON.stringify({result: "failed"}));
                else if(numAffected != 1)
                  res.write(JSON.stringify({result: "notFound", woot: "numAffected=" + numAffected}));
                else
                  res.write(JSON.stringify({result: "ok", data: {fileId: fileId}}));
                res.end();
              });
            }
          });
        });
        req.resume();
      });
    } else {
      req.on('end', function() {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write("Not found\n");
        res.end();
      });
    }
  }).listen(3000)
console.log("Running!");
});
