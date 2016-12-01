exports.index = function (req, res) {
    res.render('index');
};

exports.test = function (req, res) {
    res.render('test');
};

exports.gpio = function (req, res) {
    res.render('gpio');
};

exports.robert = function(req,res){
    res.render('robert');
}