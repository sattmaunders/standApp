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

  if (!req.body || !req.body.email) { return res.status(400).end(); }

  var requestedEmail = req.body.email;
  User.find({'config.email': requestedEmail}, function(err, user) {

    if (err) { return next(err); }

    // Checks if the user exists
    if (user.length) { return res.status(409).end(); }

    // Creates
    new User({config: {email: requestedEmail}}).save(function(err, user) { res.json(user); });
  });

};


/**
 * Add GCM Key for user
 */
exports.addGcmKey = function (req, res, next) {

  if (!req.params || !req.params.userId || !req.params.gcmKey) { return res.status(400).end(); }

  User.findById(req.params.userId, function(err, user) {

    if (err) { return next(err); }
    if (!user) { return res.status(404).end(); }

    if(user.config.gcmKeys.indexOf(req.params.gcmKey) != -1 ) {return res.json(user);}

    user.config.gcmKeys.push(req.params.gcmKey);
    user.save(function(err, newUser) {
      if (err) { return next(err); }
      res.json(newUser);
    });

  });
};

/**
 * Get a single user by id
 */
exports.get = function (req, res, next) {

    if (!req.params || !req.params.userId) { return res.status(400).end(); }

    User.findById(req.params.userId, function(err, user) {

        if (err) { return next(err); }
        if (!user) { return res.send(404); }

        res.json(user);
    });
};


/**
 * Get a single user by email
 */
exports.retrieve = function (req, res, next) {

  if (!req.query || !req.query.email) { return res.status(400).end(); }

  User.find({'config.email': req.query.email}, function (err, user) {
    if (err) { return next(err); }
    if (!user || user.length != 1) { return res.send(404); }

    res.json(user[0]);

  });
};



/**
 * Get a single user by email
 */
exports.updatePreferences = function (req, res, next) {

  if (!req.params || !req.params.userId || !req.body || !req.body.preferences) { return res.status(400).end(); }

  User.findById(req.params.userId, function(err, user) {
    if (err) { return next(err); }
    if (!user) { return res.send(404); }

    user.preferences =req.body.preferences;
    user.save(function(err, newUser) {
      if (err) { return next(err); }
      res.json(newUser);
    });

  });
};

/**
 * Update history
 */
exports.updateHistory = function (req, res, next) {

  if (!req.params || !req.params.userId || !req.params.historyKey || !req.body || !req.body.history) { return res.status(400).end(); }

  User.findById(req.params.userId, function(err, user) {
    if (err) { return next(err); }
    if (!user) { return res.send(404); }

    user.set('history.' + req.params.historyKey, req.body.history);
    user.save(function(err, newUser) {
      if (err) { return next(err); }
      res.json(newUser);
    });

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

  if (!req.params || !req.params.userId || !req.body || !req.body.content) { return res.status(400).end(); }

  var userId = req.params.userId;
  var content = req.body.content;

  var message = new gcm.Message({
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
      'content': content
    }
  });

  User.findById(req.params.userId, function(err, user) {
    if (err) { return next(err); }
    if (!user) { return res.send(404); }

    sender.sendNoRetry(message, user.config.gcmKeys, function(err) {
      if(err) { res.send('Error :-('); }
      else    { res.send('Message sent: {userId: ' + user.config.email + ', content: ' + content + '} !!'); }
    });
  });    
};
