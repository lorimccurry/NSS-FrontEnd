$(document).ready(initialize);

function multiply_num_by_array_items(counter, multiplier)
{
  var counter_array = [];
  for(i = 1; i <= counter; i++)
  {
    counter_array.push(i * multiplier);
  }
  return counter_array;
}

function initialize()
{
  $('#calculate').click(compute_output);
}

function compute_output()
{
  var input = $('#input').val();
  var convert_to_array = input.split(", ");
  var counter = parseInt(convert_to_array[0]);
  var multiplier = parseInt(convert_to_array[1]);

  var sum = 0;
  var output_array = multiply_num_by_array_items(counter, multiplier);

  for(i = 0; i < output_array.length; i++)
  {
    sum += output_array[i]; /*sum is the example of the gatherer/collector position*/
  }

  $('#output').val(output_array.join(" + ") + " = " + sum);
}