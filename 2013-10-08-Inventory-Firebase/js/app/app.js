'use strict';

var db; /*points to top of object path - the root*/
var items; /*just the item upper level and below*/

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add').click(add);
  $('#save').click(save);
  db = new Firebase('https://inventory-lm.firebaseio.com/')
  items = db.child('items');

  db.on('value', function(snapshot){ /*this is active and always listening for changes in values*/
    var inventory = snapshot.val();
    $('#person').val(inventory.fullName);
    $('#address').val(inventory.address);
  });

}

function save() {
  var fullName = $('#person').val();
  var address = $('#address').val();
  var inventory = {}; /*create an opject and give properties below*/
  inventory.fullName = fullName;
  inventory.address = address;

  db.set(inventory);
}

function add(){
  var name = $('#name').val(); /*getting values*/
  var count = $('#amount').val();
  var value = $('#value').val();
  var room = $('#room').val();
  var condition = $('#condition').val();
  var date = $('#date').val();

/*like a long $div = $('<div>'); create mini dom tree that is the table to traverse or create things on, etc*/
  var row = '<tr><td class="name"></td><td class="count"></td><td class="value"></td><td class="room"></td><td class="condition"></td><td class="date"></td></tr>';
  var $row = $(row);

  $row.children('.name').text(name); /*filter down by class name and populate w/ var from above*/
  $row.children('.count').text(count);
  $row.children('.value').text(value);
  $row.children('.room').text(room);
  $row.children('.condition').text(condition);
  $row.children('.date').text(date);

  var item = {};
  item.name = name;
  item.count = count;
  item.value = value;
  item.room = room;
  item.condition = condition;
  item.date = date;

  items.push(item); /*creates a child element underneath something - pushes to global var items*/

  $('#items').append($row);

}