var express = require('express');
var router = express.Router();
var thing = require('../models/thing');
var day = require('../models/day');

// Route: Get things
router.get('/', function(req, res) {
    console.log('Getting all things');

    thing.find({}).exec(
        function(err, things) {
            if (err) {
                console.log('Get ERR: ', err);
            } else {
                res.body.things = things;
            }
            next();
        });
}); // END: GET things route

// Route: Add a thing
router.post("/", function(req, res) {
    var thingToAdd = new thing(req.body);
    console.log('Adding new thing:', thingToAdd);
    thingToAdd.save(function(err) {
        if (err) {
            console.log('There was an error inserting new thing, ', err);
            res.sendStatus(500);
        } else {
            res.send(201);
        }
    });
}); // END: POST thing route

module.exports = router;
