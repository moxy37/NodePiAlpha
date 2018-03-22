'use-strict';

var uuid = require("node-uuid");

module.exports = CowLog;


function CowLog(obj) {
    this.cowId = uuid.v4();
    this.longitude = 12;
    this.latitude = 0;
    this.temp = 0;
    this.timestamp = new Date();
    this.isNew = true;
}