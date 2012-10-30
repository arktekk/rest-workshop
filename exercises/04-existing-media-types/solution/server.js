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

var mediaTypeAd = 'application/vnd.collection+json';
var mediaTypeAdList = 'application/vnd.collection+json';

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

function assertMethod(req, res, methods) {
  if(_.contains(methods, req.method)) {
    return true;
  }
  var out = _.reduce(methods, function(str, item){return str + (str.length > 0 ? ',' : '') + item})
  console.log(out);
  var txt = 'Illegal method, you can only use: ' + out
  res.writeHead(405, txt, {'Content-Type': 'text/plain', 'Allow': out});
  res.write(txt);
  res.end('\n');
  return false;
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
  return this.baseUri(req) + '/ads';
}

UriGenerator.ads = function(req) {
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
    var links = [{href : UriGenerator.addPicture(req, doc._id), rel: "add-picture", render: "link"}];
    for (i = 0; i < docPictures.length; i++) {
      links.push({href: UriGenerator.picture(req, doc._id, i), rel: "picture", render: "image"});
    }
    return {
      href: UriGenerator.ad(req, doc._id),
      data: [
        {name: "title", value: doc.title},
        {name: "body", value: doc.body},
        {name: "title", value: doc.title},      
      ],
      links: links,
    };
  };
}

function findOne(u, res) {
  return function(cb) {
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
        cb(doc, u, res);
      }
    });
  }  
}

function toDataObject(obj) {
  var data = obj.data || [];
  return _.reduce(data, function(obj, item) {
    obj[item.name] = item.value;
    return obj;
  }, {});
}

mongoose.connect('mongodb://localhost/03-media-types', function() {
  var db = mongoose.connection.db
  http.createServer(function(req, res) {
    restUtil.logRequest(req);
    var u = url.parse(req.url, true);
    if(u.pathname === "/ad") {
      if(assertMethod(req, res, ['GET'])) {
        req.on('end', function() {
          if (((typeof u.query.picture) !== 'undefined') && assertAccept(req, res, 'image/jpeg')) {
              findOne(u, res)(function(doc, u, res) {
                var pic = doc.pictures[u.query.picture];
                if (pic === undefined) {
                  res.writeHead(404, {'Content-Type': 'text/plain'});
                  res.write("Unknown picture" +  u.query.picture + " for ad: " + u.query.id);
                }
                else {
                  res.writeHead(200, {'Content-Type': 'image/jpeg' });
                  res.write(new Buffer(pic, "base64"));                  
                }
                res.end();
              });            
          } else if(assertAcceptAd(req, res)) {
            findOne(u, req, res)(function(doc, u) {
              res.writeHead(200, {'Content-Type': mediaTypeAd });
              var ad = docToAd(req)(doc);
              res.write(JSON.stringify({
                collection: {
                  href: ad.href,
                  items: [ad]
                }
              })
              );        
              res.end('\n');
            }); 
          }                 
        });
      }
    } else if(u.pathname === "/ads") {
      if(assertMethod(req, res, ['GET', 'POST'])) {
        if(req.method === 'POST' && assertContentTypeAd(req, res)) {
          var s = "";
          req.on('data', function(chunk) {
            s += chunk;
          });
          req.on('end', function() {
            var payload = JSON.parse(s);
            console.log("OOOOOOOOO " + payload);
            var data = toDataObject(payload.template);
            console.log("OOOOOOOOO " + data);
            var ad = new Db.Ad();
            ad.title = data.title;
            ad.body = data.body;
            ad.save();
            res.writeHead(201, {'Location': UriGenerator.ad(req, ad._id)});
            res.end("\n");
          });
        } else if(req.method === 'GET' && assertAcceptAdList(req, res)) {
          req.on('end', function() {
            Db.Ad.find({}).exec(function(err, docs) {
              if(err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.write(JSON.stringify(err.message));
              }
              else {
                res.writeHead(200, {'Content-Type': mediaTypeAdList});
                var mapper = docToAd(req);
                res.write(JSON.stringify({                
                  collection: {
                    href: UriGenerator.ads(req),
                    items: _.map(docs, mapper),
                    links: [
                      {href: UriGenerator.addAd(req), rel: "add-ad", render: "link"}
                    ],
                    template: {
                      data: [
                        {name: 'title', prompt: "Title text"},
                        {name: 'body', prompt: "Body text"}
                      ]                    
                    }
                  }
                }));
              }
              res.end("\n");
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
