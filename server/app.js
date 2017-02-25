require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const LOCALPORT = 3000;
var portDecision = process.env.PORT || LOCALPORT;

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendfile(path.join(__dirname, '../public/views/index.html'));
});

app.listen(portDecision, () => console.log("Listening on port: ", portDecision));
