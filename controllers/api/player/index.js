'use strict'
var express = require('express');
var router = express.Router();
var ctrl = require('./player.controller');

// routes role
router.route('/')
.get(ctrl.queryPlayer)
.post(ctrl.createPlayer);

router.route('/:_id')
.get(ctrl.getPlayerById)
.put(ctrl.updatePlayer)
.delete(ctrl.deletePlayer);


module.exports = router;