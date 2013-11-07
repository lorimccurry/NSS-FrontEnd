var mongoose = require('mongoose');
var Genre = mongoose.model('Genre');

/*
 * GET /genres
 */

exports.index = function(req, res){
  Genre.find(function(err, genres){ //generes queried from db
    res.render('genres/index', {title: 'Genre List', genres: genres});
  });
};

/*
 * GET /genres/new
 */

exports.new = function(req, res){
  res.render('genres/new', {title: 'New Genre', genre: new Genre()}); //no errors passed
};

/*
 * POST /genres
 */

exports.create = function(req, res){
  new Genre(req.body).save(function(err, genre, count){
    // debugger;
    if(err){
      res.render('genres/new', {title: 'New Genre', err: err, genre: new Genre()}); //err is an object, errors is all of your errs that you'll pass into jade file (have access to err)
    }else{
      res.redirect('/genres');
    }
  });
};

/*
 * GET /genres/:id/edit
 */

exports.edit = function(req, res){ //show (non destructive) something already created so can change
  Genre.findById(req.params.id, function(err, genre){
    res.render('genres/edit', {title: 'Edit Genre', genre: genre}); //render out the jade file: similar to new file; find the existing genre file
  });
};

/*
 * PUT /genres/:id
 */

exports.update = function(req, res){ //(destructive: modifies db)
  Genre.findByIdAndUpdate(req.params.id, req.body, function(err, genre){
    res.redirect('/genres');
  });
};
