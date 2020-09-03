## 模型漫游

### 示例功能

此功能用于在三维场景中添加模型动态运动显示效果。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `cruiseModel()` 方法创建模型漫游，通过 `startCruiseModel()` 方法开始模型漫游，通过 `stopCruiseModel()` 方法暂停模型漫游, 通过 `clearCruiseModel()` 方法清除模型漫游。

### 实现步骤：

1. <font color=red>引用开发库</font>：本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能；

2. <font color=red>创建三维地图容器并加载三维球控件</font>：创建 `id='GlobeView'` 的div作为三维视图的容器，并设置其样式，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，完成此步后可在三维场景中加载三维球控件；

3. <font color=red>创建模型漫游</font>：创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `cruiseModel()` 方法创建模型漫游；

``` Javascript
//初始化分析功能管理类
var analysisManager = new CesiumZondy.Manager.AnalysisManager({
    viewer: webGlobe.viewer
});
//模型漫游
var modelEntity = analysisManager.cruiseModel(
    //模型URL地址
    './static/data/model/GroundVehicle.glb',
    //漫游点集
    positionArr,
    //是否显示漫游路径
    true,
    //漫游时钟频率
    10
);
```

4. <font color=red>开始模型漫游</font>：创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `startCruiseModel()` 方法开始模型漫游；

``` Javascript
/*开始漫游*/
analysisManager.startCruiseModel();
```

### 关键接口

#### 1.【三维视图的主要类】 `Cesium.WebSceneControl`

#### 2.【分析功能管理类】 `CesiumZondy.Manager.AnalysisManager`

##### (1) `cruiseModel(modelURL, positionArr, isShowPath, clockFrequency) → {Array}` 模型漫游

> `cruiseModel` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|modelURL|String|模型url|
|positionArr|Array.<Array>|	漫游线路节点坐标数组 Array<[x, y]>|
|isShowPath|Boolean|是否显示线路和节点|
|clockFrequency|Number|漫游时钟频率|

##### (2) `startCruiseModel()` 开始模型漫游

##### (3) `stopCruiseModel()` 结束模型漫游

##### (4) `clearCruiseModel(modelEntities)` 清除模型漫游

> `clearCruiseModel` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|modelEntities|Object|模型实例|
