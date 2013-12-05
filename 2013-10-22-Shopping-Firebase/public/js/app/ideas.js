//--------------------------------FIRST PASS------------------------------ //
// 'use strict';

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// // Firebase Schema
// var Δdb;
// var Δproducts;
// var Δcustomers;
// var Δorders;

// // Local Schema (var db = {} defined in keys.js)
// db.products = [];
// db.customers = [];
// db.orders = [];
// db.pagination = {};
// db.pagination.perPage = 5;
// db.pagination.currentPage = 1;
// db.pagination.curentRowCount = 0; //keeps track of rows as they're being added
// //or db.products = db.customers = db.orders = []; sets to empty arrays

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// $(document).ready(initialize);

// function initialize(){
//   $(document).foundation();
//   initializeDatabase();
//   turnHandlersOn();
// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// function initializeDatabase(){
//   Δdb = new Firebase(db.keys.firebase);  //tests reset each time, regular db stores data
//   Δproducts = Δdb.child('products');

//   Δproducts.on('child_added', dbProductAdded);

// }

// function turnHandlersOn(){
//   $('#add-product').on('click', clickAddProduct);

// }

// function turnHandlersOff(){
//   $('#add-product').off('click'); //turning off a click handler - nothing else will happen when users clicks
// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// function clickAddProduct(){
//   var image = getValue('#product-image');
//   var name = getValue('#product-name');
//   var price = getValue('#product-price', parseFloat);
//   var off = getValue('#product-off', parseFloat) / 100;
//   var weight = getValue('#product-weight', parseFloat);

//   var product = new Product(image, price, name, off, weight); //job is to make objects
//   delete product.salePrice; //can't push a fn to firebase!! so delete property b4 push up
//   Δproducts.push(product);
// }


// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// function Product(image, price, name, off, weight){
//   this.name = name;
//   this.image = image;
//   this.weight = weight;
//   this.price = price;
//   this.off = off;
//   this.salePrice = function(){return this.price - (this.off * this.price);};
// }


// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// function dbProductAdded(snapshot){
//   var obj = snapshot.val(); //snapshot is a generic object w/ generic properties
//   //so create a product object from the data below:
//   var product = new Product(obj.image, obj.price, obj.name, obj.off, obj.weight); //make sure the order of the reconstitution matches the order of the variables passed down into it in fn Product
//   product.id = snapshot.name(); //need to add 1 more property 'id' to product object
//   db.products.push(product); //now have array of 1 item: a product object



//   htmlAddProductToTable(product);


//   // createTestProduct(name, image, weight, price, off);

// }
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// function htmlAddProductToTable(product){
//   var tr = '<tr><td class="product-image"><img src="/img/' + product.image + '"></td><td class="product-name">' + product.name + '</td><td class="product-weight">' + product.weight + '</td><td class="product-price">' + formatCurrency(product.price) + '</td><td class="product-off">' + product.off + '%' + '</td><td class="product-sale">' + formatCurrency(product.salePrice()) + '</td></tr>';
//   var $tr = $(tr);
//   $('#products').append($tr);
// }


// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// function getValue(selector, fn){
//   var value = $(selector).val();
//   value = value.trim();
//   $(selector).val('');

//   if(fn){
//     value = fn(value);
//   }

//   return value;
// }

// function parseUpperCase(string){
//   return string.toUpperCase();
// }

// function parseLowerCase(string){
//   return string.toLowerCase();
// }

// function formatCurrency(number){
//   return '$' + number.toFixed(2);
// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// // function clickNextPage(){
// //   db.pagination.currentRowCount = 0;
// //   $('#products').empty();
// //   var startIndex = db.pagination.perPage * db.pagination.currentPage;
// //   var endIndex = (db.pagination.currentPage + 1) * db.pagination.perPage;

// //   for(var i = startIndex; i < endIndex; i++){
// //     htmlAddProductToTable(db.products[i]);
// //     db.pagination.currentPage++;
// //     $('#currentPage p').text(db.pagination.currentPage++);
// //   }
// // }
//   // $('#next').on('click', clickNextPage);

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //








// // ----------------SECOND PASS----------------------------------------- //
// 'use strict';

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

// // Firebase Schema
// var Δdb;
// var Δproducts;
// var Δcustomers;
// var Δorders;

