var express = require('express');
var TestDAO = require(__base + 'dao/testdao');
var dao = new TestDAO();
var CowLog = require(__base + 'models/cowlog');
router = express.Router();



router.get('/api/cow/start', function (req, res) {
    dao.startLogs(function (err) {
        console.log("Starting listening");
        if (err) {
            console.error(err.stack);
            return res.status(400).send(err.message);
        }
        var t = new Object();
        t.status = "OK";
        return res.send(t);
    });
});

router.get('/api/cow/log/:result', function (req, res) {
    //b66a0f6f-487a-4073-8c0c-6242fd3a217b_-114.232_51.332_37.2
    var r2 = req.params.result;
    var result = r2.replace(/[^\x20-\x7E]/g, '');
    var data = result.split('_');
    var c = new CowLog();
    c.cowId = data[3];
    c.longitude = parseFloat(data[1]);
    c.latitude = parseFloat(data[0]);
    c.temp1 = parseFloat(data[4]);
    c.temp2 = parseFloat(data[5]);
    c.rssi = parseFloat(data[2]);
    c.notes = '';
    dao.logCow(c, function (err, result) {
        if (err) {
            console.error(err.stack);
            return res.status(400).send(err.message);
        }
        var t = new Object();
        t.status = "OK";
        return res.send(t);
    });
});

router.get('/api/cow/update/:notes', function (req, res) {
    var notes = req.params.notes;
    dao.updateNotes(notes, function (err, result) {
        if (err) {
            console.error(err.stack);
            return res.status(400).send(err.message);
        }
        var t = new Object();
        t.status = "OK";
        return res.send(t);
    });
});

router.get('/api/cow/results', function (req, res) {
    dao.cowResults(function (err, result) {
        if (err) {
            console.error(err.stack);
            return res.status(400).send(err.message);
        }
        return res.send(result);
    });
});

router.get('/api/light/set/:value', function (req, res) {
    var value = parseInt(req.params.value);
    __light = value;
    var t = new Object();
    t.value = value;
    return res.send(t);
});
router.get('/api/light/get', function (req, res) {
    return res.send(__light);
});
router.get('/', function (req, res) {
    res.render('index');
});

module.exports = router;