exports.square = function(x){
  var sq = x * x;
  return sq;
};

//function expression: put the semicolon on the end
//dont call same as fn name

//function blah(){}
//function definition: no semicolon

exports.area = function(length, width){ //exports makes it available
  return length * width;
}

exports.vol = function(length, width, height){
  return this.area(length, width) * height;
  //can reuse area and will all be properties in 1 object that will get called w/ this
}