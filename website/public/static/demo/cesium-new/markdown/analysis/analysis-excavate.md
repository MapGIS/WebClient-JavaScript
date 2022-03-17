## 开挖深度

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能对已加载的M3D数据进行任意距离深度开挖，动态的显示或隐藏一部分数据。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ， 初始化M3D模型层管理类 `CesiumZondy.Layer.M3DLayer` 并调用 `append()` 方法加载M3D数据后，创建 `Cesium.ClippingPlane()` 切面对象，创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `createDynamicCutting()` 方法创建开挖分析对象通过设置剖切面距离进行数据开挖分析。

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
    var drilllayer = m3dLayer.append(
        "http://develop.smaryun.com:6163/igs/rest/g3d/钻孔_2_钻孔模型s", {
            autoReset: false,
        }
    );
    //加载M3D地图文档（服务地址，配置参数）
    landscapeLayer = m3dLayer.append('http://develop.smaryun.com:6163/igs/rest/g3d/钻孔分层点_Sur_000_Ent', {});
  ```

**Step 4. <font color=red>创建切面</font>**：
&ensp;&ensp;&ensp;&ensp;初始化切面对象 `Cesium.ClippingPlane()` ; 

* Example:
  ``` Javascript
    //开挖面设置,这五个面分别表示前后左右，底面，其中底面用于控制开挖深度
    var clippingPlanes = [
      new Cesium.ClippingPlane(new Cesium.Cartesian3(3, 0.0, 0.0), -1500.0),
      new Cesium.ClippingPlane(new Cesium.Cartesian3(-3, 0.0, 0.0), -1500.0),
      new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 3, 0.0), -1500.0),
      new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, -3, 0.0), -1500.0),
      new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 0.0, -5), 0.0)
    ]
  ```

**Step 5. <font color=red>创建开挖分析</font>**：
&ensp;&ensp;&ensp;&ensp;化M3D模型层管理类 `CesiumZondy.Layer.M3DLayer` 并调用 `append()` 方法加载M3D数据后，创建 `Cesium.ClippingPlane()` 切面对象，创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `createDynamicCutting()` 方法创建开挖分析对象, 并获取剖切切面；

* Example:
  ``` Javascript
    //初始化分析功能管理类
    var analysisManager = new CesiumZondy.Manager.AnalysisManager({
      viewer: webGlobe.viewer
    });
    //创建开挖分析实例
    dynaCut = analysisManager.createExcavateAnalysis({
      //图层信息
      tileSet: landscapeLayer[0],
      //开挖面的形状
      planes: planes,
      //裁剪面材质
      material: new Cesium.Color(0.2, 0.4, 0.3, 0.7),
      //边界线颜色
      edgeColor: new Cesium.Color(0.2, 0.4, 0.3, 0.7),
      //边界线宽度
      edgeWidth: 3,
      //裁减法线方向，默认值为 false
      unionClippingRegions: false,
      //开挖坐标
      longitude: 113.0402,
      latitude: 30.0264,
      height: 0
    });
  ```

**Step 6. <font color=red>设置剖切面距离</font>**：
&ensp;&ensp;&ensp;&ensp;通过设置切面回调函数，动态设置剖切面距离完成动态剖切分析。

* Example:
  ``` Javascript
    dynaCut.planes[0].plane.plane = new Cesium.CallbackProperty(function(date) {
      console.log(planes);
      for (var i = 0; i < planes.length; i++) {
        if (i === planes.length - 1) {
          var plane = planes[i];
          plane.distance = distance;
          Cesium.Plane.transform(plane, landscapeLayer[0].modelMatrix, new Cesium.ClippingPlane(Cesium.Cartesian3.UNIT_X, 0.0));
        }
      }
    }, false);
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

#### 3.【裁剪平面类】 `Cesium.ClippingPlane(normal, distance)` 

|参数名|类型|说 明|
|-|-|-|
|normal|Cartesian3|法线|
|distance|Number|最短距离|

#### 4.【分析功能管理类】 `CesiumZondy.Manager.AnalysisManager`

##### 【method】 `createExcavateAnalysis(option)`：创建开挖实例

|参数名|类型|说明|
|-|-|-|
|option|Object|参数设置|

* `options` 主要参数

|参数名|类型|说明|
|---|---|---|
|tileSet|Object|图层信息|
|planes|Object|开挖面的形状|
|material|Object|裁剪面材质|
|edgeColor|Object|边界线颜色|
|edgeWidth|Object|边界线宽度|
|unionClippingRegions|Object|裁减法线方向，默认值为 false|
|longitude|Object|开挖面定位点经度|
|latitude|Object|开挖面定位点纬度|
|height|Object|开挖面定位点高度|