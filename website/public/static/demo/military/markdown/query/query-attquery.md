## 三维模型数据属性查询

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能通过模型要素的属性信息来查询已加载显示的三维模型数据的属性、几何等要素信息。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;数据准备：本示例采用的数据经过两个步骤生成，首先需在 MapGIS Desktop 桌面平台软件中为景观模型数据生成 M3D 缓存，并组织为地图文档；然后在 MapGIS Server Manager 服务管理器中根据地图文档发布为三维地图服务。

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口`CesiumZondy.Query.G3DDocQuery`提供的`queryG3DFeature`方法来查询模型要素信息

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id='GlobeView'`的 div 作为三维视图的容器，并设置其样式；

**Step 3. <font color=red>构造三维场景控件</font>**：
&ensp;&ensp;&ensp;&ensp;实例化`Cesium.WebSceneControl`对象，完成此步骤后可在三维场景中加载三维球控件；

- Example:
  ```javascript
    //构造三维视图对象（视图容器div的id，三维视图设置参数）
    var webGlobe = new Cesium.WebSceneControl('GlobeView', {})
  ```

**Step 4. <font color=red>加载数据</font>**:
&ensp;&ensp;&ensp;&ensp;构造`CesiumZondy.Layer.M3DLayer`M3D 图层管理对象，调用`append()`方法，传入 M3D 缓存三维地图服务的 URL 地址即可加载浏览数据，同时可传入相关配置参数；

- Example:

  ```javascript
    //构造M3D模型层管理对象（视图）
    var m3dLayer = new CesiumZondy.Layer.M3DLayer({
      viewer: webGlobe.viewer,
    })
    //加载M3D地图文档（服务地址，配置参数）
    var landscapeLayer = m3dLayer.append('http://develop.smaryun.com:6163/igs/rest/g3d/ModelM3D', {
      //是否自动定位到数据位置
      autoReset: false,
      //模型细节显示控制参数：较大值可提高渲染性能，较低值可提高视觉质量
      maximumScreenSpaceError: 8,
    })
  ```

  加载数据默认会自动跳转定位到数据所在位置，如果需要自定义设置跳转的位置，可在`append()`方法中设置`autoReset: false`参数，取消自动定位，然后调用`SceneManager`视图功能管理对象的`flyToEx()`方法跳转视角；

  ```javascript
    //视点跳转（经度，纬度，视角高度，方位角，俯仰角，翻滚角）
    sceneManager.flyToEx(114.40298522106733, 30.465568703723072, {
      height: 100.85856618500283,
      heading: -45.4940479913348135,
      pitch: -15,
      roll: 0,
    })
  ```

**Step 5. <font color=red>初始化三维地图文档查询对象</font>**:
&ensp;&ensp;&ensp;&ensp;初始化三维地图文档查询对象：构造`CesiumZondy.Query.G3DDocQuery`三维地图文档查询对象，配置相关参数后调用 `queryG3DFeature`方法执行查询方法。

- Example:
  ```javascript
    var queryParam = new CesiumZondy.Query.G3DDocQuery()
    //查询图层的URL路径
    queryParam.gdbp = encodeURI('gdbp://MapGisLocal/示例数据/ds/三维示例/sfcls/景观_模型')
    //设置查询结果结构
    queryParam.structs = '{"IncludeAttribute":true,"IncludeGeometry":true,"IncludeWebGraphic":false}'
    //属性查询
    queryParam.where = "test='19.6'"
    //服务器的ip
    queryParam.serverIp = ip
    queryParam.serverPort = port
    queryParam.queryG3DFeature(
      function(result) {},
      function(err) {}
    )
  ```

### 关键接口

#### 1.【三维地图文档查询类】`CesiumZondy.Query.G3DDocQuery(option)`

- `options` 属性说明

| 参数名       | 类型   | 说明                                             |
| ------------ | ------ | ------------------------------------------------ |
| serverIp     | string | igs 服务 ip                                      |
| serverPort   | string | igs 服务端口号                                   |
| docName      | string | 三维文档的名称                                   |
| gdbp         | string | 三维图层的 gdbpUrl                               |
| layerIndex   | int    | 图层序号                                         |
| geometryType | string | 几何类型描述                                     |
| geometry     | string | 几何约束区域参数，其形式取决于 geometryType 的值 |
| where        | string | 符合 SQL 查询规范的任何字符串                    |
| objectIds    | string | 需要查询的要素 Id 号                             |
| structs      | json   | 指定查询结果的结构                               |
| page         | string | 回的要素分页的页数                               |
| pageCount    | string | 要素结果集每页的记录数量                         |
| rule         | json   | 查询规则                                         |
| queryResult  | string | 查询结果,这里主要是存放查询过程中报错信息        |

##### 【method】 `queryG3DFeature(successCallback, errorCallback, type)` 查询对应的三维地图

| 参数名          | 类型     | 说明          |
| --------------- | -------- | ------------- |
| successCallback | function | 成功回调      |
| errorCallback   | function | 失败回调      |
| type            | String   | 类型 post/get |
