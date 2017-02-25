/*jshint esversion: 6 */
const mongoose = require('mongoose');

const databaseURI = process.env.MONGODB_URI;

var connectToMongoDatabase = function() {
    mongoose.connect(databaseURI);

    mongoose.set('debug', true);

    mongoose.connection.on('connected', function() {
        console.log('Mongoose connected to ', databaseURI);
    });

    mongoose.connection.on('error', function(err) {
        console.log('Mongoose failed to connect because error: ', err);
    });
};

module.exports = {
    connect: connectToMongoDatabase
};
