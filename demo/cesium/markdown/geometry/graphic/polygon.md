### 绘制区Polygon对象

1. [官方总体介绍链接-Geometry-and-Appearances](https://cesiumjs.org/tutorials/Geometry-and-Appearances/)
2. [官方详细介绍链接-PolygonGeometry](https://cesiumjs.org/Cesium/Build/Documentation/PolygonGeometry.html)
3. [Material样式列表](https://cesiumjs.org/Cesium/Build/Documentation/Material.html)

> PolygonGeometry是Cesium默认的几何对象，该对象的使用相对简单，主要是熟悉各种样式参数，cesium针对每个样式的表达方式可以存在多种描述方式

---

#### 提交BUG
> 找到bug请提交[issue](https://github.com/ParnDeedlit/WebClient-Cesium/issues)

---

> 当你不明白几何图元的使用场景时，就意味着，你只需要使用Entity懒人模式！！！

> 特别注意： 当图元是二维的时候，`geometry`中一般会存在中心点来确定对应的位置。

> 三维的图元，则往往`geometry`中没有中心点信息，其中心点信息是在`modelMatrix`中来确定的
> **GeometryInstance:**
    >>+ `geometry`:{决定几何的大小}
    >>+ attributes:{决定几何的样式}
    >>+ `modelMatrix`:{决定几何的位置}
    >>+  id:"几何的id"

#### 两类描述方式
##### Entity模式--懒人加载模式，这适用于小数据，快速展示，后面的问题多多，最好使用下面的新的模式

~~~ javascript
var redPolygon = viewer.entities.add({
    name: 'Red polygon on surface',
    polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([-115.0, 37.0, -115.0, 32.0, -107.0, 33.0, -
            102.0, 31.0, -102.0, 35.0
        ]),
        material: Cesium.Color.RED
    }
});
~~~


##### Primitive模式--新加载模式-几何图元，这适用于复杂的定制化场景，核心由三部分组成，几何实例与模型矩阵以及样式

- **PolygonGeometry**

|参数|类型|默认值|描述|
|:---|:---|:---|:---|
|polygonHierarchy|PolygonHierarchy||A polygon hierarchy that can include holes.区的`几何实体`|
|height|Number|0.0|`可选`The distance in meters between the circle and the ellipsoid surface.区的`高度`|
|extrudedHeight|Number||`可选`The distance in meters between the circle's extruded face and the ellipsoid surface.区的`拉伸高度`|
|vertexFormat|VertexFormat|VertexFormat.DEFAULT|`可选`The vertex attributes to be computed.区的`顶点计算方式`|
|ellipsoid|Ellipsoid|Ellipsoid.WGS84|`可选`The ellipsoid the circle will be on.区的`地球椭球体`|
|granularity|Number|CesiumMath.RADIANS_PER_DEGREE|`可选`The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.区的`精细程度`|
|stRotation|Number|	0.0|`可选`The rotation of the texture coordinates, in radians. A positive rotation is counter-clockwise.区的`纹理的距离`|
|perPositionHeight|Boolean|false|`可选`Use the height of options.positions for each position instead of using options.height to determine the height.|
|closeTop|Boolean|true|`可选`When false, leaves off the top of an extruded polygon open.|
|closeBottom|Boolean|true|`可选`When false, leaves off the bottom of an extruded polygon open.|


~~~ javascript
 /*
* 新加载模式-几何图元，这适用于复杂的定制化场景，核心由三部分组成，几何实例与模型矩阵以及样式
*/
var polygonWithHole = new Cesium.PolygonGeometry({
    polygonHierarchy: new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromDegreesArray([-109.0, 30.0, -95.0, 30.0, -95.0, 40.0, -109.0,
            40.0
        ]), [new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray([-107.0, 31.0, -107.0, 39.0, -97.0, 39.0, -
                97.0, 31.0
            ]), [new Cesium.PolygonHierarchy(
                Cesium.Cartesian3.fromDegreesArray([-105.0, 33.0, -99.0, 33.0, -99.0,
                    37.0, -105.0, 37.0
                ]), [new Cesium.PolygonHierarchy(
                    Cesium.Cartesian3.fromDegreesArray([-103.0, 34.0, -101.0, 34.0, -
                        101.0, 36.0, -103.0, 36.0
                    ])
                )]
            )]
        )]
    ),
    vertexFormat:Cesium.VertexFormat.POSITION_ONLY
});
    var polygoninstance = new Cesium.GeometryInstance({
    geometry: polygonWithHole,
    attributes: {
        color: new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 1.0)
    },
    id: "polygoninstance"
});

viewer.scene.primitives.add(new Cesium.Primitive({
    geometryInstances: [polygoninstance],
    appearance: new Cesium.PerInstanceColorAppearance() //EllipsoidSurfaceAppearance/PerInstanceColorAppearance请区分使用场景
}));
~~~

**绑定点击事件**
~~~ javascript
function initPickEvent() {
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement) {
        var pick = viewer.scene.pick(movement.position);
        if (Cesium.defined(pick) && (pick.id === 'polygoninstance')) {
            console.log('Mouse clicked instance.');
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
~~~



