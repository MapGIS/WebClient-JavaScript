## 路径图-中国100万线

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例对接百度ECharts，实现在三维场景中加载ECharts路径图，基于中国100万线数据实现路径图的可视化。

> 百度 ECharts

&ensp;&ensp;&ensp;&ensp;ECharts完整、详细使用方法可参考：<a href="http://echarts.baidu.com/api.html#echarts" target="_blank">官方教程API</a>，开发库下载可参考：<a href="http://echarts.baidu.com/download.html" target="_blank">官方下载</a>

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，通过关键接口`CesiumZondy.Overlayer.EchartsLayer()`来实现ECharts图层的加载。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

> 特别说明：MapGIS Client for JavaScript在Cesium中对接了百度Echarts图表插件，若插件本身存在问题，请优先参考Echarts官网解决方案。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用local本地【include-cesium-local.js】开发库，需要设置`include`属性为`echarts`；

* Example:
  ```javascript
  <script include="echarts" src="./static/libs/include-cesium-local.js"></script>
  ```

**Step 2. <font color=red>创建三维地图容器加载三维球控件,并加载底图</font>**：
&ensp;&ensp;&ensp;&ensp; 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，并加载第三方互联网地图作为底图；

**Step 3. <font color=red>数据准备</font>**：
&ensp;&ensp;&ensp;&ensp;本示例从离线数据文件中获取中国100万线数据，然后按照格式要求进行处理；

* Example:
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

**Step 4. <font color=red>配置参数项</font>**：
&ensp;&ensp;&ensp;&ensp;创建各种需要的组件，如标题、图例、提示框等，其中最关键的是“series-系列”组件，构造完成后，即可调用`CesiumZondy.Overlayer.EchartsLayer(map, option).addTo(map)`方法，将ECharts图层添加到三维场景中。

* Example:
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

#### 1.【ECharts图层类】`CesiumZondy.Overlayer.EchartsLayer(map, option)`

&ensp;&ensp;&ensp;&ensp;基于mapboxgl的Layer对象进行的拓展，通过该拓展可以提供echarts的可视化功能。

| 参数名  | 类型   | 描述                                                         |
| ------- | ------ | ------------------------------------------------------------ |
| map     | Object | 传入的Cesium的地图对象                                     |
| option | Object | echarts.options 使用 option 来描述其对图表的各种需求，包括：有什么数据、要画什么图表、图表长什么样子、含有什么组件、组件能操作什么事情等等。简而言之，option 表述了：数据、数据如何映射成图形、交互行为。 |

##### 【method】`hide()`：隐藏图层

##### 【method】`remove()`：删除图层

##### 【method】`show()`：显示图层

##### 【method】`update(option)`：更新图层

&ensp;&ensp;&ensp;&ensp;ECharts 由数据驱动，数据的改变驱动图表展现的改变，因此动态数据的实现也变得异常简单。所有数据的更新都通过 setOption实现，你只需要定时获取数据，setOption 填入数据，而不用考虑数据到底产生了那些变化，ECharts 会找到两组数据之间的差异然后通过合适的动画去表现数据的变化。

| 参数   | 类型 | 描述           |
| ------ | ---- | -------------- |
| option | *    | echarts.option |
