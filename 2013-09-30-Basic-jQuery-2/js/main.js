$(document).ready(initialize);

function initialize()
{
  $('#button1').click(change_green);
  $('#name_btn').click(count_char)
}

function change_green()
{
  $('#green').css('background-color', 'green');/*with no color specified, it will query for the background color*/
  /*example of multiple inline style: $('#green').css({'background-color': 'green', 'color': 'yellow'});*/
}

debugger;

function count_char()
{
  var count_char = $('#name_txt').val();
  length = count_char.length;
  $('#name_div').text('There are ' + length + ' characters');

}