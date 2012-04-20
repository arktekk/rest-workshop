var Schema = require('./schema')
  , _ = require('underscore');

module.exports.new_ad = function(req, res) {
  console.log("req.body", req.body);
  var ad = new Schema.Ad();
  ad.title = req.body.title;
  ad.body = req.body.body;
  ad.save();

  var json = {
    result: 'ok',
    ad: ad
  };

  res.send(JSON.stringify(json), {'Content-Type': 'application/json'}, 200);
};

module.exports.get_ad = function(req, res) {
  console.log("req.params.id", req.params.id);
  Schema.Ad.findOne({_id: req.params.id}, function(err, doc) {
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
