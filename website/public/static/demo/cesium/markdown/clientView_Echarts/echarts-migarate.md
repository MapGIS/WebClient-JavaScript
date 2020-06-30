## 路径图-模拟迁徙

### 示例功能

本示例对接百度ECharts，实现在三维场景中加载ECharts路径图，根据虚拟数据实现“模拟迁徙”地图可视化。路径图用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化。

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

3. 数据准备：准备全国主要城市的坐标数据，以及迁徙的数据，并按照格式要求进行处理；

    ``` javascript
    var geoCoordMap = {
        '上海': [121.4648, 31.2891],
        '东莞': [113.8953, 22.901],
        '东营': [118.7073, 37.5513],
        '中山': [113.4229, 22.478],
        ···
    };

    var BJData = [
        [{name: '北京'}, {name: '上海',value: 95}],
        [{name: '北京'}, {name: '广州',value: 90}],
        [{name: '北京'}, {name: '大连',value: 80}],
        ···
    ];

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord]
                });
            }
        }
        return res;
    };
    ```

4. 配置参数项：创建各种需要的组件，如标题、图例、提示框等，其中最关键的是“series-系列”组件，构造完成后，即可调用`CesiumZondy.Overlayer.EchartsLayer(map, option).addTo(map)`方法，将ECharts图层添加到三维场景中。

    ``` javascript
    var planePath ='path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    var color = ['#a6c84c', '#ffa022', '#46bee9'];
    var series = [];
    [
        ['北京', BJData],
        ['上海', SHData],
        ['广州', GZData]
    ].forEach(function (item, i) {
        series.push({
            name: item[0] + ' Top10',
            coordinateSystem: 'cesium',
            type: 'lines',
            zlevel: 1,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 0,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        }, {
            name: item[0] + ' Top10',
            coordinateSystem: 'cesium',
            type: 'lines',
            zlevel: 2,
            effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 1,
                    opacity: 0.4,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        }, {
            name: item[0] + ' Top10',
            type: 'effectScatter',
            coordinateSystem: 'cesium',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            symbolSize: function (val) {
                return val[2] / 8;
            },
            itemStyle: {
                normal: {
                    color: color[i]
                }
            },
            data: item[1].map(function (dataItem) {
                return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([
                        dataItem[1].value
                    ])
                };
            })
        });
    });

    option = {
        cesium: {
            roam: true
        },
        coordinateSystem: 'cesium',
        title: {
            text: '模拟迁徙',
            subtext: '数据纯属虚构',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            top: 'top',
            left: 'left',
            data: ['北京 Top10', '上海 Top10', '广州 Top10'],
            textStyle: {
                color: '#fff'
            },
            selectedMode: 'single'
        },
        series: series
    };

    layer = new CesiumZondy.Overlayer.EchartsLayer(map, option).addTo(map);
    ```

### 关键接口

#### 1.【】

##### （1）``：

|参数名|类 型|说 明|
|-|-|-|
|id|Number|模型|
