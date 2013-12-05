var mongoose = require('mongoose');
var User = mongoose.model('User');
var ToDo = mongoose.model('ToDo');


exports.findUser = function(req, res, next){//currently have access to session id
  if(req.session.userId){//is there a user id in my session?
    console.log('hello!!');
    User.findById(req.session.userId, function(err, user){
        if(user){ //if user object is found (not null)
          console.log('setting user');
          res.locals.user = user; //now can use ANYWHERE downstream in the pipeline
          next();
        }
      });
  } else {
    console.log('who are you?');
    next();
  }
};

exports.getTodos = function(req, res, next){
  if(res.locals.user){
    ToDo.find({user: res.locals.user}, function(err, todos){
      res.locals.todos = todos;
      next();
    });
  } else {
    res.locals.todos = [];
    next();
  }
};

exports.isAdmin = function(req, res, next){ //is run somewhere in the pipeline after the findUser fn
  if(res.locals.user.isAdmin){
    next();
  } else {
    res.end('you are not an admin');
  }
};