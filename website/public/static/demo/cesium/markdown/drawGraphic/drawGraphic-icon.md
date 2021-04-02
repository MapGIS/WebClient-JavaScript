## 添加图标

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在三维场景中添加图片标注。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.LabelLayer`类提供的`appendBillboard()`方法，实现图片标注的添加。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;引用开发库：本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建三维视图 Div 容器，构造三维场景控件 WebSceneControl，构造并设置鼠标位置信息显示控件，加载 Google 地图作为底图显示；

**Step 3. <font color=red>添加文本标注</font>**:
&ensp;&ensp;&ensp;&ensp;添加文本标注：首先构造`CesiumZondy.Manager.LabelLayer`注记图层管理对象，调用`appendBillboard()`方法可实现图片标注的添加，需要设置基本必要信息，如：图片标注的经纬度、高程、名称、图标文件路径、图片宽度、高度等信息。

- Example:

  ```javascript
    //构造注记图层管理对象
    var labelLayer = new CesiumZondy.Manager.LabelLayer({
      viewer: webGlobe.viewer,
    })
    //添加图片标注（经度、纬度、高程、名称、图片地址、图标宽度、图标高度）
    var icon = labelLayer.appendBillboard(114.3992, 30.5062, 0, '图标', './static/data/picture/icon.png', 50, 50)
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

#### 2.【注记图层管理类】`CesiumZondy.Manager.LabelLayer`

##### 【method】`appendBillboard(lat, lon, height, name, bImageUrl, bWidth, bHeight, optionsParam) → {Entity}`：添加图片标签，返回添加的公告板对象（Entity）

| 参数名       | 类 型  | 说 明    |
| ------------ | ------ | -------- |
| lat          | Number | 经度     |
| lon          | Number | 纬度     |
| height       | Number | 高度     |
| name         | String | 名称     |
| bImageUrl    | String | 图片地址 |
| bWidth       | Number | 图片宽度 |
| bHeight      | Number | 图片高度 |
| optionsParam | Object | 扩展参数 |

- `optionsParam`属性主要参数

| 参数名      | 类 型  | 说 明            |
| ----------- | ------ | ---------------- |
| description | String | （可选）描述信息 |
