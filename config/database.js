//require mongoose module
var mongoose = require('mongoose');

//require chalk module to give colors to console text
var chalk = require('chalk');

//require database URL from properties file
var dotenv = require('dotenv').config()

var connected = chalk.green;
var error = chalk.yellow;
var disconnected = chalk.red;
var termination = chalk.magenta;

//export this function and imported by server.js
module.exports = function() {

    // connection to db
    const authData =  {
        user: process.env.DATABASE_USER,
        pass: process.env.DATABASE_PASSWORD,
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }; 

    mongoose.connect(process.env.DATABASE_HOST, authData)
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));

    mongoose.connection.on('connected', function(){
        console.log(connected("[mongoose] default connection is open to", process.env.DATABASE_HOST));
    });

    mongoose.connection.on('error', function(err){
        console.log(error("[mongoose] default connection has occured "+err+" error"));
    });

    mongoose.connection.on('disconnected', function(){
        console.log(disconnected("[mongoose] default connection is disconnected"));
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(termination("[mongoose] default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
}