var mysql = require('mysql2');


var mysql      = require('mysql');
var dbConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'alpha',
  insecureAuth : true
});
 
// dbConnection.connect();// var dbConnection = mysql.createPool({
//     connectionLimit: 10,
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "alpha"
// });



module.exports = dbConnection;