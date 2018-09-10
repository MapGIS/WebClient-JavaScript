### 绘制走廊CorridorGeometry对象

1. [官方总体介绍链接-Geometry-and-Appearances](https://cesiumjs.org/tutorials/Geometry-and-Appearances/)
2. [官方详细介绍链接-PolygonGeometry](https://cesiumjs.org/Cesium/Build/Documentation/CorridorGeometry.html)
3. [Material样式列表](https://cesiumjs.org/Cesium/Build/Documentation/Material.html)

> CorridorGeometry是Cesium默认的几何对象，该对象的使用相对简单，主要是熟悉各种样式参数，cesium针对每个样式的表达方式可以存在多种描述方式

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
var greenCorridor = viewer.entities.add({
    name: 'Green corridor at height with mitered corners and outline',
    corridor: {
        positions: Cesium.Cartesian3.fromDegreesArray([-90.0, 40.0, -95.0, 40.0, -95.0, 35.0]),
        height: 100000.0,
        width: 200000.0,
        cornerType: Cesium.CornerType.MITERED,
        material: Cesium.Color.GREEN,
        outline: true // height required for outlines to display
    }
});
~~~


##### Primitive模式--新加载模式-几何图元，这适用于复杂的定制化场景，核心由三部分组成，几何实例与模型矩阵以及样式

- **CorridorGeometry**

|参数|类型|默认值|描述|
|:---|:---|:---|:---|
|positions|Array.<Cartesian3>||An array of positions that define the center of the corridor.走廊的`坐标数组`|
|width|Number||The distance between the edges of the corridor in meters.走廊的`宽度`|
|ellipsoid|Ellipsoid|Ellipsoid.WGS84|`可选`The ellipsoid the circle will be on.走廊的`地球椭球体`|
|height|Number|0.0|`可选`The distance in meters between the circle and the ellipsoid surface.走廊的`高度`|
|granularity|Number|0.02|`可选`The angular distance between points on the circle in radians.走廊的`精细程度`|
|vertexFormat|VertexFormat|VertexFormat.DEFAULT|`可选`The vertex attributes to be computed.走廊的`顶点计算方式`|
|extrudedHeight|Number|0.0|`可选`The distance in meters between the circle's extruded face and the ellipsoid surface.走廊的`拉伸高度`|
|cornerType|CornerType|CornerType.ROUNDED|`可选`Determines the style of the corners.走廊的`拐角样式`|


~~~ javascript
 /*
* 新加载模式-几何图元，这适用于复杂的定制化场景，核心由三部分组成，几何实例与模型矩阵以及样式
*/
var corridorinstance = new Cesium.GeometryInstance({
    geometry: new Cesium.CorridorGeometry({
        vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
        positions: Cesium.Cartesian3.fromDegreesArray([-72.0, 40.0, -70.0, 35.0, -60, 35.0]),
        width: 100000
    }),
    attributes: {
        color: new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 1.0)
    },
    id: "corridorinstance"
});

viewer.scene.primitives.add(new Cesium.Primitive({
    geometryInstances: [corridorinstance],
    appearance: new Cesium.PerInstanceColorAppearance() //EllipsoidSurfaceAppearance/PerInstanceColorAppearance请区分使用场景
}));
~~~

**绑定点击事件**
~~~ javascript
function initPickEvent() {
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement) {
        var pick = viewer.scene.pick(movement.position);
        if (Cesium.defined(pick) && (pick.id === 'instance')) {
            console.log('Mouse clicked instance.');
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
~~~



