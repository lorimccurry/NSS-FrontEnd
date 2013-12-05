'use strict';

// Firebase Schema
var Δdb;

// Local Schema (defined in keys.js)

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;} //immediately stops whenever hit "return" in a fn and returns out the value

  $(document).foundation();
  // Δdb = new Firebase(db.keys.firebase);
  $('#calculate').click(clickCalculate);
  $('#history').on('click', '.delete', clickDeleteRow);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function clickCalculate(){
  var op1 = getValue('#op1');
  var op2 = getValue('#op2');
  var operator = getValue('#operator');
  var computation = op1 + operator + op2;
  var result = eval(computation); //eval takes string and executes as formula
  htmlUpdateResult(result);
  htmlCreateLi(op1, operator, op2, result);
}

function clickDeleteRow(){
  var $li = $(this).parent();
  $li.remove();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function htmlUpdateResult(result){
  $('#result').text(result);
}

function htmlCreateLi(op1, operator, op2, result){
  var $li = $('<li>');
  var spans = '<span class="op1">' + op1 + '</span><span class="operator">' + operator + '</span><span class="op2">' + op2 + '</span><span class="equal">' + '=' + '</span><span class="result">' + result + '</span><span class="delete">' + 'X' + '</span>';
  var $spans = $(spans);
  $li.append($spans);
  $('#history').prepend($li);
}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function parseUpperCase(string){
  return string.toUpperCase();
}

function parseLowerCase(string){
  return string.toLowerCase();
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
