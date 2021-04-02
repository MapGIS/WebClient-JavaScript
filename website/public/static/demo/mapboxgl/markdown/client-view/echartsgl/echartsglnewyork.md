## 纽约公交夜景

### 示例功能

&ensp;&ensp;&ensp;&ensp;本实例通过读取 json 文件的建筑数据与纽约市的公交轨迹数据，在地图中可视化的展示公交轨迹在纽约市运行情况。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-mapboxgl-local.js】开发库实现，通过 echarts 框架的关键接口`setOption()`实现纽约公交夜景加载，示例通过<a target="_blank" href="https://echarts.apache.org/zh/tutorial.html#%E4%BD%BF%E7%94%A8%20ECharts%20GL%20%E5%AE%9E%E7%8E%B0%E5%9F%BA%E7%A1%80%E7%9A%84%E4%B8%89%E7%BB%B4%E5%8F%AF%E8%A7%86%E5%8C%96">Echarts GL</a>进行数据的渲染显示。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

#### 百度 Echarts

> <a target="_blank" href="http://echarts.baidu.com/api.html#echarts">Echarts 官方教程</a> <a href="http://echarts.baidu.com/download.html" target="_blank">官方下载</a>

#### Echarts GL

> <a target="_blank" href="https://echarts.apache.org/zh/tutorial.html#%E4%BD%BF%E7%94%A8%20ECharts%20GL%20%E5%AE%9E%E7%8E%B0%E5%9F%BA%E7%A1%80%E7%9A%84%E4%B8%89%E7%BB%B4%E5%8F%AF%E8%A7%86%E5%8C%96">Echarts GL</a>（后面统一简称 GL）为 ECharts 补充了丰富的三维可视化组件，如果你对 ECharts 有一定了解的话，也可以很快的上手 GL，GL 的配置项完全是按照 ECharts 的标准和上手难度来设计的。

> 由于 Echarts GL 是通过 html z-index 的技术进行的`叠加渲染`，即使用 MapBox 作为地理地图，然后 EchartGL 渲染一层漂亮的图层进行叠加，因此在拖拽的时候能够明显的感受到两个图层的不一致，因此这种技术只能用于单独的展示型界面,无法和其他的带有复杂逻辑的界面进行交互。

> 在展示一些跟踪型的任务的时候，请不要使用 EchartGL 而是使用 MapBox 原生的开发方式。

> `由于百度的Echarts GL`使用的数据源各种各样(很多来自 Uber，百度，阿里，ArcGIS 等)，而目前暂未能完全直接对接 MapGIS 平台的数据，如果对数据转换存在困难，请通过<a target="_blank" href="http://smaryun.com/dev/">司马云</a>网站联系我们的工作人员，帮助您解决对应的数据格式问题。

#### 其他问题

&ensp;&ensp;&ensp;&ensp;由于百度内部维护的 mapbox 的版本较低，并且 echart 4.0 版本已经推出。对 MapBox 的支持重心下放，这个展示效果在 echarts4.0 使用存在小 bug，因此本例中使用的是 echarts3.0 的版本。

> 衷心的希望少使用这个 Echarts GL 类库，这里的所有效果都可以通过原生的 Mapbox 开发方式实现......

### 实现步骤

**Step 1.<font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线【include-mapboxgl-local.js】脚本引入开发库；

**Step 2. <font color=red>处理纽约市局部建筑数据</font>**：
&ensp;&ensp;&ensp;&ensp;读取存储建筑数据 json 文件，将读取到的数据转处理为 GeoJSON 格式，通过 echarts 的`registerMap()`接口将建筑数据渲染到页面中，并整理 echarts 需要的地图区域`regionsData`数据；

- Example:
  ```javascript
    $.getJSON('../../static/data/echartsgl/newyork/buildings.json', function(buildingsGeoJSON) {
      var builds = buildingsGeoJSON.map(function(feature) {
        return {
          type: 'Feature',
          properties: {
            name: Math.random().toString(),
            height: feature.height || 100,
          },
          geometry: {
            type: 'Polygon',
            coordinates: [feature.polygon],
          },
        }
      })
      echarts.registerMap('buildings', {
        features: builds,
      })
      var regionsData = builds.map(function(feature) {
        return {
          name: feature.properties.name,
          value: Math.random() * 1,
          height: feature.properties.height,
          itemStyle: {
            color: 'white',
            borderColor: 'white',
          },
        }
      })
    })
  ```

**Step 3. <font color=red>处理公交轨迹数据</font>**：
&ensp;&ensp;&ensp;&ensp;通过`$.getJSON()`接口获取到公交轨迹数据，将拿到的数据处理为 echarts 需要的格式；

- Example:
  ```javascript
    $.getJSON('../../static/data/echartsgl/newyork/lines.json', function() {})
  ```

**Step 4. <font color=red>页面展示建筑与公交轨迹可视化效果</font>**：
&ensp;&ensp;&ensp;&ensp;通过 echarts 的`setOption()`方法加载处理完成的公交轨迹数据与地图区域数据。

- Example:
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
            quality: 'high',
          },
          screenSpaceReflection: {
            enable: true,
          },
        },
        light: {
          main: {
            intensity: 1,
            shadow: true,
            shadowQuality: 'high',
          },
          ambient: {
            intensity: 0,
          },
          ambientCubemap: {
            texture: '../../static/data/echartsgl/capeton/data.hdr',
            exposure: 1,
            diffuseIntensity: 0.5,
            specularIntensity: 2,
          },
        },
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
          },
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
            spotIntensity: 10,
          },
          blendMode: 'lighter',
          polyline: true,
          data: taxiRoutes,
        },
      ],
    })
  ```
