const express = require('express');
const router = express.Router();
const request = require('request');

var randomRequest = function(req, res, next) {

  var options = {
    url: 'https://api.random.org/json-rpc/1/invoke',
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      "jsonrpc": "2.0",
      "method": "generateIntegers",
      "params": {
        "apiKey": process.env.RANDOM_API_KEY,
        "n": 10,
        "min": 0,
        "max": req.body.arrayLength,
        "replacement": false
      },
      "id": 42
    }
  };

  request.post(options, (error, response, body) => {
    if(!error && response.statusCode == 200) {
      console.log(body);
      req.randomArr = body;
      // res.send(body.result.random);
      next();
    }
  });
};

module.exports = randomRequest;
