/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const request = require('request');
const thing = require('../models/thing');

// Route: Get things
router.get('/', function(req, res, next) {
    console.log('Getting all things');

    thing.find({}).exec(
        function(err, result) {
            if (err) {
                console.log('Get ERR: ', err);
                res.sendStatus(400);
            } else {
              req.result = result;
              // res.send(result);
              next();
            }

        });
}); // END: GET things route


router.get('/', function(req, res, next) {
  console.log("Req.result: ", req.result.length);
    console.log('random api function');
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
                "n": (req.result.length - 1),
                "min": 0,
                "max": (req.result.length - 1),
                "replacement": false
            },
            "id": 42
        }
    };

    request.post(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            //console.log("Random array: ", body.result.random.data);
            req.randomArr = body.result.random.data;
            var newArr = shuffle(req);
            //console.log("Shuffled array: ", newArr);
            // next();
            res.send(newArr);
        } else {
            res.sendStatus(400);
        }
    }); //end post to API

}); //end GET route

function shuffle(req) {
  var shuffledArray = [];
  for(var i = 0; i < req.randomArr.length; i ++) {
    shuffledArray.push(req.result[req.randomArr[i]]);
  }
  return shuffledArray;
}

module.exports = router;
