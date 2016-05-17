'use strict'
var express = require('express');
var router = express.Router();
var controller = require('./users.controller');

// routes
router.route('/')
.get(controller.queryUser)
.post(controller.registerUser);

router.route('/:_id')
.get(controller.getUserById)
.put(controller.updateUser)
.delete(controller.deleteUser);

router.post('/authenticate', controller.authenticateUser);
router.get('/session/current', controller.getCurrentUser);

module.exports = router;