var db = require('../modules/database');
var file = __dirname + '/../db/movies.json';
var Movie = require('../models/movie.js'); //***any time you call a constructor, it should be capitalized
var _ = require('lodash');

/*
 * GET /movies
 */

exports.index = function(req, res){
  var genericMovies = db.read(file); //what db reading from? reads all text, parses, turns into array of generic movie objects
  var movies = _.map(genericMovies, function(genericMovie){ //take generic movie and passes in
    return new Movie(genericMovie);
  }); //create generic array of movie object to Movie object; //takes array of generic objects and transforms into array of movie objects

  res.render('movies/index', {title: 'Movies', movies: movies}); //property of movies that's equal to array of movies
};


/*
 * DELETE /movies/When Harry Met Sally
 */

exports.delete = function(req, res){
  var title = req.params.title; //params means grab out of url
  var movies = db.read(file); //array of generic movies; can only save data to files, not fn; dont' need to convert b/c we're deleting something from db - just need title
  movies = _.reject(movies, function(movie){return movie.title === title;});
    //loop over movies; take each movie in movies and reject the one that has a matching title and return an array w/o it
    //match to title won't be saved
    //opposite fn of filter
  db.write(file, movies);
  res.redirect('/movies');
};

/*
 * GET /movies/new
 */

exports.new = function(req, res){
    res.render('movies/new', {title: 'Movies: New'});
};

/*
 * POST /movies
 */

exports.create = function(req, res){

    var title = req.body.title;
    var image = req.body.image;
    var color = req.body.color;
    var rated = req.body.rated;
    var studio = req.body.studo;
    var gross = parseFloat(req.body.gross);
    var numTheatres = parseInt(req.body.numTheatres);

    var movies = db.read(file);
    var movie = {title: title, image: image, color: color, rated: rated, studio: studio, gross: gross, numTheatres: numTheatres};
    movies.push(movie);
    db.write(file, movies);
    res.redirect('/movies');
};