import mapboxgl from '@mapgis/mapbox-gl';
import * as d3 from 'd3';

import '../core/Base';

require("./dthree/mapbox-d3.css");

export class D3Layer {

    constructor(map, drawCallback, options) {
        this.map = map;
        this._drawCallback = drawCallback;
        this.initD3();
    }

    initD3(){
        d3.select("head")
            .append("style").attr("type", "text/css")
            .text("g.d3-overlay *{pointer-events:visiblePainted;}");
    }

    bindMapEvent() {
        var svg = this._svg;
        var svgContainer = this.selection;
        var draw = this.draw;
        var proj = this.projection;
        var map = this.map;
        var d3layer = this;
        this.map.on("viewreset", function () {
            d3layer.draw(d3layer, svgContainer, proj, map);
        });
        this.map.on("movestart", function () {
            svgContainer.classed("mapboxd3-hidden", true);
        });
        this.map.on("rotate", function () {
            svgContainer.classed("mapboxd3-hidden", true);
        });
        this.map.on("moveend", function () {
            svgContainer.classed("mapboxd3-hidden", false);
            d3layer.draw(d3layer, svgContainer, proj, map);
        })
    }

    draw(thisLayer, selection, projection, map) {
        thisLayer._drawCallback(selection, projection, map.getZoom());
    }

    addTo(map) {
        this.onAdd(map);
        this.draw(this, this.selection, this.projection, this.map);
        this.bindMapEvent();
    }

    hide() {
        this.svg.classed("mapboxd3-hidden", true);
    }

    remove() {
        this.svg.classed("mapboxd3-hidden", true);
        this.svg = null;
        this.selection = null;
    }

    onAdd() {
        var _layermap = this.map;
        this._container = _layermap.getCanvasContainer();
        this._svg = d3.select(this._container).select("svg");
        this.selection = this._svg.append("g").classed("d3-overlay", true);;

        // Create projection object
        this.projection = {
            latLngToLayerPoint: function (longtitude, latitude, zoom) {
                zoom = _layermap.getZoom() ? _layermap.getZoom() : zoom;
                console.log("longtitude: " + longtitude + " latitude: " + latitude);
                var screenPoint = _layermap.project(new mapboxgl.LngLat(longtitude, latitude));
                console.log("screenPoint x: " + screenPoint.x + " y: " + screenPoint.y);
                return screenPoint;
            },
            layerPointToLatLng: function (point, zoom) {
                zoom = _layermap.getZoom() ? _layermap.getZoom() : zoom;
                var lnglat = _layermap.unproject(new mapboxgl.Point(point.x, point.y));
                return lnglat;
            },
            unitsPerMeter: 256 * Math.pow(2, _layermap.getZoom()) / 40075017,
            map: _layermap,
            scale: 1
        };
        this.projection._projectPoint = function (x, y) {
            if (y == null) {
                y = 0;
            }
            if (x == null) {
                x = 0;
            }
            var point = _layermap.project(new mapboxgl.LngLat(x, y));
            return this.stream.point(point.x, point.y);
        };

        var projectionPointRef = this.projection._projectPoint;

        this.projection.pathFromGeojson =
            d3.geoPath().projection(d3.geoTransform({
                point: projectionPointRef
            }));
    }
}

mapboxgl.zondy.d3Layer = D3Layer;
