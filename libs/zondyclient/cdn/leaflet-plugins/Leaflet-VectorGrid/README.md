

# Leaflet.VectorGrid


Display gridded vector data (sliced [GeoJSON](http://geojson.org/), [TopoJSON](https://github.com/mbostock/topojson/wiki) or [protobuf vector tiles](https://github.com/mapbox/vector-tile-spec)) in [Leaflet](http://www.leafletjs.com) 1.0.0


## Demos

|          |           |
| ---      | ---       |
| [`demo-geojson.html`](http://leaflet.github.io/Leaflet.VectorGrid/demo-geojson.html) | Sliced GeoJSON |
| [`demo-topojson.html`](http://leaflet.github.io/Leaflet.VectorGrid/demo-topojson.html) | Sliced TopoJSON (sorry for the antimeridian mess, topojson-to-geojson seems to not handle it properly) |
| [`demo-vectortiles.html`](http://leaflet.github.io/Leaflet.VectorGrid/demo-vectortiles.html) | Protobuf vector tiles: OpenMapTiles, MapBox, MapZen or even ESRI vector tiles |
| [`demo-points.html`](http://leaflet.github.io/Leaflet.VectorGrid/demo-points.html) | Clickable points and lines |
| [`demo-points-icons.html`](http://leaflet.github.io/Leaflet.VectorGrid/demo-points-icons.html) | Points as icons |


## Using

If you use `npm`:
```
	npm install leaflet.vectorgrid
```

That will make available two files: `dist/Leaflet.VectorGrid.js` and `dist/Leaflet.VectorGrid.bundled.js`.

The difference is that `dist/Leaflet.VectorGrid.bundled.js` includes all of `VectorGrid`'s dependencies:

* [geojson-vt](https://github.com/mapbox/geojson-vt) (Under ISC license)
* [pbf](https://github.com/mapbox/pbf) (Under BSD license)
* [topojson](https://github.com/mbostock/topojson) (Under BSD license)
* [vector-tile](https://github.com/mapbox/vector-tile-js) (Under BSD license)

 If you are adding these dependencies by yourself, use `dist/Leaflet.VectorGrid.js` instead.

If you don't want to deal with `npm` and local files, you can use `unpkg.com` instead:

```
<script src="https://unpkg.com/leaflet.vectorgrid@latest/dist/Leaflet.VectorGrid.bundled.js"></script>
```
or, with the same caveats about bundled dependencies:
```
<script src="https://unpkg.com/leaflet.vectorgrid@latest/dist/Leaflet.VectorGrid.js"></script>
```

## Docs

This plugin exposes two new classes:

* `L.VectorGrid.Slicer` for displaying GeoJSON or TopoJSON data
* `L.VectorGrid.Protobuf` for displaying vector tiles from an online tile server

You can find the API documentation, and the explanation about the styling, at:

http://leaflet.github.io/Leaflet.VectorGrid/vectorgrid-api-docs.html

## Dependencies

`L.VectorGrid.Slicer` requires `geojson-vt`: the global variable `geojsonvt` must exist. If topojson data is used, then the `topojson` global variable must also exist.

`L.VectorGrid.Protobuf` requires `vector-tile` and `pbf`: the global variables `VectorTile` and `Pbf` must exist.

By default, VectorGrid is built with those dependencies bundled.

## Developing

Run `npm install`.

## TODO

* Sub-panes for the tile renderers (to set the "z-index" of layers/features)
 * More `<g>`roups in SVG
 * Offscreen `<canvas>`es in Canvas
* `getBounds()` support for the slicer (inherit/extrapolate from geojson data)
* Parser for mapbox-like vector stylesheets

## Motivation

Before VectorGrid, loading vector tiles in Leaflet could only be done with the
Leaflet.MapboxVectorTile or the Hoverboard plugin, but neither of those works with
Leaflet 1.0.0 (or greater).

VectorGrid leverages the GridLayer feature introduced in Leaflet 1.0.0.

## Legalese

----------------------------------------------------------------------------

"THE BEER-WARE LICENSE":
<ivan@sanchezortega.es> wrote this file. As long as you retain this notice you
can do whatever you want with this stuff. If we meet some day, and you think
this stuff is worth it, you can buy me a beer in return.

----------------------------------------------------------------------------

