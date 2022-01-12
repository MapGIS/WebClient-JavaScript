## 动画漫游

### 常见问题
1. 轨迹出来了，模型不移动
  ![speed](../../static/demo/cesium/markdown/analysis/bug/speed.png)
2. 轨迹出来了，模型看不见
   1. 模型太大，还在网络传输中
   ![speed](../../static/demo/cesium/markdown/analysis/bug/delay.png)
   2. 缺失模型，网络报错
   ![speed](../../static/demo/cesium/markdown/analysis/bug/nofind.png)
3. 模型下载地址
   1. [MapGIS默认模型](/#/total/download)
   2. https://sketchfab.com/3d-models?date=week&features=downloadable&sort_by=-likeCount 
   3. https://free3d.com/zh/ 

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能用于在三维场景中实现动画漫游功能，即让模型沿着路径漫游，默认为第一人称漫游，可修改动画漫游方式。本示例实现让飞机模型按既定的路径漫游。在实际应用中，可结合具体应用场景开发，如绘制路径进行动画漫游等功能需求等。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager` 对象，调用高级分析功能管理类的 `createAnimation()` 方法创建动画漫游对象实例实现动画漫游功能。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能；

**Step 2. <font color=red>创建三维地图容器并加载三维球控件</font>**：
&ensp;&ensp;&ensp;&ensp;创建 `id='GlobeView'` 的div作为三维视图的容器，并设置其样式，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，完成此步后可在三维场景中加载三维球控件；

* Example:
  ``` Javascript
    //构造三维视图类（视图容器div的id，三维视图设置参数）
    var webGlobe = new Cesium.WebSceneControl('GlobeView', {
        terrainExaggeration: 1,
    }); 
  ```

* Example:
  ``` html
    <div id='GlobeView'></div>
  ```

**Step 3. <font color=red>加载底图数据</font>**：
&ensp;&ensp;&ensp;&ensp;初始化第三方图层类`CesiumZondy.Layer.ThirdPartyLayer`对象，调用 `appendGoogleMapExt()` 方法加载谷歌地图数据作为底图；

* Example:
  ``` Javascript
    //构造第三方图层对象
    var thirdPartyLayer = new CesiumZondy.Layer.ThirdPartyLayer({
        viewer: webGlobe.viewer
    });
    //加载天地图
    var tdtLayer = thirdPartyLayer.appendTDTuMap({
        //天地图经纬度数据
        url: 'http://t0.tianditu.com/DataServer?T=vec_c&X={x}&Y={y}&L={l}',
        //开发token （请到天地图官网申请自己的开发token，自带token仅做功能验证随时可能失效）
        token: "9c157e9585486c02edf817d2ecbc7752",
        //地图类型 'vec'矢量 'img'影像 'ter'地形
        ptype: "img"
    });
  ```

**Step 4. <font color=red>显示常用控件，并实现跳转定位</font>**：
&ensp;&ensp;&ensp;&ensp;调用`showPosition()`、`createNavigationTool()`方法显示常用控件，调用 `flyToEx()` 方法定位到指定点；

* Example:
   ``` Javascript
    //视点跳转（经度，纬度，视角高度，方位角，俯仰角，翻滚角）
    webGlobe.flyToEx(117.213063, 31.812956, {
        height: 200,
        heading: 90,
        pitch: 0,
        roll: 0
    });
    //显示鼠标位置控件
    webGlobe.showPosition('coordinate_location');
    //显示导航控件（罗盘、比例尺、场景导航）
    webGlobe.createNavigationTool({
        enableCompass: true,
        enableZoomControls: true,
        enableDistanceLegend: true
    });
   ```

**Step 5. <font color=red>创建动画漫游对象</font>**：
&ensp;&ensp;&ensp;&ensp;初始化高级分析功能管理类对象`CesiumZondy.Manager.AdvancedAnalysisManager`，调用`createAnimation()`方法创建动画漫游对象； 

* Example:
  ``` Javascript
    //初始化高级分析功能管理类
    var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
          viewer: webGlobe.viewer
    });
    //创建动画漫游对象
    animation = advancedAnalysisManager.createAnimation({
        exHeight: 9,
        isLoop: false,
        //漫游模型url
        modelUrl: './static/data/model/WuRenJi.glb',
        //完成动画漫游回调函数
        complete: function () {
            alert('完毕');
        }
    });
  ```

**Step 6. <font color=red>实现动画漫游控制</font>**：
&ensp;&ensp;&ensp;&ensp;通过动画漫游对象的属性和方法实现动画漫游控制，即通过属性设置漫游路径、漫游方式、速度、俯仰角、方位角等参数，分别通过调用方法`start()`、`stop()`开始和结束漫游。

* Example:
  ``` Javascript
    //漫游路径
    positions = Cesium.Cartesian3.fromDegreesArray([
      117.213063, 31.812956, 117.213162, 31.812389, 117.212929, 31.812056, 117.213275, 31.811582,
      117.21348, 31.811513, 117.214141, 31.811682, 117.21497, 31.811691, 117.216318, 31.811454,
      117.216962, 31.812037, 117.217893, 31.812298, 117.218607, 31.811488, 117.219466, 31.810935,
      117.224439, 31.810929, 117.225266, 31.811119, 117.225308, 31.81131, 117.224819, 31.811724,
      117.225189, 31.811928, 117.225676, 31.811624, 117.225843, 31.811943, 117.22625, 31.812183,
      117.226292, 31.81281, 117.225888, 31.813287, 117.226093, 31.814059, 117.22564, 31.814582,
      117.225953, 31.814731, 117.225611, 31.814954, 117.22576, 31.815233, 117.224073, 31.816329,
      117.223694, 31.81627, 117.222769, 31.817007, 117.222259, 31.816871, 117.221922, 31.816707,
      117.221653, 31.816788, 117.22151, 31.817002, 117.221039, 31.816891, 117.220395, 31.816352,
      117.220166, 31.815734, 117.219804, 31.815607, 117.219461, 31.815122, 117.21878, 31.814846,
      117.218297, 31.815275, 117.217975, 31.815172, 117.217142, 31.815229, 117.216753, 31.815124,
      117.216652, 31.814308, 117.215726, 31.814049, 117.214769, 31.813517, 117.214111, 31.813717,
      117.213552, 31.814099, 117.213024, 31.813954, 117.212897, 31.813892, 117.213224, 31.813681,
      117.212788, 31.813147, 117.212928, 31.813018, 117.213063, 31.812956
    ]);
    //设置路径
    animation.positions = positions;
    //漫游方式：1-跟随、2-锁定第一视角、3-上帝视角
    animation.animationType = 2;
    //漫游速度
    animation.speed = 1;
  ```

* Example:
  ``` Javascript
    function start() {
        //开始漫游
        animation.start();
    }
    function pause() {
        //暂停漫游
        animation.pause = true;
    }
    function stop() {
        //停止漫游
        animation.stop();
    }
  ```

### 关键接口

#### 1.【三维视图的主要类】 `Cesium.WebSceneControl`

#### 2.【场景视图管理类】 `CesiumZondy.Manager.SceneManager`

##### 【method】 `showPosition()`： 鼠标坐标位置控件

##### 【method】 `createNavigationTool()`： 常用导航控件

##### 【method】 `flyToEx()`： 视点跳转


#### 3.【高级分析功能管理类】`CesiumZondy.Manager.AdvancedAnalysisManager`

##### 【method】 `createAnimation(optionsParam) → {Object}` ：创建动画漫游对象, 返回动画漫游实例Animation(Object)

|参数名|类型|说明|
|-|-|-|
|optionsParam|Object|动画漫游参数|

* `optionsParam` 主要参数

|参数名|类型|说 明|
|-|-|-|
|exHeight|Number|（可选）附加高程|
|isLoop|Boolean|（可选）是否循环|
|modelUrl|Object|模型url|
|callback|function|（可选）完成动漫漫游后的回调函数|

##### 【返回值】 `Animation`的属性与方法

|属性名|类型|说 明|
|-|-|-|
|positions|Array|漫游路径，Cesium.Cartesian3.fromDegreesArray的经纬度值数组|
|animationType|Number|漫游方式：1-跟随、2-锁定第一视角、3-上帝视角|
|speed|Number|漫游速度|


|方法名|说 明|
|-|-|
|start|开始漫游|
|stop|结束漫游|
