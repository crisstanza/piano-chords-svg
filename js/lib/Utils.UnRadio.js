"use strict";

if (!Utils) { var Utils = {}; }

(function() {
	
	if (!Utils.UnRadio) { Utils.UnRadio = {}; }

	var KEY_SPACE = 32;

	Utils.UnRadio.start = function(event) {
		var source = document;
		var radios = source.querySelectorAll('input[type=radio]');
		if (radios) {
			var length = radios.length;
			for (var i = 0; i < length; i++) {
				var radio = radios[i];
				radio.addEventListener('keydown', allowUncheckSpace);
				radio.addEventListener('click', allowUncheck);
			}
		}
	};

	function allowUncheckSpace(event) {
		if (event.keyCode == KEY_SPACE) {
			var radio = event.target;
			radio.setAttribute('data-click', !radio.checked);
			radio.checked = !radio.checked;
			event.preventDefault();
		}
	}

	function allowUncheck(event) {
		var radio = event.target;
		var click = radio.getAttribute('data-click');
		if (click == 'true') {
			radio.checked = false;
			radio.setAttribute('data-click', false);
		} else {
			radio.setAttribute('data-click', true);
			unclickOthers(radio);
		}
	}

	function unclickOthers(radio) {
		var source = radio.form ? radio.form : document;
		var others = source.querySelectorAll('input[name='+radio.name+']');
		if (others) {
			var length = others.length;
			for (var i = 0; i < length; i++) {
				var other = others[i];
				if (radio != other) {
					other.setAttribute('data-click', false);
				}
			}
		}
	}

	function init(event) {
		Utils.UnRadio.start(event);
	}

	window.addEventListener('load', init);

})();
