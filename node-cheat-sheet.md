Getting the body as a string
============================

~~~javascript
http.createServer(function(req, res) {
  var chunk = "";
  req.on('data', function(chunk) {
    s += chunk;
  });
  req.on('end', function() {
    // 's' is now a string with all the data that the client sent
  });
});
~~~

MongoDB / Mongoose
==================

Import mongoose:

    mongoose = require('mongoose');

Declare your types and your database:

~~~javascript
var Ad = new mongoose.Schema({
    title    : String
  , body     : String
  , pictures : [String]
});

var Db = {
  Ad: mongoose.model('Ad', Ad)
};
~~~

<!-- vim: set ft=markdown: -->
