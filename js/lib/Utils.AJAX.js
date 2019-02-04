"use strict";

if (!Utils) { var Utils = {}; }

(function() {
	
	if (!Utils.AJAX) { Utils.AJAX = {}; }

	Utils.AJAX.getObj = function(url, success, error) {
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				var data = request.responseText;
				var obj = JSON.parse(data);
				if (success) {
					success(obj);
				}
			} else {
				if (error) {
					error(request.status);
				}
			}
		};
 		request.send();
	};

	function init(event) {
	}

	window.addEventListener('load', init);

})();
