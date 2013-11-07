var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Genre = mongoose.model('Genre');
var _ = require('lodash');

/*
 * GET /songs
 */

exports.index = function(req, res){
  Song.find(function(err, songs){
    res.render('songs/index', {title: 'Song Index', songs: songs});
  });
};

/*
 * GET /songs/new
 */

exports.new = function(req, res){
  Genre.find(function(err, genres){ //all genres in db
    res.render('songs/new', {title: 'New Song', song: new Song(), genres: genres}); //render new jade file
  });
};

/*
 * POST /songs
 */

exports.create = function(req, res){
    console.log(req.body); //whats being sent in from user input
    new Song(req.body).save(function(err, song, count){ //new song, put the body in it and save; count is either 1 or 0
      // debugger;
      if(songErr){
        Genre.find(function(genreErr, genres){ //there was some error, but before you find it, find the genres first
          res.render('songs/new', {title: 'New Song', err: songErr, song: new Song(), genres: genres}); //you're wanting songErr from 1st fn, so call different things so error isnt overridden
        });
      }else{
        // req.body.genres = req.body.genres.split(', '); find all Genres where Genres id is in the song.genres id list and matches
        Genre.find().where('_id').in(song.genres).exec(function(err, genre){
          for( var i = 0; i < genres.lenght)
        });
        res.redirect('/songs');
      }
    });
  };
// exports.create = function(req, res){
//   console.log('--before--');
//   console.log(req.body);
//   req.body.genres = req.body.genres.split(', '); //fixes multi genre entry: outputs an array of strings
//   new Song(req.body).save(function(err, song, count){
//     console.log('--after--');
//     console.log(song);
//     res.redirect('/songs');
//   });
// };

/*
 * SHOW /songs/:id
 */

exports.show = function(req, res){
  Song.findById(req.params.id).populate('genres').exec(function(err, song){
    //genres is property of songs, and populate takes ids and converts from numbers to words
    res.render('songs/show', {title: 'Song:' + song.title, song: song});
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
  Genre.find(function(err, genres){ //pass it every genre
    Song.findById(req.params.id).populate('genres').exec(function(err, song){ //find 1 song; err and song is the callback from the server
      res.render('songs/edit', {title: 'Edit Song', song: song, genres: genres}); //what shipped out to page
    });
  });
};

/*
 * PUT /songs/:id
 */

exports.update = function(req, res){ //they just made an edit and want to show them the individual song now
  Song.findByIdAndUpdate(req.params.id, req.body, function(err, song){
    res.redirect('/songs/' + req.params.id); //redirecting to the show method
  });
};