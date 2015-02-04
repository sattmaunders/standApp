'use strict';

var User = require('./user.model.js'),
    gcm = require('node-gcm'),
    config = require('../../config'),
    sender = new gcm.Sender(config.apiKey);

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users

exports.index = function(req, res) {
  User.find({}, function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

 */

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    res.send(newUser);
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.userId;

  User.find({userId: userId}, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user);
  });
};

/**
 * Deletes a user
 */
exports.destroy = function(req, res) {
  User.findOneAndRemove({userId: req.params.userId}, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

function extractRegIds(users) {
  var regIds = [];
  
  users.forEach( function(user) {
    regIds.push(user.regId);
  });
  
  return regIds;
};

exports.message = function (req, res) {
  var userId = req.params.userId;
  var content = req.body.content;

  var message = new gcm.Message({
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
      'content': content
    }
  });
  
  User.find({ userId: userId }, function(err, users) {
    var registrationIds = extractRegIds(users);
    console.log('regIds:', registrationIds);
    
    if (!err && registrationIds.length > 0) {            
      sender.sendNoRetry(message, registrationIds, function(err, result) {
      if(err) { res.send('Error :-('); }
      else    { res.send('Message sent: {userId: ' + userId + ', content: ' + content + '} !!'); }
      });
    } else {
      res.send('No registration ids found for userId:' + userId);
    }        
  });    
};
