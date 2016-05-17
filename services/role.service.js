'use strict'

var Role = require('../models/./role');
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
    
    Role.find(criteria).count(function(error, count){
         
        if(error){
               deferred.reject(error);
        }
        
        response.count = count;      
        //exec me permite dar mas especificaciones a find
        Role.find(criteria)
        .select(fields)      
        .skip(perPage * (page-1))
        .limit(perPage)
        .sort(sort)
       //.populate('rolemenu')
        .exec(function(error, roles){
            if(error){
                   deferred.reject(err);
            }
            response.roles = roles;
            deferred.resolve(response);  
        });
        
    });
    return deferred.promise;
}

function getById(id) {
    var deferred = Q.defer();
    Role.findOne({_id:id})
   //.populate('rolemenu')
    .exec(function (err, role) {
        if (err) deferred.reject(err);

        if (role) {           
            deferred.resolve(role);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
};


function create(object) {
    var deferred = Q.defer();
    // validation  
    Role.findOne(
        { name: object.name },
        function (err, obj) {
            if (err) deferred.reject(err);

            if (obj) {
                // username already exists
                deferred.reject('Name "' + object.name + '" is already taken');
            } else {
                createRole(object);
            }
        });

    function createRole(role) {
         Role.create(
            role,
            function (err, doc) {
                if (err) deferred.reject(err);
                deferred.resolve(doc);
            });
    }

    return deferred.promise;
};

function update(_id, object) {
    var deferred = Q.defer();
    // validation
    Role.findById(_id, function (err, obj) {
        if (err) deferred.reject(err);

        if (obj.name !== object.name) {
            // code has changed so check if the new code is already taken
            Role.findOne(
                { name: object.name },
                function (err, role) {
                    if (err) deferred.reject(err);

                    if (role) {
                        // username already exists
                        deferred.reject('Name "' + object.code + '" is already taken')
                    } else {
                        updateRole(object);
                    }
                });
        } else {
            updateRole(object);
        }
    });

    function updateRole(role) {        
        Role.findById(_id,
            function (err, tmp) {
                if (err) deferred.reject(err);
                tmp.name = role.name;
                tmp.description = role.description;              
                tmp.active = role.active;
                tmp.save(function(err){
                    if(err)deferred.reject(err);
                    deferred.resolve();
                });                
            });
    }

    return deferred.promise;
};

function _delete(_id) {
    var deferred = Q.defer();
    Role.remove(
        { _id: _id },
        function (err) {
            if (err) deferred.reject(err);
            deferred.resolve();
        });
    return deferred.promise;
};
