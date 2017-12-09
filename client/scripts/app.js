var app = {};// YOUR CODE HERE:
app.init = function() {
  app.handleUsernameClick();
  app.handleSubmit();


};
app.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
app.send = function(message) {
   
  $.ajax({
    url: app.server,
    type: 'POST',
    data: message,
    contentType: 'application/json',
    success: function(data) {
      app.fetch(); 
      console.log ('chatterbox: Message sent');
    },

    error: function(data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};
app.fetch = function() {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: message,
    contentType: 'application/json',
    success: function(data) {
      app.renderMessage(data); 
      console.log ('chatterbox: Message sent');
    },
    
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

app.renderMessage = function (message) {
  $('#chats').append($('<div class="chat"></div>'));
  $('#chats .chat').append($('<p class="username">message.username</p>'));
  $('#chats .chat').append($('<p id="message">message.text</p>'));
};

app.renderRoom = function (roomName) {
  $('#roomSelect').append($('<div class=roomName></div>'));

};

app.handleUsernameClick = function () {
  $('.username').on('click', function () {
  });
};

app.handleSubmit = function () {
  $('#send .submit').on('click', function () {
    app.send($('textarea').val());
  });
};
