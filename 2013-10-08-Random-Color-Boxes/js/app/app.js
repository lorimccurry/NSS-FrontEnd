'use strict';

$(document).ready(initialize);

var timer;

function initialize(){
  $(document).foundation();
  $('#start').click(start);
  $('#stop').click(stop);
}

function start(){
  var delay = $('#delay').val();
  delay = parseFloat(delay) * 1000;
  timer = setInterval(createBoxes, delay);
}

function createBoxes(){
  var dimensions = $('#dimensions').val();
  dimensions = dimensions.split(', ');
  var width = dimensions[0];
  var height = dimensions[1];

  var $div = $('<div>');
  $div.addClass('color');
  $div.css('background-color', randomColor).css('width', width).css('height', height);
  $('#colors').prepend($div);
}

function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var a = Math.random();
  var rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  return rgba;
}

function stop(){
  clearInterval(timer);
}