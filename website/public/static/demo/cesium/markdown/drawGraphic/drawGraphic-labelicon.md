## 添加图文标注

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在三维场景中添加图文标注，与单纯的文本、图片标注不同的是，图文标注可同时包括图片和文字信息。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.LabelLayer`类提供的`appendLabelIconComm()`方法、`appendLabelIcon()`方法，实现图文标注的添加。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;引用开发库：本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建三维视图 Div 容器，构造三维场景控件 WebSceneControl，构造并设置鼠标位置信息显示控件，加载 Google 地图作为底图显示；

**Step 3. <font color=red>添加图文标注</font>**:
&ensp;&ensp;&ensp;&ensp;添加图文标注：构造`CesiumZondy.Manager.LabelLayer`注记图层管理对象，构造必要的位置、图片、文本对象等参数信息，可调用以下两种方法实现图文标注的添加，在实际应用场景中可根据具体应用需求选择调用不同的方法。

（1）调用`appendLabelIconComm()`方法，设置各项基本信息，可实现图文标注的添加；

- Example:
  ```javascript
    //构造注记图层管理对象
    var labelLayer = new CesiumZondy.Manager.LabelLayer({
      viewer: webGlobe.viewer,
    })
    //方法一
    var labelIcon = labelLayer.appendLabelIcon(
      //文本内容
      '湖北省老年大学',
      //经度、纬度、高度
      114.3639,
      30.5603,
      0,
      //文字大小、字体
      '16pt 宋体',
      //文字颜色
      new Cesium.Color(0 / 255, 0 / 255, 0 / 255, 0.8),
      //图片地址
      './static/data/picture/icon.png',
      //图片宽度、高度
      50,
      50,
      //最远显示距离：相机到注记的距离大于该值 注记不显示
      10000000,
      //最近显示距离：相机到注记的距离小于该值 注记不显示
      1,
      //图片位置：'center','top','bottom'
      'center'
    )
  ```

（2）调用`appendLabelIcon()`方法，传入构造的位置、图片、文本对象等参数信息，同样也可实现图文标注的添加，此方法对接 Cesium 原生属性，可实现更加丰富的效果；

- Example:
  ```javascript
  //位置（x、y、z）
  var position = Cesium.Cartesian3.fromDegrees(114.36517991431259, 30.56206615740468, 10)
  //图片对象
  var billboardGraphics = new Cesium.BillboardGraphics({
    //图片地址
    image: './static/data/picture/icon.png',
    //图片宽度
    width: 64,
    //图片高度
    height: 64,
    //随远近缩放
    pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e5, 3.0, 1.5e7, 0.5),
    //随远近隐藏
    translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0),
  })
  //文本对象
  var labelGraphics = new Cesium.LabelGraphics({
    //文本
    text: '湖北省博物馆',
    //文字大小、字体
    font: '20pt 宋体',
    //文字颜色
    fillColor: Cesium.Color.BLACK,
    //文本垂直位置
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    //文本水平位置
    horizontalOrigin: Cesium.HorizontalOrigin.BOTTOM,
    //偏移量
    pixelOffset: new Cesium.Cartesian2(0.0, -64 / 4), //x,y方向偏移 相对于屏幕
    //随远近缩放
    pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5),
    //随远近隐藏
    translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0),
  })
  //添加图标注记（文字内容、描述、位置、图片对象、文本对象）
  labelIcon1 = labelLayer.appendLabelIconComm('湖北省博物馆', '坐落于湖北省武汉市武昌区东湖风景区', position, billboardGraphics, labelGraphics)
  ```

&ensp;&ensp;&ensp;&ensp;其中，位置对象需使用 Cesium.Cartesian3 类来构造，图片对象需由 Cesium.BillboardGraphics 构造，文本对象需由 Cesium.LabelGraphics 构造，这三个类都属于 Cesium 原生提供的类，具体用法可参考其 API 文档。

### 关键接口

#### 1.【三维场景控件类】`Cesium.WebSceneControl(elementId, options)`

| 参数名    | 类 型             | 说 明             |
| --------- | ----------------- | ----------------- |
| elementId | Element \| String | 放置视图的div的id |
| options   | Object            | （可选）附加属性  |

* `options`属性主要参数

| 参数名           | 类 型   | 默认值 | 说 明                                                        |
| ---------------- | ------- | -------- | ------------------------------------------------------------ |
| viewerMode       | String  | ‘3D’   | （可选）初始视图模式默认为三维球视图 '2D'表示二维视图 'COLUMBUS_VIEW' 表示三维平面视图 |
| showInfo         | Boolean | false  | （可选）是否显示默认的属性信息框                             |
| animation        | Boolean | true   | （可选）默认动画控制不显示                                   |
| baseLayerPicker  | Boolean | true   | （可选）是否创建图层控制显示小组件                           |
| fullscreenButton | Boolean | true   | （可选）是否创建全屏控制按钮                                 |
| vrButton         | Boolean | false  | （可选）是否创建VR按钮                                       |

#### 2.【注记图层管理类】`CesiumZondy.Manager.LabelLayer`

##### 【method】`appendLabelIcon(text, lon, lat, height, font, fillColor, iconUrl, iconWidth, iconHeight, farDist, nearDist, txtPos, attribute) → {Entity}`：添加图标注记

| 参数名      | 类 型  | 说 明                                            |
| ----------- | ------ | ------------------------------------------------ |
| text        | String | 注记文字内容                                     |
| lon         | Number | 经度                                             |
| lat         | Number | 纬度                                             |
| height      | Number | 高程                                             |
| font        | String | 字体，这里将字体和大小放在一起 eg:'14pt 楷体'    |
| fillColor   | Color  | 字体的填充色                                     |
| iconUrl     | String | 图标路径                                         |
| iconWidth   | Number | 图标宽度                                         |
| iconHeight  | Number | 图标高度                                         |
| farDist     | Number | 最远显示距离,相机到注记的距离大于该值 注记不显示 |
| nearDist    | Number | 最近显示距离,相机到注记的距离小于该值 注记不显示 |
| txtPosParam | String | 图片位置 'center','top','bottom'                 |
| attribute   | String | 其他属性信息                                     |

##### 【method】`appendLabelIconComm(name, description, position, billboardGraphics, labelGraphics)`：添加图标注记，通用接口

- `appendLabelIconComm`方法主要参数

| 参数名            | 类 型             | 说 明        |
| ----------------- | ----------------- | ------------ |
| name              | String            | 注记文字内容 |
| description       | String            | 描述         |
| position          | Cartesian3        | 位置         |
| billboardGraphics | BillboardGraphics | 图片对象     |
| labelGraphics     | LabelGraphics     | 文本对象     |

#### 2.【三维笛卡尔点】`Cartesian3`

##### 【method】`new Cartesian3(x, y, z)`：构造函数

| 参数名 | 类 型  | 默认值 | 说 明          |
| ------ | ------ | ------ | -------------- |
| x      | Number | 0.0    | （可选）X 坐标 |
| y      | Number | 0.0    | （可选）Y 坐标 |
| z      | Number | 0.0    | （可选）Z 坐标 |
