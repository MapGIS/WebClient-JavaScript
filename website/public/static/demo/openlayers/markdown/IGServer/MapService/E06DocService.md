## 矢量地图文档服务

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在地图中加载在线二维瓦片地图，对接 MapGIS IGServer 发布的二维瓦片地图服务。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库，首先实例化`ol.proj.Projection`对象定义参考系，通过`ol.extent`对象的`getCenter()`方法获取图层中心点，然后实例化`Zondy.Map.Doc`对象构建地图文档图层。

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

**Step 5. <font color=red>构建地图文档图层</font>**:
&ensp;&ensp;&ensp;&ensp;实例化`Zondy.Map.Doc`对象构建地图文档图层；

- Example：

  ```javascript
    var mapDocLayer = new Zondy.Map.Doc(name, docname, {
      ip: `${ip}`,
      port: `${port}`, //访问IGServer的端口号，.net版为6163，Java版为8089
      extent: extent,
    })
  ```

**Step 6. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象,设置相关参数。

- Example
  ```javascript
    //初始化地图容器
    var map = new ol.Map({
      //目标DIV
      target: 'mapCon',
      //将图层添加到地图容器
      layers: [mapDocLayer],
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

##### 【method】`getCenter()`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_extent.html#.getCenter

#### 3.【矢量地图文档的功能服务类】`Zondy.Map.MapDocTileLayer(opt_name, opt_hdfName, opt_options)`

| 参数名       | 类型   | 说 明                                                                                            |
| ------------ | ------ | ------------------------------------------------------------------------------------------------ |
| 构造函数参数 | 类型   | 描述                                                                                             |
| opt_name     | String | 显示地图文档的名称，无实际意义，可为 NULL。                                                      |
| opt_hdfName  | String | 矢量地图文档的名称(根据 IGServer 上发布的实际名称)                                               |
| opt_options  | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2 …} |

- `opt_options`属性主要参数

| 参数值  | 类型                          | 描述                                                                                                                                                                                                                                                                                                                                                                       | 默认值      |
| ------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| ip      | String                        | 必选项，服务器 ip 地址，本地为“127.0.0.1”或“localhost”。                                                                                                                                                                                                                                                                                                                   | “127.0.0.1” |
| port    | String                        | 必选项，服务器端口号。                                                                                                                                                                                                                                                                                                                                                     | “6163”      |
| token   | String                        | 服务访问控制，如果在 MapGIS Server Manager 服务管理中开启 token，须设置此项，其 key 值可在设置处获取。                                                                                                                                                                                                                                                                     | Null        |
| mode    | String                        |                                                                                                                                                                                                                                                                                                                                                                            | “normal”    |
| name    | Boolean                       | 要显示的矢量地图文档的名称(根据 IGServer 上发布的实际名称)                                                                                                                                                                                                                                                                                                                 | Null        |
| f       | String                        | 图像类型，取值为：jpg                                                                                                                                                                                                                                                                                                                                                      | png         | gif | "png" |
| filters | String                        | 图层过滤条件，它由多个键值对组成，值为您所要设定的过滤条件。如：'1:ID>4,3:ID>1”。过滤条件中用到的符号包括“==”、“!=”、“<”、“>”、“<=”、“>=”、“..”、“~”等，当包含中文条件时，请使用 UTF-8 编码格式，其中“：”和“，”为保留字符，用于表示键值对概念和分隔不同图层的条件，请不要将这 2 个字符用于自定义条件中，javascitpt 中请使用 encodeURI（）函数编码后再代入 filters 参数中。 | Null        |
| style   | Zondy.Object.CDisplayStyle    | 地图文档显示样式参数                                                                                                                                                                                                                                                                                                                                                       | Null        |
| proj    | Zondy.Object.CGetImageBySRSID | 动态投影参数,设置地图文档在服务器端重新投影所需的空间参考系对象。                                                                                                                                                                                                                                                                                                          | Null        |
| extent  | Array-[Number]                | 地图文档数据范围                                                                                                                                                                                                                                                                                                                                                           |             |
| guid    | String                        | 地图文档缓存的唯一标识，一般无需赋值。                                                                                                                                                                                                                                                                                                                                     |             |
