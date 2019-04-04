const Data = require('../models/VehicleModel');

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
		console.log("Handling request for Registration: " + set.Reg);
	
		res.send(set);
	});
};

exports.getByOwner = function(req, res){
	if(req.body.AuthKey != "TestKey01"){
		res.send("Invalid Key");
		return "Invalid Key";
	}
	Data.find().where("NIN", req.body.NIN).exec(function(err, set) {
		if(err) {return err}
		res.send(set);
	});
	console.log("Extra Info Request For NIN: " + req.body.NIN);
}

exports.createDataSet = function(req, res){
	Data.find().where("Reg", req.body.Reg).exec(function(err, set){
		if(err) {return err}
		if(set[0] != null){
			res.send("Unique Identifier Already Exists.");
		}
	});
	
	let set = new Data({
		Make: req.body.Make,
		Model: req.body.Model,
		Reg: req.body.Reg,
		Owner: req.body.Owner,
		NIN: req.body.NIN
	});
	
	set.save(function(err){
		if(err){return err}
		res.send(set + " was added.");
	});
};

exports.deleteDataSet = function(req, res){
	Data.find().where("Reg", req.body.Reg)
		.exec(function(err, set){
			if(err) {return err}
			Data.findByIdAndRemove(set[0], function(err, dataset){
				if(err){return err}
				res.send(set + " was deleted");
			});
		});
};