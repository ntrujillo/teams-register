'use strict'

var express = require('express');
var router = express.Router();
var ctrlParroquia = require('./parroquia.controller');

// routes parroquia
router.route('/')
.get(ctrlParroquia.queryParroquia);

router.route('/:_id')
.get(ctrlParroquia.getParroquiaById);

module.exports = router;
