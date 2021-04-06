## 缓冲区分析

### 示例功能

&ensp;&ensp;&ensp;&ensp;缓冲区分析是指以点、线、面实体为基础，自动建立其周围一定宽度范围内的缓冲区多边形新图层，包括要素单圈缓冲区分析、要素多圈缓冲区分析两种方式，其中缓冲区分析的原理与方法类似，只是调用接口不同。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-mapboxgl-local.js】 开发库实现，通过关键接口`Zondy.Service.FeatureBuffByMultiplyRing()`实现 MapGIS 矢量要素的`要素多圈缓冲区分析`功能，类似的缓冲区分析服务如`要素单圈缓冲区分析`关键接口为`Zondy.Service.FeatureBuffBySingleRing()`。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;引用开发库，本示例通过本地离线【include-mapboxgl-local.js】 脚本引入开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="map"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数，如地图 div 容器、缩放层级、中心点等，以及在地图中添加矢量图层，矢量图层加载可以参考`MapGIS IGServer`目录下的`要素`-`要素编辑`示例；

**Step 4. <font color=red>准备要素</font>**:
&ensp;&ensp;&ensp;&ensp;准备要素，包含几何图形信息、属性结构、属性信息；

- 创建几何图形信息对象

  - Example:

  ```javascript
    //初始化Zondy.Object.FeatureGeometry对象
    var regGeo = new Zondy.Object.FeatureGeometry()
    //设置区要素的空间几何信息
    var gReg = new Zondy.Object.GRegion([
      new Zondy.Object.AnyLine([
        new Zondy.Object.Arc([
          new Zondy.Object.Point2D(lonLat2Mercator(112.59, 30.67).x, lonLat2Mercator(112.59, 30.67).y),
          new Zondy.Object.Point2D(lonLat2Mercator(112.8, 30.83).x, lonLat2Mercator(112.8, 30.83).y),
          new Zondy.Object.Point2D(lonLat2Mercator(112.86, 30.7).x, lonLat2Mercator(112.86, 30.7).y),
          new Zondy.Object.Point2D(lonLat2Mercator(113.28, 30.9).x, lonLat2Mercator(113.28, 30.9).y),
          new Zondy.Object.Point2D(lonLat2Mercator(113.45, 30.63).x, lonLat2Mercator(113.45, 30.63).y),
          new Zondy.Object.Point2D(lonLat2Mercator(113.45, 30.38).x, lonLat2Mercator(113.45, 30.38).y),
          new Zondy.Object.Point2D(lonLat2Mercator(112.9, 30.56).x, lonLat2Mercator(112.9, 30.56).y),
          new Zondy.Object.Point2D(lonLat2Mercator(112.86, 30.5).x, lonLat2Mercator(112.86, 30.5).y),
          new Zondy.Object.Point2D(lonLat2Mercator(112.59, 30.67).x, lonLat2Mercator(112.59, 30.67).y),
        ]),
      ]),
    ])
    //设置区要素几何信息
    regGeo.setRegGeom([gReg])
  ```

- 创建属性字段对象

  - Example:

  ```javascript
    //实例化CAttStruct类
    var regAttStr = new Zondy.Object.CAttStruct({
      // 属性字段名称
      FldName: ['ID', '面积', '周长', 'LayerID'],
      // 属性字段个数
      FldNumber: 4,
      // 属性字段类型
      FldType: ['FldLong', 'FldDouble', 'FldDouble', 'FldLong'],
    })
  ```

- 创建属性信息对象
- Example:
  ```javascript
    var values = [1, 0.00058032464704422, 0.132101984752282, 8]
    //创建属性信息对象
    var valuesRow = new Zondy.Object.CAttDataRow(values, 3286)
  ```

**Step 5. <font color=red>创建要素多圈缓冲区分析服务对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建**要素多圈缓冲区分析服务**对象，并使用该对象执行缓冲区分析操作；

