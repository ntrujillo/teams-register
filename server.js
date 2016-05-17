require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var mongoose = require('mongoose');


mongoose.connect('mongodb://'+config.connectionString);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));



// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/user/authenticate'] }));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/user', require('./controllers/api/user'));
app.use('/api/provincia', require('./controllers/api/provincia'));
app.use('/api/canton', require('./controllers/api/canton'));
app.use('/api/parroquia', require('./controllers/api/parroquia'));
app.use('/api/role', require('./controllers/api/role'));
app.use('/api/player', require('./controllers/api/player'));
app.use('/api/team', require('./controllers/api/team'));

require('script');

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

// start server
var server = app.listen(config.port, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});