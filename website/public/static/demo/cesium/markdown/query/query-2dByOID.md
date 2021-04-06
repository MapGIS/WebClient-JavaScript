## 二维地图文档 OID 查询

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能实现基于二维地图文档的 OID 查询功能，即通过要素 OID 查询方式查询三维场景中加载的二维地图文档的要素信息，包括要素的几何信息与属性信息。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现。先初始化查询参数`CesiumZondy.Query.MapDocQuery`类对象，设置查询属性条件等参数后，调用`beginQuery()`方法进行查询，然后在回调中获取处理查询到的要素信息，解析所需的几何信息与属性信息进行展示。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维 WebGL 的功能；

**Step 2. <font color=red>创建三维地图容器并加载三维球控件</font>**:
&ensp;&ensp;&ensp;&ensp;创建 `id='GlobeView'` 的 div 作为三维视图的容器，并设置其样式，初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` ，完成此步后可在三维场景中加载三维球控件；

**Step 3. <font color=red>加载地图数据</font>**:
&ensp;&ensp;&ensp;&ensp;使用`CesiumZondy.Layer.ThirdPartyLayer`的`appendTDTuMap()`方法加载天地图作为底图，然后再使用`CesiumZondy.Layer.TilesLayer`的`append2DDocTile()`方法叠加显示北京市地图数据；

**Step 4. <font color=red>实现查询功能</font>**:
&ensp;&ensp;&ensp;&ensp;实例化地图查询 `CesiumZondy.Query.MapDocQuery`对象，设置查询的数据与要素的 OID 条件，再调用`beginQuery()` 方法进行查询，在其回调函数中获取解析查询结果并显示。

- Example:

  ```javascript
    var queryParam = new CesiumZondy.Query.MapDocQuery()
    //查询图层的URL路径
    //queryParam.gdbp = encodeURI("gdbp://MapGisLocal/北京市/ds/行政区/sfcls/北京市");
    queryParam.docName = '北京市'
    queryParam.mapIndex = 0
    queryParam.layerID = 0
    queryParam.structs = '{"IncludeAttribute":true,"IncludeGeometry":true,"IncludeWebGraphic":false}'
    //设置要素的OID
    queryParam.objectIds = '30'
    //服务器的ip
    queryParam.ip = ip
    queryParam.port = port
    queryParam.beginQuery(
      function(result) {
        //查询结果处理
      },
      function quryError(err) {
        alert(err)
      }
    )
  ```

  ```javascript
    if (result != null) {
      data = result
      //解析显示要素的属性信息
      document.getElementById('code').value = result.SFEleArray[0].AttValue[2]
      document.getElementById('name').value = result.SFEleArray[0].AttValue[3]
      document.getElementById('spell').value = result.SFEleArray[0].AttValue[4]
      document.getElementById('population').value = result.SFEleArray[0].AttValue[40]
      //解析要素的几何信息
      var GeompointArray = new Array()
      for (var pointlength = 0; pointlength < result.SFEleArray[0].fGeom.RegGeom[0].Rings[0].Arcs[0].Dots.length; pointlength++) {
        var PntCartesian3 = Cesium.Cartesian3.fromDegrees(result.SFEleArray[0].fGeom.RegGeom[0].Rings[0].Arcs[0].Dots[pointlength].x, result.SFEleArray[0].fGeom.RegGeom[0].Rings[0].Arcs[0].Dots[pointlength].y, 10)
        GeompointArray.push(PntCartesian3)
      }
      GeompointArray.push(GeompointArray[0])
      //构造几何绘制控制对象
      var entityController = new CesiumZondy.Manager.EntityController({
        viewer: webGlobe.viewer,
      })
      //构造区对象
      var polygon = {
        name: '立体区',
        polygon: {
          //坐标点
          hierarchy: GeompointArray,
          //是否指定各点高度
          perPositionHeight: true,
          //颜色
          material: new Cesium.Color(33 / 255, 150 / 255, 243 / 255, 0.5),
          //轮廓线是否显示
          outline: true,
          //轮廓线颜色
          outlineColor: Cesium.Color.BLACK,
        },
      }
      //绘制图形通用方法：对接Cesium原生特性
      var stericPolygon = entityController.appendGraphics(polygon)
    }
  ```

### 关键接口

#### 1.【三维场景控件类】`Cesium.WebSceneControl(elementId, options)`

| 参数名    | 类 型             | 说 明                |
| --------- | ----------------- | -------------------- |
| elementId | Element \| String | 放置视图的 div 的 id |
| options   | Object            | （可选）附加属性     |

- `options`属性主要参数

| 参数名           | 类 型   | 默认值 | 说 明                                                                                  |
| ---------------- | ------- | ------ | -------------------------------------------------------------------------------------- |
| viewerMode       | String  | ‘3D’   | （可选）初始视图模式默认为三维球视图 '2D'表示二维视图 'COLUMBUS_VIEW' 表示三维平面视图 |
| showInfo         | Boolean | false  | （可选）是否显示默认的属性信息框                                                       |
| animation        | Boolean | true   | （可选）默认动画控制不显示                                                             |
| baseLayerPicker  | Boolean | true   | （可选）是否创建图层控制显示小组件                                                     |
| fullscreenButton | Boolean | true   | （可选）是否创建全屏控制按钮                                                           |
| vrButton         | Boolean | false  | （可选）是否创建 VR 按钮                                                               |

#### 2.【地图数据显示地图图层类】`CesiumZondy.Layer.ThirdPartyLayer`、`CesiumZondy.Layer.TilesLayer`

#### 3.【二维地图文档查询类】CesiumZondy.Query.MapDocQuery

| 参数名       | 类 型     | 默认值   | 说 明                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------ | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| docObj       | MapDocObj | null     | 查询对应的地图服务,参考 ClassLib.js 中的 MapDocObj 对象                                                                                                                                                                                                                                                                                                                                                                         |
| docName      | String    | ''       | 地图服务名称                                                                                                                                                                                                                                                                                                                                                                                                                    |
| mapIndex     | Int       | 0        | 地图在文档下得序号,一般为 0                                                                                                                                                                                                                                                                                                                                                                                                     |
| layerID      | Int       | 0        | 图层序号                                                                                                                                                                                                                                                                                                                                                                                                                        |
| geometryType | String    | ''       | 几何类型描述,格式:'point                                                                                                                                                                                                                                                                                                                                                                                                        | circle | rect | line | polygon' |
| geometry     | String    | ''       | 点的集合,几何约束区域参数，其形式取决于 geometryType 的值，即取决于几何约束类型<br/>point--x,y,[ neardistance],neardistance 为可选，即容差，下同<br/>circle--x，y，r 注意在球上执行画圆时由于插件提供的圆为椭圆，给出的点集也是大量离散点，因此这种情况下，依然采用 polygon 方式执行查询<br/> rect--xmin，ymin，xmax，ymax <br/>line--x1,y1,x2,y2,x3,y3…;[neardistance]<br/>polygon--x1,y1,x2,y2,x3,y3…第一个点与最后一个点相同 |
| where        | String    | ''       | 查询属性条件，符合 SQL 查询规范的任何字符串                                                                                                                                                                                                                                                                                                                                                                                     |
| f            | String    | 'json'   | 返回结果的序列化形式                                                                                                                                                                                                                                                                                                                                                                                                            |
| objectIds    | String    | ''       | 需要查询的要素 Id 号,格式：oid1，oid2，oid3                                                                                                                                                                                                                                                                                                                                                                                     |
| structs      | json      | ''       | 指定查询结果的结构，json 规范                                                                                                                                                                                                                                                                                                                                                                                                   |
| page         | String    | ''       | 返回的要素分页的页数，默认返回第 0 页                                                                                                                                                                                                                                                                                                                                                                                           |
| pageCount    | String    | ''       | 要素结果集每页的记录数量，默认为 20 条/页                                                                                                                                                                                                                                                                                                                                                                                       |
| rule         | String    | ''       | 指定查询规则，Json 表示形式                                                                                                                                                                                                                                                                                                                                                                                                     |
| queryResult  | String    | '未查询' | 这里查询结果,这里主要是存放查询过程中报错信息                                                                                                                                                                                                                                                                                                                                                                                   |
| ip           | String    | ''       | 查询数据服务的 IP                                                                                                                                                                                                                                                                                                                                                                                                               |
| port         | String    | ''       | 查询数据服务的端口号                                                                                                                                                                                                                                                                                                                                                                                                            |

##### 【method】`beginQuery(successCallback, errorCallback)`：开始查询

| 参数名          | 类 型    | 说 明                |
| --------------- | -------- | -------------------- |
| successCallback | function | 查询执行成功回调函数 |
| errorCallback   | function | 询执行失败回调函数   |
