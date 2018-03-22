var express = require('express');
var TestDAO = require(__base + 'dao/testdao');
var dao = new TestDAO();
var CowLog = require(__base + 'models/cowlog');
router = express.Router();

dao.startLogs(function (err) {
    console.log("Starting listening");
});

router.get('/cow_result/:result', function (req, res) {
    //b66a0f6f-487a-4073-8c0c-6242fd3a217b_-114.232_51.332_37.2
    var result = req.params.result;
    var data = result.split('_');
    var c = new CowLog();
    c.cowId = data[0];
    c.longitude = parseFloat(data[2]);
    c.latitude = parseFloat(data[1]);
    c.temp = parseFloat(data[3]);
    dao.logCow(c, function (err, result) {
        if (err) {
            console.error(err.stack);
            return res.status(400).send(err.message);
        }
        res.send("OK");
    });
});

router.get('/', function (req, res) {
    res.render('index');
});

module.exports = router;