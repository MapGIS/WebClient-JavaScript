(function () {

    'use strict';

    var isRingBbox = function (ring, bbox) {
        if (ring.length !== 4) {
            return false;
        }

        var p,
            sumX = 0,
            sumY = 0;

        for (p = 0; p < 4; p++) {
            if ((ring[p].x !== bbox.min.x && ring[p].x !== bbox.max.x) ||
                (ring[p].y !== bbox.min.y && ring[p].y !== bbox.max.y)) {
                return false;
            }

            sumX += ring[p].x;
            sumY += ring[p].y;

            //bins[Number(ring[p].x === bbox.min.x) + 2 * Number(ring[p].y === bbox.min.y)] = 1;
        }

        //check that we have all 4 vertex of bbox in our geometry
        return sumX === 2 * (bbox.min.x + bbox.max.x) && sumY === 2 * (bbox.min.y + bbox.max.y);
    };

    var ExtendMethods = {
        _toMercGeometry: function (b, isGeoJSON) {
            var res = [];
            var c,
                r,
                p,
                mercComponent,
                mercRing,
                coords;

            if (!isGeoJSON) {
                if (!(b[0] instanceof Array)) {
                    b = [[b]];
                } else if (!(b[0][0] instanceof Array)) {
                    b = [b];
                }
            }

            for (c = 0; c < b.length; c++) {
                mercComponent = [];
                for (r = 0; r < b[c].length; r++) {
                    mercRing = [];
                    for (p = 0; p < b[c][r].length; p++) {
                        coords = isGeoJSON ? L.latLng(b[c][r][p][1], b[c][r][p][0]) : b[c][r][p];
                        mercRing.push(this._map.project(coords, 0));
                    }
                    mercComponent.push(mercRing);
                }
                res.push(mercComponent);
            }

            return res;
        },

        //lazy calculation of layer's boundary in map's projection. Bounding box is also calculated
        _getOriginalMercBoundary: function () {
            if (this._mercBoundary) {
                //return this._mercBoundary;
            }

            var compomentBbox,
                c;

            if (L.Util.isArray(this.options.boundary)) { //Depricated: just array of coordinates
                this._mercBoundary = this._toMercGeometry(this.options.boundary);
            } else { //GeoJSON
                this._mercBoundary = [];
                var processGeoJSONObject = function (obj) {
                    if (obj.type === 'GeometryCollection') {
                        obj.geometries.forEach(processGeoJSONObject);
                    } else if (obj.type === 'Feature') {
                        processGeoJSONObject(obj.geometry);
                    } else if (obj.type === 'FeatureCollection') {
                        obj.features.forEach(processGeoJSONObject);
                    } else if (obj.type === 'Polygon') {
                        this._mercBoundary = this._mercBoundary.concat(this._toMercGeometry([obj.coordinates], true));
                    } else if (obj.type === 'MultiPolygon') {
                        this._mercBoundary = this._mercBoundary.concat(this._toMercGeometry(obj.coordinates, true));
                    }
                }.bind(this);
                processGeoJSONObject(this.options.boundary);
            }

            this._mercBbox = new L.Bounds();
            for (c = 0; c < this._mercBoundary.length; c++) {
                compomentBbox = new L.Bounds(this._mercBoundary[c][0]);
                this._mercBbox.extend(compomentBbox.min);
                this._mercBbox.extend(compomentBbox.max);
            }

            return this._mercBoundary;
        },

        _getClippedGeometry: function (geom, bounds) {
            var clippedGeom = [],
                clippedComponent,
                clippedExternalRing,
                clippedHoleRing,
                iC,
                iR;

            for (iC = 0; iC < geom.length; iC++) {
                clippedComponent = [];
                clippedExternalRing = L.PolyUtil.clipPolygon(geom[iC][0], bounds);
                if (clippedExternalRing.length === 0) {
                    continue;
                }

                clippedComponent.push(clippedExternalRing);

                for (iR = 1; iR < geom[iC].length; iR++) {
                    clippedHoleRing = L.PolyUtil.clipPolygon(geom[iC][iR], bounds);
                    if (clippedHoleRing.length > 0) {
                        clippedComponent.push(clippedHoleRing);
                    }
                }
                clippedGeom.push(clippedComponent);
            }

            if (clippedGeom.length === 0) { //we are outside of all multipolygon components
                return {isOut: true};
            }

            for (iC = 0; iC < clippedGeom.length; iC++) {
                if (isRingBbox(clippedGeom[iC][0], bounds)) {
                    //inside exterior rings and no holes
                    if (clippedGeom[iC].length === 1) {
                        return {isIn: true};
                    }
                } else { //intersects exterior ring
                    return {geometry: clippedGeom};
                }

                for (iR = 1; iR < clippedGeom[iC].length; iR++) {
                    //inside exterior ring, but have intersection with a hole
                    if (!isRingBbox(clippedGeom[iC][iR], bounds)) {
                        return {geometry: clippedGeom};
                    }
                }
            }

            //we are inside all holes in geometry
            return {isOut: true};
        },

        // Calculates intersection of original boundary geometry and tile boundary.
        // Uses quadtree as cache to speed-up intersection.
        // Return
        //   {isOut: true} if no intersection,
        //   {isIn: true} if tile is fully inside layer's boundary
        //   {geometry: <LatLng[][][]>} otherwise
        _getTileGeometry: function (x, y, z, skipIntersectionCheck) {
            if (!this.options.boundary) {
                return {isIn: true};
            }

            var cacheID = x + ":" + y + ":" + z,
                zCoeff = Math.pow(2, z),
                parentState,
                cache = this._boundaryCache;

            if (cache[cacheID]) {
                return cache[cacheID];
            }

            var mercBoundary = this._getOriginalMercBoundary(),
                ts = this.options.tileSize,
                tileBbox = new L.Bounds(new L.Point(x * ts / zCoeff, y * ts / zCoeff), new L.Point((x + 1) * ts / zCoeff, (y + 1) * ts / zCoeff));

            //fast check intersection
            if (!skipIntersectionCheck && !tileBbox.intersects(this._mercBbox)) {
                return {isOut: true};
            }

            if (z === 0) {
                cache[cacheID] = {geometry: mercBoundary};
                return cache[cacheID];
            }

            parentState = this._getTileGeometry(Math.floor(x / 2), Math.floor(y / 2), z - 1, true);

            if (parentState.isOut || parentState.isIn) {
                return parentState;
            }

            cache[cacheID] = this._getClippedGeometry(parentState.geometry, tileBbox);
            return cache[cacheID];
        },

        _drawTileInternal: function (canvas, tilePoint, url, callback) {
            var zoom = this._getZoomForUrl(),
                state = this._getTileGeometry(tilePoint.x, tilePoint.y, zoom);

            if (state.isOut) {
                callback();
                return;
            }

            var ts = this.options.tileSize,
                tileX = ts * tilePoint.x,
                tileY = ts * tilePoint.y,
                zCoeff = Math.pow(2, zoom),
                ctx = canvas.getContext('2d'),
                imageObj = new Image(),
                _this = this;

            var setPattern = function () {
                var c,
                    r,
                    p,
                    pattern,
                    geom;

                if (!state.isIn) {
                    geom = state.geometry;
                    ctx.beginPath();

                    for (c = 0; c < geom.length; c++) {
                        for (r = 0; r < geom[c].length; r++) {
                            if (geom[c][r].length === 0) {
                                continue;
                            }

                            ctx.moveTo(geom[c][r][0].x * zCoeff - tileX, geom[c][r][0].y * zCoeff - tileY);
                            for (p = 1; p < geom[c][r].length; p++) {
                                ctx.lineTo(geom[c][r][p].x * zCoeff - tileX, geom[c][r][p].y * zCoeff - tileY);
                            }
                        }
                    }
                    ctx.clip();
                }

                pattern = ctx.createPattern(imageObj, "repeat");
                ctx.beginPath();
                ctx.rect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = pattern;
                ctx.fill();
                callback();
            };

            if (this.options.crossOrigin) {
                imageObj.crossOrigin = '';
            }

            imageObj.onload = function () {
                //TODO: implement correct image loading cancelation
                canvas.complete = true; //HACK: emulate HTMLImageElement property to make happy L.TileLayer
                setTimeout(setPattern, 0); //IE9 bug - black tiles appear randomly if call setPattern() without timeout
            }

            imageObj.src = url;
        },

        onAdd: function (map) {
            (L.TileLayer.Canvas || L.TileLayer).prototype.onAdd.call(this, map);

            if (this.options.trackAttribution) {
                map.on('moveend', this._updateAttribution, this);
                this._updateAttribution();
            }
        },

        onRemove: function (map) {
            (L.TileLayer.Canvas || L.TileLayer).prototype.onRemove.call(this, map);

            if (this.options.trackAttribution) {
                map.off('moveend', this._updateAttribution, this);
                if (!this._attributionRemoved) {
                    var attribution = L.TileLayer.BoundaryCanvas.prototype.getAttribution.call(this);
                    map.attributionControl.removeAttribution(attribution);
                }
            }
        },

        _updateAttribution: function () {
            var geom = this._getOriginalMercBoundary(),
                mapBounds = this._map.getBounds(),
                mercBounds = L.bounds(this._map.project(mapBounds.getSouthWest(), 0), this._map.project(mapBounds.getNorthEast(), 0)),
                state = this._getClippedGeometry(geom, mercBounds);

            if (this._attributionRemoved !== !!state.isOut) {
                var attribution = L.TileLayer.BoundaryCanvas.prototype.getAttribution.call(this);
                this._map.attributionControl[state.isOut ? 'removeAttribution' : 'addAttribution'](attribution);
                this._attributionRemoved = !!state.isOut;
            }
        },

        _getTileUrlOgcWmts: function (coords) {
            var zoom = this._getZoomForUrl();
            var url = window.L.Util.template(this._url, {s: this._getSubdomain(coords)});
            var obj = {
                service: 'WMTS',
                request: 'GetTile',
                version: this.options.version,
                style: this.options.style,
                tilematrixSet: this.options.tilematrixSet,
                format: this.options.format,
                layer: this.options.layer,
                tilematrix: zoom,
                tilerow: coords.y,
                tilecol: coords.x
            };
            return url + window.L.Util.getParamString(obj, url);
        },

        _tileCoordsToNwSe: function (coords) {
            var map = this._map,
                tileSize = this.getTileSize(),
                nwPoint = coords.scaleBy(tileSize),
                sePoint = nwPoint.add(tileSize),
                nw = map.unproject(nwPoint, coords.z),
                se = map.unproject(sePoint, coords.z);
            return [nw, se];
        },

        _getTileUrlOgcWms: function (coords) {
            var url = window.L.Util.template(this._url, {s: this._getSubdomain(coords)});
            var tileBounds = this._tileCoordsToNwSe(coords),
                crs = this.options.crs,
                bounds = new L.Bounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])),
                min = bounds.min,
                max = bounds.max,
                bbox = (this._wmsVersion >= 1.3 && this._crs === EPSG4326 ?
                    [min.y, min.x, max.y, max.x] :
                    [min.x, min.y, max.x, max.y]).join(','),
                tileSize = this.getTileSize(),
                width = tileSize.x,
                height = tileSize.y;
            //暂时只支持V1.1.1版本
            var obj = {
                service: 'WMS',
                request: 'GetMap',
                version: this.options.version,
                layers: this.options.layers,
                styles: '',
                srs: crs.code,
                bbox: bbox,
                width: width,
                height: height,
                format: 'image/jpeg',
                transparent: false
            };
            return url + window.L.Util.getParamString(obj, url);
        },
        _getTileUrlVector: function (coords) {
            var tileBounds = this._tileCoordsToNwSe(coords);
            var crs = this._map.options.crs,
                bounds = new L.Bounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])),
                min = bounds.min,
                max = bounds.max,
                bbox = ([min.x, min.y, max.x, max.y]).join(','),
                tileSize = this.getTileSize(),
                width = tileSize.x,
                height = tileSize.y;
            var params = "?w=" + width + "&h=" + height + "&bbox=" + bbox;
            if (this.options.vector && !this.options.keepCache) {
                params += "&temp=" + Math.random();
            }
            return this._url + encodeURI(params);
        }
    };

    if (L.version >= '0.8') {
        L.TileLayer.BoundaryCanvas = L.TileLayer.extend({
            options: {
                // all rings of boundary should be without self-intersections or intersections with other rings
                // zero-winding fill algorithm is used in canvas, so holes should have opposite direction to exterior ring
                // boundary can be
                // LatLng[] - simple polygon
                // LatLng[][] - polygon with holes
                // LatLng[][][] - multipolygon
                boundary: null
            },
            includes: ExtendMethods,
            initialize: function (url, options) {
                L.TileLayer.prototype.initialize.call(this, url, options);
                this._boundaryCache = {}; //cache index "x:y:z"
                this._mercBoundary = null;
                this._mercBbox = null;

                if (options.ogc) {
                    this.ogc_wmts = options.ogc.wmts || false;
                    this.ogc_wms = options.ogc.wms || false;
                }
                if (options.vector) {
                    this.vector_layer = options.vector.layer || false;
                    this.vector_doc = options.vector.doc || false;
                }
                if (this.options.trackAttribution) {
                    this._attributionRemoved = true;
                    this.getAttribution = null;
                }
            },
            createTile: function (coords, done) {
                var tile = document.createElement('canvas'),
                    url = this.getTileUrl(coords);
                if (this.ogc_wmts) {
                    url = this._getTileUrlOgcWmts(coords);
                } else if (this.ogc_wms) {
                    url = this._getTileUrlOgcWms(coords);
                } else if (this.vector_doc || this.vector_layer) {
                    url = this._getTileUrlVector(coords);
                }
                tile.width = tile.height = this.options.tileSize;
                this._drawTileInternal(tile, coords, url, L.bind(done, null, null, tile));

                return tile;
            }
        })
    } else {
        L.TileLayer.BoundaryCanvas = L.TileLayer.Canvas.extend({
            options: {
                // all rings of boundary should be without self-intersections or intersections with other rings
                // zero-winding fill algorithm is used in canvas, so holes should have opposite direction to exterior ring
                // boundary can be
                // LatLng[] - simple polygon
                // LatLng[][] - polygon with holes
                // LatLng[][][] - multipolygon
                boundary: null
            },
            includes: ExtendMethods,
            initialize: function (url, options) {
                L.Util.setOptions(this, options);
                L.Util.setOptions(this, {async: true}); //image loading is always async
                this._url = url;
                this._boundaryCache = {}; //cache index "x:y:z"
                this._mercBoundary = null;
                this._mercBbox = null;

                if (this.options.trackAttribution) {
                    this._attributionRemoved = true;
                    this.getAttribution = null;
                }
            },

            drawTile: function (canvas, tilePoint) {
                var adjustedTilePoint = L.extend({}, tilePoint),
                    url;

                this._adjustTilePoint(adjustedTilePoint);
                url = this.getTileUrl(adjustedTilePoint);
                this._drawTileInternal(canvas, tilePoint, url, L.bind(this.tileDrawn, this, canvas));

                //Leaflet v0.7.x bugfix (L.Tile.Canvas doesn't support maxNativeZoom option)
                if (this._getTileSize() !== this.options.tileSize) {
                    canvas.style.width = canvas.style.height = this._getTileSize() + 'px';
                }
            }
        });
    }

    L.TileLayer.boundaryCanvas = function (url, options) {
        return new L.TileLayer.BoundaryCanvas(url, options);
    };

    L.TileLayer.BoundaryCanvas.createFromLayer = function (layer, options) {
        if (options.vector) {
            return new L.TileLayer.BoundaryCanvas(layer.url, L.extend({}, layer.options, options));
        } else {
            return new L.TileLayer.BoundaryCanvas(layer._url, L.extend({}, layer.options, options));
        }
    };

})();
