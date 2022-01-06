## 添加文本

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在三维场景中添加文本标注。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.LabelLayer`类提供的`appendLabel()`方法，实现文本标注的添加。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;引用开发库：本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建三维视图 Div 容器，构造三维场景控件 WebSceneControl，构造并设置鼠标位置信息显示控件，加载 Google 地图作为底图显示；

**Step 3. <font color=red>添加文本标注</font>**:
&ensp;&ensp;&ensp;&ensp;添加文本标注：首先构造`CesiumZondy.Manager.LabelLayer`注记图层管理对象，调用`appendLabel()`方法可实现文本标注的添加，需要设置基本必要信息，如：文本标注的经纬度、高程、文本内容；还可设置各项样式信息：字体、颜色、样式、标签位置等。

- Example:

  ```javascript
    //构造注记图层管理对象
    var labelLayer = new CesiumZondy.Manager.LabelLayer({
      viewer: webGlobe.viewer,
    })
    //添加文字标注
    label = labelLayer.appendLabel(
      //经度、纬度、高程
      114.3992,
      30.5062,
      0,
      //文本内容
      '光谷广场',
      {
        //文字大小、字体样式
        font: '20pt 楷体',
        //文本颜色
        fillColor: Cesium.Color.YELLOW,
        //文本样式，FILL：只填充；OUTLINE：只显示轮廓；FILL_AND_OUTLINE：填充颜色并显示轮廓
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        //边线颜色
        outlineColor: Cesium.Color.RED,
        //边线宽度
        outlineWidth: 2,
        //文本垂直方向与坐标点的相对位置：LEFT、CENTER、RIGHT
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        //文本水平方向与坐标点的相对位置：LEFT、CENTER、RIGHT
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      }
    )
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

##### 【method】`appendLabel(lat, lon, height, lText, optionsParam) → {Entity}`：添加文字标签，返回标签对象（Entity）

| 参数名       | 类 型  | 说 明    |
| ------------ | ------ | -------- |
| lat          | Number | 经度     |
| lon          | Number | 纬度     |
| height       | Number | 高程     |
| lText        | String | 标签内容 |
| optionsParam | Object | 附加属性 |

- `options`属性主要参数

| 参数名           | 类 型            | 默认值                             | 说 明                                                                                               |
| ---------------- | ---------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------- |
| font             | String           | '14pt monospace'                   | （可选）字体                                                                                        |
| fillColor        | Color            | Cesium.Color.WHITE                 | （可选）字体的填充色                                                                                |
| outlineColor     | Color            | Cesium.Color.WHITE                 | （可选）字体的填充色                                                                                |
| style            | LabelStyle       | Cesium.LabelStyle.FILL_AND_OUTLINE | （可选）样式                                                                                        |
| outlineWidth     | Number           | 1                                  | （可选）外边线宽度                                                                                  |
| heightReference  | Number           | Cesium.HeightReference.NONE        | （可选）外边线宽度                                                                                  |
| verticalOrigin   | VerticalOrigin   | Cesium.VerticalOrigin.CENTER       | （可选）标签位置 Cesium.VerticalOrigin.Cesium.VerticalOrigin.LEFT Cesium.VerticalOrigin.RIGHT       |
| horizontalOrigin | HorizontalOrigin | Cesium.HorizontalOrigin.CENTER     | （可选）标签位置 Cesium.HorizontalOrigin.Cesium.HorizontalOrigin.LEFT Cesium.HorizontalOrigin.RIGHT |
| description      | String           |                                    | （可选）属性描述                                                                                    |
