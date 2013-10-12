'use strict';

//Firebase Schema
var Δdb;
var Δpeople;

//Local Schema
var db = {};
db.people = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://address-book-lm.firebaseio.com/');
  Δpeople = Δdb.child('person');
  $('#add').click(addPerson);
  Δpeople.on('child_added', personAdded);
}

//gets values from user input, creates person object and gives properties, pushes values to could db, the value pushed should trigger the personAdded(snapshot)
function addPerson(){
  var name = $('#name').val();
  var address = $('#address').val();
  var website = $('#website').val();
  var email = $('#email').val();
  var photo = $('#photo').val();

  var person = {};
  person.name = name;
  person.address = address;
  person.website = website;
  person.email = email;
  person.photo = photo;

  Δpeople.push(person);

  $('#name').val('');
  $('#address').val('');
  $('#website').val('');
  $('#email').val('');
  $('#photo').val('');

}

//pulls changed data down down from cloud db to person var, passes that info into the createPerson fn to make a new person, pushes that to local db
function personAdded(snapshot){
  var person = snapshot.val();
  createPerson(person);
  db.people.push(person);
}

//constructs the actual person div w/ each item in it, turn that into a jquery super var so can add children elements in div w/ content, pushes that into #person div element
function createPerson(person){
  var personEntry = '<div class="person"><img class="photo"><p class="name"></p><p class="address"></p><a class="website" href= http:// + person.website></a><a class="email" href= mailto: + "person.email"></a></div>';
  var $personEntry = $(personEntry);
  $personEntry.addClass(person);
  // debugger;

  // $personEntry.children('.photo').css('background-image', 'http://' + person.photo);
  $personEntry.children('.photo').attr('src', 'http://' + person.photo);
  $personEntry.children('.name').text(person.name);
  $personEntry.children('.address').text(person.address);
  $personEntry.children('.website').text(person.website);
  $personEntry.children('.email').text(person.email);

  $('#people').prepend($personEntry);
}