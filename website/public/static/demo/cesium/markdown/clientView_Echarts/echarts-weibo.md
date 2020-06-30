## 散点图-微博签到图

### 示例功能

本示例对接百度ECharts，实现在三维场景中加载ECharts散点图，基于微博官方的签到数据实现“微博签到点亮中国”地图可视化。

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

3. 数据准备、配置参数项：本示例从json文件中读取数据，并按照格式要求进行处理；然后构建配置项，并创建各种需要的组件，如标题、图例、提示框等，其中最关键的是“series-系列”组件；构造完成后，即可调用`CesiumZondy.Overlayer.EchartsLayer(map, option).addTo(map)`方法，将ECharts图层添加到三维场景中。

    ``` javascript
    var grade = [
        "强",
        "中",
        "弱"
    ]
    var layer;
    $.get('./static/data/echarts/weibo.json', function (weiboData) {
        weiboData = weiboData.map(function (serieData, idx) {
            var px = serieData[0] / 1000;
            var py = serieData[1] / 1000;
            var res = [
                [px, py]
            ];

            for (var i = 2; i < serieData.length; i += 2) {
                var dx = serieData[i] / 1000;
                var dy = serieData[i + 1] / 1000;
                var x = px + dx;
                var y = py + dy;
                res.push([x.toFixed(2), y.toFixed(2), 1]);

                px = x;
                py = y;
            }
            return res;
        });

        option = {
            cesium: {
                roam: true
            },
            coordinateSystem: 'cesium',
            title: {
                text: "中国微博签到图",
                subtext: 'From MapGIS',
                sublink: 'http://www.smaryun.com',
                left: 'center',
                top: 'top',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {},
            legend: {
                left: 'right',
                top: 'top',
                data: [grade[0], grade[1], grade[2]],
                textStyle: {
                    color: '#ccc'
                }
            },
            series: [{
                name: grade[2],
                type: 'scatter',
                coordinateSystem: 'cesium',
                symbolSize: 1,
                large: true,
                itemStyle: {
                    normal: {
                        shadowBlur: 2,
                        shadowColor: 'rgba(37, 140, 249, 0.8)',
                        color: 'rgba(37, 140, 249, 0.8)'
                    }
                },
                data: weiboData[0]
            }, {
                name: grade[1],
                type: 'scatter',
                coordinateSystem: 'cesium',
                symbolSize: 1,
                large: true,
                itemStyle: {
                    normal: {
                        shadowBlur: 2,
                        shadowColor: 'rgba(14, 241, 242, 0.8)',
                        color: 'rgba(14, 241, 242, 0.8)'
                    }
                },
                data: weiboData[1]
            }, {
                name: grade[0],
                type: 'scatter',
                coordinateSystem: 'cesium',
                symbolSize: 1,
                large: true,
                itemStyle: {
                    normal: {
                        shadowBlur: 2,
                        shadowColor: 'rgba(255, 255, 255, 0.8)',
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                data: weiboData[2]
            }]
        };
        layer = new CesiumZondy.Overlayer.EchartsLayer(map, option).addTo(map);
    });
    ```

### 关键接口

#### 1.【】

##### （1）``：

|参数名|类 型|说 明|
|-|-|-|
|id|Number|模型|
