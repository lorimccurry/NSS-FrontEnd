//model definitions
require('./models/post');

// express application
var home = require('./routes/home');
var posts = require('./routes/posts');

// modules
var express = require('express');
var http = require('http');
var path = require('path');
var less = require('express-less');
var mongoose = require('mongoose');
var app = express();
mongoose.connect('mongodb://localhost/blogger'); //tells node where server is at; dynamic creation of db

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
app.get('/posts', posts.index); //shows everything
app.get('/posts/new', posts.new); //means show 1 form; info collected posts to create (work together)
app.post('/posts', posts.create); //REDIRECT; collects info that new sent and creates something new; where ID is craeted
app.get('/posts/:id/edit', posts.edit); //works w/ update; shows existing data in pre-populated form so user can edit a particular record/thing
app.put('/posts/:id', posts.update); //REDIRECT; receives data and updates db w/ editted data send to it;
app.get('/posts/:id', posts.show); //db will find quickly when search particular object w/ ID generated @ create
app.delete('/posts/:id', posts.delete); //REDIRECT

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
