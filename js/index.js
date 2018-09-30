(function() {

	var linksChords, links, linksMap, minor, sharp, chordDisplay, chordName;
	var svg, zoomSlider;

// // // // // // // // // // // // // // // // // // // // // // // // //

	function loadChord(hash) {
		var chord = hash.substring(1);
		chordName.innerText = chord;
		//
		for (var i = 0 ; i < links.length ; i++) {
			var link = links[i];
			link.setAttribute('class', '');
		}
		var root = chord.substring(0, 1);
		linksMap[root].setAttribute('class', 'current');
		var notes = svg.getElementsByTagName('circle');
		for (var j = 0 ; j < notes.length ; j++) {
			var note = notes[j];
			svg.removeChild(note);
			j--;
		}
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	function initGlobals(event) {
		linksChords = Utils.$('links-chords');
		links = linksChords.getElementsByTagName('a');
		linksMap = [];
		for (var i = 0 ; i < links.length ; i++) {
			var link = links[i];
			linksMap[link.innerText] = link;
		}
		minor = Utils.$('minor');
		sharp = Utils.$('sharp');
		chordDisplay = Utils.$('chord-display');
		chordName = Utils.$('chord-name');
		svg = Utils.$('svg');
		zoomSlider = Utils.$('zoom-slider');
	}

	function initChecks(event) {
		minor.addEventListener('click', modifiers_Click)
		sharp.addEventListener('click', modifiers_Click)
	}

	function initZoom(event) {
		zoomSlider.addEventListener('input', zoomSlider_Input);
		zoomSlider_Input(event);
	}

	function initHash(event) {
		var hash = document.location.hash;
		if (hash) {
			loadChord(hash);
		} else {
			document.location.hash = 'Cm';
		}
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	function zoomSlider_Input(event) {
		chordDisplay.style.zoom = zoomSlider.value + '%';
	}

	function modifiers_Click(event) {
		var isMinor = minor.checked;
		var isSharp = sharp.checked;
		var modifiers = isMinor ? 'm' : '';
		modifiers += isSharp ? '#' : '';
		for (var i = 0 ; i < links.length ; i++) {
			var link = links[i];
			link.href = '#' + link.innerText + modifiers;
		}
		minor.parentNode.parentNode.setAttribute('class', isMinor ? 'current' : '');
		sharp.parentNode.parentNode.setAttribute('class', isSharp ? 'current' : '');
		for (var i = 0 ; i < links.length ; i++) {
			var link = links[i];
			if (link.getAttribute('class') == 'current') {
				document.location.hash = link.getAttribute('href').substring(1);
				break;
			}
		}
	}

	function window_Load(event) {
		initGlobals(event);
		initChecks(event);
		initZoom(event);
		initHash(event);
	}

	function window_HashChange(event) {
		var hash = document.location.hash;
		loadChord(hash);
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	window.addEventListener('load', window_Load);
	window.addEventListener('hashchange', window_HashChange);

})();