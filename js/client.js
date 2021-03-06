
var Client = {};

Client.socket = io.connect();

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.socket.on('newplayer',function(data){
    game.addNewPlayer(data.id,data.x,data.y);
});

Client.socket.on('allplayers',function(data){
    console.log(data);
    for(var i = 0; i < data.length; i++){
        game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }
});

Client.socket.on('remove',function(id){
    game.removePlayer(id);
});

Client.sendKey = function(x,y, d){
  Client.socket.emit('key',{x:x,y:y, d:d});
};

Client.socket.on('move',function(data){
    game.movePlayer(data.id,data.x,data.y,data.d);
});

Client.sendChat = function(text){
  Client.socket.emit('chat',text);
}

Client.socket.on('newChat', function(data){
  game.updateBubble(data.id, data.text);
})

Client.socket.on('garden', function(data){
  game.openGarden(data.id);
})

Client.socket.on('me', function(data){
  game.setMe(data.id);
})

Client.getMe = function(){
  Client.socket.emit('getID')
}