- Example:

  ```javascript
    //实例化FeatureBuffByMultiplyRing类，设置要素缓冲分析必要参数，输出分析结果到缓冲分析结果图层
    var featureBufByMR = new Zondy.Service.FeatureBuffByMultiplyRing({
      //IGServer所在ip地址
      ip: 'develop.smaryun.com',
      //IGServer请求端口号
      port: '6163',
      //设置多圈缓冲分析的缓冲半径字符串
      radiusStr: '1000,20000,30000',
    })
    /*设置缓冲分析参数*/
    //设置几何信息
    featureBufByMR.sfGeometryXML = JSON.stringify([regGeo])
    //设置属性结构
    featureBufByMR.attStrctXML = JSON.stringify(regAttStr)
    //设置属性值
    featureBufByMR.attRowsXML = JSON.stringify([valuesRow])
    //设置追踪半径
    featureBufByMR.traceRadius = 0.0001
    //设置缓冲结果的名称以及存放地址
    var resultname = 'multiBuffAnalysisResultLayer' + getCurentTime()
    featureBufByMR.resultName = resultBaseUrl + resultname
    //调用Zondy.Service.AnalysisBase基类的execute方法执行要素缓冲分析，AnalysisSuccess为回调函数。
    featureBufByMR.execute(AnalysisSuccess, 'post', false, 'json', AnalysisError)
  ```

**Step 6. <font color=red>结果展示</font>**:
&ensp;&ensp;&ensp;&ensp;缓冲区分析结果展示，在缓冲区分析执行成功的回调函数加载缓冲结果矢量图层。

