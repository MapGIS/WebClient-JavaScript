## 点数据播放

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例对接MapV，实现在三维场景中加载MapV点数据播放图。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，初始化Cesium三维球控件 `Cesium.WebSceneControl()` 后构造热力图数据，通过mapv图层对象类 `CesiumZondy.Overlayer.MapvLayer` 来实现MapV图层的加载。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

#### Mapv

> 特别说明：MapGIS Client for JavaScript在Cesium中对接了MapV插件，若插件本身存在问题，请优先参考<a target="_blank" href="https://mapv.baidu.com/">Mapv官方教程</a>寻找解决方案

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用local本地【include-cesium-local.js】开发库，需要设置 `include` 属性为 `mapv` ；   

* Example:
  ``` javascript
    < script include = "mapv" src = "./static/libs/include-cesium-local.js" > < /script>
  ```

**Step 2. <font color=red>创建三维地图容器加载三维球控件,并加载底图</font>**：
&ensp;&ensp;&ensp;&ensp; 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，并加载第三方互联网地图作为底图；

**Step 3. <font color=red>创建 `DataSet` 对象</font>**：
&ensp;&ensp;&ensp;&ensp;首先构造DataSet对象需要的数据，然后使用数据创建DataSet对象。<a target="_blank" href="https://github.com/huiyan-fe/mapv/blob/master/src/data/DataSet.md">DataSet</a>对象使用Mapv框架的原生API创建，更多详细信息参考<a target="_blank" href="https://mapv.baidu.com/">Mapv官方教程</a>；

* Example:
  ``` javascript
    for (var i = 0; i < rs[0].length; i++) {
        var geoCoord = rs[0][i].geoCoord;
        data.push({
            geometry: {
                type: 'Point',
                coordinates: geoCoord
            },
            time: Math.random() * 10
        });
    }
    var dataSet = new mapv.DataSet(data);
  ```

**Step 4. <font color=red>构造 `options` 参数</font>**：
&ensp;&ensp;&ensp;&ensp;<a target="_blank" href="https://github.com/huiyan-fe/mapv/blob/master/src/map/baidu-map/Layer.md">options</a>参数参考Mapv框架的原生API创建，更多详细信息参考<a target="_blank" href="https://mapv.baidu.com/">Mapv官方教程</a>； 

* Example:
  ``` javascript
    var options = {
        context: '2d',
        fillStyle: 'rgba(255, 250, 50, 0.6)',
        updateCallback: function(time) {
            time = time.toFixed(2);
            $('#time').html('时间' + time);
        },
        size: 3,
        draw: 'simple',
        animation: {
            type: 'time',
            stepsRange: {
                start: 0,
                end: 10
            },
            trails: 1,
            duration: 6,
        }
    }
  ```

**Step 5. <font color=red>数据展示</font>**：
&ensp;&ensp;&ensp;&ensp;根据前面的步骤，将 `map` 、 `dataSet` 、 `options` 三个参数传入 `CesiumZondy.Overlayer.MapvLayer` 中创建对象，创建完成数据在三维场景中加载展示。

* Example:
  ``` javascript
    var mapvLayer = new CesiumZondy.Overlayer.MapvLayer(map, dataSet, options);
  ```

###  关键接口

#### 1.【百度地图mapv图层】`mapv.baiduMapLayer`

&ensp;&ensp;&ensp;&ensp;mapv原生的创建地图方式为：`new mapv.baiduMapLayer(map, dataSet, options)`，示例中使用`CesiumZondy.Overlayer.MapvLayer(map, dataSet, options)`作为原生方式的替换，替换后的参数个数、参数类型、返回值等等都不会改变，具体的参数设置参考<a target="_blank" href="https://mapv.baidu.com/">Mapv官网</a>。

| 参数名  | 类型   | 说明                        |
| ------- | ------ | --------------------------------------------------------- |
| map     | Object | 地图对象 |
| dataSet | Object | DasetSet是mapv中统一规范的数据对象，用来保存javascript数据对象，可以增删改查数据，并且可以订阅数据修改事件 |
| options | Object | 其他参数 |


* `options`通用属性

* Example:
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

* `options.draw `

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


* `simple-最直接的方式绘制点线面`：<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-simple.html">示例地址</a>

&ensp;&ensp;&ensp;&ensp;dataSet中也可直接配置每个数据项的样式

* Example:
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

* `heatmap-热力图展示`：<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-heatmap.html">示例地址</a>

* Example:
  ``` javascript
    var options = {
      draw: 'heatmap',
      size: 13, // 每个热力点半径大小
      gradient: {
        // 热力图渐变色
        0.25: 'rgb(0,0,255)',
        0.55: 'rgb(0,255,0)',
        0.85: 'yellow',
        1.0: 'rgb(255,0,0)',
      },
      max: 100, // 最大权重值
    }
    //dataSet中加count字段，代表权重，根据上面配置用以计算它的热度
  ```

* `grid-网格状展示`：<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-grid.html">示例地址</a>

* Example:
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

* `honeycomb-蜂窝状展示`：<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-honeycomb.html">示例地址</a>

* Example:
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


* `bubble-用不同大小的圆来展示`：<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-bubble.html">示例地址</a>

* Example:
  ``` javascript
    {
      draw: 'bubble',
      max: 100, // 数值最大值范围
      maxSize: 10, // 显示的圆最大半径大小
    }
  ```
&ensp;&ensp;&ensp;&ensp;dataSet中加count字段，代表权重，根据上面配置用以计算它实际展示的大小

`intensity-根据不同的值对应按渐变色中颜色进行展示`：<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-intensity.html">示例地址</a>

* Example:
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

`category-按不同的值进行分类并使用对应的颜色展示`：<a target="_blank" href='http://mapv.baidu.com/examples/#baidu-map-point-category.html'>示例地址</a>

* Example:
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

`choropleth-按不同的值区间进行分类并使用对应的颜色展示`：<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-choropleth.htm">示例地址</a>

* Example:
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

`icon-展示icon`：<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-icon.html">示例地址</a>

* Example:
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

&ensp;&ensp;&ensp;&ensp;dataSet中添加字段：

* Example:
  ```javascript
    {
      icon: Image, // 加载好的Image对象
      rotate: '90', // 图片旋转角度
    }
  ```

`text-展示文本`：<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-text.html">示例地址</a>

* Example:
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

&ensp;&ensp;&ensp;&ensp;dataSet中添加字段：

* Example:
  ``` javascript
    {
      text: '文本内容'
    }
  ```


`animation-展示动画`：<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-time.htm">点动画1</a>&ensp;&ensp;<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-point-time1.html">点动画2</a>&ensp;&ensp;<a target="_blank" href="http://mapv.baidu.com/examples/#baidu-map-polyline-time.html">线动画</a>

* Example:
  ```json
    {
      "draw": "simple",
      "animation": {
        "type": "time", // 按时间展示动画
        "stepsRange": {
          // 动画时间范围,time字段中值
          "start": 0,
          "end": 100
        },
        "trails": 10, // 时间动画的拖尾大小
        "duration": 5 // 单个动画的时间，单位秒
      }
    }
  ```
