// var mysql = require('mysql2');

// var dbConnection = mysql.createPool({
//     connectionLimit: 10,
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "alpha"
// });


var mysql      = require('mysql');
var dbConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'alpha'
});
 
dbConnection.connect();

module.exports = dbConnection;