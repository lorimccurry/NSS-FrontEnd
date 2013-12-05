var moment = require('moment');
var mongoose = require('mongoose');
var Post = mongoose.model('Post'); //can save, find, post things in db now

//render: find a jade file to convert to html; GET = render; POST,PUT,DELETE = redirect
/*
 * GET /posts
 */

exports.index = function(req, res){ //index fn position is the action
  Post.find(function(err, posts){ //notice singular and plural; call internal fn: any err that may have occurred when calling posts, this is the post; //if no params, mongo data default is everything
    res.render('posts/index', {title: 'Blog', posts: posts});
  });
};

/*
 * GET /posts/new
 */

exports.new = function(req, res){
  var date = moment().format("MMM Do YYYY, h:mm a");
  res.render('posts/new', {title: 'Blog', date:date});
};

/*
 * POST /posts
 */

exports.create = function(req, res){
  console.log('before save');
  console.log(req.body); //in terminal
  new Post(req.body).save(function(err, post, count){
    console.log('after save');
    console.log(err);
    console.log(post);
    res.redirect('/posts'); //redirect: browser, give me a get request to this url
  }); //once save has happened, cue for callback
};


/*
 * GET /posts/:id/edit
 */

exports.edit = function(req, res){
  res.render('posts/edit', {title: 'Blog'});
};

/*
 * PUT /posts/:id
 */

exports.update = function(req, res){ //they just made an edit and want to show them the individual post now
  res.redirect('/posts/' + req.params.id); //redirecting to the show method
};

/*
 * GET /posts/:id
 */

exports.show = function(req, res){
  //pseudo code: var post = hey_db_find_this_post_by_this_id(req.params.id); then in render post:post
  Post.findById(req.params.id, function(err, post){ //params is anything in url field; async call comes back and fires off fn
    res.render('posts/show', {title: 'Blog', post: post}); //they just made an edit and want to show them the individual post now
  });
};

/*
 * DELETE /posts/:id
 */

exports.delete = function(req, res){
  Post.findByIdAndRemove(req.params.id, function(err, post){
    res.redirect('/posts');
  });
  // Model.findByIdAndRemove(id, [options], [callback])
};
