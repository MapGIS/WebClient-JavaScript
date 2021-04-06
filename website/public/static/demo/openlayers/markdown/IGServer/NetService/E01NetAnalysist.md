## 网络分析

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例在地图中添加了道路交通网，通过网络分析功能获得两点之间在道路交通网上的最短路径。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库，首先实例化`Zondy.Map.GdbpLayer`对象构建道路图层。实例化`ol.Feature`对象在地图上标注起始点。实例化`Zondy.Service.NetAnalysis`构建路径分析服务，调用`execute()`方法进行路径分析，在成功回调函数中对结果进行处理，绘制路径在地图中。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-openlayers-local.js 】开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>添加道路交通网图层</font>**:
&ensp;&ensp;&ensp;&ensp;通过图层范围设定参考系以及图层中心点，创建地图对象，通过实例化`Zondy.Map.GdbpLayer`对象构建道路图层；

- Example:

  ```javascript
    var extent = [114.42204, 38, 114.57798, 38.092545]
    var projection = new ol.proj.Projection({ units: ol.proj.Units.DEGREES, extent: extent, code: 'EPSG:4326' })
    //初始化地图容器
    map = new ol.Map({
      target: 'mapCon',
      view: new ol.View({
        center: [114.5, 38.0359],
        zoom: 2,
        projection: projection,
      }),
    })
    //初始化矢量图层对象
    var vectorGDBLayer = new Zondy.Map.GdbpLayer('MapGIS IGS VectorLayer', ['gdbp://MapGisLocal/sample/ds/网络分析/ncls/道路交通网'], {
      //矢量图层地图服务器ip
      ip: 'develop.smaryun.com',
      //矢量图层地图服务端口
      port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
    })
    //将矢量图层加载到地图中
    map.addLayer(vectorGDBLayer)
  ```

**Step 4. <font color=red>添加起始点</font>**:
&ensp;&ensp;&ensp;&ensp;通过实例化`ol.Feature`对象构建路径起始点，并添加在地图中；

- Example：

  ```javascript
    startMarker = new ol.Feature({
      type: 'icon',
      geometry: new ol.geom.Point([114.44, 38.06]),
    })
    endMarker = new ol.Feature({
      type: 'icon',
      geometry: new ol.geom.Point([114.56, 38.03]),
    })
    var vector = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [startMarker, endMarker],
      }),
    })
    map.addLayer(vector)
  ```

**Step 5. <font color=red>进行路径分析</font>**:
&ensp;&ensp;&ensp;&ensp;通过实例化`Zondy.Service.NetAnalysis`对象构建路径分析服务，然后调用该服务`execute（）`方法开始路径分析；

- Example:

  ```javascript
    var netAnalyParam = new Zondy.Service.NetAnalysis({
      //矢量图层地图服务器ip
      ip: 'develop.smaryun.com',
      //矢量图层地图服务端口
      port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089,
      //设置网络类URL
      netClsUrl: 'gdbp://MapGisLocal/sample/ds/网络分析/ncls/道路交通网',
      //指定感兴趣路径点坐标序列
      flagPosStr: '114.44,38.06,114.56,38.03',
      //分析类型：用户自定义
      analyTp: 'UserMode',
      //设置网络类某些属性字段为权值字段
      weight: ',Weight1,Weight1',
      //网络类型：1/2:节点网标/线网标
      elementType: 2,
      //设置网标搜索半径
      nearDis: 0.01,
      //设置障碍点的坐标序列
      barrierPosStr: '',
      outFormat: 'JSON',
    })
    netAnalyParam.execute(AnalysisSuccess, 'POST', null, null, () => {})
  ```

**Step 6. <font color=red>路径分析结果处理</font>**:
&ensp;&ensp;&ensp;&ensp;遍历成功回调结果，获取点数组，在地图中绘制成线。

