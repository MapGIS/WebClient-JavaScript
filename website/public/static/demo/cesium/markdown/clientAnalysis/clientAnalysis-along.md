## 线插值操作 Along

### 示例功能

本示例用于线插值，线插值操作是通过 `计算起点-终点长度` , 然后再根据长度等分计算需要插值的点, 最后再把这些点插入到原始数据中.

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，过Cesium三维球控件 `Cesium.WebSceneControl()` 加载三维场景控件后根据已有的线计算插值点形成新的线数据，添加线显示完成此功能。

### 实现步骤：

1. <font color=red>引用开发库</font>：本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能；

2. <font color=red>创建三维地图容器并加载三维球控件</font>：创建 `id='GlobeView'` 的div作为三维视图的容器，并设置其样式，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，完成此步后可在三维场景中加载三维球控件；

``` Javascript
//构造三维视图类（视图容器div的id，三维视图设置参数）
var webGlobe = new Cesium.WebSceneControl('GlobeView', {
    terrainExaggeration: 1,
});
```

``` html
<div id='GlobeView'></div>
```

3. <font color=red>计算线长度</font>：通过 ` ` 对象的 ` distance()` 方法计算线长度；

``` Javascript
//计算距离
var lineDistance = turf.distance(origin, destination, {
    units: 'kilometers'
});
```

4. <font color=red>等分线长度</font>：将线长度平均分；

``` Javascript
//将均分线插值
for (var i = 0; i < lineDistance; i += clip) {
    //计算对应第i个插值点的位置
    var segment = turf.along(route.features[0], i, {
        units: 'kilometers'
    });
    //将插值点加入到原始数据中
    arc.push(segment.geometry.coordinates);
}
```

5. <font color=red>显示结果</font>：将插完值的线显示出来；

``` Javascript
//更新视图函数
function updateView() {
    //添加路线显示
    var routedatasource = map.dataSources.add(Cesium.GeoJsonDataSource.load(route, {
        //线颜色
        stroke: Cesium.Color.GRAY,
        //填充色
        fill: Cesium.Color.GRAY,
        //线宽
        strokeWidth: 5
    }));
    //添加简单线显示
    var simpledatasource = map.dataSources.add(Cesium.GeoJsonDataSource.load(simpleLine, {
        //线颜色
        stroke: Cesium.Color.RED,
        //填充色
        fill: Cesium.Color.RED,
        //线宽
        strokeWidth: 5
    }));
    //跳转至路线
    map.flyTo(routedatasource);
}
```

### 关键接口

1. ` distance()` 方法

|名称|类型|描述|
|---|---|---|
|units|string|"kilometers"	|可以是 `degrees` 度, `radians` 弧度, `miles` 英里, or `kilometers` 千米|

2. `along()`方法
|参数	|类型	|描述|
|:---|---|:---|
|line	|Feature <LineString>|原始线段, 至少要有2个点|
|distance	|number	|距离起点的插入距离|
|options	|Object| 其他参数, 请看下面的单位参数|