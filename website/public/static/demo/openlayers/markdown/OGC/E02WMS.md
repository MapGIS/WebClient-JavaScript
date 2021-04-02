## 加载 WMS 地图

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例加载了 GeoServer 发布的 WMS 地图。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现，首先实例化`ol.layer.Image`对象构建 WMS 图层，再通过实例化`ol.source.ImageWMS`对象构建 WMS 图层数据源，其中 url 属性设置为 GeoServer WMS 图层访问链接。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-openlayers-local.js 】开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>构建 wms 地图图层</font>**:
&ensp;&ensp;&ensp;&ensp;实例化`ol.layer.Image`对象构建 WMS 图层，再通过实例化`ol.source.ImageWMS`对象构建 WMS 图层数据源，其中 url 属性设置为 GeoServer WMS 图层访问链接；

- Example:

  ```javascript
    //影像WMS图层
    var Img_WMS = new ol.layer.Image({
      name: 'Image WMS',
      visible: false, //图层可见
      //数据范围
      //extent: [-55.120923766999944,-141.00554863899987, 70.07531036400012, 140.97762699400005],
      extent: [-179.23023299999997, 17.831509000000036, -65.16882499999997, 71.437769],
      source: new ol.source.ImageWMS({
        //WMS服务基地址
        url: 'https://ahocevar.com/geoserver/wms',
        //图层参数
        params: { LAYERS: 'usa:states' },
        //服务类型
        serverType: 'geoserver',
      }),
    })

    var Tile_WMS = new ol.layer.Tile({
      name: 'Tile WMS',
      visible: false,
      extent: [-124.73142200000001, 24.955967, -66.969849, 49.371735],
      source: new ol.source.TileWMS({
        //WMS服务地址
        url: 'https://ahocevar.com/geoserver/wms',
        //图层等参数
        params: { LAYERS: 'topp:states', TILED: true },
        //服务类型
        serverType: 'geoserver',
      }),
    })

    var projExtent = ol.proj.get('EPSG:4326').getExtent()
    var startResolution = ol.extent.getWidth(projExtent) / 256
    var resolutions = new Array(22)
    for (var i = 0, ii = resolutions.length; i < ii; ++i) {
      resolutions[i] = startResolution / Math.pow(2, i)
    }
    //实例化ol.tilegrid.TileGrid对象
    var tileGrid = new ol.tilegrid.TileGrid({
      //数据范围
      extent: [-141.00554863899987, -55.120923766999944, 140.97762699400005, 70.07531036400012],
      //分辨率数组
      resolutions: resolutions,
      //瓦片大小
      tileSize: [512, 256],
    })

    //使用ol.layer.Tile实例化WMS图层对象，设置ol.source.TileWMS的tileGrid参数
    var TileGrid_WMS = new ol.layer.Tile({
      name: '512*256 Tile',
      visible: false,
      source: new ol.source.TileWMS({
        //WMS服务地址
        url: 'https://ahocevar.com/geoserver/wms',
        //图层等参数
        params: { LAYERS: 'ne:ne_10m_admin_0_boundary_lines_land', TILED: true },
        //服务类型
        serverType: 'geoserver',
        //瓦片网格对象参数（瓦片大小为512x256）
        tileGrid: tileGrid,
      }),
    })
  ```

**Step 4. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数,将 layers 属性设置上一步创建的图层;

- Example:
  ```javascript
    //初始化地图容器
    var map = new ol.Map({
      target: 'mapCon',
      layers: [
        new ol.layer.Tile({
          name: 'OSM',
          source: new ol.source.OSM(),
          opacity: 0.7,
        }),
        Img_WMS,
        Tile_WMS,
        TileGrid_WMS,
      ],
      view: new ol.View({
        center: [-122, 44.4],
        zoom: 4,
        projection: 'EPSG:4326',
      }),
    })
  ```

**Step 5. <font color=red>创建地图图层列表</font>**:
&ensp;&ensp;&ensp;&ensp;通过`ol.Map（）`对象的`getLayers()`方法获取地图中已加载图层，创建图层列表；

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

**Step 6. <font color=red>为 cheackbox 绑定点击事件</font>**:
&ensp;&ensp;&ensp;&ensp;为 checkbox 绑定点击事件，通过`layer.setVisible()`控制图层的显示与隐藏。

- Example:
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

#### 1.【图片图层类】`ol/layer/Image`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_layer_Image.html

#### 2.【图片数据类】`ol.source.ImageWMS`

> 详细信息见 openlayers API：https://openlayers.org/en/v5.3.0/apidoc/module-ol_source_ImageWMS.html
