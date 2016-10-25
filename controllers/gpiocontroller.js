var con = require(__base + 'dbConnection');
var Gpio = require(__base + 'models/gpio');

module.exports = GpioController;

function GpioController() {
    this.create = function (obj, callback) {
        con.query("INSERT INTO Gpio (id, pin, pinType, statusHigh, statusLow, statusData) VALUES (?, ?, ?, ?, ?, ?)", [obj.id, obj.pin, obj.pinType, obj.statusHigh, obj.statusLow, obj.statusData], function (err, result) {
            if (err) return callback(err);
            console.log("Added new Gpio " + result.affectedRows);
            obj.isNew = false;
            callback(null, obj);
        });
    }
    this.update = function (obj, callback) {
        con.query("UPDATE Gpio SET pin=?, pinType=?, statusHigh=?, statusLow=?, statusData=? WHERE id=?", [obj.pinType, obj.statusHigh, obj.statusLow, obj.statusData, obj.id], function (err, result) {
            if (err) return callback(err);
            console.log("Update Gpio " + result.affectedRows);
            obj.isNew = false;
            callback(null, obj);
        });
    }
    this.find = function (id, callback) {
        con.query("SELECT * FROM Gpio WHERE id=?", id, function (err, result) {
            if (err) return callback(err);
            if (result.length == 0) {
                var err = new Error("Unabled to find Gpio with id " + id);
                return callback(err);
            }
            var g = new Gpio(result[0]);
            return callback(null, g);
        });
    }
    this.remove = function (id, callback) {
        con.query('DELETE FROM Gpio WHERE id = ?', id, function (err, result) {
            if (err) return callback(err);
            console.log('Deleted ' + result.affectedRows + ' records from Gpio');
            return callback();
        });
    }
    this.save = function (obj, callback) {
        if (obj.isNew.toString() == "true") {
            this.create(obj, callback);
        }
        else {
            this.update(obj, callback);
        }
    }
    this.list = function (callback) {
        con.query("SELECT * FROM Gpio ORDER BY pin", function (err, result) {
            if (err) return callback(err);
            gpios = [];
            result.forEach(function (element) {
                var g = new Gpio(element);
                gpios.push(g);
            });
            return callback(null, gpios);
        });
    }
    this.startGpio = function (callback) {
        con.query("SELECT * FROM Gpio WHERE pinType <> 0", function (err, result) {
            if (err) return callback(err);
            gpios = [];
            result.forEach(function (element) {
                var g = new Gpio(element);
                var cmd = require('node-cmd');

                if (g.pinType === 1) {
                    cmd.run('python ' + __base + 'GpioIn.py ' + g.pin + ' ' + g.statusHigh + ' ' + g.statusLow + ' ' + g.statusData);
                } else if (g.pinType === 2) {
                    cmd.run('python ' + __base + 'GpioButton.py ' + g.pin + ' ' + g.statusHigh);
                }
            });
            return callback();
        });
    }
}