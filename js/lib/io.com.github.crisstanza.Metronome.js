"use strict";

if (!io) { var io = {}; }
if (!io.com) { io.com = {}; }
if (!io.com.github) { io.com.github = {}; }
if (!io.com.github.crisstanza) { io.com.github = {}; }

(function() {

	io.com.github.Metronome = function(speed, btLess, btMore, btStart, btStop, beats) {
		this.speed = speed;
		this.btLess = btLess;
		this.btMore = btMore;
		this.btStart = btStart;
		this.btStop = btStop;
		this.beats = beats;
		this.canPlay = 0;
		this.music = null;
		this.ibc = null; // intro beat counter
		this.bc = null; // beat counter
		this.c = null; // music counter
		this.vc = null; // visual counter
		this.play = function(_sound) {
			if (this.canPlay == 1) {
				let _this = this;
				if (this.ibc < 0) {
					let sound = _sound ? _sound : 5;
					this.beats.innerHTML = this.ibc;

					let bufferSource = io.com.github.Metronome.AUDIO_CONTEXT.createBufferSource();
					bufferSource.buffer = io.com.github.Metronome.SOUNDS[sound].buffer;
					bufferSource.connect(io.com.github.Metronome.AUDIO_CONTEXT.destination);
					bufferSource.start();

					this.ibc++;
					let speed = this.speed.innerHTML;
					setTimeout( function() { _this.play(); }, 60000 / speed );
				} else {
					if (this.bc == 0) {
						this.bc = 1;
					}

					if (this.bc % (this.music.subdivisions + 1) == 1) {
						this.beats.innerHTML = (this.vc - 1) % (this.music.meter) + 1;
						this.vc++;
					}

					let sound = this.music.beats[this.c];
					if (sound > 0) {
					var bufferSource = io.com.github.Metronome.AUDIO_CONTEXT.createBufferSource();
						bufferSource.buffer = io.com.github.Metronome.SOUNDS[sound].buffer;
						bufferSource.connect(io.com.github.Metronome.AUDIO_CONTEXT.destination);
						bufferSource.start();
					}

					this.c++;
					this.bc++;

					if (this.c < this.music.beats.length) {
						let speed = this.speed.innerHTML * (this.music.subdivisions + 1);
						setTimeout( function() { _this.play(io.com.github.Metronome.SOUNDS[_this.c]); }, 60000 / speed );
					}
				}
			}
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
			if (io.com.github.Metronome.SOUNDS.length == 10) {
				this.ibc = - this.music.meter * this.music.intro;
				this.bc = 0;
				this.c = 0;
				this.vc = 1;
				this.play();
			}
		}
	};

	io.com.github.Metronome.prototype.btStop_OnClick = function(event) {
		this.btStop.setAttribute('class', 'off');
		this.btStart.setAttribute('class', '');
		this.beats.innerHTML = '?';
		this.canPlay = 0;
	};

	io.com.github.Metronome.prototype.setMusic = function(music) {
		this.music = music;
		if (this.music) {
			this.btStop_OnClick();
		}
	};

	function initAudio(sound) {
		let soundName = io.com.github.Metronome.SOUND_NAMES[sound];
		let uri = './audio/' + soundName;
		let request = new XMLHttpRequest();
		request.open('GET', uri, true);
		request.responseType = 'arraybuffer';
		request.onload = function() {
			if (request.readyState == 4 && request.status == 200) {
				io.com.github.Metronome.SOUNDS[sound] = { response: request.response, buffer: null };
			} else {
				console.log('Error. ' + uri);
			}
		};
		request.send();
	}

	function init(event) {
		io.com.github.Metronome.SOUNDS[0] = null;
		for (let i = 1 ; i <= io.com.github.Metronome.SOUNDS_LENGTH ; i++) {
			initAudio(i);
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
		io.com.github.Metronome.AUDIO_CONTEXT = new AudioContext() || new webkitAudioContext();
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
