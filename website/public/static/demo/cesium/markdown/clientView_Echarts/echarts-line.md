## 路径图-渐进绘制

### 示例功能

本示例对接百度ECharts，实现在三维场景中加载ECharts路径图，基于北京市公交路线数据实现路径图的渐进绘制。

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

3. 数据准备、配置参数项：本示例从json文件中读取北京市公交路线数据，并按照格式要求进行处理；然后构建配置项，并创建各种需要的组件，其中最关键的是“series-系列”组件；构造完成后，即可调用`CesiumZondy.Overlayer.EchartsLayer(map, option).addTo(map)`方法，将ECharts图层添加到三维场景中。

    ```javascript
    $.get('./static/data/echarts/line-bus.json', function (data) {
        busLines = [].concat.apply([], data.map(function (busLine, idx) {
            var prevPt;
            var points = [];
            for (var i = 0; i < busLine.length; i += 2) {
                var pt = [busLine[i], busLine[i + 1]];
                if (i > 0) {
                    pt = [
                        prevPt[0] + pt[0],
                        prevPt[1] + pt[1]
                    ];
                }
                prevPt = pt;

                points.push([pt[0] / 1e4, pt[1] / 1e4]);
            }
            return {
                coords: points
            };
        }));
        var option = {
            cesium: {
                roam: true
            },
            series: [{
                type: 'lines',
                coordinateSystem: 'cesium',
                polyline: true,
                data: busLines,
                silent: true,
                lineStyle: {
                    normal: {
                        color: '#c23531',
                        color: 'rgb(200, 35, 45)',
                        opacity: 0.2,
                        width: 1
                    }
                },
                progressiveThreshold: 500,
                progressive: 200
            }]
        }
        layer = new CesiumZondy.Overlayer.EchartsLayer(map, option).addTo(map);
    });
    ```

### 关键接口

#### 1.【】

##### （1）``：

|参数名|类 型|说 明|
|-|-|-|
|id|Number|模型|
