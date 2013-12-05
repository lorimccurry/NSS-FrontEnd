var fs = require('fs'); //node pkg that allows to write or read data to/from files; a non-global var only visible to below fn

exports.index = function(req, res){
  // var color = 'blue';
  var data = fs.readFileSync('colors.json'); //what reads in is a string on .json file and need to convert to js object; data is a string
  var colors = JSON.parse(data); //data is a string w/ brackets and JSON.parse will convert it into an object; want to push color you type in browser into array

  res.render('colors/index', {title: 'Colors Page', colors: colors /*color: color, x: 3, y: 'awesome'*/}); /*title is an object w/ a variable; color: color is using a variable to set the object's property; color: blue would be hard coding*/
};

exports.new = function(req, res){
  res.render('colors/new', {title: 'New Color'});
};

exports.create = function(req, res){ //this fn gets called when user clicks save
  var color = req.body.color; //came from chrome debugger tools
  var data = fs.readFileSync('colors.json'); //what reads in is a string on .json file and need to convert to js object; data is a string
  var colors = JSON.parse(data); //data is a string w/ brackets and JSON.parse will convert it into an object; want to push color you type in browser into array

  colors.push(color);
  fs.writeFileSync('colors.json', JSON.stringify(colors)); //will output user input to colors.json file into an object
  res.redirect('/colors'); //says for the browser to send back another request/redirect to /colors
};

