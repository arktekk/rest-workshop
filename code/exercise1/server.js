#!/usr/bin/env node

var express = require('express')
  , app = express.createServer()
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var Ad = new Schema({
    title : String
  , body  : String
});
var Db = {
  Ad: mongoose.model('Ad', Ad)
};

function new_ad(req, res) {
  console.log("req.body", req.body);
  var ad = new Db.Ad();
  ad.title = req.body.title;
  ad.body = req.body.body;
  ad.save();

  var json = {
    result: 'ok',
    ad: ad
  };

  res.send(JSON.stringify(json), {'Content-Type': 'application/json'}, 200);
};

function get_ad(req, res) {
  console.log("req.params.id", req.params.id);
  Db.Ad.findOne({_id: req.params.id}, function(err, doc) {
    console.log("err", err);
    console.log("doc", doc);

    var json;
    if(doc == null) {
      json = {
        result: 'failure',
        message: 'Unknown object'
      };
    }
    else {
      json = {
        result: 'ok',
        ad: doc
      };
    }

    return res.send(JSON.stringify(json), {'Content-Type': 'application/json'}, 200);
  });
};

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.cookieParser('secret'));
  app.use(express.session({ secret: 'secret' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

mongoose.connect('mongodb://localhost/server-1', function() {
  app.post('/ad', new_ad);
  app.get('/ad/:id', get_ad);
  app.listen(8000);
  console.log("It's on!");
});
