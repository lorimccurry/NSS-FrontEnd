/* global document, getValue, window, io */ //globals...add here if you don't want grunt to warn: like 'alert'

$(document).ready(initialize);

var socket, game, player, color, players = [];

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  $('#start').on('click', clickStart);
  $('body').on('keyup', keyupMove);
}

//----------------------------------------------------------------//

function keyupMove(e){
  // console.log(e.keyCode);
  // console.log('this is e: ' + e);
  var isArrow = _.any([37, 38, 39, 40], function(i){return i === e.keyCode;}); //if i pressed an arrow key, run this code

  if(e.keyCode === 72){
    var prey = findPrey();

    socket.emit('attack', {game:game, predator:player, prey:prey.name});
  }
  if(isArrow){
    // debugger;
    var p = findPredator(); //an object that contains all the info on a player

    switch(e.keyCode){
      case 38:
        //up
        p.y--;
        break;
      case 40:
        //down
        p.y++;
        break;
      case 37:
        //left
        p.x--;
        break;
      case 39:
        //right
        p.x++;
        break;
    }

    socket.emit('playermoved', {game:game, player:player, x:p.x, y:p.y}); //letting server know you just moved so can broadcast out
  }
}

function clickStart(){
  player = getValue('#player'); //on utilities fn page
  color = getValue('#color');
  game = getValue('#game');

  $('table#game').removeClass('hidden');
  $('#current-player').css('color', color).text(player);

  //now want to send to server via socket
  socket.emit('startgame', {game:game, player:player, color:color}); //emit is like talking on a walkie-talkie: both server and browser can talk
}
//----------------------------------------------------------------//
function findPredator(){ //find self in list of players; solution is to keep all players in memory and keep using them
  return _.find(players, function(p){return p.name === player;});
}

function findPrey(){
  var predator = findPredator();
  return _.find(players, function(p){return p.x === predator.x && p.y === predator.y && p.name !== player;});
}

//----------------------------------------------------------------//
function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected); //when broswer rcvs connected msg from app.js and common.js in server; when emmit from server, connected receives the message here
  socket.on('playerjoined', socketPlayerJoined);
}

function socketPlayerJoined(data){
  // console.log(data);
  // console.log(data.players);
  players = data.players; //now have a local copy of all the players and all the info on them; an array of all the player data
  htmlResetBoard();
  for(var i = 0; i < data.players.length; i++){
    if(data.players[i].health > 0){
      htmlAddPlayer(data.players[i]);
    }
  }
  // $.each(data.players, function(index, player){
  //   htmlAddPlayer(index, player);
  // });
}

function socketConnected(data){
  console.log(data);
}
//----------------------------------------------------------------//


function htmlAddPlayer(player){ //passing in index before
  // debugger;
  // console.log(index);
  console.log(player);
  var $cell = $('.cell[data-x="' + player.x + '"][data-y="' + player.y +'"]');
  if(player.name.length > 1){
    $cell.find('.player-full').hide();
    $cell.find('.player1').show();
    htmlDrawCell(player, $cell);
    $cell.find('.player2').show();
    htmlDrawCell(player, $cell);
  } else {
    $cell.find('.player-full').show();
    htmlDrawCell(player, $cell);
  }
}

function htmlDrawCell(player, $cell){
  $cell.find('.health').css('background-color', 'black');
  $cell.find('.health').css('width', player.health + '%');
  $cell.find('.player').css('background-color', player.color);
  $cell.find('.player').text(player.name);
}


function htmlResetBoard(){
  $('.cell .health').css('background-color', 'white');
  $('.cell .player').css('background-color', 'white');
  $('.cell .player').text('');
}

