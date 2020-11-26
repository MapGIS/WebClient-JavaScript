let ChangeablePrimitive = (function() {
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
