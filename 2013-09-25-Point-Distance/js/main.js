var point_distance;

// debugger;

var point1 = {};
var point2 = {};
point1.x = parseFloat(prompt('Point 1 x-coordinate?'));
point1.y = parseFloat(prompt('Point 1 y-coordinate?'));
point2.x = parseFloat(prompt('Point 2 x-coordinate?'));
point2.y = parseFloat(prompt('Point 2 y-coordinate?'));
point_distance = Math.sqrt(Math.pow(point1.x - point2.x, 2) + (Math.pow(point1.y - point2.y, 2)));
alert('The point distance is ' + point_distance);


// CHYLD'S CODE

// var points = [];

// // debugger;

// for(var i = 0; i < 2; i++)
// {
//   var point = {};
//   point.x = parseInt(prompt('X Coordinate?'));
//   point.y = parseInt(prompt('Y Coordinate?'));
//   points.push(point);
// }

// var a = points[0].y - points[1].y;
// var b = points[0].x - points[1].x;

// var distance = Math.sqrt(a*a + b*b);

// alert('The point distance is ' + distance);



