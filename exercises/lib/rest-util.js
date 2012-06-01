var _ = require('underscore');

var seq = 1;
function logRequest(req) {
  console.log(seq + ': ' + req.method + ' ' + req.url);
  _.each(req.headers, function(value, header) {
    console.log(header + ': ' + value);
  });
  console.log();
  seq++;
}
module.exports.logRequest = logRequest;
