var app = {};// YOUR CODE HERE:
app.init = function() {};
app.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
app.send = function(message) {
  // var message = {
  //   username: prompt('What is your name?') || 'anonymous',
  //   text: $('textarea').val(),
  //   roomname: $('select').val()
  // };  
  $.ajax({
    url: app.server,
    type: 'POST',
    data: message,
    contentType: 'application/json',
    success: function(data) {
      app.send(data); 
      console.log ('chatterbox: Message sent');
    },
    // success: app.send,
    error: function(data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};
app.fetch = function(message) {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: message,
    contentType: 'application/json',
    success: function(data) {
      app.fetch(data); 
      console.log ('chatterbox: Message sent');
    },
    // success: app.send,
    error: function(data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  //clear client side message
  if ($('#chats').children().length > 0) {
    for (var i = 0; i < $('#chats').children().length; i++) {
      $('#chats').children()[i].remove();
    }
  }
};
 
$(document).ready(function() {

  $('button').on('click', function(event) {
  // add an click event on submit button
    alert('yes');
    sendMessage();
  });

  var sendMessage = function() {
  // get the text in the textarea element
  // create an element with the text
  // append the new created element to the '#chats' element
    var msg = $('textarea').val();
    var $msgDisplay = document.createElement('div');
    $msgDisplay.addClass('a');
    $msgDisplay.text = msg;
    
    $('#chats').append($('.a'));
    console.log ($msgDisplay);
  };




});