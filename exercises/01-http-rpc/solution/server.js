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

mongoose.connect('mongodb://localhost/01-http-rpc', function() {
  var db = mongoose.connection.db
  http.createServer(function(req, res) {
    var u = url.parse(req.url, true);
    if(u.pathname == "/create-ad") {
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
        console.log(payload);
        res.write(JSON.stringify({ result: "ok", id: ad._id }));
        res.end("\n");
      });
    } else if(u.pathname == "/ad") {
      req.on('end', function() {
        Db.Ad.findOne({_id: u.query.id}, function(err, doc) {
          console.log(arguments);
          if(err) {
            res.write(JSON.stringify({ result: "error", error: err.message }));
          }
          else if(doc == null) {
            res.write(JSON.stringify({ result: "notFound" }));
          }
          else {
            res.write(JSON.stringify({ result: "ok", data: doc}));
          }
          res.end("\n");
        });
      });
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
        res.write(JSON.stringify({ result: "unknown" }));
        res.end();
      });
    }
  }).listen(3000)
console.log("Running!");
});
