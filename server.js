var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
})

server.listen("3000", function() {
	console.log("kk");
});

io.on("connection", function(socket) {
	socket.on("message", function(message) {
		console.log(message[0], message[1], message[2]);
		io.sockets.emit("message", message);
	});
});