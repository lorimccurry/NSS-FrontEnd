var mongoose = require('mongoose');

var Priority = mongoose.Schema({
  name      : String,
  color     : String,
  createdAt : {type: Date, default: Date.now}
});

mongoose.model('Priority', Priority); //putting Schema in memory which allows you to new Priority