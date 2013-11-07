var mongoose = require('mongoose');
var _ = require('lodash');


var Game = mongoose.Schema({
  cards     : [Number], //default can be a)literal b)the name of a fn (not called)
  pieces    : Number,
  didWin    : {type: Boolean, default: false}, //when new up an object, default is false
  player    : String,
  createdAt : {type: Date, default: Date.now}, //name of a fn not called
  gameEnd   : Date

});

mongoose.model('Game', Game);
