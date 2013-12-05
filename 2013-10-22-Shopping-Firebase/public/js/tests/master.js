'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  turnHandlersOff();
  turnHandlersOn();
  initializeSchema();
  Δdb.remove();
}


function teardownTest(){
}

test('Add Product', function(){
  expect(12);

  $('#product-image').val('ipad-air.png');
  $('#product-name').val('Ipad Air');
  $('#product-weight').val('1.0');
  $('#product-price').val('500.00');
  $('#product-off').val('10');
  $('#add-product').trigger('click');

  equal(db.products.length, 1, 'products array should have 1 element');
  ok(db.products[0].id, 'id should be populated');
  ok(db.products[0] instanceof Product, 'product should be an instanceof Product');
  equal(db.products[0].image, 'ipad-air.png', 'product should have an image');
  equal(db.products[0].name, 'Ipad Air', 'product should have a name');
  equal(db.products[0].weight, 1.0, 'product should have a weight');
  QUnit.close(db.products[0].salePrice(), 450, 0.01, 'product should have a sale price');

  equal($('#products tr').length, 2, 'should be 2 rows in table');
  equal($('#products tr:nth-child(2) > td').length, 6, 'should be 6 columns in row');
  equal($('#products .product-name').text(), 'Ipad Air', 'name column should be populated');
  equal($('#products .product-sale').text(), '$450.00', 'sale column should be populated');
  equal($('#products .product-image img').attr('src'), '/img/ipad-air.png', 'image column should be populated');
});

test('Product Pagination', function(){
  expect(18);

  for(var i = 0; i < 12; i++){
    var name = Math.random().toString(36).substring(2);
    var image = Math.random().toString(36).substring(2) + '.png';
    var weight = Math.random() * 100;
    var price = Math.random() * 1000;
    var off = Math.random() * 100;

    createTestProduct(name, image, weight, price, off);
  }

  equal(db.products.length, 12, 'should have 12 products');
  equal(db.pagination.perPage, 5, 'should be 5 products per page');
  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('#products tr').length, 6, 'should have 5 products in table');
  equal($('#previous.hidden').length, 1, 'previous button should be hidden');
  equal($('#next:not(.hidden)').length, 1, 'next button should not be hidden');

  $('#next').trigger('click');

  equal(db.pagination.currentPage, 2, 'should be on second page');
  equal($('#products tr').length, 6, 'should have 5 products in table');
  equal($('#previous:not(.hidden)').length, 1, 'previous button should not be hidden');
  equal($('#next:not(.hidden)').length, 1, 'next button should not be hidden');

  $('#next').trigger('click');

  equal(db.pagination.currentPage, 3, 'should be on third page');
  equal($('#products tr').length, 3, 'should have 2 products in table');
  equal($('#previous:not(.hidden)').length, 1, 'previous button should not be hidden');
  equal($('#next.hidden').length, 1, 'next button should be hidden');

  $('#previous').trigger('click');
  $('#previous').trigger('click');

  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('#products tr').length, 6, 'should have 5 products in table');
  ok($('#previous').hasClass('hidden'), 'previous button should be hidden');
  ok(!$('#next').hasClass('hidden'), 'next button should not be hidden');
});

test('Add Customer', function(){
  expect(7);

  $('#customer-image').val('sally.png');
  $('#customer-name').val('Sally Smith');
  $('#domestic')[0].checked = true; //find domestic dom items w/ id of domestic and select the ones that are checked
  $('#add-customer').trigger('click');

  equal(db.customers.length, 1, 'should have 1 customer in array');
  //check after you've reset the form that the radio button goes off
  ok(!$('#domestic')[0].checked, 'domestic should not be checked');
  equal(db.customers[0].name, 'Sally Smith', 'name should be present');
  equal(db.customers[0].image, 'sally.png', 'image should be present');
  ok(db.customers[0].id, 'id should be present');
  ok(db.customers[0] instanceof Customer, 'should be an instance of Customer');

  ok(db.customers[0].isDomestic, 'should be domestic'); //any time have binary choice, can say "isX" and write a corresponding fn
});

