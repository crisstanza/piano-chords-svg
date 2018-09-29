(function() {

	var svg;

// // // // // // // // // // // // // // // // // // // // // // // // //

	function x(evento) {
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	function initGlobals() {
		svg = Utils.$('svg');
	}

	function window_Load() {
		initGlobals();
	}

	function window_HashChange() {
	}

	window.addEventListener('load', window_Load);
	window.addEventListener('hashchange', window_HashChange);

})();