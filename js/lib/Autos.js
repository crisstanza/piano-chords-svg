"use strict";

if (!Autos) { var Autos = {}; }

(function() {

	Autos.initIds = function init() {
		let elements = document.querySelectorAll('[id]:not([id=""])');
		if (elements) {
			let length = elements.length;
			for (let i = 0 ; i < length ; i++) {
				let element = elements[i];
				let id = element.getAttribute('id');
				let identifier = fixId(id);
				window[identifier] = element;
			}
		}
	};

	Autos.initLinks = function(obj) {
		let links = document.querySelectorAll('a[id]:not([id=""])');
		if (links) {
			let parent = obj ? 'obj.' : '';
			let length = links.length;
			for (let i = 0 ; i < length ; i++) {
				let link = links[i];
				let id = link.getAttribute('id');
				let identifier = fixId(id);
				link.addEventListener('click', function(event) { eval(parent+identifier+'_OnClick(event)'); } );
			}
		}
	}

	function fixId(id) {
		let parts = id.split('-');
		let length = parts.length;
		for (let i = 0 ; i < length ; i++) {
			let part = parts[i];
			if (i > 0) {
				parts[i] = part.charAt(0).toUpperCase() + part.slice(1);
			}
		}
		let identifier = parts.join('');
		return identifier;
	}

	function init(event) {
	}

	window.addEventListener('load', init);

})();
