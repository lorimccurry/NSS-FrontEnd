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
  Δpeople.on('child_added', dbPersonAdded);
  $('#people').on('dblclick', '.person', removePerson);
  Δpeople.on('child_removed', personRemoved);
}

//gets values from user input, creates person object and gives properties, pushes values to cloud db, the value pushed should trigger the personAdded(snapshot)
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
function dbPersonAdded(snapshot){
  var person = snapshot.val();
  createPersonHtml(person);
  db.people.push(person);
}

//constructs the actual person div w/ each item in it, turn that into a jquery super var so can add children elements in div w/ content, pushes that into #person div element
function createPersonHtml(person){
  var personEntry = '<div class="person"><img class="photo"><p class="name"></p><p class="address"></p><a class="website"></a><a class="email"></a></div>';
  var $personEntry = $(personEntry);
  $personEntry.addClass(person);

  $personEntry.children('.photo').attr('src', 'http://' + person.photo);
  $personEntry.children('.name').text(person.name);
  $personEntry.children('.address').text(person.address);
  $personEntry.children('.website').text(person.website).attr('href', 'http://' + person.website);
  $personEntry.children('.email').text(person.email).attr('href', 'mailto:' + person.email);

  $('#people').prepend($personEntry);
}

function removePersonHtml(){
 var personRemove = $(this).remove();
}

//this may sync cloud change to local
// function personUpdated(snapshot){
//     Δpeople.set(db.people);


// }