'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Team= new Schema({
	name:String,
	description:String,
	players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]	
});

Team.index({name:'text'});

module.exports = mongoose.model('Team',Team);