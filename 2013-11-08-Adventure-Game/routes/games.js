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
  res.render('games/index', {title: 'Adventure Game'});
};

/*
 * GET /games/start
 */

exports.create = function(req, res){
  console.log('games.create'.italic.underline.bold.magenta);
  // console.log(req.query);

  new Game(req.query).save(function(err, game){
      console.log(game);
      res.send(game);
    });
};
