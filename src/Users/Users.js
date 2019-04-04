import React, { Component } from 'react';
import './Users.css';
import {Button, ButtonGroup, Input} from "reactstrap";

let requestUser = "http://127.0.0.1:8000";
let requestVehicle = "http://127.0.0.1:8000/vehicles/getowner";
let requestLookup = "http://127.0.0.1:8000/reglookup/getreg"

function VehicleInformation() {
	let RequestA = new XMLHttpRequest();
		
	RequestA.open('POST',requestVehicle,true);
	RequestA.setRequestHeader('Content-Type', 'application/json');
		
	RequestA.responseType = 'json';
		
	let UserId = document.getElementById('UID').value;
		
	let jsonString = JSON.stringify({
		'NIN':UserId,
		'AuthKey':'TestKey01'
	});
	
	RequestA.send(jsonString);
	
	let VehicleInfo = document.getElementById('VehicleInfo');
	
	RequestA.onload = function(){
		let VehicleData = RequestA.response;
		VehicleInfo.innerHTML = " ";
		//VehicleInfo.innerHTML += "<th className='keyEntry'>Make:</th> <th className='keyEntry'>Model:</th> <th className='keyEntry'>Reg:</th>";
		
		for(let i = 0; i < VehicleData.length; i++){
			VehicleInfo.innerHTML += "<div id='Vehicle" + i + "' className='UserTable'>"
			VehicleInfo.innerHTML += "<h2> Vehicle " + (i+1) + ": </h2>";
			for(let id in VehicleData[i]){
				console.log("Vehicle: " + i + ": " + VehicleData[i]);
				if(id === "Make" || id === "Model" || id === "Reg"){
					VehicleInfo.innerHTML += "<th>" + id + ": </th> <td>" + VehicleData[i][id] + "</td>";
				}
			}
			VehicleLookup(VehicleData[i]["Reg"], i);
			VehicleInfo.innerHTML += "</div>";
		}
	}
}

function VehicleLookup(Reg, ID) {
	let RequestVL = new XMLHttpRequest();
	
	RequestVL.open('POST', requestLookup, true);
	RequestVL.setRequestHeader('Content-Type', 'application/json');
	
	RequestVL.responseType = 'json';

	let jsonString = JSON.stringify({
		'Reg':Reg,
		'AuthKey':'TestKey01'
	});
	
	RequestVL.send(jsonString);
	
	console.log("Vehicle" + ID);
	
	let VehicleToAdd = document.getElementById("Vehicle"+ID);
	
	console.log("Before: ");
	
	RequestVL.onload = function(){
		let LookupData = RequestVL.response;
		console.log(VehicleToAdd);
		for(let id in LookupData){
			if(id === "MOT" || id === "Tax" || id === "Insurance"){
				VehicleToAdd.innerHTML += "<th className='keyEntry' id='" + id + "'> " + id + ": </th> <td>" + LookupData[id] + "</td>";
			}
		}
	}
	console.log("After: ");
	console.log(VehicleToAdd);
}

class Keyword extends Component {	
	searchUser(){
		let requestP = new XMLHttpRequest();
		
		requestP.open('POST',requestUser+'/data/getid', true);
		requestP.setRequestHeader('Content-Type', 'application/json');

		requestP.responseType = 'json';
		
		let UserId = document.getElementById("UID").value;
		let UTable = document.getElementById('UserTable');
		let AuthKey = document.getElementById('AuthKey').value;
		
		let jsonString = JSON.stringify({
			'NIN':UserId,
			'AuthKey':AuthKey
		});
		
		requestP.send(jsonString);
		
		requestP.onload = function(){
			if(requestP.response != null){
				UTable.innerHTML = "";
				UTable.innerHTML += "<th className='keyEntry'>First Name:</th> <th className='keyEntry'>Last Name:</th> <th className='keyEntry'>DOB:</th>";
			
				UTable.innerHTML += "<td className='keyEntry'> " + requestP.response.fName + " </td> <td className='keyEntry'> " + requestP.response.lName + " </td> <td className='keyEntry'> " + requestP.response.DOB + " </td>"
			}
		}
		VehicleInformation();
	}
	
	render() {
    return(
		<div>
			<div>Unique Id: <Input className="entryButtons" id="UID"></Input></div>
			<div>Auth Key: <Input className="entryButtons" id="AuthKey"></Input></div>
			<ButtonGroup>
			<Button variant="primary" className="entryButtons" type="submit" onClick={() => this.searchUser()}> Search By ID </Button>
			</ButtonGroup>
		
			<div className="entryButtons">	
			<table id="UserTable" className="UserTable">
				<tbody><tr>
				</tr></tbody>
			</table>
		
				<table id="VehicleInfo" className="UserTable">
				</table>
			</div>
			<div id="errormessage" className="errorMessage"></div>
		</div>
    );
  }
}

export default Keyword;