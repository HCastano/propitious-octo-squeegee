var socket = io();

var send = function() {
			var message = $("#textbox").val();
			message = message.replace(/\n/g, '<br>');
			socket.emit("message", message);
			$("#textbox").val("");
};

socket.on("message", function(message) {
    $("#messages").append($("<li>").html(message));
    var messages = document.getElementById("messages");
    messages.scrollTop = messages.scrollHeight;
})	