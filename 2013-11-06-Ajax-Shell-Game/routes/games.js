var mongoose = require('mongoose');
var Game = mongoose.model('Game');


/*
 * GET /
 */

exports.index = function(req, res){
  res.render('games/index', {title: 'Shell Game'});
};

/*
 * POST /games/start
 */

exports.create = function(req, res){
  // res.send({player:req.query.player}); //verifies plumbing is in place
  // console.log(req.query)
  // res.send({});

  new Game(req.query).save(function(err, game){ //pass in an obj: req.query is an object w/ a property of player
//fn called when data is saved in db; only saving 1 game
  console.log(game);
  res.send(game);
  });
};

/*
 * PUT /games/:id
 */

exports.complete = function(req, res){
  // console.log(req.params);
  // console.log(req.body);
  // res.send({}); //if don't send, browser will spin

  Game.findById(req.params.id, function(err, game){
    game.guess = req.body.guess; //actual was created when game was
    game.didWin = game.guess == game.actual; //change 2 properties
    game.save(function(err, updatedGame){ //save back into db
      res.send(updatedGame); //send updated game back to browser w/ a true or false on the win
    });
  });
};