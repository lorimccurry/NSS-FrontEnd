var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var User = mongoose.Schema({
  email       : { type: String, unique: true, required: true },
  password    : { type: String, required: true },
  isAdmin     : {type: Boolean, default: false},
  createdAt   : {type: Date, default: Date.now}
});

User.plugin(uniqueValidator); //from npm docs
mongoose.model('User', User);
