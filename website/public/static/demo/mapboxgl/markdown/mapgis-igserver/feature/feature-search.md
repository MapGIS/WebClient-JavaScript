## 要素查询

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例在二维视图中加载显示一个地图文档服务数据，坐标系为`Web墨卡托`，使用`要素查询`空间范围+属性条件查询 MapGIS 地图文档中图层的要素信息。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-mapboxgl-local.js】开发库实现，通过关键接口`Zondy.Service.QueryDocFeature()`实现 MapGIS 地图文档的`要素查询`功能。

> 开发库使用请参见*首页-概述-调用方式*。

> MapGIS IGServer 发布地图文档服务请参见`MapGIS IGServer`目录下的`地图-EPSG3857`示例的说明部分

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;引用开发库，本示例通过本地离线【include-mapboxgl-local.js】脚本引入开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="map"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**:
&nbsp;&nbsp;&nbsp;&ensp;创建地图对象，设置地图的必要参数，如地图 div 容器、缩放层级、中心点等，以及在地图中添加地图文档图层，具体操作参考`MapGIS IGServer`目录下的`地图-EPSG3857`示例；

**Step 4. <font color=red>创建地图文档查询服务对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建**地图文档查询服务对象**，并使用该对象执行查询操作；

- 设置查询包含的信息结构

* Example:

  ```javascript
    //创建查询结构对象
    var queryStruct = new Zondy.Service.QueryFeatureStruct()
    //是否包含几何图形信息
    queryStruct.IncludeGeometry = true
    //是否包含属性信息
    queryStruct.IncludeAttribute = true
    //是否包含图形显示参数
    queryStruct.IncludeWebGraphic = false
  ```

- 设置查询规则

* Example:

  ```javascript
    //制定查询规则
    var rule = new Zondy.Service.QueryFeatureRule({
      //是否将要素的可见性计算在内
      EnableDisplayCondition: false,
      //是否完全包含
      MustInside: false,
      //是否仅比较要素的外包矩形
      CompareRectOnly: false,
      //是否相交
      Intersect: true,
    })
  ```

- 设置查询参数

* Example:

  ```javascript
    //创建一个用于查询的矩形
    var leftBottom = lonLat2Mercator(112, 30)
    var rightTop = lonLat2Mercator(113, 32)
    var geomObj = new Zondy.Object.Rectangle(leftBottom.x, leftBottom.y, rightTop.x, rightTop.y)
    //实例化查询参数对象
    var queryParam = new Zondy.Service.QueryParameter({
      //几何对象
      geometry: geomObj,
      //结果格式
      resultFormat: 'json',
      //查询结构
      struct: queryStruct,
      //查询规则
      rule: rule,
    })
    //设置查询分页号
    queryParam.pageIndex = 0
    //设置查询要素数目
    queryParam.recordNumber = 20
  ```

- 创建地图文档查询服务对象，执行查询操作

* Example:
  ```javascript
    //实例化地图文档查询服务对象
    var queryService = new Zondy.Service.QueryDocFeature(queryParam, '中国地图3857', 0, {
      //IP地址
      ip: 'develop.smaryun.com',
      //端口号
      port: '6163',
    })
    //执行查询操作，querySuccess为成功回调，queryError为失败回调
    queryService.query(querySuccess, queryError)
  ```

**Step 5. <font color=red>结果展示</font>**:
&ensp;&ensp;&ensp;&ensp;查询结果展示，在查询成功的回调函数中将查询结果格式化为<a href="https://geojson.org/" target="_blank">GeoJSON</a>格式，以图层的方式添加到地图中。

- Example:
  ```javascript
    var feature = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [finaldots],
      },
    }
    features.push(feature)
    //用geojson创建一个多边形
    var geometryPolygon = {
      type: 'FeatureCollection',
      features: features,
    }
    var source = {
      type: 'geojson',
      data: geometryPolygon,
    }
    map.addLayer(
      {
        //此id可随意设置，但是要唯一
        id: 'highlayer',
        //指定类型为fill（填充区域）
        type: 'fill',
        //设置数据来源
        source: source,
        //设置绘制参数
        paint: {
          //设置填充颜色
          'fill-color': 'rgba(127,255,0, 0.5)',
          'fill-outline-color': '#FFA500',
        },
      },
      'poly'
    )
  ```

