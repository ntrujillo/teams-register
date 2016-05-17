'use strict'
var service = require('services/team.service');

function queryTeam(req, res) {
    var q = req.query.q;      
    var fields = req.query.fields;
    var sort = req.query.sort;
    var page = req.query.page;
    var perPage = req.query.per_page;
    
    service.query(q,fields, sort, page, perPage)
        .then(function (response) {
            if (response.teams) {
                res.header('X-Total-Count',response.count);
                res.send(response.teams);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function getTeamById(req, res) {
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

function createTeam(req, res) {
    service.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};


function updateTeam(req, res) {   
    service.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function deleteTeam(req, res) {    
    service.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

module.exports.queryTeam=queryTeam;
module.exports.getTeamById=getTeamById;
module.exports.createTeam=createTeam;
module.exports.updateTeam=updateTeam;
module.exports.deleteTeam=deleteTeam;