## 动态航线

### 示例功能

此功能用于动态显示两点之间的动态飞行轨迹效果。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，初始化 `CesiumZondy.Manager.AdvancedAnalysisManager()`高级分析功能管理对象，然后调用 `createDynamicPolyline()` 方法创建动态航线。

### 实现步骤：

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建三维视图Div容器，构造三维场景控件WebSceneControl，构造并设置鼠标位置信息显示控件，加载Google地图作为底图显示；

5. 创建动态航线：构造`CesiumZondy.Manager.AdvancedAnalysisManager()`对象，调用`createDynamicPolyline()`方法并设置动态航线必要参数即可创建并显示动态航线。

    ``` Javascript
    //开启动画
    webGlobe.viewer.clock.shouldAnimate = true;
    //构造高级分析功能管理对象
    var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
        viewer: webGlobe.viewer
    });
    //创建动态航线
    var dynamicLine = advancedAnalysisManager.createDynamicPolyline(
        //航线起始城市经纬度
        {
            lon: 114.302312702,
            lat: 30.598026044
        },
        //航线终点城市数组，经纬度
        [
            { "lon": 115.028495718, "lat": 30.200814617 },
            { "lon": 110.795000473, "lat": 32.638540762 },
            { "lon": 111.267729446, "lat": 30.698151246 },
            { "lon": 112.126643144, "lat": 32.058588576 },
            { "lon": 114.885884938, "lat": 30.395401912 },
            { "lon": 112.190419415, "lat": 31.043949588 },
            { "lon": 113.903569642, "lat": 30.932054050 },
            { "lon": 112.226648859, "lat": 30.367904255 },
            { "lon": 114.861716770, "lat": 30.468634833 },
            { "lon": 114.317846048, "lat": 29.848946148 },
            { "lon": 113.371985426, "lat": 31.704988330 },
            { "lon": 109.468884533, "lat": 30.289012191 },
            { "lon": 113.414585069, "lat": 30.368350431 },
            { "lon": 112.892742589, "lat": 30.409306203 },
            { "lon": 113.160853710, "lat": 30.667483468 },
            { "lon": 110.670643354, "lat": 31.748540780 }
        ],
        {
            //是否已经添加动态航线
            isAdd: false,
            //航线颜色：默认红色
            color: new Cesium.Color(255 / 255, 0 / 255, 0 / 255, 1)
        }
    );
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【高级分析功能管理类】CesiumZondy.Manager.AdvancedAnalysisManager

##### (1) `createDynamicPolyline(posStart, posEnds, options) → {Object}` 添加动态航线

> `createDynamicPolyline` 主要参数

|参数名|类型|说 明|
|-|-|-|
|posStart	|Object		|轨迹线起点|
|posEnds	|Array		|轨迹线终点|
|options	|Object		|动态航班参数|

> `options` 主要参数

|参数名|类型|说明|
|-|-|-|
|isAdd|Boolean|（可选）是否已添加航班线|