### 关键接口

#### 1.【查询要素信息结构类】`Zondy.Service.QueryFeatureStruct(opt_options)`

通过这个接口指定查询获取的要素包含的信息结构，该信息结构由 MapGIS 矢量要素的几何、空间、图形组成

| 参数名      | 类型   | 说明                                                                                             |
| ----------- | ------ | ------------------------------------------------------------------------------------------------ |
| opt_options | Object | （可选）设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2 …} |

- `opt_options`属性主要参数

| 属性              | 类型    | 默认值 | 描述                 |
| ----------------- | ------- | ------ | -------------------- |
| IncludeAttribute  | Boolean | TRUE   | 是否包含属性值       |
| IncludeGeometry   | Boolean | FALSE  | 是否包含几何图形信息 |
| IncludeWebGraphic | Boolean | FALSE  | 颜色的 R 值          |

#### 2.【要素查询规则类】`Zondy.Service.QueryFeatureRule(opt_options)`

| 参数名      | 类型   | 描述                                                                                             |
| ----------- | ------ | ------------------------------------------------------------------------------------------------ |
| opt_options | Object | （可选）设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2 …} |

- `opt_options`属性主要参数

| 属性                   | 类型    | 默认值 | 描述                                                           |
| ---------------------- | ------- | ------ | -------------------------------------------------------------- |
| CompareRectOnly        | Boolean | FALSE  | 是否仅比较要素的外包矩形，来判定是否与几何约束图形有交集。     |
| EnableDisplayCondition | Boolean | FALSE  | 是否将要素的可见性计算在内，来判定是否与几何约束图形有交集。   |
| MustInside             | Boolean | FALSE  | 是否完全包含在几何约束图形内，来判定是否与几何约束图形有交集。 |
| Intersect              | Boolean | FALSE  | 是否与几何约束图形相交，来判定是否与几何约束图形有交集。       |

#### 3.【矢量图层查询参数类】`Zondy.Service.QueryByLayerParameter(gdbp, opt_options)`

创建矢量图层查询参数，参数中包含几何描述、查询 SQL 语句、FID（OID）等查询条件，通过这些条件查询 MapGIS 中矢量图层的信息

| 参数名      | 类型   | 描述                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gdbp        | String | 矢量图层 URL 地址信息（包括源要素类存储路径与名称），用户根据语法设置 URL 地址，或在数据库中图层节点上右击选择“复制 URL”获得。                                                                                                                                                                                                                                                                                   |
| opt_options | Object | （可选）设置其他属性键值对对象。对象中的属性来自本类的属性和 <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryParameter.html" target="_blank">Zondy.Service.QueryParameter</a> 类、 <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryParameterBase.html" target="_blank">Zondy.Service.QueryParameterBase </a>类的属性。例如：{key1： value1, key2 ：value2 …} |

- `opt_options`属性主要参数（来自<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryParameterBase.html" target="_blank">Zondy.Service.QueryParameterBase</a>）

