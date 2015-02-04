'use strict';

var express = require('express');
var controller = require('./user.controller.js');

var router = express.Router();

router.delete('/:userId', controller.destroy);
router.get('/:userId', controller.show);
router.post('/', controller.create);
router.post('/message', controller.message)

module.exports = router;
