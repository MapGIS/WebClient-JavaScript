## 飞行航线

### 示例功能

在地图上加载全球范围的不同城市之间的航班飞行轨迹，展示大数据量的地图可视化效果。

### 示例实现

本示例需要使用include-mapboxgl-local.js开发库实现，通过关键接口`mapboxgl.zondy.EchartsLayer()`实现微博签到数据的加载。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

#### 百度 Echarts

> <a target="_blank" href="http://echarts.baidu.com/api.html#echarts">Echarts官方教程</a>  <a href="http://echarts.baidu.com/download.html" target="_blank">官方下载</a>

### 实现步骤

1. 引用开发库，本示例通过本地离线include-mapboxgl-local.js脚本引入开发库；

2. 创建`id="map"`的div作为地图容器，并设置其样式；

3. 创建地图对象，设置地图的必要参数，如地图div容器、缩放层级、中心点等，具体操作参考`互联网地图`目录下的`天地图墨卡托`示例；

4. 加载飞行航线数据，通过mapboxgl扩展的EchartsLayer图层实现，其中的参数option与<a target="_blank" href="http://echarts.baidu.com/api.html#echarts">echarts</a>方法`setOption`中一致；

   > 由于echart本身是作用在百度地图上的，因此别的地图在使用的时候需要设置对应的坐标系，以mapboxgl举例，关键代码如下

   ```javascript
   // option的关键参数
   var option = {
      mapboxgl: {     //关键地方---1
         // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
         roam: true
      },
      series: [{      //关键地方---2
         // 坐标系
         coordinateSystem: 'mapboxgl',
      }]
   };
   ```

   ```javascript
   layer = new mapboxgl.zondy.EchartsLayer(map, option).addTo(map);
   ```

5. 浏览矢量瓦片地图服务；

> 特别说明

MapGIS Client for JavaScript在MapboxGL中对接了百度Echarts图表插件，若插件本身存在问题，请优先参考<a target="_blank" href="http://echarts.baidu.com/api.html#echarts">Echarts官网</a>解决方案。如果依赖Echarts新的东西，请使用Echarts原生的用法（即屏蔽此例的用法）。

### 关键接口

#### 【echarts图层】EchartsLayer

##### （1）`mapboxgl.zondy.EchartsLayer(map, options)`：echarts图层的构造函数

基于mapboxgl的Layer对象进行的拓展，通过该拓展可以提供echarts的可视化功能

> `EchartsLayer`主要参数

| 参数名  | 类型   | 描述                                                         |
| ------- | ------ | ------------------------------------------------------------ |
| map     | Object | 传入的mapboxgl的地图对象                                     |
| options | Object | echarts.options 使用 option 来描述其对图表的各种需求，包括：有什么数据、要画什么图表、图表长什么样子、含有什么组件、组件能操作什么事情等等。简而言之，option 表述了：数据、数据如何映射成图形、交互行为。 |

##### （2）`hide()`：隐藏图层

##### （3）`remove()`：删除图层

##### （4）`show()`：显示图层

##### （5）`update(option)`：更新图层

ECharts 由数据驱动，数据的改变驱动图表展现的改变，因此动态数据的实现也变得异常简单。所有数据的更新都通过 setOption实现，你只需要定时获取数据，setOption 填入数据，而不用考虑数据到底产生了那些变化，ECharts 会找到两组数据之间的差异然后通过合适的动画去表现数据的变化。

> `update`主要参数

| 参数   | 类型 | 描述           |
| ------ | ---- | -------------- |
| option | *    | echarts.option |