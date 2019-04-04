const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let VehicleFull = new Schema ({
	Make: {type: String, required: true},
	Model: {type: String, required: true},
	Reg: {type: String, required: true, unique: true},
	MOT: {type: String, required: true},
	Tax: {type: String, required: true},
	Insurance: {type: String, required: true},
	Owner: {type: String, required: true}
});

module.exports = mongoose.model('vehicleFull', VehicleFull);