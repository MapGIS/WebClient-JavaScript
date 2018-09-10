import geojsonvt from 'geojson-vt';
import * as topojson from "topojson-client";

var slicers = {};
var options;

onmessage = function (e) {
	if (e.data[0] === 'slice') {
		// Given a blob of GeoJSON and some topojson/geojson-vt options, do the slicing.
		var geojson = e.data[1];
		options     = e.data[2];

		if (geojson.type && geojson.type === 'Topology') {
			for (var layerName in geojson.objects) {
				slicers[layerName] = geojsonvt(
					topojson.feature(geojson, geojson.objects[layerName])
				, options);
			}
		} else {
			slicers[options.vectorTileLayerName] = geojsonvt(geojson, options);
		}

	} else if (e.data[0] === 'get') {
		// Gets the vector tile for the given coordinates, sends it back as a message
		var coords = e.data[1];

		var tileLayers = {};
		for (var layerName in slicers) {
			var slicedTileLayer = slicers[layerName].getTile(coords.z, coords.x, coords.y);

			if (slicedTileLayer) {
				var vectorTileLayer = {
					features: [],
					extent: options.extent,
					name: options.vectorTileLayerName,
					length: slicedTileLayer.features.length
				}

				for (var i in slicedTileLayer.features) {
					var feat = {
						geometry: slicedTileLayer.features[i].geometry,
						properties: slicedTileLayer.features[i].tags,
						type: slicedTileLayer.features[i].type	// 1 = point, 2 = line, 3 = polygon
					}
					vectorTileLayer.features.push(feat);
				}
				tileLayers[layerName] = vectorTileLayer;
			}
		}
		postMessage({ layers: tileLayers, coords: coords });
	}
}
