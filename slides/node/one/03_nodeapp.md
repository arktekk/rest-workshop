!SLIDE small
# Basic Node.js app #

    var http = require('http');

    http.createServer(function(req, res) {
      res.writeHead(200);
      res.write('Hello world!');
      res.end();
    }).listen(3000);

.notes Use require to load modules. Note the anonymous function
passed to createServer - it will be called for each incoming request.

!SLIDE small
# URL & Query string parsing #

    var http = require('http')
      , url = require('url');

    http.createServer(function(req, res) {
      var u = url.parse(req.url, true);
      res.writeHead(200);
      res.write('Hello ' + u.query.name + '!');
      res.end();
    }).listen(3000);

.notes Remember pass 'true' as the second parameter to parse,
to also parse the query string.

!SLIDE small
# Mongoose: MongoDB with a schema #

    var Ad = new mongoose.Schema({
        title    : String
      , body     : String
      , pictures : [String]
    });
    var Db = { Ad: mongoose.model('Ad', Ad) };

    mongoose.connect('mongodb://localhost/demo',
    function() {
      var ad = Db.Ad.new();
      ad.title = 'hi';
      ad.save();

      Db.Ad.findOne({title: 'hi'}, function(err, ad) {
        ad.body = 'world';
        ad.save();
      });
    });

!SLIDE bullets incremental
# Running the exercises #
* npm install
* node server.js

