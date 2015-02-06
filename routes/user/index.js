'use strict';

var express = require('express');
var controller = require('./user.controller.js');

var router = express.Router();

router.delete('/:userId', controller.destroy);
router.get('/', controller.retrieve);

router.post('/:userId/gcmKey/:gcmKey', controller.addGcmKey);
router.post('/', controller.create);
router.post('/:userId/message', controller.message)

router.put('/:userId/preferences', controller.updatePreferences);
router.put('/:userId/history/:historyKey', controller.updateHistory);

module.exports = router;
