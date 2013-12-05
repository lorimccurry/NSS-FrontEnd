'use strict';

// Firebase Schema
var Δdb;
var Δpositions;
var Δtargets;

// Local Schema (defined in keys.js)
db.positions = [];
db.targets = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  Δtargets = Δdb.child('target');
  Δpositions = Δdb.child('position');
  Δpositions.on('child_added', dbPositionAdded);
  // Δtargets.on('child_added', dbTargetAdded);
  $('#start').click(clickStart);
  // $('#stop').click(clickStop);
  // $('#add').click(addTarget);

  initMap(36, -86, 5);
  Δpositions.remove();

}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //


function dbPositionAdded(snapshot){
  var position = snapshot.val();
  var latLng = new google.maps.LatLng(position.latitude, position.longitude); //where did this come from?

  db.positions.push(position);

  console.log('pushed position to local db');

//   if ("geolocation" in navigator) {
//     /* geolocation is available */
//   } else {
//      console.log(geolocation IS NOT available);
//        }
  if(db.positions.length === 1){
    htmlAddStartIcon(latLng);
    // htmlInitializePolyLine();
  }

  htmlSetCenterAndZoom(latLng);
}

function htmlAddStartIcon(latLng){
  var image = '/img/hiker.png';
  db.marker = new google.maps.Marker({position: latLng, map: db.map, icon: image});
}

// function dbTargetAdded(snapshot){
//   var target = target.val();
//   db.targets.push(target);
// }


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlSetCenterAndZoom(latLng){
  db.map.setCenter(latLng);
  db.map.setZoom(20);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickStart(){
  var geoOptions = {enableHighAccuracy: true, maximumAge: 1000, timeout: 60000}; //why is there nothing more in the clickStart?
  db.watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //


function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.SATTELITE};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function geoSuccess(location) {
  var position = {};
  position.latitude = location.coords.latitude;
  position.longitude = location.coords.longitude;
  position.altitude = location.coords.altitude || 0;
  position.time = moment().format('MMMM Do YYYY, h:mm:ss a');
  Δpositions.push(position);
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
