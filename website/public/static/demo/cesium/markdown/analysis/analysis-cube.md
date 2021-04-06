## 填挖方计算

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能提供用于计算将一定范围内的地形填平到某一高度时，需要挖开或填充的空间体积，可以应用于智慧城市，地质，公安等多个领域的业务功能，实用性强。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，初始化地形图层管理类 `CesiumZondy.Layer.TerrainLayer()` 的 `append()` 方法加载地形数据后，初始化 `Cesium.DrawElement()` 对象在三维场景中添加交互式绘制区控件用来界定量算区域，初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createCutFill()` 方法创建填挖方分析对象, 调用高级分析功能管理类的 `startCutFill()` 方法执行填挖方分析。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能；

**Step 2. <font color=red>创建三维地图容器并加载三维球控件</font>**：
&ensp;&ensp;&ensp;&ensp;创建 `id='GlobeView'` 的div作为三维视图的容器，并设置其样式，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，初始化地形图层管理类 `CesiumZondy.Layer.TerrainLayer()` 的 `append()` 方法加载地形数据，完成此步后可在三维场景中加载三维球控件并加载数据；

* Example:
    ``` Javascript
        //构造三维视图类（视图容器div的id，三维视图设置参数）
        var webGlobe = new Cesium.WebSceneControl('GlobeView', {
            terrainExaggeration: 1,
        });
        //添加Google地图
        webGlobe.appendGoogleMapExt({
            ptype: 's@130'
        });
        //构造地形图层管理类
        var terrain = new CesiumZondy.Layer.TerrainLayer({
            viewer: webGlobe.viewer
        });
        //加载三维地形地图文档（服务地址，配置参数）
        terrainlayer = terrain.append("http://develop.smaryun.com:6163/igs/rest/g3d/terrain", {});
    ```

* Example:
    ``` html
        <div id='GlobeView'></div>
    ```

**Step 3. <font color=red>创建交互式绘制工具</font>**：
&ensp;&ensp;&ensp;&ensp;初始化 `Cesium.DrawElement()` 对象，完成交互式绘制工具的创建；

* Example:
  ``` Javascript
    //创建交互式绘制工具
    var drawElement = new Cesium.DrawElement(webGlobe.viewer);
  ```

**Step 4. <font color=red>激活交互式绘制区工具</font>**：
&ensp;&ensp;&ensp;&ensp;调用 `Cesium.DrawElement()` 对象的startDrawingPolygon()方法，激活交互式绘制区工具，完成此步后，可在三维场景中通过鼠标左键点击绘制多边形；

* Example:
  ``` Javascript
    //激活交互式绘制区工具
    drawElement.startDrawingPolygon();
  ```

**Step 5. <font color=red>创建填挖方分析</font>**：
&ensp;&ensp;&ensp;&ensp;初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager（）` 对象，调用高级分析功能管理类的 `createCutFill()` 方法创建填挖方分析对象；

* Example:
    ``` Javascript
        //初始化高级分析功能管理类
        var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
            viewer: viewer
        });
        //创建填挖方实例
        cutFill = advancedAnalysisManager.createCutFill(0.0, {
            //设置x方向采样点个数
            xPaneNum: document.getElementById("x").value <= 0 ? 16 : document.getElementById("x").value,
            //设置y方向采样点个数参数
            yPaneNum: document.getElementById("y").value <= 0 ? 16 : document.getElementById("y").value,
            //设置填挖规整高度
            Height: document.getElementById("z").value <= 0 ? 16 : document.getElementById("z").value,
            //返回结果的回调函数
            callback: function(result) {
                document.getElementById("height").value = result.minHeight.toFixed(2) + '~' + result.maxHeight.toFixed(2);
                document.getElementById("surfaceArea").value = result.surfaceArea;
                document.getElementById("cutVolume").value = result.cutVolume;
                document.getElementById("fillVolume").value = result.fillVolume;
            }
        });
    ```

**Step 6. <font color=red>执行填挖方分析</font>**：
&ensp;&ensp;&ensp;&ensp;调用高级分析功能管理类的 `startCutFill()` 方法执行填挖方分析。

* Example:
  ``` Javascript
    //开始执行填挖方分析
    advancedAnalysisManager.startCutFill(cutFill, positions);
  ```

### 关键接口

#### 1.【三维视图的主要类】 `Cesium.WebSceneControl`

#### 2.【地形图层管理类】`CesiumZondy.Layer.TerrainLayer`

##### 【method】 `append(url, options)` ：添加地形地图文档

|参数名|类型|说明|
|-|-|-|
|url|String|事件类型 LEFT_CLICK RIGHT_CLICK MOUSE_MOVE LEFT_DOUBLE_CLICK RIGHT_DOUBLE_CLICK WHEEL(鼠标滚轮)|
|options|Object|可选参数|

* `options` 主要参数

|参数名|类型|默认值|说明|
|-|-|-|-|
|synchronous|Boolean|true|(可选)是否异步请求|
|loaded|function|function|(可选)回调函数|
|代理|DefaultProxy|暂无|暂无|

#### 2.【交互式绘制类】`Cesium. DrawElement`

#### 3.【高级分析功能管理类】`CesiumZondy.Manager.AdvancedAnalysisManager`

##### 【method】 `createCutFill(dataType, options)` ：创建填挖方实例

|参数名|类型|说明|
|-|-|-|
|dataType|Number|针对地形进行填挖方分析|
|options|Object|可选参数|

* `options` 主要参数

|参数名|类型|说明|
|-|-|-|-|
|xPaneNum|Number|x方向采样点个数|
|yPaneNum|Number|y方向采样点个数|
|Height|Number|设定的填挖规整高度|
|callback|function|返回结果的回调函数|

##### 【method】 `startCutFill(cutFill, positions)` ：开始执行填挖方分析

|参数名|类型|说明|
|-|-|-|
|cutFill|object|填挖方实例|
|positions|Array|填挖区域多边形的顶点数组|
