var async = require('async');
var __ = require('lodash');
var m = require('../lib/mechanics'); //looks to mechanics.js and puts them all in a var called m
var io; //closure

exports.connection = function(socket){
  io = this; //represents all the sockets (closure)
  socket.emit('connected', {status: 'connected'});
  socket.on('disconnect', socketDisconnect);
  socket.on('startgame', socketStartGame);
  socket.on('playermoved', socketPlayerMoved);
  socket.on('attack', socketAttack);
};

function socketStartGame(data){
  var storage = {};
  var socket = this; //represents an individual socket

  async.waterfall([ //allows us to call fns in order
    function(fn){m.findGame(data.game,fn);}, //find game when someone wants to join; populate w/ all players inside
    function(game,fn){if(!game){m.newGame(data.game,fn);}else{fn(null,game);}}, //if game doesnt exist, create a new one
    function(game,fn){storage.game=game;fn();}, //if does exist, find game
    function(fn){m.findPlayer(data.player,fn);}, //find player
    function(player,fn){if(!player){m.newPlayer(data.player,data.color,fn);}else{fn(null,player);}}, //if doesnt exist, create new
    function(player,fn){m.resetPlayer(player,socket,fn);}, //player gets new socket id
    function(player,fn){storage.player=player;fn();},
    function(fn){fn(null,__.any(storage.game.players,function(p){return p.id===storage.player.id;}));},
    function(isFound,fn){if(!isFound){m.attachPlayer(storage.game,storage.player,fn);}else{fn(null,storage.game);}},
    function(game,fn){m.findGame(data.game,fn);}, //if player exits; then rejoins w/ new socket, must search for the game again, or the old game tries to reconnect w/ player's old socket which he is no longer on, so must re-find the game again so old player's new socket will join with the re-joined game-state
    function(game,fn){m.emitPlayers(io.sockets,game.players,fn);}
  ]);
}

function socketPlayerMoved(data){
  // console.log(data);
  //every time make a request and leave, the socket data goes away too

  async.waterfall([//give me an array of fns, and array of fn wil be run in order; first fn is the one that ties all the rest together - similar to calling next in the pipeline: 'fn' is synonymous to next
    function(fn){/*console.log('i am first!');*/ m.findPlayer(data.player, fn);}, //fn is magical; {} is finding the player in the db: use mechanics in lib; takes 2 params: name of player and the next fn; findPlayer returns 1)error 2)the player
    function(player, fn){m.updateCoordinates(player, data.x, data.y, fn);}, //takes player info from above fn that's passed down
    function(player, fn){m.findGame(data.game, fn);}, //will find game and populate all players inside
    function(game,fn){m.emitPlayers(io.sockets,game.players,fn);} //like a lego block you can pop in from above; emit all the players (send a message), it effectively redraws the board each time
  ]);
}

function socketAttack(data){
  console.log('socket attack: ' + data);

  async.waterfall([
    function(fn){console.log('i am first'); m.findPlayer(data.prey,fn);},
    function(player,fn){m.playerAttacked(player,fn);},
    function(player,fn){m.findGame(data.game,fn);},
    function(game,fn){m.emitPlayers(io.sockets,game.players,fn);}
  ]);
}

function socketDisconnect(data){
  console.log(data);
}

//-----------------------VERSION 2-------------------------------//
// var mongoose = require('mongoose');
// var Game = mongoose.model('Game');
// var Player = mongoose.model('Player');
// var __ = require('lodash');

// exports.connection = function(socket){
//   socket.emit('connected', {status: 'connected'}); //1st param is msg you want to send, 2nd is data you want to send in msg, so here sending a connected msg plus the data
//   socket.on('disconnect', socketDisconnect); //server will accept a disconnect and a start game msg from browswer
//   socket.on('startgame', socketStartGame); //when rcv startgame msg from a socket, call the fn socketStartGame
// };

// function socketDisconnect(){
// }

// function socketStartGame(data){
//   var socket = this;

//   Game.findOne({name: data.name}).populate('players').exec(function(err, game){
//     if(game){
//       console.log('found old game');
//       addPlayer(game, data, socket);
//     } else {
//       new Game({name: data.name}).save(function(err, game){
//         Game.findById(game.id).populate('players').exec(function(err, game){
//           console.log('created new game');
//           addPlayer(game, data, socket);
//         });
//       });
//     }
//   });
// }