test('Customer DropDown and Shopping Cart', function(){
  expect(7);

  for(var i = 0; i < 5; i++){
    var name = Math.random().toString(36).substring(2);
    var image = Math.random().toString(36).substring(2) + '.png';
    var isDomestic = _.shuffle([true, false])[0]; //shuffle up the arrray and grab the first thing in the array
    //uses all code up to this point - good proof that above test code is working
    //another method to handle: var isDomestic = _.sample([true, false]); //sample randomly picks something inside the array

    createTestCustomer(name, image, isDomestic);
  }

  createTestCustomer('Sally', 'sally.png', true); //created a non-random customer we can test now

  //table headers
  //name, count, amount, weight, shipping, total

  equal(db.customers.length, 6, 'should have 6 customers'); //customers got added
  equal($('select#select-customer option').length, 6, 'should have 6 option tags'); //looking for option tags under the selection box
  equal($('select#select-customer option:nth-child(1)').val(), 'Sally', 'sally value should be on top of the list'); //sally value is correct
  equal($('select#select-customer option:nth-child(1)').text(), 'Sally', 'sally text should be on top of the list'); //sally text is correct
  ok($('table#cart').length, 'shopping cart should be visible'); //if doesnt find, length will be 0 which is false
  equal($('table#cart th').length, 6, 'should be 6 columns'); //table w/ 6 columns
  ok($('#purchase').length, 'purchase button should be visible'); //purchase button somewhere on page
});

test('Add Items To Shopping Cart', function(){
  expect(19);

  createTestProduct('iPad Air', 'ipad-air.png', 1, 500, 10); //sale price is 450
  createTestProduct('iPhone 5s', 'iphone-5s.png', 0.5, 200, 0); //sale price is 200
  createTestProduct('Apple TV', 'apple-tv.png', 1.5, 100, 5); //sale price is 95

  createTestCustomer('Bob', 'bob.png', true);
  createTestCustomer('Sally', 'sally.png', false);

  $('select#select-customer').val('Sally');
  $('select#select-customer').trigger('change');

  //2 iphone 5s
  $('#products tr:nth-child(3) .product-image img').trigger('click'); //google will insert a tbody into the mix, so when you put > between levels, it'll fail in searching for it
  $('#products tr:nth-child(3) .product-image img').trigger('click');

  //1 ipad air
  $('#products tr:nth-child(2) .product-image img').trigger('click');

  //1 apple tv
  $('#products tr:nth-child(4) .product-image img').trigger('click');

  equal(db.cart.customer.name, 'Sally', 'shopping cart should belong to Sally');
  ok(db.cart.customer instanceof Customer, 'sally should be a Customer');
  equal(db.cart.products.length, 4, 'should be 4 items in shopping cart');
  ok(db.cart.products[0] instanceof Product, 'item in products should be a Product');
  equal(db.cart.totals.count(), 4, 'should have chosen 4 items in cart');
  equal(db.cart.totals.amount(), 945, 'amount total should be 945');
  equal(db.cart.totals.weight(), 3.5, 'weight total should be 3.5');

  //domestic $0.50 lb / international $1.50 lb
  equal(db.cart.totals.shipping(), 5.25 , 'shipping total should be 5.25');
  equal(db.cart.totals.grand(), 950.25, 'grand total should be 950.25');

  equal($('#cart thead tr').length, 1, 'should be a header');
  equal($('#cart tbody tr').length, 3, 'should be 3 rows in body'); //similar items get combined
  equal($('#cart tfoot tr').length, 1, 'should be a footer');

  equal($('#cart tbody tr:nth-child(1) .product-name').text(), 'iPhone 5s', 'name should be iphone 5s'); //seeing if cell in cart says this
  equal($('#cart tbody tr:nth-child(1) .product-count').text(), 2, 'count should be 2');

  equal($('#cart tfoot tr #cart-count').text(), '4', 'should have 4 items in cart');
  equal($('#cart tfoot tr #cart-amount').text(), '$945.00', 'should have $945.00 in amount');
  equal($('#cart tfoot tr #cart-weight').text(), '3.50 lbs', 'should have 3.5lbs in weight');
  equal($('#cart tfoot tr #cart-shipping').text(), '$5.25', 'should have $5.25 in shipping');
  equal($('#cart tfoot tr #cart-grand').text(), '$950.25', 'should have $950.25 for grand');
});

