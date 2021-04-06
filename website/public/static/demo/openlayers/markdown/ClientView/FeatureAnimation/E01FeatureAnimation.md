## 要素动画

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例在地图中添加了点的要素动画效果。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库，首先创建地图对象，添加天地图底图，通过定时器生成随机点。为地图容器`map`添加`postcompose`事件（地图渲染中）使其形成由半径从小到大的显示效果，以及为为要素源添加`addfeature`事件（当要素添加时）。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-openlayers-local.js 】开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图必要参数；

- Example:
  ```javascript
    //初始化地图容器
    map = new ol.Map({
      target: 'mapCon', //地图容器div的ID
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: true,
        },
      }),
      view: new ol.View({
        center: [0, 0], //地图初始中心点
        maxZoom: 28, //最大瓦片显示级数
        minZoom: 1, //最小瓦片显示级数
        zoom: 2, //地图初始显示级数
        projection: 'EPSG:4326',
      }),
    })
  ```

**Step 4. <font color=red>添加天地图</font>**:
&ensp;&ensp;&ensp;&ensp;创建天地图图层，添加到地图中；

- Example：
  ```javascript
  var tdk = '4c27d6e0e8a90715b23a989d42272fd8' //天地图密钥
  //加载天地图瓦片图层数据
  map.addLayer(
    new ol.layer.Tile({
      title: '天地图影像图层',
      source: new ol.source.XYZ({
        url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=' + tdk,
        wrapX: false,
      }),
      projection: 'EPSG:4326',
    })
  )
  map.addLayer(
    new ol.layer.Tile({
      title: '天地图矢量注记图层',
      source: new ol.source.XYZ({
        url: 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=' + tdk,
        wrapX: false,
      }),
      projection: 'EPSG:4326',
    })
  )
  ```

**Step 5. <font color=red>创建空图层</font>**:
&ensp;&ensp;&ensp;&ensp;创建一个空图层，用于存储后续创建点要素动画效果时的点；

- Example：
  ```javascript
  var source = new ol.source.Vector({
    wrapX: false,
  })
  var vector = new ol.layer.Vector({
    source: source,
  })
  map.addLayer(vector)
  ```

**Step 6. <font color=red>添加随机点</font>**:
&ensp;&ensp;&ensp;&ensp;通过定时器每隔一定时间添加一个随机点；

- Example：

  ```javascript
  var intervalID = window.setInterval(addRandomFeature, 1000)
  var count = 0
  function addRandomFeature() {
    if (count >= 500) {
      window.clearInterval(intervalID)
    } else {
      count++
    }

    var x = Math.random() * 360 - 180
    var y = Math.random() * 160 - 80
    var geom = new ol.geom.Point([x, y])
    var feature = new ol.Feature(geom)
    source.addFeature(feature)
  }
  ```

**Step 7. <font color=red>添加要素动画</font>**:
&ensp;&ensp;&ensp;&ensp;为要素源添加`addfeature`事件（当要素添加时）。

- Example:

  ```javascript
  source.on('addfeature', function(e) {
    flash(e.feature)
  })
  function flash(feature) {
    var start = new Date().getTime()
    var listenerKey = map.on('postcompose', animate)

    function animate(event) {
      var vectorContext = event.vectorContext
      var frameState = event.frameState
      var flashGeom = feature.getGeometry().clone()
      var elapsed = frameState.time - start
      var elapsedRatio = elapsed / duration
      // radius will be 5 at start and 30 at end.
      var radius = ol.easing.easeOut(elapsedRatio) * 25 + 5
      var opacity = ol.easing.easeOut(1 - elapsedRatio)

      var style = new ol.style.Style({
        image: new ol.style.Circle({
          radius: radius,
          stroke: new ol.style.Stroke({
            color: 'rgba(255, 0, 0, ' + opacity + ')',
            width: 0.25 + opacity,
          }),
        }),
      })

      vectorContext.setStyle(style)
      vectorContext.drawGeometry(flashGeom)
      if (elapsed > duration) {
        ol.Observable.unByKey(listenerKey)
        return
      }
      // tell OpenLayers to continue postcompose animation
      map.render()
    }
  }
  ```

### 关键接口

#### 1.`ol.Map`

> 详细信息见 openlayers API：https://openlayers.org/en/v5.3.0/apidoc/module-ol_Map-Map.html

##### 【Methods】`addLayer(layer)`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_Map-Map.html#addLayer

##### 【Methods】`render()`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_Map-Map.html#render

#### 2.`ol.source.Vector`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_source_Vector.html

##### 【Methods】`addFeature(feature)`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_source_Vector-VectorSource.html#addFeature

##### 【Methods】`on(type, listener)`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_source_Vector-VectorSource.html#on
