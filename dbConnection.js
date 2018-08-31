var mysql = require('mysql2');

var dbConnection = mysql.createPool({
    host:"localhost",
    connectionLimit: 10,
    user: "root",
    password: "root",
    port: 3306,
    database: "alpha"
});

module.exports = dbConnection;