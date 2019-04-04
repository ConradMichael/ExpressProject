const express = require('express');
const bodyParser = require('body-parser');
const Vehicle = require('./routes/Vehicle.route');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');

let app = express();
app.use(cors());

var Onlineurl = 'mongodb+srv://admin:admin@cluster0-uzqia.mongodb.net/test';

var url = 'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb';
const mongoDB = process.env.MONGODB_URI || url;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/vehicles', Vehicle);

http.createServer(app).listen(8001);

console.log('Vehicle Database is Running');
