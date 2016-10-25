var mysql = require('mysql2');

var dbConnection = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "alpha"
});

module.exports = dbConnection;