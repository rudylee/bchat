var app = require('express').createServer();
var io = require('socket.io').listen(app);
//var filter = require('filter.js');

app.listen(8080);

app.get('/',function(req,res) {
	res.sendfile(__dirname + '/index.html');
});

var usernames = {};

io.sockets.on('connection', function(socket) {
	socket.set('transports', ['xhr-polling']);

	socket.on('sendchat',function(data){
		io.sockets.emit('updatechat', socket.username, data);
	});

	socket.on('adduser', function(username) {
		socket.username = username;
		usernames[username] = username;
		socket.emit('updatechat', 'SERVER', 'you have connected');
		socket.broadcast.emit('updatechat', 'SERVER', username + ' has connect');
		io.sockets.emit('updateusers', usernames);
	});

	socket.on('disconnect', function() {
		delete usernames[socket.username];
		io.sockets.emit('updateusers', usernames);
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
	});
});	
