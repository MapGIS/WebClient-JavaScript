## 矢量图层服务

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例在 MapGIS 桌面端中获取矢量图层 的 url 后，通过访问 url 的方式在地图中添加矢量图层。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库，首先实例化`ol.proj.Projection`对象定义参考系，通过`ol.extent`对象的`getCenter()`方法获取图层中心点，然后实例化`Zondy.Map.GdbpLayer`对象构建矢量地图图层。

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

**Step 5. <font color=red>构建矢量地图图层</font>**:
&ensp;&ensp;&ensp;&ensp;实例化`Zondy.Map.GdbpLayer`对象构建瓦片地图图层；

- Example：

  ```javascript
    //创建一个图层
    var VecLayer = new Zondy.Map.GdbpLayer(name, gdbps, {
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
      layers: [VecLayer],
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

#### 3.【矢量图层功能服务类】Zondy.Map.GdbpLayer(opt_name, opt_gdbps, opt_options）

| 构造函数参数 | 类型           | 描述                                                                                                                                                                                                                                                                               |
| ------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| opt_name     | String         | 显示图层的名称，无实际意义，可为 NULL。                                                                                                                                                                                                                                            |
| opt_gdbps    | Array-[String] | 简单要素类的 URL 地址信息（包括源要素类存储路径与名称），用户根据语法设置 URL 地址，或在数据库中图层节点上右击选择“复制 URL”获得。多个间用“，”号隔开。如: ["gdbps= gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/海洋陆地","gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/国界"]。 |
| opt_options  | Object         | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2 …}                                                                                                                                                                                   |

- `opt_options`属性主要参数

| 属性    | 类型                                 | 描述                                                                                                                                                                                                                                                                                                                                                                       | 默认值      |
| ------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| ip      | String                               | 必选项，服务器 ip 地址，本地为“127.0.0.1”或“localhost”。                                                                                                                                                                                                                                                                                                                   | “127.0.0.1” |
| port    | String                               | 必选项，服务器端口号。                                                                                                                                                                                                                                                                                                                                                     | “6163”      |
| gdbps   | Array-[String]                       | 简单要素类的 URL 地址信息（包括源要素类存储路径与名称），用户根据语法设置 URL 地址，或在数据库中图层节点上右击选择“复制 URL”获得。多个间用“，”号隔开。如: ["gdbps= gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/海洋陆地","gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/国界"]                                                                                           | Null        |
| f       | String                               | 图像类型，取值为：jpg/png/gif                                                                                                                                                                                                                                                                                                                                              | "png"       |
| filters | String                               | 图层过滤条件，它由多个键值对组成，值为您所要设定的过滤条件。如：'1:ID>4,3:ID>1”。过滤条件中用到的符号包括“==”、“!=”、“<”、“>”、“<=”、“>=”、“..”、“~”等，当包含中文条件时，请使用 UTF-8 编码格式，其中“：”和“，”为保留字符，用于表示键值对概念和分隔不同图层的条件，请不要将这 2 个字符用于自定义条件中，javascitpt 中请使用 encodeURI（）函数编码后再代入 filters 参数中。 | Null        |
| style   | Array-[ Zondy.Object.CDisplayStyle ] | 矢量图层显示样式参数，与图层序号相对应。                                                                                                                                                                                                                                                                                                                                   | Null        |
| extent  | Array-[Number]                       | 图层数据范围                                                                                                                                                                                                                                                                                                                                                               |             |  |
| guid    | String                               | 矢量图层缓存的唯一标识，一般情况下无需赋值。                                                                                                                                                                                                                                                                                                                               |             |
