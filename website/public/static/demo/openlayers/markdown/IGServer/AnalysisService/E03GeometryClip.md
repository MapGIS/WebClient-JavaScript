## 简单要素类几何裁剪分析

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例实现针对简单要素类的几何裁剪分析(包括圆裁剪和多边形裁剪)。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】 开发库实现。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线 【include-openlayers-local.js】 脚本引入开发库；

**Step 2. <font color=red>构建地图对象,创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建以`id="mapCon"`的 div 作为容器的地图对象，并设置当前视图的中心点及投影信息；

- Example:

  ```javascript
    var map = new ol.Map({
        target: 'mapCon', //地图容器div的ID
        controls: ol.control.defaults({
            attributionOptions: {
                collapsible: true,
            },
        }),
        view: new ol.View({
            center: [108, 34], //地图初始中心点
            maxZoom: 28, //最大瓦片显示级数
            minZoom: 1, //最小瓦片显示级数
            zoom: 5, //地图初始显示级数
            projection: 'EPSG:4326',
        }),
    });
  ```

  **Step 3. <font color=red>添加源几何(圆和多边形)</font>**:
  &ensp;&ensp;&ensp;&ensp;创建矢量图层，和矢量数据源，添加几何多边形要素和几何圆要素，作为源数据在地图上显示；

- Example:

  ```javascript
    var vectorSource = new ol.source.Vector()
    //创建一个多变形
    var polygon = new ol.Feature({
      geometry: new ol.geom.Polygon([
        [
          [0.46, 30.1],
          [11.48, 6.22],
          [36.73, 7.6],
          [58.77, 25.51],
          [41.33, 49.39],
        ],
      ]),
    })
    //设置区样式信息
    polygon.setStyle(
      new ol.style.Style({
        //填充色
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.5)',
        }),
        //边线颜色
        stroke: new ol.style.Stroke({
          color: '#ffcc33',
          width: 2,
        }),
      })
    )

    //创建一个圆
    var circle = new ol.Feature({
      geometry: new ol.geom.Circle([88.62, 25.09], 15),
    })

    circle.setStyle(
      new ol.style.Style({
        //填充色
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.5)',
        }),
        //边线颜色
        stroke: new ol.style.Stroke({
          color: '#ffcc33',
          width: 2,
        }),
      })
    )
    vectorSource.addFeatures([polygon, circle])

    //创建一个图层
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      zIndex: 1,
    })
    //将绘制层添加到地图容器中
    map.addLayer(vectorLayer)
  ```

**Step 4. <font color=red>实现圆裁剪分析</font>**:
&ensp;&ensp;&ensp;&ensp;创建圆裁剪服务对象，设置圆的中心点及半径、被裁剪的源数据、结果数据的 URL，并执行裁剪分析；

- Example:

  ```javascript
    //执行圆裁剪分析
    function circleClip() {
      var resultname = resultBaseUrl + 'clipByCircleAnalysisResultLayer' + getCurentTime()
      //实例化Zondy.Service.ClipByCircle类
      var clipParam = new Zondy.Service.ClipByCircle({
        ip: 'develop.smaryun.com',
        port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089,
        //设置圆心坐标
        center: '88.62, 25.09',
        //设置圆半径长度
        radius: 15,
        //设置被裁剪图层URL
        srcInfo: 'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区',
        //设置结果URL
        desInfo: resultname,
      })
      //调用基类的execute方法，执行圆裁剪分析。AnalysisSuccess为结果回调函数
      clipParam.execute(AnalysisSuccess, 'post', () => {})
    }
  ```

**Step 5. <font color=red>实现多边形裁剪分析</font>**:
&ensp;&ensp;&ensp;&ensp;创建多边形裁剪服务对象，设置多边形的坐标串、被裁剪的源数据、结果数据的 URL，并执行裁剪分析；

- Example:

  ```javascript
    //执行多边形裁剪分析
    function polygonClip() {
      var resultname = resultBaseUrl + 'clipByPolyAnalysisResultLayer' + getCurentTime()
      //实例化ClipByPolygon类
      var clipParam = new Zondy.Service.ClipByPolygon({
        ip: 'develop.smaryun.com',
        port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
      })
      //设置被裁剪图层URL
      clipParam.srcInfo = 'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区'
      //设置结果URL
      clipParam.desInfo = resultname
      //多边形点坐标串
      clipParam.strPos = '0.46, 30.1,11.48, 6.22,36.73, 7.6,58.77, 25.51,41.33, 49.39, 0.46, 30.1'
      //调用基类的execute方法，执行多边形裁剪分析。AnalysisSuccess为结果回调函数
      clipParam.execute(AnalysisSuccess, 'post', () => {})
    }
  ```

