var http = require('http')
  , url = require('url')
  , util = require('util')
  , mongoose = require('mongoose');


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
      var id = u.query.adId;
      var data = [];
      var datalength = 0;
      req.on('data', function(chunk) {
          data.push(chunk);
          datalength += chunk.length;
      });
      req.on('end', function() {
      var buf = new Buffer(datalength);
      data.forEach(function(d) { d.copy(buf); });
        var cmd = {$push: {pictures: buf.toString("base64")}}
        Db.Ad.update({_id: id}, cmd, {}, function(err, numAffected) {
          if(numAffected != 1)
            res.write(JSON.stringify({result: "notFound", message: "numAffected=" + numAffected}));
          else
            res.write(JSON.stringify({result: "ok"}));
          res.end();
        });
      });
    } else {
      req.on('end', function() {
        res.write(JSON.stringify({ result: "unknown" }));
        res.end();
      });
    }
  }).listen(3000)
console.log("Running! Access the server at http://localhost:3000");
});
