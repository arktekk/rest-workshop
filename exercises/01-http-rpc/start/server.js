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
  http.createServer(function(req, res) {
    // TODO: implement
  }).listen(3000);
  console.log("Running! Access the server at http://localhost:3000");
});
