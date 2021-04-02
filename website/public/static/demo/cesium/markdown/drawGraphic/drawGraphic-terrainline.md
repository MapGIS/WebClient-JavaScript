## 绘制贴地形线

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在三维场景中绘制贴地形模式的线实体。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.EntityController`类提供的`appendLine()`方法，实现贴地形线的添加绘制；可通过`removeEntity(entity)`移除。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;引用开发库：本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建三维视图 Div 容器，构造三维场景控件 WebSceneControl，构造并设置鼠标位置信息显示控件，加载 Google 地图作为底图显示；

**Step 3. <font color=red>加载地形数据</font>**:
&ensp;&ensp;&ensp;&ensp;加载地形数据：通过`TerrainLayer`类加载地形数据；

- Example:
  ```javascript
    //构造地形层管理对象（视图）
    var terrainLayer = new CesiumZondy.Layer.TerrainLayer({
      viewer: webGlobe.viewer,
    })
    //添加三维地图文档：地形数据
    terrainLayer.append('http://develop.smaryun.com:6163/igs/rest/g3d/terrain', {})
  ```

**Step 4. <font color=red>绘制贴地形线</font>**:
&ensp;&ensp;&ensp;&ensp;绘制贴地形线：首先构造`CesiumZondy.Manager.EntityController`几何绘制控制对象，然后调用`appendLine()`方法，设置信息：线名称、坐标点数组、线宽、线颜色、是否识别带高度的坐标、是否贴地形等信息，注意绘制贴地形线需设置贴地形参数为 true，并只需传入二维坐标点，即可实现贴地形线的添加绘制。

- Example:

  ```javascript
    //构造几何绘制控制对象
    var entityController = new CesiumZondy.Manager.EntityController({
      viewer: webGlobe.viewer,
    })
    //坐标位置
    var pointArr = [120.7642, 23.1537, 120.7688, 23.144, 120.7729, 23.1356, 120.7776, 23.1259]
    //绘制贴地形线
    terrainLine = entityController.appendLine(
      //名称
      '贴地形线',
      //点数组
      pointArr,
      //线宽
      3,
      //线颜色
      new Cesium.Color(255 / 255, 0 / 255, 0 / 255, 1),
      //是否识别带高度的坐标
      false,
      //是否贴地形
      true,
      //附加属性
      {}
    )
  ```

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

#### 2.【几何绘制控制类】`CesiumZondy.Manager.EntityController`

##### 【method】`appendLine(name, pointsArray, width, color, isHeight, clampToGround, options) → {Entity}`：绘制线，可绘制贴地形线

| 参数名        | 类 型   | 说 明                    |
| ------------- | ------- | ------------------------ |
| name          | String  | 名称                     |
| pointsArray   | Array   | 点数组                   |
| width         | Number  | 线的宽度                 |
| color         | Color   | 线颜色(默认为蓝色)       |
| isHeight      | Boolean | 设置是否识别带高度的坐标 |
| clampToGround | Boolean | 设置是否贴地形           |
| options       | Object  | 包含的附加属性           |
