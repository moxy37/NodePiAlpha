var con = require(__base + 'dbConnection');
var async = require('async');
module.exports = TestDAO;


function TestDAO() {
    this.startLogs = function (next) {
        var cmd = require('node-cmd');
        cmd.run('python ' + __base + 'CowListener.py');
        next();
    }
    this.cowResults = function (next) {
        con.query("SELECT notes, AVG(latitude) AS latitude, AVG(longitude) AS longitude, AVG(rssi) AS rssi, COUNT(*) AS total, MAX(timestamp) AS timestamp FROM CowLog GROUP BY notes ORDER BY notes, MAX(timestamp)", function (err, results) {
            if (err) { return next(err); }
            var list = [];
            async.forEach(results, function (r, callback) {
                var obj = new Object();
                obj.notes = r.notes;
                obj.latitude = r.latitude;
                obj.longitude = r.longitude;
                obj.rssi = r.rssi;
                obj.total = r.total;
                obj.timestamp = r.timestamp;
                list.push(obj);
                callback();
            }, function (err) {
                if (err) { return next(err); }
                return next(null, list);
            });

        });
    }
    this.logCow = function (obj, next) {
        con.query("INSERT INTO CowLog (cowId, latitude, longitude, temp1, temp2, rssi, timestamp, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [obj.cowId, obj.latitude, obj.longitude, obj.temp1, obj.temp2, obj.rssi, obj.timestamp, obj.notes], function (err, result) {
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