test( "convert_word_to_pig_latin", function() {
  deepEqual(convert_word_to_pig_latin('hello'), 'elloha', "Converting word to pig latin word" );
});

test( "reverse_word_order_add_semicolon", function() {
  deepEqual(reverse_word_order_add_semicolon('hello, nashville, code'), 'elloha; ashvillena; odeca;', "Reversing word order and convert commas to semicolons" );
});