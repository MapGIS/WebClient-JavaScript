/**
 * @param {Cartesian3[]} options.positions The positions of the polyline
 * @param {Color} options.color The color of the line
 * @param {Boolean} [options.show=true] Whether the primitive is visible
 * @param {Object} [options.id] An id for the primitive
 * @param {Boolean} [options.loop=false] True if the polyline should loop
 * @param {Boolean} [options.arrow=false] True if the arrow material should be used
 * @param {Boolean} [options.width] The width of the polyline
 * @param {Boolean} [options.depthFail=true] True if a depthfail material should be used
 */
export function AxisLinePrimitive(options) {
    Cesium.Check.defined('options', options);
    Cesium.Check.defined('options.positions', options.positions);
    Cesium.Check.defined('options.color', options.color);

    this.show = Cesium.defaultValue(options.show, true);
    this.id = options.id;

    var { positions } = options;
    if (options.loop) {
        positions = positions.slice();
        positions.push(positions[0]);
    }
    var isArrow = Cesium.defaultValue(options.arrow, false);
    // eslint-disable-next-line no-nested-ternary
    this._width = Cesium.defined(options.width) ? options.width : isArrow ? 25 : 8;
    this._color = options.color;
    this._depthFailColor = options.color.withAlpha(0.3);
    this._positions = positions;
    this._arrow = isArrow;
    this._depthFail = Cesium.defaultValue(options.depthFail, true);

    this._primitive = undefined;
    this._boundingSphere = Cesium.BoundingSphere.fromPoints(positions);
    this._transformedBoundingSphere = Cesium.BoundingSphere.clone(this._boundingSphere);
    this._modelMatrix = Cesium.Matrix4.clone(Cesium.Matrix4.IDENTITY);

    this._update = true;
}

Object.defineProperties(AxisLinePrimitive.prototype, {
    modelMatrix: {
        get: function get() {
            return this._modelMatrix;
        },
        set: function set(value) {
            if (Cesium.Matrix4.equalsEpsilon(value, this._modelMatrix, Cesium.Math.EPSILON10)) {
                return;
            }
            this._modelMatrix = Cesium.Matrix4.clone(value, this._modelMatrix);
            this._update = true;
        }
    },
    positions: {
        get: function get() {
            return this._positions;
        },
        set: function set(positions) {
            this._positions = positions;
            this._update = true;
        }
    },
    color: {
        get: function get() {
            return this._color;
        }
    },
    width: {
        get: function get() {
            return this._width;
        }
    },
    boundingVolume: {
        get: function get() {
            return this._transformedBoundingSphere;
        }
    }
});

AxisLinePrimitive.prototype.update = function (frameState) {
    if (!this.show) {
        return;
    }

    if (this._update) {
        this._update = false;
        this._primitive = this._primitive && this._primitive.destroy();

        var geometry = new Cesium.PolylineGeometry({
            positions: this._positions,
            width: this._width,
            vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
            arcType: Cesium.ArcType.NONE
        });

        var appearance1;
        var appearance2;
        if (this._arrow) {
            appearance1 = new Cesium.PolylineMaterialAppearance({
                material: Cesium.Material.fromType(Cesium.Material.PolylineArrowType, {
                    color: this._color
                })
            });
            if (this._depthFail) {
                appearance2 = new Cesium.PolylineMaterialAppearance({
                    material: Cesium.Material.fromType(Cesium.Material.PolylineArrowType, {
                        color: this._depthFailColor
                    })
                });
            }
        } else {
            appearance1 = new Cesium.PolylineColorAppearance({
                translucent: this._color.alpha !== 1.0
            });
            if (this._depthFail) {
                appearance2 = new Cesium.PolylineColorAppearance({
                    translucent: this._depthFailColor.alpha !== 1.0
                });
            }
        }

        var modelMatrix = this._modelMatrix;
        this._primitive = new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: geometry,
                attributes: {
                    color: Cesium.ColorGeometryInstanceAttribute.fromColor(this._color),
                    depthFailColor: Cesium.ColorGeometryInstanceAttribute.fromColor(this._depthFailColor)
                },
                id: this.id,
                modelMatrix: modelMatrix
            }),
            appearance: appearance1,
            depthFailAppearance: appearance2,
            asynchronous: false,
        });
        this._transformedBoundingSphere = Cesium.BoundingSphere.transform(this._boundingSphere, modelMatrix, this._transformedBoundingSphere);
    }

    this._primitive.update(frameState);
};

AxisLinePrimitive.prototype.isDestroyed = function () {
    return false;
};

AxisLinePrimitive.prototype.destroy = function () {
    this._primitive = this._primitive && this._primitive.destroy();
    return Cesium.destroyObject(this);
};

export default class TransformAxis {
    static getValue(axis) {
        if (axis === TransformAxis.X) {
            return Cesium.Cartesian3.UNIT_X;
        } if (axis === TransformAxis.Y) {
            return Cesium.Cartesian3.UNIT_Y;
        }
        return Cesium.Cartesian3.UNIT_Z;
    }

    static getColor(axis) {
        if (axis === TransformAxis.X) {
            return Cesium.Color.RED;
        } if (axis === TransformAxis.Y) {
            return Cesium.Color.GREEN;
        }
        return Cesium.Color.BLUE;
    }

    static getAxisPrimitive(axis) {
        return new AxisLinePrimitive({
            positions: [Cesium.Cartesian3.ZERO, TransformAxis.getValue(axis)],
            arrow: true,
            color: TransformAxis.getColor(axis),
            id: axis,
            show: false
        });
    }

    static getLinePrimitive(position, axis) {
        return new AxisLinePrimitive({
            positions: position,
            color: TransformAxis.getColor(axis),
            id: axis,
            show: false,
            loop: true,
        });
    }
}

TransformAxis.X = 'X';
TransformAxis.Y = 'Y';
TransformAxis.Z = 'Z';