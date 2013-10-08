'use strict';

var photos = [];
var currentIndex = 0; /*where are we currently at in array of photos*/
var timer = 0;
var page = 1;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#search').click(searchFlickr);
}

function searchFlickr(){
  var API_KEY = '801477d3c9bb56107d7a35757b881546';
  var PER_PAGE = 3;

  var query = $('#query').val();
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&text=' + query + '&per_page=' + PER_PAGE + '&page=' + page + '&format=json&jsoncallback=?';
  $.getJSON(url, results);

  console.log(url);
}

function results(data) {
  debugger;
  photos = data.photos.photo; /*received data from Flickr and stored in data.photos (the global var array above).photo*/
  timer = setInterval(createImage, 1000); /*time is in milliseconds, so 1000 is 1 second*/
}

function createImage(photo){
  var photo = photos[currentIndex]; /*this is used to construct items in the url*/

  try
  {
    var url = 'url(http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg)';
    var $div = $('<div>');
    $div.addClass('photo');
    $div.css('background-image', url);
    $('#photos').prepend($div);


    if(currentIndex < photos.length - 1){
      currentIndex++;
    } else {
      clearInterval(timer);
      currentIndex = 0;
      page++;
      searchFlickr();
    }
  }
  catch(err)
  {
    clearInterval(timer);
    currentIndex = 0;
    searchFlickr();
  }
}