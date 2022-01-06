## 动态航线

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能用于动态显示两点之间的动态飞行轨迹效果。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-cesium-local.js】开发库实现，初始化 `CesiumZondy.Manager.AdvancedAnalysisManager()`高级分析功能管理对象，然后调用 `createDynamicPolyline()` 方法创建动态航线。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id='GlobeView'`的 div 作为三维视图的容器，并设置其样式；

**Step 3. <font color=red>构造三维场景控件</font>**：
&ensp;&ensp;&ensp;&ensp;实例化`Cesium.WebSceneControl`对象，完成此步骤后可在三维场景中加载三维球控件。

- Example:

  ```Javascript
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

#### 2.【高级分析功能管理类】`CesiumZondy.Manager.AdvancedAnalysisManager`

##### 【method】 `createDynamicPolyline(posStart, posEnds, options) → {Object}` 添加动态航线

| 参数名   | 类型   | 说 明        |
| -------- | ------ | ------------ |
| posStart | Object | 轨迹线起点   |
| posEnds  | Array  | 轨迹线终点   |
| options  | Object | 动态航班参数 |

- `options` 主要参数

| 参数名 | 类型    | 说明                     |
| ------ | ------- | ------------------------ |
| isAdd  | Boolean | （可选）是否已添加航班线 |
