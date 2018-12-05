(function() {

	var parent, musicPre, musicLinks;
	var metronome;

// // // // // // // // // // // // // // // // // // // // // // // // //

	function initGlobals(event) {
		parent = window.opener ? window.opener.parent : null;
		musicPre = Utils.$('music-pre');
		musicLinks = musicPre.querySelectorAll('a');
		metronome = {
			beat: null,
			beatNotes: null,
			beatNote: null,
			audioContext: null,
			SOUND_1: null,
			SOUND_4: null,
			display: Utils.$('metronome-display'),
			btUspeedUp: Utils.$('bt-speed-up'),
			btSpeedDown: Utils.$('bt-speed-down'),
			btPlay: Utils.$('bt-play'),
			btPlay_Click: function(event) {
				var bt = event.target;
				if (bt.getAttribute('class') == 'arrow-right') {
					bt.setAttribute('class', 'arrow-right-square');
					metronome.start();
				} else {
					bt.setAttribute('class', 'arrow-right');
					metronome.stop();
				}
			},
			btSpeedUp_Click: function(event) {
				metronome.display.innerText++;
			},
			btSpeedDown_Click: function(event) {
				metronome.display.innerText--;
			},
			start: function(event) {
				metronome.beat = -4;
				metronome.beatNote = 0;
				metronome.play();
				METRONOME = setInterval(
					function() {
						metronome.play();
					}, 60000 / (metronome.display.innerText*1)
				);
			},
			stop: function(event) {
				clearInterval(METRONOME);
			},
			play: function() {
				var bufferSource = metronome.audioContext.createBufferSource();
				bufferSource.buffer = null;
				if (metronome.beat < 0) {
					bufferSource.buffer = metronome.SOUND_4;
					metronome.beat += 1;
				} else {
					// var noteNode = metronome.beatNotes[metronome.beatNote];
					// var note = noteNode.innerText;
					if (metronome.beat % 2 == 0) {
						bufferSource.buffer = metronome.SOUND_1;
					} else {
						bufferSource.buffer = metronome.SOUND_4;
					}
					// metronome.beatNote++;
					metronome.beat += 1;
				}
				if (bufferSource.buffer != null) {
					bufferSource.connect(metronome.audioContext.destination);
					bufferSource.start();
				}
			},
			init: function(event) {
				metronome.beatNotes = document.getElementById('music-pre').querySelectorAll('a');
				metronome.audioContext = new AudioContext() || new webkitAudioContext();
				function onDecoded_1(buffer) {
					metronome.SOUND_1 = buffer;
				}
				function onDecoded_4(buffer) {
					metronome.SOUND_4 = buffer;
				}
				var request_1 = new XMLHttpRequest();
				request_1.open('GET', './audio/_1.wav', true);
				request_1.responseType = 'arraybuffer';
				request_1.onload = function() {
					metronome.audioContext.decodeAudioData(request_1.response, onDecoded_1);
				};
				request_1.send();
				var request_4 = new XMLHttpRequest();
				request_4.open('GET', './audio/_4.wav', true);
				request_4.responseType = 'arraybuffer';
				request_4.onload = function() {
					metronome.audioContext.decodeAudioData(request_4.response, onDecoded_4);
				};
				request_4.send();
			}
		};
		metronome.init(event);
	}

	function initLinks(event) {
		for (var i = 0 ; i < musicLinks.length ; i++) {
			var musicLink = musicLinks[i];
			musicLink.addEventListener('click', link_Click);
		}
		metronome.btPlay.addEventListener('click', metronome.btPlay_Click);
		metronome.btUspeedUp.addEventListener('click', metronome.btSpeedUp_Click);
		metronome.btSpeedDown.addEventListener('click', metronome.btSpeedDown_Click);
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	function link_Click(event) {
		var link = event.target
		if (parent) {
			parent.location.hash = link.innerText;
		}
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	function window_Load(event) {
		initGlobals(event);
		initLinks(event);
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	window.addEventListener('load', window_Load);

})();