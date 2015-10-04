var socket = io();
var type_audio = new Audio('resources/AIRHORN.mp3');
var send_audio = new Audio('resources/triple.mp3')
$(document).on("keyup", function() {
	type_audio.pause();
	type_audio.currentTime = 0;
	type_audio.play();
})

var send = function() {
			var message = $("#textbox").val();
			message = message.replace(/\n/g, '<br>');
			socket.emit("message", message);
			$("#textbox").val("");
			send_audio.pause();
			send_audio.currentTime=0;
			send_audio.play();
};

socket.on("message", function(message) {
    $("#messages").append($("<li>").html(message));
    var messages = document.getElementById("messages");
    messages.scrollTop = messages.scrollHeight;
})	