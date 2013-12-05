'use strict';

//Firebase Schema
var Δdb;
var Δbalance;
var Δstocks;

//Local Schema
var db = {};
db.balance = {};
db.stocks = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://stock-market-lm.firebaseio.com/');
  Δbalance = Δdb.child('balance');
  Δstocks = Δdb.child('stocks');
  Δbalance.on('value', balanceChanged);
  Δstocks.on('child_added', stockAdded);
  //set listener for stocks

  // getStockQuote();
  $('#buy').click(purchase);
  $('#setCash').click(setCash);
  $('#setInterval').click(setInterval);
}

function setCash(){
  // db.balance = parseInt($('#cash').val(), 10);
  var cash = parseInt($('#cash').val(), 10);
  var balance = {};
  balance.cash = cash;
  Δbalance.set(balance);

}

function balanceChanged(snapshot){
  db.balance = snapshot.val();
  $('#cashBalance').text('Cash Balance: $' + db.balance.cash + '.00');

}

// function getStockQuote(){
//   var data = {};
//   data.symbol = 'AAPL';
//   $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, receivedQuote);

// }

function purchase(){

  var symbol = $('#symbol').val();
  var quantity = parseInt($('#quantity').val(), 10);

  requestQuote(symbol, function(data, textStatus, jqXHR){
    var quote = data.Data;
    debugger;
    if(quote.LastPrice * quantity <= db.balance.cash){
      db.balance.cash -= quote.LastPrice * quantity;
      db.balance.stock += quote.LastPrice * quantity;
      db.balance.total = db.balance.cash + db.balance.stock;
      Δbalance.set(db.balance);
      console.log(db.balance);

      var stock = {};
      stock.symbol = symbol;
      stock.purchasePrice = quote.LastPrice;
      stock.quantity = quantity;
      Δstocks.push(stock);
      console.log(stock);

      createRow(stock);
    }

    $('#symbol').val('');
    $('#quantity').val('');

  });
}

function requestQuote(symbol, fn){
  var data = {symbol: symbol};
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);
  console.log(data);
}

function createRow() {
  var row = '<tr><td class="name"></td><td class="symbol"></td><td class="quote"></td><td class="purchased"></td><td class="stockTotal"></td>';
  var $row = $(row);


  $row.children('.name').text(stock.name);
  $row.children('.symbol').text(stock.symbol);
  $row.children('.quote').text(stock.quote);
  $row.children('.purchased').text(stock.purchased);
  $row.children('.stockTotal').text(stock.stockTotal);

  $('#stocks').append($row);

}

// function receivedQuote(data, textStatus, jqXHR){
//   console.log(data);
//   console.log(textStatus);
//   console.log(jqXHR);

// }





