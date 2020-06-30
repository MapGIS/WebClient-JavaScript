## 散点图-空气质量

### 示例功能

本示例对接百度ECharts，实现在三维场景中加载ECharts散点图，基于全国主要城市空气质量数据实现散点图的可视化。

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

3. 数据准备：准备全国主要城市的数据，包括名称、坐标点、空气质量，并按照格式要求进行处理；

    ```javascript
    function initData() {
        data = [
            {name: '海门',value: 9},
            {name: '鄂尔多斯',value: 12},
            {name: '招远',value: 12},
            {name: '舟山',value: 12},
            ···
        ];
        geoCoordMap = {
            '海门': [121.15, 31.89],
            '鄂尔多斯': [109.781327, 39.608266],
            '招远': [120.38, 37.35],
            '舟山': [122.207216, 29.985295],
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
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };
    ```

4. 配置参数项：创建各种需要的组件，如标题、图例、提示框等，其中最关键的是“series-系列”组件，构造完成后，即可调用`CesiumZondy.Overlayer.EchartsLayer(map, option).addTo(map)`方法，将ECharts图层添加到三维场景中。

    ```javascript
    function initEcharts() {
        option = {
            title: {
                text: '全国主要城市空气质量 - 百度地图提供数据',
                textStyle: {
                    color: '#eee'
                },
                subtext: 'data from PM25.in',
                sublink: 'http://www.pm25.in',
                left: 'center'
            },
            legend: {
                orient: 'vertical',
                y: 'top',
                x: 'left',
                data: ['pm2.5'],
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            cesium: {
                roam: true
            },
            series: [{
                    name: 'pm2.5',
                    type: 'scatter',
                    coordinateSystem: 'cesium',
                    data: convertData(data),
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    },
                    zlevel: 1
                },
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'cesium',
                    data: convertData(data.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 6)),
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                }
            ]
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
