const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Data = new Schema ({
	fName: {type: String, required: true},
	lName: {type: String, required: true},
	DOB: {type: String, required: true},
	NIN: {type: String, requires: true, unique: true}
});

module.exports = mongoose.model('set', Data);