var fs = require('fs'); //allows to read/write to a file

//should be able to: write to and read from this file
//input: movies.json
//output: [p1, p2, p3] (an array of objects)
//call example:
// var movies = database.read('moives.json') and get output you want
exports.read = function(filename){
  var data = fs.readFileSync(filename); //string that looks like js
  data = JSON.parse(data); //converts to object
  return data;
};

//input movies.json, data
//output - nothing
//database.write('movies.json', [p1, p2, p3])
exports.write = function(filename, data){
  data = JSON.stringify(data); //will convert object to string
  fs.writeFileSync(filename, data);
};