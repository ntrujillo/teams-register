'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Player= new Schema({
	first_name:String,
	second_name:String,
	paternal_surname:String,
	maternal_surname:String,
	address:String,
	phone:String,
	birth_date:Date,
	age:Number,
	nacionality:String,
	description : String,
	image_url:String,
	cedula : String,
	created_at:Date,
	player_number:Number,
	team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }		
});

Player.index({cedula:'text'});

module.exports = mongoose.model('Player',Player);