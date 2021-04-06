## 简单要素类图层叠加分析

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例实现两个简单要素类图层之间叠加分析。

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
    //初始化地图容器
    var map = new ol.Map({
      target: 'mapCon', //地图容器div的ID
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: true,
        },
      }),
      view: new ol.View({
        center: [54.54, 25], //地图初始中心点
        maxZoom: 28, //最大瓦片显示级数
        minZoom: 1, //最小瓦片显示级数
        zoom: 3, //地图初始显示级数
        projection: 'EPSG:4326',
      }),
    })
  ```

**Step 3. <font color=red>实现图层叠加分析</font>**:
&ensp;&ensp;&ensp;&ensp;创建图层叠加服务对象，设置被叠加图层和叠加图层的 URL、结果数据的 URL,以及叠加分析的类型(本示例是以图层之间做相交运算为例),并执行叠加分析；

- Example:

  ```javascript
    function overlayByLayer() {
      var resultname = resultBaseUrl + 'overLayByLayerAnalysisResultLayer' + getCurentTime()
      //实例化OverlayByLayer类
      var overlayParam = new Zondy.Service.OverlayByLayer({
        ip: 'develop.smaryun.com',
        port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089,
        //设置被叠加图层URL
        srcInfo1: 'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界河流',
        //设置叠加图层URL
        srcInfo2: 'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区',
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
      overlayParam.execute(AnalysisSuccess, 'post', false, 'json', () => {})
    }
  ```

**Step 4. <font color=red>添加分析结果到地图中</font>**:
&ensp;&ensp;&ensp;&ensp;利用 Step3 分析服务执行成功的回调函数中返回的结果数据名称，构建 MapGIS 的服务图层对象，添加到地图容器中进行显示。

- Example:

  ```javascript
    //分析成功后的回调
    function AnalysisSuccess(data) {
      if (!data.results) {
        alert('裁剪失败，请检查参数！')
      } else {
        if (data.results.length != 0) {
          var resultLayerUrl = data.results[0].Value || data.results[0].value
          //将结果图层添加到地图视图中显示
          var resultLayer = new Zondy.Map.GdbpLayer('MapGIS IGS BuffAnalyResultLayer', [resultBaseUrl + resultLayerUrl], {
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

#### 1.【圆裁剪分析服务】`Zondy.Service.OverlayByLayer(options)`，该类继承自`Zondy.Service.OverlayBase`

| 参数名  | 类 型  | 说 明            |
| ------- | ------ | ---------------- |
| options | Object | （可选）附加属性 |

- `options`属性主要参数

| 参数名   | 类 型  | 默认值 | 说 明                                |
| -------- | ------ | ------ | ------------------------------------ |
| srcInfo1 | String | null   | 被叠加数据 URL                       |
| srcInfo2 | String | null   | 叠加数据 URL                         |
| desInfo  | String | null   | 结果数据 URL                         |
| overType | Number | 3      | 叠加类型(相交、相离、包含、对称差等) |

##### 【method】`execute(onSuccess, way, onError)`：执行图层叠加分析服务

| 参数名    | 类型     | 说 明                                                 |
| --------- | -------- | ----------------------------------------------------- |
| onSuccess | function | 必要参数，执行成功后的回调函数                        |
| way       | String   | 必要参数，服务器请求类型,'POST' or 'GET'，默认为'Get' |
| onError   | function | 必要参数，执行失败回调函数                            |

#### 2.【MapGIS 矢量地图图层】`Zondy.Map.GdbpLayer(opt_name,opt_gdbps,opt_options)`

| 参数名      | 类 型          | 说 明                         |
| ----------- | -------------- | ----------------------------- |
| opt_name    | String         | 显示图层的名称                |
| opt_gdbps   | Array.{String} | 简单要素类的 URL 地址信息数组 |
| opt_options | Object         | （可选）附加属性              |

- `opt_options`属性主要参数

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
http://develop.smaryun.com:8899/docs/openlayers/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.OverlayByLayer.html
http://develop.smaryun.com:8899/docs/openlayers/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.OverlayBase.html
http://develop.smaryun.com:8899/docs/openlayers/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.AnalysisBase.html
