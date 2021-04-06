## 要素移动

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例向地图添加要素移动的功能。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库，首先创建地图对象，添加天地图底图。创造一组离散化的点，并添加到 4 个矢量要素类里，分别记载线条、开始点和结束点、以及点的移动情况。初始化`ol.layer.Vector`类，创建一个用于存放绘制的几何实体的图层，将矢量要素添加到矢量图层 Vector 对象中.调用`Map`对象类的`addLayer`方法执行添加绘制层功能。为地图容器`map`添加`postcompose`事件（地图渲染时触发）。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-openlayers-local.js 】开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图必要参数。

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
        center: [110, 36.6642], //地图初始中心点
        maxZoom: 28, //最大瓦片显示级数
        minZoom: 1, //最小瓦片显示级数
        zoom: 6, //地图初始显示级数
        projection: 'EPSG:4326',
      }),
    })
  ```

**Step 4. <font color=red>添加天地图</font>**:
&ensp;&ensp;&ensp;&ensp;创建天地图图层，添加到地图中。

- Example：
  ```javascript
    var tdk = '4c27d6e0e8a90715b23a989d42272fd8' //天地图密钥
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

**Step 5. <font color=red>创建点</font>**:
&ensp;&ensp;&ensp;&ensp;创造一组离散化的点，并添加到 4 个矢量要素类里，分别记载线条、开始点和结束点、以及点的移动情况

- Example:

  ```javascript
    var alongLine = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [101.75357574, 36.63619784],
              [103.81134819, 36.07572866],
              [108.9421713, 34.26693809],
              [113.60869711, 34.77730291],
              [116.96219053, 36.68659347],
            ],
          },
        },
      ],
    }

    function InterpolateLine(linGeoJson, num) {
      var posArr = []
      if (linGeoJson != null && linGeoJson.features.length > 0) {
        var coordinates = linGeoJson.features[0].geometry.coordinates
        var lineDistance = 0
        for (var i = 0; i < coordinates.length - 1; i++) {
          lineDistance += turf.distance(coordinates[i], coordinates[i + 1], {
            units: 'kilometers',
          })
        }
        var step = lineDistance / num //用于下面的循环
        for (var i = 0; i < lineDistance; i += step) {
          //计算对应第i个插值点的位置
          var segment = turf.along(linGeoJson.features[0], i, {
            units: 'kilometers',
          })
          //将插值点加入到原始数据中
          posArr.push(segment.geometry.coordinates)
        }
        posArr.push(coordinates[coordinates.length - 1]) //补上终点
        return posArr
      } else {
        return posArr
      }
    }
    var posArr = InterpolateLine(alongLine, 100)
    //将离散点构建成一条折线
    var route = new ol.geom.LineString(posArr)
    //获取直线的坐标
    var routeCoords = route.getCoordinates()
    var routeLength = routeCoords.length

    var routeFeature = new ol.Feature({
      type: 'route',
      geometry: route,
    })
    var geoMarker = new ol.Feature({
      type: 'geoMarker',
      geometry: new ol.geom.Point(routeCoords[0]),
    })
    var startMarker = new ol.Feature({
      type: 'icon',
      geometry: new ol.geom.Point(routeCoords[0]),
    })
    var endMarker = new ol.Feature({
      type: 'icon',
      geometry: new ol.geom.Point(routeCoords[routeLength - 1]),
    })
  ```

**Step 6. <font color=red>创建图层</font>**:
&ensp;&ensp;&ensp;&ensp;初始化 ol.layer.Vector 类，创建一个用于存放绘制的几何实体的图层，将矢量要素添加到矢量图层 Vector 对象中；

- Example:

  ```javascript
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [routeFeature, geoMarker, startMarker, endMarker],
      }),
      style: function(feature) {
        //如果动画是激活的就隐藏geoMarker
        if (animating && feature.get('type') === 'geoMarker') {
          return null
        }
        return styles[feature.get('type')]
      },
    })
    map.addLayer(vectorLayer)
  ```

**Step 7. <font color=red>添加要素移动动画</font>**:
&ensp;&ensp;&ensp;&ensp;为地图容器`map`添加`postcompose`事件（地图渲染时触发）.

- Example:

  ```javascript
    function startAnimation() {
      if (animating) {
        stopAnimation()
      } else {
        animating = true
        now = new Date().getTime()
        speed = speedInput.value
        //隐藏geoMarker
        geoMarker.setStyle(null)
        map.on('postcompose', moveFeature)
        map.render()
      }
    }
    var moveFeature = function(event) {
      var vectorContext = event.vectorContext
      var frameState = event.frameState

      if (animating) {
        var elapsedTime = frameState.time - now
        //通过增加速度，来获得lineString坐标
        var index = Math.round((speed * elapsedTime) / 1000)

        if (index >= routeLength) {
          animating = false
          stopAnimation()
          return
        }

        var currentPoint = new ol.geom.Point(routeCoords[index])
        var feature = new ol.Feature(currentPoint)
        vectorContext.drawFeature(feature, styles.geoMarker)
      }
      //继续动画效果
      map.render()
  }
  ```

### 关键接口

#### 1.`ol.Map`

> 详细信息见 openlayers API：https://openlayers.org/en/v5.3.0/apidoc/module-ol_Map-Map.html

##### 【Methods】`addLayer(layer)`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_Map-Map.html#addLayer

##### 【Methods】`render()`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_Map-Map.html#render
