test( "deposit_against_balance", function() {
  deepEqual(deposit_against_balance(1000, 100), 1100, "Depositing money against the balance");
});

test( "withdraw_from_balance", function() {
  deepEqual(withdraw_from_balance(900, 300), 600, "Withdrawing money from the balance");
});
