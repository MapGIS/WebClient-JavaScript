## FID查询

### 示例功能

本示例在二维视图中加载显示一个地图文档服务数据，坐标系为`Web墨卡托`，使用`FID查询`MapGIS矢量图层中地图要素相关的信息。

### 示例实现

本示例需要使用include-mapboxgl-local.js开发库实现，通过关键接口`Zondy.Service.QueryLayerFeature()`实现MapGIS矢量图层的`FID查询`功能。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

> MapGIS IGServer发布地图文档服务请参见`MapGIS IGServer`目录下的`地图-EPSG3857`示例的说明部分

### 实现步骤

1. 引用开发库，本示例通过本地离线include-mapboxgl-local.js脚本引入开发库；

2. 创建`id="map"`的div作为地图容器，并设置其样式；

3. 创建地图对象，设置地图的必要参数，如地图div容器、缩放层级、中心点等，以及在地图中添加地图文档图层，具体操作参考`MapGIS IGServer`目录下的`地图-EPSG3857`示例；

4. 创建**矢量图层查询服务对象**，并使用该对象执行查询操作；

   * 设置查询包含的信息结构

     ```javascript
     //初始化查询结构对象，设置查询结构包含几何信息
     var queryStruct = new Zondy.Service.QueryFeatureStruct({
         IncludeGeometry: true,//是否包含几何图形信息
         IncludeAttribute: true,//是否包含属性信息
         IncludeWebGraphic: false//是否包含图形显示参数
     });
     ```

   * 设置查询参数

     ```javascript
     //实例化查询参数对象
     var queryParam = new Zondy.Service.QueryByLayerParameter("gdbp://MapGisLocal/ClientTheme/ds/epsg4326/sfcls/湖北省市级区划2", {
         objectIds: "4,5",
         pageIndex: 0,
         recordNumber: 50,
         struct: queryStruct,
     });
     ```

   * 创建矢量图层查询服务对象，执行查询操作

     ```javascript
     //实例化地图文档查询服务对象
     var queryService = new Zondy.Service.QueryLayerFeature(queryParam, {
         //IP地址
         ip: "develop.smaryun.com",
         //端口号
         port: "6163"
     });
     //执行查询操作，querySuccess为成功回调，queryError为失败回调
     queryService.query(querySuccess, queryError);
     ```

5. 查询结果展示，在查询成功的回调函数中将查询结果格式化为<a href="https://geojson.org/" target="_blank">GeoJSON</a>格式，以图层的方式添加到地图中；

   ```javascript
   //将多边形添加到一个图层中，在地图中显示
   map.addLayer({
       //此id可随意设置，但是要唯一
       "id": id,
       //指定类型为fill（填充区域）
       "type": "fill",
       //设置数据来源
       "source": {
           "type": "geojson",
           "data": geometryPolygon
       },
       //设置绘制参数
       "paint": {
           //设置填充颜色
           "fill-color": options.fillColor,
           //设置透明度
           "fill-opacity": options.fillOpacity,
           "fill-outline-color": options.fillOutlineColor
       }
   });
   ```

### 关键接口

#### 1.【指定查询获取的要素包含的信息结构】QueryFeatureStruct

##### `Zondy.Service.QueryFeatureStruct(opt_options)`：查询要素信息结构的构造函数

通过这个接口指定查询获取的要素包含的信息结构，该信息结构由MapGIS矢量要素的几何、空间、图形组成

> `QueryFeatureStruct`主要参数

| 参数名      | 类型   | 说明                                                         |
| ----------- | ------ | ------------------------------------------------------------ |
| opt_options | Object | （可选）设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2 …} |

> `opt_options`属性参数说明

| 属性              | 类型    | 默认值 | 描述                 |
| ----------------- | ------- | ------ | -------------------- |
| IncludeAttribute  | Boolean | TRUE   | 是否包含属性值       |
| IncludeGeometry   | Boolean | FALSE  | 是否包含几何图形信息 |
| IncludeWebGraphic | Boolean | FALSE  | 颜色的R值            |

#### 2.【基于矢量图层的查询参数】QueryByLayerParameter

##### `Zondy.Service.QueryByLayerParameter(gdbp, opt_options)`：矢量图层查询参数的构造函数

