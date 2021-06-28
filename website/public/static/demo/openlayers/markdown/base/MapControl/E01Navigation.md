## 加载地图控件

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例在加载了天地图矢量图层以及其注记图层的基础上添加了地图控件，其中包括导航控件，复位控件，鼠标位置控件，比例尺控件，鹰眼控件。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】 开发库实现，首先通过`ol.control`实例化控件，然后通过关键接口`map.addControl`加载 OpenLayers 地图控件。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线 【include-openlayers-local.js】 脚本引入开发库;

**Step 2. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式;

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数，如地图 div 容器、缩放层级、中心点等，添加天地图，具体操作参考`互联网地图`目录下的`天地图`示例;

**Step 4. <font color=red>添加导航控件</font>**:
&ensp;&ensp;&ensp;&ensp;添加导航控件到地图容器中;

- Example:

  ```javascript
    var zoom = new ol.control.Zoom()
    map.addControl(zoom)
  ```

  **Step 5. <font color=red>添加复位控件</font>**:
  &ensp;&ensp;&ensp;&ensp;添加复位控件到地图容器中;

- Example:

  ```javascript
    var zoomToExtent = new ol.control.ZoomToExtent({
      extent: [13100000, 4290000,13200000, 5210000],
    })
    map.addControl(zoomToExtent)
  ```

  **Step 6. <font color=red>添加鼠标位置控件</font>**:
  &ensp;&ensp;&ensp;&ensp;添加鼠标位置控件到地图容器中;

- Example:

  ```javascript
    var mousePositionControl = new ol.control.MousePosition({
      //坐标格式
      coordinateFormat: ol.coordinate.createStringXY(4),
      //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
      projection: 'EPSG:4326',
      //坐标信息显示样式类名，默认是'ol-mouse-position'
      className: 'custom-mouse-position',
      //显示鼠标位置信息的目标容器
      target: document.getElementById('mouse-position'),
      //未定义坐标的标记
      undefinedHTML: '&nbsp;',
    })
    map.addControl(mousePositionControl)
  ```

  **Step 7. <font color=red>添加比例尺控件</font>**:
  &ensp;&ensp;&ensp;&ensp;添加比例尺控件到地图容器中;

- Example:

  ```javascript
    var scaleLineControl = new ol.control.ScaleLine({
      //设置比例尺单位，degrees、imperial、us、nautical、metric（度量单位）
      units: 'metric',
    })
    map.addControl(scaleLineControl)
  ```

  **Step 8. <font color=red>添加鹰眼控件</font>**:
  &ensp;&ensp;&ensp;&ensp;添加鹰眼控件到地图容器中(示例中鹰眼控件加载了天地图影像图层)。

- Example:

  ```javascript
    TiandiMap_img = new ol.layer.Tile({
      name: '天地图影像图层',
      visible: true, //图层不可见
      source: new ol.source.XYZ({
        url: 'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + tdk,
        wrapX: false,
      }),
    })
    TiandiMap_imgcia = new ol.layer.Tile({
      name: '天地图影像注记图层',
      visible: true, //图层不可见
      source: new ol.source.XYZ({
        url: 'http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=' + tdk,
        wrapX: false,
      }),
    })
    //实例化鹰眼控件（OverviewMap）,自定义样式的鹰眼控件
    var overviewMapControl = new ol.control.OverviewMap({
      //鹰眼控件样式（see in overviewmap-custom.html to see the custom CSS used）
      className: 'ol-overviewmap ol-custom-overviewmap',
      //鹰眼中加载同坐标系下不同数据源的图层
      layers: [TiandiMap_img, TiandiMap_imgcia],
      //鹰眼控件展开时功能按钮上的标识（网页的JS的字符编码）
      collapseLabel: '\u00BB',
      //鹰眼控件折叠时功能按钮上的标识（网页的JS的字符编码）
      label: '\u00AB',
      //初始为展开显示方式
      collapsed: false,
    })
    map.addControl(overviewMapControl)
  ```

### 关键接口

#### 1.【地图控件基类】`ol.control`

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_control.html

#### 2.【地图对象类】`ol.Map`

##### 【method】`ol.Map.addControl(control)`：添加控件到地图中

| 参数名  | 类型   | 说明                           |
| ------- | ------ | ------------------------------ |
| control | Object | 将实例化的地图控件添加到地图中 |
