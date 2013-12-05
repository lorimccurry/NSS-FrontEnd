$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  $('#authentication-button').on('click', clickAuthenticationButton);
  $('#register').on('click', clickRegister);
  $('#login').on('click', clickLogin);
  $('#users input[type="checkbox"]').on('click', clickChangeAdmin);
  $('form#todo').on('submit', submitTodo);
  $('table#todos').on('click', 'input[type="checkbox"]', clickChangeIsComplete); //when click checkbox under table to notify that change is complete
}

//-------------------------------------------------------------------//
function clickAuthenticationButton(e){
  var isAnonymous = $('#authentication-button[data-email="anonymous"]').length === 1;

  if(isAnonymous){
    $('form#authentication').toggleClass('hidden');
    $('input[name="email"]').focus();
  } else {
    var url = '/logout';
    sendAjaxRequest(url, {}, 'post', 'delete', null, function(data){ //not sending any data across the pipe b/c it's in the body
      htmlLogout(data);
    });
  }
  e.preventDefault(); //keeps from going to button hyperlink (the default)
}

function clickLogin(e){
  var url = '/login';
  var data = $('form#authentication').serialize();
  sendAjaxRequest(url, data, 'post', 'put', e, function(data){ //e means prevent default
    console.log(data);
    htmlUpdateLoginStatus(data);
  });
}

function clickRegister(e){
  var url = '/users';
  var data = $('form#authentication').serialize();
  sendAjaxRequest(url, data, 'post', null, e, function(data){ //e means prevent default
    console.log(data);
    htmlRegisterStatus(data);
  });
}

function clickChangeAdmin(){
  var url = $(this).parent().next().find('form').attr('action');
  sendAjaxRequest(url, {}, 'post', 'put', null, function(data){
    console.log(data);
  });
}


function submitTodo(e){
  var url = $(this).attr('action'); //asks for action
  var data = $(this).serialize(); //gets 3 pieces of data in form
  sendAjaxRequest(url, data, 'post', null, e, function(data){ //e keeps from doing default action
    htmlAddTodo(data); //what server sends back
  });
}

function clickChangeIsComplete(){
  var id = $(this).parent().parent().data('id'); //td - tr - table id
  var url = '/todos/' + id;
  sendAjaxRequest(url, {}, 'post', 'put', null, function(data){
    console.log(data);
  });
}

//-------------------------------------------------------------------//

function htmlUpdateLoginStatus(result){
  $('input[name="email"]').val('');
  $('input[name="password"]').val('');

  if(result.status === 'ok'){
    $('form#authentication').toggleClass('hidden');
    $('#authentication-button').attr('data-email', result.email);
    $('#authentication-button').text(result.email);
    $('#authentication-button').addClass('alert');
    $('#the-application').removeClass('hidden');
    window.location.href = '/';
  }
}

function htmlRegisterStatus(result){
  $('input[name="email"]').val('');
  $('input[name="password"]').val('');

  if(result.status === 'error'){
    alert('problem with user name or password')
  } else if(result.status === 'ok'){
    $('form#authentication').toggleClass('hidden');
  }
}

function htmlLogout(result){
  $('#authentication-button').attr('data-email', 'anonymous');
  $('#authentication-button').text('Login | Sign Up');
  $('#authentication-button').removeClass('alert');
  $('#the-application').addClass('hidden');
  window.location.href = '/';
}

function htmlAddTodo(todo){
  var tr = '<tr data-id="' + todo._id + '"><td><input type="checkbox"></td><td>' + todo.title + '</td><td>' + todo.category + '</td><td>' + todo.dueDate + '</td></tr>';
  $('table#todos').append(tr);
}

//-------------------------------------------------------------------//

function initializeSocketIO(){
  var port = location.port ? location.port : '80';
  var url = location.protocol + '//' + location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}