| 属性         | 类型                                                                                                                                                    | 默认值 | 描述                                                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| geometry     | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Tangram.html" target="_blank">Zondy.Object.Tangram</a>                              | Null   | 用于查询的几何描述                                                                                                                                                              |
| where        | String                                                                                                                                                  | Null   | 条件查询的 SQL 语句，如果为空，则表示为单一的几何查询；如果取值，表示为几何和条件混合查询。当 SQL 语句永为真时，如“1>0”，表示查询全部。                                         |
| rule         | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryFeatureRule.html" target="_blank">Zondy.Service.<br/>QueryFeatureRule</a>     | Null   | 几何查询的规则                                                                                                                                                                  |
| objectIds    | String                                                                                                                                                  | Null   | 需要查询的要素 OID 号，多个间用‘，’分隔，如”OID1,OID2…”。如果此参数有值，查询将默认转化为使用要素 ID 查询，而忽略条件查询。                                                     |
| pageIndex    | Number                                                                                                                                                  | 0      | 分页号                                                                                                                                                                          |
| recordNumber | Number                                                                                                                                                  | 20     | 每页记录数                                                                                                                                                                      |
| resultFormat | String                                                                                                                                                  | json   | 查询结果的序列化形式，取值为：json\|\|xml\|kml\|gml\|georss，对于 xml，kml，gml 或者 georss 格式的类 xml 类型将以 text 文本返回，如需要可调用\$.parseXML(text)得到其 xml 形式。 |
| struct       | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryFeatureStruct.html" target="_blank">Zondy.Service.<br/>QueryFeatureStruct</a> | Null   | 指定查询返回结果所包含的要素信息                                                                                                                                                |
| orderField   | String                                                                                                                                                  | Null   | 指定查询返回结果的排序字段，只有当 isAsc=true 时才有效。                                                                                                                        |
| isAsc        | Boolean                                                                                                                                                 | FALSE  | 是否升序排列，与 orderField 配合使用。                                                                                                                                          |
| guid         | String                                                                                                                                                  | Null   | 地图缓存唯一标识，一般情况下无需赋值。                                                                                                                                          |
| cursorType   | String                                                                                                                                                  | Null   | 光标类型                                                                                                                                                                        |
| fields       | String                                                                                                                                                  | Null   | 过滤字段                                                                                                                                                                        |
| dataService  | String                                                                                                                                                  | Null   | 查询的地图文档的名称（主要用于时空云）                                                                                                                                          |
| layerIdxs    | Number                                                                                                                                                  | Null   | 图层索引号，默认从 0 开始。                                                                                                                                                     |

#### 4.【矢量地图文档的查询服务类】`Zondy.Service.QueryDocFeature(queryParam, docName, layerIndex, opt_options )`

创建矢量地图文档的查询服务，主要用于查询 MapGIS 中矢量地图文档的信息

| 参数名      | 类型                                                                                                                                      | 描述                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| queryParam  | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryParameter.html" target="_blank">Zondy.Object.QueryParameter</a> | 查询参数信息                                                                                                                                                                                                                                                                                                                                                                                           |
| docName     | String                                                                                                                                    | 地图文档名称。                                                                                                                                                                                                                                                                                                                                                                                         |
| layerIndex  | Number                                                                                                                                    | 图层索引号，默认从 0 开始。多图层间以“,”号分隔。                                                                                                                                                                                                                                                                                                                                                       |
| opt_options | Object                                                                                                                                    | （可选）设置其他属性键值对对象。对象中的属性来自本类的属性和 <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryServiceBase.html" target="_blank">Zondy.Service.QueryServiceBase</a> 类、 <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.HttpRequest.html" target="_blank">Zondy.Service.HttpRequest</a> 类的属性。例如：{key1： value1, key2 ：value2 …} |

- `opt_options`属性主要参数（来自<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryServiceBase.html" target="_blank">Zondy.Service.QueryServiceBase</a>）

| 属性           | 类型                                                                                                                                       | 默认值 | 描述                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ------------------------------------- |
| resultCallBack | String                                                                                                                                     | Null   | 查询结果返回格式，取值为：json\|xml。 |
| queryParam     | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryParameter.html" target="_blank">Zondy.Service.QueryParameter</a> | Null   | 基于矢量地图文档的查询参数            |
| requestType    | String                                                                                                                                     | GET    | 请求方式，取值为：GET\|POST。         |

- `opt_options`属性参数说明（来自<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.HttpRequest.html" target="_blank">Zondy.Service.HttpRequest</a>）

