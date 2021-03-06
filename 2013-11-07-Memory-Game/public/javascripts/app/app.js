$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('form#form').on('submit', clickSubmitForm);
  $('#cards').on('click', '.card', clickCard);
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function clickSubmitForm(e){
  var url = $(this).attr('action');
  var data = $(this).serialize(); //serialize is only for a form to scrape data from it
  url = url + '/?' + data;
  sendGenericAjaxRequest(url, {}, 'post', null, e, function(data, status, jqXHR){
    htmlAddCards(data);
  });
}

function clickCard(e){
  var url = '/games/' + $(this).parent().data('game-id');
  var cardIndex = $(this).data('card-index');
  sendGenericAjaxRequest(url, {cardIndex: cardIndex}, 'get', null, e, function(data, status, jqXHR){
    htmlFlipCard(data);
  });
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function sendGenericAjaxRequest(url, data, verb, altVerb, event, successFn){ //1) url 2)data sent a)url (path) b)query string (also a part of url) c)body
  var options = {};
  options.url = url;
  options.type = verb; //main verb = only GET or POST
  options.data = data; //main data to send in (nothing in this case)
  console.log(options.data);

  options.success = successFn;
  options.error = function(jqXHR, status, error){console.log(error);};

  if(altVerb) options.data._method = altVerb; //must set verb to post and altVerb to put; did give alt verb? if so take options.data and do _method and make verb (altVerb) PUT or DELETE;
  $.ajax(options); //send ajax request to server
  if(event) event.preventDefault(); //did you send a request, then call preventDefault, and if not, do default
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function htmlAddCards(game){
  $('#cards').attr('data-game-id', game._id);
  for(var i = 0; i < game.pieces; i++){
    var $card = $('<div class="card"></div>').attr('data-card-index', [i]);
    $('#cards').append($card);
  }
}

function htmlFlipCard(game){
  console.log(game);

}