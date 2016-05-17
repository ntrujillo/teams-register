'use strict'
var express = require('express');
var router = express.Router();
var ctrl = require('./provincia.controller');
var ctrlCanton = require('./provincia.canton.controller');

// routes provincias
router.route('/')
.get(ctrl.queryProvincia)
.post(ctrl.createProvincia);

router.route('/:_id')
.get(ctrl.getProvinciaById)
.put(ctrl.updateProvincia)
.delete(ctrl.deleteProvincia);

// routes provincia canton
router.route('/:id_provincia/canton')
.get(ctrlCanton.queryCanton)
.post(ctrlCanton.createCanton);

router.route('/:id_provincia/canton/:_id')
.get(ctrlCanton.getCantonById)
.put(ctrlCanton.updateCanton)
.delete(ctrlCanton.deleteCanton);

module.exports = router;