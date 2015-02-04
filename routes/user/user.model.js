'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userId: String,
  regId: String,  
});

module.exports = mongoose.model('User', UserSchema);
