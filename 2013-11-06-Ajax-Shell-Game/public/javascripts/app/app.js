$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('form#game').on('submit', submitGame);
  $('.cup').on('click', clickCup);
}

//----------------------------------------------------------------//
//----------------------------------------------------------------//
//----------------------------------------------------------------//

function submitGame(e){
  $('#result').text('');
  // alert('schweet');
  var url = $(this).attr('action') + '?player=' + $('input[name="player"]').val(); //what the browser is sending to jade: form triggers the event, so this is the form; find input where the name input happens to be player and grab his value
  // alert(url);
  sendGenericAjaxRequest(url, {}, 'post', null, e, function(data, status, jqXHR){ // {} if want nothing in body
    // console.log(data); //fires when rcvs response back from server
    htmlStartGame(data);
  });
}

function clickCup(){
  // debugger;
  var guess = $(this).data('position');
  // alert(position);
  var gameId = $('#cups').data('game');
  // alert(gameId);
  var url = '/games/' + gameId;
  // alert(url);
  sendGenericAjaxRequest(url, {guess:guess}, 'post', 'put', null, function(data, status, jqXHR){
    console.log(data);
    console.log(status);
    htmlEndGame(data);
  });
}

//----------------------------------------------------------------//
//----------------------------------------------------------------//
//----------------------------------------------------------------//
function htmlStartGame(game){//console.log will print properties on an object
  $('input[name="player"]').val('');
  $('#player').text(game.player);
  $('#cups').attr('data-game', game._id); //assigning id and putting in dom
  $('#cups').show();
}

function htmlEndGame(game){
  if(game.didWin){
    $('#result').text('Winner, winner chicken dinner');
  } else {
    $('#result').text('Wah-wah');
  }
  $('#cups').hide();
}


//----------------------------------------------------------------//
//----------------------------------------------------------------//
//----------------------------------------------------------------//

function sendGenericAjaxRequest(url, data, verb, altVerb, event, successFn){ //1) url 2)data sent a)url (path) b)query string (also a part of url) c)body
  var options = {};
  options.url = url;
  options.type = verb; //main verb = only GET or POST
  options.data = data; //main data to send in (nothing in this case)
  options.success = successFn;
  options.error = function(jqXHR, status, error){console.log(error);};

  if(altVerb) options.data._method = altVerb; //must set verb to post and altVerb to put; did give alt verb? if so take options.data and do _method and make verb (altVerb) PUT or DELETE;
  $.ajax(options); //send ajax request to server
  if(event) event.preventDefault(); //did you send a request, then call preventDefault, and if not, do default
}
