global.__base = __dirname + '/';
global.__light = false;
global.__bjLight = false;

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');

var app = express();

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.listen(80, function () {
	console.log('Node Alpha app listening on port 80!');
});

app.use('/', require('./controller/testcontroller'));

module.exports = app;
