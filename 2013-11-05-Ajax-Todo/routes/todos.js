var mongoose = require('mongoose');
var Priority = mongoose.model('Priority');
var Todo = mongoose.model('Todo');
var moment = require('moment');

/*
 * GET /todos
 */

exports.index = function(req, res){
  Priority.find(function(err, priorities){
    Todo.find().populate('priority').exec(function(todoErr, todos){ // w/ populate you can do todo.priority.name, color, etc
      res.render('todos/index', {title: 'Express', priorities: priorities, todos: todos, moment: moment});
    });
  });
};

/*
 * POST /todos
 */

exports.create = function(req, res){
  //console.log(req.body); good 1st step: see what's in body
  new Todo(req.body).save(function(err, todo, count){
    Todo.findById(todo.id).populate('priority').exec(function(err, todo){
      res.send(todo); //res.send purpose is to send json
      // console.log(err);
      // console.log(todo);
    });
  });
};


/*
 * DELETE /todos/:id
 */

exports.delete = function(req, res){
  Todo.findByIdAndRemove(req.params.id, function(err, todo){ //remove this particular todo, and when occurs, send back the todo
    res.send(todo);
  });
};

/*
 * PUT /todos/:id/complete
 */

exports.completed = function(req, res){
  Todo.findById(req.params.id, function(err, todo){
    todo.completed = !todo.completed; //change id from the opposite it was before
    todo.save(function(err, todo){ //send a null (err) or todo JSON object back to browser to let it know what to do on UI
      res.send(todo);
    });
  });
};