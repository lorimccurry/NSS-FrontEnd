var mongoose = require('mongoose');
var _ = require('lodash');


var Game = mongoose.Schema({
  actual    : {type: Number, default: function(){return _.sample([0, 1, 2]);}}, //default can be a)literal b)the name of a fn (not called); this fn will randomly put coin under shell
  guess     : Number,
  didWin    : {type: Boolean, default: false}, //when new up an object, default is false
  player    : String,
  createdAt : {type: Date, default: Date.now} //name of a fn not called
});

mongoose.model('Game', Game);