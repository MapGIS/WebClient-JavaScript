## 加载 WFS 地图

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例加载了 WFS 地图。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现，首先实例化`ol.source.Vector`对象构建 WFS 图层数据源，再通过实例化`ol.layer.Vector`对象构建 WFS 图层。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-openlayers-local.js 】开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>构建 WFS 图层数据源</font>**:
&ensp;&ensp;&ensp;&ensp;通过实例化`ol.source.Vector`对象构建 WFS 图层数据源；

- Example:

  ```javascript
    var vectorSource = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: function(extent) {
        return 'https://ahocevar.com/geoserver/wfs?service=WFS&' + 'version=1.1.0&request=GetFeature&typename=osm:water_areas&' + 'outputFormat=application/json&srsname=EPSG:3857&' + 'bbox=' + extent.join(',') + ',EPSG:3857'
      },
      strategy: ol.loadingstrategy.bbox,
    })
  ```

**Step 4. <font color=red>构建 WFS 图层</font>**:
&ensp;&ensp;&ensp;&ensp;通过实例化`ol.layer.Vector`对象构建 WFS 图层；

- Example:

  ```javascript
    var vector = new ol.layer.Vector({
      name: 'WFS矢量',
      source: vectorSource,
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'rgba(0, 0, 255, 1.0)',
          width: 2,
        }),
      }),
    })
  ```

**Step 5. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图必要参数，加载 WFS 地图和 OSM 地图；

- Example：

  ```javascript
    var map = new ol.Map({
      target: 'mapCon',
      layers: [
        new ol.layer.Tile({
          name: 'OSM',
          source: new ol.source.OSM(),
          opacity: 0.7,
        }),
        vector,
      ],
      view: new ol.View({
        center: [-8908887.277395891, 5381918.072437216],
        zoom: 12,
        projection: 'EPSG:3857',
      }),
    })
  ```

**Step 6. <font color=red>创建图层列表</font>**:
&ensp;&ensp;&ensp;&ensp;通过`ol.Map`对象的`getLayers()`方法获取当前地图加载图层，创建图层列表；

- Example:

  ```javascript
    /**
    * 加载图层列表数据
    * @param {ol.Map} map 地图对象
    * @param {string} id 图层列表容器ID
    */
    function loadLayersControl(map, id) {
      //图层目录容器
      var treeContent = document.getElementById(id)
      //获取地图中所有图层
      var layers = map.getLayers()
      for (var i = 0; i < layers.getLength(); i++) {
        //获取每个图层的名称、是否可见属性
        layerArr[i] = layers.item(i)
        layerNameArr[i] = layerArr[i].get('name')
        layerVisibilityArr[i] = layerArr[i].getVisible()
        //新增li元素，用来承载图层项
        var elementLi = document.createElement('li')
        // 添加子节点
        treeContent.appendChild(elementLi)
        //创建复选框元素
        var elementInput = document.createElement('input')
        elementInput.type = 'checkbox'
        elementInput.name = 'layers'
        elementLi.appendChild(elementInput)
        //创建label元素
        var elementLable = document.createElement('label')
        elementLable.className = 'layer'
        //设置图层名称
        setInnerText(elementLable, layerNameArr[i])
        elementLi.appendChild(elementLable)
        //设置图层默认显示状态
        if (layerVisibilityArr[i]) {
          elementInput.checked = true
        }
        //为checkbox添加变更事件
        addChangeEvent(elementInput, layerArr[i])
      }
    }
  ```

**Step 7. <font color=red>为 checkbox 绑定点击事件</font>**:
&ensp;&ensp;&ensp;&ensp;为 checkbox 绑定点击事件，通过 `layer.setVisible()`方法控制图层显示隐藏。

- Example

  ```javascript
    /**
    * 为checkbox元素绑定变更事件
    * @param {input} element checkbox元素
    * @param {ol.layer.Layer} layer 图层对象
    */
    function addChangeEvent(element, layer) {
      element.onclick = function() {
        if (element.checked) {
          //显示图层
          layer.setVisible(true)
        } else {
          //不显示图层
          layer.setVisible(false)
        }
      }
    }
  ```

### 关键接口

#### 1. 【矢量图层类】`ol.layer.Vector`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_layer_Vector.html

#### 2.【矢量图层数据类】`ol.source.Vector`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_source_Vector.html