test('Add Order', function(){
  expect(14);

  createTestProduct('iPad Air', 'ipad-air.png', 1, 500, 10); //sale price is 450
  createTestProduct('iPhone 5s', 'iphone-5s.png', 0.5, 200, 0); //sale price is 200
  createTestProduct('Apple TV', 'apple-tv.png', 1.5, 100, 5); //sale price is 95

  createTestCustomer('Bob', 'bob.png', true);
  createTestCustomer('Sally', 'sally.png', false);

  $('select#select-customer').val('Sally');
  $('select#select-customer').trigger('change');

  //2 iphone 5s
  $('#products tr:nth-child(3) .product-image img').trigger('click'); //google will insert a tbody into the mix, so when you put > between levels, it'll fail in searching for it
  $('#products tr:nth-child(3) .product-image img').trigger('click');

  //1 ipad air
  $('#products tr:nth-child(2) .product-image img').trigger('click');

  //1 apple tv
  $('#products tr:nth-child(4) .product-image img').trigger('click');
  $('#purchase').trigger('click');

  equal($('#cart tbody tr').length, 0, 'should be no rows in tbody after purchase');
  equal($('#card-grand').text(), '', 'should be no grand total after purchase');
  equal($('#select-customer').val(), 'default', 'drop down should default after purchase');
  equal(db.order.length, 1, 'should be 1 order after purchase');
  ok(db.orders[0] instanceof Order, 'should be an Order instance after purchase');
  ok(db.orders[0].id, 'should have an ID after purchase');
  equal($('#orders thead th').length, 7, 'should have 7 columns in orders table');
  equal($('#orders tbody tr').length, 1, 'should have 1 row in orders table body');
  equal($('#orders tbody .order-time').text().split(' ').length, 5, 'date time should be formatted');
  equal($('#orders tbody .order-customer').text(), 'Sally', 'should have customer name');
  equal($('#orders tbody .order-total').text(), '$945.00', 'should have customer total');
  equal($('#orders tbody .order-shipping').text(), '$5.25', 'should have customer shipping');
  equal($('#orders tbody .order-grand').text(), '$950.25', 'should have customer grand');
  equal($('#orders tbody .order-products-list li').length, 4, 'should have 4 items in order');
});

function createTestProduct(name, image, weight, price, off){
  $('#product-name').val(name);
  $('#product-image').val(image);
  $('#product-weight').val(weight);
  $('#product-price').val(price);
  $('#product-off').val(off);
  $('#add-product').trigger('click');
}

function createTestCustomer(name, image, isDomestic){
  $('#customer-name').val(name);
  $('#customer-image').val(image);

  if(isDomestic){
    $('#domestic')[0].checked = true;
  } else {
    $('#international')[0].checked = true;
  }

  $('#add-customer').trigger('click');
}


// 'use strict';

// module('Integration Testing', {setup: setupTest, teardown: teardownTest});

// function setupTest(){ //runs before every test
//   turnHandlersOff();
//   turnHandlersOn();
//   // Reset Global Variables Here
//   db.products = []; //before test runs, takes local array and erases it; all tests should be a clean slate
//   // Clean Out Test Database Here
//   Δdb.remove(); //will remove everything in db
// }

// function teardownTest(){
// }

// test('Add Product', function(){
//   expect(13);

//   $('#product-image').val('ipad-air.png');
//   $('#product-name').val('Ipad Air');
//   $('#product-weight').val('1.0');
//   $('#product-price').val('500.00');
//   $('#product-off').val('10');
//   $('#add-product').trigger('click');

// //verify data is correct
//   equal(db.products.length, 1, 'products array should have 1 element');
//   ok(db.products[0].id, 'id should be populated');
//   ok(db.products[0] instanceof Product, 'product should be an instanceof Product');
//   equal(db.products[0].image, 'ipad-air.png', 'product should have an image');
//   equal(db.products[0].name, 'Ipad Air', 'product should have a name');
//   equal(db.products[0].weight, 1.0, 'product should have a weight');
//   QUnit.close(db.products[0].salePrice(), 450, 0.01, 1, 'product should have a sale price');

