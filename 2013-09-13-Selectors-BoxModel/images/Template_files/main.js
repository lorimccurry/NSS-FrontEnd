$(document).ready(initialize);

function initialize()
{
  $('#add_color').click(addColor);
}

function addColor()
{
  var color = $('#color').val();
  var $div = $('<div>');
  $div.addClass('box');
  $div.css('background-color', color);

  $('#colors').prepend($div);
  clearInputAndFocus();
}

function clearInputAndFocus()
{
  $('#color').val('');
  $('#color').focus();
}

// $(document).ready(initialize);

// function initialize()
// {
//   $('#add_color').click(addColor);
// }

// function addColor()
// {
//   debugger;
//   var color = $('#color').val();
//   var $colorDiv = $('<div>');
//   $colorDiv.addClass('box');
//   $colorDiv.css('background-color', color);

//   $('#colors').prepend('$colorDiv');
//   clearInputAndFocus();
// }

// function clearInputAndFocus()
// {
//   $('#color').val('');
//   $('#color').focus();
// }

