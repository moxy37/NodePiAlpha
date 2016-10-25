var express = require('express');
var GpioController = require(__base + 'controllers/gpiocontroller');
var controller = new GpioController();
var Gpio = require(__base + 'models/gpio');
router = express.Router();

router.get('/delete_gpio/:id', function (req, res) {
    var id = req.params.id;
    controller.remove(id, function (err) {
        if (err) {
            console.error(err.stack);
            return res.status(404).send(err.message);
        }
        controller.list(function (err, gpios) {
            if (err) {
                console.log(err.stack);
                return res.status(404).send(err.message);
            }
            return res.send(gpios);
        });
    });
});

router.get('/create_gpio', function (req, res) {
    var gpio = new Gpio();
    return res.send(gpio);
});

router.post('/save_gpio', function (req, res) {
    var gpio = new Gpio(req.body);
    controller.save(gpio, function (err, gpio) {
        if (err) {
            console.error(err.stack);
            return res.status(400).send(err.message);
        }
        controller.list(function (err, gpios) {
            if (err) {
                console.log(err.stack);
                return res.status(404).send(err.message);
            }
            return res.send(gpios);
        });
    });
});

router.get('/get_gpio/:id', function (req, res) {
    var id = req.params.id;
    controller.find(id, function (err, gpio) {
        if (err) {
            console.error(err.stack);
            return res.status(404).send(err.message);
        }
        return res.send(gpio);
    });
});

router.get('/get_gpio_list', function (req, res) {
    controller.list(function (err, gpios) {
        if (err) {
            console.log(err.stack);
            return res.status(404).send(err.message);
        }
        return res.send(gpios);
    });
});

module.exports = router;