// //verify html is correct
//   equal($('#products tr').length, 2, 'should be 2 rows in table'); //jquery selector will bring back an array of things it finds
//   equal($('#products tr td').length, 6, 'should be 6 columns in row');
//   equal($('#products .product-name').text(), 'Ipad Air', 'name column should be populated');
//   equal($('#products .product-sale').text(), '$450.00', 'sale column should be populated'); //450.00 is string here b/c of .text()
//   equal($('#products .product-weight').text(), '1', 'product column should be populated');
//   equal($('#products .product-image img').attr('src'), '/img/ipad-air.png', 'image column should be populated');// /img/ipad-air.png the initial / means it's absolute and will start from public


//   // equal('actual-result', 'expected-result', 'description of assertion');
//   // ok('result-that-is-true-or-false', 'description of assertion');
//   // deepEqual('actual-result', 'expected-result', 'description of assertion');
// });

// test('Product Pagination', function(){
//   expect(18);
//   for(var i = 0; i < 15; i++){
//   //want to randomly generate strings of data; base 36 (0-10 and all upper and lowercase letters); substring chops off 0 and deimal point
//     var name = Math.random().toString(36).substring(2);
//     var image = Math.random().toString(36).substring(2) + '.png';
//     var weight = Math.random() * 100; //*100 gives you a random number anywhere btwn 0-100
//     var price = Math.random() * 1000;
//     var off = Math.random() * 100;

//     createTestProduct(name, image, weight, price, off); //creating 15 products w/ all random info population
//   }
//   //test data
//   equal(db.products.length, 15, 'should have 15 products');
//   equal(db.pagination.perPage, 5, 'should be 5 products per page' ); //create db.pagination so system will know you want x number of pages
//   equal(db.pagination.currentPage, 1, 'should be on first page'); //haven't switched pages yet

//   //test html
//   equal($('#product tr').length, 6, 'should have 5 products in table');
//   equal($('#previous.hidden').length, 1, 'previous button should be hidden'); //page 1 shouldnt have
//   equal($('#next:not(.hidden)').length, 0, 'next button should not be hidden'); //page 1 shouldnt have; will look for next thing that doesn't have a class of hidden

//   $('#next').trigger('click');

//   equal(db.pagination.currentPage, 2, 'should be on second page');
//   equal($('#product tr').length, 6, 'should have 5 products in table');
//   equal($('#previous:not(.hidden)').length, 1, 'previous button should not be hidden');
//   equal($('#next:not(.hidden)').length, 1, 'next button should not be hidden'); //page 1 shouldnt have; will look for next thing that doesn't have a class of hidden

//   $('#next').trigger('click');

//   equal(db.pagination.currentPage, 3, 'should be on third page');
//   equal($('#product tr').length, 3, 'should have 3 products in table');
//   equal($('#previous:not(.hidden)').length, 1, 'previous button should not be hidden');
//   equal($('#next.hidden').length, 1, 'next button should be hidden'); //page 1 shouldnt have; will look for next thing that doesn't have a class of hidden

//   $('#previous').trigger('click');
//   $('#previous').trigger('click');

//   equal(db.pagination.currentPage, 1, 'should be on first page'); //haven't switched pages yet
//   equal($('#product tr').length, 6, 'should have 5 products in table');
//   ok($('#previous').hasClass('hidden'), 'previous button should be hidden'); //page 1 shouldnt have
//   ok(!$('#previous').hasClass('hidden'), 'next button should not be hidden'); //page 1 shouldnt have; will look for next thing that doesn't have a class of hidden


// });

// function createTestProduct(name, image, weight, price, off){
//   //now using features of website to create info for us; site already does it, so no need to dupe
//   $('#product-image').val('image');
//   $('#product-name').val('name');
//   $('#product-weight').val('weight');
//   $('#product-price').val('price');
//   $('#product-off').val('off');
//   $('#add-product').trigger('click');

// }