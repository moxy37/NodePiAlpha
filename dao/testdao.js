var con = require(__base + 'dbConnection');

module.exports = TestDAO;


function TestDAO() {
    this.startLogs = function (next) {
        var cmd = require('node-cmd');
        cmd.run('python ' + __base + 'CowListener.py');
        next();
    }
    this.logCow = function (obj, next) {
        con.query("INSERT INTO CowLog (cowId, latitude, longitude, temp, timestamp) VALUES (?, ?, ?, ?, ?)", [obj.cowId, obj.latitude, obj.longitude, obj.temp, obj.timestamp], function (err, result) {
            if (err) {
                console.log(err);
                return next(err);
            }
            console.log("Added new Log " + result.affectedRows);
            next(null, obj);
        });
    }
}