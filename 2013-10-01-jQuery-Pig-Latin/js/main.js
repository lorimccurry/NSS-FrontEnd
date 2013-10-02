$(document).ready(initialize);

function pig_latin(string)
{
  return string.slice(1) + string[0] + 'a';
}

function initialize()
{
  $('#pig').click(convert_pig); /*when pig button is clicked, convert_pig is called*/
}

function convert_pig()
{
  debugger;
  var pig_word = $('#original').val();
  var pig_it = pig_latin(pig_word);/*can't have var name same as fn name*/
  $('#piglatin').val(pig_it);
  // $('#piglatin').text(pig_it);

}