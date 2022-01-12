## 加载百度地图

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例对接百度地图服务，实现在三维场景中加载百度地图，具体类型包括矢量、影像。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Layer.ThirdPartyLayer`类提供的`appendBaiduMap()`方法，以此来加载百度地图。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

> 特别说明：对接百度地图，需获取其 key，在此封装的接口中采用的是普通开发者授权的 key，如果需商用，需了解其商业授权。友情链接：<a href="http://lbsyun.baidu.com/cashier/auth" target="_blank">商用授权</a> <a href="http://lbsyun.baidu.com/cashier/quota#/home" target="_blank">配额提升</a>

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
&ensp;&ensp;&ensp;&ensp;创建第三方数据图层类`CesiumZondy.Layer.ThirdPartyLayer`的对象，调用`appendBaiduMap()`方法，配置不同参数可加载不同类型地图，包括：瓦片（ptype:'tile'）、卫星（ptype:'sate'）和交通地图（ptype:'traffic'）。

- Example:
  ```javascript
    //构造第三方图层对象
    var thirdPartyLayer = new CesiumZondy.Layer.ThirdPartyLayer({
      viewer: webGlobe.viewer,
    })
    //添加百度地图
    var baiduLayer = thirdPartyLayer.appendBaiduMap({
      //地图类型：瓦片：'tile'、卫星：'sate'、交通地图：'traffic'
      ptype: 'tile',
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

##### 【method】`appendBaiduMap(optionsParam) → {ImageryLayer}`：添加百度地图服务，返回瓦片层对象（ImageryLayer），可用于操作移除

- `appendBaiduMap`方法主要参数

| 参数名       | 类 型  | 说 明    |
| ------------ | ------ | -------- |
| optionsParam | Object | 附加属性 |

- `optionsParam`属性主要参数

| 参数名 | 类 型  | 默认值 | 说 明                                                                       |
| ------ | ------ | ------ | --------------------------------------------------------------------------- |
| ptype  | String | 'vec'  | （必选）地图类型，提供瓦片-'tile'、卫星-'sate'、 交通-'traffic'三种百度地图 |
