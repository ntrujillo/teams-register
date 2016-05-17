'use strict'

var Team = require('../models/./team');
var Q = require('q');
var plus = "+";
var comma=",";
var service = {};

service.query = query;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;


module.exports = service;

function query(q,fields,sort,page,perPage){
    var criteria = {};
    var response = {};
    var deferred = Q.defer();
    
    if(q){
        criteria.$text = {$search:q}
    } 
    if(sort){
        sort = sort.replace(plus,'');
        sort = sort.replace(comma,' ');
    }
    if(fields){
        fields = fields.replace(comma,' ');
    }
    if(page){
        page = parseInt(page);
        if(perPage){
            perPage = parseInt(perPage);
        }else{
            perPage = 10;
        }
    }   
    
    Team.find(criteria).count(function(error, count){
         
        if(error){
               deferred.reject(error);
        }
        
        response.count = count;      
        //exec me permite dar mas especificaciones a find
        Team.find(criteria)
        .select(fields)      
        .skip(perPage * (page-1))
        .limit(perPage)
        .sort(sort)
        .populate('players')
        .exec(function(error, teams){
            if(error){
                   deferred.reject(err);
            }
            response.teams = teams;
            deferred.resolve(response);  
        });
        
    });
    return deferred.promise;
}

function getById(id) {
    var deferred = Q.defer();
    Team.findOne({_id:id})
    .populate('players')
    .exec(function (err, provincia) {
        if (err) deferred.reject(err);

        if (provincia) {           
            deferred.resolve(provincia);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
};


function create(teamParam) {
    var deferred = Q.defer();
    // validation  
    Team.findOne(
        { name: teamParam.name },
        function (err, result) {
            if (err) deferred.reject(err);

            if (result) {
                // team already exists
                deferred.reject('Name "' + teamParam.name + '" is already taken');
            } else {
                createTeam(teamParam);
            }
        });

    function createTeam(team) {
         Team.create(
            team,
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
};

function update(_id, teamParam) {
    var deferred = Q.defer();
    // validation
    Team.findById(_id, function (err, result) {
        if (err) deferred.reject(err);

        if (result.name !== teamParam.name) {
            // code has changed so check if the new code is already taken
            Team.findOne(
                { name: teamParam.name },
                function (err, team) {
                    if (err) deferred.reject(err);

                    if (team) {
                        // username already exists
                        deferred.reject('Name "' + teamParam.name+ '" is already taken')
                    } else {
                        updateTeam(teamParam);
                    }
                });
        } else {
            updateTeam(teamParam);
        }
    });

    function updateTeam(team) {        
        Team.findById(_id,
            function (err, set) {
                if (err) deferred.reject(err);
                set.name = team.name;
                set.description = team.description;
                set.save(function(err){
                    if(err)deferred.reject(err);
                    deferred.resolve();
                });

                
            });
    }

    return deferred.promise;
};

function _delete(_id) {
    var deferred = Q.defer();

    Team.remove(
        { _id: _id },
        function (err) {
            if (err) deferred.reject(err);

            deferred.resolve();
        });

    return deferred.promise;
};
