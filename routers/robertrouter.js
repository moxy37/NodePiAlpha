var express = require('express');
// var TestController = require(__base + 'controllers/testcontroller');
// var controller = new TestController();
router = express.Router();


router.get('/hello_world/:id', function (req, res) {
    var id = parseInt(req.params.id);
    id++;
    var temp = 'Hello ' + id;
    res.send(temp);
});

module.exports = router;