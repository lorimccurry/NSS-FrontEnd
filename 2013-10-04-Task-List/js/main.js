'use strict';

$(document).ready(initialize);

function initialize(){
  $('#add_task').click(addRow);
  $('table').on('click', '.remove', removeRow);
  $('table').on('click', '.up, .down', move);
  $('table').on('click', '.done', complete);
}

updateDisplay();

function complete(){
  var $checkbox = $(this);
  var $tr = $checkbox.parent(); /*could have said .closest('tr')*/
  var $home = $('.home').val();
  if ($tr.hasClass('complete')){
    if(!$tr.prev().hasClass('home')){
      $tr.removeClass('complete').insertAfter($home); /*css property 'inherit' will return the greyed background back to normal state*/
    }
  } else {
    $tr.addClass('complete').appendTo('table');
  }
}

function removeRow(){
  var $button = $(this);
  var $tr = $button.parent();
  $tr.remove(); /*or $(this).closest('tr').remove()*/
}

function move(){
  var $img = $(this);
  var $tr = $img.parent().parent();

  if ($img.hasClass('up')){
    if (!$tr.prev().hasClass('home')){
      $tr.prev().before($tr);
    }
  } else {
    $tr.next().after($tr);
  }
}

function addRow(){
  var $tr = $('<tr>');

  var $date = $('<td>');
  $date.addClass('date');
  var $task = $('<td>');
  $task.addClass('task');
  var $color = $('<td>');
  $color.addClass('color');
  var $done = $('<td>');
  $done.addClass('done');
  var $remove = $('<td>');
  $remove.addClass('remove');
  var $arrows = $('<td>');
  $arrows.addClass('arrows');


  var dateInput = $('#due_date').val();
  $date.text(dateInput);

  var taskInput = $('#task').val();
  $task.text(taskInput);

  var color = $('#color').val();
  $color.css('background-color', color);

  var $checkbox = $('<input>');
  $checkbox.attr('type', 'checkbox');

  var $removeButton = $('<input>');
  $removeButton.attr('type', 'button');
  $removeButton.val('Delete');
  $removeButton.addClass('removeButton');

  var $up = $('<img>');
  $up.attr('src', 'images/up.png');
  $up.addClass('up');

  var $down = $('<img>');
  $down.attr('src', 'images/down.png');
  $down.addClass('down');

  $done.append($checkbox);
  $remove.append($removeButton);
  $arrows.append($up, $down);
  $tr.append($date, $task, $color, $done, $remove, $arrows);
  $('table').append($tr);

  updateDisplay();

}

function updateDisplay(){
  $('#due_date').val('');
  $('#task').val('');
  $('#color').val('');
  $('#due_date').focus();
}