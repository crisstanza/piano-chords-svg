(function() {

	var parent
	var METRONOME;

// // // // // // // // // // // // // // // // // // // // // // // // //

	function init(event) {
		Autos.initIds();
		parent = window.opener ? window.opener.parent : null;
		METRONOME = new io.com.github.Metronome(speed, btLess, btMore, btStart, btStop, beats);
		Utils.AJAX.getObj(mainLink.getAttribute('href')+'.js', function(obj) { METRONOME.setMusic(obj); });
		Autos.initLinks(METRONOME);
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	function window_Load(event) {
		init(event);
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	window.addEventListener('load', window_Load);

})();
