## 加载谷歌地图

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例对接谷歌地图服务，实现在三维场景中加载谷歌地图，具体类型包括矢量、影像、栅格、道路。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Layer.ThirdPartyLayer`类提供的`appendGoogleMapExt()`方法或者`appendGoogleMap()`方法，以此来加载谷歌地图。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

> 使用谷歌地图请注意`藏南`与`南海九段线`问题，建议使用天地图。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id='GlobeView'`的 div 作为三维视图的容器，并设置其样式；

**Step 3. <font color=red>构造三维场景控件</font>**：
&ensp;&ensp;&ensp;&ensp;实例化`Cesium.WebSceneControl`对象，完成此步骤后可在三维场景中加载三维球控件

- Example:
  ```javascript
    //构造三维视图对象（视图容器div的id，三维视图设置参数）
    var webGlobe = new Cesium.WebSceneControl('GlobeView', {})
  ```

**Step 4. <font color=red>加载数据</font>**:
&ensp;&ensp;&ensp;&ensp;加载数据：创建第三方数据图层类`CesiumZondy.Layer.ThirdPartyLayer`的对象，在此调用`appendGoogleMapExt()`方法加载 Google 地图，为`ptype`属性配置不同参数可加载不同类型地图，如加载矢量可传入：‘m@207000000’、影像：‘s@130’、栅格：‘t@130’、道路：‘h@207000000’。

- Example:
  ```javascript
    //构造第三方图层对象
    var thirdPartyLayer = new CesiumZondy.Layer.ThirdPartyLayer({
      viewer: webGlobe.viewer,
    })
    var googleLayer = thirdPartyLayer.appendGoogleMapExt({
      //m-全地图（含矢量与道路）、r-矢量地图、h-道路地图、s-卫星影像地图、t-地形图
      ptype: 'r',
    })
  ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`new WebSceneControl(elementId, options)`：三维场景控件构造函数

- `WebSceneControl`构造函数主要参数

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

#### 2.【第三方数据图层类】CesiumZondy.Layer.ThirdPartyLayer

##### （1）`appendGoogleMapExt(optionsParam) → {ImageryLayer}`：添加 google 地图服务(扩展)，返回瓦片层对象（ImageryLayer），可用于操作移除

- `appendGoogleMapExt`方法主要参数

| 参数名       | 类 型  | 说 明      |
| ------------ | ------ | ---------- |
| optionsParam | Object | 可扩展参数 |

- `optionsParam`属性主要参数
- |参数名|类 型|说 明|
  > |-|-|-|
  > |ptype|string|（可选）地图类型： s-卫星影像地图、 h-道路地图、 m-全地图（含矢量与道路）、r-矢量地图、t-地形图；也可以进行组合，例如：s,r 或者 t,h|

##### （2）`appendGoogleMap(optionsParam) → {ImageryLayer}`：添加 Google 地图服务，返回瓦片层对象（ImageryLayer），可用于操作移除

> `appendGoogleMap`方法主要参数

| 参数名       | 类 型  | 说 明          |
| ------------ | ------ | -------------- |
| optionsParam | Object | 预留可扩展参数 |

- `optionsParam`属性主要参数

| 参数名 | 类 型  | 说 明                                                                                         |
| ------ | ------ | --------------------------------------------------------------------------------------------- |
| ptype  | string | （必选）地图类型：矢量‘m@207000000’ 、影像‘s@130’ 、栅格‘t@130,r@207000000、道路‘h@207000000’ |
