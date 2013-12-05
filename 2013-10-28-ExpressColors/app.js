
/**
 * Module dependencies.
 */

var express = require('express');

var home = require('./routes/home'); //find the module (or file) and read it in
var colors = require('./routes/colors'); //find the module (or file) and read it in

var http = require('http');
var path = require('path');
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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', home.index); //run index fn on home.js
app.get('/colors', colors.index);
app.get('/colors/new', colors.new); //when did get and this url, run colors.js, new fn
app.post('/colors', colors.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
