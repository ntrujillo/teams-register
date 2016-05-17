'use strict'
var express = require('express');
var router = express.Router();
var ctrl = require('./role.controller');

// routes role
router.route('/')
.get(ctrl.queryRole)
.post(ctrl.createRole);

router.route('/:_id')
.get(ctrl.getRoleById)
.put(ctrl.updateRole)
.delete(ctrl.deleteRole);


module.exports = router;