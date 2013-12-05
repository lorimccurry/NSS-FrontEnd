var fs = require('fs'); //allows to read/write to a file

//should be able to: write to and read from this file
//input: people.json
//output: [p1, p2, p3] (an array of objects)
//call example:
// var people = database.read('people.json') and get output you want
exports.read = function(filename){
  var data = fs.readFileSync(filename); //string that looks liek js
  data = JSON.parse(data); //converts to object
  return data;
};

//input peopl.json, data
//output - nothing
//database.write('people.json', [p1, p2, p3])
exports.write = function(filename, data){
  data = JSON.stringify(data); //will convert object to string
  fs.writeFileSync(filename, data);
};