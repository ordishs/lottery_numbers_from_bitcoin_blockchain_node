/* globals require, process, __dirname */

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    bitcoin = require('./bitcoin')(io);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

http.listen(3000, function() {
    console.log('listening on *:3000');
});
