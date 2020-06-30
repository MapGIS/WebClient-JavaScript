import { Zondy } from '../../service/common/Base';
import { CRS } from '../layer/Proj4Leaflet';
import L from "leaflet";

var Beijing54_resolutions = [];

for (var i = 1; i < 19; i++) {
    Beijing54_resolutions.push(0.703125 * 2 / (Math.pow(2, i)));
}

/**
 * @constant L.CRS.EPSG4214
 * @description EPSG4214 - BeiJing 54
 */
export var EPSG4214 = window.Zondy.Proj.CRS("EPSG:4214",{
    def: "+proj=longlat +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +no_defs",
    origin: [-180, 90],
    resolutions: Beijing54_resolutions,
    bounds: L.bounds([-180, -90], [180, 90])
});

Zondy.CRS.EPSG4214 = EPSG4214;