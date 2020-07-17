## 交通轨迹

### 示例功能

本示例对接MapV，实现在三维场景中加载MapV交通轨迹图。

### 示例实现

本示例需要使用include-cesium-local.js开发库实现，初始化Cesium三维球控件 `Cesium.WebSceneControl()` 后构造热力图数据，通过mapv图层对象类 `CesiumZondy.Overlayer.MapvLayer` 来实现MapV图层的加载。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

#### Mapv

> 特别说明：MapGIS Client for JavaScript在Cesium中对接了MapV插件，若插件本身存在问题，请优先参考<a target="_blank" href="https://mapv.baidu.com/">Mapv官方教程</a>寻找解决方案

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，需要设置 `include` 属性为 `mapv` ；   

``` javascript
    < script include = "mapv"
    src = "./static/libs/include-cesium-local.js" > < /script>
```

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，并加载Google地图作为底图；

3. 创建 `DataSet` 对象: 首先构造DataSet对象需要的数据，然后使用数据创建DataSet对象。<a target="_blank" href="https://github.com/huiyan-fe/mapv/blob/master/src/data/DataSet.md">DataSet</a>对象使用Mapv框架的原生API创建，更多详细信息参考<a target="_blank" href="https://mapv.baidu.com/">Mapv官方教程</a>；

``` javascript
var dataSet = mapv.csv.getDataSet(csvstr);
```

4. 构造 `options` 参数，<a target="_blank" href="https://github.com/huiyan-fe/mapv/blob/master/src/map/baidu-map/Layer.md">options</a>参数参考Mapv框架的原生API创建，更多详细信息参考<a target="_blank" href="https://mapv.baidu.com/">Mapv官方教程</a>； 

``` javascript
var options = {
    context: '2d',
    strokeStyle: 'rgba(50, 50, 255, 0.8)',
    lineWidth: 0.05,
    globalCompositeOperation: 'lighter',
    draw: 'simple'
};
```

6. 数据展示，根据前面的步骤，将 `map` 、 `dataSet` 、 `options` 三个参数传入 `CesiumZondy.Overlayer.MapvLayer` 中创建对象，创建完成数据在三维场景中加载展示。

``` javascript
var mapvLayer = new CesiumZondy.Overlayer.MapvLayer(map, dataSet, options);
```

###  关键接口

#### 1. options属性

``` json
{
    zIndex: 1, // 层级
    size: 5, // 大小值
    unit: 'px', // 'px': 以像素为单位绘制,默认值。'm': 以米制为单位绘制，会跟随地图比例放大缩小
    mixBlendMode: 'normal', // 不同图层之间的叠加模式，参考[https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)
    fillStyle: 'rgba(200, 200, 50, 1)', // 填充颜色
    strokeStyle: 'rgba(0, 0, 255, 1)', // 描边颜色
    lineWidth: 4, // 描边宽度
    globalAlpha: 1, // 透明度
    globalCompositeOperation: 'lighter', // 颜色叠加方式
    coordType: 'bd09ll', // 可选百度墨卡托坐标类型bd09mc和百度经纬度坐标类型bd09ll(默认)
    shadowColor: 'rgba(255, 255, 255, 1)', // 投影颜色
    shadowBlur: 35,  // 投影模糊级数
    updateCallback: function (time) { // 重绘回调函数，如果是时间动画、返回当前帧的时间
    },
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    context: '2d', // 可选2d和webgl，webgl目前只支持画simple模式的点和线
    lineCap: 'butt',
    lineJoin: 'miter',
    miterLimit: 10,
    methods: { // 一些事件回调函数
        click: function (item) { // 点击事件，返回对应点击元素的对象值
            console.log(item);
        },
        mousemove: function(item) { // 鼠标移动事件，对应鼠标经过的元素对象值
            console.log(item);
        },
        tap: function(item) {
            console.log(item) // 只针对移动端,点击事件
        }
    },
    animation: {
        type: 'time', // 按时间展示动画
        stepsRange: { // 动画时间范围,time字段中值
            start: 0,
            end: 100
        },
        trails: 10, // 时间动画的拖尾大小
        duration: 5, // 单个动画的时间，单位秒
    }
}
```

