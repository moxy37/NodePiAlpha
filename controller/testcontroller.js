var express = require('express');
var TestDAO = require(__base + 'dao/testdao');
var dao = new TestDAO();
router = express.Router();



router.post('/set_gpio_out', function (req, res) {
    var obj = req.body;
    var pin = obj.pin;
    var status = obj.status;
    dao.gpioOut(pin, status, function (err) {
        if (err) {
            console.error(err.stack);
            return res.status(400).send(err.message);
        }
        res.send("OK");
    });
});

router.get('/motion/:id', function (req, res) {
    var id = req.params.id;
    var pin = 12;
    var status = true;
    dao.gpioOut(pin, status, function (err) {
        if (err) {
            console.error(err.stack);
            return res.status(400).send(err.message);
        }
        res.send("OK");
    });
});

router.get('/no_motion/:id', function (req, res) {
    var id = req.params.id;
    var pin = 12;
    var status = false;
    dao.gpioOut(pin, status, function (err) {
        if (err) {
            console.error(err.stack);
            return res.status(400).send(err.message);
        }
        res.send("OK");
    });
});
router.get('/test_bj/:id', function (req, res) {
    var status = true;
    var pin = 12;
    if (__bjLight === true) {
        status = false;
        __bjLight = false;
    } else {
        __bjLight = true;

    }
    var cmd = require('node-cmd');
    if (String(status) === 'true') {
        cmd.run('python ' + __base + 'GpioOut.py ' + pin + ' 1');
    } else {
        cmd.run('python ' + __base + 'GpioOut.py ' + pin + ' 0');
    }
    res.send("OK");
});
router.get('/test_gpio_high/:id', function (req, res) {

    var id = req.params.id;
    var pin = 12;
    var status = true;
    if (__light === true) {
        status = false;
        __light = false;
    } else {
        status = true;
        __light = true;
    }
    dao.gpioOut(pin, status, function (err) {
        if (err) {
            console.error(err.stack);
            return res.status(400).send(err.message);
        }
        res.send("OK");
    });
});

router.get('/test_gpio_low/:id', function (req, res) {

    var id = req.params.id;
    console.log("Got Low Reading for " + id);
    return res.send("OK");
});

router.get('/test_gpio_data/:id', function (req, res) {

    var id = req.params.id;
    console.log("Got Data Reading for " + id);
    return res.send("OK");
});

router.get('/test', function (req, res) {
    res.render('test');
});

module.exports = router;