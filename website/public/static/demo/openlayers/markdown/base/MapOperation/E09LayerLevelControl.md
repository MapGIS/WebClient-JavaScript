## 图层层级控制

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例实现图层级数显示控制功能

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】 开发库实现。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线 【include-openlayers-local.js】 脚本引入开发库；

**Step 2. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建几何绘制的样式</font>**:
&ensp;&ensp;&ensp;&ensp;创建正方形、矩形、五角星三种样式；

- Example:

  ```javascript
    var styles = {
      //设置square样式
      square: new ol.style.Style({
        image: new ol.style.RegularShape({
          fill: new ol.style.Fill({ color: 'blue' }),
          points: 4,
          radius: 80,
          angle: Math.PI / 4,
        }),
      }),
      //设置triangle样式
      triangle: new ol.style.Style({
        image: new ol.style.RegularShape({
          fill: new ol.style.Fill({ color: 'red' }),
          points: 3,
          radius: 80,
          rotation: Math.PI / 4,
          angle: 0,
          rotateWithView: true,
        }),
      }),
      //设置star样式
      star: new ol.style.Style({
        image: new ol.style.RegularShape({
          fill: new ol.style.Fill({ color: 'green' }),
          points: 5,
          radius: 80,
          radius2: 40,
          angle: 0,
        }),
      }),
    }
  ```

**Step 4. <font color=red>绘制正方形、矩形、五角星三种几何</font>**:
&ensp;&ensp;&ensp;&ensp;创建三个矢量图层，在图形上添加三个几何点要素，并将三个点要素的样式分别设置为上一步创建的 square、triangle、star 对应的样式，实现几何的多样化的渲染；

- Example:

  ```javascript
    function createLayer(coordinates, style, zIndex) {
      var feature = new ol.Feature(new ol.geom.Point(coordinates))
      feature.setStyle(style)

      var source = new ol.source.Vector({
        features: [feature],
      })

      var vectorLayer = new ol.layer.Vector({
        source: source,
      })
      vectorLayer.setZIndex(zIndex)

      return vectorLayer
    }
    var layer0 = createLayer([40, 40], styles['star'], 0)
    var layer1 = createLayer([0, 0], styles['square'], 1)
    var layer2 = createLayer([0, 40], styles['triangle'], 0)
  ```

**Step 5. <font color=red>添加上述图层到地图容器中</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数,将 layers 属性设置为天地图地图图层以及三个几何图形图层组成的图层组；

- Example:

  ```javascript
    map = new ol.Map({
      target: 'mapCon', //地图容器div的ID
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: true,
        },
      }),
      view: new ol.View({
        center: ol.proj.fromLonLat([0, 0]), //地图初始中心点
        maxZoom: 28, //最大瓦片显示级数
        minZoom: 1, //最小瓦片显示级数
        zoom: 4, //地图初始显示级数
      }),
      layers: [TiandiMap_vect, TiandiMap_vectcia, new ol.layer.Group({ layers: [layer0, layer1, layer2] })],
    })
  ```

**Step 6. <font color=red>修改图层的 Z-index，调整图层的显示顺序</font>**:
&ensp;&ensp;&ensp;&ensp;通过 layer.setZIndex()方法修改图层 Z-index 属性,实现图层显示顺序的调整。

- Example:

  ```javascript
    layer.setZIndex(parseInt(this.value) || 0)
  ```

### 关键接口

#### 1.【图层基类】`ol.layer.Layer`

##### 【method】`setZIndex(zindex)`：设置图层的 Z-index，在图层渲染之前对图层进行排序

| 参数名 | 类型   | 说明           |
| ------ | ------ | -------------- |
| zindex | number | 图层的 Z-index |

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_layer_Layer-Layer.html#setZIndex
