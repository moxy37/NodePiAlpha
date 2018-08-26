'use-strict';

var uuid = require("node-uuid");

module.exports = CowLog;


function CowLog(obj) {
    this.cowId = uuid.v4();
    this.longitude = 0;
    this.latitude = 0;
    this.temp1 = 0;
    this.temp2 = 0;
    this.rssi = 0;
    this.notes = '';
    this.timestamp = new Date();
    this.isNew = true;
}