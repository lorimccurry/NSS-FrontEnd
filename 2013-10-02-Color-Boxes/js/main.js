$(document).ready(intialize);

function intialize()
{
  $('#colorbutton').click(makeColorBoxes);
  $('#clearinput').click(clearInput);
  $('#clearboxes').click(clearBoxes);
  $('#colorstring').focus();
}

function clearInput()
{
  $('#colorstring').val('');
  $('#colorstring').focus();
}

function clearBoxes()
{
  $('#boxes').empty();
  clearInput(); /*calls above function*/
}

function makeColorBoxes()
{
  var colorstring = $('#colorstring').val(); /*"blue, green, yellow"*/
  var colors = colorstring.split(', '); /*["blue", "green", "yellow"]*/
  for (var i = 0; i < colors.length; i++)
  {
    var $color = $('<div>'); /*creates jquery object to apply methods to*/
    $color.addClass('box');
    $color.text(colors[i]); /*there's an array of strings*/
    $color.css('background-color', colors[i]);

    $('#boxes').append($color); /*append to parent*/
  }

}