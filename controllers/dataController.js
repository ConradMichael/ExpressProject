const Data = require('../models/DataModel');

exports.getAllData = function(req, res){
	var Results = [];
	Data.find().exec(function(err, set){
		if(err) {return err}
		for(result in set){
			Results.push(set[result]);
		}
	res.send(Results);
	});
};

exports.getById = function(req, res){
	if(req.body.AuthKey != "TestKey01"){
		res.send("Invalid Key");
		return "Invalid Key";
	}
	Data.find().where("NIN", req.body.NIN).exec(function(err, set){
		if(err) {return err}
		console.log("Handling request for: " + set[0].fName + " " + set[0].lName);
		
		res.send(set[0]);
	});
};

exports.createDataSet = function(req, res){
	Data.find().where("NIN", req.body.NIN).exec(function(err, set){
		if(err) {return err}
		if(set[0] != null){
			res.send("Unique Identifier Already Exists.");
		}
	});
	
	let set = new Data({
		fName: req.body.fname,
		lName: req.body.lname,
		DOB: req.body.DOB,
		NIN: req.body.NIN
	});
	
	set.save(function(err){
		if(err){return err}
		res.send(set + " was added.");
	});
};

exports.deleteDataSet = function(req, res){
	Data.find().where("NIN", req.body.NIN)
		.exec(function(err, set){
			if(err) {return err}
			Data.findByIdAndRemove(set[0], function(err, dataset){
				if(err){return err}
				res.send(set + " was deleted");
			});
		});
};