import { Zondy } from '../../service/common/Base';
import { CRS } from '../layer/Proj4Leaflet';
import L from "leaflet";

var Xian80_resolutions = [];

for (var i = 1; i < 19; i++) {
    Xian80_resolutions.push(0.703125 * 2 / (Math.pow(2, i)));
}

/**
 * @constant L.CRS.EPSG4610
 * @description EPSG4610 - Xian 80
 */
export var EPSG4610 = window.Zondy.Proj.CRS("EPSG:4610",{
    def: "+proj=longlat +a=6378140 +b=6356755.288157528 +units=degrees +no_defs",
    origin: [-180, 90],
    resolutions: Xian80_resolutions,
    bounds: L.bounds([-180, -90], [180, 90])
});

Zondy.CRS.EPSG4610 = EPSG4610;