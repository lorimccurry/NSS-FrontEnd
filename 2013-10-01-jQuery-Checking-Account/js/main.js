var balance = 1000; /*variable is global and will live until web page closes*/

$(document).ready(initialize);

function initialize()
{
  $('#deposit').click(deposit_funds);
  $('#withdraw').click(withdraw_funds);
}

function deposit_against_balance(balance, amount)
{
  return balance + amount;
}

function withdraw_from_balance(balance, amount)
{
  return balance - amount;
}

function deposit_funds()
{
  var amount = $('#amount').val();
  amount = parseFloat(amount);
  balance = deposit_against_balance(balance, amount);
  $('#balance').val('$' + balance + '.00');

  if(balance >= 0)
    $('#balance').removeClass('negative');
}

function withdraw_funds()
{
  var amount = $('#amount').val();
  amount = parseFloat(amount);
  balance = withdraw_from_balance(balance, amount);
  $('#balance').val('$' + balance + '.00');

  if(balance < 0)
    $('#balance').addClass('negative');
}

