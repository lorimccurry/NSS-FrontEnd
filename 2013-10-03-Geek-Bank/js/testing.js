test( "depositAgainstBalance", function() {
  deepEqual( depositAgainstBalance(1000,100), 1100, "Depositing funds against balance");
});

test( "withdrawFromBalance", function() {
  deepEqual( withdrawFromBalance(900,100), 800, "Withdrawing funds from balance");
});
