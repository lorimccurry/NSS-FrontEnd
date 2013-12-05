
/*
 * GET home page.
 */
 //this file will make some fn, var, objects, number, string, true/false, array available via exports in view (.jade)

var math = require('../modules/math') //stuff inside module is now available in math (via the path); export sends is

exports.index = function(req, res){
  res.render('index', { title: 'Express', square: math.square(3), area: math.area(3,4), volume: math.vol(3,3,3) });
  //prop in {} are avail inside view: how pass data into index.jade (or view)
};