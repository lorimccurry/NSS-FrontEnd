var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var _ = require('lodash');




var colors = require('colors');
// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random

/*
 * GET /
 */

exports.index = function(req, res){
  console.log('games.index'.italic.underline.bold.magenta);
  res.render('games/index', {title: 'Memory'});
};

/*
 * POST /games/start
 */

exports.create = function(req, res){
  var game = new Game(req.query);
  console.log(game);
  console.log(req.query);

  for(var i = 1; i <= req.query.pieces; i++){
    game.cards.push(i);
    game.cards.push(i);
  }
  game.cards = _.shuffle(game.cards);

  game.save(function(err, game){
    res.send(game);
  });
};
