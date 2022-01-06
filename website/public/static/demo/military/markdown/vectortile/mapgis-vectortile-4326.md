## 添加二维矢量瓦片服务

### 示例功能

&ensp; &ensp; &ensp; &ensp; 本示例实现在三维场景中加载在线二维地图数据，对接 MapGIS IGServer 发布的二维矢量瓦片服务，坐标系为 EPSG:4326，即经纬度坐标系。

### 示例实现

&ensp; &ensp; &ensp; &ensp; 数据准备：需提前在 MapGIS Server Manager 服务管理器中发布二维矢量瓦片服务。

&ensp; &ensp; &ensp; &ensp; 本示例需要使用【include-cesium-local.js】开发库实现，关键接口为 `CesiumZondy.Overlayer.VectorTileLayer` 类。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：

&ensp; &ensp; &ensp; &ensp; 本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：

&ensp; &ensp; &ensp; &ensp; 创建 `id='GlobeView'` 的 div 作为三维视图的容器，并设置其样式；

**Step 3. <font color=red>构造三维场景控件</font>**：

&ensp; &ensp; &ensp; &ensp; 实例化 `Cesium. WebSceneControl` 对象，完成此步骤后可在三维场景中加载三维球控件；

-   Example:
    ```javascript
    //构造三维视图对象（视图容器div的id，三维视图设置参数）
    var webGlobe = new Cesium.WebSceneControl('GlobeView', {});
    ```

**Step 4. <font color=red>加载数据</font>**:

&ensp; &ensp; &ensp; &ensp; 加载数据：构造 `CesiumZondy.Overlayer.VectorTileLayer` 传入参数即可直接加载矢量瓦片数据服务。

-   Example:
    ```javascript
      //构造矢量瓦片图层对象
      vectortileLayer = new CesiumZondy.Overlayer.VectorTileLayer(
          //视图
          webGlobe.viewer,
          {
              //样式json文件路径
              styleUrl: `${protocol}://${ip}:${port}/igs/rest/mrms/vtiles/styles/OSM全中国经纬度.json`,
              //第三方需要的token
              token: '',
              //是否可见
              show: true,
              tilingScheme: new Cesium.GeographicTilingScheme({
                  numberOfLevelZeroTilesX: 2,
                  numberOfLevelZeroTilesY: 1
              }),
              callback: handleLayerAdd
          }
      );
    ```

### 关键接口

#### 1.【三维场景控件类】 `Cesium. WebSceneControl(elementId, options)`

| 参数名    | 类 型             | 说 明                |
| --------- | ----------------- | -------------------- |
| elementId | Element \| String | 放置视图的 div 的 id |
| options   | Object            | （可选）附加属性     |

-   `options`属性主要参数

| 参数名           | 类 型   | 默认值 | 说 明                                                                                  |
| ---------------- | ------- | ------ | -------------------------------------------------------------------------------------- |
| viewerMode       | String  | ‘3D’   | （可选）初始视图模式默认为三维球视图 '2D'表示二维视图 'COLUMBUS_VIEW' 表示三维平面视图 |
| showInfo         | Boolean | false  | （可选）是否显示默认的属性信息框                                                       |
| animation        | Boolean | true   | （可选）默认动画控制不显示                                                             |
| baseLayerPicker  | Boolean | true   | （可选）是否创建图层控制显示小组件                                                     |
| fullscreenButton | Boolean | true   | （可选）是否创建全屏控制按钮                                                           |
| vrButton         | Boolean | false  | （可选）是否创建 VR 按钮                                                               |

#### 2.【矢量瓦片类】 `CesiumZondy.zondy.VectorTileLayer`

| 参数名 | 类 型  | 说 明                       |
| ------ | ------ | --------------------------- |
| viewer | Object | 传入的 cesium 的地图 viewer |
| option | Object | 属性键值对，地图属性字段。  |

-   `option`属性主要参数

| 参数名         | 类 型               | 属性        | 默认值    | 说 明                                                                                                                                                       |
| -------------- | ------------------- | ----------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ip             | String              | \<optional> | localhost | 地图服务 ip                                                                                                                                                 |
| port           | String              | \<optional> | 6163      | 地图服务 port                                                                                                                                               |
| layerName      | String              | \<optional> |           | 地图名                                                                                                                                                      |
| mvtStyle       | String              |             |           | 样式 json 文件路径或者 MVT-JSON 对象，当为 url 时等于 styleUrl；当为 vectortilejson 等于 vectortilejson                                                     |
| styleUrl       | String              | \<optional> |           | 样式 json 文件路径,有 styleUrl 就可以直接读取 styleUrl 里的信息;不然就是加载中地发布的矢量瓦片，使用 ip，port 和 layerName 先拼接 styleUrl 路径再进行查询。 |
| vectortilejson | Object              | \<optional> |           | 矢量瓦片 json 对象,直接取 json 对象，不需要再去请求。                                                                                                       |
| tilingScheme   | Cesium.TilingScheme | \<optional> |           | 矢量瓦片瓦片切分规则：经纬度还是墨卡托                                                                                                                      |
| token          | String              | \<optional> |           | 第三方需要的 token，比如 mapbox                                                                                                                             |
| show           | String              | \<optional> | true      | 是否可见                                                                                                                                                    |
| callback       | String              | \<optional> |           | 加载矢量瓦片成功回调，返回 Provider                                                                                                                         |
