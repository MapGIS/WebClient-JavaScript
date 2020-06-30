## 路径图-中国100万线

### 示例功能

本示例对接百度ECharts，实现在三维场景中加载ECharts路径图，基于中国100万线数据实现路径图的可视化。

> 百度 ECharts

ECharts完整、详细使用方法可参考：<a href="http://echarts.baidu.com/api.html#echarts" target="_blank">官方教程API</a>，开发库下载可参考：<a href="http://echarts.baidu.com/download.html" target="_blank">官方下载</a>

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，通过关键接口`CesiumZondy.Overlayer.EchartsLayer()`来实现ECharts图层的加载。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

> 特别说明：MapGIS Client for JavaScript在Cesium中对接了百度Echarts图表插件，若插件本身存在问题，请优先参考Echarts官网解决方案。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，需要设置`include`属性为`echarts`；

    ```javascript
    <script include="echarts" src="./static/libs/include-cesium-local.js"></script>
    ```

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，并加载Google地图作为底图；

3. 数据准备：本示例从离线数据文件中获取中国100万线数据，然后按照格式要求进行处理；

    ```javascript
    var CHUNK_COUNT = 28;
    var dataCount = 0;
    function fetchData(idx) {
      if (idx >= CHUNK_COUNT) {
        return;
      }
      var dataURL = `./static/data/echarts/road/road_${idx}.bin`;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', dataURL, true);
      xhr.responseType = 'arraybuffer';

      xhr.onload = function (e) {
        var rawData = new Float32Array(this.response);

        var addedDataCount = 0;

        layer.chart.appendData({
          seriesIndex: 0,
          data: rawData
        });

        dataCount += addedDataCount;

        fetchData(idx + 1);
      }

      xhr.send();
    }
    ```

4. 配置参数项：创建各种需要的组件，如标题、图例、提示框等，其中最关键的是“series-系列”组件，构造完成后，即可调用`CesiumZondy.Overlayer.EchartsLayer(map, option).addTo(map)`方法，将ECharts图层添加到三维场景中。

    ```javascript
    function initEcharts() {
      var option = {
        title: {
          text: '全国道路（百万级）',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        progressive: 5000,
        cesium: {
          roam: true
        },
        series: [{
          type: 'lines',

          coordinateSystem: 'cesium',

          blendMode: 'lighter',

          dimensions: ['value'],

          data: new Float64Array(),
          polyline: true,
          large: true,

          lineStyle: {
            color: 'blue',
            width: 1.0,
            opacity: 0.9
          }
        }]
      }

      layer = new CesiumZondy.Overlayer.EchartsLayer(map, option).addTo(map);
    }
    ```

### 关键接口

#### 1.【】

##### （1）``：

|参数名|类 型|说 明|
|-|-|-|
|id|Number|模型|
