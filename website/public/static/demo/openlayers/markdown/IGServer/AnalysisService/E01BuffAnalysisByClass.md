## 类缓冲分析

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例实现针对简单要素类的单圈或多圈的缓冲分析。

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
    })
  ```

**Step 3. <font color=red>实现类单圈缓冲分析</font>**:
&ensp;&ensp;&ensp;&ensp;创建类单圈缓冲服务对象，设置相应的源数据、结果数据及缓冲半径，并执行缓冲分析；

- Example:

  ```javascript
    //执行单圈缓冲区分析
    function bufferOneRing() {
      var clsBufBySR = new Zondy.Service.ClassBufferBySingleRing({
        ip: 'develop.smaryun.com',
        port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089,
        //缓冲时要素左侧缓冲半径
        leftRad: 0.1,
        //缓冲时要素右侧缓冲半径
        rightRad: 0.1,
        //不允许根据属性字段设置缓冲区半径
        isByAtt: false,
      })

      clsBufBySR.srcInfo = 'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界河流_1'
      var resultname = 'singleBuffAnalysisResultLayer' + getCurentTime()
      clsBufBySR.desInfo = resultBaseUrl + resultname

      //调用基类Zondy.Service.AnalysisBase的execute方法执行类缓冲分析，AnalysisSuccess为回调函数
      clsBufBySR.execute(AnalysisSuccess, 'post', () => {})
    }
  ```

**Step 4. <font color=red>实现类多圈缓冲分析</font>**:
&ensp;&ensp;&ensp;&ensp;创建类多圈缓冲服务对象，设置相应的源数据、结果数据及缓冲半径，并执行缓冲分析；

- Example:

  ```javascript
    function bufferMulRings() {
      var clsBufByMR = new Zondy.Service.ClassBufferByMultiplyRing({
        ip: 'develop.smaryun.com',
        port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089,
        //多圈缓冲分析各圈的缓冲半径
        radiusStr: '0.01,0.05,0.1',
      })
      //调用Zondy.Service.ClassBufferBase基类公共属性
      clsBufByMR.srcInfo = 'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界河流_1'
      var resultname = 'multiBuffAnalysisResultLayer' + getCurentTime()
      clsBufByMR.desInfo = resultBaseUrl + resultname
      //调用基类Zondy.Service.AnalysisBase的execute方法执行类缓冲分析，AnalysisSuccess为回调函数
      clsBufByMR.execute(AnalysisSuccess, 'post', () => {})
    }
  ```

**Step 5. <font color=red>添加分析结果到地图中</font>**:
&ensp;&ensp;&ensp;&ensp;利用 Step3 和 Step4 的分析服务执行成功的回调函数中返回的结果数据名称，构建 MapGIS 的服务图层对象，添加到地图容器中进行显示。

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

#### 1.【类单圈缓冲分析服务】`Zondy.Service.ClassBufferBySingleRing(options)`

| 参数名  | 类 型  | 说 明            |
| ------- | ------ | ---------------- |
| options | Object | （可选）附加属性 |

* `options`属性主要参数

| 参数名    | 类 型   | 默认值 | 说 明                                          |
| --------- | ------- | ------ | ---------------------------------------------- |
| leftRad   | Number  | 0.001  | （可选）缓冲分析左半径                         |
| rightRad  | Number  | 0.001  | （可选）缓冲分析右半径                         |
| isByAtt   | Boolean | true   | （可选）是否根据属性字段设置缓冲区半径         |
| fldName   | String  | null   | （可选）属性字段名称,当 isByAtt 为 true 时使用 |
| dynPrjRad | Number  | 0      | （可选）动态投影半径                           |

##### 【method】`execute(onSuccess, way, onError)`：执行空间缓冲分析服务

| 参数名    | 类型     | 说明                                                  |
| --------- | -------- | ----------------------------------------------------- |
| onSuccess | function | 必要参数，执行成功后的回调函数                        |
| way       | String   | 必要参数，服务器请求类型,'POST' or 'GET'，默认为'Get' |
| onError   | function | 必要参数，执行失败回调函数                            |

#### 2.【类多圈缓冲分析服务】`Zondy.Service.ClassBufferByMultiplyRing(options)`

| 参数名  | 类 型  | 说 明            |
| ------- | ------ | ---------------- |
| options | Object | （可选）附加属性 |

* `options`属性主要参数

| 参数名    | 类 型  | 默认值     | 说 明                                     |
| --------- | ------ | ---------- | ----------------------------------------- |
| flowID    | String | 600232     | （可选）矢量图层多圈缓冲区分析的工作流 ID |
| radiusStr | String | "2,4,8,10" | （可选）多圈缓冲分析各圈的缓冲半径        |

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
http://develop.smaryun.com:8899/docs/openlayers/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.ClassBufferBySingleRing.html
http://develop.smaryun.com:8899/docs/openlayers/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.ClassBufferByMultiplyRing.html
http://develop.smaryun.com:8899/docs/openlayers/module-%25E5%2588%2586%25E6%259E%2590%25E6%259C%258D%25E5%258A%25A1.ClassBufferBase.html
