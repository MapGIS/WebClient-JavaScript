## 绘制立体区

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在三维场景中绘制立体区。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.EntityController`类提供的`appendGraphics()`方法，实现立体区的添加绘制；可通过`removeEntity(entity)`移除。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;引用开发库：本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建三维视图 Div 容器，构造三维场景控件 WebSceneControl，构造并设置鼠标位置信息显示控件，加载 Google 地图作为底图显示；

**Step 3. <font color=red>绘制立体区</font>**:
&ensp;&ensp;&ensp;&ensp;绘制立体区：构造`CesiumZondy.Manager.EntityController`几何绘制控制对象，根据坐标点、是否指定各点高度、颜色等信息构造区对象，然后调用`appendGraphics()`方法即可实现立体区的绘制。

- Example:

  ```javascript
    //构造几何绘制控制对象
    var entityController = new CesiumZondy.Manager.EntityController({
      viewer: webGlobe.viewer,
    })

    //构造区对象
    var polygon = {
      name: '立体区',
      polygon: {
        //坐标点
        hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([114.3992, 30.5062, 100, 114.39921899282697, 30.507118866456594, 0, 114.39817867190918, 30.505787946817524, 0, 114.40013927896888, 30.505694066567706, 0]),
        //是否指定各点高度
        perPositionHeight: true,
        //颜色
        material: new Cesium.Color(33 / 255, 150 / 255, 243 / 255, 0.5),
        //轮廓线是否显示
        outline: true,
        //轮廓线颜色
        outlineColor: Cesium.Color.BLACK,
      },
    }
    //绘制图形通用方法：对接Cesium原生特性
    var stericPolygon = entityController.appendGraphics(polygon)
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

##### （1）`appendGraphics(options) → {Entity}`：添加图形

- `appendGraphics`方法主要参数

| 参数名  | 类 型  | 说 明                      |
| ------- | ------ | -------------------------- |
| options | Object | 包含 entity 中相关选项设置 |
