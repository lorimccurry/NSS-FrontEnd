var mongoose = require('mongoose');
var Song = mongoose.model('Song');

/*
 * GET /songs
 */

exports.index = function(req, res){
  res.render('songs/index', {title: 'Mix Master: Song List'});
};


/*
 * GET /songs/new
 */

exports.new = function(req, res){
  res.render('songs/new', {title: 'Mix Master: New Song'});
};

/*
 * POST /songs
 */

exports.create = function(req, res){
  console.log('--before--');
  console.log(req.body);
  req.body.genres = req.body.genres.split(', '); //fixes multi genre entry: outputs an array of strings
  new Song(req.body).save(function(err, song, count){
    console.log('--after--');
    console.log(song);
    res.redirect('/songs');
  });
};


/*
 * GET /songs
 */

exports.index = function(req, res){
  Song.find(function(err, songs){
    res.render('songs/index', {title: 'Mix Master: Songs', songs: songs});
  });
};

/*
 * SHOW /songs/:id
 */

exports.show = function(req, res){
  Song.findById(req.params.id, function(err, song){
    res.render('songs/show', {title: 'Mix Master: Song', song: song});
  });
};

/*
 * DELETE /songs/:id
 */

exports.delete = function(req, res){
  Song.findByIdAndRemove(req.params.id, function(err, song){
    res.redirect('/songs');
  });
};

/*
 * GET /songs/:id/edit
 */

exports.edit = function(req, res){
  Song.findById(req.params.id, function(err, song){
    res.render('songs/edit', {title: 'Mix Master: Song Edit', song: song});
  });
};

/*
 * PUT /songs/:id
 */

exports.update = function(req, res){ //they just made an edit and want to show them the individual song now
  res.redirect('/songs/' + req.params.id); //redirecting to the show method
};