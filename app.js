var app = require('express').createServer();
var io = require('socket.io').listen(app);
var filter = require('filter');

app.listen(9000);

app.get('/',function(req,res) {
	res.sendfile(__dirname + '/index.html');
});
app.get('/*.(js|css)', function(req, res){
  res.sendfile(__dirname + req.url);
});

var usernames = {};

io.sockets.on('connection', function(socket) {
	socket.set('transports', ['xhr-polling']);

	socket.on('sendchat',function(data){
		io.sockets.emit('updatechat', socket.username, data);
	});

	socket.on('adduser', function(username) {
		if(filter.validUsername(username)) {
			socket.username = username;
			usernames[username] = username;
			socket.emit('updatechat', 'SERVER', 'you have connected');
			socket.broadcast.emit('updatechat', 'SERVER', username + ' has connect');
			io.sockets.emit('updateusers', usernames);
		} else {
			socket.emit('warning', 'SERVER', 'Please enter another nickname');
		}
	});
	
	socket.on('change_username', function(new_username) {
		old_username = socket.username;
		socket.username = new_username;
		delete usernames[old_username];
		usernames[new_username] = new_username;
		io.sockets.emit('updateusers', usernames);
	});

	socket.on('disconnect', function() {
		delete usernames[socket.username];
		io.sockets.emit('updateusers', usernames);
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
	});
});