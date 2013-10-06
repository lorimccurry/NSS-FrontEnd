'use strict';

var balance = 0;

$(document).ready(initialize);

function initialize(){
  $('#set_logo').click(addLogo);
  $('#set_balance').click(addStartBalance);
  $('#deposit').click(addDeposit);
  $('#withdraw').click(subtWithdraw);
  $('#deposit_list').on('click', 'li', removeDeposit); /*check chyld's code for how to combine this*/
  $('#withdraw_list').on('click', 'li', removeWithdraw);/*look for something w/ a .deposit or .withdraw that lives under parent #withdraw_list and perform removeWithdraw*/

}

function addLogo(){
  var url = $('#logo_url').val();
  $('#logo').attr('src', url);
  $('#logo_controls').hide();
  $('#amount').focus();
}

function addStartBalance(){
  var startBal = $('#start_balance').val();
  startBal = parseInt(startBal, 10);
  balance = startBal;
  $('#balance').val('$' + balance + '.00');
  $('#balance_controls').hide();
  $('#amount').focus();
}

function addDeposit(){
  var amount = $('#amount').val();
  amount = parseInt(amount, 10);
  balance = depositAgainstBalance(balance, amount);
  $('#balance').val('$' + balance + '.00'); /*can turn this into a fn...updateDisplay & makeCurrency*/

  var $li = $('<li>');
  $li.text(amount);
  $('#deposit_list').append($li);

  clearInput();
}

function subtWithdraw(){
  var amount = $('#amount').val();
  amount = parseInt(amount, 10);
  balance = withdrawFromBalance(balance, amount);
  $('#balance').val('$' + balance + '.00'); /*create fns here too*/

  var $li = $('<li>');
  $li.text(amount);
  $('#withdraw_list').append($li);

  clearInput();
}

function removeDeposit()
{
  var $depDetail = $(this);
  $depDetail = parseInt($depDetail.text(), 10);
  balance = balance - $depDetail;
  $('#balance').val('$' + balance + '.00');
  $(this).remove();
  clearInput();
}

function removeWithdraw()
{
  var $withDetail = $(this);
  $withDetail = parseInt($withDetail.text(), 10);
  balance = balance + $withDetail;
  $('#balance').val('$' + balance + '.00');
  $(this).remove();
}

function depositAgainstBalance(balance, amount){
  return balance + amount;
}

function withdrawFromBalance(balance, amount){
  return balance - amount;
}

function clearInput(){
  $('#amount').val('');
  $('#amount').focus();
}

