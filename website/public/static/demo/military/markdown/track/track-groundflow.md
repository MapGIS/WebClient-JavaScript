## 模型贴地漫游

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能用于在三维场景中添加模型跟随地形动态运动显示效果。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-cesium-local.js】 开发库实现，通过 Cesium 三维球控件 `Cesium.WebSceneControl()` 的 `cruiseModelGround()` 方法创建模型贴地漫游，通过 `startCruiseModel()` 方法开始模型漫游，通过 `stopCruiseModel()` 方法暂停模型漫游, 通过 `clearCruiseModel()` 方法清除模型漫游。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维 WebGL 的功能；

**Step 2. <font color=red>创建三维地图容器并加载三维球控件</font>**:
&ensp;&ensp;&ensp;&ensp;创建 `id='GlobeView'` 的 div 作为三维视图的容器，并设置其样式，初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` ，完成此步后可在三维场景中加载三维球控件；

- Example

  ```Javascript
    //构造三维视图类（视图容器div的id，三维视图设置参数）
    var webGlobe = new Cesium.WebSceneControl('GlobeView', {
      terrainExaggeration: 1,
    });
  ```

  ```html
    <div id="GlobeView"></div>
  ```

**Step 3. <font color=red>创建模型贴地漫游</font>**：
&ensp;&ensp;&ensp;&ensp;通过 Cesium 三维球控件 `Cesium.WebSceneControl()` 的 `cruiseModelGround()` 方法创建模型漫游；

- Example:
  ```Javascript
    //模型URL地址、漫游点集、是否显示漫游路径、漫游时钟频率、漫游成功回调
    modelEntity = webGlobe.cruiseModelGround('./static/data/model/donghua.gltf', positionArr, true, 30, function(entities) {})
  ```

**Step 4. <font color=red>开始模型漫游</font>**:
&ensp;&ensp;&ensp;&ensp;通过 Cesium 三维球控件 `Cesium.WebSceneControl()` 的 `startCruiseModel()` 方法开始模型漫游。

- Example:
  ```Javascript
    /*开始漫游*/
    webGlobe.startCruiseModel();
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

##### 【method】 `cruiseModelGround(modelURL, positionArr, isShowPath, clockFrequency,function)` 模型漫游

- `cruiseModelGround` 方法主要参数

| 参数名         | 类型          | 说明                               |
| -------------- | ------------- | ---------------------------------- |
| modelURL       | string        | 模型 url                           |
| positionArr    | Array.<Array> | 漫游线路节点坐标数组 Array<[x, y]> |
| isShowPath     | bool          | 是否显示线路和节点                 |
| clockFrequency | Number        | 漫游时钟频率                       |
| function       | function      | 成功回调                           |

##### 【method】 `startCruiseModel()` 开始模型漫游

##### 【method】 `stopCruiseModel()` 结束模型漫游

##### 【method】 `clearCruiseModel()` 清除模型漫游
