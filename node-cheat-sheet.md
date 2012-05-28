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

Wrap your entire application with an Mongo connection:

~~~javascript
mongoose.connect('mongodb://localhost/exercise-1', function() {
  // Add http.createServer() etc here
});
~~~

Insert a new object:

~~~javascript
var ad = new Db.Ad();
ad.title = payload.title;
ad.body = payload.body;
ad.save();
~~~

Find a object:

~~~javascript
Db.Ad.findOne({_id: <my id>}, function(err, doc) {
   ....
});
~~~

<!-- _foo -->

`err` will be set if there was an error while talking to the DB. `doc`
will null if not found, or the object if found.

<!-- vim: set ft=markdown: -->
