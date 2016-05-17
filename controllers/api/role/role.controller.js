'use strict'
var service = require('services/role.service');

function queryRole(req, res) {
    var q = req.query.q;      
    var fields = req.query.fields;
    var sort = req.query.sort;
    var page = req.query.page;
    var perPage = req.query.per_page;
    
    service.query(q,fields, sort, page, perPage)
        .then(function (response) {
            if (response.roles) {
                res.header('X-Total-Count',response.count);
                res.send(response.roles);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function getRoleById(req, res) {
    service.getById(req.params._id)
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

function createRole(req, res) {
    service.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};


function updateRole(req, res) {   
    service.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function deleteRole(req, res) {    
    service.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

module.exports.queryRole=queryRole;
module.exports.getRoleById=getRoleById;
module.exports.createRole=createRole;
module.exports.updateRole=updateRole;
module.exports.deleteRole=deleteRole;