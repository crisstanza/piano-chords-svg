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
			audioContext: null,
			SOUNDS: null,
			TIMER: null,
			display: Utils.$('metronome-display'),
			displayCurrentBeat: Utils.$('metronome-display-current-beat'),
			btUspeedUp: Utils.$('bt-speed-up'),
			btSpeedDown: Utils.$('bt-speed-down'),
			btPlay: Utils.$('bt-play'),
			btPlay_Click: function(event) {
				var bt = event.target;
				if (bt.getAttribute('class') == 'arrow-right') {
					bt.setAttribute('class', 'arrow-right-square');
					metronome.start(event);
				} else {
					bt.setAttribute('class', 'arrow-right');
					metronome.stop(event);
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
				if (metronome.displayCurrentBeat.value == '') {
						metronome.beat = -4 * MUL;
				} else {
					var currentBeat = metronome.displayCurrentBeat.value * 1;
					if (currentBeat >= metronome.beatNotes.length) {
						metronome.beat = -4 * MUL;
					} else {
						metronome.beat = metronome.displayCurrentBeat.value * 1;
					}
				}
				metronome.play(event);
				metronome.TIMER = setInterval(
					function() {
						metronome.play(event);
					}, 60000 / (metronome.display.innerText * MUL)
				);
			},
			stop: function(event) {
				clearInterval(metronome.TIMER);
			},
			play: function(event) {
				metronome.displayCurrentBeat.value = metronome.beat;
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
						metronome.btPlay_Click(event);
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
				function loadAudio(note, uri) {
					if (!uri) {
						var uri = './audio/_' + note + '.wav';
						loadAudio(note, uri);
					} else {
						var request = new XMLHttpRequest();
						request.open('GET', uri, true);
						request.responseType = 'arraybuffer';
						request.onload = function() {
							if (request.status === 200) {
								metronome.audioContext.decodeAudioData(request.response, function(buffer) { onDecoded(buffer, note); });
							} else {
								var firstChar = uri.charAt(0);
								if (firstChar == '.') {
									loadAudio(note, 'https://raw.githubusercontent.com/crisstanza/piano-chords-svg/master/' + uri);
								} else {
									alert('Error. ' + uri);
								}
							}
						};
						request.send();
					}
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
			musicLink.addEventListener('dblclick', link_DoubleClick);
		}
		metronome.btPlay.addEventListener('click', metronome.btPlay_Click);
		metronome.btUspeedUp.addEventListener('click', metronome.btSpeedUp_Click);
		metronome.btSpeedDown.addEventListener('click', metronome.btSpeedDown_Click);
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	function link_Click(event) {
		event.preventDefault();
		var link = event.target
		if (parent) {
			parent.location.hash = link.innerText;
		}
	}

	function link_DoubleClick(event) {
		var link = event.target
		var beatNote = link.getAttribute('title');
		if (metronome) {
			if (beatNote != '') {
				metronome.beat = beatNote;
				metronome.displayCurrentBeat.value = beatNote;
			}
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
