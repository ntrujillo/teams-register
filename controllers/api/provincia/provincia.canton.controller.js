'use strict'

var cantonService = require('services/provincia.canton.service');


function queryCanton(req, res) {
    var q = req.query.q;      
    var fields = req.query.fields; 
    var sort = req.query.sort;
    var page = req.query.page;
    var perPage = req.query.per_page;    
    
    cantonService.query(req.params.id_provincia, q,fields, sort, page, perPage)
        .then(function (response) {
            if (response.cantons) {
                res.header('X-Total-Count',response.count);
                res.send(response.cantons);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function getCantonById(req, res) {
    cantonService.getById(req.params.id_provincia, req.params._id)
        .then(function (obj) {
            if (obj) {
                res.send(obj);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function createCanton(req, res) {        
    cantonService.create(req.params.id_provincia,req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};


function updateCanton(req, res) {  
    
    cantonService.update(req.params.id_provincia,req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function deleteCanton(req, res) {        
    cantonService.delete(req.params.id_provincia, req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

module.exports.queryCanton = queryCanton;
module.exports.getCantonById = getCantonById;
module.exports.createCanton = createCanton;
module.exports.updateCanton = updateCanton;
module.exports.deleteCanton = deleteCanton;