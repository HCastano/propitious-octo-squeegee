var socket = io();
var messages = $("#messages");

$("#send").on("click", function() {
	var message = [$("#line1").val(), $("#line2").val(), $("#line3").val()];
	socket.emit("message", message);
})

socket.on("message", function(message) {
    messages.append($("<li>").html(message[0]));
    messages.append($("<li>").html(message[1]));
    messages.append($("<li>").html(message[2]));
    var messages = document.getElementById("messages");
    messages.scrollTop = messages.scrollHeight;
})