创建矢量图层查询参数，参数中包含几何描述、查询SQL语句、FID（OID）等查询条件，通过这些条件查询MapGIS中矢量图层的信息

> `QueryByLayerParameter`主要参数

| 参数名      | 类型   | 描述                                                         |
| ----------- | ------ | ------------------------------------------------------------ |
| gdbp        | String | 矢量图层URL地址信息（包括源要素类存储路径与名称），用户根据语法设置URL地址，或在数据库中图层节点上右击选择“复制URL”获得。 |
| opt_options | Object | （可选）设置其他属性键值对对象。对象中的属性来自本类的属性和 <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryParameter.html" target="_blank">Zondy.Service.QueryParameter</a> 类、 <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryParameterBase.html" target="_blank">Zondy.Service.QueryParameterBase </a>类的属性。例如：{key1： value1, key2 ：value2 …} |

> `opt_options`属性参数说明（来自<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryParameterBase.html" target="_blank">Zondy.Service.QueryParameterBase</a>）

| 属性         | 类型                                                         | 默认值 | 描述                                                         |
| ------------ | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| geometry     | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Tangram.html" target="_blank">Zondy.Object.Tangram</a> | Null   | 用于查询的几何描述                                           |
| where        | String                                                       | Null   | 条件查询的SQL语句，如果为空，则表示为单一的几何查询；如果取值，表示为几何和条件混合查询。当SQL语句永为真时，如“1>0”，表示查询全部。 |
| rule         | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryFeatureRule.html" target="_blank">Zondy.Service.<br/>QueryFeatureRule</a> | Null   | 几何查询的规则                                               |
| objectIds    | String                                                       | Null   | 需要查询的要素OID号，多个间用‘，’分隔，如”OID1,OID2…”。如果此参数有值，查询将默认转化为使用要素ID查询，而忽略条件查询。 |
| pageIndex    | Number                                                       | 0      | 分页号                                                       |
| recordNumber | Number                                                       | 20     | 每页记录数                                                   |
| resultFormat | String                                                       | json   | 查询结果的序列化形式，取值为：json\|\|xml\|kml\|gml\|georss，对于xml，kml，gml或者georss格式的类xml类型将以text文本返回，如需要可调用$.parseXML(text)得到其xml形式。 |
| struct       | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryFeatureStruct.html" target="_blank">Zondy.Service.<br/>QueryFeatureStruct</a> | Null   | 指定查询返回结果所包含的要素信息                             |
| orderField   | String                                                       | Null   | 指定查询返回结果的排序字段，只有当isAsc=true时才有效。       |
| isAsc        | Boolean                                                      | FALSE  | 是否升序排列，与orderField配合使用。                         |
| guid         | String                                                       | Null   | 地图缓存唯一标识，一般情况下无需赋值。                       |
| cursorType   | String                                                       | Null   | 光标类型                                                     |
| fields       | String                                                       | Null   | 过滤字段                                                     |
| dataService  | String                                                       | Null   | 查询的地图文档的名称（主要用于时空云）                       |
| layerIdxs    | Number                                                       | Null   | 图层索引号，默认从0开始。                                    |

#### 3.【矢量图层的查询服务】QueryLayerFeature

##### （1）`Zondy.Service.QueryLayerFeature(queryParam, opt_options)`：矢量图层查询服务的构造函数

创建矢量图层的查询服务，主要用于查询MapGIS中矢量图层的信息

> `QueryLayerFeature`主要参数

| 参数名      | 类型                                                         | 描述                                                         |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| queryParam  | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryParameter.html" target="_blank">Zondy.Object.QueryParameter</a> | 查询参数信息                                                 |
| opt_options | Object                                                       | （可选）设置其他属性键值对对象。对象中的属性来自本类的属性和 <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryServiceBase.html" target="_blank">Zondy.Service.QueryServiceBase</a> 类、 <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.HttpRequest.html" target="_blank">Zondy.Service.HttpRequest</a> 类的属性。例如：{key1： value1, key2 ：value2 …} |

> `opt_options`属性参数说明（来自<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryServiceBase.html" target="_blank">Zondy.Service.QueryServiceBase</a>）

