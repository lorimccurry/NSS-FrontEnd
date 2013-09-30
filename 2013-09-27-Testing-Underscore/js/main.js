function filter_evens(numbers)
{
  return _.filter(numbers, function(num){return (num % 2) == 0;}); /*1st is input, 2nd is write an inline fn to do input*/
}

function filter_odds(numbers)
{
  return _.filter(numbers, function(num){return (num % 2) == 1;}); /*1st is input, 2nd is write an inline fn to do input*/
}

function filter_short_strings(strings)
{
  return _.filter(strings /*plural*/, function(string)/*singular*/{return string.length < 5;});
}

function filter_a_strings(strings)
{
  return _.filter(strings, function(string){return string.[0].toLowerCase() == 'a';});
}

function find_string(strings, word) /*pulling out needle (word) from a haystack (strings)*/
{
  return _.find(strings, function(string){return string == word;});
}

function find_string_ending_letter(strings, letter)
{
  return _.find(strings, function(string){return string[string.length - 1] == letter;});
}