// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, () => {console.log(`Server is running on local host: ${port}`)});
console.log(server);

//Get route
app.get('/all', (req, res) => {
    res.send(projectData);
});

//post route 
app.post('/weather', (req,res) => {
    let data = req.body;
    projectData["temp"] = data.temp;
    projectData["feeling"] = data.feelings;
    projectData["date"] = data.date;
    res.send(projectData);
});