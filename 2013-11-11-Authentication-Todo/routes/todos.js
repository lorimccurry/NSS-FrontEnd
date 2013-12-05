// var colors = require('colors');
var mongoose = require('mongoose');
var ToDo = mongoose.model('ToDo');


// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random

/*
 * POST /todos
 */

exports.create = function(req, res){ //what's being made will now be attached to a particular user
  req.body.user = res.locals.user; //added a 4th property called user and then defined in middleware before the routes; req.body now has title, category, date AND user

  new Todo(req.body).save(function(err, todo){
    res.send(todo);
  });
};


exports.update = function(req, res){
  Todo.findById(req.params.id, function(err, todo){ //find id that came in thru params
    todo.isComplete = !todo.isComplete; //set id = to what came thru, and then when click back and forth on checkbox, this will flip back and forth
    todo.save(function(err, todo){
      res.send(todo);
    });
  });
};
