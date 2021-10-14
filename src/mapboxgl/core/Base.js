/**
 * WebClient mapboxgl基类
 * 定义命名空间
 */
import mapboxgl from '@mapgis/mapbox-gl';

window.mapboxgl = mapboxgl;
mapboxgl.Zondy = window.mapboxgl.Zondy || {};
var Zondy = window.mapboxgl.Zondy || {};
Zondy.Map = Zondy.Map || {};
export { Zondy };
export { mapboxgl };
