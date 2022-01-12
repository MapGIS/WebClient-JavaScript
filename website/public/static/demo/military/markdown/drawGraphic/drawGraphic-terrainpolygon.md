## 绘制贴地形区

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在三维场景中绘制贴地形模式的区实体。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.EntityController`类提供的`appendGraphics()`方法，实现贴地形区的添加绘制；可通过`removePrimitive(entity)`移除。

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
&ensp;&ensp;&ensp;&ensp;绘制贴地形线：首先构造`CesiumZondy.Manager.EntityController`几何绘制控制对象，然后根据坐标点、颜色、分类类型等信息构造区图形对象，然后调用`appendGraphics()`方法，传入构造的区图形对象即可实现贴地形区的添加绘制。注意分类类型需设置为`Cesium.ClassificationType.TERRAIN`。

- Example:
  ```javascript
    //构造几何绘制控制对象
    var entityController = new CesiumZondy.Manager.EntityController({
      viewer: webGlobe.viewer,
    })
    //三维坐标点数组
    let points = [121.12838249665901, 23.828496638766055, 2816.2788, 121.150053294749, 23.82435802607214, 2584.9714, 121.14258923767652, 23.8125039217518, 2197.3468, 121.11461042047392, 23.809568499354498, 2405.1721]
    //构造区对象
    let polygon = {
      //区
      polygon: {
        //坐标
        hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(points),
        //颜色
        material: Cesium.Color.BLUE.withAlpha(0.5),
        //分类类型：地形类型
        classificationType: Cesium.ClassificationType.TERRAIN,
      },
    }
    //绘制图形通用方法：对接Cesium原生特性
    terrainPolygon = entityController.appendGraphics(polygon)
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

##### 【method】`appendGraphics(options) → {Entity}`：添加图形

| 参数名  | 类 型  | 说 明                      |
| ------- | ------ | -------------------------- |
| options | Object | 包含 entity 中相关选项设置 |
