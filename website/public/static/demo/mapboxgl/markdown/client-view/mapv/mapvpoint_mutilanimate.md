## 点重叠播放


### 示例功能

根据时间信息动态播放重叠点数据的变化情况。

### 示例实现

本示例需要使用include-mapboxgl-local.js开发库实现，通过关键接口`new mapboxgl.zondy.MapvLayer()`实现多值统计线加载，该接口对接<a target="_blank" href="https://mapv.baidu.com/">Mapv</a>的`mapv.baiduMapLayer`原生接口进行数据的渲染显示。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

#### Mapv

> <a target="_blank" href="https://mapv.baidu.com/">Mapv官方教程</a>

### 实现步骤

1. 引用开发库，本示例通过本地离线include-mapboxgl-local.js脚本引入开发库；

2. 创建`id="map"`的div作为地图容器，并设置其样式；

3. 创建地图对象，设置地图的必要参数，如地图div容器、缩放层级、中心点等，具体操作参考`互联网地图`目录下的`天地图墨卡托`示例；

4. 创建`DataSet`对象，首先构造DataSet对象需要的数据，然后使用数据创建DataSet对象。<a target="_blank" href="https://github.com/huiyan-fe/mapv/blob/master/src/data/DataSet.md">DataSet</a>对象使用Mapv框架的原生API创建，更多详细信息参考<a target="_blank" href="https://mapv.baidu.com/">Mapv官方教程</a>；

   ```javascript
   var randomCount = 1000;
   var data = [];
   var citys = ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南", "南京", "合肥", "杭州", "南昌", "福州", "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州", "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"];
   // 构造数据
   while (randomCount--) {
     var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
     data.push({
       geometry: {
         type: 'Point',
         coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
       },
       count: 30 * Math.random(),
       time: 100 * Math.random()
     });
   }
   var dataSet = new mapv.DataSet(data);
   ```
   
5. 构造`options`参数，<a target="_blank" href="https://github.com/huiyan-fe/mapv/blob/master/src/map/baidu-map/Layer.md">options</a>参数参考Mapv框架的原生API创建，更多详细信息参考<a target="_blank" href="https://mapv.baidu.com/">Mapv官方教程</a>；

   ```javascript
   var options = {
     context: '2d',
     fillStyle: 'rgba(55, 50, 250, 0.2)',
     globalCompositeOperation: "lighter",
     size: 15,
     animation: {
       type: 'time',
       stepsRange: {
         start: 0,
         end: 100
       },
       trails: 10,
       duration: 5,
     },
     draw: 'simple'
   };
   ```

6. 数据展示，根据前面的步骤，将`map`、`dataSet`、`options`三个参数传入`mapboxgl.zondy.MapvLayer`中创建对象，创建完成数据在前端页面进行展示。

   ```javascript
   var layer = new mapboxgl.zondy.MapvLayer(map, dataSet, options);
   ```

###  关键接口（Mapv API）

> MapV原生的接口

#### 1.【Mapv数据规范】DataSet

DasetSet是mapv中统一规范的数据对象，用来保存javascript数据对象。可以增删改查数据，并且可以订阅数据修改事件。

##### 简单示例

``` javascript
var data = [    
        {
            city: '北京',
            count: 30
        },
        {
            city: '南京',
            count: 30
        }
    ];
var dataSet = new mapv.DataSet(data);
```

##### 地理信息数据

mapv中主要都是展示地理信息数据用的，需要在数据中加个geometry字段，geometry字段的内容统一使用<a target="_blank" href="https://geojson.org//">geojson</a>的规范。

##### 地理信息数据示例

``` javascript
var data = [
        // 点数据
        {
            geometry: {
                type: 'Point',
                coordinates: [123, 23]
            },
            fillStyle: 'red',
            size: 30
        },
        {
            geometry: {
                type: 'Point',
                coordinates: [121, 33]
            },
            fillStyle: 'rgba(255, 255, 50, 0.5)',
            size: 90
        },
        // 线数据
        {
            geometry: {
                type: 'LineString',
                coordinates: [
                    [123, 23], 
                    [124, 24]
                ]
            },
            count: 30
        },
        // 面数据
        {
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [123, 23], 
                        [123, 23], 
                        [123, 23]
                    ]
                ]
            },
            count: 30 * Math.random()
        }
    ];
    var dataSet = new mapv.DataSet(data);
```

