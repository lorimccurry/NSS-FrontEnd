var mm = require('money-math'); //brings in money-math dependency from package.json

var Movie = function(genericMovie){
  this.title = genericMovie.title;
  this.image = genericMovie.image;
  this.color = genericMovie.color;
  this.rated = genericMovie.rated;
  this.studio = genericMovie.studio;
  this.gross = genericMovie.gross;
  this.numTheatres = genericMovie.numTheatres;

  this.grossPerTheatre = function(){
    return this.gross / this.numTheatres;
  };

  this.grossUSD = function(){
    return '$' + mm.format('USD', mm.floatToAmount(this.gross)); // from documentation: 1) what curr want $ in?, 2) floating point you want to return amt
  //1)takes grossUSD, 2)converts to raw number, 3)convert to formatted amount
  };


  this.grossPerTheatreUSD = function(){
    return '$' + mm.format('USD', mm.floatToAmount(this.grossPerTheatre()));
  };
};

module.exports = Movie; //makes sure that this constructor can be used outside this module