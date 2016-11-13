global.__base = __dirname + '/';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');

var routes = require('./routes');


var app = express();

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/test', routes.test);
app.get('/gpio', routes.gpio);

app.listen(80, function () {
	console.log('Node Alpha app listening!');
});
var GpioController = require(__base + 'controllers/gpiocontroller');
var controller = new GpioController();
controller.startGpio(function (err) { });

app.use('/', require('./routers/testrouter'));
app.use('/', require('./routers/gpiorouter'));

module.exports = app;