##### dataSet的方法

（1）dataSet.get

通过此方法可以获取当前数据集的数据:

``` javascript
var data = dataSet.get();
```

同时可通过filter参数方法获取过滤后的数据:

``` javascript
var data = dataSet.get({
        filter: function(item){
            if (item.count > 10 && item.count < 50) {
                return true;
            } else {
                return false;
            }
        }
    });
```

（2）dataSet.set

通过此方法可以修改数据集的内容:

``` javascript
dataSet.set([
        {
            geometry: {
                type: 'Point',
                coordinates: [123, 23]
            },
            fillStyle: 'red',
            size: 30
        }
    ]);
```

#### 2.【创建地图】mapv.baiduMapLayer

mapv原生的创建地图方式为：`new mapv.baiduMapLayer(map, dataSet, options)`，示例中使用`new mapboxgl.zondy.MapvLayer(map, dataSet, options)`作为原生方式的替换，替换后的参数个数、参数类型、返回值等等都不会改变，具体的参数设置参考<a target="_blank" href="https://mapv.baidu.com/">Mapv官网</a>。

（1）创建地图对象

mapv部分效果展示需要依赖于地图，我们可以通过以下方式创建地图：

以百度地图为例(具体的方法请参阅百度地图的js <a target="_blank" href="http://lbsyun.baidu.com/index.php?title=jspopular">api手册</a>

``` javascript
// 创建Map实例
var map = new BMap.Map("map", {
  enableMapClick: false
});    
// 初始化地图,设置中心点坐标和地图级别
map.centerAndZoom(new BMap.Point(106.962497, 38.208726), 4);  
// 设置地图样式
map.setMapStyle({
  style: 'midnight'
});
```

添加百度地图可视化叠加图层。

``` javascript
var options = {
    fillStyle: 'rgba(55, 50, 250, 0.6)',
    shadowColor: 'rgba(55, 50, 250, 0.5)',
    shadowBlur: 10,
    size: 5,
    draw: 'simple'
}
var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
```

（2）设置地图对象options

> options通用的属性:

``` javascript
options = {
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

> options.draw 

* simple 最直接的方式绘制点线面
* time 按时间字段来动画展示数据
* heatmap 热力图展示
* grid 网格状展示
* honeycomb 蜂窝状展示
* bubble 用不同大小的圆来展示
* intensity 根据不同的值对应按渐变色中颜色进行展示
* category 按不同的值进行分类，并使用对应的颜色展示
* choropleth 按不同的值区间进行分类，并使用对应的颜色展示
* text 展示文本
* icon 展示icon

1. simple:

<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-simple.html">示例地址</a>
dataSet中也可直接配置每个数据项的样式

``` javascript
{
    draw: 'simple',
    geometry: {
        type: 'Point',
        coordinates: [123, 23]
    },
    size: 10, // 点数据时候使用
    fillStyle: 'red', // 点数据时候使用
    strokeStyle: 'red' // 线数据时候使用
}
```
2. heatmap:

<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-heatmap.html">示例地址</a>

``` javascript
var options = {
    draw: 'heatmap',
    size: 13, // 每个热力点半径大小
    gradient: { // 热力图渐变色
        0.25: "rgb(0,0,255)",
        0.55: "rgb(0,255,0)",
        0.85: "yellow",
        1.0: "rgb(255,0,0)"
    },
    max: 100, // 最大权重值
}
//dataSet中加count字段，代表权重，根据上面配置用以计算它的热度
```

3. grid:

<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-grid.html">示例地址</a>

``` javascript
{
    draw: 'grid',
    size: 40,
    label: { // 网格中显示累加的值总和
        show: true,
        fillStyle: 'white',
        shadowColor: 'yellow',
        font: '20px Arial',
        shadowBlur: 10,
    },
    gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
}
```

4. honeycomb:

<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-honeycomb.html">示例地址</a>

``` javascript
{
    draw: 'honeycomb',
    size: 40,
    label: { // 网格中显示累加的值总和
        show: true,
        fillStyle: 'white',
        shadowColor: 'yellow',
        font: '20px Arial',
        shadowBlur: 10,
    },
    gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
}
```

5. bubble对应的options:

<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-bubble.html">示例地址</a>

``` javascript
{
    draw: 'bubble',
    max: 100, // 数值最大值范围
    maxSize: 10, // 显示的圆最大半径大小
}
```
dataSet中加count字段，代表权重，根据上面配置用以计算它实际展示的大小

6. intensity对应的options:

<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-intensity.html">示例地址</a>

``` javascript
{
    draw: 'intensity',
    max: 100, // 最大阈值
    min: 0, // 最小阈值
    gradient: { // 显示的颜色渐变范围$
        '0': 'blue',
        '0.6': 'cyan',
        '0.7': 'lime',
        '0.8': 'yellow',
        '1.0': 'red'
    }$
}
```

7. category对应的options:

<a target="_blank" href='http://mapv.baidu.com/examples/#baidu-map-point-category.html'>示例地址</a>

```javascript
{
    draw: 'category',
    splitList: { // 按对应的值按相应颜色展示
        other: 'rgba(255, 255, 0, 0.8)',
        1: 'rgba(253, 98, 104, 0.8)',
        2: 'rgba(255, 146, 149, 0.8)',
        3: 'rgba(255, 241, 193, 0.8)',
        4: 'rgba(110, 176, 253, 0.8)',
        5: 'rgba(52, 139, 251, 0.8)',
        6: 'rgba(17, 102, 252)'
    }
}
```

8. choropleth对应的options:

<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-choropleth.htm">示例地址</a>

```javascript 
{
    draw: 'choropleth',
    // 按数值区间来展示不同颜色的点
    splitList: [
        {
            start: 0,
            end: 2,
            color: randomColor()
        },{
            start: 2,
            end: 4,
            color: randomColor()
        },{
            start: 4,
            end: 6,
            color: randomColor()
        },{
            start: 6,
            end: 8,
            color: randomColor()
        },{
            start: 8,
            color: randomColor()
        }
    ]
}
```

9. icon对应的options:

<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-icon.html">示例地址</a>

```javascript
{
    draw: 'icon',
    rotate: '90', // 图片旋转角度
    width: 10, // 规定图像的宽度
    height: 10, // 规定图像的高度
    size: 10, // 添加点击事件时候可以用来设置点击范围
    sx: 10, // 开始剪切的 x 坐标位置
    sy: 10, // 开始剪切的 y 坐标位置
    swidth: 10, // 被剪切图像的宽度
    sheight: 10, // 被剪切图像的高度
}
```
dataSet中添加字段

```javascript
{
    icon: Image, // 加载好的Image对象
    rotate: '90', // 图片旋转角度
}
```

10. text对应的options:

<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-text.html">示例地址</a>

```javascript
{
    draw: 'text',
    fillStyle: 'white',
    textAlign: 'center',
    avoid: true, // 开启文本标注避让
    textBaseline: 'middle',
    offset: { // 文本便宜值
        x: 0,
        y: 0
    }
}
```
dataSet中添加字段

``` javascript
{
    text: '文本内容' 
}
```

11. animation:

<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-time.htm">点动画1</a>
<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-time1.html">点动画2</a>
<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-polyline-time.html">线动画</a>

```json
{
    draw: 'simple',
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

（3）地图对象的方法

+ mapvLayer.update({options: {} // 修改配置}); 
+ mapvLayer.setOptions({size: 1}); // 重新设置配置
+ mapvLayer.show(); // 显示图层
+ mapvLayer.hide(); // 隐藏图层
+ mapvLayer.destroy(); // 销毁当前图层

#### 3.【类】utilDataRangeIntensity

值域组件，可以按照强度获取对应渐变色中的颜色或半径大小值。

（1）实例化值域组件对象

```javascript
var intensity = new mapv.utilDataRangeIntensity({
    maxSize: 100, // 定义最大的半径大小值
    gradient: { // 渐变色设置
        0.25: "rgb(0,0,255)",
        0.55: "rgb(0,255,0)",
        0.85: "yellow",
        1.0: "rgb(255,0,0)"
    },
    max: 100 // 最大权重值
});
```

（2）对象的方法

1. getSize

根据权重值获取对应的大小。

```javascript
var size = intensity.getSize(count);
```
2. getColor

根据权重值获取对应的颜色。

```javascript
var size = intensity.getColor(count);
```
3. setMax

修改最大权重值。

```javascript
intensity.setMax(100);
```
4. setMaxSize

修改最大半径值。

```javascript
intensity.setMaxSize(100);
```
