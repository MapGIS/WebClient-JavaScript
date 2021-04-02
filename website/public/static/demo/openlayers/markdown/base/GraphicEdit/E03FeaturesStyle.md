## 图形样式编辑

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例实现向天地图世界地图添加点、线、多边形图层并且修改几何图形样式的功能。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】 开发库实现。通过`ol.Feature()`方法构建要素，通过`setStyle()`方法修改图层显示样式。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线 【include-openlayers-local.js】 脚本引入开发库;

**Step 2. <font color=red>创建几何要素</font>**:
&ensp;&ensp;&ensp;&ensp;创建几何图形要素;

- Example:

  ```javascript
    //绘制的几何图形要素
    pointFeature = new ol.Feature({
        geometry: new ol.geom.Point([116, 0]),
        name: 'Point Feature',
    })
    lineFeature = new ol.Feature({
        geometry: new ol.geom.LineString([
            [1e7, 1e6],
            [1e6, 3e6],
        ]),
        name: 'Line Feature',
    })
    polygonFeature = new ol.Feature({
        geometry: new ol.geom.Polygon([
            [
              [1e6, -1e6],
              [1e6, 1e6],
              [3e6, 1e6],
              [3e6, -1e6],
              [1e6, -1e6],
            ],
        ]),
        name: 'Polygon Feature',
    })
  ```

  **Step 3. <font color=red>创建矢量图层</font>**:
  &ensp;&ensp;&ensp;&ensp;分别实例化点、线、区图层对象;

- Example:

  ```javascript
    //分别实例化点、线、区图层对象
    vectorPointsLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [pointFeature],
      }),
      // style: createPointStyleFunction()
    })

    vectorLinesLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [lineFeature],
      }),
      // style: createLineStyleFunction()
    })
    vectorPolygonsLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [polygonFeature],
      }),
      // style: createPolygonStyleFunction()
    })
  ```

**Step 4. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div，并设置其样式;

**Step 5. <font color=red>创建地图，并添加图层</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数,将 layers 属性设置为天地图地图图层以及三个几何图形图层;

**Step 6. <font color=red>创建功能菜单</font>**:
&ensp;&ensp;&ensp;&ensp;添加修改图层样式菜单栏;

**Step 7. <font color=red>修改图层样式</font>**:
&ensp;&ensp;&ensp;&ensp;通过 setStyle 方法修改图层样式。

- Example:

  ```javascript
    if (index == 0) {
      //点样式修改
      vectorPointsLayer.setStyle(createPointStyleFunction(pointFeature))
    } else if (index == 1) {
      //线样式修改
      vectorLinesLayer.setStyle(createLineStyleFunction(lineFeature))
    } else {
      //区样式修改
      vectorPolygonsLayer.setStyle(createPolygonStyleFunction(polygonFeature))
    }
  ```

### 关键接口

#### 1.【矢量图层类】`ol.layer.Vector`

##### 【method】`setStyle(style)`：添加规则多边形

| 参数名 | 类型           | 说明           |
| ------ | -------------- | -------------- |
| style  | ol.style.Style | 几何要素的样式 |

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_layer_VectorTile-VectorTileLayer.html#setStyle
