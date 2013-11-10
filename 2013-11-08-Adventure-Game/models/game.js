var mongoose = require('mongoose');
var _ = require('lodash');


var Game = mongoose.Schema({
  board         : [{}],
  size          : Number,
  health        : Number,
  didWin        : {type: Boolean, default: false},
  player        : String,
  createdAt     : {type: Date, default: Date.now}
});

Game.pre('save', function(next){
  if(!this.board.length){
    this.board = _.range(this.size * this.size);

    var types = _.map(this.board, function(n){return {type: 'blank'};});
    types[0].type = 'player';
    types[1].type = 'princess';
    types[2].type = 'gold';
    types[3].type = 'wormhole';
    types[4].type = 'wormhole';
    types[5].type = 'exit';
    types[6].type = 'death';
    types = _.shuffle(types);

    var index = _.map(this.board, function(n){return {index: n+1};});

    // this.board = _.merge(types, index);
    this.board = _.merge(types);

    // this.board = _.map(this.board, function(n){return {type: 'blank'};});
    // this.board[0].type = 'player';
    // this.board[1].type = 'princess';
    // this.board[2].type = 'gold';
    // this.board[3].type = 'wormhole';
    // this.board[4].type = 'wormhole';
    // this.board[5].type = 'exit';
    // this.board[6].type = 'death';

    // this.board.type = _.shuffle(this.board);


    // console.log(this.board[0]);
    // this.board = _.map(this.board, function(n){return {type: 'blank'}, {index: n+1};});
    // this.board = _.map(this.board, function(n){return {index: n+1};});
    // console.log(this.board[0]);

  }
  next();
});


mongoose.model('Game', Game);