- Example：

  ```javascript
    //轨迹坐标点
    var dot
    //轨迹坐标数组
    var pathArr = new Array()
    if (data.results[0].Value == null) {
      return
    }
    //返回的分析结果数据
    var result = data.results[0].Value
    var resultObj = $.parseJSON(result)
    if (resultObj == null || resultObj.Paths == null) {
      return
    }
    //解析轨迹边坐标序列
    var pathObj = resultObj.Paths[0]
    var edgeNum = pathObj.Edges.length
    //添加经过纠偏的起点
    if (resultObj.inputDots == null) {
      return
    }
    if (resultObj.inputDots[0].pDot == null || resultObj.inputDots[1] == null || resultObj.inputDots[1].pDot == null) {
      return
    }
    //路径分析的真实起点，即经过纠偏之后，线上网标或者点上网标点
    dot = [resultObj.inputDots[0].pDot.x, resultObj.inputDots[0].pDot.y]
    //结果描述信息
    if (dot[0] == 114.49 && dot[1] == 38.05) {
      //添加起点到缓存数组
      pathArr.push(dot)
    } else {
      pathArr.push(dot)
    }
    //没有路径线信息时，用户直接步行到达指定地点
    if (edgeNum == 0) {
      //纠偏起点与纠偏终点的距离
      if (resultObj.inputDots[1].pDot.x != resultObj.inputDots[0].pDot.x || resultObj.inputDots[1].pDot.y != resultObj.inputDots[0].pDot.y) {
        dot = [resultObj.inputDots[1].pDot.x, resultObj.inputDots[1].pDot.y]
        pathArr.push(dot)
      }
      //纠偏终点与输入终点的距离
      if (resultObj.inputDots[1].pDot.x != 114.5 || resultObj.inputDots[1].pDot.y != 38.05) {
        dot = [114.5, 38.05]
        pathArr.push(dot)
      }
    } else if (edgeNum == 1) {
      //将路径线信息存储进缓存数组
      if (dot[0] != pathObj.Edges[0].Dots[0].x || dot[1] != pathObj.Edges[0].Dots[0].y) {
        dot = [pathObj.Edges[0].Dots[0].x, pathObj.Edges[0].Dots[0].y]
        pathArr.push(dot)
      }
      var dotLen = pathObj.Edges[0].Dots.length
      for (var m = 1; m < dotLen; m++) {
        dot = [pathObj.Edges[0].Dots[m].x, pathObj.Edges[0].Dots[m].y]
        pathArr.push(dot)
      } //for(j)
    } //else if (edgeNum == 1)
    else {
      //(edgeNum > 1)
      for (var i = 0; i < edgeNum - 1; i++) {
        var dotCount = pathObj.Edges[i].Dots.length
        for (var k = 0; k < dotCount; k++) {
          if (k == 0 && i == 0) {
            if (dot[0] != pathObj.Edges[0].Dots[0].x || dot[1] != pathObj.Edges[0].Dots[0].y) {
              dot = [pathObj.Edges[0].Dots[0].x, pathObj.Edges[0].Dots[0].y]
              pathArr.push(dot)
            }
          }
          dot = [pathObj.Edges[i].Dots[k].x, pathObj.Edges[i].Dots[k].y]
          pathArr.push(dot)
        } //for(j)
      } //for(i<edgeNum-1)
      //添加最后一条路径信息
      var dotCoun = pathObj.Edges[edgeNum - 1].Dots.length
      for (var n = 0; n < dotCoun; n++) {
        dot = [pathObj.Edges[edgeNum - 1].Dots[n].x, pathObj.Edges[edgeNum - 1].Dots[n].y]
        pathArr.push(dot)
      } //for(j)
    } //else(edgeNum>1)

    //添加经过纠偏的终点
    if (resultObj.inputDots[1].pDot.x != dot.x || resultObj.inputDots[1].pDot.y != dot.y) {
      dot = [resultObj.inputDots[1].pDot.x, resultObj.inputDots[1].pDot.y]
      pathArr.push(dot)
    }
    drawPath(pathArr)
    //绘制线
    function drawPath(pathArr) {
      var route = new ol.geom.LineString(pathArr)
      //获取直线的坐标
      var routeCoords = route.getCoordinates()

      var routeFeature = new ol.Feature({
        type: 'route',
        geometry: route,
      })

      vectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: [routeFeature],
        }),
        style: function(feature) {
          return styles[feature.get('type')]
        },
      })
      map.addLayer(vectorLayer)
    }
  ```

### 关键接口

#### 1.【地图投影类】`ol.proj.Projection`

> 详细信息见 openlayers API：https://openlayers.org/en/v5.3.0/apidoc/module-ol_proj_Projection.html

#### 2.【矢量图层功能服务类】Zondy.Map.GdbpLayer(opt_name, opt_gdbps, opt_options）

| 参数名      | 类型           | 描述                                                                                                                                                                                                                                                                               |
| ----------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| opt_name    | String         | 显示图层的名称，无实际意义，可为 NULL。                                                                                                                                                                                                                                            |
| opt_gdbps   | Array-[String] | 简单要素类的 URL 地址信息（包括源要素类存储路径与名称），用户根据语法设置 URL 地址，或在数据库中图层节点上右击选择“复制 URL”获得。多个间用“，”号隔开。如: ["gdbps= gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/海洋陆地","gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/国界"]。 |
| opt_options | Object         | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2 …}                                                                                                                                                                                   |

- `opt_options`属性主要参数

