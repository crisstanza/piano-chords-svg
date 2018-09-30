(function() {

	var linksChords, links, linksMap, minor, sharp, chordName;
	var svg;

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
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	function initChecks(event) {
		minor.addEventListener('click', modifiers_Click)
		sharp.addEventListener('click', modifiers_Click)
	}

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
		chordName = Utils.$('chord-name');
		svg = Utils.$('svg');
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

	function modifiers_Click(event) {
		var isMinor = minor.checked;
		var isSharp = sharp.checked;
		var modifiers = isMinor ? 'm' : '';
		modifiers += isSharp ? '#' : '';
		for (var i = 0 ; i < links.length ; i++) {
			var link = links[i];
			link.href = '#' + link.innerText + modifiers;
		}
	}

	function window_Load(event) {
		initGlobals(event);
		initChecks(event);
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