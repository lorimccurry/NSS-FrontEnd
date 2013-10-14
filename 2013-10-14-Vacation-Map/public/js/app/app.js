'use strict';

// Firebase Schema
var Δdb;
var Δlocations;

// Local Schema
var db = {};
db.map = null;
db.locations = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://vacation-map-lm.firebaseio.com/');
  Δlocations = Δdb.child('locations');
  Δlocations.on('child_added', dbLocationAdded);
  $('#set-zoom').click(clickSetZoom);
  $('#add-location').click(clickAddLocation);
  $('#go-location').click(clickGoLocation);
  initMap(36, -86, 5);
}

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function clickSetZoom() {
  var zoom = getValue('#zoom', parseInt); /*pulls out, removes what was there before, converts, repopulates*/
  db.map.setZoom(zoom);
}

function getValue(selector, fn){
  var value = $(selector).val();
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

function clickAddLocation(){
  var name = getValue('#location');
  var geocoder = new google.maps.Geocoder();

/*generic object w/ property of address; geocode x address w/ x name*/
  geocoder.geocode({address: name}, function(results, status){
    var location = {};
    location.name = results[0].formatted_address;
    location.coordinates = results[0].geometry.location;
    Δlocations.push(location);
  });
}

function dbLocationAdded(snapshot){
  var location = snapshot.val();
  db.location.push(location);
  htmlAddLocation(location);
  htmlAddMarker(location);
}

function htmlAddLocation(location){
  var $option = $('<option>');
  $option.val(location.name);
  $option.text(location.name);
  $('#location-select').append($option);
}

function htmlAddMarker(location){
  var latLng = new google.maps.LatLng(location.coordinates.lb, location.coordinates.mb);
  var marker = new google.maps.Marker({map: db.map, position: location.coordinates}); /*of all google maps on page, which one do you want the pin added to?*/

}

function clickGoLocation(){
  var name = $('#location-select').val();
  var location = _find(db.locations, function(l){l.name === name;});
  var latLng = new google.maps.LatLng(location.coordinates.lb, location.coordinates.mb);
  db.map.setCenter(latLng);
}
