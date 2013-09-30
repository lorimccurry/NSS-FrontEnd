$(document).ready(initialize); /*when ready, select whole tree (document), and run the initialize function inside {} (nothing special, just a name) */

function change_div_text()
{
  var name = $('#name').val();
  var color = $('#color').val();
  $('#b').text(name).css('background-color', color); /*chaining 2 properties to the #b*/
}

function age_verification()
{
  var age = $('#age').val();
  age = parseInt(age);

  if (age >= 21)
    $('#age_div').text('You can drink!').css('background-color', 'green');
  else{
    $('#age_div').text('No drinks for you!').css('background-color', 'red');
  }
}



function initialize() {
  $('#clicker').click(change_div_text); /*can also write inline function here (where alert_me is)...but cleaner to key out fn above and find the function and call it inline*/
  $('#age_check').click(age_verification);

  // $('div').css('background-color', 'red'); /*jQuery, find all the divs you can and make their bg color red*/
  // $('div').css('font-size', '25px');
  // $('div').css('color', 'yellow');

  // var color = prompt('What color?');
  // $('div').css('background-color', color);
  // var size = prompt('What font size?');
  // $('div').css('font-size', size);
/*$ speaks to jQuery, and then you have to give it a CSS selector, and then a css property*/

  // var selector = prompt('Which div?');
  // var cls = prompt('Class to add?');
  // var new_text = prompt('What would you like to say?');
  // $(selector).addClass(cls);
  // $(selector).text(new_text);

  // var selector_to_hide = prompt('Which node do you want to hide?')
  // $(selector_to_hide).hide();
}

