'use strict'

var Player = require('../models/./player');
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
    
    Player.find(criteria).count(function(error, count){
         
        if(error){
               deferred.reject(error);
        }
        
        response.count = count;      
        //exec me permite dar mas especificaciones a find
        Player.find(criteria)
        .select(fields)      
        .skip(perPage * (page-1))
        .limit(perPage)
        .sort(sort)
        .populate('team')
        .exec(function(error, players){
            if(error){
                   deferred.reject(err);
            }
            response.players = players;
            deferred.resolve(response);  
        });
        
    });
    return deferred.promise;
}

function getById(id) {
    var deferred = Q.defer();
    Player.findOne({_id:id})
    .populate('team')
    .exec(function (err, result) {
        if (err) deferred.reject(err);

        if (result) {           
            deferred.resolve(result);
        } else {
            // player not found
            deferred.resolve();
        }
    });

    return deferred.promise;
};


function create(playerParam) {
    var deferred = Q.defer();
    // validation  
    Player.findOne(
        { cedula: playerParam.cedula },
        function (err, result) {
            if (err) deferred.reject(err);

            if (result) {
                // cedula already exists
                deferred.reject('Cedula "' + playerParam.cedula+ '" is already taken');
            } else {
                createPlayer(playerParam);
            }
        });

    function createPlayer(player) {
         Player.create(
            player,
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
};

function update(_id, playerParam) {
    var deferred = Q.defer();
    // validation
    Player.findById(_id, function (err, player) {
        if (err) deferred.reject(err);

        if (player.cedula !== playerParam.cedula) {
            // code has changed so check if the new code is already taken
            Player.findOne(
                { cedula: playerParam.cedula },
                function (err, result) {
                    if (err) deferred.reject(err);

                    if (result) {
                        // cedula already exists
                        deferred.reject('Cedula "' + playerParam.cedula + '" is already taken')
                    } else {
                        updatePlayer(playerParam);
                    }
                });
        } else {
            updatePlayer(playerParam);
        }
    });

    function updatePlayer(player) {        
        Player.findById(_id,
            function (err, result) {
                if (err) deferred.reject(err);
                result.name = player.name;
                result.code = player.code;
                result.save(function(err){
                    if(err)deferred.reject(err);
                    deferred.resolve();
                });

                
            });
    }

    return deferred.promise;
};

function _delete(_id) {
    var deferred = Q.defer();

    Player.remove(
        { _id: _id },
        function (err) {
            if (err) deferred.reject(err);

            deferred.resolve();
        });

    return deferred.promise;
};
