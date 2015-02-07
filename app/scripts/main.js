var audioPlayer = document.getElementById("audioplayer"),
fader = document.getElementById("fader"),
playback = document.getElementById("playback"),
audioTrack = document.getElementById("audiotrack"),
playbackTime = document.getElementById("playbacktime"),
playButton = document.createElement("button"),
muteButton = document.createElement("button"),
playhead = document.createElement("progress")
volumeSlider = document.createElement("input");
// setText(playButton, "Play");
// setText(muteButton, "volumehigh");
setAttributes(playButton, { "type": "button", "class": "fa fa-play" });
setAttributes(muteButton, { "type": "button", "class": "fa fa-volume-up" });
// muteButton.style.display = "block";
// muteButton.style.margin = "0 auto";
setAttributes(volumeSlider, { "type": "range", "min": "0", "max": "1", "step": "any", "value": "1", "orient": "vertical", "id": "volumeSlider" });
var duration = audioTrack.duration;
setAttributes(playhead, { "min": "0", "max": "100", "value": "0", "id": "playhead" });

playback.appendChild(playButton);
playback.appendChild(playhead);
fader.appendChild(volumeSlider);
fader.appendChild(muteButton);
audioTrack.removeAttribute("controls");

// envents
playButton.addEventListener("click", player, false);
muteButton.addEventListener("click", muter, false);
volumeSlider.addEventListener("input", function(){ audioTrack.volume = volumeSlider.value; }, false);
audioTrack.addEventListener('volumechange', volumizer, true);
audioTrack.addEventListener('playing', function(){ playhead.max = audioTrack.duration; }, false);
audioTrack.addEventListener('timeupdate', updatePlayhead, false);
audioTrack.addEventListener('ended', finish, false);


function player() {
  	if (audioTrack.paused) {
		console.log('Event->Play');
		setAttributes(playButton, { "type": "button", "class": "fa fa-pause" });
		audioTrack.play();
		console.log(audiotrack.volume);
	} else {
		audioTrack.pause();	
		console.log('Event->Paused');
		setAttributes(playButton, { "type": "button", "class": "fa fa-play" });
	}
}

function setText(el,text) {
	el.innerHTML = text;
}

function finish() {
	audioTrack.currentTime = 0;
	//setText(playButton,"Play");
}

function updatePlayhead() { 
	playhead.value = audioTrack.currentTime;
	var s = parseInt(audioTrack.currentTime % 60);
    var m = parseInt((audioTrack.currentTime / 60) % 60);
    s = (s >= 10) ? s : "0" + s;
    m = (m >= 10) ? m : "0" + m;
    playbacktime.innerHTML = m + ':' + s ;
    
}

function volumizer() {
	console.log(audioTrack.volume);
	
	if (audioTrack.volume == 0) { 
		setAttributes(muteButton, { "type": "button", "class": "fa fa-volume-off" });
		//setText(muteButton,"volume"); 
	}
	if (audioTrack.volume > 0.00 && audioTrack.volume < 0.5) { 
		setAttributes(muteButton, { "type": "button", "class": "fa fa-volume-down" });
		//setText(muteButton,"volume"); 
	}
	if (audioTrack.volume > 0.5 && audioTrack.volume < 1) { 
		setAttributes(muteButton, { "type": "button", "class": "fa fa-volume-up" });
		//setText(muteButton,"volume"); 
	}
	else { 

		//console.log('le volume est alumé');
		//setText(muteButton,"volumehigh"); 
	}
}

function muter() {
	if (audioTrack.volume == 0) {
		audioTrack.volume = restoreValue;
		volumeSlider.value = restoreValue;
	} else {
		audioTrack.volume = 0;
		restoreValue = volumeSlider.value;
		volumeSlider.value = 0;
	}
}

function setAttributes(el, attrs) {
	for(var key in attrs){
		el.setAttribute(key, attrs[key]);
	}
}

