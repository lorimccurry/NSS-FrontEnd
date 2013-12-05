var mongoose = require('mongoose');//talking to mongo db

var Post = mongoose.Schema({
  title: String,
  author: String,
  date: String,
  tags: String,
  image: String,
  content: String
});

mongoose.model('Post', Post);