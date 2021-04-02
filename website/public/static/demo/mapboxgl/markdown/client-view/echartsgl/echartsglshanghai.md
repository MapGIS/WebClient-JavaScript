## 上海房价图

### 示例功能

&ensp;&ensp;&ensp;&ensp;在地图中的不同地理位置通过三维柱状图方式可视化展示不同区域房价的情况。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-mapboxgl-local.js】开发库实现，通过echarts框架的关键接口`setOption()`实现上海房价图加载，示例通过<a target="_blank" href="https://echarts.apache.org/zh/tutorial.html#%E4%BD%BF%E7%94%A8%20ECharts%20GL%20%E5%AE%9E%E7%8E%B0%E5%9F%BA%E7%A1%80%E7%9A%84%E4%B8%89%E7%BB%B4%E5%8F%AF%E8%A7%86%E5%8C%96">Echarts GL</a>进行数据的渲染显示。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

#### 百度 Echarts

> <a target="_blank" href="http://echarts.baidu.com/api.html#echarts">Echarts官方教程</a>  <a href="http://echarts.baidu.com/download.html" target="_blank">官方下载</a>

#### Echarts GL

> <a target="_blank" href="https://echarts.apache.org/zh/tutorial.html#%E4%BD%BF%E7%94%A8%20ECharts%20GL%20%E5%AE%9E%E7%8E%B0%E5%9F%BA%E7%A1%80%E7%9A%84%E4%B8%89%E7%BB%B4%E5%8F%AF%E8%A7%86%E5%8C%96">Echarts GL</a>（后面统一简称 GL）为ECharts补充了丰富的三维可视化组件，如果你对ECharts有一定了解的话，也可以很快的上手GL，GL的配置项完全是按照ECharts的标准和上手难度来设计的。

> 由于Echarts GL是通过 html z-index的技术进行的`叠加渲染`，即使用MapBox作为地理地图，然后EchartGL渲染一层漂亮的图层进行叠加，因此在拖拽的时候能够明显的感受到两个图层的不一致，因此这种技术只能用于单独的展示型界面,无法和其他的带有复杂逻辑的界面进行交互。

> 在展示一些跟踪型的任务的时候，请不要使用EchartGL而是使用MapBox原生的开发方式。

> `由于百度的Echarts GL`使用的数据源各种各样(很多来自Uber，百度，阿里，ArcGIS等)，而目前暂未能完全直接对接MapGIS平台的数据，如果对数据转换存在困难，请通过<a target="_blank" href="http://smaryun.com/dev/">司马云</a>网站联系我们的工作人员，帮助您解决对应的数据格式问题。

#### 其他问题

&ensp;&ensp;&ensp;&ensp;由于百度内部维护的mapbox的版本较低，并且echart 4.0版本已经推出。对MapBox的支持重心下放，这个展示效果在echarts4.0使用存在小bug，因此本例中使用的是echarts3.0的版本。

> 衷心的希望少使用这个Echarts GL类库，这里的所有效果都可以通过原生的Mapbox开发方式实现......

### 实现步骤

**Step 1.<font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线【include-mapboxgl-local.js】脚本引入开发库；

**Step 2. <font color=red>获取上海房价数据</font>**：
 &ensp;&ensp;&ensp;&ensp;通过`$.getJSON()`接口获取到上海房价数据，将拿到的数据处理为echarts需要的格式；

* Example:
   ```javascript
      var uploadedDataURL = "../../static/data/echartsgl/shanghai/data.json";
      $.getJSON(uploadedDataURL,  function(){})
   ```

**Step 3. <font color=red>页面展示上海房价可视化效果</font>**：
 &ensp;&ensp;&ensp;&ensp; 通过echarts的`setOption()`方法加载地图与上海房价数据进行可视化显示。