| 属性    | 类型                                 | 描述                                                                                                                                                                                                                                                                                                                                                                       | 默认值      |
| ------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| ip      | String                               | 必选项，服务器 ip 地址，本地为“127.0.0.1”或“localhost”。                                                                                                                                                                                                                                                                                                                   | “127.0.0.1” |
| port    | String                               | 必选项，服务器端口号。                                                                                                                                                                                                                                                                                                                                                     | “6163”      |
| gdbps   | Array-[String]                       | 简单要素类的 URL 地址信息（包括源要素类存储路径与名称），用户根据语法设置 URL 地址，或在数据库中图层节点上右击选择“复制 URL”获得。多个间用“，”号隔开。如: ["gdbps= gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/海洋陆地","gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/国界"]                                                                                           | Null        |
| f       | String                               | 图像类型，取值为：jpg/png/gif                                                                                                                                                                                                                                                                                                                                              | "png"       |
| filters | String                               | 图层过滤条件，它由多个键值对组成，值为您所要设定的过滤条件。如：'1:ID>4,3:ID>1”。过滤条件中用到的符号包括“==”、“!=”、“<”、“>”、“<=”、“>=”、“..”、“~”等，当包含中文条件时，请使用 UTF-8 编码格式，其中“：”和“，”为保留字符，用于表示键值对概念和分隔不同图层的条件，请不要将这 2 个字符用于自定义条件中，javascitpt 中请使用 encodeURI（）函数编码后再代入 filters 参数中。 | Null        |
| style   | Array-[ Zondy.Object.CDisplayStyle ] | 矢量图层显示样式参数，与图层序号相对应。                                                                                                                                                                                                                                                                                                                                   | Null        |
| extent  | Array-[Number]                       | 图层数据范围                                                                                                                                                                                                                                                                                                                                                               |             |  |
| guid    | String                               | 矢量图层缓存的唯一标识，一般情况下无需赋值。                                                                                                                                                                                                                                                                                                                               |             |

#### 3.【图层样式类】`ol.style.Style`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_style_Style.html

#### 4.【要素类】`ol.Feature`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_Feature.html

#### 5.【矢量图层类】`ol.layer.Vector`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_layer_Vector.html

#### 6.【矢量图层数据类】`ol.source.Vector`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_source_Vector.html

#### 7.【网络分析服务类】`Zondy.Service.NetAnalysis（opt_options）`

| 构造函数参数 | 类型   | 描述                                                                                                                                                                   |
| ------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| opt_options  | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性和 Zondy.Service.AnalysisBase 类、 Zondy.Service.HttpRequest 类的属性。例如：{key1： value1, key2 ：value2 … |

> `opt_options`详细信息

| 属性          | 类型                        | 描述                                                                                                                                                 | 默认值             |
| ------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| netClsUrl     | String                      | 网络类的地址信息（包括源要素类存储路径与名称），用户根据语法设置 URL 地址，用户根据语法设置 URL 地址，或在数据库中图层节点上右击选择“复制 URL”获得。 | Null               |
| flagPosStr    | String                      | 网标坐标序列字符串，如"x1,y1,x2,y2......"                                                                                                            | Null               |
| barrierPosStr | String                      | 障碍点坐标序列字符串，如："x1,y1,x2,y2......"                                                                                                        | Null               |
| analyType     | Zondy.Enum.Net.NetAnalyType | 路径分析类型                                                                                                                                         |
| “UserMode”    |
| weight        | String                      | 权值字段名序列字符串，如："权值字段名,权值字段名,......"                                                                                             | ",Weight1,Weight1" |
| elementType   | Zondy.Enum.Net.NetElemType  | 网络元素类型                                                                                                                                         | 2                  |
| nearDis       | Number                      | 网标搜索半径                                                                                                                                         | 0.001              |
| outFormat     | String                      | 分析结果输出格式，取值：json                                                                                                                         | xml。              | "json" |

> 方法：

| 方法                                                               | 返回值 | 描述         | 参数                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------ | ------ | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| execute(onSuccess,<br>way,<br>isAsy,<br>f,<br>onError,<br>options) | Object | 执行空间分析 | 参数 1 <br>onSuccess （Function）：成功回调函数<br>参数 2<br>way （String）：服务器请求类型，取值： Get （默认方式）/Post（发送的数据量大时可采用）。<br>参数 3<br>isAsy （boolean）：是否异步执行，默认为 false。<br>参数 4<br>f （String）：执行成功后返回结果的格式,取值：json（默认值） /xml。<br>参数 5<br>onError （Function）：失败回调函数<br>参数 6<br>options （Object）：可选项，设置其他扩展 ajax 请求补充参数。 |
