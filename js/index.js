(function() {

	var linksChords, links;
	var svg;

// // // // // // // // // // // // // // // // // // // // // // // // //

	function x(event) {
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	function initGlobals(event) {
		linksChords = Utils.$('links-chords');
		links = linksChords.getElementsByTagName('a');
		svg = Utils.$('svg');
	}

	function initHash(event) {
		if (!document.location.hash) {
			document.location.hash = 'Cm';
		}
	}

	function window_Load(event) {
		initGlobals(event);
		initHash(event);
	}

	function window_HashChange(event) {
		console.log(links);
	}

	window.addEventListener('load', window_Load);
	window.addEventListener('hashchange', window_HashChange);

})();