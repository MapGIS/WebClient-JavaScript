### 绘制圆CircleGeometry对象

1. [官方总体介绍链接-Geometry-and-Appearances](https://cesiumjs.org/tutorials/Geometry-and-Appearances/)
2. [官方详细介绍链接-PolygonGeometry](https://cesiumjs.org/Cesium/Build/Documentation/CircleGeometry.html)
3. [Material样式列表](https://cesiumjs.org/Cesium/Build/Documentation/Material.html)

[官方链接](https://cesiumjs.org/tutorials/Geometry-and-Appearances/)
> CircleGeometry/CylinderGeometry是Cesium默认的几何对象，该对象的使用相对简单，主要是熟悉各种样式参数，cesium针对每个样式的表达方式可以存在多种描述方式

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
var greenCircle = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-111.0, 40.0, 150000.0),
    name: 'Green circle at height with outline',
    ellipse: {
        semiMinorAxis: 300000.0,
        semiMajorAxis: 300000.0,
        height: 200000.0,
        material: Cesium.Color.GREEN,
        outline: true // height must be set for outline to display
    }
});
~~~


##### Primitive模式--新加载模式-几何图元，这适用于复杂的定制化场景，核心由三部分组成，几何实例与模型矩阵以及样式

- **CircleGeometry**

|参数|类型|默认值|描述|
|:---|:---|:---|:---|
|center|Cartesian3||The circle's center point in the fixed frame.圆的`中心点`|
|radius|Number||The radius in meters.圆的`半径`|
|ellipsoid|Ellipsoid|Ellipsoid.WGS84|`可选`The ellipsoid the circle will be on.圆的`地球椭球体`|
|height|Number|0.0|`可选`The distance in meters between the circle and the ellipsoid surface.圆的`高度`|
|granularity|Number|0.02|`可选`The angular distance between points on the circle in radians.圆的`精细程度`|
|vertexFormat|VertexFormat|VertexFormat.DEFAULT|`可选`The vertex attributes to be computed.圆的`顶点计算方式`|
|extrudedHeight|Number|0.0|`可选`The distance in meters between the circle's extruded face and the ellipsoid surface.圆的`拉伸高度`|
|stRotation|Number|	0.0|`可选`The rotation of the texture coordinates, in radians. A positive rotation is counter-clockwise.圆的`纹理的距离`|

- **CylinderGeometry**

|参数|类型|默认值|描述|
|:---|:---|:---|:---|
|length|Number||The length of the cylinder.圆柱的`长度`|
|topRadius|Number||The radius of the top of the cylinder.圆柱的`上截面半径`|
|bottomRadius|Number||The radius of the bottom of the cylinder.圆柱的`下截面半径`|
|slices|Number|	128|`可选`The number of edges around the perimeter of the cylinder.圆柱的`边的数量`|
|vertexFormat|VertexFormat|VertexFormat.DEFAULT|`可选`The vertex attributes to be computed.圆柱的`顶点计算方式`|


~~~ javascript
 /*
* 新加载模式-几何图元，这适用于复杂的定制化场景，核心由三部分组成，几何实例与模型矩阵以及样式
*/
var instance = new Cesium.GeometryInstance({
    geometry: new Cesium.CircleGeometry({
        center : Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
        radius : 100000.0,
        height : 1000000.0
    }),
    modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
        Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)), //几何的空间位置
    new Cesium.Cartesian3(0.0, 0.0, 300000.0), //几何的x,y,z空间偏移
    new Cesium.Matrix4()), //这个可以选择默认
    attributes: {
        color : new Cesium.ColorGeometryInstanceAttribute(0.0, 0.0, 1.0, 1.0)
    },
    id: "instance"
});
viewer.scene.primitives.add(new Cesium.Primitive({
    geometryInstances: instance,
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



