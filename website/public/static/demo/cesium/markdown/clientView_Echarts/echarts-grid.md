## 自定义-网格专题图

### 示例功能

本示例对接百度ECharts，实现在三维场景中加载自定义的网格专题图。

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

3. 数据准备：准备网格数据，并按照格式要求进行处理；

    ```javascript
    function renderItemFunc(params, api) {
        var context = params.context;
        var lngIndex = api.value(0);
        var latIndex = api.value(1);
        var coordLeftTop = [+(latExtent[0] + lngIndex * cellSizeCoord[0]).toFixed(6), +(lngExtent[0] + latIndex *
            cellSizeCoord[1]).toFixed(6)];
        var pointLeftTop = getCoord(params, api, lngIndex, latIndex);
        var pointRightBottom = getCoord(params, api, lngIndex + 1, latIndex + 1);

        return {
            type: 'rect',
            shape: {
                x: pointLeftTop[0],
                y: pointLeftTop[1],
                width: pointRightBottom[0] - pointLeftTop[0],
                height: pointRightBottom[1] - pointLeftTop[1]
            },
            style: api.style({
                stroke: 'rgba(0,0,0,0.1)'
            }),
            styleEmphasis: api.styleEmphasis()
        };
    }

    function getCoord(params, api, lngIndex, latIndex) {
        var coords = params.context.coords || (params.context.coords = []);
        var key = lngIndex + '-' + latIndex;
        return coords[key] || (coords[key] = api.coord([+(latExtent[0] + lngIndex * cellSizeCoord[0]).toFixed(6), +
            (lngExtent[0] + latIndex * cellSizeCoord[1]).toFixed(6)
        ]));
    }
    ```

4. 配置参数项：创建各种需要的组件，如标题、图例、提示框等，其中最关键的是“series-系列”组件，构造完成后，即可调用`CesiumZondy.Overlayer.EchartsLayer(map, option).addTo(map)`方法，将ECharts图层添加到三维场景中。

    ```javascript
    function initEcharts() {
        var option = {
            tooltip: {},
            visualMap: {
                type: 'piecewise',
                inverse: true,
                top: 10,
                left: 10,
                pieces: [{
                    value: 0,
                    color: COLORS[0]
                }, {
                    value: 1,
                    color: COLORS[1]
                }, {
                    value: 2,
                    color: COLORS[2]
                }, {
                    value: 3,
                    color: COLORS[3]
                }, {
                    value: 4,
                    color: COLORS[4]
                }, {
                    value: 5,
                    color: COLORS[5]
                }],
                borderColor: '#ccc',
                borderWidth: 1,
                backgroundColor: '#eee',
                dimension: 2,
                inRange: {
                    color: COLORS,
                    opacity: 0.8
                }
            },
            cesium: {
                roam: true
            },
            geo: {
                geoIndex: 0
            },
            series: [{
                type: 'custom',
                coordinateSystem: 'cesium',
                data: griddata,
                renderItem: renderItemFunc,
                animation: false,
                itemStyle: {
                    emphasis: {
                        color: 'yellow'
                    }
                },
                encode: {
                    tooltip: 2
                }
            }]
        };

        layer = new CesiumZondy.Overlayer.EchartsLayer(map, option).addTo(map);
    }
    ```

### 关键接口

#### 1.【】

##### （1）``：

|参数名|类 型|说 明|
|-|-|-|
|id|Number|模型|
