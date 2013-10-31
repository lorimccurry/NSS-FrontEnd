// express application
var home = require('./routes/home');
var movies = require('./routes/movies');

// modules
var express = require('express');
var http = require('http');
var path = require('path');
var less = require('express-less');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/less', less(__dirname + '/less', { compress: true }));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// route definitions
app.get('/', home.index);
app.get('/movies', movies.index);
app.delete('/movies/:title', movies.delete); //when get a delete, going to movies, delete fn;
// /movies/:title goes into movies and accepts any title, will look in the title param in db and delete it
app.get('/movies/new', movies.new);
app.post('/movies', movies.create);

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// [
// {
//   "title":"When Harry Met Sally",
//   "image":"http://1.bp.blogspot.com/-M293gOYTyng/Ti0C_CYhDZI/AAAAAAAAABE/2DfpjQuVmts/s1600/when-harry-met-sally-original.jpg",
//   "color":"red",
//   "rated":"R",
//   "studio":"mgm",
//   "gross":3764921837,
//   "numTheatres":527
// },
// {
//   "title":"Silence of the Lambs",
//   "image":"http://ia.media-imdb.com/images/M/MV5BMTQ2NzkzMDI4OF5BMl5BanBnXkFtZTcwMDA0NzE1NA@@._V1._SX640_SY960_.jpg",
//   "color":"yellow",
//   "rated":"R",
//   "studio":"orion",
//   "gross":733619403,
//   "numTheatres":782
// },
// {
//   "title":"Return of the King",
//   "image":"http://www.movieposter.com/posters/archive/main/143/MPW-71729",
//   "color":"blue",
//   "rated":"PG-13",
//   "studio":"new line",
//   "gross":8912843279,
//   "numTheatres":933
// }
// ]