## 北京公交夜景

### 示例功能

本实例通过读取shapefile文件的建筑数据与北京市的公交轨迹数据，在地图中可视化的展示北京市公交轨迹在运行情况。

### 示例实现

本示例需要使用include-mapboxgl-local.js开发库实现，通过echarts框架的关键接口`setOption()`实现北京公交夜景加载，示例通过<a target="_blank" href="https://echarts.apache.org/zh/tutorial.html#%E4%BD%BF%E7%94%A8%20ECharts%20GL%20%E5%AE%9E%E7%8E%B0%E5%9F%BA%E7%A1%80%E7%9A%84%E4%B8%89%E7%BB%B4%E5%8F%AF%E8%A7%86%E5%8C%96">Echarts GL</a>进行数据的渲染显示。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

#### 百度 Echarts

> <a target="_blank" href="http://echarts.baidu.com/api.html#echarts">Echarts官方教程</a>  <a href="http://echarts.baidu.com/download.html" target="_blank">官方下载</a>

#### Echarts GL

> <a target="_blank" href="https://echarts.apache.org/zh/tutorial.html#%E4%BD%BF%E7%94%A8%20ECharts%20GL%20%E5%AE%9E%E7%8E%B0%E5%9F%BA%E7%A1%80%E7%9A%84%E4%B8%89%E7%BB%B4%E5%8F%AF%E8%A7%86%E5%8C%96">Echarts GL</a>（后面统一简称 GL）为ECharts补充了丰富的三维可视化组件，如果你对ECharts有一定了解的话，也可以很快的上手GL，GL的配置项完全是按照ECharts的标准和上手难度来设计的。

> 由于Echarts GL是通过 html z-index的技术进行的`叠加渲染`，即使用MapBox作为地理地图，然后EchartGL渲染一层漂亮的图层进行叠加，因此在拖拽的时候能够明显的感受到两个图层的不一致，因此这种技术只能用于单独的展示型界面,无法和其他的带有复杂逻辑的界面进行交互。

> 在展示一些跟踪型的任务的时候，请不要使用EchartGL而是使用MapBox原生的开发方式。

> `由于百度的Echarts GL`使用的数据源各种各样(很多来自Uber，百度，阿里，ArcGIS等)，而目前暂未能完全直接对接MapGIS平台的数据，如果对数据转换存在困难，请通过<a target="_blank" href="http://smaryun.com/dev/">司马云</a>网站联系我们的工作人员，帮助您解决对应的数据格式问题。

#### 加载shapefile

通过MapGIS 10桌面工具将`MapGIS矢量数据`转换为`shapefile`文件，<a target="_blank" href="https://github.com/mbostock/shapefile">shapefile.js</a>中要求`shapefile`的文件编码格式为Window-1252，因此请注意编码问题, `如果个人处理不了文件的编码问题，请直接使用ArcGIS软件转成shapefile即可`。

#### 其他问题

由于百度内部维护的mapbox的版本较低，并且echart 4.0版本已经推出。对MapBox的支持重心下放，这个展示效果在echarts4.0使用存在小bug，因此本例中使用的是echarts3.0的版本。

> 衷心的希望少使用这个Echarts GL类库，这里的所有效果都可以通过原生的Mapbox开发方式实现......

### 实现步骤

1. 引用开发库，本示例通过本地离线include-mapboxgl-local.js脚本引入开发库；

2. 处理北京市局部建筑数据，读取存储建筑数据的shapefile文件，将读取到的数据转换位GeoJSON格式，读取shapefile文件的方法请参考<a target="_blank" href="https://github.com/mbostock/shapefile">shapefile.js</a>相关API，并整理echarts需要的地图区域`regions`数据；

   ```javascript
   var readShp = new Promise(function (resolve, reject) {
     shapefile.open('../../static/data/echartsgl/beijing/buildings.shp', '../../static/data/echartsgl/beijing/buildings.dbf')
       .then(source => source.read()
         .then(function append(result) {
           if (result.done) {
             resolve();
             return;
           }
           var feature = result.value;
           feature.properties.name = geoJSON.features.length + '';
           regions.push({
             name: geoJSON.features.length + '',
             value: 1,
             height: 100
           })
           geoJSON.features.push(feature);
           return source.read().then(append);
         })
       );
   });
   ```

   通过echarts的`registerMap()`接口将建筑数据渲染到页面中。

   ```javascript
   echarts.registerMap('buildings', geoJSON);
   ```

3. 处理公交轨迹数据，通过`$.getJSON()`接口获取到公交轨迹数据，将拿到的数据处理为echarts需要的格式；

   ```javascript
   $.getJSON('../../static/data/echartsgl/beijing/tracks-fake.json')
   ```

4. 页面展示建筑与公交轨迹可视化效果，通过echarts的`setOption()`方法加载地图与处理完成的公交轨迹数据，并设置地图区域数据；

   ```javascript
   myChart.setOption({
     mapbox: {
       center: [116.35, 39.9],
       zoom: 11,
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
           texture: '../../static/data/echartsgl/beijing/data.hdr',
           exposure: 1,
           diffuseIntensity: 0.5,
           specularIntensity: 2
         }
       }
     },
     series: [{
         type: 'map3D',
         coordinateSystem: 'mapbox',
         map: 'buildings',
         data: regions,
         shading: 'realistic',
         silent: true,
         instancing: true,
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
           trailLength: 3,
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
