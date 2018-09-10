### 绘制实心、空心Box对象

1. [官方总体介绍链接-Geometry-and-Appearances](https://cesiumjs.org/tutorials/Geometry-and-Appearances/)
2. [官方详细介绍链接-RectangleGeometry](https://cesiumjs.org/Cesium/Build/Documentation/RectangleGeometry.html)
3. [Material样式列表](https://cesiumjs.org/Cesium/Build/Documentation/Material.html)

> RectangleGeometry是Cesium默认的几何对象，该对象的使用相对简单，主要是熟悉各种样式参数，cesium针对每个样式的表达方式可以存在多种描述方式

---

#### 提交BUG
> 找到bug请提交[issue](https://github.com/ParnDeedlit/WebClient-Cesium/issues)

---

> 当你不明白几何图元的使用场景时，就意味着，你只需要使用Entity懒人模式！！！


#### 两类描述方式
##### Entity模式--懒人加载模式，这适用于小数据，快速展示，后面的问题多多，最好使用下面的新的模式

~~~ javascript
var redRectangle = viewer.entities.add({
    name: 'Red translucent rectangle',
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(-110.0, 20.0, -80.0, 25.0),
        material: Cesium.Color.RED.withAlpha(0.5)
    }
});
~~~


##### Primitive模式--新加载模式-几何图元，这适用于复杂的定制化场景，核心由三部分组成，几何实例与模型矩阵以及样式

- **RectangleGeometry**

|参数|类型|默认值|描述|
|:---|:---|:---|:---|
|rectangle|Rectangle||	A cartographic rectangle with north, south, east and west properties in radians.长方形的`实例`|
|ellipsoid|Ellipsoid|Ellipsoid.WGS84|`可选`The ellipsoid the circle will be on.长方形的`地球椭球体`|
|height|Number|0.0|`可选`The distance in meters between the circle and the ellipsoid surface.长方形的`高度`|
|granularity|Number|0.02|`可选`The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.长方形的`精细程度`|
|vertexFormat|VertexFormat|VertexFormat.DEFAULT|`可选`The vertex attributes to be computed.长方形的`顶点计算方式`|
|extrudedHeight|Number|0.0|`可选`The distance in meters between the circle's extruded face and the ellipsoid surface.长方形的`拉伸高度`|
|stRotation|Number|	0.0|`可选`The rotation of the texture coordinates, in radians. A positive rotation is counter-clockwise.长方形的`纹理的距离`|
|rotation|Number|0.0|`可选`The rotation of the rectangle, in radians. A positive rotation is counter-clockwise.长方形的`旋转角度`|



~~~ javascript
 /*
* 新加载模式-几何图元，这适用于复杂的定制化场景，核心由三部分组成，几何实例与模型矩阵以及样式
*/
 var rectangleinstance = new Cesium.GeometryInstance({
    geometry: new Cesium.RectangleGeometry({
        ellipsoid: Cesium.Ellipsoid.WGS84,
        rectangle: Cesium.Rectangle.fromDegrees(-80.0, 39.0, -74.0, 42.0),
        height: 10000.0,
        extrudedHeight: 300000
    }),
    vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
    id: "rectangleinstance"
});

viewer.scene.primitives.add(new Cesium.Primitive({
    geometryInstances: [rectangleinstance],
    appearance: new Cesium.PolylineMaterialAppearance({
        material: Cesium.Material.fromType('PolylineGlow', {
            color: Cesium.Color.BLUE
        })
    }) //PolylineColorAppearance/PolylineMaterialAppearance请区分使用场景
}));
~~~

**绑定点击事件**
~~~ javascript
function initPickEvent() {
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement) {
        var pick = viewer.scene.pick(movement.position);
        if (Cesium.defined(pick) && (pick.id === 'rectangleinstance')) {
            console.log('Mouse clicked instance.');
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
~~~