**Step 6. <font color=red>添加分析结果到地图中</font>**:
&ensp;&ensp;&ensp;&ensp;利用 Step5 和 Step6 的分析服务执行成功的回调函数中返回的结果数据名称，构建 MapGIS 的服务图层对象，添加到地图容器中进行显示。

- Example:

  ```javascript
    //分析成功后的回调
    function AnalysisSuccess(data) {
      if (!data.results) {
        alert('缓冲失败，请检查参数！')
      } else {
        if (data.results.length != 0) {
          var resultLayerUrl = data.results[0].Value || data.results[0].value
          //将结果图层添加到地图视图中显示
          var resultLayer = new Zondy.Map.GdbpLayer('MapGIS IGS BuffAnalyResultLayer', [resultLayerUrl], {
            ip: 'develop.smaryun.com',
            port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089,
            isBaseLayer: false,
          })
          map.addLayer(resultLayer)
          resultLayerArr.push(resultLayer)
        }
      }
    }
  ```

### 关键接口

#### 1.【圆裁剪分析服务】`Zondy.Service.ClipByCircle(options)`

| 参数名  | 类 型  | 说 明            |
| ------- | ------ | ---------------- |
| options | Object | （可选）附加属性 |

* `options`属性主要参数

| 参数名  | 类 型  | 默认值 | 说 明                       |
| ------- | ------ | ------ | --------------------------- |
| srcInfo | String | null   | （可选）源图层 URL          |
| center  | String | null   | （可选）圆点坐标,string:x,y |
| radius  | Number | null   | （可选）半径长度            |
| step    | Number | 0.001  | （可选）离散化步长          |

##### 【method】`execute(onSuccess, way, onError)`：执行几何裁剪分析服务

| 参数名    | 类型     | 说明                                                  |
| --------- | -------- | ----------------------------------------------------- |
| onSuccess | function | 必要参数，执行成功后的回调函数                        |
| way       | String   | 必要参数，服务器请求类型,'POST' or 'GET'，默认为'Get' |
| onError   | function | 必要参数，执行失败回调函数                            |

#### 2.【多边形裁剪分析服务】`Zondy.Service.ClipByPolygon(options)`

| 参数名  | 类 型  | 说 明            |
| ------- | ------ | ---------------- |
| options | Object | （可选）附加属性 |

* `options`属性主要参数

| 参数名  | 类 型  | 默认值 | 说 明                                    |
| ------- | ------ | ------ | ---------------------------------------- |
| srcInfo | String | null   | (可选)源图层 URL                         |
| strPos  | String | null   | (可选)多边形点坐标串,如：x1,y1,x2,y2.... |

#### 3.【MapGIS 矢量地图图层】`Zondy.Map.GdbpLayer(opt_name,opt_gdbps,opt_options)`

| 参数名      | 类 型          | 说 明                         |
| ----------- | -------------- | ----------------------------- |
| opt_name    | String         | 显示图层的名称                |
| opt_gdbps   | Array.{String} | 简单要素类的 URL 地址信息数组 |
| opt_options | Object         | （可选）附加属性              |

* `opt_options`属性主要参数

| 参数名  | 类 型                             | 默认值      | 说 明                           |
| ------- | --------------------------------- | ----------- | ------------------------------- |
| ip      | String                            | "127.0.0.1" | （必选）服务器 ip 地址          |
| port    | String                            | "6163"      | （必选）服务器端口号            |
| gdbps   | Array{String}                     | Null        | 简单要素类的 URL 地址信息数组   |
| f       | String                            | "png"       | 图像类型，取值为：jpg、png、gif |
| filters | String                            | Null        | 图层过滤条件                    |
| style   | Array{Zondy.Object.CDisplayStyle} | Null        | 矢量图层显示样式参数            |
| extent  | Array.{Number}                    |             | 图层数据范围                    |
| guid    | String                            |             | 矢量图层缓存的唯一标识          |

**详细信息见 OpenLayers API**
http://develop.smaryun.com:8899/docs/openlayers/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.ClipByCircle.html
http://develop.smaryun.com:8899/docs/openlayers/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.ClipByPolygon.html
http://develop.smaryun.com:8899/docs/openlayers/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.ClipBase.html
http://develop.smaryun.com:8899/docs/openlayers/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.AnalysisBase.html
