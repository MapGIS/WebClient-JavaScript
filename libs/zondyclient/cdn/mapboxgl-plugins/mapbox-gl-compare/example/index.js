'use strict';
/* global mapboxgl */

require('../');
mapboxgl.accessToken = window.localStorage.getItem('MapboxAccessToken');

var before = new mapboxgl.Map({
  container: 'before',
  style: 'mapbox://styles/mapbox/light-v8'
});

var after = new mapboxgl.Map({
  container: 'after',
  style: 'mapbox://styles/mapbox/dark-v8'
});

new mapboxgl.Compare(before, after, {
  // mousemove: true
});
