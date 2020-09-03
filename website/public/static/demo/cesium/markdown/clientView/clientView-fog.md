## 粒子特效-雾

### 示例功能

此功能用于在场景中添加雾粒子特效功能，模拟雾天场景。

### 示例实现：

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.AdvancedAnalysisManager`类提供的`createFog()`方法，实现添加雾粒子特效功能。

>开发库使用请参见首页-概述-原生JS调用内容。

### 实现步骤：

1. <font color=red>引用开发库</font>：本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能；

2. <font color=red>创建三维地图容器加载三维球控件,并加载底图;</font>：创建 `id='GlobeView'` 的div作为三维视图的容器，并设置其样式，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，并调用`appendTDTuMap()` 方法加载天地图数据作为底图显示，然后再叠加显示M3D服务的大雁塔数据；


3. <font color=red>添加雾粒子特效</font>：首先构造`CesiumZondy.Manager.AdvancedAnalysisManager`高级分析功能类对象，然后调用`createFog()`方法添加雾粒子特效，可通过可选参数实现雾效的调整。

``` Javascript
            //初始化高级分析功能管理类
            var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({ viewer: webGlobe.viewer });
            //添加雾效
            advancedAnalysisManager.createFog({
                //雾特效透明度
                alpha:0.5
            });

```


### 关键接口

#### 1.【三维场景控件】 `CesiumZondy.WebSceneControl` 

#### 2.【高级分析功能管理类】 CesiumZondy.Manager.AdvancedAnalysisManager

##### (1) `createFog(optionsParam) → {Object}` 创建雾特效，返回雾特效实例（Object）

> `createFog` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|optionsParam|Object|雾特效参数|

> `optionsParam` 主要属性

|参数名|类型|说明|
|-|-|-|
|alpha|Number|（可选）雾特效透明度|
