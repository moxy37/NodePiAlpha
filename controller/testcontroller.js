var express = require('express');
var TestDAO = require(__base + 'dao/testdao');
var dao = new TestDAO();
var CowLog = require(__base + 'models/cowlog');
router = express.Router();

// dao.startLogs(function (err) {
//     console.log("Starting listening");
// });

router.get('/cow_result/:result', function (req, res) {
    var result = req.params.result;
    var c = new CowLog();
    c.cowId = '1';
    c.longitude = 0;
    c.latitude = 0;
    c.temp = 0;
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