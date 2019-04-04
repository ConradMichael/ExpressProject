import React, { Component } from 'react';
import './Users.css';
import {Button, ButtonGroup, Input} from "reactstrap";
let toTest = [];
//let requestURL = "http://51.137.151.100:9123";

let requestURL = "http://127.0.0.1:8000";

function loadJSON(){
	let request = new XMLHttpRequest();
	
	request.open('GET', requestURL+'/data/getall', true);
	
	request.responseType = 'json';
	
	request.send();

	request.onload = function(){
		toTest = request.response;
		UserTable();
	}
}

function UserTable() {
	let UTable = document.getElementById('keysTable');
	let ViewingOption = document.getElementById('viewingDropdown');
		UTable.innerHTML = "";
		UTable.innerHTML += "<tr><th class='keyEntry'>First Name:</th> <th class='keyEntry'>Last Name:</th> <th class='keyEntry'>Age:</th></tr>";
	for(let i = 0; i < toTest.length; i++){
		UTable.innerHTML += "<tr>";
		UTable.innerHTML += "<td class='keyEntry'> " + toTest[i].fName + " </td> <td class='keyEntry'> " + toTest[i].lName + " </td> <td class='keyEntry'> " + toTest[i].age + " </td>"
		UTable.innerHTML += "</tr>";
	}
}

class Keyword extends Component {	
	delUser() {
		let requestD = new XMLHttpRequest();
		
		let UIDToDelete = document.getElementById("UID").value;
		
		requestD.open('DELETE', requestURL+'/data/delete', true);
		
		requestD.setRequestHeader('Content-Type', 'application/json');     
		
		requestD.responseType = 'json';
		
		let jsonString = JSON.stringify({
			'UID':UIDToDelete
		})
		
		requestD.send(jsonString);
		
		requestD.onload = function(){
			loadJSON();
		}
	}
	
	addUser(){
		let requestP = new XMLHttpRequest();
		
		requestP.open('POST',requestURL+'/data/create', true);
		
		requestP.setRequestHeader('Content-Type', 'application/json');    
		
		let FName = document.getElementById("firstName").value;
		let LName = document.getElementById("lastName").value;
		let Age = document.getElementById("age").value;
		let UID = document.getElementById("UID").value;
		
		let jsonString = JSON.stringify({
			'fname':FName,
			'lname':LName,
			'age':Age,
			'UID':UID
		})
		
		console.log(jsonString);
		
		requestP.send(jsonString);
		
		requestP.onload = function(){
			loadJSON();
		}
	}
	
	render() {
	loadJSON();
    return (
		<div>
			<table id="keysTable" className="keysTable">
			</table>
			
			<div className="entryButtons">
				First Name: <Input className="entryButtons" id="firstName"></Input>
				<div>Last Name: <Input className="entryButtons" id="lastName"></Input></div>
				<div>Age: <Input className="entryButtons" id="age"></Input></div>
				<div>Unique Id: <Input className="entryButtons" id="UID"></Input></div>
				<ButtonGroup>
				<Button variant="primary" className="entryButtons" type="submit" onClick={() => this.addUser()}> Add User </Button>
				<Button variant="primary" className="entryButtons" type="submit" onClick={() => this.delUser()}> Remove User </Button>
				</ButtonGroup>
			</div>
			<div id="errormessage" className="errorMessage"></div>
		</div>
    );
  }
}
 
export default Keyword;
