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
			SOUNDS: null,
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
				var MUL = 2;
				metronome.beat = -4 * MUL;
				metronome.beatNote = 0;
				metronome.play();
				METRONOME = setInterval(
					function() {
						metronome.play();
					}, 60000 / (metronome.display.innerText * MUL)
				);
			},
			stop: function(event) {
				clearInterval(METRONOME);
			},
			play: function() {
				var bufferSource = metronome.audioContext.createBufferSource();
				bufferSource.buffer = null;
				if (metronome.beat < 0) {
					if (metronome.beat % 2 == 0) {
						bufferSource.buffer = metronome.SOUNDS[4];
					}
				} else {
					var beatNote = metronome.beatNotes[metronome.beat];
					if (beatNote) {
						var note = beatNote.replace(/\/\*.*\*\//, '');
						if (note != 0) {
							bufferSource.buffer = metronome.SOUNDS[note*1];
						}
					} else {
						metronome.btPlay_Click({target: Utils.$('bt-play')});
					}
				}
				if (bufferSource.buffer != null) {
					bufferSource.connect(metronome.audioContext.destination);
					bufferSource.start();
				}
				metronome.beat += 1;
			},
			init: function(event) {
				metronome.beatNotes = document.getElementById('music-pre').getAttribute('data-beats').split(',');
				metronome.audioContext = new AudioContext() || new webkitAudioContext();
				metronome.SOUNDS = [];
				function onDecoded(buffer, note) {
					metronome.SOUNDS[note] = buffer;
				}
				function loadAudio(note) {
					var request = new XMLHttpRequest();
					request.open('GET', './audio/_' + note + '.wav', true);
					request.responseType = 'arraybuffer';
					request.onload = function() {
						metronome.audioContext.decodeAudioData(request.response, function(buffer) { onDecoded(buffer, note); });
					};
					request.send();
				}
				loadAudio(1);
				loadAudio(4);
				loadAudio(8);
				loadAudio(10);
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
