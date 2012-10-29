var http = require('http')
  , url = require('url')
  , util = require('util')
  , restUtil = require('../../lib/rest-util.js')
  , mongoose = require('mongoose');

var Ad = new mongoose.Schema({
    title    : String
  , body     : String
  , pictures : [String]
});

var Db = {
  Ad: mongoose.model('Ad', Ad)
};

function assertContentType(req, res, target) {
  var ct = req.headers['content-type'] || '';
  if(target == ct.toLowerCase()) {
    return true;
  }
  var txt = 'You have to post ' + target;
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
    req.headers.accept === 'application/json' ||
    req.headers.accept === '*/*') {
    return true;
  }
  var txt = 'Illegal accept, you can only use application/json';
  res.writeHead(406, txt, {'Content-Type': 'text/plain'});
  res.write(txt);
  res.write('\n');
  res.end();
  return false;
}

mongoose.connect('mongodb://localhost/02-basic-http', function() {
  var db = mongoose.connection.db
  http.createServer(function(req, res) {
    restUtil.logRequest(req);
    var u = url.parse(req.url, true);
    if(u.pathname === "/create-ad") {
      if(assertMethod(req, res, 'POST')) {
        if(assertContentType(req, res, 'application/json')) {
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
    } else if(u.pathname === "/ad") {
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
    } else if(u.pathname === "/add-picture") {
			if(assertMethod(req, res, 'POST')) {
				if(assertContentType(req, res, 'image/jpeg')) {
					var id = u.query.adId;
					var data = [];
					var datalength = 0;
					console.log("Id" + id);
					req.on('data', function(chunk) {
						data.push(chunk);
						datalength += chunk.length;
					});
					req.on('end', function() {
						var buf = new Buffer(datalength);
						data.forEach(function(d) { d.copy(buf); });
						var cmd = {$push: {pictures: buf.toString("base64")}}
						Db.Ad.update({_id: id}, cmd, {}, function(err, numAffected) {
							if(numAffected != 1) {
								res.writeHead(404, {'Content-Type': 'text/plain'});
								res.write("Not found\n");
							} else {
								res.writeHead(204);
							}
							res.end();
						});
					});
				}
			}
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
