var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var Player = mongoose.model('Player');
var __ = require('lodash');

//took large fns and made into smaller blocks; all fns have intent to find, change, update something in the db

exports.findGame = function(name, fn){
  Game.findOne({name:name}).populate('players').exec(function(err, game){
    fn(err, game);
  });
};

exports.newGame = function(name, fn){
  new Game({name:name}).save(function(err, game){
    Game.findById(game.id).populate('players').exec(function(err, game){
      fn(err, game);
    });
  });
};

exports.findPlayer = function(name, fn){ //fn is the fn to call when this fn is done
  Player.findOne({name:name}, function(err, player){
    fn(err, player); //call whoever is next in line in the waterfall; must run err first, so the waterfall will kick out before running next fn; giving next fn a player
  });
};

exports.newPlayer = function(name, color, fn){
  new Player({name:name, color:color}).save(function(err, player){
    fn(err, player);
  });
};

exports.resetPlayer = function(player, socket, fn){ //if bob wants to come back, can't use his initial socket id-need a new socket
  player.socketId = socket.id;
  player.health = 100;
  player.save(function(err, player){
    fn(err, player);
  });
};

exports.updateCoordinates = function(player, x, y, fn){ //give player and new coord params; this is to change the db
  player.x = x;
  player.y = y;
  player.save(function(err, player){ //player is the output
    fn(err, player); //next in line; pass in player (dont have to pass in anything), but to pass in player, you must pass in err first so waterfall will kick out -from mongoose errors (removes need for 'if')
  });
};

exports.playerAttacked = function(player, fn){
  player.health -= __.sample(__.range(10));
  player.save(function(err, player){
    fn(err, player);
  });
};

exports.attachPlayer = function(game, player, fn){ //takes a game and player and attaches game to player
  game.players.push(player);
  game.save(function(err, game){
    fn(err, game);
  });
};

exports.emitPlayers = function(sockets, players, fn){ //loops thru all peeps in game and let them know who's in the game
  for(var i = 0; i < players.length; i++){
    if(sockets[players[i].socketId]){
      sockets[players[i].socketId].emit('playerjoined', {players:players});
    }
  }
  fn();
};