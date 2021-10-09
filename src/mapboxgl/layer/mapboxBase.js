/* var mapboxgl = window.mapboxgl = window.mapboxgl || {};
mapboxgl.Zondy = mapboxgl.Zondy || {};
var Zondy = mapboxgl.Zondy || {};
Zondy.Map = Zondy.Map || {};
export {Zondy};
export {mapboxgl} */

import mapboxgl from '@mapgis/mapbox-gl';
window.mapboxgl = mapboxgl;
mapboxgl.Zondy = window.mapboxgl.Zondy || {};
var Zondy = window.mapboxgl.Zondy || {};
Zondy.Map = Zondy.Map || {};
export { Zondy };
export { mapboxgl };
