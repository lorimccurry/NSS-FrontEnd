var database = require('../modules/database'); //now this db object has 2 methods: read and write
/*
 * GET /people
 */

exports.index = function(req, res){
  var people = database.read(__dirname + '/../db/people.json'); //this is an array output; it concatinates, so make sure to add / at start of file path
  res.render('people/index', { title: 'People: Address Book', people: people }); //people will be an array of people - will be able to inject into the view when add prop name here
};

/*
 * GET /people/new
 */

exports.new = function(req, res){
  res.render('people/new', { title: 'New Person: Address Book'});
};

/*
 * POST /people
 */

exports.create = function(req, res){
  //never want to show a view in post except for data validation errors caused by user
  var name = req.body.name; //this comes from where we called the names on the form
  var gender = req.body.gender;
  var age = parseInt(req.body.age);
  var color = req.body.color;


  var people = database.read(__dirname + '/../db/people.json');
  var person = {name: name, gender: gender, age: age, color: color};
  people.push(person);
  database.write(__dirname + '/../db/people.json', people); //(name of db, param)

  res.redirect('/people'); //response is to redirect
};