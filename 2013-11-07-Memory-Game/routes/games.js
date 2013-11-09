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

  for(var i = 1; i <= req.query.pieces; i++){
    game.cards.push(i);
    game.cards.push(i);
  }
  game.cards = _.shuffle(game.cards);

  game.save(function(err, game){
    res.send(game);
  });
};

/*
 * GET /games/:id
 */

exports.show = function(req, res){
  console.log('games.show'.italic.underline.bold.magenta);
  console.log('first is params, 2nd is query');
  console.log(req.params); //id
  console.log(req.query); //card index


  Game.findById(req.params.id, function(err, game){
    game.cardValue = game.cards[req.query.cardIndex];
    game.cardIndex = req.query.cardIndex;
    game.save(function(err, game){
      res.send(game);
    });
  });

  // res.render('games/index', {title: 'Memory'});
};
