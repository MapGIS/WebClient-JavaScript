## 叠加分析

### 示例功能

&ensp;&ensp;&ensp;&ensp;叠加分析是基于两个或两个以上的图层来进行空间逻辑的交、并、差运算，并对叠加范围内的属性进行分析评定，将叠加后的空间要素裁剪组织到一个新的图层中，包括图层叠加、多边形叠加两种方式，其中叠加分析的原理与方法类似，只是调用接口不同。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-mapboxgl-local.js】 开发库实现，通过关键接口`Zondy.Service.OverlayByLayer()`实现 MapGIS 矢量图层之间的`图层叠加分析`功能，类似的叠加分析服务如`多边形叠加分析`的关键接口`Zondy.Service.OverlayByPolygon()`。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;引用开发库，本示例通过本地离线【include-mapboxgl-local.js】脚本引入开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="map"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数，如地图 div 容器、缩放层级、中心点等，以及在地图中添加矢量图层，矢量图层加载可以参考`MapGIS IGServer`目录下的`要素`-`要素编辑`示例；

**Step 4. <font color=red>创建图层叠加分析服务对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建**图层叠加分析服务**对象，并使用该对象执行叠加分析操作；

- Example:
  ```javascript
    //结果图层的名称
    var resultname = resultBaseUrl + 'overLayByLayerAnalysisResultLayer' + getCurentTime()
    //实例化OverlayByLayer类
    var overlayParam = new Zondy.Service.OverlayByLayer({
      //IGServer所在ip地址
      ip: 'develop.smaryun.com',
      //IGServer请求端口号
      port: '6163',
      //设置被叠加图层URL
      srcInfo1: 'gdbp://MapGisLocal/ClientTheme/ds/epsg3857/sfcls/湖北省行政区1_1',
      //设置叠加图层URL
      srcInfo2: 'gdbp://MapGisLocal/ClientTheme/ds/epsg3857/sfcls/湖北省湖泊1_1',
      //设置结果URL
      desInfo: resultname,
      //设置结果图层的图形参数信息
      infoOptType: 2,
      //求交
      overType: 1,
      //允许重算面积
      isReCalculate: true,
      //容差半径
      radius: 0.05,
    })
    //调用基类的execute方法，执行叠加分析， onSuccess为结果回调函数
    overlayParam.execute(AnalysisSuccess, 'post', false, 'json', AnalysisError)
  ```

**Step 5. <font color=red>结果展示</font>**:
&ensp;&ensp;&ensp;&ensp;叠加分析结果展示，在叠加分析执行成功的回调函数加载叠加结果矢量图层。

- Example:
  ```javascript
    //结果图层的名称
    var resultLayerUrl = data.results[0].Value
    //将结果图层添加到地图视图中显示
    var resultLayer = new mapboxgl.Zondy.Map.MapVectorLayer(encodeURIComponent(resultBaseUrl + resultLayerUrl), {
      //IGServer所在ip地址
      ip: 'develop.smaryun.com',
      //IGServer请求端口号
      port: '6163',
      //图层guid
      guid: new Date().getTime().toString(),
    })
    resultLayer.addToMap(map)
  ```

### 关键接口

#### 【图层叠加分析类】`Zondy.Service.OverlayByLayer(option)`

`父类`：<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.OverlayBase.html">Zondy.Service.OverlayBase</a>

| 参数名 | 类型   | 描述       |
| ------ | ------ | ---------- |
| option | Object | 属性键值对 |

- `option`属性主要参数

| 属性     | 类型   | 默认值 | 描述                     |
| :------- | :----- | :----- | :----------------------- |
| srcInfo2 | String | null   | （可选）设置叠加图层 URL |

##### 【method】`execute(onSuccess, way, onError)`：执行空间分析服务

| 参数      | 类型     | 描述                                                                                                      |
| :-------- | :------- | :-------------------------------------------------------------------------------------------------------- |
| onSuccess | function | `必要参数`，执行成功后的回调函数                                                                          |
| way       | String   | 服务器请求类型,'POST' or 'GET'，默认为'Get',当所需要发送的数据量比较大时，请选择'Post',否则可能会执行失败 |
| onError   | function | 错误回调函数                                                                                              |

##### 【method】`getFullUrl()`：获取服务完整的地址
