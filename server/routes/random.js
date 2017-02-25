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
                "n": 10,
                "min": 0,
                "max": 100,
                "replacement": false
            },
            "id": 42
        }
    };

    request.post(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log("Random array: ", body);
            req.randomArr = body;
            // next();
            res.send(body);
        } else {
            res.sendStatus(400);
        }
    }); //end post to API

}); //end GET route

// router.get('/', function(req, res, next) {
//
// });//end GET route

module.exports = router;
