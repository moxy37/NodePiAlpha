var con = require(__base + 'dbConnection');

module.exports = TestController;


function TestController() {
    this.gpioOut = function (pin, status, callback) {
        var cmd = require('node-cmd');
        if (String(status) === 'true') {
            cmd.run('python ' + __base + 'GpioOut.py ' + pin + ' 1');
        } else {
            cmd.run('python ' + __base + 'GpioOut.py ' + pin + ' 0');
        }

        callback();
    }
}