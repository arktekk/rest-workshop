Node Cheat Sheet
================

References:

* [Node home page](http://nodejs.org)
* [Full documentation](http://nodejs.org/api/all.html)

Running a node application
==========================

    $ node server.js

Getting the request body as a string
====================================

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

Base64-encode binary data on a request
======================================

~~~javascript
var data = [];
var datalength = 0;
req.on('data', function(chunk) {
  data.push(chunk);
  datalength += chunk.length;
});

req.on('end', function() {
  var buf = new Buffer(datalength);
  data.forEach(function(d) { d.copy(buf); });
  var base64 = buf.toString("base64");
  //do something with the data.
});
~~~

NOTE: Headers in the node.js http request object are ALWAYS in
lower-case.

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
res.write(JSON.stringify("id=" + ad._id));
~~~

<!-- _foo -->

When an object has been saved, the id of the object is available as
the `_id` attribute:

Find a object:

~~~javascript
Db.Ad.findOne({_id: <my id>}, function(err, doc) {
   ....
});
~~~

<!-- _foo -->

`err` will be set if there was an error while talking to the DB. `doc`
will null if not found, or the object if found.

<!-- _foo -->

Update an existing object:
~~~javascript
var cmd = {$push: {arr: item}}
Db.Ad.update({_id: <my id>}, cmd, {}, function(err, numAffected) {
 ....
});
~~~

<!-- _foo -->

Store an image inside of an object (this is not something you should
    do normally):

~~~javascript
// Collect all the data buffers into an array
var data = [];
var datalength = 0;
req.on('data', function(chunk) {
  data.push(chunk);
  datalength += chunk.length;
});
req.on('end', function() {
  // Create a new, huge buffer.
  var buf = new Buffer(datalength);
  // Copy all the buffers into the huge buffer.
  data.forEach(function(d) { d.copy(buf); });
  // base-64 encode the data.
  var cmd = {$push: {pictures: buf.toString("base64")}}
  // Store the picture on the object.
  Db.Ad.update({_id: id}, cmd, {}, function(err, numAffected) {
    ...
  });
});
~~~

<!-- _foo -->

Command line arguments
======================
Node.js has the command line arguments available in the global object `process`.
They can be accessed using:

~~~javascript
var args = process.argv.slice(2); //Removes node + "name of your javascript file"
~~~

HTTP client
===========

Use "request" module

Upload image to URI:

~~~javascript
function uploadImage(uri, file) {
  fs.createReadStream(file).pipe(request.post(uri));
}
~~~