- Example:

  ```javascript
    //结果图层的URL
    var resultLayerUrl = data.results[0].Value
    //将结果图层添加到地图视图中显示
    var resultLayer = new mapboxgl.Zondy.Map.MapVectorLayer(encodeURIComponent(resultLayerUrl), {
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

#### 1.【MapGIS 要素几何图形信息类】`Zondy.Object.FeatureGeometry(opt_options)`

| 参数名      | 类型   | 描述                                                                                            |
| ----------- | ------ | ----------------------------------------------------------------------------------------------- |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

- `opt_options`属性主要参数

| 属性    | 类型                                                                                                                                 | 默认值 | 描述                                   |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------ | -------------------------------------- |
| LinGeom | Array-[ <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.GLine.html">Zondy.Object.GLine</a> ]     | Null   | 线要素几何信息，可包含多个线图形成员。 |
| PntGeom | Array-[ <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.GPoint.html">Zondy.Object.GPoint</a> ]   | Null   | 点要素几何信息，可包含多个线图形成员。 |
| RegGeom | Array-[ <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.GRegion.html">Zondy.Object.GRegion</a> ] | Null   | 区要素几何信息，可包含多个线图形成员。 |

##### 【method】`setPntGeom(pnts)`：设置点要素的几何信息

| 参数 | 类型                                                                                                                              | 描述             |
| ---- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| pnts | Array-[ <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.GPoint.html">Zondy.Object.GPoint</a>] | 点要素几何信息。 |

##### 【method】`setLine(lines)`：设置线要素的几何信息

| 参数  | 类型                                                                                                                              | 描述             |
| ----- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| lines | Array-[ <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object. GLine.html">Zondy.Object. GLine</a>] | 线要素几何信息。 |

##### 【method】`setRegGeom(Regs)`：设置区要素的几何信息

| 参数 | 类型                                                                                                                                | 描述             |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Regs | Array-[ <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.GRegion.html">Zondy.Object.GRegion</a>] | 区要素几何信息。 |

#### 2.【MapGIS 区要素几何图形信息类】`Zondy.Object.GRegion(rings, opt_options)`：MapGIS

| 参数名      | 类型                                                                                                                                 | 描述                                                                                                                                                                                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rings       | Array-[ <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.AnyLine.html">Zondy.Object.AnyLine </a>] | 构成区要素的线几何图形集合                                                                                                                                                                                                                                  |
| opt_options | Object                                                                                                                               | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性和<a target="_blank"  href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.FeatureGraphicBase.html">Zondy.Object.FeatureGraphicBase</a>类的 属性。例如：{key1：value1, key2：value2…} |

- `opt_options`属性主要参数

| 属性  | 类型                                                                                                                                 | 默认值 | 描述                       |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------ | ------ | -------------------------- |
| Rings | Array-[ <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.AnyLine.html">Zondy.Object.AnyLine </a>] | Null   | 构成区要素的线几何图形集合 |

##### 【method】`setRings(rings)`：设置区要素的几何信息

| 参数  | 说明                                                                                                                                 | 描述                       |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| rings | Array-[ <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.AnyLine.html">Zondy.Object.AnyLine </a>] | 构成区要素的线几何图形集合 |

#### 3.【MapGIS 线几何形状对象类】`Zondy.Object.AnyLine(arcs, opt_options)`

| 参数名      | 类型                                                                                                                         | 描述                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| arcs        | Array-[ <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Arc.html">Zondy.Object.Arc </a>] | 构成区要素的线几何图形集合                                                                      |
| opt_options | Object                                                                                                                       | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

- `opt_options`属性主要参数

| 属性 | 类型                                                                                                                         | 默认值 | 描述                         |
| ---- | ---------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------- |
| arcs | Array-[ <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Arc.html">Zondy.Object.Arc </a>] | Null   | 构成线的弧段要素几何图形集合 |

#### 4. 【MapGIS 点几何形状对象类】`Zondy.Object.Point2D(x, y, opt_options)`

| 参数名      | 类型   | 描述                                                                                                                                                                                                                                   |
| ----------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x           | Number | 点 x 轴坐标                                                                                                                                                                                                                            |
| y           | Number | 点 y 轴坐标                                                                                                                                                                                                                            |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性和 <a target="_blank"  href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Tangram.html">Zondy.Object.Tangram</a> 类的属性。例如：{key1：value1, key2：value2…} |

- `opt_options`属性主要参数

| 属性    | 类型   | 默认值 | 描述                           |
| ------- | ------ | ------ | ------------------------------ |
| nearDis | Number | Null   | 容差半径，只在做点查询时需赋值 |

##### 【method】`getGeometryType()`：获取几何类型名称，默认为“point”

##### 【method】`setByOL(point)`：将 openlayers 的点几何转换为 MapGIS 的点几何

| 参数  | 类型                                                                                                  | 描述                           |
| ----- | ----------------------------------------------------------------------------------------------------- | ------------------------------ |
| point | <a target="_blank" href="http://openlayers.org/en/latest/apidoc/ol.geom.Point.html">ol.geom.Point</a> | 由 openlayers 定义的点几何对象 |

##### 【method】`toString()`：将对象转化为字符串，返回一个以字符串形式表示的点。例如：“x,y”，由点形状坐标和逗号分割符构成的字符串。

#### 5. 【描述要素属性结构信息】`Zondy.Object.CAttDataRow(opt_options)`

| **参数**    | **类型** | **描述**                                                                                        |
| ----------- | -------- | ----------------------------------------------------------------------------------------------- |
| opt_options | Object   | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

- `opt_options`属性主要参数

| 属性      | 类型           | 默认值 | 描述                                                                                                                                       |
| --------- | -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| FldNumber | Number         | 0      | 属性个数，在添加要素时必须设置。                                                                                                           |
| FldName   | Array-[String] | Null   | 属性字段名数组，在添加要素时必须设置，<br/>并且属性字段名必须与图层属性字段匹配（可不完全匹配）。                                          |
| FldType   | Array          | Null   | 属性字段类型数组，在添加要素时必须设置。<br/>字段类型取值范围：<br/>FldLong（长整型）、<br/>FldString（字符串）、<br/>FldDouble（双精度）… |

#### 6. 【属性字段行】`Zondy.Object.CAttDataRow(values, fid, option)`

| **参数** | **类型**       | **默认值** | 描述                 |
| -------- | -------------- | ---------- | -------------------- |
| values   | Array-[String] | 无         | 属性字段名数组       |
| fid      | Number         | 0          | 要素 ID              |
| option   | Object         | 无         | 属性键值对，拓展属性 |

#### 7. 【要素缓冲分析（多圈）】`Zondy.Service.FeatureBuffByMultiplyRing(option)`

`父类`：<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.FeatureBuffBase.html">Zondy.Service.FeatureBuffBase</a>

| **参数** | **类型** | **描述**   |
| -------- | -------- | ---------- |
| option   | Object   | 属性键值对 |

- `option`属性主要参数

| 属性      | 类型   | 默认值              | 描述                                     |
| --------- | ------ | ------------------- | ---------------------------------------- |
| radiusStr | String | "0.003,0.002,0.001" | （可选）设置多圈缓冲分析的缓冲半径字符串 |

##### 【method】`execute(onSuccess, way, onError)`：执行空间分析服务

| 参数      | 类型     | 描述                                                                                                      |
| :-------- | :------- | :-------------------------------------------------------------------------------------------------------- |
| onSuccess | function | `必要参数`，执行成功后的回调函数                                                                          |
| way       | String   | 服务器请求类型,'POST' or 'GET'，默认为'Get',当所需要发送的数据量比较大时，请选择'Post',否则可能会执行失败 |
| onError   | function | 错误回调函数                                                                                              |

##### 【method】`getFullUrl()`：获取服务完整的地址
