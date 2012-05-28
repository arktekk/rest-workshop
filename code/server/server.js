#!/usr/bin/env node

var express = require('express')
  , app = express.createServer()
  , mongodb = require('mongodb')
  , Grid = mongodb.Grid
  , GridStore = mongodb.GridStore
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema

var alphabet = '0123456789abcdefghjkmnpqrtuvwxyz';
function randomId() {
  var id = "";

  for (var i = 0; i < 5; i++) {
    id += alphabet[parseInt(Math.random() * alphabet.length)];
  }

  return id;
}

var grid;

var Ad = new Schema({
    title    : String
  , body     : String
  , pictures : [String]
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

function new_photo(req, res) {
  function fail() {
    var json;
    if(err) {
      json = {
        result: 'failure',
        message: err
      };
    }
    else {
      json = {
        result: 'ok',
        ad: { _id: fileInfo._id }
      };
    }
  }

  var store = new GridStore(db, randomId(), 'w');
  console.log("opening store");
  store.open(function(err, store) {
    console.log("open");
    console.log(req);
    console.log("files", req.files);
    req.on('data', function(err, data) {
      if(err) return fail();
      console.log("writing data");

      store.write(data, function(err, gridStore) {
        if(err) return res.send("Error storing data: " + err, 500);
        console.log("wrote data");
        store.close();
      });
    });
  });
}

function get_photo(req, res) {
  console.log("req.params.id", req.params.id);
  grid.get(new mongodb.ObjectID(req.params.id), function(err, file) {
    console.log("err", err);
    console.log("file", file);

    var json;
    if(file == null) {
      json = {
        result: 'failure',
        message: 'Unknown object'
      };
      return res.send(JSON.stringify(json), {'Content-Type': 'application/json'}, 200);
    }
    else {
      return res.send("poop", {'Content-Type': 'application/json'}, 200);
    }
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

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('server-1', server);

db.open(function(err, db) {
  grid = new Grid(db, 'fs');    

  mongoose.connect('mongodb://localhost/server-1', function() {
    app.post('/ad', new_ad);
    app.get('/ad/:id', get_ad);
//    app.post('/ad/:id', update_ad);

    app.post('/photo', new_photo);
    app.get('/photo/:id', get_photo);

    app.listen(8000);
    console.log("It's on!");
  });
});
