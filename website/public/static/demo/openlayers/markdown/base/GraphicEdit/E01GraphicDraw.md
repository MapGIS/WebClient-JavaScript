## 坐标绘制图形

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例实现向天地图世界地图添加固定图形的功能。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】 开发库实现。通过`ol.Feature()`方法构建要素，通过`vectorSource.addFeatures([feature])`方法添加到图层中。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线【include-openlayers-local.js】 脚本引入开发库;

**Step 2. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div，并设置其样式;

**Step 3. <font color=red>创建地图</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数,将 layers 属性设置为天地图地图图层;

**Step 4. <font color=red>创建矢量图层</font>**:
&ensp;&ensp;&ensp;&ensp;创建一个矢量图层作为绘制图层,并添加到地图中;

- Example:

  ```javascript
    //实例化一个矢量图层Vector作为绘制层
    vectorSource = new ol.source.Vector()
    //创建一个图层
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
    })
    //将绘制层添加到地图容器中
    map.addLayer(vectorLayer)
  ```

**Step 5. <font color=red>添加点</font>**:
&ensp;&ensp;&ensp;&ensp;创建一个点并添加到绘制层数据源中;

- Example:

  ```javascript
    //创建一个点
    var point = new ol.Feature({
      geometry: new ol.geom.Point([11505912.0, 4011415.0]),
    })
    //设置点1的样式信息
    point.setStyle(
      new ol.style.Style({
        //填充色
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        //边线颜色
        stroke: new ol.style.Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        //形状
        image: new ol.style.Circle({
          radius: 17,
          fill: new ol.style.Fill({
            color: '#ffcc33',
          }),
        }),
      })
    )
    vectorSource.addFeatures([point])
  ```

**Step 6. <font color=red>添加线</font>**:
&ensp;&ensp;&ensp;&ensp;创建一个线并添加到绘制层数据源中;

- Example:

  ```javascript
    //创建一个线
    var line = new ol.Feature({
      geometry: new ol.geom.LineString([
        [8208725.0, 3835304.0],
        [16055444.0, 4578883.0],
      ]),
    })
    //设置线的样式
    line.setStyle(
      new ol.style.Style({
        //填充色
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        //边线颜色
        stroke: new ol.style.Stroke({
          color: '#ffcc33',
          width: 5,
        }),
        //形状
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
            color: '#ffcc33',
          }),
        }),
      })
    )
    vectorSource.addFeatures([line])
  ```

**Step 7. <font color=red>添加圆</font>**:
&ensp;&ensp;&ensp;&ensp;创建一个圆添加到绘制层数据源中;

- Example:

  ```javascript
    //创建一个圆
    var circle = new ol.Feature({
      geometry: new ol.geom.Circle([9871995.0, 4344069.0], 1000000),
    })
    circle.setStyle(
      new ol.style.Style({
        //填充色
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.5)',
        }),
        //边线颜色
        stroke: new ol.style.Stroke({
          color: '#ffcc33',
          width: 6,
        }),
        //形状
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
            color: '#ffcc33',
          }),
        }),
      })
    )
    vectorSource.addFeatures([circle])
  ```

**Step 8. <font color=red>添加多边形</font>**:
&ensp;&ensp;&ensp;&ensp;创建一个多边形添加到绘制层数据源中;

- Example:

  ```javascript
    //根据范围获取多边形
    var rectangle = new ol.Feature({
      geometry: new ol.geom.Polygon.fromExtent([8208725.0, 2035304.0, 12841418.0, 4068487.0]),
    })
    rectangle.setStyle(
      new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(33,33,33,0.5)',
        }),
        stroke: new ol.style.Stroke({
          color: '#ffcc33',
          width: 4,
        }),
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
            color: '#ffcc33',
          }),
        }),
      })
    )
    vectorSource.addFeatures([rectangle])
  ```

**Step 9. <font color=red>添加正方形</font>**:
&ensp;&ensp;&ensp;&ensp;创建一个正方形添加到绘制层数据源中;

- Example:

  ```javascript
    //根据圆获取多边形
    var square = new ol.Feature({
      geometry: new ol.geom.Polygon.fromCircle(new ol.geom.Circle([9871995.0, 4344069.0], 1000000), 4, 150),
    })
    square.setStyle(
      new ol.style.Style({
        //填充色
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.8)',
        }),
        //边线颜色
        stroke: new ol.style.Stroke({
          color: 'red',
          width: 2,
        }),
        //形状
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
            color: '#ffcc33',
          }),
        }),
      })
    )
    vectorSource.addFeatures([square])
  ```

**Step 10. <font color=red>添加矩形</font>**:
&ensp;&ensp;&ensp;&ensp;创建一个矩形并添加到图层数据源中。

- Example:

  ```javascript
    //创建一个多变形
    var polygon = new ol.Feature({
      geometry: new ol.geom.Polygon([
        [
          [9871995.0, 4344069.0],
          [12689769.0, 5107216.0],
          [13002855.0, 3522218.0],
        ],
      ]),
    })
    //设置区样式信息
    polygon.setStyle(
      new ol.style.Style({
        //填充色
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.5)',
        }),
        //边线颜色
        stroke: new ol.style.Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        //形状
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
            color: '#ffcc33',
          }),
        }),
      })
    )
    vectorSource.addFeatures([polygon])
  ```

### 关键接口

#### 1.【几何要素类】`ol.Feature()`

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_Feature.html

#### 2.【矢量数据源类】`ol.source.Vector`

##### 【method】`addFeatures(features)`：添加矢量要素

| 参数名   | 类型              | 说明         |
| -------- | ----------------- | ------------ |
| features | Array{ol.Feature} | 矢量要素数组 |

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_source_Cluster-Cluster.html#addFeatures
