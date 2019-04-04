const Data = require('../models/RegLookupModel');

exports.getByReg = function(req, res){
	if(req.body.AuthKey != "TestKey01"){
		res.send("Invalid Key");
		return "Invalid Key";
	}
	Data.find().where("Reg", req.body.Reg).exec(function(err, set){
		if(err) {return err}
		res.send(set[0]);
	});
	console.log("Handling request for ID: " + req.body.Reg);
};

exports.createDataSet = function(req, res){
	Data.find().where("Reg", req.body.Reg).exec(function(err, set){
		if(err) {return err}
		if(set[0] != null){
			res.send("Registration Already Exists.");
		}
	});
	
	let set = new Data({
		Make: req.body.Make,
		Model: req.body.Model,
		Reg: req.body.Reg,
		MOT: req.body.MOT,
		Tax: req.body.Tax,
		Insurance: req.body.Insurance,
		Owner: req.body.Owner
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