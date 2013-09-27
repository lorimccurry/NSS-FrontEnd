var colors = [];

var response = prompt('Enter a color or quit:');
while(response)
{
  colors.push(response);
  var response = prompt('Enter a color');
}


for(var count = 0; count < colors.length; count++)
{
  console.log("You typed in color: " + colors[count]);
}

debugger;
var sum = 0;
for(var loop = colors.length - 1; loop >= 0; loop--)
{
  sum += colors[loop].length; /*the length of letters in the color*/
}
 var avg = sum / colors.length;