| 属性           | 类型                                                         | 默认值 | 描述                                  |
| -------------- | ------------------------------------------------------------ | ------ | ------------------------------------- |
| resultCallBack | String                                                       | Null   | 查询结果返回格式，取值为：json\|xml。 |
| queryParam     | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryParameter.html" target="_blank">Zondy.Service.QueryParameter</a> | Null   | 基于矢量地图文档的查询参数            |
| requestType    | String                                                       | GET    | 请求方式，取值为：GET\|POST。         |

> `opt_options`属性参数说明（来自<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.HttpRequest.html" target="_blank">Zondy.Service.HttpRequest</a>）

| 属性         | 类型   | 默认值    | 描述  |
| ------------ | ------ | --------- | ------------------------------------------------------------ |
| ip           | String | localhost | 服务器ip地址，如本地默认为“127.0.0.1”或“localhost”           |
| port         | String | 6163      | 服务器端口号                                                 |
| ProxyHost    | String | Null      | 使用代理的地址                                               |
| resultFormat | String | json      | 请求成功时回调结果格式，取值为'json','xml','kml','gml',georss'，默认为‘json’。对于resultFormat参数为xml，kml，gml或者georss格式，将以text文本返回，如需要可以调用$.parseXML(text)得到其xml格式。 |

##### （2）query(onSuccess,onError,requestType,options)：矢量图层查询服务执行查询操作的函数

> `query`主要参数（来自<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryServiceBase.html" target="_blank">Zondy.Service.QueryServiceBase</a>）

| 参数名      | 类型     | 说明                                 |
| ----------- | -------- | ------------------------------------ |
| onSuccess   | Function | 成功回调函数                         |
| onError     | Function | 失败回调函数                         |
| requestType | String   | 请求方式，取值为：GET\|POST          |
| options     | Object   | （可选）设置其他扩展ajax请求补充参数 |

#### 4.【MapBox样式规范】source

数据源表明地图应显示哪些数据。 使用“type”属性指定数据源的类型，该属性必须是`vector`,`raster`,`raster-dem`,`geojson`,`image`,`video`之一。 添加数据源不足以使数据显示在地图上，因为数据源不包含颜色或宽度等样式细节。 图层通过指定数据源及设置相关的样式进行可视化表达。 这样就可以用不同的方式对同一数据源进行样式设置，例如在高速公路图层中区分不同类型的道路。

示例中使用`geojson`类型数据源，数据必须通过`data`属性提供，其值可以是URL或内联`geojson`。

内联geojson：

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

通过URL方式加载geojson：

```json
"geojson-lines": {
    "type": "geojson",
    "data": "./lines.geojson"
}
```

> `geojson`类型的source属性说明

| 属性           | 类型           | 默认值 | 描述                                                         |
| -------------- | -------------- | ------ | ------------------------------------------------------------ |
| data           | string\|object | 无     | GeoJSON文件的URL或内联GeoJSON                                |
| maxzoom        | number         | 18     | 创建矢量切片的最大缩放级别（更高意味着在高缩放级别更高的细节） |
| attribution    | string         | 无     | 包含向用户显示地图时要显示的属性                             |
| buffer         | number         | 128    | 每侧的瓦片缓冲区的大小。0不产生缓冲区，512会生成与瓦片本身一样宽的缓冲区。较大的值会在拼贴边缘附近产生较少的渲染瑕疵，并且性能较慢 |
| tolerance      | number         | 0.375  | Douglas-Peucker简化公差（更高意味着更简单的几何形状和更快的性能） |
| cluster        | boolean        | 512    | 如果数据是点要素的集合，则将此设置为true会将点数据按半径聚合分组 |
| clusterRadius  | enum           | 50     | 如果启用了聚合，该参数为每个聚合结果的半径，值大于等于0。512表示半径等于瓦片的宽度 |
| clusterMaxZoom | string         | 无     | 如果启用了聚合，则最大缩放以聚集点。默认为小于maxzoom的一个缩放（以便最后缩放功能不会聚集） |
| lineMetrics    | boolean        | FALSE  | 是否计算行距离度量。对于指定行渐变值的线图层，这是必需的     |
| generateId     | boolean        | FALSE  | 是否为geojson功能生成id。启用后，将根据feature数组中的索引自动分配feature.id属性，覆盖以前的任何值 |