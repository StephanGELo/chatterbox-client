var app = {};// YOUR CODE HERE:
app.init = function() {
  $(document).ready(function() {
    app.fetch();
    app.handleSubmit();
    app.handleSelectRoom();
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
      app.fetch(); 
      console.log ('sendout data: ', data);
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
      $('.chat').remove();
      console.log ('getback data: ', data);
      app.renderMessage(data);
      console.log ('chatterbox: Message received');
    },
    
    error: function(data) {
      console.error('chatterbox: Failed to retrieve message', data);
    }
  });
};

app.roomList = {};

app.fetchRoom = function() {
  $.ajax({
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: {'order': '-createdAt'},
    dataType: 'json',
    success: function(data) {
      $('.chat').remove();
      console.log ('getback data: ', data);
      var filteredData = {};
      filteredData.results = data.results.filter(function(message) {
        return message.roomname === $(':selected').val();
      });
      app.renderMessage(filteredData);
      app.renderRoomlist(app.roomList);
      console.log ('chatterbox: Message received');
    },
    error: function(data) {
      console.error('chatterbox: Failed to retrieve message', data);
    }
  });
};

app.clearMessages = function() {
  if ($('#chats').children().length > 0) {
    for (var i = 0; i < $('#chats').children().length; i++) {
      $('#chats').children()[i].remove();
    }
  }
};

app.renderMessage = function (message) {
  var messageList = message.results;
  for (var i = messageList.length - 1; i > 0; i--) {
    
    var username = messageList[i].username;
    var time = messageList[i].createdAt;
    
    if (app.roomList[messageList[i].roomname] === undefined) {
      app.roomList[messageList[i].roomname] = messageList[i].roomname;
    }
    
    var $chat = $('<div class ="chat"></div>');
    $('#chats').prepend($chat);
    $chat.append($('<p class=' + username + '"time">' + time + '</p>'));
    var $user = $('<a class=' + username + '>' + username + '</a>');
    // if (messageList[i].friendList !== undefined && messageList[i].friendList.length > 0) {
    //   var friends = messageList[i].friendList;
    //   console.log (friends);
    //   if (friends.includes($user.attr('class'))) {
    //     $user.addClass('isFriend');
    //   }
    // }
    $chat.append($user);
    var text = messageList[i].text;
    if (text) {
      if (text.includes('<script>')) {
        text = 'jerk';
      }
      $chat.append($('<p class=' + username + ' id="message">' + text + '</p>'));
    } 
  }

  app.handleUsernameClick();
  app.renderRoomlist(app.roomList);
};



app.renderRoomlist = function (roomList) {
  $('option').remove();
  for (var key in roomList) {
    $('.rooms').append($('<option value=' + roomList[key] + '>' + roomList[key] + '</option>'));
  }
};

app.handleSelectRoom = function () {
  $('select').on('change', function () {
    app.fetchRoom();
  });
};

app.handleUsernameClick = function () {
  
  $('a').on('click', function () {
    var className = $(this).attr('class');
    alert(`${className} is your friend now!`);
    $(this).css({'font-weight': 'bold', 'color': 'red'});
    // var message = {
    //   username: window.location.search.slice(10),
    //   // text: $('textarea').val(),
    //   roomname: $(':selected').val(),
    //   friendList: 'test'
    // };
    // app.send(JSON.stringify(message));
  });
};

app.handleSubmit = function () {
  $('#send.submit').on('click', function () {
    var message = {
      username: window.location.search.slice(10),
      text: $('textarea').val(),
      roomname: $(':selected').val()
    };
    app.send(JSON.stringify(message));
  });
};

app.init();
