# Mapbox GL Minimap Control

[Demo on GitHub pages](http://aesqe.github.io/mapboxgl-minimap/)

**--- work in progress; overall performance can probably be improved ---**

---

```javascript
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/streets-v8",
	center: [-73.94656812952897, 40.72912351406106],
	zoom: 7
});

map.on("style.load", function () {
	map.addControl(new mapboxgl.Minimap());
});
```

---

Options:

```javascript
{
	id: "mapboxgl-minimap",
	position: "bottom-left",
	width: "320px",
	height: "181px",
	style: "mapbox://styles/mapbox/streets-v8",
	center: [0, 0],

	zoom: 6,
	zoomAdjust: null, // should be a function; will be bound to Minimap
	zoomLevels: [
		// if parent map zoom >= 18 and minimap zoom >= 14, set minimap zoom to 16
		[18, 14, 16],
		[16, 12, 14],
		[14, 10, 12],
		[12, 8, 10],
		[10, 6, 8]
	],
	
	bounds: "parent", // or a valid lngLat object/array

	lineColor: "#08F",
	lineWidth: 1,
	lineOpacity: 1,

	fillColor: "#F80",
	fillOpacity: 0.25,

	dragPan: false,
	scrollZoom: false
}
```
