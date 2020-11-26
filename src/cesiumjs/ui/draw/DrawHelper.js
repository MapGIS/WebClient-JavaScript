/**
 * Created by thomas on 9/01/14.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * (c) www.geocento.com
 * www.metaaps.com
 *
 */
// static variables    
let ellipsoid = Cesium.Ellipsoid.WGS84;    
let material = Cesium.Material.fromType(Cesium.Material.ColorType);
material.uniforms.color = new Cesium.Color(1.0, 1.0, 0.0, 0.5);

let defaultShapeOptions = {
    ellipsoid: Cesium.Ellipsoid.WGS84,
    textureRotationAngle: 0.0,
    height: 0.0,
    asynchronous: true,
    show: true,
    debugShowBoundingVolume: false
}

let defaultSurfaceOptions = copyOptions(defaultShapeOptions, {
    appearance: new Cesium.EllipsoidSurfaceAppearance({
        aboveGround : false
    }),
    material : material,
    granularity: Math.PI / 180.0
});

let defaultPolygonOptions = copyOptions(defaultShapeOptions, {});
let defaultExtentOptions = copyOptions(defaultShapeOptions, {});
let defaultCircleOptions = copyOptions(defaultShapeOptions, {});
let defaultEllipseOptions = copyOptions(defaultSurfaceOptions, {rotation: 0});

let defaultPolylineOptions = copyOptions(defaultShapeOptions, {
    width: 5,
    geodesic: true,
    granularity: 10000,
    appearance: new Cesium.PolylineMaterialAppearance({
        aboveGround : false
    }),
    material : material
});

export default class DrawHelper {
    constructor(cesiumWidget) {
        this._scene = cesiumWidget.scene;
        this._tooltip = createTooltip(cesiumWidget.container);
        this._surfaces = [];

        this.initialiseHandlers();
        this.enhancePrimitives();
    }

