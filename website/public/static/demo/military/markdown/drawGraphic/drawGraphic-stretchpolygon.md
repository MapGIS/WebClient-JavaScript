## 绘制拉伸区

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在三维场景中绘制拉伸区。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.EntityController`类提供的`appendPolygon()`方法，实现拉伸区的添加绘制；可通过`removeEntity(entity)`移除。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;引用开发库：本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建三维视图 Div 容器，构造三维场景控件 WebSceneControl，构造并设置鼠标位置信息显示控件，加载 Google 地图作为底图显示；

**Step 3. <font color=red>绘制拉伸区</font>**:
&ensp;&ensp;&ensp;&ensp;绘制拉伸区：构造`CesiumZondy.Manager.EntityController`几何绘制控制对象，调用`appendPolygon()`方法，设置不同信息可绘制不同类型的区：

（1）构造二维坐标点数组，设置信息：区名称、坐标点数组、区填充颜色、外框线颜色，并设置“是否指定各点高度”参数为 false，即可实现平面区的添加绘制。

- Example:

  ```javascript
    //构造几何绘制控制对象
    var entityController = new CesiumZondy.Manager.EntityController({
      viewer: webGlobe.viewer,
    })
    //点数组（二维点）
    var pointArr = [114.40993798035257, 30.47917084653805, 114.4093239347542, 30.473893768825484, 114.41091821047152, 30.473773818562865, 114.41146570646127, 30.479026171029727, 114.40993798035257, 30.47917084653805]
    //绘制平面区（名称、点数组、区填充色、外框线颜色、是否指定各点高度）
    var polygon = entityController.appendPolygon('三维区', pointArr, new Cesium.Color(255 / 255, 255 / 255, 0 / 255, 0.5), new Cesium.Color(255 / 255, 0 / 255, 0 / 255, 1), false)
  ```

（2）构造三维坐标点数组，设置信息：区名称、坐标点数组、区填充颜色、外框线颜色，并设置“是否指定各点高度”参数为 true，即可实现拉伸区的添加绘制。

- Example:
  ```javascript
    //点数组（三维点）
    var pointArr = [114.40328987990017, 30.479789358042233, 100, 114.40255973680176, 30.473707285934392, 100, 114.40905754990294, 30.473938016458956, 100, 114.40971219770601, 30.479196348500707, 100, 114.40328987990017, 30.479789358042233, 100]
    //绘制立体拉伸区（名称、点数组、区填充色、外框线颜色、是否传入三维点、附加属性）
    var polygon = entityController.appendPolygon('三维区', pointArr, fillColor, outLineColor, true, {
      //多边形相对于地球表面的高度
      extrudedHeight: 50,
      //是否指定各点高度
      perPositionHeight: true,
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

#### 2.【几何绘制控制类】`CesiumZondy.Manager.EntityController`

##### （1）`appendPolygon(name, points, fillColorParam, outlineColorParam, options) → {Entity}`：画多边形区，返回绘制的多边形区对象 Entity

| 参数名            | 类 型   | 说 明                                     |
| ----------------- | ------- | ----------------------------------------- |
| name              | String  | 名称                                      |
| points            | Array   | 点数组（顺序是逆时针）                    |
| fillColorParam    | Color   | 区填充色 默认白色半透明                   |
| outlineColorParam | Color   | 外框线颜色 默认红色半透明                 |
| threeDimension    | Boolean | 是否传入三维点 传入三维点则按照三维点解析 |
| options           | Object  | 可选扩展参数                              |
