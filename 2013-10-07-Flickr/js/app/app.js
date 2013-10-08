'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#search').click(searchFlickr);
  $('#clear').click(clearPhotos);
  $('#delete').click(deleteImages);
  $('#save').click(saveImages);
  $('#photos').on('dblclick', '.photo', removePhoto);
  $('#photos').on('click', '.photo', selectImage);
}

function saveImages() {
  var $selectedImages = $('.selected');
  $selectedImages.removeClass('selected');
  $('#saved-photos').prepend($selectedImages);
}

function deleteImages() {
  $('.selected').remove();
}

function removePhoto(){ /*Removes image when double clicked*/
  $(this).remove();
}

function clearPhotos() {
  $('#photos').empty();
}

function selectImage() {
  $(this).toggleClass('selected');
}

function searchFlickr(){
  var API_KEY = '801477d3c9bb56107d7a35757b881546';
  var PER_PAGE = 50;
  var page = 1;

  var query = $('#query').val();
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&text=' + query + '&per_page=' + PER_PAGE + '&page=' + page + '&format=json&jsoncallback=?';
  $.getJSON(url, results);

}

function results(data) {
  for (var i = 0; i < data.photos.photo.length; i++){
    createImage(data.photos.photo[i]);
  }
}

function createImage(photo){
  var url = 'url(http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg)';
  var $div = $('<div>');
  $div.addClass('photo');
  $div.css('background-image', url);
  $('#photos').prepend($div);

}