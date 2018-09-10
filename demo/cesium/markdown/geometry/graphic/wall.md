### 绘制墙WallGeometry对象

1. [官方总体介绍链接-Geometry-and-Appearances](https://cesiumjs.org/tutorials/Geometry-and-Appearances/)
2. [官方详细介绍链接-RectangleGeometry](https://cesiumjs.org/Cesium/Build/Documentation/WallGeometry.html)
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
var redWall = viewer.entities.add({
    name: 'Red wall at height',
    wall: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([-115.0, 44.0, 200000.0, -90.0, 44.0,
            200000.0
        ]),
        minimumHeights: [100000.0, 100000.0],
        material: Cesium.Color.RED
    }
});
~~~


##### Primitive模式--新加载模式-几何图元，这适用于复杂的定制化场景，核心由三部分组成，几何实例与模型矩阵以及样式

- **WallGeometry**

|参数|类型|默认值|描述|
|:---|:---|:---|:---|
|positions|Array.<Cartesian3>||	An array of Cartesian objects, which are the points of the wall.墙的`实例数组`|
|ellipsoid|Ellipsoid|Ellipsoid.WGS84|`可选`The ellipsoid the circle will be on.墙的`地球椭球体`|
|maximumHeights|Array.<Number>||`可选`An array parallel to positions that give the maximum height of the wall at positions. If undefined, the height of each position in used.墙的`最大高度`|
|minimumHeights|Array.<Number>||`可选`An array parallel to positions that give the minimum height of the wall at positions. If undefined, the height at each position is 0.0.墙的`最小高度`|
|granularity|Number|CesiumMath.RADIANS_PER_DEGREE|`可选`墙的`精细程度`|
|vertexFormat|VertexFormat|VertexFormat.DEFAULT|`可选`The vertex attributes to be computed.墙的`顶点计算方式`|




~~~ javascript
 /*
* 新加载模式-几何图元，这适用于复杂的定制化场景，核心由三部分组成，几何实例与模型矩阵以及样式
*/
var wallinstance = new Cesium.GeometryInstance({
    geometry: new Cesium.WallGeometry({
        positions: Cesium.Cartesian3.fromDegreesArray([-125.0, 40.0, -122.5, 40.0, -120.0, 40.0, -
            117.5, 40.0, -115.0, 40.0, -112.5, 40.0, -110.0, 40.0, -107.5, 40.0, -105.0, 40.0, -
            102.5, 40.0, -100.0, 40.0
        ]),
        maximumHeights: [100000, 200000, 100000, 200000, 100000, 200000, 100000, 200000, 100000,
            200000, 100000
        ],
        minimumHeights: [0, 100000, 0, 100000, 0, 100000, 0, 100000, 0, 100000, 0]
    }),
    vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
    id: "wallinstance"
});

viewer.scene.primitives.add(new Cesium.Primitive({
    geometryInstances: [wallinstance],
    appearance: new Cesium.PolylineMaterialAppearance({
        material: Cesium.Material.fromType('Grid',{
            color: Cesium.Color.WHITE
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



