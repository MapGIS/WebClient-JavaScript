## 绘制点

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在三维场景中绘制点实体。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.EntityController`类提供的`appendPoint()`或`appendPointComm()`方法，实现点实体的添加绘制。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;引用开发库：本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建三维视图 Div 容器，构造三维场景控件 WebSceneControl，构造并设置鼠标位置信息显示控件，加载 Google 地图作为底图显示；

**Step 3. <font color=red>绘制点实体</font>**:
&ensp;&ensp;&ensp;&ensp;绘制点实体：首先构造`CesiumZondy.Manager.EntityController`几何绘制控制对象，然后调用`appendPoint()`方法，设置点实体所在经纬度、高程，以及名称、像素大小、颜色、边线颜色、边线宽度信息，即可添加绘制点实体。

- Example:

  ```javascript
    //构造几何绘制控制对象
    var entityController = new CesiumZondy.Manager.EntityController({
      viewer: webGlobe.viewer,
    })
    //添加点实体：经度、纬度、高程、名称、大小（像素单位）、颜色、外边线颜色、边线宽度
    var point = entityController.appendPoint(114.30252625376454, 30.544631482624357, 20, '黄鹤楼', 12, new Cesium.Color(255 / 255, 255 / 255, 0 / 255, 1), new Cesium.Color(255 / 255, 0 / 255, 0 / 255, 1), 2)

    //方法二：添加点通用方法，对接Cesium原生，可设置更多属性
    point4 = entityController.appendPointComm(
      //经度、纬度、高程
      114.28478689925817,
      30.555691346035022,
      0,
      //名称、描述
      '晴川阁',
      '晴川阁景点',
      //附加属性：像素大小、颜色、外边线颜色、边线宽度
      {
        pixelSize: 12,
        color: new Cesium.Color(255 / 255, 255 / 255, 0 / 255, 1),
        outlineColor: new Cesium.Color(255 / 255, 0 / 255, 0 / 255, 1),
        outlineWidth: 2,
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

#### 2.【几何绘制控制类】`CesiumZondy.Manager.EntityController`

##### 【method】`appendPoint(lat, lon, height, name, pixelSize, color, outlineColor, outlineWidth, description) → {Entity}`：添加点

| 参数名       | 类 型  | 说 明                           |
| ------------ | ------ | ------------------------------- |
| lat          | Number | 经度                            |
| lon          | Number | 纬度                            |
| height       | Number | 高程                            |
| name         | String | 名称                            |
| pixelSize    | Number | 像素大小                        |
| color        | Color  | 颜色(new Cesium.Color(1,0,0,1)) |
| outlineColor | Color  | 外边线颜色                      |
| outlineWidth | Number | 边线宽度                        |
| description  | String | 属性描述信息                    |

##### 【method】`appendPointComm(lat, lon, height, name, description, options) → {Entity}`：添加点通用方法

| 参数名      | 类 型  | 说 明               |
| ----------- | ------ | ------------------- |
| lat         | Number | 经度                |
| lon         | Number | 纬度                |
| height      | Number | 高程                |
| name        | String | 名称                |
| description | String | 属性描述信息        |
| options     | Object | entity 参数信息对象 |
