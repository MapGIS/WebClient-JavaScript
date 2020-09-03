## 雷达扫描圆

### 示例功能

此功能用于在当前场景中添加雷达扫描圆显示效果，可应用于任意场景中。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，初始化高级分析管理类 `CesiumZondy.Manager.AdvancedAnalysisManager` 的`createRadarScan()`方法创建雷达扫描圆对象，然后分别通过分析功能管理类`CesiumZondy.Manager.AnalysisManager` 的`addSceneEffect()`方法与`removeSceneEffect()`方法来添加与移除雷达扫描圆显示功能。

### 实现步骤：

1. <font color=red>引用开发库</font>：本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能；

2. <font color=red>创建三维地图容器加载三维球控件,并加载底图;</font>：创建 `id='GlobeView'` 的div作为三维视图的容器，并设置其样式，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，并调用`appendGoogleMapExt()` 方法加载Google地图作为底图显示,同时叠加地形数据；

3. <font color=red>跳转定位</font>：调用Cesium三维球场景视图管理类 `CesiumZondy.Manager.SceneManager` 的 `flyToEx()` 方法定位到指定点；

``` Javascript
            //初始化视图功能管理类            
            var sceneManager = new CesiumZondy.Manager.SceneManager({ viewer: webGlobe.viewer });
            //视点跳转
            sceneManager.flyToEx(120.8642, 23.3351, {
                height: 10000,//视角高度
                heading: 35,//方位角
                pitch: -30,//俯仰角
                roll: 0 //翻滚角
            });
```

5. <font color=red>创建雷达扫描圆</font>:初始化高级分析功能管理类对象 `CesiumZondy.Manager.AdvancedAnalysisManager` ，调用`createRadarScan()`方法创建雷达扫描圆对象，注意`必须开启深度检测` ； 

``` Javascript
            //开启深度检测（必须）
            webGlobe.viewer.scene.globe.depthTestAgainstTerrain = true;
            //初始化高级分析功能管理类
            var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({ viewer: webGlobe.viewer });
            //创建一个雷达扫描圆对象
            var radarScanEffect = advancedAnalysisManager.createRadarScan(
                //雷达中心点
                Cesium.Cartesian3.fromDegrees(120.9558, 23.4481, 3657),
                //扫描半径
                5000,
                //扫描区域颜色
                new Cesium.Color(255 / 255, 0 / 255, 0 / 255, 1),
                //周期时间,单位毫秒
                8000
            );

```

6. <font color=red>添加/移除雷达扫描圆显示</font>：调用分析功能管理类`CesiumZondy.Manager.AnalysisManager` 的`addSceneEffect()`方法添加雷达扫描圆显示，相应可调用`removeSceneEffect()`方法移除。

``` Javascript
            //初始化分析功能管理类
            var analysisManager = new CesiumZondy.Manager.AnalysisManager({
                viewer: webGlobe.viewer
            });
            //添加场景特效-雷达扫描圆
            analysisManager.addSceneEffect(radarScanEffect);
            //移除场景特效-雷达扫描圆
            //analysisManager.removeSceneEffect(radarScanEffect);
```

### 关键接口

#### 1.【三维场景控件】 `CesiumZondy.WebSceneControl` 

#### 2.【实体绘制控制器类】 CesiumZondy.Layer.CesiumFuncManager，添加点appendPoint()

#### 3.【高级分析功能管理类】CesiumZondy.Manager.AdvancedAnalysisManager

##### (1) `createRadarScan(center, radius, scanColor, duration) → {Object}` 创建雷达扫描圆，返回雷达扫描实例RadarScan（Object）
> `createRadarScan` 方法主要参数

| 参数名    | 类型       | 说明              |
| --------- | ---------- | ----------------- |
| center    | Cartesian3 | 雷达中心点        |
| radius    | Number     | 扫描半径          |
| scanColor | Color      | 扫描区域颜色      |
| duration  | Number     | 周期时间,单位毫秒 |

#### 4.【分析功能管理类】 CesiumZondy.Manager.AnalysisManager

##### (1) `addSceneEffect(effect)` 添加场景特效
> `addSceneEffect` 方法主要参数

| 参数名 | 类型   | 说明                                                      |
| ------ | ------ | --------------------------------------------------------- |
| effect | Object | 场景特效实例，如动态圆场景特效Cesium.CircleScanEffect对象 |

##### (2) `removeSceneEffect(effect)` 移除场景特效
> `removeSceneEffect` 方法主要参数

| 参数名 | 类型   | 说明                                                      |
| ------ | ------ | --------------------------------------------------------- |
| effect | Object | 场景特效实例，如动态圆场景特效Cesium.CircleScanEffect对象 |

