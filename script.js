'use strict'
var roleSrv= require('services/role.service');
var userSrv = require('services/user.service');

var role = {
	"name" : "Admin",
	"description" : "Rol adminstrador",
	"active":true
};

var user = {
		"firstName" : "Administrador",
		"username" : "admin",
		"password" : "admin",
		"active" : true,
		"changepass":false
};

roleSrv.create(role).then(function(result){
	console.log("Rol Admin creado exitosamente");

	user.role = result._id;
	userSrv.create(user).then(function(result){
		console.log("Usuario admin creado existosamente");
	});
 
});



	
