var http = require('http')
  , url = require('url')
  , util = require('util')
  , _ = require('underscore')
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
  var writer = maybeGetWriter(req, res);
  var txt = 'You have to post ' + type;
  res.writeHead(415, txt, {'Content-Type': 'text/plain'});
  writer(txt);
  writer('\n');
  res.end();
  return false;
}

function assertMethod(req, res, methods) {
  if(_.contains(methods, req.method)) {
    return true;
  }
  var writer = maybeGetWriter(req, res);
  var out = _.reduce(methods, function(str, item){return str + (str.length > 0 ? ',' : '') + item})
  console.log(out);
  var txt = 'Illegal method, you can only use: ' + out
  res.writeHead(405, txt, {'Content-Type': 'text/plain', 'Allow': out});
  writer(txt);
  writer('\n');
  res.end();
  return false;
}

function maybeGetWriter(req, res) {
  return function(toWrite) {
    if (req.method !== 'HEAD') {
      res.write(toWrite);
    }
  }
}

function assertAcceptAd(req, res) {
  return assertAccept(req, res, mediaTypeAd);
}

function assertAcceptAdList(req, res) {
  return assertAccept(req, res, mediaTypeAdList);
}

function assertAccept(req, res, contentType) {
  if(typeof req.headers.accept === "undefined" ||
     req.headers.accept === contentType ||
     req.headers.accept === '*/*') {
    return true;
  }
  var writer = maybeGetWriter(req, res);
  var txt = 'Illegal accept, you can only use ' + contentType;
  res.writeHead(406, txt, {'Content-Type': 'text/plain'});
  writer(txt);
  writer('\n');
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
  return this.baseUri(req) + '/ads';
}

UriGenerator.ad = function(req, id) {
  return this.baseUri(req) + '/ad?id=' + id;
}

UriGenerator.addPicture = function(req, id) {
  return this.baseUri(req) + '/add-picture?id=' + id;
}

UriGenerator.picture = function(req, id, index) {
  return this.baseUri(req) + '/ad?id=' + id + '&picture=' + index;
}

function docToAd(req) {
  return function(doc) {
    var docPictures = doc.pictures || [];
    var pictures = [];
    for (i = 0; i < docPictures.length; i++) {
      pictures.push(UriGenerator.picture(req, doc._id, i));
    }
    return {
      title: doc.title,
      body: doc.body,
      self: UriGenerator.ad(req, doc._id),
      "add-picture": UriGenerator.addPicture(req, doc._id),
      pictures: pictures
    };
  };
}

function findOne(u, res, writer) {
  return function(cb) {
    Db.Ad.findOne({_id: u.query.id}, function(err, doc) {
      if(err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        writer(err.message);
        res.end();
      }
      else if(doc == null) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        writer("Unknown ad: " + u.query.id);
        res.end();
      }
      else {                
        cb(doc, u, res);
      }
    });
  }  

}

mongoose.connect('mongodb://localhost/03-media-types', function() {
  var db = mongoose.connection.db
  http.createServer(function(req, res) {
    restUtil.logRequest(req);
    var u = url.parse(req.url, true);
    var writer = maybeGetWriter(req, res);
    if(u.pathname === "/ad") {
      if(assertMethod(req, res, ['GET', 'HEAD'])) {
        req.on('end', function() {
          if (u.query.picture && assertAccept(req, res, 'image/jpeg')) {
              findOne(u, res, writer)(function(doc, u, res) {
                var pic = doc.pictures[u.query.picture];
                if (pic === undefined) {
                  res.writeHead(404, {'Content-Type': 'text/plain'});
                  writer("Unknown picture" +  u.query.picture + " for ad: " + u.query.id);
                }
                else {
                  res.writeHead(200, {'Content-Type': 'image/jpeg' });
                  writer(new Buffer(pic, "base64"));                  
                }
                res.end();
              });            
          } else if(assertAcceptAd(req, res)) {
            findOne(u, res, writer)(function(doc, u) {
              res.writeHead(200, {'Content-Type': mediaTypeAd });
              writer(JSON.stringify(docToAd(req)(doc)));        
              res.end('\n');
            }); 
          } else {
            res.writeHead(404);
            res.end();
          }                
        });
      }
    } else if(u.pathname === "/ads") {
      if(assertMethod(req, res, ['GET', 'POST', 'HEAD'])) {
        if(req.method === 'POST' && assertContentTypeAd(req, res)) {
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
            res.end();
          });
        } else if(assertAcceptAdList(req, res)) {
          req.on('end', function() {
            Db.Ad.find({}).exec(function(err, docs) {
              if(err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                writer(JSON.stringify(err.message));
              }
              else {
                res.writeHead(200, {'Content-Type': mediaTypeAdList});
                writer(JSON.stringify({
                  count: docs.length,
                  addAd: UriGenerator.addAd(req),
                  ads: _.map(docs, docToAd(req))
                }));
                writer('\n');
              }
              res.end();
            });
          });
        }
      }
    } else if(u.pathname === "/add-picture") {
      if(assertMethod(req, res, ['POST'])) {
				if(assertContentType(req, res, 'image/jpeg')) {
					var id = u.query.id;
					var data = [];
					var datalength = 0;
					console.log("Id: " + id);
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
								writer("Not found\n");
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
        writer("Not found\n");
        res.end();
      });
    }
  }).listen(3000);
  console.log("Running! Access the server at http://localhost:3000");
});
