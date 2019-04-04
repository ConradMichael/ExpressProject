const express = require('express');
const bodyParser = require('body-parser');
const dataCore = require('./routes/dataCore.route');
const Vehicle = require('./routes/Vehicle.route');
const RegLookup = require('./routes/RegLookup.route');
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

app.use('/data', dataCore);
app.use('/vehicles', Vehicle);
app.use('/reglookup', RegLookup);

http.createServer(app).listen(8000);

console.log('Server is Running');
