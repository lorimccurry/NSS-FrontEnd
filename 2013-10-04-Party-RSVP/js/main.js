'use strict';

$(document).ready(initialize);

function initialize(){
  $('#add').click(addRow);
  $('table').on('click', '.rsvp', rsvp);
  $('table').on('click', '.nuke', nuke);
  $('table').on('click', '.up, .down', move);
}

function move(){
  var $img = $(this);
  var $tr = $img.parent().parent();

  if($img.hasClass('up')){
    if(!$tr.prev().hasClass('home')){ /*!=not, if the previous table row does not have the class home (header row)*/
      $tr.prev().before($tr); /*previous points you to the location of the sibling to the left, and then before moves the tr in question before it's left sibling*/
    }
  } else {
    $tr.next().after($tr);
  }
}

function nuke(){
  var $button = $(this);
  var $tr = $button.parent().parent();
  $tr.remove();
}

function rsvp(){
  var $button = $(this);
  var $textbox = $button.prev();
  var text = $textbox.val(); /*the result is a string that want to separate into 2 items*/
  var items = text.split(', ');
  var name = items[0];
  var food = items[1];
  var $nameTD = $button.parent().prev().prev();
  var $foodTD = $button.parent().siblings('.food');
  $nameTD.text(name);
  $foodTD.text(food);
}

function addRow(){
  var $tr = $('<tr>'); /*created jquery obj that's floating now*/
  var $name = $('<td>');
  $name.addClass('name');
  var $food = $('<td>');
  $food.addClass('food');
  var $ctrl = $('<td>');
  $ctrl.addClass('ctrl');
  var $nuke = $('<td>');
  $nuke.addClass('nuke');
  var $arrows = $('<td>');
  $arrows.addClass('arrows');

  var $input = $('<input>');
  $input.attr('type', 'text');

  var $button = $('<input>');
  $button.attr('type', 'button');
  $button.val('RSVP!');
  $button.addClass('rsvp');

  var $nukeButton = $('<input>');
  $nukeButton.attr('type', 'button');
  $nukeButton.val('NUKE!!');
  $nukeButton.addClass('nuke');

  var $down = $('<img>');
  $down.attr('src', 'images/down.jpg');
  $down.addClass('down');

  var $up = $('<img>');
  $up.attr('src', 'images/up.gif');
  $up.addClass('up');

  $arrows.append($up, $down);
  $ctrl.append($input, $button);
  $nuke.append($nukeButton);
  $tr.append($name, $food, $ctrl, $nuke, $arrows); /*want to attach a list of things, so use an array (don't need [] for this - jquery smart enough*/
  $('table').append($tr);

  $input.focus(); /*focus after it's attached to the tree*/

}