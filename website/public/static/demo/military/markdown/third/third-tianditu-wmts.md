## 加载天地图 WMTS

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例对接天地图服务，实现在三维场景中加载天地图。具体类型包括影像、地形、注记。由于天地图地图服务采用的是 OGC WMTS 标准，所以同样可以按照 WMTS 的规则进行天地图的加载，本示例与前一个示例的区别就在此。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Layer.ThirdPartyLayer`类提供的`appendTDTuMapByWMTS()`方法，按照 WMTS 服务来加载天地图。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

> 特别说明：根据天地图的要求，调用天地图 API 及服务接口都需要申请开发授权，获取服务许可（key）！本示例采用一个参考 key，实际使用需开发者自行申请。 友情链接：<a href="http://lbs.tianditu.gov.cn/home.html" target="_blank">天地图官网申请 key</a>

### 实现步骤

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
&ensp;&ensp;&ensp;&ensp;加载数据：创建第三方数据图层类`CesiumZondy.Layer.ThirdPartyLayer`的对象，调用`appendTDTuMapByWMTS()`方法，传入数据类型参数，可实现不同类型数据的加载。

- Example:
  ```javascript
    //构造第三方图层对象
    var thirdPartyLayer = new CesiumZondy.Layer.ThirdPartyLayer({
      viewer: webGlobe.viewer,
    })
    //通过WMTS服务方式加载天地图：如影像'img'、地形'ter'、 注记'cta'，具体请查看天地图官网:
    var tdtLayer = thirdPartyLayer.appendTDTuMapByWMTS({
      ptype: 'img',
    })
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

#### 2.【第三方数据图层类】`CesiumZondy.Layer.ThirdPartyLayer`

##### 【method】`appendTDTuMapByWMTS(optionsParam) → {ImageryLayer}`：通过 wmts 服务添加天地图，返回瓦片层对象（ImageryLayer）

| 参数名       | 类 型  | 说 明    |
| ------------ | ------ | -------- |
| optionsParam | Object | 附加属性 |

- `optionsParam`属性主要参数

| 参数名 | 类 型  | 默认值 | 说 明                                                                                          |
| ------ | ------ | ------ | ---------------------------------------------------------------------------------------------- |
| ptype  | String |        | （必选）地图类型，影像-'img'、地形-'ter'、注记-'cta'，具体请查看天地图官网                     |
| token  | String |        | （必选）开发 token （请到天地图官网申请自己的开发 token，自带 token 仅做功能验证随时可能失效） |
