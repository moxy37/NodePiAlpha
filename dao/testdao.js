var con = require(__base + 'dbConnection');

module.exports = TestDAO;


function TestDAO() {
    this.gpioOut = function (pin, status, callback) {
        var cmd = require('node-cmd');
        if (String(status) === 'true') {
            cmd.run('python ' + __base + 'GpioOut.py ' + pin + ' 1');
        } else {
            cmd.run('python ' + __base + 'GpioOut.py ' + pin + ' 0');
        }

        callback();
    }
    this.create = function (obj, callback) {
        con.query("INSERT INTO Gpio (id, pin, pinType, statusHigh, statusLow, statusData) VALUES (?, ?, ?, ?, ?, ?)", [obj.id, obj.pin, obj.pinType, obj.statusHigh, obj.statusLow, obj.statusData], function (err, result) {
            if (err) return callback(err);
            console.log("Added new Gpio " + result.affectedRows);
            obj.isNew = false;
            callback(null, obj);
        });
    }
}