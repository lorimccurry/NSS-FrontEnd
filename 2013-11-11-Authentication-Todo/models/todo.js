var mongoose = require('mongoose');

var ToDo = mongoose.Schema({
  title       : {type: String, required: true},
  category    : String,
  dueDate     : Date,
  isComplete  : {type: Boolean, default: false},
  user        : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //which user in the system is this tied to?; most important: when go to save todo, the form has all the info, but the cookie is what ties the form to the user (cookie has session id); user was found in middleware prior to routes
  createdAt   : {type: Date, default: Date.now}
});

mongoose.model('ToDo', ToDo);
