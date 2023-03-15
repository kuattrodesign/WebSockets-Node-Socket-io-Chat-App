var express = require('express');
var socket = require('socket.io');

// APP setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening on port 4000');
})

// static files
app.use(express.static('public'));

// socket setup
var io = socket(server);

io.on('connection', function(socket) {
    console.log('made socket connection', socket.id);

    // when receives a chat command
    socket.on('chat', function(data) {
        // send to all logged sockets
        io.sockets.emit('serverchat', data);
    })

    socket.on('typing', function(data) {
        // send to all logged sockets except the emitter
        socket.broadcast.emit('typingserver', data);
    })
    
});