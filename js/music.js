(function() {

	var parent, musicPre, musicLinks;

// // // // // // // // // // // // // // // // // // // // // // // // //

	function initGlobals(event) {
		parent = window.opener ? window.opener.parent : null;
		musicPre = Utils.$('music-pre');
		musicLinks = musicPre.querySelectorAll('a');
	}

	function initLinks(event) {
		for (var i = 0 ; i < musicLinks.length ; i++) {
			var musicLink = musicLinks[i];
			musicLink.addEventListener('click', link_Click);
		}
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