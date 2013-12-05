$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  $('form#priority').on('submit', submitPriority);
  $('form#todo').on('submit', submitTodo);
  $('table#todos').on('click', 'input[type="checkbox"]', clickCompleted);
  $('table#todos').on('click', '.delete > button', clickDelete); //dynamic, so much anchor to something that exists on pg; want click event to happen on button itself
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //


function submitPriority(e){ //gets called when in priorty form and click submit button; stops default
  submitAjaxForm(e, this, function(data, status, jqXHR){ //passing event and creating a fn for callback; this is the priority form
    htmlAddPriorityToSelect(data); //know data is a priority object (sub priority) (wrote it on server)
  });
}

function submitTodo(e){
  submitAjaxForm(e, this, function(data, status, jqXHR){ //passing event and creating a fn for callback; this is the todo form; status is status of response (success or error which triggers the call of the success or fail fns)
    console.log(data);
    htmlAddTodo(data);//node sends back the data with the priority; data is todo
  });
}

function clickCompleted(){
  var id = $(this).parent().parent().data('todo-id');
  sendGenericAjaxRequest('/todos/' + id + '/completed', {}, 'post', 'put', null, function(data, status, jqXHR){
   //browser sending server a msg which it tries to match in server app.js: url, blank object, verb, altVerb, event if preventing default action from happening, fn to call
    htmlTodoCompleted(data);
  });
}

function clickDelete(){
  var id = $(this).parent().parent().data('todo-id'); //which ID do you want to delete? this is btn clicked on; .data attribute for todo-id? (.data is a jquery fn)
  sendGenericAjaxRequest('/todos/' + id, {}, 'post', 'delete', null, function(data, status, jqXHR){ //1) url ot send and delete 2){} blank object to send to body (don't want to put anything in there) 3) post = verb to send  4)verb overriding w/ 5) null=event (in case want to prevent default action from happening); default action of button by self is nothing - it won't be a true until make a "submit" button
    htmlRemoveTodo(data); //when this executes, it means node has responded -the success fn
  }
  });
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function submitAjaxForm(e, form, successFn){//1)event 2)the form you want to post to ajax 3)fn to call when node give response
  var url = $(form).attr('action'); //form you want to go to
  var data = $(form).serialize(); //put all data together in 1 pkg

  var options = {};
  options.url = url;
  options.type = 'POST'; //this type can only be a GET/POST (override elsewhere)
  options.data = data; //the body of your request (data from line 50 that you serialized)
  options.success = successFn; //name of fn to call when server gives back response; will call htmlAddPriorityToSelect
  options.error = function(jqXHR, status, error){console.log(error);};

  $.ajax(options); //send off response to server
  e.preventDefault(); //to stop event, you have to pass it in; prevents default action to send ajax request; form also sends a request so will have 2 requests (bad)
}

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

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function htmlAddPriorityToSelect(priority){ //changing dom; called data above - object just rcv from server
  var $option = $('<option>');
  $option.val(priority._id);
  $option.text(priority.name);

  $('select#priority-select').append($option);
  $('form#priority input').val('');
  $('form#priority input[name="name"]').focus();
}

function htmlAddTodo(todo){//dynamically adds row to table
  var tr = '<tr><td class="completed"></td><td class="title"></td><td class="due-date"></td><td class="priority"></td><td class="delete"></td></tr>';
  var $tr = $(tr);
  $tr.css('background-color', todo.priority.color);
  $tr.attr('data-todo-id', todo._id); //EXPLAIN AGAIN?
  $tr.children('.completed').append('<input type="checkbox">');
  $tr.children('.title').text(todo.title);
  $tr.children('.due-date').text(moment(todo.dueDate).format('dddd, MMMM Do YYYY'));
  $tr.children('.priority').text(todo.priority.name); //from the todo model and the create method
  $tr.children('.delete').append('<button class="tiny radius alert">Delete</button>');
  // $tr.children('.delete').append($form).attr('data-to-do', 'todo-id');

  $('table#todos tbody').append($tr);

  $('form#todo input').val('');
  $('form#todo input[name="name]').focus();

  //dynamically adds row to table
  // var $form = $('<form>');
  // $form = $form.attr('action', '/todos/#{todo.id}').attr('method', 'post');
  // var $input = $('<input>');
  // $input = $input.attr('type', 'hidden').attr('name', '_method').attr('value', 'delete');
  // var $button = $('<button>');
  // $button = $button.attr('type', 'submit').addClass('tiny alert radius').text('Delete');
  // $form.append($input).append($button);
}

function htmlRemoveTodo(todo){
  $('tr[data-todo-id="' + todo._id + '"]').remove();
}

function htmlTodoCompleted(todo){
  var decoration = todo.completed ? 'line-through' : 'none';
  $('tr[data-todo-id="' + todo._id + '"]').css('text-decoration', decoration);
}

// ======OLD FN FOR REFERENCE======
// function submitPriority(e){ //can call it e or event (e is the event)
//   // console.log(e);
//   // alert('you just submitted the form');

//   var url = $(this).attr('action'); //getting the form attribute just clicked submit
//   // console.log(url);
//   var data = $(this).serialize();
//   console.log(data);

//   var options = {};
//   //building ajax request below to send msg to node; must be those property words
//   options.url = url;
//   options.type = 'POST';
//   options.data = data;
//   options.success = function(data, status, jqXHR){
//     console.log('success');
//     console.log(data);
//     htmlAddPriorityToSelect(data);
//   }; //if data response good
//   options.error = function(jqXHR, status, error){
//     console.log('error');
//   }; //if data response bad

//   $.ajax(options); //send option thru ajax to send to node

//   event.preventDefault();
// }
