var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use("/css", express.static(__dirname+"/css"));
app.use ("/js", express.static(__dirname+"/js"));
app.use ("/resources", express.static(__dirname+"/resources"));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
})

server.listen("3000", function() {
	console.log("kk");
});

io.on("connection", function(socket) {
	socket.on("message", function(message) {
		socket.broadcast.emit("message", message);
	});
});