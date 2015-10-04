//var count = require("js/count.js")

var socket = io();
var type_audio = new Audio('resources/AIRHORN.mp3');
var send_audio = new Audio('resources/triple.mp3')
var username="";

//!//usr/bin/env python

// Count syllables in a word.
// 
// Doesn't use any fancy knowledge, just a few super simple rules:
// a vowel starts each syllable;
// a doubled vowel doesn't add an extra syllable;
// two or more different vowels together are a diphthong,
// and probably don't start a new syllable but might;
// y is considered a vowel when it follows a consonant.
// 
// Even with these simple rules, it gets results far better
// than python-hyphenate with the libreoffice hyphenation dictionary.
// 
// Copyright 2013 by Akkana Peck http://shallowsky.com.
// Share and enjoy under the terms of the GPLv2 or later.


var verbose = false;

var count_syllables = function(word){
	var vowels = ['a', 'e', 'i', 'o', 'u'];

	var on_vowel = false;
	var in_diphthong = false;
	var minsyl = 0;
	var maxsyl = 0;
	var lastchar = null;
	var numVowel = 0 ;

	word = word.toLowerCase().trim();
	for (var i in word){
		var c = word[i];
		var is_vowel = false;
		for(var vowel in vowels){
			is_vowel = is_vowel || vowels[vowel] == c;
		}

		if (on_vowel == null){
			on_vowel = is_vowel;
		}

        // y is a special case
        if (c == 'y'){
        	is_vowel = ! on_vowel;
        }

        if (is_vowel){
        	numVowel++;
        	if (verbose) {
        		console.log (c + " is a vowel");
        	}
        	if (!on_vowel){
                // # We weren't on a vowel before.
                // # Seeing a new vowel bumps the syllable count.
                if (verbose){
                	console.log("new syllable")
                }
                minsyl ++;
                maxsyl ++;
            }else if( on_vowel && ! in_diphthong && c != lastchar){
                // # We were already in a vowel.
                // # Don't increment anything except the max count,
                // # and only do that once per diphthong.
                if (verbose){ 
                	console.log(c + " is a diphthong");
                }
                in_diphthong = true;
                maxsyl ++;
            }
        }else if(verbose){
        	console.log ("[consonant]");
        }
        on_vowel = is_vowel;
        lastchar = c;
    }

    // # Some special cases:
    if (word[word.length-1] == 'e'){
        if (numVowel !=1){ //#account for short words that end with 'e'
        	var is_vowel = false;
        for(var vowel in vowels){
        	is_vowel = is_vowel || vowels[vowel] == word[word.length-2];
        }
        if(numVowel == 2 && is_vowel){
        	minsyl ++;
        }
        minsyl --;
    }
}
    // # if it ended with a consonant followed by y, count that as a syllable.
    if (word[word.length-1] == 'y' && ! on_vowel){
    	maxsyl ++;
    }

    return minsyl;
}

var haikuSylCount = function(inputLine){
	var splitLines = inputLine.split('\n'); 
	var sylCount = [0,0,0]; 

	for (var i in splitLines){
		var line = (splitLines[i]); 
		var words = line.split(" "); 

		for (var j in words){
			sylCount[i]+=count_syllables(words[j]); 
		}
	}
	return sylCount; 
}

$(document).on("keyup", function() {
	type_audio.pause();
	type_audio.currentTime = 0;
	type_audio.play();
})

var send = function() {
	var message = $("#textbox").val();
	var syl = haikuSylCount(message);
	console.log(syl);
	if (syl.length === 3 && syl[0] === 5 && syl[1] === 7 && syl[2] === 5) {
		message = message.replace(/\n/g, '<br>');
		socket.emit("message", [message, username.toString()]);
		$("#textbox").val("");
	} else {
		socket.emit("message", ["I am so stupid<br>I cannot write a haiku<br>El Pee gods help me", username]);
	}
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