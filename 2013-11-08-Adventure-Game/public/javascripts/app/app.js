$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('form#form').on('submit', clickSubmitForm);
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //


function clickSubmitForm(e){
  var url = $(this).attr('action');
  var data = $(this).serialize();
  url = url + '/?' + data;

  sendGenericAjaxRequest(url, {}, 'post', null, e, function(data, status, jqXHR){
    // console.log(data);
    htmlCreateBoard(data);
  });
}
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
function htmlCreateBoard(game){
  // debugger;

  // console.log(game);
  var boardSize = Math.pow(game.size, 2);
  $('#gameBoard').attr('data-game-id', game._id);

  $.each(game.board, function(index, square){
    var $square = $('<div class="square"></div>');
    $square.attr('data-square-position', index);
    $square.css('height', 100/game.size + '%');
    $square.css('width', 100/game.size + '%');
    if(square.type === 'player'){
      $square.addClass('player');
      // console.log($('.square[data-square-position="' + index + '"]'));
      // console.log(game.board[index]);
    } else {
      console.log('this didnt work');
    }
    //debugger;
    $('#gameBoard').append($square);

  });

  // $('.square').


  // if(square.type === 'player'){
  //     $square.addClass('player');
    // }
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function sendGenericAjaxRequest(url, data, verb, altVerb, event, successFn){ //1) url 2)data sent a)url (path) b)query string (also a part of url) c)body
  var options = {};
  options.url = url;
  options.type = verb; //main verb = only GET or POST
  options.data = data; //main data to send in (nothing in this case)
  // console.log(options.data);

  options.success = successFn;
  options.error = function(jqXHR, status, error){console.log(error);};

  if(altVerb) options.data._method = altVerb; //must set verb to post and altVerb to put; did give alt verb? if so take options.data and do _method and make verb (altVerb) PUT or DELETE;
  $.ajax(options); //send ajax request to server
  if(event) event.preventDefault(); //did you send a request, then call preventDefault, and if not, do default
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
