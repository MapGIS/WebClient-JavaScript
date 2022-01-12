## 动态圆

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能用于在当前场景中绘制动态的圆显示效果，可应用于任意场景中。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，初始化 `Cesium.CircleScanEffect()` 动态圆对象，然后通过分析功能管理类`CesiumZondy.Manager.AnalysisManager` 的`addSceneEffect()`方法添加动态圆显示；`removeSceneEffect()`方法移除动态圆显示。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能；

**Step 2. <font color=red>创建三维地图容器加载三维球控件,并加载底图</font>**：
&ensp;&ensp;&ensp;&ensp;创建 `id='GlobeView'` 的div作为三维视图的容器，并设置其样式，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，并调用`appendGoogleMapExt()` 方法加载Google地图作为底图显示；

**Step 3. <font color=red>跳转定位</font>**：
&ensp;&ensp;&ensp;&ensp;调用Cesium三维球场景视图管理类 `CesiumZondy.Manager.SceneManager` 的 `flyTo()` 方法定位到指定点；

* Example:
  ``` Javascript
    //初始化视图功能管理类
    var sceneManager = new CesiumZondy.Manager.SceneManager({
      viewer: webGlobe.viewer
    });
    //定位跳转
    sceneManager.flyTo(114.06, 22.54, 20000, 2);
  ```

**Step 4. <font color=red>创建动态圆</font>**：
&ensp;&ensp;&ensp;&ensp;初始化动态圆对象 `Cesium.CircleScanEffect()`，注意使用动态圆功能`必须开启深度检测` ； 

* Example:
  ``` Javascript
    //开启地形深度检测（必须）
    webGlobe.viewer.scene.globe.depthTestAgainstTerrain = true;
    //初始化动态圆对象
    var scanEffect = new Cesium.CircleScanEffect(webGlobe.viewer, {
      center: Cesium.Cartesian3.fromDegrees(114.06, 22.54, 20),
      maxRadius: 5000,
      scanColor: new Cesium.Color(1, 0, 0, 1),
      duration: 8000
    });
  ```

**Step 5. <font color=red>添加/移除动态圆</font>**：
&ensp;&ensp;&ensp;&ensp;调用Cesium三维球分析功能管理类`CesiumZondy.Manager.AnalysisManager` 的`addSceneEffect()`方法添加动态圆显示，相应可调用`removeSceneEffect()`方法移除。

* Example:
  ``` Javascript
    //初始化分析功能管理类
    var analysisManager = new CesiumZondy.Manager.AnalysisManager({
        viewer: webGlobe.viewer
    });
    //添加添加场景特效-动态圆
    analysisManager.addSceneEffect(scanEffect);
    //通过removeSceneEffect()移除场景特效
    //analysisManager.removeSceneEffect(scanEffect);
  ```

### 关键接口

#### 1.【三维场景控件】 `CesiumZondy.WebSceneControl` 

#### 2.【实体绘制控制器类】 `CesiumZondy.Manager.CommonDataManager`

##### 【method】 `appendPoint()` ：添加点

#### 3.【动态圆对象类】 `Cesium.CircleScanEffect`，Cesium原生类

#### 4.【分析功能管理类】 `CesiumZondy.Manager.AnalysisManager`

##### 【method】 `addSceneEffect(effect)` ：添加场景特效

|参数名|类型|说明|
|-|-|-|
|effect|Object|场景特效实例，如动态圆场景特效Cesium.CircleScanEffect对象|

##### 【method】 `removeSceneEffect(effect)` ：移除场景特效

|参数名|类型|说明|
|-|-|-|
|effect|Object|场景特效实例，如动态圆场景特效Cesium.CircleScanEffect对象|
