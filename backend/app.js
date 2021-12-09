var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport')
var app = express();

require('dotenv').config()
require('./passport').config(passport);
var userRouter = require('./routes/users');



app.use('/api', userRouter);


app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized:true,
    cookie:{
      httpOnly: true,
      secure:false,
    }
}));

app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
