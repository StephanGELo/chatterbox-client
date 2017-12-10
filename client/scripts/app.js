var app = {};// YOUR CODE HERE:
app.init = function() {
  $(document).ready(function() {
    app.fetch();
    app.handleSubmit();
  });

};
app.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
app.send = function(message) {
   
  $.ajax({
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: message,
    contentType: 'application/json',
    success: function(data) {
      app.fetch(data); 
      console.log (data);
      console.log ('chatterbox: Message sent');
    },

    error: function(data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};
app.fetch = function() {
  $.ajax({
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: {'order': '-createdAt'},
    dataType: 'json',
    success: function(data) {
      console.log (data);
      app.renderMessage(data); 
      console.log ('chatterbox: Message received');
    },
    
    error: function(data) {
      console.error('chatterbox: Failed to retrieve message', data);
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
  var messageList = message.results;
  var roomList = {};
  // console.log (messageList);
  for (var i = messageList.length - 1; i > 0; i--) {
    var text = messageList[i].text;
    var username = messageList[i].username;
    var time = messageList[i].createdAt;
    if (roomList[messageList[i].roomname] === undefined) {
      roomList[messageList[i].roomname] = messageList[i].roomname;
    }
    $('#chats').prepend($('<div class ="chat"></div>'));
    $('.chat').append($('<p class=' + username + '"time">' + time + '</p>'));
    $('.chat').append($('<a class=' + username + '>' + username + '</a>'));
    $('.chat').append($('<p class=' + username + ' id="message">' + text + '</p>'));
  }
  app.handleUsernameClick();
  app.renderRoom(roomList);
};

app.renderRoom = function (roomList) {
  for (var key in roomList) {
    $('.rooms').append($('<option value=' + roomList[key] + '>' + roomList[key] + '</option>'));
  }
};

app.handleUsernameClick = function () {
  $('a').on('click', function () {
    alert('Event trigger');
    //need to figure out manipulate data fetch from server
    // create a friendlist for every user
    // add a friend to current user's friendlist
    // show it on page
  });
};

app.handleSubmit = function () {
  $('#send.submit').on('click', function () {
    var message = {
      username: window.location.search.slice(10),
      text: $('textarea').val(),
      roomname: $(':selected').val()
    };
    console.log(message);
    app.send(JSON.stringify(message));
  });
};

app.init();
