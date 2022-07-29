## 统计专题图

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能用于在三维场景中添加专题图，包括垂直柱状图、水平柱状图、饼状图，可以根据需要选择。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，初始化专题图类 `Cesium.ThemeManager` 对象，调用专题图类的`query()`方法查询结果，并通过 `addByQueryResult()` 方法将查询结果用于添加专题图，或者使用`addByGeoJson()`方法将geojson数据用于添加专题图。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能；

**Step 2. <font color=red>创建三维地图容器并加载三维球控件</font>**：
&ensp;&ensp;&ensp;&ensp;创建 `id='GlobeView'` 的div作为三维视图的容器，并设置其样式，初始化Cesium三维球控件 `Cesium.Viewer()` ，完成此步后可在三维场景中加载三维球控件；

* Example:
  ``` Javascript
    //构造三维视图类（视图容器div的id，三维视图设置参数）
    var viewer = new Cesium.Viewer('GlobeView', {
        infoBox: false,
        selectionIndicator: false,
        shouldAnimate: true
    }); 
  ```

* Example:
  ``` html
    <div id='GlobeView'></div>
  ```

**Step 3. <font color=red>加载底图数据</font>**：
&ensp;&ensp;&ensp;&ensp;初始化天地图`Cesium.TiandituImageryProvider`对象，调用viewer.imageryLayers的 `addImageryProvider()` 方法加载天地图作为底图；

* Example:
  ``` Javascript
    //构造第三方图层对象
    var thirdPartyLayer = new CesiumZondy.Layer.ThirdPartyLayer({
        viewer: webGlobe.viewer
    });
    //加载天地图
    var tdt = new Cesium.TiandituImageryProvider({
        url: 'http://t1.tianditu.com/DataServer',
        tileType: 'vec',
        token: '2ddaabf906d4b5418aed0078e1657029'
    });

    viewer.imageryLayers.addImageryProvider(tdt);
  ```

**Step 4. <font color=red>显示常用控件，并实现跳转定位</font>**：
&ensp;&ensp;&ensp;&ensp;调用`showPosition()`、`createNavigationTool()`方法显示常用控件；

* Example:
   ``` Javascript
    //显示鼠标位置控件
    viewer.showPosition('coordinate_location');
    //显示导航控件（罗盘、比例尺、场景导航）
    viewer.createNavigationTool({
        enableCompass: true,
        enableZoomControls: true,
        enableDistanceLegend: true
    });
   ```

**Step 5. <font color=red>创建专题图对象</font>**：
&ensp;&ensp;&ensp;&ensp;初始化专题图类对象`Cesium.ThemeManager`，调用`createAnimation()`方法创建动画漫游对象； 

* Example:
  ``` Javascript
    //初始化专题图类
    var themeLayer = new Cesium.ThemeManager(viewer, {
        successCallback: successCallback,
        errorCallback: errorCallback,
        // 在定义专题图对象时，设置好属性与对应颜色
        attributeName: ['GDP_2007', 'GDP_2008'],
        attributeColor: [new Cesium.Color(234 / 255, 175 / 255, 200 / 255), new Cesium.Color(/ 255, 239 / 255, 125 / 255)],
        width: 50000
    });
    var queryResult;
    function successCallback(result) {
        console.log('查询成功');
        queryResult = result;
    }
    function errorCallback(result) {
        console.log(result);
    }
  ```

**Step 6. <font color=red>添加专题图</font>**：
&ensp;&ensp;&ensp;&ensp;通过专题图类的属性和方法实现添加对应的专题图，即通过属性设置用于生成专题图的属性及其对应颜色、添加专题类型等参数，分别通过调用专题图类的`query()`方法查询结果，并通过 `addByQueryResult()` 方法将查询结果用于添加专题图，或者使用`addByGeoJson()`方法将geojson数据用于添加专题图。

* Example:
  ``` Javascript
    //通过查询结果添加水平柱状专题图
    function addByQuery() {
        this.removeLayer();
        //加载矢量地图
        var url = 'http://192.168.21.191:6163/igs/rest/mrfs/layer';
        var layers = 'gdbp://MapGISLocal/专题图数据/sfcls/省级行政区x';
        viewer.scene.layers.appendVectorLayer(url, {
            loadAll: true,
            layers: layers,
            getDocLayerIndexes: function (indexs) {
                var layerIndex = indexs[0];
                var layer = viewer.scene.layers.getLayer(layerIndex);
            }
        });

        var queryUrl ="http://192.168.21.191:6163/igs/rest/mrfs/layer/query?page=0&pageCount=9999f=json&structs={'IncludeAttribute':true,'IncludeGeometry':true,'IncludeWebGraphic':false}&rule{'CompareRectOnly':false,'EnableDisplayCondition':false,'Intersect':true,'MustInside':false}rtnLabel=true&fields=面积,周长,省名,GDP_2007,GDP_2008&coordPrecision=2&guid=__readonly_user__cursorType=forward&gdbp=gdbp://MapGISLocal/专题图数据/sfcls/省级行政区x";
        themeLayer.query(queryUrl);

        // 设置用于展示的属性名
        themeLayer.attributeName = ['GDP_2007', 'GDP_2008'];
        themeLayer.attributeColor = [new Cesium.Color(234 / 255, 175 / 255, 200 / 255), new Cesium.Colo(56 / 255, 239 / 255, 125 / 255)];
        themeLayer.width = 50000;
        //水平柱状图
        themeLayer.addByQueryResult('HorizontalColumn');
    }
  ```

* Example:
  ``` Javascript
    //通过geojson添加垂直柱状图
    function addByGeojson() {
        this.removeLayer();
        var geojsonUrl = './static/data/geojson/省级行政区.geojson';
        var geojsonResource = Cesium.Resource.createIfNeeded(geojsonUrl);
        var geojson;
        var promise = geojsonResource.fetchJson();
        promise.then(function (json) {
            geojson = json;
        });
        
        themeLayer.addGeoGeometry = false;
        themeLayer.attributeName = ['GDP_2007', 'GDP_2008'];
        themeLayer.attributeColor = [new Cesium.Color(234 / 255, 175 / 255, 200 / 255), new Cesium.Colo(56 / 255, 239 / 255, 125 / 255)];
        //垂直柱状图
        themeLayer.addByGeoJson(geojson, 'VerticalColumn');
    }
  ```

* Example:
  ``` Javascript
    //移除专题图
    function removeLayer() {
        themeLayer.remove();
    }
  ```


### 关键接口

#### 1.【三维视图的主要类】 `Cesium.Viewer`

##### 【method】 `showPosition()`： 鼠标坐标位置控件

##### 【method】 `createNavigationTool()`： 常用导航控件

#### 2.【专题图类】`Cesium.ThemeManager`

##### 【method】 `query(queryUrl) → {Object}` ：查询。

##### 【method】 `addByQueryResult(optionsParam) ` ：通过查询结果添加专题图。

##### 【method】 `addByGeoJson(optionsParam)` ：通过geojson数据添加专题图。

##### 【method】 `remove()` ：移除添加的专题图。

|参数名|类型|说明|
|-|-|-|
|optionsParam|Object|动画漫游参数|

* `optionsParam` 主要参数

|参数名|类型|说 明|
|-|-|-|
|queryUrl|String|（可选）通过查询结果添加时使用的查询地址。|
|successCallback|function|（可选）查询成功的回调函数|
|errorCallback|function|（可选）查询失败的回调函数|
|attributeName|Array|生成专题图的属性|
|attributeColor|Array|专题图属性的颜色|