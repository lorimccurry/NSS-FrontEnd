var express = require('express');
var mongoose = require('mongoose');

// model definitions
require('require-dir')('./models'); //adds all model definitions automatically

//define middleware
var middleware = require('./lib/middleware'); //needs to be after schema b/c using schema in the fn

// route definitions
var home = require('./routes/home');
var users = require('./routes/users');
var todos = require('./routes/todos');


var app = express();
var RedisStore = require('connect-redis')(express);
mongoose.connect('mongodb://localhost/auth-todo');

// configure express
require('./config').initialize(app, RedisStore); //initializes whole app

// routes
app.get('/', middleware.getTodos, home.index);
app.post('/users', users.create);
app.put('/login', users.login);
app.delete('/logout', users.logout);
app.get('/make-me-an-admin', users.makeMeAnAdmin);
app.get('/admin', middleware.isAdmin, users.admin); //middleware.isAdmin is a fn just like users.admin is; if middleware.isAdmin fails, then users.admin won't run
// app.get('/temp', users.temp);
app.delete('/users/:id', users.delete);
app.put('/users/:id', users.update);
app.post('/todos', todos.create);
app.put('/todos/:id', todos.update);


// start server & socket.io
var common = require('./sockets/common');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {log: true, 'log level': 2});
server.listen(app.get('port'));
io.of('/app').on('connection', common.connection);
