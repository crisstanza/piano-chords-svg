"use strict";

if (!Utils) { var Utils = {}; }

(function() {

	var TYPE_STRING = "string"; // String.name.toLowerCase();

	Utils.$ = function(idOrElement) {
		if (typeof idOrElement == TYPE_STRING) {
			return document.getElementById(idOrElement);
		} else {
			return idOrElement;
		}
	};

})();