var http = require('http'),
    url = require('url');

http.createServer(function(req, res) {
  var u = url.parse(req.url, true);
  console.log(req.method + " " + req.url);
  console.log("url", u);
  console.log("headers", req.headers);
  console.log("query", req.query);
  res.end();
}).listen(3000);
