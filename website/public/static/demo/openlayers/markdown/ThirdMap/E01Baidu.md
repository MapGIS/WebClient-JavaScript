## 加载百度地图

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例对接百度地图服务，实现在地图中加载百度地图，具体类型包括矢量、影像。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js 】开发库实现，首先通过`Zondy.Map.BaiDuLayer()`方法构建图层，然后将百度地图作为地图底图加载。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-openlayers-local.js 】开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>构建百度地图图层</font>**:
&ensp;&ensp;&ensp;&ensp;实例化 `Zondy.Map.BaiDuLayer`对象，构建百度地图图层；

- Example:

  ```javascript
    //初始化百度地图图层
    var baiduMapLayer = new Zondy.Map.BaiDuLayer()
  ```

**Step 4. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数,将 layers 属性设置为百度地图图层。

- Example:

  ```javascript
    //初始化地图容器
    var map = new ol.Map({
      layers: [baiduMapLayer],
      target: 'mapCon',
      view: new ol.View({
        center: center,
        maxZoom: maxZoom,
        minZoom: 3,
        zoom: 4,
      }),
    })
  ```

### 关键接口

#### 1.【显示百度地图的功能服务类】`Zondy.Map.BaiDuLayer（options）`

- `options`参数说明：

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
