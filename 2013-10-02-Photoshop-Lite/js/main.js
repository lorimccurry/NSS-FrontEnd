'use strict';

$(document).ready(initialize);

function initialize(){
  $('#add_color').click(addColor);
  // $('.box').click(boxClicked); not happening prior to initialize running so need to do below set-up
  // $('parent_selector').on('name of event', 'child selector', 'name of function')
  $('#colors').on('click', '.box', colorPalletteClicked); /*.on dynamically adds click event to anything w/ a class of box that's underneath the parent #colors*/
  $('#add_box').click(addCanvas);
  $('#boxes').on('mouseover', '.canvas', canvasHover); /*div called boxes that already exists on your page, so each time you hover over a canvas square, execute canvasHover*/
}

function colorPalletteClicked(){
  var $box = $(this); /*DOM object in, now a jquery object, and now can do .whatever (jquery fn's) to it - regular div w/ super-powers*/
  var color = $box.css('background-color');
  $('#brush').css('background-color', color);
}

function canvasHover(){
  var $canvas = $(this);
  var brushColor = $('#brush').css('background-color');
  $canvas.css('background-color', brushColor);
}

function addColor(){
  var color = $('#color').val();
  var $div = $('<div>');
  $div.addClass('box');
  $div.css('background-color', color);

  $('#colors').prepend($div);
  clearInputAndFocus();
}

function addCanvas(){
  var amount = $('#amount').val();
  amount = parseInt(amount, 10); /*radix - defining as base 10 number*/
  for(var i = 0; i < amount; i++){
    var $canvas = $('<div>');
    $canvas.addClass('canvas');
    $('#boxes').append($canvas);
  }
}

function clearInputAndFocus(){
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
//   // debugger;
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

