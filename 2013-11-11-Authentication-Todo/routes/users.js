// var colors = require('colors');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');


// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random

/*
 * POST /users
 */

exports.create = function(req, res){
  var user = new User();
  user.email = req.body.email;

  bcrypt.hash(req.body.password, 10, function(err, hash) {
    user.password = hash; //what is saved in db
    user.save(function(err, user){
      if (err){
        res.send({status: 'error'});
      } else {
        res.send({status: 'ok'});
      }
    });
  });
};

/*
 * PUT /login
 */

exports.login = function(req, res){
  // res.send('you just logged in!');
  // var email = req.body.email;
  // var password = req.body.password;
  //now want to go in db and find the record that has the above email addy

  User.findOne({email: req.body.email}, function(err, user){ //.find finds everything --an array; the email is what it's searching; if want to find many, don't specify in the email section and make user plural or "users"; //compares hash p/w w/ p/w in db
    //try and find user based on email addy
    if(user){
      bcrypt.compare(req.body.password, user.password, function(err, result){ //pw is one just typed in; user.pw is hash pw and can go match previous salt/hash from the registration
        if (result){
          req.session.regenerate(function(err){ //good to regenerate @ new user log-in
            req.session.userId = user.id; //an obj - can store whatever you want; user.id is from the findOne fn above; is saved here (user.id) forever until your cookie expires or you logout
            req.session.save(function(err){ //save to redis db
              res.send({status: 'ok', email: user.email}); //sending back to browsers
            });
          });
        } else {
          req.session.destroy(function(err){
            res.send({status: 'esrror'}); //if enter wrong password, session will be destroyed; can see in redis terminal how the user session
          });
        }
      });
    } else {
      res.send({status: 'error'});
    }
  });
};


exports.logout = function(req, res){
  req.session.destroy(function(err){
    res.send({status: 'logout ok'});
  });
};

exports.makeMeAnAdmin = function(req, res){
  if(req.query.password === '12345'){
    res.locals.user.isAdmin = true;
    res.locals.user.save(function(err, user){
      res.send(user);
     });
  } else {
    res.send('sorry!');
  }
};

exports.admin = function(req, res){
  User.find(function(err, users){
    res.render('users/admin', {title: 'Express', users: users});
  });
};

exports.delete = function(req, res){
  User.findByIdAndRemove(req.params.id, function(err, user){
    res.redirect('/admin');
  });
};

exports.update = function(req, res){
  User.findById(req.params.id, function(err, user){
    user.isAdmin = !user.isAdmin;
    user.save(function(err, user){
      res.send({});
    });
  });
};


// exports.temp = function(req, res){
//   // res.send('ok');
//   // var name = req.query.name;
//   // res.send(name);

//   if(req.query.name){ //did i give you a name
//     req.session.name = req.query.name;
//     res.session.save(function(err){
//       res.send(req.session);
//   } else {
//       res.send(req.session);
//     };
//   });

// };