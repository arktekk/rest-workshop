var http = require('http')
  , url = require('url')
  , util = require('util')
  , _ = require('underscore')
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

var mediaTypeAd = 'application/vnd.ad+json';
var mediaTypeAdList = 'application/vnd.ad-list+json';

function assertContentTypeAd(req, res) {
  return assertContentType(req, res, mediaTypeAd);
}

function assertContentTypeAdList(req, res) {
  return assertContentType(req, res, mediaTypeAdList);
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

function assertAcceptAd(req, res, method) {
  return assertAccept(req, res, mediaTypeAd);
}

function assertAcceptAdList(req, res, method) {
  return assertAccept(req, res, mediaTypeAdList);
}

function assertAccept(req, res, contentType) {
  if(typeof req.headers.accept === "undefined" ||
     req.headers.accept == contentType ||
     req.headers.accept == '*/*') {
    return true;
  }
  var txt = 'Illegal accept, you can only use ' + contentType;
  res.writeHead(406, txt, {'Content-Type': 'text/plain'});
  res.write(txt);
  res.write('\n');
  res.end();
  return false;
}

var UriGenerator = {}
UriGenerator.baseUri = function(req) {
  var u = url.parse(req.url);
  var a = req.socket.address();
  return 'http://' + (req.headers.host || (a.address + ":" + a.port));
}

UriGenerator.addAd = function(req) {
  return this.baseUri(req) + '/create-ad';
}

UriGenerator.ad = function(req, id) {
  return this.baseUri(req) + '/ad?id=' + id;
}

function docToAd(req) {
  return function(doc) {
    return {
      title: doc.title,
      body: doc.body,
      self: UriGenerator.ad(req, doc._id)
    };
  };
}

mongoose.connect('mongodb://localhost/03-media-types', function() {
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
            res.writeHead(201, {'Location': UriGenerator.ad(req, ad._id)});
            res.end("\n");
          });
        }
      }
    } else if(u.pathname == "/ad") {
      if(assertMethod(req, res, 'GET')) {
        if(assertAcceptAd(req, res)) {
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
                res.writeHead(200, {'Content-Type': mediaTypeAd });
                res.write(JSON.stringify({ result: "ok", data: doc}));
              }
              res.end("\n");
            });
          });
        }
      }
    } else if(u.pathname == "/ads") {
      if(assertMethod(req, res, 'GET')) {
        if(assertAcceptAdList(req, res)) {
          req.on('end', function() {
            Db.Ad.find({}).exec(function(err, docs) {
              if(err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.write(JSON.stringify(err.message));
              }
              else {
                res.writeHead(200, {'Content-Type': mediaTypeAdList});
                res.write(JSON.stringify({
                  count: docs.length,
                  addAd: UriGenerator.addAd(req),
                  ads: _.map(docs, docToAd(req))
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
  }).listen(3000);
  console.log("Running! Access the server at http://localhost:3000");
});
