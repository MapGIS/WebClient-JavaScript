## 航线动画

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例在地图中添加了航线动画。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库，首先创建地图对象，添加天地图底图，初始化`ol.layer.Vector`类，创建一个用于存放绘制的几何实体的图层，创建一个两个地点之间的弧段，并把该弧段添加到矢量图层`Vector`对象中.调用 Map 对象类的`addLayer`方法执行添加绘制层功能。为地图容器`map`添加`postcompose`事件（地图渲染中）为其添加根据要素来描绘出线条的方法。

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

**Step 5. <font color=red>创建图层</font>**:
&ensp;&ensp;&ensp;&ensp;初始化`ol.layer.Vector`类，创建一个用于存放绘制的几何实体的图层，创建一个两个地点之间的弧段，并把该弧段添加到矢量图层`Vector`对象中；

- Example:

  ```javascript
    flightsSource = new ol.source.Vector({
      wrapX: false,
      loader: function() {
        var url = './static/data/geojson/flights.json'
        fetch(url)
          .then(function(response) {
            return response.json()
          })
          .then(function(json) {
            var flightsData = json.flights
            for (var i = 0; i < flightsData.length; i++) {
              var flight = flightsData[i]
              var from = flight[0]
              var to = flight[1]

              //创建一个两个地点之间的弧段
              var arcGenerator = new arc.GreatCircle({ x: from[1], y: from[0] }, { x: to[1], y: to[0] })

              var arcLine = arcGenerator.Arc(100, { offset: 10 })
              if (arcLine.geometries.length === 1) {
                var line = new ol.geom.LineString(arcLine.geometries[0].coords)
                // line.transform(ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));

                var feature = new ol.Feature({
                  geometry: line,
                  finished: false,
                })
                //添加动画的特性与延迟所有功能并不在同一时间开始
                addLater(feature, i * 50)
              }
            }
            map.on('postcompose', animateFlights)
          })
      },
    })

    var flightsLayer = new ol.layer.Vector({
      source: flightsSource,
      style: function(feature) {
        //如果动画仍然是活跃的特性,不渲染图层样式的特性
        if (feature.get('finished')) {
          return style
        } else {
          return null
        }
      },
    })
    map.addLayer(flightsLayer)
  ```

**Step 7. <font color=red>添加要素动画</font>**:
&ensp;&ensp;&ensp;&ensp;为地图容器 map 添加 postcompose 事件（地图渲染中）为其添加根据要素来描绘出线条的方法。

- Example：

  ```javascript
    var animateFlights = function(event) {
      var vectorContext = event.vectorContext
      var frameState = event.frameState
      vectorContext.setStyle(style)

      var features = flightsSource.getFeatures()
      for (var i = 0; i < features.length; i++) {
        var feature = features[i]
        if (!feature.get('finished')) {
          var coords = feature.getGeometry().getCoordinates()
          var elapsedTime = frameState.time - feature.get('start')
          var elapsedPoints = elapsedTime * pointsPerMs

          if (elapsedPoints >= coords.length) {
            feature.set('finished', true)
          }

          var maxIndex = Math.min(elapsedPoints, coords.length)
          var currentLine = new ol.geom.LineString(coords.slice(0, maxIndex))

          //根据要素来描绘出线条
          vectorContext.drawGeometry(currentLine)
        }
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
