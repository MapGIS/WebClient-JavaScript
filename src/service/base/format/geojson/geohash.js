// geohash.js
// Geohash library for Javascript
// (c) 2008 David Troy
// Distributed under the MIT License

let BITS = [16, 8, 4, 2, 1];

let BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";
let NEIGHBORS = {
    right: {even: "bc01fg45238967deuvhjyznpkmstqrwx"},
    left: {even: "238967debc01fg45kmstqrwxuvhjyznp"},
    top: {even: "p0r21436x8zb9dcf5h7kjnmqesgutwvy"},
    bottom: {even: "14365h7k9dcfesgujnmqp0r2twvyx8zb"}
};
let BORDERS = {
    right: {even: "bcfguvyz"},
    left: {even: "0145hjnp"},
    top: {even: "prxz"},
    bottom: {even: "028b"}
};

NEIGHBORS.bottom.odd = NEIGHBORS.left.even;
NEIGHBORS.top.odd = NEIGHBORS.right.even;
NEIGHBORS.left.odd = NEIGHBORS.bottom.even;
NEIGHBORS.right.odd = NEIGHBORS.top.even;

BORDERS.bottom.odd = BORDERS.left.even;
BORDERS.top.odd = BORDERS.right.even;
BORDERS.left.odd = BORDERS.bottom.even;
BORDERS.right.odd = BORDERS.top.even;

var lat_err;
var lon_err;
var geohash;
function refine_interval(interval, cd, mask) {
    if (cd & mask)
        interval[0] = (interval[0] + interval[1]) / 2;
    else
        interval[1] = (interval[0] + interval[1]) / 2;
}

function calculateAdjacent(srcHash, dir) {
    srcHash = srcHash.toLowerCase();
    var lastChr = srcHash.charAt(srcHash.length - 1);
    var type = (srcHash.length % 2) ? 'odd' : 'even';
    var base = srcHash.substring(0, srcHash.length - 1);
    if (BORDERS[dir][type].indexOf(lastChr) != -1)
        base = calculateAdjacent(base, dir);
    return base + BASE32[NEIGHBORS[dir][type].indexOf(lastChr)];
}

function decodeGeoHash(geohash) {
    var is_even = 1;
    var lat = [];
    var lon = [];
    lat[0] = -90.0;
    lat[1] = 90.0;
    lon[0] = -180.0;
    lon[1] = 180.0;
    lat_err = 90.0;
    lon_err = 180.0;

    for (let i = 0; i < geohash.length; i++) {
        let c = geohash[i];
        let cd = BASE32.indexOf(c);
        for (let j = 0; j < 5; j++) {
            let mask = BITS[j];
            if (is_even) {
                lon_err /= 2;
                refine_interval(lon, cd, mask);
            } else {
                lat_err /= 2;
                refine_interval(lat, cd, mask);
            }
            is_even = !is_even;
        }
    }
    lat[2] = (lat[0] + lat[1]) / 2;
    lon[2] = (lon[0] + lon[1]) / 2;

    return {latitude: lat, longitude: lon};
}

function encodeGeoHash(latitude, longitude) {
    var is_even = 1;
    var i = 0;
    var lat = [];
    var lon = [];
    var bit = 0;
    var ch = 0;
    var precision = 12;
    geohash = "";

    lat[0] = -90.0;
    lat[1] = 90.0;
    lon[0] = -180.0;
    lon[1] = 180.0;

    while (geohash.length < precision) {
        if (is_even) {
            let mid = (lon[0] + lon[1]) / 2;
            if (longitude > mid) {
                ch |= BITS[bit];
                lon[0] = mid;
            } else
                lon[1] = mid;
        } else {
            let mid = (lat[0] + lat[1]) / 2;
            if (latitude > mid) {
                ch |= BITS[bit];
                lat[0] = mid;
            } else
                lat[1] = mid;
        }

        is_even = !is_even;
        if (bit < 4)
            bit++;
        else {
            geohash += BASE32[ch];
            bit = 0;
            ch = 0;
        }
    }
    return geohash;
}

function decodeGeoHashToPolygon(geohash) {
    var is_even = 1;
    var lat = [];
    var lon = [];
    lat[0] = -90.0;
    lat[1] = 90.0;
    lon[0] = -180.0;
    lon[1] = 180.0;
    lat_err = 90.0;
    lon_err = 180.0;

    for (let i = 0; i < geohash.length; i++) {
        let c = geohash[i];
        let cd = BASE32.indexOf(c);
        for (let j = 0; j < 5; j++) {
            let mask = BITS[j];
            if (is_even) {
                lon_err /= 2;
                refine_interval(lon, cd, mask);
            } else {
                lat_err /= 2;
                refine_interval(lat, cd, mask);
            }
            is_even = !is_even;
        }
    }
    lat[2] = (lat[0] + lat[1]) / 2;
    lon[2] = (lon[0] + lon[1]) / 2;

    var top_left = [lon[0], lat[1]];
    var top_right = [lon[1], lat[1]];
    var bottom_right = [lon[1], lat[0]];
    var bottom_left = [lon[0], lat[0]];

    return [[top_left, top_right, bottom_right, bottom_left, top_left]];
}

export {decodeGeoHash, decodeGeoHashToPolygon, encodeGeoHash};