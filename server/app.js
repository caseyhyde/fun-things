/*jshint esversion: 6 */
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const LOCALPORT = 3000;
const mongoConnection = require('./modules/mongo-connection');
const portDecision = process.env.PORT || LOCALPORT;
// const random = require('./routes/random');
const things = require('./routes/things');
const random = require('./routes/random');


app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/', function(req, res) {
  res.sendfile(path.join(__dirname, '../public/views/index.html'));
});

// app.use('/')
app.get('/random', random);
app.post('/things', things);

app.listen(portDecision, () => console.log("Listening on port: ", portDecision));
