function init() {
  var tiles_tonerBg = 'http://{s}.tile.stamen.com/toner-background/{z}/{x}/{y}.png',
      tiles_toner = 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
      tiles_waterColor = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
      tiles_osm = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

  var map = new L.Map('map', {
    center: [51.0, 7.0],
    zoom: 6,
    minZoom: 6,
    layers: [
      L.tileLayer(tiles_tonerBg)
    ]
  });

  // Paris
  L.magnifyingGlass({
    zoomOffset: 2,
    radius: 50,
    layers: [
      L.tileLayer(tiles_waterColor)
    ],
    fixedPosition: true,
    latLng: [48.85341, 2.3488]
  }).addTo(map);

  // Berlin
  L.magnifyingGlass({
    zoomOffset: 2,
    radius: 100,
    layers: [
      L.tileLayer(tiles_toner)
    ],
    fixedPosition: true,
    latLng: [52.52437, 13.41053]
  }).addTo(map);

  // London
  L.magnifyingGlass({
    zoomOffset: 2,
    radius: 75,
    layers: [
      L.tileLayer(tiles_osm)
    ],
    fixedPosition: true,
    latLng: [51.50853, -0.12574]
  }).addTo(map);
}

window.onload = init;