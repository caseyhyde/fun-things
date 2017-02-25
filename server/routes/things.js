var express = require('express');
var router = express.Router();
var thing = require('../models/thing');
// var day = require('../models/day');

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
