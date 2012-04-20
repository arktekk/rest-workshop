var _ = require('underscore')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Ad = new Schema({
    title : String
  , body  : String
});

module.exports = {
  Ad: mongoose.model('Ad', Ad),
};
