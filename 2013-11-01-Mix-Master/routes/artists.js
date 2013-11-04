var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Artist = mongoose.model('Artist');

/*
 * GET /artists
 */

exports.index = function(req, res){
  res.render('artists/index', {title: 'Mix Master: Artists'});

};


/*
 * GET /artists/new
 */

exports.new = function(req, res){
  Song.find(function(err, songs){
    res.render('artists/new', {title: 'Mix Master: New Artist', songs: songs});
  });
};

/*
 * POST /artists
 */

exports.create = function(req, res){
    console.log('--before--');
    console.log(req.body);

    new Artist(req.body).save(function(err, artist, count){
      console.log('--after--');
      console.log(artist);
      res.redirect('/artists');
    });
};

