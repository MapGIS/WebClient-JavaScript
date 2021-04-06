## 瓦片地图服务

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在地图中加载在线二维瓦片地图，对接 MapGIS IGServer 发布的二维瓦片地图服务。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库，首先实例化`ol.proj.Projection`对象定义参考系，通过`ol.extent`对象的`getCenter()`方法获取图层中心点，然后实例化`Zondy.Map.TileLayer`对象构建瓦片地图图层。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-openlayers-local.js 】开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>定义参考系</font>**"
&ensp;&ensp;&ensp;&ensp;实例化`ol.proj.Projection`对象定义参考系；

- Example:

  ```javascript
    var projection = new ol.proj.Projection({ units: ol.proj.Units.METERS, extent: extent })
  ```

**Step 4. <font color=red>定义图层中心点</font>**:
&ensp;&ensp;&ensp;&ensp;通过`ol.extent`对象的`getCenter()`方法获取图层中心点；

- Example:

  ```javascript
    //中心点
    var center = ol.extent.getCenter(extent)
  ```

**Step 5. <font color=red>构建瓦片地图图层</font>**:
&ensp;&ensp;&ensp;&ensp;实例化`Zondy.Map.TileLayer`对象构建瓦片地图图层；

- Example：

  ```javascript
    var TileLayer = new Zondy.Map.TileLayer(name, TileName, {
      ip: `${ip}`,
      port: `${port}`, //访问IGServer的端口号，.net版为6163，Java版为8089
    })
  ```

**Step 6. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象,设置相关参数。

- Example

  ```javascript
    var map = new ol.Map({
      //目标DIV
      target: 'mapCon',
      //将图层添加到地图容器
      layers: [TileLayer],
      view: new ol.View({
        projection: projection,
        center: center,
        //最大显示级数
        maxZoom: 5,
        //最小显示级数
        minZoom: 1,
        //当前显示级数
        zoom: 3,
      }),
    })
  ```

### 关键接口

#### 1.【地图投影类】`ol.proj.Projection`

> 详细信息见 openlayers API：https://openlayers.org/en/v5.3.0/apidoc/module-ol_proj_Projection.html

#### 2.【地图范围类】`ol.extent`

> 详细信息见 openlayers API：https://openlayers.org/en/v5.3.0/apidoc/module-ol_extent.html

【method】`getCenter()`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_extent.html#.getCenter

#### 3.【瓦片地图的功能服务】`Zondy.Map.TileLayer(opt_name, opt_hdfName, opt_options）`

| 参数名       | 类型   | 说 明                                                                                            |
| ------------ | ------ | ------------------------------------------------------------------------------------------------ |
| 构造函数参数 | 类型   | 描述                                                                                             |
| opt_name     | String | 显示瓦片地图的名称，无实际意义，可为 NULL。                                                      |
| opt_hdfName  | String | 瓦片地图的名称(根据 IGServer 上发布的实际名称)                                                   |
| opt_options  | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2 …} |

- `opt_options`属性主要参数

| 属性           | 类型              | 描述                                                                                                                                                                                                                                       | 默认值    |
| -------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| ip             | String            | 服务器 ip 地址，本地为“127.0.0.1”或“localhost”。                                                                                                                                                                                           | Null      |
| port           | String            | 服务器端口号                                                                                                                                                                                                                               | Null      |
| isAutoConfig   | Boolean           | 是否自动配置                                                                                                                                                                                                                               | True      |
| cache          | Boolean           | 瓦片地图是否为地图文档发布动态裁图方式                                                                                                                                                                                                     | False     |
| token          | String            | 服务访问控制，如果在 MapGIS Server Manager 服务管理中开启 token，须设置此项，其 key 值可在设置处获取。                                                                                                                                     | Null      |
| name           | String            | 要显示的瓦片地图的名称(根据 IGServer 上发布的实际名称)                                                                                                                                                                                     | Null      |
| maxResolution  | Number            | 最大分辨率                                                                                                                                                                                                                                 | Null      |
| tileProjection | ol.ProjectionLike | 瓦片地图投影信息                                                                                                                                                                                                                           | Null      |
| extent         | ol.extent         | 瓦片地图范围，如[xMin,yMin,xMax,yMax]。                                                                                                                                                                                                    |           |
| maxZoom        | Number            | 瓦片地图最大级数                                                                                                                                                                                                                           | 16        |
| tileOriginType | String            | 瓦片裁剪方式，是左上还是左下的方式，即是新瓦片裁剪的方式还是旧瓦片。一般无需设置此参数，直接由原点和中心点进行判断，只有在某些特殊的裁剪的瓦片中需要用到。例如若裁剪瓦片时以左下角为原点，方式却是新瓦片的方式则需要设置此参数为 leftTop。 | "leftTop" |
| tileSize       | Number            | 地图图片大小                                                                                                                                                                                                                               | 256       |
| resolutions    | Array-<Number>    | 分辨率数组                                                                                                                                                                                                                                 |           |
| origin         | Array-<Number>    | 瓦片地图的原点                                                                                                                                                                                                                             | 左上角    |
