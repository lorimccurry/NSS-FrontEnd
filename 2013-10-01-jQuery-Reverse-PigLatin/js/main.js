$(document).ready(initialize);

function convert_word_to_pig_latin(word)
{
  return word.slice(1) + word[0] + 'a';
}

function reverse_word_order_add_semicolon(sentence)
{
  debugger;
  var words = sentence.split(", ").reverse();
  var pig_words = [];
  for(i = 0; i < words.length; i++)
    {
      pig_words.push(convert_word_to_pig_latin(words[i]));
    }
  return pig_words.join("; ");
}

function initialize()
{
  $('#convert').click(run_the_conversion);
}

function run_the_conversion()
{
  var original = $('#original').val();
  var modified = reverse_word_order_add_semicolon(original);
  $('#converted').val(modified);
}