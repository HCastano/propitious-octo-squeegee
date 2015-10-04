var socket = io();
var type_audio = new Audio('resources/AIRHORN.mp3');
var send_audio = new Audio('resources/triple.mp3')
var username="";

$(document).on("keyup", function() {
	type_audio.pause();
	type_audio.currentTime = 0;
	type_audio.play();
})

var send = function() {
	var message = $("#textbox").val();
	message = message.replace(/\n/g, '<br>');
	socket.emit("message", [message, username.toString()]);
	$("#textbox").val("");
	send_audio.pause();
	send_audio.currentTime=0;
	send_audio.play();
};

var disappear=function () {
	$("#landing").slideToggle();
	username=$("#landing input").val();
};

socket.on("message", function(message) {
	//console.log(message[1])
	$("#messages").append($("<li>").html("<span style='color:red'>" + message[1]+"</span>" +  ":<br>" + message[0]));
		var messages = document.getElementById("messages");
		messages.scrollTop = messages.scrollHeight;
	})	