// function addPlayer(game, data, socket){
//   Player.findOne({name: data.player}, function(err, player){
//     if(player){
//       var isFound = __.any(game.players, function(id){return id.toString() === player.id;});
//       if(isFound){
//         player.health = 100;
//         player.save(function(err, player){
//           console.log('player found and health restored');
//           console.log(game);
//           notifyPlayersOfJoin(game.players, socket);
//         });
//       } else {
//         new Player({name: data.player, color: data.color, socketId: socket.id}).save(function(err, player){
//           game.players.push(player);
//           game.save(function(err, game){
//             console.log('new player added to game');
//             console.log(game);
//             notifyPlayersOfJoin(game.players, socket);
//           });
//         });
//       }
//     } else {
//       new Player({name: data.player, color: data.color, socketId: socket.id}).save(function(err, player){
//         game.players.push(player);
//         game.save(function(err, game){
//           console.log('new player added to game');
//           console.log(game);
//           notifyPlayersOfJoin(game.players, socket);
//         });
//       });
//     }
//   });
// }

// function notifyPlayersOfJoin(players, socket){
//   console.log('sending a message');
//   for(var i = 0; i < players.length; i++){
//     console.log(players[i]);
//     if(socket.namespace.sockets[players[i].socketId]){
//       socket.namespace.sockets[players[i].socketId].emit('playerjoined', {players:players});
//     }
//   }
// }


//-----------------------VERSION 1 W/ NOTES------------------------------//
// var mongoose = require('mongoose');
// var Game = mongoose.model('Game');
// var Player = mongoose.model('Player');
// var __ = require('lodash');

// exports.connection = function(socket){
//   socket.emit('connected', {status: 'connected'}); //1st param is msg you want to send, 2nd is data you want to send in msg, so here sending a connected msg plus the data
//   socket.on('disconnect', socketDisconnect); //server will accept a disconnect and a start game msg from browswer
//   socket.on('startgame', socketStartGame); //when rcv startgame msg from a socket, call the fn socketStartGame
// };

// function socketStartGame(data){ //use data as param so data gets to fn; when click startGame, all browsers are calling this fn
//   // console.log('received a start game msg from a browser');
//   // console.log(data); //data rcvd from broswer

//   // console.log('this is the socket');
//   // console.log(this);
//   var socket = this;

//   Game.findOne({name: data.name}).populate('players').exec(function(err, game){
//     // console.log(game);
//     // console.log(error);
//     if(game){
//       console.log('found old game');
//       console.log(game);
//       addPlayer(game, data, socket); //passing this into the parameter and it is the socket
//       notifyPlayersOfJoin();
//     } else {
//       new Game({name: data.name}).save(function(err, game){ //must send an object
//         Game.findById(game.id).populate('players').exec(function(err, game){
//           console.log('created new game');
//           console.log(game);
//           addPlayer(game, data, socket); //"this" is a mongoose object inside of this fn, so it's not referring to what we actually need to target and instead a mongoose object
//         });
//       });
//     }
//   });
// }

// function addPlayer(game, data, socket){ //socket is the this from the above fn that was passed down
//   console.log('this is addPlayer data');
//   console.log(game);
//   console.log(data);

//   Player.findOne({name: data.player}, function(err, player){
//     console.log(game);
//     if(player){
//       var isFound = __.any(game.players, function(id){return id.toString() === player.id;}); //i have a game with a bunch of player and want to know if bob is anywhere inside the list of players
//       if(isFound){
//         player.health = 100;
//         player.save(function(err, player){
//           console.log('player found and health restored');
//           notifyPlayersOfJoin(game.players, socket); //notifying the players inside that game alone
//           // console.log('socket is below this');
//           // console.log(socket);
//         });
//       } else {
//         new Player({name: data.player, color: data.color, socketId: socket.id}).save(function(err, player){
//           game.players.push(player);
//           game.save(function(err, game){
//             console.log('new player added to game');
//             notifyPlayersOfJoin(game.players, socket); //notifying the players inside that game alone
//           });
//         });
//       }
//     } else {
//       new Player({name: data.player, color: data.color, socketId: socket.id}).save(function(err, player){
//         game.players.push(player);
//         game.save(function(err, game){
//           console.log('new player added to game');
//           notifyPlayersOfJoin(game.players, socket); //notifying the players inside that game alone
//         });
//       });
//     }
//   });
// }

// function notifyPlayersOfJoin(players, socket){
//   console.log('sending a message');
//   //console.log(socket);
//   for(var i = 0; i < players.length; i++){
//     console.log(players[i]);
//     if(socket)
//     socket.namespace.sockets[players[i].socketId].emit('playerjoined', {players:players}); //sending message to janet saying all the players in her particular game
//   }
// }