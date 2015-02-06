'use strict';

var express = require('express');
var controller = require('./user.controller.js');

var router = express.Router();

router.delete('/:userId', controller.destroy);
router.get('/', controller.retrieve);
router.post('/:userId/gcmKey/:gcmKey', controller.addGcmKey);
router.put('/:userId/preferences', controller.updatePreferences);
router.post('/', controller.create);
router.post('/:userId/message', controller.message)

module.exports = router;
