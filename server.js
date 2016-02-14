/* globals require, process, __dirname */

var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    bitcoin = require('./bitcoin')(io);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/balls.jpg', function(req, res) {
    res.sendFile(__dirname + '/balls.jpg');
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
