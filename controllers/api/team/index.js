'use strict'
var express = require('express');
var router = express.Router();
var ctrl = require('./team.controller');

// routes role
router.route('/')
.get(ctrl.queryTeam)
.post(ctrl.createTeam);

router.route('/:_id')
.get(ctrl.getTeamById)
.put(ctrl.updateTeam)
.delete(ctrl.deleteTeam);

module.exports = router;