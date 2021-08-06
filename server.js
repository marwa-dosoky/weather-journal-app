
// Setup empty JS object to act as endpoint for all routes
let projectData;

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, () => { console.log("server started at port no:" + port) });

app.post('/saveData', saveData);

app.get('/getData', getData);

function saveData(req, res) {
	projectData = req.body;
	console.log(projectData);
}


function getData(req, res) {
	console.log('getting into server');
	console.log(projectData);
	res.send(projectData);
}


