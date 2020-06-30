## 世界航线


### 示例功能

本实例通过读取json文件的世界航线数据，在地图中可视化的展示不同城市之间的航班飞行轨迹。

### 示例实现

本示例需要使用include-mapboxgl-local.js开发库实现，通过echarts框架的关键接口`setOption()`实现世界航线加载，示例通过<a target="_blank" href="https://echarts.apache.org/zh/tutorial.html#%E4%BD%BF%E7%94%A8%20ECharts%20GL%20%E5%AE%9E%E7%8E%B0%E5%9F%BA%E7%A1%80%E7%9A%84%E4%B8%89%E7%BB%B4%E5%8F%AF%E8%A7%86%E5%8C%96">Echarts GL</a>进行数据的渲染显示。

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

2. 获取世界航线数据，通过`$.getJSON()`接口获取到世界航线数据，将拿到的数据处理为echarts需要的格式；

   ```javascript
   $.getJSON("../../static/data/echartsgl/lines/lines.json",  function(){})
   ```
   
3. 页面展示世界航线可视化效果，通过echarts的`setOption()`方法加载地图与世界航线数据进行可视化显示；