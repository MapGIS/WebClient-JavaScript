var map = new mapboxgl.Map({
    container: 'map',
    style: {
        "version": 8,
        "sources": {
            "osm-tiles": {
                "type": "raster",
                'tiles': [
                    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
                ],
                'tileSize': 256
            }
        },
        "layers": [{
            "id": "simple-tiles",
            "type": "raster",
            "source": "osm-tiles",
            "minzoom": 0,
            "maxzoom": 22
        }]
    },
    zoom: 8,
    pitch: 45,
    center: [100, 30]
    //center: [-73.962981, 40.754]
});

map.on('load', function () {
    initMap();
});

/* // the state-fills-hover layer to only show the matching state, thus making a hover effect.
map.on("mousemove", "state-fills", function (e) {
    map.setFilter("state-fills-hover", ["==", "name", e.features[0].properties.name]);
});

// Reset the state-fills-hover layer's filter when the mouse leaves the layer.
map.on("mouseleave", "state-fills", function () {
    map.setFilter("state-fills-hover", ["==", "name", ""]);
}); */

function initMap() {
    new Zondy.GeoSpark.TimeSpaceCubeService({
        ip: "192.168.81.223",
        socket: "9091",
        queryOption: {
            libName: "postgis",
            tableName: "createspacetimecube_zhc_005",
            schemas: "public",
            includeProps: true
        }
    }, success, failture);

}

function success(data) {
    console.log("success");

}

function failture(msg) {
    var option = {
        space: {
            startx: 100,
            endx: 102,
            starty: 30,
            endy: 32
        },
        index: {
            cols: 10,
            rows: 10
        },
        style: {
            height: 5,
            baseheight: 6000,
            radio: 0.02
        }
    }

    new mapboxgl.zondy.TimeSpaceCubeLayer(map, msg, option);

    console.log("failture");
}