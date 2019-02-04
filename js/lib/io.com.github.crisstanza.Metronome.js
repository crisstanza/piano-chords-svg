"use strict";

if (!io) { var io = {}; }
if (!io.com) { io.com = {}; }
if (!io.com.github) { io.com.github = {}; }
if (!io.com.github.crisstanza) { io.com.github = {}; }

io.com.github.Metronome = function(speed, btLess, btMore, btStart, btStop, beats) {
	this.speed = speed;
	this.btLess = btLess;
	this.btMore = btMore;
	this.btStart = btStart;
	this.btStop = btStop;
	this.beats = beats;
	this.music = null;
};

io.com.github.Metronome.prototype.btLess_OnClick = function(event) {
	this.speed.innerHTML--;
};

io.com.github.Metronome.prototype.btMore_OnClick = function(event) {
	this.speed.innerHTML++;
};

io.com.github.Metronome.prototype.btStart_OnClick = function(event) {
	this.btStart.setAttribute('class', 'off');
	this.btStop.setAttribute('class', '');
	this.beats.innerHTML = 0;
};

io.com.github.Metronome.prototype.btStop_OnClick = function(event) {
	this.btStop.setAttribute('class', 'off');
	this.btStart.setAttribute('class', '');
	this.beats.innerHTML = '?';
};

io.com.github.Metronome.prototype.setMusic = function(music) {
	this.music = music;
	if (this.music) {
		this.btStop_OnClick();
	}
};