| 属性         | 类型   | 默认值    | 描述                                                                                                                                                                                                        |
| ------------ | ------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ip           | String | localhost | 服务器 ip 地址，如本地默认为“127.0.0.1”或“localhost”                                                                                                                                                        |
| port         | String | 6163      | 服务器端口号                                                                                                                                                                                                |
| ProxyHost    | String | Null      | 使用代理的地址                                                                                                                                                                                              |
| resultFormat | String | json      | 请求成功时回调结果格式，取值为'json','xml','kml','gml',georss'，默认为‘json’。对于 resultFormat 参数为 xml，kml，gml 或者 georss 格式，将以 text 文本返回，如需要可以调用\$.parseXML(text)得到其 xml 格式。 |

##### 【method】query(onSuccess,onError,requestType,options)：矢量图层查询服务执行查询操作的函数

- `query`主要参数（来自<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryServiceBase.html" target="_blank">Zondy.Service.QueryServiceBase</a>）

| 参数名      | 类型     | 说明                                   |
| ----------- | -------- | -------------------------------------- |
| onSuccess   | Function | 成功回调函数                           |
| onError     | Function | 失败回调函数                           |
| requestType | String   | 请求方式，取值为：GET\|POST            |
| options     | Object   | （可选）设置其他扩展 ajax 请求补充参数 |

#### 5.【MapBox 样式规范】source

数据源表明地图应显示哪些数据。 使用“type”属性指定数据源的类型，该属性必须是`vector`,`raster`,`raster-dem`,`geojson`,`image`,`video`之一。 添加数据源不足以使数据显示在地图上，因为数据源不包含颜色或宽度等样式细节。 图层通过指定数据源及设置相关的样式进行可视化表达。 这样就可以用不同的方式对同一数据源进行样式设置，例如在高速公路图层中区分不同类型的道路。

示例中使用`geojson`类型数据源，数据必须通过`data`属性提供，其值可以是 URL 或内联`geojson`。

内联 geojson：

```json
"geojson-marker": {
    "type": "geojson",
    "data": {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-77.0323, 38.9131]
        },
        "properties": {
            "title": "Mapbox DC",
            "marker-symbol": "monument"
        }
    }
}
```

通过 URL 方式加载 geojson：

```json
"geojson-lines": {
    "type": "geojson",
    "data": "./lines.geojson"
}
```

- `geojson`类型的 source 属性说明

| 属性           | 类型           | 默认值 | 描述                                                                                                                                 |
| -------------- | -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| data           | string\|object | 无     | GeoJSON 文件的 URL 或内联 GeoJSON                                                                                                    |
| maxzoom        | number         | 18     | 创建矢量切片的最大缩放级别（更高意味着在高缩放级别更高的细节）                                                                       |
| attribution    | string         | 无     | 包含向用户显示地图时要显示的属性                                                                                                     |
| buffer         | number         | 128    | 每侧的瓦片缓冲区的大小。0 不产生缓冲区，512 会生成与瓦片本身一样宽的缓冲区。较大的值会在拼贴边缘附近产生较少的渲染瑕疵，并且性能较慢 |
| tolerance      | number         | 0.375  | Douglas-Peucker 简化公差（更高意味着更简单的几何形状和更快的性能）                                                                   |
| cluster        | boolean        | 512    | 如果数据是点要素的集合，则将此设置为 true 会将点数据按半径聚合分组                                                                   |
| clusterRadius  | enum           | 50     | 如果启用了聚合，该参数为每个聚合结果的半径，值大于等于 0。512 表示半径等于瓦片的宽度                                                 |
| clusterMaxZoom | string         | 无     | 如果启用了聚合，则最大缩放以聚集点。默认为小于 maxzoom 的一个缩放（以便最后缩放功能不会聚集）                                        |
| lineMetrics    | boolean        | FALSE  | 是否计算行距离度量。对于指定行渐变值的线图层，这是必需的                                                                             |
| generateId     | boolean        | FALSE  | 是否为 geojson 功能生成 id。启用后，将根据 feature 数组中的索引自动分配 feature.id 属性，覆盖以前的任何值                            |
