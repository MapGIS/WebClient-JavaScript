## 加载天地图地图

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例对接天地图服务，实现在地图中加载天地图，具体类型包括矢量、影像。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】 开发库实现，首先通过`Zondy.Map.TianDiTu()`方法构建图层，然后通过 `map.addLayer（）`方法添加地图。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-openlayers-local.js 】开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数；

- Example:

  ```javascript
    map = new ol.Map({
      target: 'mapCon',
      view: new ol.View({
        projection: ol.proj.get('EPSG:4326'),
        center: [110, 30],
        maxZoom: 14,
        minZoom: 1,
        zoom: 4,
      }),
    })
  ```

  **Step 4. <font color=red>构建天地图图层</font>**:
  &ensp;&ensp;&ensp;&ensp;实例化 `Zondy.Map.TianDiTu`对象，构建百度地图图层；

- Example:
  ```javascript
  tiandituLayer = new Zondy.Map.TianDiTu({
    //图层类型
    layerType: 'vec',
    //最小显示等级
    minZoom: 0,
    //最大显示等级
    maxZoom: 15,
    //key
    token: '4c27d6e0e8a90715b23a989d42272fd8',
    //设置地图不连续显示
    noWrap: true,
  })
  var tiandituLayer2 = new Zondy.Map.TianDiTu({
    //图层类型
    layerType: 'cva',
    //最小显示等级
    minZoom: 0,
    //最大显示等级
    maxZoom: 15,
    //key
    token: '4c27d6e0e8a90715b23a989d42272fd8',
    //设置地图不连续显示
    noWrap: true,
  })
  ```

**Step 5. <font color=red>添加天地图</font>**：
&ensp;&ensp;&ensp;&ensp;通过`map.addLayer()`方法添加天地图。

- Example:

  ```javascript
  map.addLayer(tiandituLayer)
  map.addLayer(tiandituLayer2)
  ```

### 关键接口

#### 1.【图层构建】`Zondy.Map.TianDiTu(options)`

- `options` 参数说明：

| 参数名         | 类型    | 说明                                     |
| -------------- | ------- | ---------------------------------------- |
| attributions   | String  | 基本描述内容                             |
| logo           | String  | 基本描述图标 Logo                        |
| opaque         | String  | 不透明度                                 |
| projection     | String  | ol.proj                                  |
| state          | String  | 状态                                     |
| tilePixelRatio | String  | 瓦片的像素分辨率                         |
| wrapX          | Boolean | 通过 wrapX:false 限制图层在 x 轴方向重复 |
| crossOrigin    | String  | crossOrigin="anonymous"为跨域调用        |
