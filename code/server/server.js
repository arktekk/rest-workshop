var express = require('express')
  , app = express.createServer()
  , routes = require('./lib/routes')
  , mongoose = require('mongoose')
  , Db = require('mongodb').Db
  , Server = require('mongodb').Server;

app.configure(function(){
//  app.set('views', __dirname + '/views');
//  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser('secret'));
  app.use(express.session({ secret: 'secret' }));
  app.use(app.router);
//  app.use(require("stylus").middleware({
//    src: __dirname + "/public",
//    compress: true
//  }));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

function run() {
  mongoose.connect('mongodb://localhost/server-1', function() {
    app.post('/ad', routes.new_ad);
    app.get('/ad/:id', routes.get_ad);
    app.listen(8000);
    console.log("It's on!");
  });
}

run();
