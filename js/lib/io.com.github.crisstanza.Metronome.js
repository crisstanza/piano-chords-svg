"use strict";

if (!io) { var io = {}; }
if (!io.com) { io.com = {}; }
if (!io.com.github) { io.com.github = {}; }
if (!io.com.github.crisstanza) { io.com.github = {}; }

(function() {

	io.com.github.Metronome = function(speed, btLess, btMore, btStart, btStop, btPause, beats) {
		this.speed = speed;
		this.btLess = btLess;
		this.btMore = btMore;
		this.btStart = btStart;
		this.btStop = btStop;
		this.btPause = btPause;
		this.beats = beats;
		this.beatNotes;
		this.canPlay = 0;
		this.music = null;
		this.ibc = null; // intro beat counter
		this.bc = 1; // beat counter
		this.c = 0; // music counter
		this.vc = 1; // visual counter (sound)
		this.vc2 = 1; // visual counter (notes)
		this.play = function(_sound) {
			if (this.canPlay == 1) {
				{
					if (this.ibc < 0) {
						// console.log('ibc: ' + this.ibc, 'bc: ' + this.bc, 'c: ' + this.c, 'vc: ' + this.vc);
					} else {
						// console.log('bc: ' + this.bc, 'c: ' + this.c, 'vc: ' + this.vc);
					}
				}
				let _this = this;
				if (this.ibc < 0) {
					let sound = _sound ? _sound : 5;
					this.beats.innerHTML = this.ibc;
					io.com.github.Metronome.PLAY(sound);
					this.ibc++;
					let speed = this.speed.innerHTML;
					setTimeout( function() { _this.play(); }, 60000 / speed );
				} else {
					if (this.bc % (this.music.subdivisions + 1) == 1) {
						this.showBeat();
						this.vc++;
						this.vc2++;
					}
					let sound = this.music.beats[this.c];
					io.com.github.Metronome.PLAY(sound);
					this.c++;
					this.bc++;
					if (this.c < this.music.beats.length) {
						if (this.checkChanges(sound)) {
							this.play(io.com.github.Metronome.SOUNDS[this.c]);
						} else {
							let speed = this.speed.innerHTML * (this.music.subdivisions + 1);
							setTimeout( function() { _this.play(io.com.github.Metronome.SOUNDS[_this.c]); }, 60000 / speed );
						}
						this.showBeatNote()
					} else {
						this.showBeatNote()
						this.endOfTheBeats();
					}
				}
			}
		};
		this.beatNotes = Autos.initLinksFrom(musicPre, this);
		if (!this.beatNotes || this.beatNotes.length == 0) {
			io.com.github.Metronome.prototype.showBeatNote = function() {};
		}
	};

	io.com.github.Metronome.AUDIO_CONTEXT = null;
	io.com.github.Metronome.SOUNDS = [];
	io.com.github.Metronome.SOUND_NAMES = [
		null, // 0
		'_bumbo.wav', // 1
		'_caixa_aro.wav', // 2
		'_caixa_esteira.wav', // 3
		'_caixa.wav', // 4
		'_chipo.wav', // 5
		'_cowbell.wav', // 6
		'_prato_longo.wav', // 7
		'_prato.wav', // 8
		'_ton.wav' // 9
	];
	io.com.github.Metronome.SOUNDS_LENGTH = io.com.github.Metronome.SOUND_NAMES.length - 1;
	
	io.com.github.Metronome.PLAY_SOUND = function(sound) {
		if (sound > 0) {
			let bufferSource = io.com.github.Metronome.AUDIO_CONTEXT.createBufferSource();
			bufferSource.buffer = io.com.github.Metronome.SOUNDS[sound].buffer;
			bufferSource.connect(io.com.github.Metronome.AUDIO_CONTEXT.destination);
			bufferSource.start(/* 0 */);
		}
	};
	io.com.github.Metronome.PLAY = function(obj) {
		if (typeof obj == 'number') {
			io.com.github.Metronome.PLAY_SOUND(obj);
		} else {
			let length = obj.length;
			for (let i = 0 ; i <= length ; i++) {
				io.com.github.Metronome.PLAY_SOUND(obj[i]);
			}
		}
	};

	io.com.github.Metronome.prototype.checkChanges = function(obj) {
		if (typeof obj == 'object' && !Array.isArray(obj)) {
			if (obj.bpm) {
				this.music.bpm = obj.bpm;
				speed.innerHTML = this.music.bpm;
			}
			if (obj.meter) {
				this.music.meter = obj.meter;
				this.beats.innerHTML = 1
				this.bc += this.music.subdivisions;
				this.vc -= 1;
				this.vc2 = 1;
				meter.innerHTML = this.music.meter;
			}
			return true;
		} else {
			return false;
		}
	};

	io.com.github.Metronome.prototype._OnClickFrom = function(event, i) {
		let link = event.target;
		this.clearCurrentBeatNote();
		this.btStop.setAttribute('class', '');
		this.ibc = 0;
		link.setAttribute('class', 'current-beat-note');
		this.vc = i + 1;
		this.vc2 = this.vc;
		let mul = this.music.subdivisions + 1; /*r4 */
		this.bc = this.vc * mul - 1; /* r2 */
		this.c = this.vc * mul - 2; /* r3 */
		this.showBeat();
		{
			// console.log('bc: ' + this.bc, 'c: ' + this.c, 'vc: ' + this.vc, 'event: ' + event);
		}
	};

	io.com.github.Metronome.prototype._OnKeyUp = function(event) {
		let keyCode = event.keyCode;
		let charKeyCode = String.fromCharCode(keyCode).toLowerCase();
		if (charKeyCode == 's') {
			this.btStart_OnClick(event);
		} else  if (charKeyCode == 't') {
			this.btStop_OnClick(event);
		}
		if (charKeyCode == 'p') {
			this.btPause_OnClick(event);
		}
	}
	io.com.github.Metronome.prototype.btLess_OnClick = function(event) {
		this.speed.innerHTML--;
	};

	io.com.github.Metronome.prototype.btMore_OnClick = function(event) {
		this.speed.innerHTML++;
	};

	io.com.github.Metronome.prototype.btStart_OnClick = function(event) {
		if (io.com.github.Metronome.AUDIO_CONTEXT == null) {
			initBuffers(event, this);
		} else {
			this.canPlay = 1;
			this.btStart.setAttribute('class', 'off');
			this.btStop.setAttribute('class', '');
			this.btPause.setAttribute('class', '');
			if (io.com.github.Metronome.SOUNDS.length == 10) {
				if (this.ibc == null) {
					this.ibc = - this.music.meter * this.music.intro;
				}
				this.play();
			}
		}
	};

	io.com.github.Metronome.prototype.btStop_OnClick = function(event) {
		this.beats.innerHTML = '?';
		this.clearCurrentBeatNote(event);
		this.endOfTheBeats(event);
	};

	io.com.github.Metronome.prototype.clearCurrentBeatNote = function(event) {
		let currentBeatNote = musicPre.querySelector('a[class=current-beat-note]');
		if (currentBeatNote) {
			currentBeatNote.removeAttribute('class');
		}
	};

	io.com.github.Metronome.prototype.endOfTheBeats = function(event) {
		this.btStop.setAttribute('class', 'off');
		this.btPause.setAttribute('class', 'off');
		this.btStart.setAttribute('class', '');
		this.ibc = null;
		this.bc = 1;
		this.c = 0;
		this.vc = 1;
		this.vc2 = 1;
		this.canPlay = 0;
	};

	io.com.github.Metronome.prototype.btPause_OnClick = function(event) {
		{
			// console.log('bc: ' + this.bc, 'c: ' + this.c, 'vc: ' + this.vc, 'event: ' + event);
		}
		this.btPause.setAttribute('class', 'off');
		this.btStart.setAttribute('class', '');
		this.canPlay = 0;
		// this.vc--;
		// this.vc2 -= ?;
		// let mul = this.music.subdivisions + 1; /*r4 */
		// this.bc = this.vc * mul - 1; /* r2 */
		// this.c = this.vc * mul - 2; /* r3 */
	};

	io.com.github.Metronome.prototype.setMusic = function(music) {
		this.music = music;
		speed.innerHTML = this.music.bpm;
		meter.innerHTML = this.music.meter;
		if (this.music) {
			this.btStop_OnClick();
		}
	};

	io.com.github.Metronome.prototype.showBeatNote = function() {
		let index = this.vc - 2;
		if (index > 0) {
			let previousBeatNote = this.beatNotes[index - 1];
			previousBeatNote.removeAttribute('class');
		}
		let beatNote = this.beatNotes[index];
		beatNote.setAttribute('class', 'current-beat-note');
	};

	io.com.github.Metronome.prototype.showBeat = function() {
		this.beats.innerHTML = (this.vc2 - 1) % (this.music.meter) + 1;
	};

	function initAudio(prefix, sound) {
		let soundName = io.com.github.Metronome.SOUND_NAMES[sound];
		let uri = prefix + soundName;
		let request = new XMLHttpRequest();
		request.open('GET', uri, true);
		request.responseType = 'arraybuffer';
		request.onload = function() {
			if (request.readyState == 4) {
				if (request.status == 200) {
					io.com.github.Metronome.SOUNDS[sound] = { response: request.response, buffer: null };
				} else {
					var firstChar = prefix.charAt(0);
					if (firstChar == '.') {
						initAudio('https://raw.githubusercontent.com/crisstanza/piano-chords-svg/master/audio/', sound);
					} else {
						console.log('(3) Error. ' + uri);
					}
					console.log('(1) Error. ' + uri);
				}
			} else {
				console.log('(2) Error. ' + uri);
			}
		};
		request.send();
	}

	function init(event) {
		io.com.github.Metronome.SOUNDS[0] = null;
		for (let i = 1 ; i <= io.com.github.Metronome.SOUNDS_LENGTH ; i++) {
			initAudio('./audio/', i);
		}
	}

	function checkBuffersToPlay(metronome) {
		for (let i = 1 ; i <= io.com.github.Metronome.SOUNDS_LENGTH ; i++) {
			if (io.com.github.Metronome.SOUNDS[i].buffer == null) {
				return;
			}
		}
		metronome.btStart_OnClick();
	}

	function initBuffers(event, metronome) {
		let ac = window.AudioContext || window.webkitAudioContext || false;
		io.com.github.Metronome.AUDIO_CONTEXT = new ac();
		for (let i = 1 ; i <= io.com.github.Metronome.SOUNDS_LENGTH ; i++) {
			io.com.github.Metronome.AUDIO_CONTEXT.decodeAudioData(
				io.com.github.Metronome.SOUNDS[i].response,
				function(buffer) {
					io.com.github.Metronome.SOUNDS[i].buffer = buffer;
					checkBuffersToPlay(metronome);
				}
			);
		}
	}

	window.addEventListener('load', init);

})();
