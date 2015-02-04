'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userId: String,
  chromeRegId: String,
  androidRegId: String
});

module.exports = mongoose.model('User', UserSchema);
