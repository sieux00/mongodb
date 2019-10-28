  
var mongoose = require('mongoose');

const mlabURI = 'mongodb://localhost/vanvan'
const dbName = 'vanvan';

const con = mongoose.connect(mlabURI, (error) => {
    if (error) {
        console.log("Error " + error);
    } else {
        console.log("Connected successfully to server")
    }
});

module.exports = con;