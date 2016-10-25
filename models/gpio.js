'use-strict';

var uuid = require("node-uuid");

module.exports = Gpio;


function Gpio(obj) {
    this.id = uuid.v4();
    this.pin = 12;
    this.pinType = 0;
    this.statusHigh = '';
    this.statusLow = '';
    this.statusData = '';
    this.isNew = true;

    if (obj !== undefined) {
        this.copy(obj);
    }
}

Gpio.prototype.copy = function (obj) {
    this.id = obj.id || uuid.v4();
    this.pin = obj.pin;
    this.pinType = obj.pinType;
    this.statusHigh = obj.statusHigh;
    this.statusLow = obj.statusLow;
    this.statusData = obj.statusData;
    this.isNew = obj.isNew || false;
}
