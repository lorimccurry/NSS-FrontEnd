var first_name = prompt('What is your first name?');
var last_name = prompt('What is your last name?');
var full_name = first_name + ' ' + last_name;
var initial_balance = prompt('What is your initial account balance?');
initial_balance = parseFloat(initial_balance);

var deposit1 = prompt('Deposit amount #1?');
deposit1 = parseFloat(deposit1);

var deposit2 = prompt('Deposit amount #2?');
deposit2 = parseFloat(deposit2);

var deposit3 = prompt('Deposit amount #3?');
deposit3 = parseFloat(deposit3);

var withdraw1 = prompt('Withdraw amount #1?');
withdraw1 = parseFloat(withdraw1);

var withdraw2 = prompt('Withdraw amount #2?');
withdraw2 = parseFloat(withdraw2);

var withdraw3 = prompt('Withdraw amount #3?');
withdraw3 = parseFloat(withdraw3);

debugger;

var deposit_balance = 0;
deposit_balance += deposit1;
deposit_balance += deposit2;
deposit_balance += deposit3;


var withdraw_balance = 0;
withdraw_balance += withdraw1;
withdraw_balance += withdraw2;
withdraw_balance += withdraw3;

ending_balance = (initial_balance - withdraw_balance);

console.log('Your full name is: ' + full_name);
console.log('Your total deposits are: ' + deposit_balance);
console.log('Your total withdraws are: ' + withdraw_balance);

if(ending_balance < 0.00)
  console.log ('You account balance is under $0 and has been assessed a $50 fee. Your new balance is ' + (ending_balance - 50.00))
else if (ending_balance >= 0.00)
  console.log ('Your ending_balance is: ' + ending_balance);


// CHYLD'S CODE
// var deposits = 0;
// deposits += dep1;
// deposits += dep2;
// deposits += dep3;

// var withdraws = 0;
// withdraws += with1;
// withdraws += with2;
// withdraws += with3;

// balance += (deposits - withdraws);
// balance -= (balance < 0) ? 50 :0;

// console.log('Your balance is ' + balance);