// // Local Schema (defined in keys.js)
// db.products = db.customers = db.orders = []; //blank array when page 1st loads
// db.pagination = {};
// db.pagination.perPage = 5;
// db.pagination.currentPage = 1;
// db.pagination.currentRowCount = 0;
// db.cart = {};
// db.cart.products = []; //pushing products into an array
// db.cart.totals = {};
// db.cart.totals.count = 0;
// db.cart.totals.amount = 0;
// db.cart.totals.weight = 0;
// db.cart.totals.shipping = 0;
// db.cart.totals.grand = 0;

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// $(document).ready(initialize);

// function initialize(){
//   $(document).foundation();
//   initializeDatabase();
//   turnHandlersOn();
// }

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

// function initializeDatabase(){
//   Δdb = new Firebase(db.keys.firebase);
//   Δproducts = Δdb.child('products');
//   Δcustomers = Δdb.child('customers');
//   Δorders = Δdb.child('orders');

//   Δproducts.on('child_added', dbProductAdded);
//   Δcustomers.on('child_added', dbCustomerAdded);
//   Δorders.on('child_added', dbOrderAdded);
// }

// function turnHandlersOn(){
//   $('#add-product').on('click', clickAddProduct);
//   $('#previous').on('click', clickNavigation);
//   $('#next').on('click', clickNavigation);
//   $('#add-customer').on('click', clickAddCustomer);
//   $('#select-customer').on('change', changeCustomer);
//   $('#products').on('click', 'tr .product-image img', clickAddItemToCart);

// }

// function turnHandlersOff(){
//   $('#add-product').off('click');
//   $('#previous').off('click');
//   $('#next').off('click');
//   $('#add-customer').off('click');
//   $('#select-customer').off('change');
//   $('#products').off('click');
// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// function clickAddProduct(){
//   var image = getValue('#product-image');
//   var name = getValue('#product-name');
//   var weight = getValue('#product-weight', parseFloat);
//   var price = getValue('#product-price', parseFloat);
//   var off = getValue('#product-off', parseFloat) / 100;

//   var product = new Product(image, name, weight, price, off);
//   delete product.salePrice;
//   Δproducts.push(product);
// }

// function clickAddCustomer(){
//   var image = getValue('#customer-image');
//   var name = getValue('#customer-name');
//   var isDomestic = $('input[name="address"]:checked').val() === 'domestic'; //boolean: if the one you checked is domestic, then domestic is true
//   htmlResetRadioButtons();

//   var customer = new Customer(image, name, isDomestic);
//   Δcustomers.push(customer);
// }

// function changeCustomer(){
//   // debugger;
//   var name = this.value; //this is the select box (target set in event handler): a dom object with a property you can ask directly what value is
//   var customer = _.find(db.customers, function(c){return c.name === name;}); //db.customers is already an array of customer objects you're wanting to find a specific customer on
//   db.cart.customer = customer; //sally object gets returned inside cart.customer upon match in _.find
// }

// function clickAddItemToCart(){
//   // debugger;
//   var $img = $(this);
//   var id = $img.parents('tr.product').attr('data-id');
//   var product = _.find(db.products, function(p){return p.id === id;});
//   db.cart.products.push(product);
//   db.cart.totals.count = db.cart.products.length;
//   db.cart.totals.amount += product.salePrice();
//   db.cart.totals.weight += product.weight;
//   db.cart.totals.shipping = db.cart.customer.isDomestic === true ? (0.5 * product.weight) : (1.5 * product.weight);
//   db.cart.totals.total = db.cart.totals.amount + db.cart.totals.shipping;
//   htmlAddItemToCart(product);
// }

// function clickNavigation(){
//   db.pagination.currentRowCount = 0;
//   htmlEmptyProductRows();

//   var isPrevious = this.id === 'previous';
//   db.pagination.currentPage += isPrevious ? -1 : +1;

//   var startIndex = db.pagination.perPage * (db.pagination.currentPage - 1);
//   var endLength = (startIndex + db.pagination.perPage) > db.products.length ? db.products.length : startIndex + db.pagination.perPage;
//   var isLess = startIndex > 0;
//   var isMore = db.products.length > endLength;

//   htmlShowHideNavigation('#previous', isLess);
//   htmlShowHideNavigation('#next', isMore);

