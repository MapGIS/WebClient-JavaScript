## 加载吉威地图

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在三维场景中加载吉威地图。此示例中对接的地图服务坐标系为 EPSG:3857，即 Web 墨卡托，其网络为为国内镜像网络地址。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`appendWMTSTileExt()`方法，以此来加载吉威地图。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

> 特别说明：使用吉威地图请注意`藏南`与`南海九段线`问题，建议使用天地图。

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
&ensp;&ensp;&ensp;&ensp;加载数据：在此示例中对接的是 WMTS 类型的吉威地图，所以可调用 WMTS 类型地图的通用方法`appendWMTSTileExt()`来加载，需传入地图服务的 URL 地址，以及相应的参数，设置`from`为`'jiwei'`即代表是吉威地图。

- Example:
  ```javascript
    //添加吉威地图
    webGlobe.appendWMTSTileExt('http://59.252.165.22:8066/ime-cloud/rest/2016qgfdqrjszy/wmts', {
      from: 'jiwei',
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

##### 【method】`appendWMTSTileExt(wmtsBaseUrl, options)`：添加 WMTS(WebMapTileService) 标准的瓦片(扩展)

| 参数名      | 类 型  | 说 明                                                    |
| ----------- | ------ | -------------------------------------------------------- |
| wmtsBaseUrl | String | wmts 服务基地址 ：localhost:6163/igs/rest/ogc/WMTSServer |
| options     | Object | （可选）附加属性                                         |

- `options`属性主要参数

| 参数名     | 类 型  | 默认值  | 说 明                  |
| ---------- | ------ | ------- | ---------------------- |
| serverName | String | 无      | （可选）服务名         |
| proxy      | String | 无      | （可选）代理服务器地址 |
| from       | String | 'jiwei' | （可选）哪家公司的服务 |
