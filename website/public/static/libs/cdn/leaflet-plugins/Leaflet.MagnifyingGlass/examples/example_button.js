(function() {

    L.Control.MagnifyingGlass = L.Control.extend({

	_magnifyingGlass: false,

	options: {
	    position: 'topleft',
	    title: 'Toggle Magnifying Glass',
	    forceSeparateButton: false
	},

	initialize: function (magnifyingGlass, options) {
	    this._magnifyingGlass = magnifyingGlass;
	    // Override default options
	    for (var i in options) if (options.hasOwnProperty(i) && this.options.hasOwnProperty(i)) this.options[i] = options[i];
	},

	onAdd: function (map) {
	    var className = 'leaflet-control-magnifying-glass', container;

	    if (map.zoomControl && !this.options.forceSeparateButton) {
		container = map.zoomControl._container;
	    } else {
		container = L.DomUtil.create('div', 'leaflet-bar');
	    }

	    this._createButton(this.options.title, className, container, this._clicked, map, this._magnifyingGlass);
	    return container;
	},

	_createButton: function (title, className, container, method, map, magnifyingGlass) {
	    var link = L.DomUtil.create('a', className, container);
	    link.href = '#';
	    link.title = title;

	    L.DomEvent
		.addListener(link, 'click', L.DomEvent.stopPropagation)
		.addListener(link, 'click', L.DomEvent.preventDefault)
		.addListener(link, 'click', function() {method(map, magnifyingGlass);}, map);

	    return link;
	},

	_clicked: function (map, magnifyingGlass) {
	    if (!magnifyingGlass) {
		return;
	    }

	    if (map.hasLayer(magnifyingGlass)) {
		map.removeLayer(magnifyingGlass);
	    } else {
		magnifyingGlass.addTo(map);
	    }
	}
    });

    L.control.magnifyingglass = function (magnifyingGlass, options) {
	return new L.Control.MagnifyingGlass(magnifyingGlass, options);
    };

})();

function init() {
  var tileUrl = 'http://b.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var tileOptions = {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  };


  var map = new L.Map('map', {
    center: [50.0, 10.0],
    zoom: 5,
    layers: [
      L.tileLayer(tileUrl, tileOptions)
    ]
  });

  var magnifyingGlass = L.magnifyingGlass({
    zoomOffset: 3,
    layers: [
      L.tileLayer(tileUrl, tileOptions)
    ]
  });

  L.control.magnifyingglass(magnifyingGlass, {
    forceSeparateButton: true
  }).addTo(map);
}

window.onload = init;
