$(document).ready(initialize);

function initialize()
{
  $('#make_boxes').click(makingBoxes); /*click button*/
}

function makingBoxes()
{
  var numberOfBoxes = $('#amount').val(); /*button produces string*/
  numberOfBoxes = parseInt(numberOfBoxes); /*turn into #*/

  for(var i = 0; i < numberOfBoxes; i++)
  {
    var $div = $('<div>');/*creating jquery object that can have methods*/
    $div.addClass('box'); /*add class to div*/
    $div.text(i); /*changes text by iteration*/

    $('#boxes').append($div); /*append div to tree*/
  }
}