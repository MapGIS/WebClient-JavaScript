'use strict';

var test = require('tape');
window.mapboxgl = require('mapbox-gl');
require('../');

mapboxgl.accessToken = process.env.MapboxAccessToken;

// Tests
test('Compare', function(t) {
  var a = new mapboxgl.Map({
    container: document.createElement('div'),
    style: 'mapbox://styles/mapbox/light-v8'
  });

  var b = new mapboxgl.Map({
    container: document.createElement('div'),
    style: 'mapbox://styles/mapbox/dark-v8'
  });

  new mapboxgl.Compare(a, b);

  t.notOk(!!a.getContainer().style.clip, 'Map A is not clipped');
  t.ok(!!b.getContainer().style.clip, 'Map B is clipped');

  b.jumpTo({
    bearing: 20,
    center: {
      lat: 16,
      lng: -155
    },
    pitch: 20,
    zoom: 3
  });

  t.equals(a.getZoom(), 3, 'Zoom is synched');
  t.equals(a.getPitch(), 20, 'Pitch is synched');
  t.equals(a.getBearing(), 20, 'Bearing is synched');
  t.equals(a.getCenter().lng, -155, 'Lng is synched');
  t.equals(a.getCenter().lat, 16, 'Lat is synched');
  t.end();
});

// close the smokestack window once tests are complete
test('shutdown', function(t) {
  t.end();
  setTimeout(function() {
    window.close();
  });
});
