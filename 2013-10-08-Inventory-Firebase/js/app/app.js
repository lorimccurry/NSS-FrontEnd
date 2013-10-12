'use strict';

//Database Schema
/*notice how local and cloud mirror each other and update each other real time*/
var Δdb; /*points to top of object path - the root*/
var Δitems; /*the item upper level and below; db copy of items*/
var Δperson;

//Local Schema
var db = {}; /*mirrors db in cloud*/
//db properties below
db.person = {};
db.items = []; /*technically in cloud, this is an object, but locally, we want it to be an array*/
db.statistics = {};
db.statistics.grandTotal = 0;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add').click(add);
  $('#save').click(save);

  Δdb = new Firebase('https://inventory-lm.firebaseio.com/'); /*sets up new database*/
  Δitems = Δdb.child('items'); /*this is the key; creates var array to this location to contain items - if this doesn't exist, firebase will create for you*/
  Δperson = Δdb.child('person');
  Δperson.on('value', personChanged); /*gives you the value of the 1 targeted person*/
  Δitems.on('child_added', itemAdded); /*when a child is added to items section, run itemAdded*/
  /*child_added is a firebase event (5 total); if used 'value', you'd get the whole db*/
}

function itemAdded(snapshot){
  // console.log(snapshot.val());
  var item = snapshot.val();
  createRow(item);
  updateGrandTotal(item);
  db.items.push(item);
}
/*when page intially loaded, childAdded will pull everything existing in*/

/*below fn will get called upon startup*/
function personChanged(snapshot){
  var person = snapshot.val();

  try { /*exception handling fn to catch error when rcv data from site*/
    $('#person').val(person.fullName);
    $('#address').val(person.address);
    db.person = person; /*any time db person changes, the local copy will get updated*/
  } catch(e) {
    console.log('there was an error: e');
  }

  console.log(person); /*getting notified every time db gets an update*/
}

function updateGrandTotal(item){
  db.statistics.grandTotal += (item.count * item.value); /*any time db changes, local copy stats will too*/
  $('#grand-total').text('$' + db.statistics.grandTotal + '.00');
}

function save() {
  var fullName = $('#person').val();
  var address = $('#address').val();
  var person = {}; /*create an object and give properties below*/
  person.fullName = fullName;
  person.address = address;

  Δperson.set(person); /*will override at the person node; syncing local copy person w/ db person*/
}

function add(){ /*this creates an object and pushes it to the db*/
  var name = $('#name').val(); /*getting values*/
  var count = parseInt($('#count').val(), 10); /*any numbers should be converted before going up to the db*/
  var value = parseInt($('#value').val(), 10);
  var room = $('#room').val();
  var condition = $('#condition').val();
  var date = $('#date').val();

  var item = {};
  item.name = name;
  item.count = count;
  item.value = value;
  item.room = room;
  item.condition = condition;
  item.date = date;

  /*need to give firebase a key and a value; knows to create the node and put something underneath it*/
  Δitems.push(item);/*push up ONE item you just changed into the cloud array-type item; so have local copy and copy in the cloud*/
  /*this pushes changes to everyone, then db flushes data back down, so don't need to change this to sync to local db*/
}

function createRow(item){
/*like a long $div = $('<div>'); create mini dom tree that is the table to traverse or create things on, etc*/
  var row = '<tr><td class="name"></td><td class="count"></td><td class="value"></td><td class="room"></td><td class="condition"></td><td class="date"></td></tr>';
  var $row = $(row);

  $row.children('.name').text(item.name); /*filter down by class name and populate w/ var from above*/
  $row.children('.count').text(item.count);
  $row.children('.value').text(item.value);
  $row.children('.room').text(item.room);
  $row.children('.condition').text(item.condition);
  $row.children('.date').text(item.date);

  $('#items').append($row);
}

/*this shows how to push up ONE item that changed rather than a WHOLE array each time there's a change*/