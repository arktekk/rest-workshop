var util = require('util')
var seq = 1;

function logRequest(req) {
  console.log(seq + ':' + req.method + ' ' + req.url);
  console.log(seq + ':' + util.inspect(req.headers));
  seq++;
}
module.exports.logRequest = logRequest;
