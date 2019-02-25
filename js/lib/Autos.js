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
		return elements;
	};

	Autos.initKeys = function(obj) {
		let body = document.body;
		let autoKeys = body.getAttribute('data-autos-keys');
		if (autoKeys) {
			let parent = obj ? 'obj.' : '';
			let keys = autoKeys.split(/,\s+/);
			let length = keys.length;
			for (let i = 0 ; i < length ; i++) {
				let key = keys[i];
				body.addEventListener('keyup', function(event) {
					let keyCode = event.keyCode;
					let charKeyCode = String.fromCharCode(keyCode).toLowerCase();
					if (key == charKeyCode) {
						eval(parent+'_OnKeyUp(event)');
					}
				} );
			}
		}
		return autoKeys;
	};

	Autos.initLinks = function(obj) {
		let links = document.querySelectorAll('a[id][href^="#"]:not([id=""])');
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
		return links;
	}

	Autos.initLinksFrom = function(container, obj) {
		let links = container.querySelectorAll('a[href^="#"]:not([id])');
		if (links) {
			let parent = obj ? 'obj.' : '';
			let length = links.length;
			for (let i = 0 ; i < length ; i++) {
				let link = links[i];
				let href = link.getAttribute('href');
				link.addEventListener('click', function(event) { eval(parent+'_OnClickFrom(event, i)'); } );
			}
		}
		return links;
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
