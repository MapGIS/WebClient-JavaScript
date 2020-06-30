## 纽约公交夜景


### 示例功能

本实例通过读取json文件的建筑数据与纽约市的公交轨迹数据，在地图中可视化的展示公交轨迹在纽约市运行情况。

### 示例实现

本示例需要使用include-mapboxgl-local.js开发库实现，通过echarts框架的关键接口`setOption()`实现纽约公交夜景加载，示例通过<a target="_blank" href="https://echarts.apache.org/zh/tutorial.html#%E4%BD%BF%E7%94%A8%20ECharts%20GL%20%E5%AE%9E%E7%8E%B0%E5%9F%BA%E7%A1%80%E7%9A%84%E4%B8%89%E7%BB%B4%E5%8F%AF%E8%A7%86%E5%8C%96">Echarts GL</a>进行数据的渲染显示。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

#### 百度 Echarts

> <a target="_blank" href="http://echarts.baidu.com/api.html#echarts">Echarts官方教程</a>  <a href="http://echarts.baidu.com/download.html" target="_blank">官方下载</a>

#### Echarts GL

> <a target="_blank" href="https://echarts.apache.org/zh/tutorial.html#%E4%BD%BF%E7%94%A8%20ECharts%20GL%20%E5%AE%9E%E7%8E%B0%E5%9F%BA%E7%A1%80%E7%9A%84%E4%B8%89%E7%BB%B4%E5%8F%AF%E8%A7%86%E5%8C%96">Echarts GL</a>（后面统一简称 GL）为ECharts补充了丰富的三维可视化组件，如果你对ECharts有一定了解的话，也可以很快的上手GL，GL的配置项完全是按照ECharts的标准和上手难度来设计的。

> 由于Echarts GL是通过 html z-index的技术进行的`叠加渲染`，即使用MapBox作为地理地图，然后EchartGL渲染一层漂亮的图层进行叠加，因此在拖拽的时候能够明显的感受到两个图层的不一致，因此这种技术只能用于单独的展示型界面,无法和其他的带有复杂逻辑的界面进行交互。

> 在展示一些跟踪型的任务的时候，请不要使用EchartGL而是使用MapBox原生的开发方式。

> `由于百度的Echarts GL`使用的数据源各种各样(很多来自Uber，百度，阿里，ArcGIS等)，而目前暂未能完全直接对接MapGIS平台的数据，如果对数据转换存在困难，请通过<a target="_blank" href="http://smaryun.com/dev/">司马云</a>网站联系我们的工作人员，帮助您解决对应的数据格式问题。

#### 其他问题

由于百度内部维护的mapbox的版本较低，并且echart 4.0版本已经推出。对MapBox的支持重心下放，这个展示效果在echarts4.0使用存在小bug，因此本例中使用的是echarts3.0的版本。

> 衷心的希望少使用这个Echarts GL类库，这里的所有效果都可以通过原生的Mapbox开发方式实现......

### 实现步骤

1. 引用开发库，本示例通过本地离线include-mapboxgl-local.js脚本引入开发库；

2. 处理纽约市局部建筑数据，读取存储建筑数据json文件，将读取到的数据转处理为GeoJSON格式，通过echarts的`registerMap()`接口将建筑数据渲染到页面中，并整理echarts需要的地图区域`regionsData`数据；

   ```javascript
   $.getJSON('../../static/data/echartsgl/newyork/buildings.json', function (buildingsGeoJSON) {
     var builds = buildingsGeoJSON.map(function (feature) {
       return {
         "type": "Feature",
         "properties": {
           "name": Math.random().toString(),
           "height": feature.height || 100
         },
         "geometry": {
           "type": "Polygon",
           "coordinates": [feature.polygon]
         }
       }
     })
     echarts.registerMap('buildings', {
       "features": builds
     });
     var regionsData = builds.map(function (feature) {
       return {
         name: feature.properties.name,
         value: Math.random() * 1,
         height: feature.properties.height,
         itemStyle: {
           color: 'white',
           borderColor: 'white'
         }
       };
     });
   });
   ```

3. 处理公交轨迹数据，通过`$.getJSON()`接口获取到公交轨迹数据，将拿到的数据处理为echarts需要的格式；

   ```javascript
   $.getJSON('../../static/data/echartsgl/newyork/lines.json', function(){})
   ```

4. 页面展示建筑与公交轨迹可视化效果，通过echarts的`setOption()`方法加载处理完成的公交轨迹数据与地图区域数据；

   ```javascript
   myChart.setOption({
     mapbox: {
       center: [-74.01164278497646, 40.70769573605318],
       zoom: 14,
       pitch: 50,
       bearing: -10,
       altitudeScale: 2,
       style: 'mapbox://styles/mapbox/dark-v9',
       postEffect: {
         enable: true,
         screenSpaceAmbientOcclusion: {
           enable: true,
           intensity: 1.2,
           radius: 6,
           quality: 'high'
         },
         screenSpaceReflection: {
           enable: true
         }
       },
       light: {
         main: {
           intensity: 1,
           shadow: true,
           shadowQuality: 'high'
         },
         ambient: {
           intensity: 0.
         },
         ambientCubemap: {
           texture: '../../static/data/echartsgl/capeton/data.hdr',
           exposure: 1,
           diffuseIntensity: 0.5,
           specularIntensity: 2
         }
       }
     },
     series: [
       {
         type: 'map3D',
         map: 'buildings',
         coordinateSystem: 'mapbox',
         shading: 'realistic',
         silent: true,
         instancing: true,
         data: regionsData,
         realisticMaterial: {
           metalness: 1,
           roughness: 0.2,
         }
       },
       {
         type: 'lines3D',
         coordinateSystem: 'mapbox',
         effect: {
           show: true,
           constantSpeed: 1,
           trailWidth: 3,
           trailLength: 1,
           trailOpacity: 1,
           spotIntensity: 10
         },
         blendMode: 'lighter',
         polyline: true,
         data: taxiRoutes
       }
     ]
   });
   ```