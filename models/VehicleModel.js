const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Vehicle = new Schema ({
	Make: {type: String, required: true},
	Model: {type: String, required: true},
	Reg: {type: String, required: true, unique: true},
	Owner: {type: String, required: true},
	NIN: {type: String, requires: true}
});

module.exports = mongoose.model('vehicle', Vehicle);