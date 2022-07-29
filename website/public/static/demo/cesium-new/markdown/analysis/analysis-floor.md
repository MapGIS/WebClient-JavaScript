## 洪水淹没分析

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能用于在三维场景中添加洪水淹没的效果。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ， 初始化M3D模型层管理类 `CesiumZondy.Layer.M3DLayer` 并调用 `append()` 方法加载M3D数据后，添加交互式绘制工具 `Cesium.DrawPolygonTool()` 选择绘制区域, 初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createFlood()` 方法创建洪水淹没分析示例，将结果显示到三维球控件上。

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

**Step 3. <font color=red>加载数据</font>**：
&ensp;&ensp;&ensp;&ensp;初始化M3D模型层管理类 `CesiumZondy.Layer.M3DLayer` 并调用 `append()` 方法传入M3D数据服务地址，即可加载浏览数据；

* Example:
  ``` Javascript
    //构造M3D模型层管理对象
    var m3dLayer = new CesiumZondy.Layer.M3DLayer({
      viewer: webGlobe.viewer
    });
    //加载M3D地图文档（服务地址，配置参数）
    geobodyLayer = m3dLayer.append('http://develop.smaryun.com:6163/igs/rest/g3d/ZondyModels', {});
  ```

**Step 4. <font color=red>创建交互式绘制区工具</font>**：
&ensp;&ensp;&ensp;&ensp;初始化 `Cesium.DrawPolygonTool()` 对象，完成交互式绘制区工具的创建；

* Example:
  ``` Javascript
    //创建交互式绘制区工具
    var drawPolygon = new Cesium.DrawPolygonTool(webGlobe.viewer, getDrawResult);
  ```

**Step 5. <font color=red>激活交互式绘制区工具</font>**：
&ensp;&ensp;&ensp;&ensp;调用 `Cesium.DrawPolygonTool()` 对象的activeTool()方法，激活交互式绘制区工具，完成此步后，可在三维场景中通过鼠标左键点击绘制多边形。

* Example:
  ``` Javascript
    //激活交互式绘制区工具
    drawPolygon.activeTool();
  ```

**Step 6. <font color=red>统一高度</font>**：
&ensp;&ensp;&ensp;&ensp;将交互式选取的点的高度统一；

* Example:
  ``` Javascript
    var array = new Array();
    for (let i = 0; i < e.points.length; i++) {
        let point = e.points[i];
        let resPoint = new Cesium.Cartesian3;
        let invserTran = new Cesium.Matrix4;
        Cesium.Matrix4.inverse(tileset[0].root.transform, invserTran);
        Cesium.Matrix4.multiplyByPoint(invserTran, point, resPoint);
        array.push(new Cesium.Cartesian3(resPoint.x, resPoint.y, resPoint.z));
    }
    var hight = null;
    for (var arraylength = 0; arraylength < array.length; arraylength++) {
        hight = hight < array[arraylength].z ? array[arraylength].z : hight;
    }
    var newArray = new Array();
    for (var arraylength = 0; arraylength < array.length; arraylength++) {
        array[arraylength].z = hight;
        let point = array[arraylength];
        let resPoint = new Cesium.Cartesian3;
        let invserTran = new Cesium.Matrix4;
        Cesium.Matrix4.multiplyByPoint(tileset[0].root.transform, point, resPoint);
        newArray.push(new Cesium.Cartesian3(resPoint.x, resPoint.y, resPoint.z));
    }
  ```

**Step 7. <font color=red>创建洪水淹没分析</font>**：
&ensp;&ensp;&ensp;&ensp;初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createFlood()` 方法创建洪水淹没分析示例；

* Example:
  ``` Javascript
    //初始化高级分析功能管理类
    var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
        viewer: viewer
    });
    //初始化洪水淹没分析类
    flood = advancedAnalysisManager.createFlood();
    //设置洪水淹没分析区域点集
    flood.dotsList = newArray;
    //设置洪水淹没区域最底高度
    flood.minHeight = Number(document.getElementById('minHeight').value <= 0 ? 0 : document.getElementById('minHeight').value);
    //设置洪水淹没区域最高高度
    flood.maxHeight = Number(document.getElementById('maxHeight').value <= 0 ? 30 : document.getElementById('maxHeight').value);
    //设置洪水上涨速度
    flood.floodSpeed = Number(document.getElementById('floodSpeed').value <= 0 ? 1 : document.getElementById('floodSpeed').value);
    //水纹频率 指波浪的个数
    flood.frequency = Number(document.getElementById('frequency').value <= 0 ? 1000 : document.getElementById('frequency').value);
    //水纹速度
    flood.animationSpeed = Number(document.getElementById('animationSpeed').value <= 0 ? 0.01 : document.getElementById('animationSpeed').value);
    //水波的高度
    flood.amplitude = Number(document.getElementById('amplitude').value <= 0 ? 10 : document.getElementById('amplitude').value);
    //指定水面颜色 和 透明度
    flood.floodColor = new Cesium.Color(0.2, 0.5, 0.4, 0.7);
    // 指定光线强度
    flood.specularIntensity = 3.0;
  ```

**Step 8. <font color=red>洪水淹没结果显示</font>**：
&ensp;&ensp;&ensp;&ensp;将结果显示到三维球控件上。

* Example:
  ``` Javascript
    //添加洪水淹没结果显示
    webGlobe.scene.VisualAnalysisManager.add(flood);
  ```

### 关键接口

#### 1.【三维视图的主要类】 `Cesium.WebSceneControl`

#### 2.【M3D模型层管理类】 `CesiumZondy.Layer.M3DLayer`

##### 【method】 `append(url, options)` ：添加M3D地图文档

|参数名|类型|说明|
|-|-|-|
|url|String|事件类型 LEFT_CLICK RIGHT_CLICK MOUSE_MOVE LEFT_DOUBLE_CLICK RIGHT_DOUBLE_CLICK WHEEL(鼠标滚轮)|
|options|Object|可选参数|

* `options` 主要参数

|参数名|类型|默认值|说明|
|-|-|-|-|
|autoReset|Boolean|true|(可选)是否自动定位|
|synchronous|Boolean|true|(可选)是否异步请求|
|loaded|function|function|(可选)回调函数|
|proxy|DefaultProxy|defaultProxy|代理|
|showBoundingVolume|Boolean|false|是否显示包围盒|
|maximumScreenSpaceError|Number|16|用于控制模型显示细节|

#### 3. 【交互式绘制区工具类】 `Cesium.DrawPolygonTool`

|参数名|类型|说 明|
|-|-|-|
|viewer|View|视图|
|getDrawResult|function|回调函数|

##### 【method】 `activeTool()` ：激活交互式绘制区工具方法

#### 4.【高级分析功能管理类】`CesiumZondy.Manager.AdvancedAnalysisManager`

##### 【method】 `createFlood(options)`： 创建填挖方实例

* `options` 主要参数

|参数名|类型|说 明|
|-|-|-|
|minHeight|Number|最低洪水水位高度|
|maxHeight|Number|最高洪水水位高度|
|floodSpeed|Number|洪水上涨速度|
