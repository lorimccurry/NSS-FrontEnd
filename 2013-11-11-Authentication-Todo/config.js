var express = require('express');
var path = require('path');
var less = require('express-less');
var middleware = require('./lib/middleware'); //software you use in the middle of your other code

exports.initialize = function(app, RedisStore){
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  // app.use(function(req, res, next){
  //   console.log('---aaa---'); //first thing in pipeline - data hits this first for everything in the pipeline
  //   res.locals.a = 3;
  //   next();
  // });

  app.use(express.favicon());  //this and below is the pipeline - the modules the data worms its way through
  app.use(express.logger('dev'));


  // app.use(function(req, res, next){
  //   console.log('---bbb---');
  //   console.log(res.locals.a);
  //   next();
  // });

//can comment out any of static files below and see how on the network tab that they effect the page request
  app.use(express.bodyParser()); //bodyParser thru less are all static and they stop at this one point
  app.use(express.methodOverride()); //allows you to do puts/deletes
  app.use(express.static(path.join(__dirname, 'public'))); //are you serving static images, audios,videos
  app.use('/less', less(__dirname + '/less', { compress: true })); //do you want a less file?

  // app.use(function(req, res, next){
  //   console.log('---ccc---');
  //   next();
  // });

  app.use(express.cookieParser()); //i know how to read cookies
  app.use(express.session({ //will store my session in redis; if want to use info from session, need to access in res.locals after this
    store : new RedisStore({host: 'localhost', port: 6379}), //stores session state
    secret: 'change-this-to-a-super-secret-message',
    cookie: { maxAge: 60 * 60 * 1000 } //how long cookies expire for; in milliseconds; this is for an hour, and if havent used in over an hour, you cookie expires and you effectively log out
  }));

  app.use(middleware.findUser);

  // app.use(function(req, res, next){
  //   console.log('---after---');
  //   console.log(res.locals.user);
  //   next();
  // })

  app.use(app.router); //connects to routes in app.js ; if want to access session data, want to do it before this point before passed out to route fns

  if ('development' === app.get('env')) {
    app.use(express.errorHandler());
  }
};
