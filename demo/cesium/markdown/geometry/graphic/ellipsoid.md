### 绘制椭球EllipsoidGeometry对象

1. [官方总体介绍链接-Geometry-and-Appearances](https://cesiumjs.org/tutorials/Geometry-and-Appearances/)
2. [官方详细介绍链接-PolygonGeometry](https://cesiumjs.org/Cesium/Build/Documentation/EllipsoidGeometry.html)
3. [Material样式列表](https://cesiumjs.org/Cesium/Build/Documentation/Material.html)

> EllipsoidGeometry是Cesium默认的几何对象，该对象的使用相对简单，主要是熟悉各种样式参数，cesium针对每个样式的表达方式可以存在多种描述方式

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
var redSphere = viewer.entities.add({
    name: 'Red sphere with black outline',
    position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
    ellipsoid: {
        radii: new Cesium.Cartesian3(300000.0, 300000.0, 300000.0),
        material: Cesium.Color.RED.withAlpha(0.5),
        outline: true,
        outlineColor: Cesium.Color.BLACK
    }
});
~~~


##### Primitive模式--新加载模式-几何图元，这适用于复杂的定制化场景，核心由三部分组成，几何实例与模型矩阵以及样式

- **EllipsoidGeometry**

|参数|类型|默认值|描述|
|:---|:---|:---|:---|
|radii|Cartesian3|Cartesian3(1.0, 1.0, 1.0)|The radii of the ellipsoid in the x, y, and z directions.椭球的`坐标数组`|
|stackPartitions|Number|64|`可选`The number of times to partition the ellipsoid into stacks.椭球的`竖直线数量`|
|slicePartitions|Number|64|`可选`The number of times to partition the ellipsoid into radial slices.椭球的`横向线数量`|
|vertexFormat|VertexFormat|VertexFormat.DEFAULT|`可选`The vertex attributes to be computed.椭球的`顶点计算方式`|

~~~ javascript
 /*
* 新加载模式-几何图元，这适用于复杂的定制化场景，核心由三部分组成，几何实例与模型矩阵以及样式
*/
var ellipsoidinstance = new Cesium.GeometryInstance({
    geometry: new Cesium.EllipsoidGeometry({
        vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
        radii: new Cesium.Cartesian3(500000.0, 500000.0, 500000.0)
    }),
    modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)), //几何的空间位置
        new Cesium.Cartesian3(0.0, 0.0, 300000.0), //几何的x,y,z空间偏移
        new Cesium.Matrix4()), //这个可以选择默认
    attributes: {
        color: new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 1.0)
    },
    id: "ellipsoidinstance"
});

viewer.scene.primitives.add(new Cesium.Primitive({
    geometryInstances: [ellipsoidinstance],
    appearance: new Cesium.PerInstanceColorAppearance() //EllipsoidSurfaceAppearance/PerInstanceColorAppearance请区分使用场景
}));
~~~

**绑定点击事件**
~~~ javascript
function initPickEvent() {
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement) {
        var pick = viewer.scene.pick(movement.position);
        if (Cesium.defined(pick) && (pick.id === 'ellipsoidinstance')) {
            console.log('Mouse clicked instance.');
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
~~~



