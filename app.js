var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var ejs = require('ejs');

var Promise = require('bluebird');
var CONFIG = require("./config/CONFIG")
// var mongoose = require('mongoose');
// Promise.promisifyAll(mongoose);

// var uri = CONFIG.MONGOOSE.URI;
// var mongoOptions = CONFIG.MONGOOSE.OPTION;
// mongoose.Promise = require('bluebird');
// global.db = mongoose.createConnection(uri,mongoOptions);
// mongoose.connection = global.db;
var Sequelize = require('sequelize');
var tedious = require('tedious');
var dataBase = CONFIG.SQLSERVER.dataBase;
var userName = CONFIG.SQLSERVER.userName;
var password = CONFIG.SQLSERVER.pwd;
var baseConfig = CONFIG.SQLSERVER.baseConfig;
global.sequelize = new Sequelize(dataBase,userName,password,baseConfig);

// db.on("open",function(){
//   console.log("dbopen")
// })

var app = express();
var routes = require('./routes/index');
var users = require('./routes/users');
var member = require('./routes/member');
var template = require('./routes/template');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('.ejs',ejs.__express);
app.set('view engine','ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/member',member);
app.use('/template', template);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
