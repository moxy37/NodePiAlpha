var con = require(__base + 'dbConnection');

module.exports = TestDAO;


function TestDAO() {
    this.startLogs = function (next) {
        var cmd = require('node-cmd');
        cmd.run('python ' + __base + 'CowListener.py');
        next();
    }
    this.logCow = function (obj, next) {
        con.query("INSERT INTO CowLog (cowId, latitude, longitude, temp1, temp2, rssi, timestamp, notes) VALUES (?, ?, ?, ?, ?, ?, ?)", [obj.cowId, obj.latitude, obj.longitude, obj.temp1, obj.temp2, obj.rssi, obj.timestamp, obj.notes], function (err, result) {
            if (err) {
                console.log(err);
                return next(err);
            }
            console.log("Added new Log " + result.affectedRows);
            return next(null, obj);
        });
    }

    this.updateNotes = function (notes, next) {
        con.query("UPDATE CowLog SET notes=? WHERE notes=''", notes, function (err, result) {
            if (err) {
                console.log(err);
                return next(err);
            }
            console.log("Updating rows " + result.affectedRows);
            return next(null, notes);
        });
    }
}