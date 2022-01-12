## 热力图-主要城市PM 2.5

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例对接百度ECharts，实现在三维场景中加载ECharts热力图，基于全国主要城市PM 2.5数据实现热力图的可视化。热力图采用特殊高亮的形式显示访客热衷的页面区域和访客所在的地理区域。

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
&ensp;&ensp;&ensp;&ensp; 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，并加第三方互联网地图作为底图；

**Step 3. <font color=red>数据准备</font>**：
&ensp;&ensp;&ensp;&ensp;准备全国主要城市的数据，包括名称、坐标点、PM 2.5值，并按照格式要求进行处理；

* Example:
  ```javascript
    function initData() {
      data = [
        {name: "海门",value: 9,},
        {name: "鄂尔多斯",value: 12,},
        {name: "招远",value: 12,},
        ···
      ];
      geoCoordMap = {
        海门: [121.15, 31.89],
        鄂尔多斯: [109.781327, 39.608266],
        招远: [120.38, 37.35],
        ···
      };
    }
    function convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      return res;
    }
  ```

**Step 4. <font color=red>配置参数项</font>**：
&ensp;&ensp;&ensp;&ensp;创建各种需要的组件，如标题、图例、提示框等，其中最关键的是“series-系列”组件，构造完成后，即可调用`CesiumZondy.Overlayer.EchartsLayer(map, option).addTo(map)`方法，将ECharts图层添加到三维场景中。

* Example:
  ```javascript
    option = {
      title: {
        text: "全国主要城市PM 2.5热力图",
        textStyle: {
          color: "#eee",
        },
        subtext: "data from PM25.in",
        sublink: "http://www.pm25.in",
        left: "center",
      },
      cesium: {
        roam: false,
      },
      visualMap: {
        show: false,
        top: "top",
        min: 0,
        max: 5,
        seriesIndex: 0,
        calculable: true,
        inRange: {
          color: ["blue", "blue", "green", "yellow", "red"],
        },
      },
      series: [
        {
          name: "热力图",
          type: "heatmap",
          coordinateSystem: "cesium",
          data: convertData(data),
          pointSize: 5,
          blurSize: 6,
        },
      ],
    };
    layer = new CesiumZondy.Overlayer.EchartsLayer(map, option).addTo(map);
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
