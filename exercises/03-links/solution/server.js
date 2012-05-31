var http = require('http')
  , url = require('url')
  , util = require('util')
  , restUtil = require('../../lib/rest-util.js')
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

function assertContentTypeAd(req, res) {
  assertContentType(req, res, 'application/vnd.ad+json');
}

function assertContentTypeAdList(req, res) {
  assertContentType(req, res, 'application/vnd.ad-list+json');
}

function assertContentType(req, res, type) {
  var ct = req.headers['content-type'] || '';
  if(type == ct.toLowerCase()) {
    return true;
  }
  var txt = 'You have to post ' + type;
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

mongoose.connect('mongodb://localhost/03-links', function() {
  var db = mongoose.connection.db
  http.createServer(function(req, res) {
    restUtil.logRequest(req);
    var u = url.parse(req.url, true);
    if(u.pathname == "/create-ad") {
      if(assertMethod(req, res, 'POST')) {
        if(assertContentTypeAd(req, res)) {
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
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({ id: ad._id }));
            res.end("\n");
          });
        }
      }
    } else if(u.pathname == "/ad") {
      if(assertMethod(req, res, 'GET')) {
        if(assertAccept(req, res)) {
          req.on('end', function() {
            Db.Ad.findOne({_id: u.query.id}, function(err, doc) {
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
    } else if(u.pathname == "/ads") {
      if(assertMethod(req, res, 'GET')) {
        if(assertAccept(req, res)) {
          req.on('end', function() {
            Db.Ad.find({}).exec(function(err, docs) {
              if(err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.write(JSON.stringify(err.message));
              }
              else if(docs == null) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.write("Unknown ad: " + u.query.id);
              }
              else {
                res.write(JSON.stringify({
                  count: docs.length
                }));
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
                var o;
                if(failed)
                  o = {result: "failed"};
                else if(numAffected != 1)
                  o = {result: "notFound", woot: "numAffected=" + numAffected};
                else
                  o = {result: "ok", data: {fileId: fileId}};
                res.write(JSON.stringify(o));
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
console.log("Running! Access the server at http://localhost:3000");
});
