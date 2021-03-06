## 绘制贴地球区

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在三维场景中绘制贴地球区。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.EntityController`类提供的`appendGroundPolygon()`方法，实现贴地球区的添加绘制。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;引用开发库：本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建三维视图 Div 容器，构造三维场景控件 WebSceneControl，构造并设置鼠标位置信息显示控件，加载 Google 地图作为底图显示；

**Step 3. <font color=red>创建贴地区</font>**:
&ensp;&ensp;&ensp;&ensp;绘制贴地区：首先构造`CesiumZondy.Manager.EntityController`几何绘制控制对象、构造外圈坐标数组、内圈坐标数组、填充颜色对象等信息，然后调用`appendGroundPolygon()`方法，即可实现贴地区的添加绘制。如果要绘制单圈的不带洞区，内圈坐标数组传空即可。

- Example:
  ```javascript
    //构造几何绘制控制对象
    var entityController = new CesiumZondy.Manager.EntityController({
      viewer: webGlobe.viewer,
    })
    //坐标点数组（经纬度）
    var point_out = [70, 0, 150, 0, 150, 60, 70, 60, 70, 0]
    //根据给定点画贴地多边形
    var groundPolygon = webGlobe.appendGroundPolygon(
      //外圈坐标数组（经纬度）
      point_out,
      //内圈坐标数组（经纬度）
      null,
      //填充颜色
      new Cesium.ColorGeometryInstanceAttribute(255 / 255, 255 / 255, 0 / 255, 0.5),
      //附加属性
      {}
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

##### 【method】`appendGroundPolygon(outPnts, innerPnts, color, options) → {Object}`：根据给定点画贴地区

| 参数名    | 类 型   | 说 明                                              |
| --------- | ------- | -------------------------------------------------- |
| outPnts   | Array   | 外圈坐标数组（经纬度）：[x1,y1,x2,y2,x3,y3]        |
| innerPnts | Array   | 内圈坐标数组（经纬度）：Array<[x1,y1,x2,y2,x3,y3]> |
| color     | Color   | 填充颜色(默认不指定时为蓝色)                       |
| options   | Options | 可选扩展参数                                       |
