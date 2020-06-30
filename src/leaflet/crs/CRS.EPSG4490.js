import { Zondy } from '../../service/common/Base';
import { CRS } from '../layer/Proj4Leaflet';
import L from "leaflet";

var China2000_resolutions = [];

for (var i = 1; i < 19; i++) {
    China2000_resolutions.push(0.703125 * 2 / (Math.pow(2, i)));
}

/**
 * @constant L.CRS.EPSG4490
 * @description EPSG4490 - China 2000
 */
export var EPSG4490 = window.Zondy.Proj.CRS("EPSG:4490",{
    def: "+proj=longlat +ellps=GRS80 +units=degrees +no_defs",
    origin: [-180, 90],
    resolutions: China2000_resolutions,
    bounds: L.bounds([-180, -90], [180, 90])
});

Zondy.CRS.EPSG4490 = EPSG4490;