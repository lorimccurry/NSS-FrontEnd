'use strict';

// Firebase Schema
var Δdb;
var Δpositions;

// Local Schema (defined in keys.js)
db.positions = [];
db.path = []; //array of lat/lon objects


$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase); /*this is linked to keys.js; split out for later testing*/
  Δpositions = Δdb.child('positions');
  Δpositions.on('child_added', dbPositionAdded);
  $('#start').click(clickStart); //create my google map
  $('#erase').click(clickErase);
  $('#stop').click(clickStop);
  initMap(36, -86, 5);
  Δpositions.remove();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbPositionAdded(snapshot){
    var position = snapshot.val();
    var latLng = new google.maps.LatLng(position.latitude, position.longitude); //define lat and lon

    db.positions.push(position);

    if(db.positions.length === 1){
      htmlAddStartIcon(latLng); //passes latLng thru the chain to htmlAddStartIcon;
      htmlInitializePolyLine();
    }
    db.path.push(latLng); //represents path we're walking on
    $('#debug').text(position.time);
    db.marker.setPosition(latLng); //move global marker along with current position
    htmlSetCenterAndZoom(latLng);
  }

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddStartIcon(latLng){
  var image = '/img/pinkpanther.gif';
  db.marker = new google.maps.Marker({map: db.map, position: latLng, icon: image}); //put x marker on x specific map at x specific location; db.map (created on line 66) = where map is at ; position = where marker located on map
  //making marker global
}

function htmlInitializePolyLine(){
  var polyLine = new google.maps.Polyline({
    map: db.map,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  db.path = polyLine.getPath(); //MVC Array
}

function htmlSetCenterAndZoom(latLng){
  db.map.setCenter(latLng);
  db.map.setZoom(20);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickStart(){
  var geoOptions = {enableHighAccuracy: true, maximumAge: 1000, timeout: 60000};
  db.watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions); //navigator is part of your browser html 5 spec
}

function clickStop(){
  navigator.geolocation.clearWatch(db.watchId);
}

function clickErase(){ //mulligan button
  Δpositions.remove(); /*before I start, make sure I erase all my old positions; when hit refresh - like saying you messed up*/
  db.positions = []; /*reset local as well*/
  db.path = []; //array of lat/lon objects
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

//makes map show up on screen
function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.SATELLITE};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  //db.map is a google map object
}

function geoSuccess(location) {
  // do_something(position.coords.latitude, position.coords.longitude);
  var position = {};
  position.latitude = location.coords.latitude;
  position.longitude = location.coords.longitude;
  position.altitude = location.coords.altitude || 0; /*|| = if null, then firebase won't save it*/
  position.time = moment().format('MMMM Do YYYY, h:mm:ss a'); /*this is moment js which exists in our libraries*/
  Δpositions.push(position);

  console.log('You have pushed a postion');

}

function geoError() {
  console.log('Sorry, no position available.');
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //


function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function parseUpperCase(string){
  return string.toUpperCase();
}

function parseLowerCase(string){
  return string.toLowerCase();
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
