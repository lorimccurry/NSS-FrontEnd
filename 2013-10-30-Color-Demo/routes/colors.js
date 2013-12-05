
/*
 * GET /colors
 */

exports.index = function(req, res){
  var colors = ['orange', 'green', 'purple', 'blue', 'yellow', 'red']; //properties that can be used inside view
  res.render('colors/index', {title: 'Colors', colors: colors});
};