    initialiseHandlers() {
        let scene = this._scene;
        let _self = this;
        // scene events
        let handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        function callPrimitiveCallback(name, position) {
            if(_self._handlersMuted == true) return;
            let pickedObject = scene.pick(position);
            if(pickedObject && pickedObject.primitive && pickedObject.primitive[name]) {
                pickedObject.primitive[name](position);
            }
        }
        handler.setInputAction(
            function (movement) {
                callPrimitiveCallback('leftClick', movement.position);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.setInputAction(
            function (movement) {
                callPrimitiveCallback('leftDoubleClick', movement.position);
            }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        let mouseOutObject;
        handler.setInputAction(
            function (movement) {
                if(_self._handlersMuted == true) return;
                let pickedObject = scene.pick(movement.endPosition);
                if(mouseOutObject && (!pickedObject || mouseOutObject != pickedObject.primitive)) {
                    !(mouseOutObject.isDestroyed && mouseOutObject.isDestroyed()) && mouseOutObject.mouseOut(movement.endPosition);
                    mouseOutObject = null;
                }
                if(pickedObject && pickedObject.primitive) {
                    pickedObject = pickedObject.primitive;
                    if(pickedObject.mouseOut) {
                        mouseOutObject = pickedObject;
                    }
                    if(pickedObject.mouseMove) {
                        pickedObject.mouseMove(movement.endPosition);
                    }
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        handler.setInputAction(
            function (movement) {
                callPrimitiveCallback('leftUp', movement.position);
            }, Cesium.ScreenSpaceEventType.LEFT_UP);
        handler.setInputAction(
            function (movement) {
                callPrimitiveCallback('leftDown', movement.position);
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
    }

    setListener(primitive, type, callback) {
        primitive[type] = callback;
    }

    muteHandlers(muted) {
        this._handlersMuted = muted;
    }

    // register event handling for an editable shape
    // shape should implement setEditMode and setHighlighted
    registerEditableShape(surface) {
        let _self = this;

        // handlers for interactions
        // highlight polygon when mouse is entering
        setListener(surface, 'mouseMove', function(position) {
            surface.setHighlighted(true);
            if(!surface._editMode) {
                _self._tooltip.showAt(position, "Click to edit this shape");
            }
        });
        // hide the highlighting when mouse is leaving the polygon
        setListener(surface, 'mouseOut', function(position) {
            surface.setHighlighted(false);
            _self._tooltip.setVisible(false);
        });
        setListener(surface, 'leftClick', function(position) {
            surface.setEditMode(true);
        });
    }

    startDrawing(cleanUp) {
        // undo any current edit of shapes
        this.disableAllEditMode();
        // check for cleanUp first
        if(this.editCleanUp) {
            this.editCleanUp();
        }
        this.editCleanUp = cleanUp;
        this.muteHandlers(true);
    }

    stopDrawing() {
        // check for cleanUp first
        if(this.editCleanUp) {
            this.editCleanUp();
            this.editCleanUp = null;
        }
        this.muteHandlers(false);
    }

    // make sure only one shape is highlighted at a time
    disableAllHighlights() {
        this.setHighlighted(undefined);
    }

    setHighlighted(surface) {
        if(this._highlightedSurface && !this._highlightedSurface.isDestroyed() && this._highlightedSurface != surface) {
            this._highlightedSurface.setHighlighted(false);
        }
        this._highlightedSurface = surface;
    }

    disableAllEditMode() {
        this.setEdited(undefined);
    }

    setEdited(surface) {
        if(this._editedSurface && !this._editedSurface.isDestroyed()) {
            this._editedSurface.setEditMode(false);
        }
        this._editedSurface = surface;
    }

//    Cesium.Polygon.prototype.setStrokeStyle = setStrokeStyle;
//    
//    Cesium.Polygon.prototype.drawOutline = drawOutline;
//
    
    ChangeablePrimitive = (function() {
        function _() {
        }

        initialiseOptions = function(options) {

            fillOptions(this, options);

            this._ellipsoid = undefined;
            this._granularity = undefined;
            this._height = undefined;
            this._textureRotationAngle = undefined;
            this._id = undefined;

            // set the flags to initiate a first drawing
            this._createPrimitive = true;
            this._primitive = undefined;
            this._outlinePolygon = undefined;

        }

        setAttribute = function(name, value) {
            this[name] = value;
            this._createPrimitive = true;
        };

        getAttribute = function(name) {
            return this[name];
        };

        /**
         * @private
         */
        update = function(context, frameState, commandList) {

            if (!Cesium.defined(this.ellipsoid)) {
                throw new Cesium.DeveloperError('this.ellipsoid must be defined.');
            }

            if (!Cesium.defined(this.appearance)) {
                throw new Cesium.DeveloperError('this.material must be defined.');
            }

            if (this.granularity < 0.0) {
                throw new Cesium.DeveloperError('this.granularity and scene2D/scene3D overrides must be greater than zero.');
            }

            if (!this.show) {
                return;
            }

            if (!this._createPrimitive && (!Cesium.defined(this._primitive))) {
                // No positions/hierarchy to draw
                return;
            }

            if (this._createPrimitive ||
                (this._ellipsoid !== this.ellipsoid) ||
                (this._granularity !== this.granularity) ||
                (this._height !== this.height) ||
                (this._textureRotationAngle !== this.textureRotationAngle) ||
                (this._id !== this.id)) {

                let geometry = this.getGeometry();
                if(!geometry) {
                    return;
                }

                this._createPrimitive = false;
                this._ellipsoid = this.ellipsoid;
                this._granularity = this.granularity;
                this._height = this.height;
                this._textureRotationAngle = this.textureRotationAngle;
                this._id = this.id;

                this._primitive = this._primitive && this._primitive.destroy();

                this._primitive = new Cesium.Primitive({
                    geometryInstances : new Cesium.GeometryInstance({
                        geometry : geometry,
                        id : this.id,
                        pickPrimitive : this
                    }),
                    appearance : this.appearance,
                    asynchronous : this.asynchronous
                });

                this._outlinePolygon = this._outlinePolygon && this._outlinePolygon.destroy();
                if(this.strokeColor && this.getOutlineGeometry) {
                    // create the highlighting frame
                    this._outlinePolygon = new Cesium.Primitive({
                        geometryInstances : new Cesium.GeometryInstance({
                            geometry : this.getOutlineGeometry(),
                            attributes : {
                                color : Cesium.ColorGeometryInstanceAttribute.fromColor(this.strokeColor)
                            }
                        }),
                        appearance : new Cesium.PerInstanceColorAppearance({
                            flat : true,
                            renderState : {
                                depthTest : {
                                    enabled : true
                                },
                                lineWidth : Math.min(this.strokeWidth || 4.0, context._aliasedLineWidthRange[1])
                            }
                        })
                    });
                }
            }

            let primitive = this._primitive;
            primitive.appearance.material = this.material;
            primitive.debugShowBoundingVolume = this.debugShowBoundingVolume;
            primitive.update(context, frameState, commandList);
            this._outlinePolygon && this._outlinePolygon.update(context, frameState, commandList);

        };

        isDestroyed = function() {
            return false;
        };

        destroy = function() {
            this._primitive = this._primitive && this._primitive.destroy();
            return Cesium.destroyObject(this);
        };

        setStrokeStyle = function(strokeColor, strokeWidth) {
            if(!this.strokeColor || !this.strokeColor.equals(strokeColor) || this.strokeWidth != strokeWidth) {
                this._createPrimitive = true;
                this.strokeColor = strokeColor;
                this.strokeWidth = strokeWidth;
            }
        }

        return _;
    })();

    _.ExtentPrimitive = (function() {
        function _(options) {

            if(!Cesium.defined(options.extent)) {
                throw new Cesium.DeveloperError('Extent is required');
            }

            options = copyOptions(options, defaultSurfaceOptions);

            this.initialiseOptions(options);

            this.setExtent(options.extent);

        }

        _.prototype = new ChangeablePrimitive();

        setExtent = function(extent) {
            this.setAttribute('extent', extent);
        };

        getExtent = function() {
            return this.getAttribute('extent');
        };

        getGeometry = function() {

            if (!Cesium.defined(this.extent)) {
                return;
            }

            return new Cesium.RectangleGeometry({
                rectangle : this.extent,
                height : this.height,
                vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
                stRotation : this.textureRotationAngle,
                ellipsoid : this.ellipsoid,
                granularity : this.granularity
            });
        };

        getOutlineGeometry = function() {
            return new Cesium.RectangleOutlineGeometry({
                rectangle: this.extent
            });
        }

        return _;
    })();

    _.PolygonPrimitive = (function() {
    	
        function _(options) {

            options = copyOptions(options, defaultSurfaceOptions);

            this.initialiseOptions(options);

            this.isPolygon = true;

        }

        _.prototype = new ChangeablePrimitive();

        setPositions = function(positions) {
            this.setAttribute('positions', positions);
        };

        getPositions = function() {
            return this.getAttribute('positions');
        };

        getGeometry = function() {

            if (!Cesium.defined(this.positions) || this.positions.length < 3) {
                return;
            }

            return Cesium.PolygonGeometry.fromPositions({
                positions : this.positions,
                height : this.height,
                vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
                stRotation : this.textureRotationAngle,
                ellipsoid : this.ellipsoid,
                granularity : this.granularity
            });
        };

        getOutlineGeometry = function() {
            return Cesium.PolygonOutlineGeometry.fromPositions({
                positions : this.getPositions()
            });
        }

        return _;
    })();

    _.CirclePrimitive = (function() {
    	
        function _(options) {

            if(!(Cesium.defined(options.center) && Cesium.defined(options.radius))) {
                throw new Cesium.DeveloperError('Center and radius are required');
            }

            options = copyOptions(options, defaultSurfaceOptions);

            this.initialiseOptions(options);

            this.setRadius(options.radius);

        }

        _.prototype = new ChangeablePrimitive();

        setCenter = function(center) {
            this.setAttribute('center', center);
        };

        setRadius = function(radius) {
            this.setAttribute('radius', Math.max(0.1, radius));
        };

        getCenter = function() {
            return this.getAttribute('center');
        };

        getRadius = function() {
            return this.getAttribute('radius');
        };

        getGeometry = function() {

            if (!(Cesium.defined(this.center) && Cesium.defined(this.radius))) {
                return;
            }

            return new Cesium.CircleGeometry({
                center : this.center,
                radius : this.radius,
                height : this.height,
                vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
                stRotation : this.textureRotationAngle,
                ellipsoid : this.ellipsoid,
                granularity : this.granularity
            });
        };

        getOutlineGeometry = function() {
            return new Cesium.CircleOutlineGeometry({
                center: this.getCenter(),
                radius: this.getRadius()
            });
        }

        return _;
    })();

    _.EllipsePrimitive = (function() {
        function _(options) {

            if(!(Cesium.defined(options.center) && Cesium.defined(options.semiMajorAxis) && Cesium.defined(options.semiMinorAxis))) {
                throw new Cesium.DeveloperError('Center and semi major and semi minor axis are required');
            }

            options = copyOptions(options, defaultEllipseOptions);

            this.initialiseOptions(options);

        }

        _.prototype = new ChangeablePrimitive();

        setCenter = function(center) {
            this.setAttribute('center', center);
        };

        setSemiMajorAxis = function(semiMajorAxis) {
            if(semiMajorAxis < this.getSemiMinorAxis()) return;
            this.setAttribute('semiMajorAxis', semiMajorAxis);
        };

        setSemiMinorAxis = function(semiMinorAxis) {
            if(semiMinorAxis > this.getSemiMajorAxis()) return;
            this.setAttribute('semiMinorAxis', semiMinorAxis);
        };

        setRotation = function(rotation) {
            return this.setAttribute('rotation', rotation);
        };

        getCenter = function() {
            return this.getAttribute('center');
        };

        getSemiMajorAxis = function() {
            return this.getAttribute('semiMajorAxis');
        };

        getSemiMinorAxis = function() {
            return this.getAttribute('semiMinorAxis');
        };

        getRotation = function() {
            return this.getAttribute('rotation');
        };

        getGeometry = function() {

            if(!(Cesium.defined(this.center) && Cesium.defined(this.semiMajorAxis) && Cesium.defined(this.semiMinorAxis))) {
                return;
            }

            return new Cesium.EllipseGeometry({
                        ellipsoid : this.ellipsoid,
                        center : this.center,
                        semiMajorAxis : this.semiMajorAxis,
                        semiMinorAxis : this.semiMinorAxis,
                        rotation : this.rotation,
                        height : this.height,
                        vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
                        stRotation : this.textureRotationAngle,
                        ellipsoid : this.ellipsoid,
                        granularity : this.granularity
                    });
        };

        getOutlineGeometry = function() {
            return new Cesium.EllipseOutlineGeometry({
                center: this.getCenter(),
                semiMajorAxis: this.getSemiMajorAxis(),
                semiMinorAxis: this.getSemiMinorAxis(),
                rotation: this.getRotation()
            });
        }

        return _;
    })();

    _.PolylinePrimitive = (function() {
    	
        function _(options) {

            options = copyOptions(options, defaultPolylineOptions);

            this.initialiseOptions(options);

        }

        _.prototype = new ChangeablePrimitive();

        setPositions = function(positions) {
            this.setAttribute('positions', positions);
        };

        setWidth = function(width) {
            this.setAttribute('width', width);
        };

        setGeodesic = function(geodesic) {
            this.setAttribute('geodesic', geodesic);
        };

        getPositions = function() {
            return this.getAttribute('positions');
        };

        getWidth = function() {
            return this.getAttribute('width');
        };

        getGeodesic = function(geodesic) {
            return this.getAttribute('geodesic');
        };

        getGeometry = function() {
        	
            if (!Cesium.defined(this.positions) || this.positions.length < 2) {
                return;
            }

            return new Cesium.PolylineGeometry({
                    positions: this.positions,
                    height : this.height,
                    width: this.width < 1 ? 1 : this.width,
                    vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
                    ellipsoid : this.ellipsoid
                });
        }
        
        return _;
    })();

    let defaultBillboard = {
        iconUrl: "./img/dragIcon.png",
        shiftX: 0,
        shiftY: 0
    }

    let dragBillboard = {
        iconUrl: "./img/dragIcon.png",
        shiftX: 0,
        shiftY: 0
    }

    let dragHalfBillboard = {
        iconUrl: "./img/dragIconLight.png",
        shiftX: 0,
        shiftY: 0
    }

    createBillboardGroup = function(points, options, callbacks) {
        let markers = new _.BillboardGroup(this, options);
        markers.addBillboards(points, callbacks);
        return markers;
    }

    _.BillboardGroup = function(drawHelper, options) {

        this._drawHelper = drawHelper;
        this._scene = drawHelper._scene;

        this._options = copyOptions(options, defaultBillboard);

        // create one common billboard collection for all billboards
        let b = new Cesium.BillboardCollection();
        this._scene.primitives.add(b);
        this._billboards = b;
        // keep an ordered list of billboards
        this._orderedBillboards = [];
    }

    _.BillboardGroup.prototype.createBillboard = function(position, callbacks) {

        let billboard = this._billboards.add({
            show : true,
            position : position,
            pixelOffset : new Cesium.Cartesian2(this._options.shiftX, this._options.shiftY),
            eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0),
            horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
            verticalOrigin : Cesium.VerticalOrigin.CENTER,
            scale : 1.0,
            image: this._options.iconUrl,
            color : new Cesium.Color(1.0, 1.0, 1.0, 1.0)
        });

        // if editable
        if(callbacks) {
            let _self = this;
            let screenSpaceCameraController = this._scene.screenSpaceCameraController;
            function enableRotation(enable) {
                screenSpaceCameraController.enableRotate = enable;
            }
            function getIndex() {
                // find index
                for (let i = 0, I = _self._orderedBillboards.length; i < I && _self._orderedBillboards[i] != billboard; ++i);
                return i;
            }
            if(callbacks.dragHandlers) {
                let _self = this;
                setListener(billboard, 'leftDown', function(position) {
                    // TODO - start the drag handlers here
                    // create handlers for mouseOut and leftUp for the billboard and a mouseMove
                    function onDrag(position) {
                        billboard.position = position;
                        // find index
                        for (let i = 0, I = _self._orderedBillboards.length; i < I && _self._orderedBillboards[i] != billboard; ++i);
                        callbacks.dragHandlers.onDrag && callbacks.dragHandlers.onDrag(getIndex(), position);
                    }
                    function onDragEnd(position) {
                        handler.destroy();
                        enableRotation(true);
                        callbacks.dragHandlers.onDragEnd && callbacks.dragHandlers.onDragEnd(getIndex(), position);
                    }

                    let handler = new Cesium.ScreenSpaceEventHandler(_self._scene.canvas);

                    handler.setInputAction(function(movement) {
                        let cartesian = _self._scene.camera.pickEllipsoid(movement.endPosition, ellipsoid);
                        if (cartesian) {
                            onDrag(cartesian);
                        } else {
                            onDragEnd(cartesian);
                        }
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

                    handler.setInputAction(function(movement) {
                        onDragEnd(_self._scene.camera.pickEllipsoid(movement.position, ellipsoid));
                    }, Cesium.ScreenSpaceEventType.LEFT_UP);

                    enableRotation(false);

                    callbacks.dragHandlers.onDragStart && callbacks.dragHandlers.onDragStart(getIndex(), _self._scene.camera.pickEllipsoid(position, ellipsoid));
                });
            }
            if(callbacks.onDoubleClick) {
                setListener(billboard, 'leftDoubleClick', function(position) {
                    callbacks.onDoubleClick(getIndex());
                });
            }
            if(callbacks.onClick) {
                setListener(billboard, 'leftClick', function(position) {
                    callbacks.onClick(getIndex());
                });
            }
            if(callbacks.tooltip) {
                setListener(billboard, 'mouseMove', function(position) {
                    _self._drawHelper._tooltip.showAt(position, callbacks.tooltip());
                });
                setListener(billboard, 'mouseOut', function(position) {
                    _self._drawHelper._tooltip.setVisible(false);
                });
            }
        }

        return billboard;
    }

    _.BillboardGroup.prototype.insertBillboard = function(index, position, callbacks) {
        this._orderedBillboards.splice(index, 0, this.createBillboard(position, callbacks));
    }

    _.BillboardGroup.prototype.addBillboard = function(position, callbacks) {
        this._orderedBillboards.push(this.createBillboard(position, callbacks));
    }

    _.BillboardGroup.prototype.addBillboards = function(positions, callbacks) {
        let index =  0;
        for(; index < positions.length; index++) {
            this.addBillboard(positions[index], callbacks);
        }
    }

    _.BillboardGroup.prototype.updateBillboardsPositions = function(positions) {
        let index =  0;
        for(; index < positions.length; index++) {
            this.getBillboard(index).position = positions[index];
        }
    }

    _.BillboardGroup.prototype.countBillboards = function() {
        return this._orderedBillboards.length;
    }

    _.BillboardGroup.prototype.getBillboard = function(index) {
        return this._orderedBillboards[index];
    }

    _.BillboardGroup.prototype.removeBillboard = function(index) {
        this._billboards.remove(this.getBillboard(index));
        this._orderedBillboards.splice(index, 1);
    }

    _.BillboardGroup.prototype.remove = function() {
        this._billboards = this._billboards && this._billboards.removeAll() && this._billboards.destroy();
    }

    _.BillboardGroup.prototype.setOnTop = function() {
        this._scene.primitives.raiseToTop(this._billboards);
    }

    startDrawingMarker = function(options) {

        let options = copyOptions(options, defaultBillboard);

        this.startDrawing(
            function() {
                markers.remove();
                mouseHandler.destroy();
                tooltip.setVisible(false);
            }
        );

        let _self = this;
        let scene = this._scene;
        let primitives = scene.primitives;
        let tooltip = this._tooltip;

        let markers = new _.BillboardGroup(this, options);

        let mouseHandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

        // Now wait for start
        mouseHandler.setInputAction(function(movement) {
            if(movement.position != null) {
                let cartesian = scene.camera.pickEllipsoid(movement.position, ellipsoid);
                if (cartesian) {
                    markers.addBillboard(cartesian);
                    _self.stopDrawing();
                    options.callback(cartesian);
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        mouseHandler.setInputAction(function(movement) {
            let position = movement.endPosition;
            if(position != null) {
                let cartesian = scene.camera.pickEllipsoid(position, ellipsoid);
                if (cartesian) {
                    tooltip.showAt(position, "<p>Click to add your marker. Position is: </p>" + getDisplayLatLngString(ellipsoid.cartesianToCartographic(cartesian)));
                } else {
                    tooltip.showAt(position, "<p>Click on the globe to add your marker.</p>");
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    }

    startDrawingPolygon = function(options) {
        let options = copyOptions(options, defaultSurfaceOptions);
        this.startDrawingPolyshape(true, options);
    }

    startDrawingPolyline = function(options) {
        let options = copyOptions(options, defaultPolylineOptions);
        this.startDrawingPolyshape(false, options);
    }

    startDrawingPolyshape = function(isPolygon, options) {

        this.startDrawing(
            function() {
                primitives.remove(poly);
                markers.remove();
                mouseHandler.destroy();
                tooltip.setVisible(false);
            }
        );

        let _self = this;
        let scene = this._scene;
        let primitives = scene.primitives;
        let tooltip = this._tooltip;

        let minPoints = isPolygon ? 3 : 2;
        let poly;
        if(isPolygon) {
            poly = new DrawHelper.PolygonPrimitive(options);
        } else {
            poly = new DrawHelper.PolylinePrimitive(options);
        }
        poly.asynchronous = false;
        primitives.add(poly);

        let positions = [];
        let markers = new _.BillboardGroup(this, defaultBillboard);

        let mouseHandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

        // Now wait for start
        mouseHandler.setInputAction(function(movement) {
            if(movement.position != null) {
                let cartesian = scene.camera.pickEllipsoid(movement.position, ellipsoid);
                if (cartesian) {
                    // first click
                    if(positions.length == 0) {
                        positions.push(cartesian.clone());
                        markers.addBillboard(positions[0]);
                    }
                    if(positions.length >= minPoints) {
                        poly.positions = positions;
                        poly._createPrimitive = true;
                    }
                    // add new point to polygon
                    // this one will move with the mouse
                    positions.push(cartesian);
                    // add marker at the new position
                    markers.addBillboard(cartesian);
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        mouseHandler.setInputAction(function(movement) {
            let position = movement.endPosition;
            if(position != null) {
                if(positions.length == 0) {
                    tooltip.showAt(position, "<p>Click to add first point</p>");
                } else {
                    let cartesian = scene.camera.pickEllipsoid(position, ellipsoid);
                    if (cartesian) {
                        positions.pop();
                        // make sure it is slightly different
                        cartesian.y += (1 + Math.random());
                        positions.push(cartesian);
                        if(positions.length >= minPoints) {
                            poly.positions = positions;
                            poly._createPrimitive = true;
                        }
                        // update marker
                        markers.getBillboard(positions.length - 1).position = cartesian;
                        // show tooltip
                        tooltip.showAt(position, "<p>Click to add new point (" + positions.length + ")</p>" + (positions.length > minPoints ? "<p>Double click to finish drawing</p>" : ""));
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        mouseHandler.setInputAction(function(movement) {
            let position = movement.position;
            if(position != null) {
                if(positions.length < minPoints + 2) {
                    return;
                } else {
                    let cartesian = scene.camera.pickEllipsoid(position, ellipsoid);
                    if (cartesian) {
                        _self.stopDrawing();
                        if(typeof options.callback == 'function') {
                            // remove overlapping ones
                            let index = positions.length - 1;
                            options.callback(positions);
                        }
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

    }

    function getExtentCorners(value) {
        return ellipsoid.cartographicArrayToCartesianArray([Cesium.Rectangle.northwest(value), Cesium.Rectangle.northeast(value), Cesium.Rectangle.southeast(value), Cesium.Rectangle.southwest(value)]);
    }

    startDrawingExtent = function(options) {

        let options = copyOptions(options, defaultSurfaceOptions);

        this.startDrawing(
            function() {
                if(extent != null) {
                    primitives.remove(extent);
                }
                markers.remove();
                mouseHandler.destroy();
                tooltip.setVisible(false);
            }
        );

        let _self = this;
        let scene = this._scene;
        let primitives = this._scene.primitives;
        let tooltip = this._tooltip;

        let firstPoint = null;
        let extent = null;
        let markers = null;

        let mouseHandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

        function updateExtent(value) {
            if(extent == null) {
                extent = new Cesium.RectanglePrimitive();
                extent.asynchronous = false;
                primitives.add(extent);
            }
            extent.rectangle = value;
            // update the markers
            let corners = getExtentCorners(value);
            // create if they do not yet exist
            if(markers == null) {
                markers = new _.BillboardGroup(_self, defaultBillboard);
                markers.addBillboards(corners);
            } else {
                markers.updateBillboardsPositions(corners);
            }
         }

        // Now wait for start
        mouseHandler.setInputAction(function(movement) {
            if(movement.position != null) {
                let cartesian = scene.camera.pickEllipsoid(movement.position, ellipsoid);
                if (cartesian) {
                    if(extent == null) {
                        // create the rectangle
                        firstPoint = ellipsoid.cartesianToCartographic(cartesian);
                        let value = getExtent(firstPoint, firstPoint);
                        updateExtent(value);
                     } else {
                        _self.stopDrawing();
                        if(typeof options.callback == 'function') {
                            options.callback(getExtent(firstPoint, ellipsoid.cartesianToCartographic(cartesian)));
                        }
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

        mouseHandler.setInputAction(function(movement) {
            let position = movement.endPosition;
            if(position != null) {
                if(extent == null) {
                    tooltip.showAt(position, "<p>Click to start drawing rectangle</p>");
                } else {
                    let cartesian = scene.camera.pickEllipsoid(position, ellipsoid);
                    if (cartesian) {
                        let value = getExtent(firstPoint, ellipsoid.cartesianToCartographic(cartesian));
                        updateExtent(value);
                        tooltip.showAt(position, "<p>Drag to change rectangle extent</p><p>Click again to finish drawing</p>");
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    }

    startDrawingCircle = function(options) {

        let options = copyOptions(options, defaultSurfaceOptions);

        this.startDrawing(
            function cleanUp() {
                if(circle != null) {
                    primitives.remove(circle);
                }
                markers.remove();
                mouseHandler.destroy();
                tooltip.setVisible(false);
            }
        );

        let _self = this;
        let scene = this._scene;
        let primitives = this._scene.primitives;
        let tooltip = this._tooltip;

        let circle = null;
        let markers = null;

        let mouseHandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

        // Now wait for start
        mouseHandler.setInputAction(function(movement) {
            if(movement.position != null) {
                let cartesian = scene.camera.pickEllipsoid(movement.position, ellipsoid);
                if (cartesian) {
                    if(circle == null) {
                        // create the circle
                        circle = new _.CirclePrimitive({
                            center: cartesian,
                            radius: 0,
                            asynchronous: false,
                            material : options.material
                        });
                        primitives.add(circle);
                        markers = new _.BillboardGroup(_self, defaultBillboard);
                        markers.addBillboards([cartesian]);
                    } else {
                        if(typeof options.callback == 'function') {
                            options.callback(circle.getCenter(), circle.getRadius());
                        }
                        _self.stopDrawing();
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

        mouseHandler.setInputAction(function(movement) {
            let position = movement.endPosition;
            if(position != null) {
                if(circle == null) {
                    tooltip.showAt(position, "<p>Click to start drawing the circle</p>");
                } else {
                    let cartesian = scene.camera.pickEllipsoid(position, ellipsoid);
                    if (cartesian) {
                        circle.setRadius(Cesium.Cartesian3.distance(circle.getCenter(), cartesian));
                        markers.updateBillboardsPositions(cartesian);
                        tooltip.showAt(position, "<p>Move mouse to change circle radius</p><p>Click again to finish drawing</p>");
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    }

    enhancePrimitives = function() {

        let drawHelper = this;

        Cesium.Billboard.prototype.setEditable = function() {

            if(this._editable) {
                return;
            }

            this._editable = true;

            let billboard = this;

            let _self = this;

            function enableRotation(enable) {
                drawHelper._scene.screenSpaceCameraController.enableRotate = enable;
            }

            setListener(billboard, 'leftDown', function(position) {
                // TODO - start the drag handlers here
                // create handlers for mouseOut and leftUp for the billboard and a mouseMove
                function onDrag(position) {
                    billboard.position = position;
                    _self.executeListeners({name: 'drag', positions: position});
                }
                function onDragEnd(position) {
                    handler.destroy();
                    enableRotation(true);
                    _self.executeListeners({name: 'dragEnd', positions: position});
                }

                let handler = new Cesium.ScreenSpaceEventHandler(drawHelper._scene.canvas);

                handler.setInputAction(function(movement) {
                    let cartesian = drawHelper._scene.camera.pickEllipsoid(movement.endPosition, ellipsoid);
                    if (cartesian) {
                        onDrag(cartesian);
                    } else {
                        onDragEnd(cartesian);
                    }
                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

                handler.setInputAction(function(movement) {
                    onDragEnd(drawHelper._scene.camera.pickEllipsoid(movement.position, ellipsoid));
                }, Cesium.ScreenSpaceEventType.LEFT_UP);

                enableRotation(false);

            });

            enhanceWithListeners(billboard);

        }
        
        function setHighlighted(highlighted) {

            let scene = drawHelper._scene;

            // if no change
            // if already highlighted, the outline polygon will be available
            if(this._highlighted && this._highlighted == highlighted) {
                return;
            }
            // disable if already in edit mode
            if(this._editMode === true) {
                return;
            }
        	this._highlighted = highlighted;
            // highlight by creating an outline polygon matching the polygon points
            if(highlighted) {
                // make sure all other shapes are not highlighted
                drawHelper.setHighlighted(this);
                this._strokeColor = this.strokeColor;
                this.setStrokeStyle(Cesium.Color.fromCssColorString('white'), this.strokeWidth);
            } else {
                if(this._strokeColor) {
                    this.setStrokeStyle(this._strokeColor, this.strokeWidth);
                } else {
                    this.setStrokeStyle(undefined, undefined);
                }
            }
        }

        function setEditMode(editMode) {
                // if no change
                if(this._editMode == editMode) {
                    return;
                }
                // make sure all other shapes are not in edit mode before starting the editing of this shape
                drawHelper.disableAllHighlights();
                // display markers
                if(editMode) {
                    drawHelper.setEdited(this);
                    let scene = drawHelper._scene;
                    let _self = this;
                    // create the markers and handlers for the editing
                    if(this._markers == null) {
                        let markers = new _.BillboardGroup(drawHelper, dragBillboard);
                        let editMarkers = new _.BillboardGroup(drawHelper, dragHalfBillboard);
                        // function for updating the edit markers around a certain point
                        function updateHalfMarkers(index, positions) {
                            // update the half markers before and after the index
                            let editIndex = index - 1 < 0 ? positions.length - 1 : index - 1;
                            if(editIndex < editMarkers.countBillboards()) {
                                editMarkers.getBillboard(editIndex).position = calculateHalfMarkerPosition(editIndex);
                            }
                            editIndex = index;
                            if(editIndex < editMarkers.countBillboards()) {
                                editMarkers.getBillboard(editIndex).position = calculateHalfMarkerPosition(editIndex);
                            }
                        }
                        function onEdited() {
                            _self.executeListeners({name: 'onEdited', positions: _self.positions});
                        }
                        let handleMarkerChanges = {
                            dragHandlers: {
                                onDrag: function(index, position) {
                                    _self.positions[index] = position;
                                    updateHalfMarkers(index, _self.positions);
                                    _self._createPrimitive = true;
                                },
                                onDragEnd: function(index, position) {
                                    _self._createPrimitive = true;
                                    onEdited();
                                }
                            },
                            onDoubleClick: function(index) {
                                if(_self.positions.length < 4) {
                                    return;
                                }
                                // remove the point and the corresponding markers
                                _self.positions.splice(index, 1);
                                _self._createPrimitive = true;
                                markers.removeBillboard(index);
                                editMarkers.removeBillboard(index);
                                updateHalfMarkers(index, _self.positions);
                                onEdited();
                            },
                            tooltip: function() {
                                if(_self.positions.length > 3) {
                                    return "Double click to remove this point";
                                }
                            }
                        };
                        // add billboards and keep an ordered list of them for the polygon edges
                        markers.addBillboards(_self.positions, handleMarkerChanges);
                        this._markers = markers;
                        function calculateHalfMarkerPosition(index) {
                            let positions = _self.positions;
                            return ellipsoid.cartographicToCartesian(
                                new Cesium.EllipsoidGeodesic(ellipsoid.cartesianToCartographic(positions[index]),
                                    ellipsoid.cartesianToCartographic(positions[index < positions.length - 1 ? index + 1 : 0])).
                                    interpolateUsingFraction(0.5)
                            );
                        }
                        let halfPositions = [];
                        let index = 0;
                        let length = _self.positions.length + (this.isPolygon ? 0 : -1);
                        for(; index < length; index++) {
                            halfPositions.push(calculateHalfMarkerPosition(index));
                        }
                        let handleEditMarkerChanges = {
                            dragHandlers: {
                                onDragStart: function(index, position) {
                                    // add a new position to the polygon but not a new marker yet
                                    this.index = index + 1;
                                    _self.positions.splice(this.index, 0, position);
                                    _self._createPrimitive = true;
                                },
                                onDrag: function(index, position) {
                                    _self.positions[this.index] = position;
                                    _self._createPrimitive = true;
                                },
                                onDragEnd: function(index, position) {
                                    // create new sets of makers for editing
                                    markers.insertBillboard(this.index, position, handleMarkerChanges);
                                    editMarkers.getBillboard(this.index - 1).position = calculateHalfMarkerPosition(this.index - 1);
                                    editMarkers.insertBillboard(this.index, calculateHalfMarkerPosition(this.index), handleEditMarkerChanges);
                                    _self._createPrimitive = true;
                                    onEdited();
                                }
                            },
                            tooltip: function() {
                                return "Drag to create a new point";
                            }
                        };
                        editMarkers.addBillboards(halfPositions, handleEditMarkerChanges);
                        this._editMarkers = editMarkers;
                        // add a handler for clicking in the globe
                        this._globeClickhandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
                        this._globeClickhandler.setInputAction(
                            function (movement) {
                                let pickedObject = scene.pick(movement.position);
                                if(!(pickedObject && pickedObject.primitive)) {
                                    _self.setEditMode(false);
                                }
                            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

                        // set on top of the polygon
                        markers.setOnTop();
                        editMarkers.setOnTop();
                    }
                    this._editMode = true;
                } else {
                    if(this._markers != null) {
                        this._markers.remove();
                        this._editMarkers.remove();
                        this._markers = null;
                        this._editMarkers = null;
                        this._globeClickhandler.destroy();
                    }
                    this._editMode = false;
                }

        }

        DrawHelper.PolylinePrimitive.prototype.setEditable = function() {

            if(this.setEditMode) {
                return;
            }

             let polyline = this;
            polyline.isPolygon = false;
            polyline.asynchronous = false;

            drawHelper.registerEditableShape(polyline);

            polyline.setEditMode = setEditMode;

            let originalWidth = this.width;

            polyline.setHighlighted = function(highlighted) {
                // disable if already in edit mode
                if(this._editMode === true) {
                    return;
                }
                if(highlighted) {
                    drawHelper.setHighlighted(this);
                    this.setWidth(originalWidth * 2);
                } else {
                    this.setWidth(originalWidth);
                }
            }

            polyline.getExtent = function() {
                return Cesium.Extent.fromCartographicArray(ellipsoid.cartesianArrayToCartographicArray(this.positions));
            }

            enhanceWithListeners(polyline);

            polyline.setEditMode(false);

        }

        DrawHelper.PolygonPrimitive.prototype.setEditable = function() {

            let polygon = this;
            polygon.asynchronous = false;

            let scene = drawHelper._scene;

            drawHelper.registerEditableShape(polygon);

            polygon.setEditMode = setEditMode;

            polygon.setHighlighted = setHighlighted;

            enhanceWithListeners(polygon);

            polygon.setEditMode(false);

        }

        DrawHelper.ExtentPrimitive.prototype.setEditable = function() {

            if(this.setEditMode) {
                return;
            }

            let extent = this;
            let scene = drawHelper._scene;

            drawHelper.registerEditableShape(extent);
            extent.asynchronous = false;

            extent.setEditMode = function(editMode) {
                // if no change
                if(this._editMode == editMode) {
                    return;
                }
                drawHelper.disableAllHighlights();
                // display markers
                if(editMode) {
                    // make sure all other shapes are not in edit mode before starting the editing of this shape
                    drawHelper.setEdited(this);
                    // create the markers and handlers for the editing
                    if(this._markers == null) {
                        let markers = new _.BillboardGroup(drawHelper, dragBillboard);
                        function onEdited() {
                            extent.executeListeners({name: 'onEdited', extent: extent.extent});
                        }
                        let handleMarkerChanges = {
                            dragHandlers: {
                                onDrag: function(index, position) {
                                    let corner = markers.getBillboard((index + 2) % 4).position;
                                    extent.setExtent(getExtent(ellipsoid.cartesianToCartographic(corner), ellipsoid.cartesianToCartographic(position)));
                                    markers.updateBillboardsPositions(getExtentCorners(extent.extent));
                                },
                                onDragEnd: function(index, position) {
                                    onEdited();
                                }
                            },
                            tooltip: function() {
                                return "Drag to change the corners of this extent";
                            }
                        };
                        markers.addBillboards(getExtentCorners(extent.extent), handleMarkerChanges);
                        this._markers = markers;
                        // add a handler for clicking in the globe
                        this._globeClickhandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
                        this._globeClickhandler.setInputAction(
                            function (movement) {
                                let pickedObject = scene.pick(movement.position);
                                // disable edit if pickedobject is different or not an object
                                if(!(pickedObject && !pickedObject.isDestroyed() && pickedObject.primitive)) {
                                    extent.setEditMode(false);
                                }
                            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

                        // set on top of the polygon
                        markers.setOnTop();
                    }
                    this._editMode = true;
                } else {
                    if(this._markers != null) {
                        this._markers.remove();
                        this._markers = null;
                        this._globeClickhandler.destroy();
                    }
                    this._editMode = false;
                }
            }

            extent.setHighlighted = setHighlighted;

            enhanceWithListeners(extent);

            extent.setEditMode(false);

        }

        _.EllipsePrimitive.prototype.setEditable = function() {

            if(this.setEditMode) {
                return;
            }

            let ellipse = this;
            let scene = drawHelper._scene;

            ellipse.asynchronous = false;

            drawHelper.registerEditableShape(ellipse);

            ellipse.setEditMode = function(editMode) {
                // if no change
                if(this._editMode == editMode) {
                    return;
                }
                drawHelper.disableAllHighlights();
                // display markers
                if(editMode) {
                    // make sure all other shapes are not in edit mode before starting the editing of this shape
                    drawHelper.setEdited(this);
                    let _self = this;
                    // create the markers and handlers for the editing
                    if(this._markers == null) {
                        let markers = new _.BillboardGroup(drawHelper, dragBillboard);
                        function getMarkerPositions() {
                            return Cesium.Shapes.computeEllipseBoundary(ellipsoid, ellipse.getCenter(), ellipse.getSemiMajorAxis(), ellipse.getSemiMinorAxis(), ellipse.getRotation() + Math.PI / 2, Math.PI / 2.0).splice(0, 4);
                        }
                        function onEdited() {
                            ellipse.executeListeners({name: 'onEdited', center: ellipse.getCenter(), semiMajorAxis: ellipse.getSemiMajorAxis(), semiMinorAxis: ellipse.getSemiMinorAxis(), rotation: 0});
                        }
                        let handleMarkerChanges = {
                            dragHandlers: {
                                onDrag: function(index, position) {
                                    let distance = Cesium.Cartesian3.distance(ellipse.getCenter(), position);
                                    if(index%2 == 0) {
                                        ellipse.setSemiMajorAxis(distance);
                                    } else {
                                        ellipse.setSemiMinorAxis(distance);
                                    }
                                    markers.updateBillboardsPositions(getMarkerPositions());
                                },
                                onDragEnd: function(index, position) {
                                    onEdited();
                                }
                            },
                            tooltip: function() {
                                return "Drag to change the excentricity and radius";
                            }
                        };
                        markers.addBillboards(getMarkerPositions(), handleMarkerChanges);
                        this._markers = markers;
                        // add a handler for clicking in the globe
                        this._globeClickhandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
                        this._globeClickhandler.setInputAction(
                            function (movement) {
                                let pickedObject = scene.pick(movement.position);
                                if(!(pickedObject && pickedObject.primitive)) {
                                    _self.setEditMode(false);
                                }
                            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

                        // set on top of the polygon
                        markers.setOnTop();
                    }
                    this._editMode = true;
                } else {
                    if(this._markers != null) {
                        this._markers.remove();
                        this._markers = null;
                        this._globeClickhandler.destroy();
                    }
                    this._editMode = false;
                }
            }

            ellipse.setHighlighted = setHighlighted;

            enhanceWithListeners(ellipse);

            ellipse.setEditMode(false);
        }

        _.CirclePrimitive.prototype.getCircleCartesianCoordinates = function (granularity) {
            let geometry = Cesium.CircleOutlineGeometry.createGeometry(new Cesium.CircleOutlineGeometry({ellipsoid: ellipsoid, center: this.getCenter(), radius: this.getRadius(), granularity: granularity}));
            let count = 0, value, values = [];
            for(; count < geometry.attributes.position.values.length; count+=3) {
                value = geometry.attributes.position.values;
                values.push(new Cesium.Cartesian3(value[count], value[count + 1], value[count + 2]));
            }
            return values;
        };

        _.CirclePrimitive.prototype.setEditable = function() {

            if(this.setEditMode) {
                return;
            }

            let circle = this;
            let scene = drawHelper._scene;

            circle.asynchronous = false;

            drawHelper.registerEditableShape(circle);

            circle.setEditMode = function(editMode) {
                // if no change
                if(this._editMode == editMode) {
                    return;
                }
                drawHelper.disableAllHighlights();
                // display markers
                if(editMode) {
                    // make sure all other shapes are not in edit mode before starting the editing of this shape
                    drawHelper.setEdited(this);
                    let _self = this;
                    // create the markers and handlers for the editing
                    if(this._markers == null) {
                        let markers = new _.BillboardGroup(drawHelper, dragBillboard);
                        function getMarkerPositions() {
                            return _self.getCircleCartesianCoordinates(Cesium.Math.PI_OVER_TWO);
                        }
                        function onEdited() {
                            circle.executeListeners({name: 'onEdited', center: circle.getCenter(), radius: circle.getRadius()});
                        }
                        let handleMarkerChanges = {
                            dragHandlers: {
                                onDrag: function(index, position) {
                                    circle.setRadius(Cesium.Cartesian3.distance(circle.getCenter(), position));
                                    markers.updateBillboardsPositions(getMarkerPositions());
                                },
                                onDragEnd: function(index, position) {
                                    onEdited();
                                }
                            },
                            tooltip: function() {
                                return "Drag to change the radius";
                            }
                        };
                        markers.addBillboards(getMarkerPositions(), handleMarkerChanges);
                        this._markers = markers;
                        // add a handler for clicking in the globe
                        this._globeClickhandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
                        this._globeClickhandler.setInputAction(
                            function (movement) {
                                let pickedObject = scene.pick(movement.position);
                                if(!(pickedObject && pickedObject.primitive)) {
                                    _self.setEditMode(false);
                                }
                            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

                        // set on top of the polygon
                        markers.setOnTop();
                    }
                    this._editMode = true;
                } else {
                    if(this._markers != null) {
                        this._markers.remove();
                        this._markers = null;
                        this._globeClickhandler.destroy();
                    }
                    this._editMode = false;
                }
            }

            circle.setHighlighted = setHighlighted;

            enhanceWithListeners(circle);

            circle.setEditMode(false);
        }

    }

    _.DrawHelperWidget = (function() {

        // constructor
        function _(drawHelper, options) {

            // container must be specified
            if(!(Cesium.defined(options.container))) {
                throw new Cesium.DeveloperError('Container is required');
            }

            let drawOptions = {
                markerIcon: "./img/glyphicons_242_google_maps.png",
                polylineIcon: "./img/glyphicons_097_vector_path_line.png",
                polygonIcon: "./img/glyphicons_096_vector_path_polygon.png",
                circleIcon: "./img/glyphicons_095_vector_path_circle.png",
                extentIcon: "./img/glyphicons_094_vector_path_square.png",
                clearIcon: "./img/glyphicons_067_cleaning.png",
                polylineDrawingOptions: defaultPolylineOptions,
                polygonDrawingOptions: defaultPolygonOptions,
                extentDrawingOptions: defaultExtentOptions,
                circleDrawingOptions: defaultCircleOptions
            };

            fillOptions(options, drawOptions);

            let _self = this;

            let toolbar = document.createElement('DIV');
            toolbar.className = "toolbar";
            options.container.appendChild(toolbar);

            function addIcon(id, url, title, callback) {
                let div = document.createElement('DIV');
                div.className = 'button';
                div.title = title;
                toolbar.appendChild(div);
                div.onclick = callback;
                let span = document.createElement('SPAN');
                div.appendChild(span);
                let image = document.createElement('IMG');
                image.src = url;
                span.appendChild(image);
                return div;
            }

            let scene = drawHelper._scene;

            addIcon('marker', options.markerIcon, 'Click to start drawing a 2D marker', function() {
                drawHelper.startDrawingMarker({
                    callback: function(position) {
                        _self.executeListeners({name: 'markerCreated', position: position});
                    }
                });
            })

            addIcon('polyline', options.polylineIcon, 'Click to start drawing a 2D polyline', function() {
                drawHelper.startDrawingPolyline({
                    callback: function(positions) {
                        _self.executeListeners({name: 'polylineCreated', positions: positions});
                    }
                });
            })

            addIcon('polygon', options.polygonIcon, 'Click to start drawing a 2D polygon', function() {
                drawHelper.startDrawingPolygon({
                    callback: function(positions) {
                        _self.executeListeners({name: 'polygonCreated', positions: positions});
                    }
                });
            })

            addIcon('extent', options.extentIcon, 'Click to start drawing an Extent', function() {
                drawHelper.startDrawingExtent({
                    callback: function(extent) {
                        _self.executeListeners({name: 'extentCreated', extent: extent});
                    }
                });
            })

            addIcon('circle', options.circleIcon, 'Click to start drawing a Circle', function() {
                drawHelper.startDrawingCircle({
                    callback: function(center, radius) {
                        _self.executeListeners({name: 'circleCreated', center: center, radius: radius});
                    }
                });
            })

            // add a clear button at the end
            // add a divider first
            let div = document.createElement('DIV');
            div.className = 'divider';
            toolbar.appendChild(div);
            addIcon('clear', options.clearIcon, 'Remove all primitives', function() {
                scene.primitives.removeAll();
            });

            enhanceWithListeners(this);

        }

        return _;

    })();

    addToolbar = function(container, options) {
        options = copyOptions(options, {container: container});
        return new _.DrawHelperWidget(this, options);
    }

    function getExtent(mn, mx) {
        let e = new Cesium.Rectangle();

        // Re-order so west < east and south < north
        e.west = Math.min(mn.longitude, mx.longitude);
        e.east = Math.max(mn.longitude, mx.longitude);
        e.south = Math.min(mn.latitude, mx.latitude);
        e.north = Math.max(mn.latitude, mx.latitude);

        // Check for approx equal (shouldn't require abs due to re-order)
        let epsilon = Cesium.Math.EPSILON7;

        if ((e.east - e.west) < epsilon) {
            e.east += epsilon * 2.0;
        }

        if ((e.north - e.south) < epsilon) {
            e.north += epsilon * 2.0;
        }

        return e;
    };

    function createTooltip(frameDiv) {

        let tooltip = function(frameDiv) {

            let div = document.createElement('DIV');
            div.className = "twipsy right";

            let arrow = document.createElement('DIV');
            arrow.className = "twipsy-arrow";
            div.appendChild(arrow);

            let title = document.createElement('DIV');
            title.className = "twipsy-inner";
            div.appendChild(title);

            this._div = div;
            this._title = title;

            // add to frame div and display coordinates
            frameDiv.appendChild(div);
        }

        tooltip.prototype.setVisible = function(visible) {
            this._div.style.display = visible ? 'block' : 'none';
        }

        tooltip.prototype.showAt = function(position, message) {
            if(position && message) {
                this.setVisible(true);
                this._title.innerHTML = message;
                this._div.style.left = position.x + 10 + "px";
                this._div.style.top = (position.y - this._div.clientHeight / 2) + "px";
            }
        }

        return new tooltip(frameDiv);
    }

    function getDisplayLatLngString(cartographic, precision) {
        return cartographic.longitude.toFixed(precision || 3) + ", " + cartographic.latitude.toFixed(precision || 3);
    }

    function clone(from, to) {
        if (from == null || typeof from != "object") return from;
        if (from.constructor != Object && from.constructor != Array) return from;
        if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
            from.constructor == String || from.constructor == Number || from.constructor == Boolean)
            return new from.constructor(from);

        to = to || new from.constructor();

        for (let name in from) {
            to[name] = typeof to[name] == "undefined" ? clone(from[name], null) : to[name];
        }

        return to;
    }
    
    function fillOptions(options, defaultOptions) {
        options = options || {};
        let option;
        for(option in defaultOptions) {
            if(options[option] === undefined) {
                options[option] = clone(defaultOptions[option]);
            }
        }
    }

    // shallow copy
    function copyOptions(options, defaultOptions) {
        let newOptions = clone(options), option;
        for(option in defaultOptions) {
            if(newOptions[option] === undefined) {
                newOptions[option] = clone(defaultOptions[option]);
            }
        }
        return newOptions;
    }

    function setListener(primitive, type, callback) {
        primitive[type] = callback;
    }

    function enhanceWithListeners(element) {

        element._listeners = {};

        element.addListener = function(name, callback) {
            this._listeners[name] = (this._listeners[name] || []);
            this._listeners[name].push(callback);
            return this._listeners[name].length;
        }

        element.executeListeners = function(event, defaultCallback) {
            if(this._listeners[event.name] && this._listeners[event.name].length > 0) {
                let index = 0;
                for(;index < this._listeners[event.name].length; index++) {
                    this._listeners[event.name][index](event);
                }
            } else {
                if(defaultCallback) {
                    defaultCallback(event);
                }
            }
        }

    }
}