//   for(var i = startIndex; i < endLength; i++){
//     htmlAddProduct(db.products[i]);
//   }
// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// function dbProductAdded(snapshot){
//   var obj = snapshot.val();
//   var product = new Product(obj.image, obj.name, obj.weight, obj.price, obj.off);
//   product.id = snapshot.name();
//   db.products.push(product);
//   if(db.pagination.currentRowCount < db.pagination.perPage){
//     htmlAddProduct(product);
//   } else {
//     htmlShowHideNavigation('#next', true);
//   }
// }

// function dbCustomerAdded(snapshot){
//   var obj = snapshot.val(); //when retrieve data from db, its' just a regular obj and must be converted back to a customer Obj
//   var customer = new Customer(obj.image, obj.name, obj.isDomestic);
//   customer.id = snapshot.name();
//   db.customers.push(customer);
//   htmlAddCustomerToSelect(customer);
// }

// function dbOrderAdded(snapshot){
//   var order = snapshot.val();
// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// function htmlAddItemToCart(product){
//   var $cartProduct = $('<tr><td id="cart-name">' + product.name + '</td><td id="cart-count">' + product.length + '</td><td id="cart-amount">' + db.cart.totals.amount + '</td><td id="cart-weight">' + db.cart.totals.weight + '</td><td id="cart-shipping">' + db.cart.totals.grand +'</td></tr>');
//   $('#cart tbody').append($cartProduct);
//   htmlUpdateCartTotal();
// }

// function htmlUpdateCartTotal(){
//   $('#cart tfoot tr td#cart-count').text(db.cart.totals.count);
//   // $('#cart tfoot tr td#cart-amount').text(formatCurrency(db.cart.totals.amount));
//   $('#cart tfoot tr td#cart-weight').text(db.cart.totals.weight + ' lbs');
//   // $('#cart tfoot tr td#cart-shipping').text(formatCurrency(db.cart.totals.shipping));
//   // $('#cart tfoot tr td#cart-grand').text(formatCurrency(db.cart.totals.grand));
// }

// function htmlAddCustomerToSelect(customer){
//   var $option = $('<option>');
//   $option.val(customer.name);
//   $option.text(customer.name);
//   $('#select-customer').prepend($option);
// }

// function htmlAddProduct(product){
//   db.pagination.currentRowCount++;
//   var tr = '<tr class="product"><td class="product-image"><img src="/img/' + product.image + '"></td><td class="product-name">' + product.name + '</td><td class="product-weight">' + product.weight + ' lbs</td><td class="product-price">' + formatCurrency(product.price) + '</td><td class="product-off">' + product.off + '</td><td class="product-sale">' + formatCurrency(product.salePrice()) + '</td></tr>';
//   var $tr = $(tr);
//   $tr.attr('data-id', product.id);
//   $('#products').append($tr);
// }

// function htmlShowHideNavigation(selector, shouldShow){
//   $(selector).removeClass('hidden');

//   if(!shouldShow){
//     $(selector).addClass('hidden');
//   }
// }

// function htmlEmptyProductRows(){
//   $('.product').remove();
// }

// function htmlResetRadioButtons(){
//   $('input[name="address"]:checked')[0].checked = false;
// }

// // function htmlResetRadioButtons(){ //jquery selector that will select both intl and domestic
// //   $('input[name="address"]').each(function(index, dom){// how to pull things out of array 1 @ a time; each thing takes fn and has 2 inputs; dom=actual thing in array, index is each object from array coming into the fn; each goes thru array until the end
// //     dom.checked = false;

// // //or do this:  $('input[name="address"]:checked')[0].checked = false //selects both radio buttons and :checked narrows down to selected
// //   });

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// function Product(image, name, weight, price, off){
//   this.image = image;
//   this.name = name;
//   this.weight = weight;
//   this.price = price;
//   this.off = off;
//   this.salePrice = function salePrice(){return this.price - (this.price * this.off);};
// }

// function Customer(image, name, isDomestic){
//   this.image = image;
//   this.name = name;
//   this.isDomestic = isDomestic;

// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// function getValue(selector, fn){
//   var value = $(selector).val();
//   value = value.trim();
//   $(selector).val('');

//   if(fn){
//     value = fn(value);
//   }

//   return value;
// }

// function parseUpperCase(string){
//   return string.toUpperCase();
// }

// function parseLowerCase(string){
//   return string.toLowerCase();
// }

// function formatCurrency(number){
//   return '$' + number.toFixed(2);
// }
