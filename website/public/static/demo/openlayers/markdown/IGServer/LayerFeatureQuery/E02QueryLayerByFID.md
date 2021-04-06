## FID 查询

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例实现FID查询矢量图层，高亮显示结果要素的功能，显示“世界政区”。

### 示例实现

本示例需要使用【include-openlayers-local.js】开发库实现。通过`Zondy.Service.QueryLayerFeature`实例化服务，通过`query`方法进行查询。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线【include-openlayers-local.js】脚本引入开发库；

**Step 2. <font color=red>创建地图容器</font>**：
&ensp;&ensp;&ensp;&ensp;再创建`id="mapCon"`的 div，并设置其样式；

* Example

    ```javascript
        <div id="mapCon"></div>
    ```

**Step 3. <font color=red>创建地图对象</font>**：
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数；

* Example

    ```javascript
        //初始化地图容器
        map = new ol.Map({
            target: 'mapCon',     //地图容器div的ID
            controls: ol.control.defaults({
                attributionOptions: ({
                    collapsible: true
                })
            }),
            view: new ol.View({
                center: [0, 0],
                zoom: 3,
                projection: 'EPSG:4326'
            }),
            layers:[TiandiMap_vectIGS,TiandiMap_ciaIGS]
        });
    ```

**Step 4. <font color=red>初始化查询结构对象</font>**：
&ensp;&ensp;&ensp;&ensp;初始化查询结构对象`Zondy.Service.QueryFeatureStruct`，设置查询结构包含几何信息；

* Example

    ```javascript
        //初始化查询结构对象，设置查询结构包含几何信息
        var queryStruct = new Zondy.Service.QueryFeatureStruct()
        //是否包含几何图形信息
        queryStruct.IncludeGeometry = true
        //是否包含属性信息
        queryStruct.IncludeAttribute = true
        //是否包含图形显示参数
        queryStruct.IncludeWebGraphic = false
    ```

**Step 5. <font color=red>初始化查询参数对象</font>**：
&ensp;&ensp;&ensp;&ensp;实例化查询参数对象`Zondy.Service.QueryByLayerParameter`，设置查询要素数目`recordNumber`、要查询的要素OID号 `objectIds`;

* Example

    ```javascript
        //实例化查询参数对象
        var queryParam = new Zondy.Service.QueryByLayerParameter('gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区', {
            objectIds: objectIds,
            resultFormat: 'json',
            struct: queryStruct,
        })
        //设置查询分页号
        queryParam.pageIndex = 0
        //设置查询要素数目
        queryParam.recordNumber = 20
    ```

**Step 6. <font color=red>初始化矢量图层查询服务对象</font>**：

&ensp;&ensp;&ensp;&ensp;实例化矢量图层查询服务对象`Zondy.Service.QueryLayerFeature`，并调用`QueryLayerFeature`对象的`query`方法，执行查询；

* Example

    ```javascript
        //实例化地图文档查询服务对象
        var queryService = new Zondy.Service.QueryLayerFeature(queryParam, {
            ip: 'develop.smaryun.com',
            port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
        })
        //执行查询操作，querySuccess为查询回调函数
        queryService.query(querySuccess, queryError)
    ```

**Step 7. <font color=red>将MapGIS要素JSON反序列化为ol.Feature类型</font>**：

&ensp;&ensp;&ensp;&ensp;在查询结果回调函数中初始化`Zondy.Format.PolygonJSON`类，调用该类的`read`方法，获取查询结果中的`features`，调用 `drawSource`对象的`addFeatures`方法将要素添加到矢量图层数据源，初始化用于高亮显示结果的图层类`ol.Layer.Vector`，通过`Map`对象的`addLayers `方法加载结果图层。

* Example

    ```javascript
        //初始化Zondy.Format.PolygonJSON类
        var format = new Zondy.Format.PolygonJSON()
        //将MapGIS要素JSON反序列化为ol.Feature类型数组
        var features = format.read(result)

        //实例化一个矢量图层drawLayerr用于高亮显示结果
        var drawSource = new ol.source.Vector({
            wrapX: false,
        })
        drawSource.addFeatures(features)
        drawLayer = new ol.layer.Vector({
            source: drawSource,
            style: new ol.style.Style({
                //填充色
                fill: new ol.style.Fill({
                    color: 'rgba(255, 0, 0, 0.5)',
                }),
                //边线样式
                stroke: new ol.style.Stroke({
                    color: 'rgba(255,204, 51, 1)',
                    width: 1,
                }),
            }),
        })

        map.addLayer(drawLayer)
        map.setView(
            new ol.View({
                center: [110, 30],
                zoom: 4,
                projection: 'EPSG:4326',
            })
        )
    ```

### 关键接口

#### 1.【查询结构对象】`Zondy.Service.QueryFeatureStruct（opt_options）`

| 参数名 | 类型   | 描述                                                                                             |
| ------------ | ------ | ------------------------------------------------------------------------------------------------ |
| opt_options  | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2 …} |

* `opt_options`属性主要参数

| 属性              | 类型    | 描述                 | 默认值 |
| ----------------- | ------- | -------------------- | ------ |
| IncludeAttribute  | Boolean | 是否包含属性值       | True   |
| IncludeGeometry   | Boolean | 是否包含几何图形信息 | False  |
| IncludeWebGraphic | Boolean | 颜色的 R 值          | False  |

#### 2.【查询参数对象】`Zondy.Service.QueryByLayerParameter(gdbp, opt_options)`

| 参数名 | 类型   | 描述|
| ------------| ------ | --------------------- |
| gdbp        | String | 矢量图层 URL 地址信息（包括源要素类存储路径与名称），用户根据语法设置 URL 地址，或在数据库中图层节点上右击选择“复制 URL”获得。                                                   |
| opt_options  | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性和 Zondy.Service.QueryParameter 类、 Zondy.Service.QueryParameterBase 类的属性。例如：{key1： value1, key2 ：value2 …} |

#### 3.【查询服务对象】`Zondy.Service.QueryLayerFeature(queryParam, opt_options)`

| 参数名         | 类型                        | 描述           |
| ------------ | --------------------------- | --------------|
| queryParam   | Zondy.Object.QueryParameter | 查询参数信息   |
| opt_options  | Object                      | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性和 Zondy.Service.QueryServiceBase 类、 Zondy.Service.HttpRequest 类的属性。例如：{key1： value1, key2 ：value2 …} |

##### 【method】`getParameterURL`获取相关参数的REST-URL表示形式


#### 4.【要素序列化对象】`Zondy.Format.PolygonJSON(opt_options)`

| 参数名 | 类型   | 描述     |
| ------------ | ------ | ------- |
| opt_options  | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的 属性 。例如：{key1：value1, key2：value2…} |

##### 【method】`readread(json)`将MapGIS要素集反序列化为opanlayers要素数组

| 参数名         | 类型    | 描述    |
| ------------ | ------ | ------- |
|json          | String |MapGIS要素集|

##### 【method】`parseGeometry(fGeom, type)`将MapGIS要素几何转换成openlayers要素几何

| 参数名 | 类型                                 | 描述                                   |
| ------------ | ------                       | -------                               |
|fGeom         | Zondy.Object.FeatureGeometry |MapGIS 要素几何图形                     |
|type          | Number                       |要素几何类型，取值范围：1:点;2:线;3:多边形|

##### 【method】`parseGRegion(gRegions)`将MapGIS的多个区转换成openlayers的多区

| 参数名         | 类型    | 描述    |
| ------------ | ------ | ------- |
|gRegions          | Array-[Zondy.Object.GRegion] |MapGIS 区几何|

##### 【method】`parseGLine(glines)`将MapGIS的多条线转换成openlayers的多线

| 参数名         | 类型    | 描述    |
| ------------ | ------ | ------- |
|glines          | Array-[Zondy.Object.GLine] |MapGIS 线几何|

##### 【method】`parseGPoint(gpoint)`将MapGIS的多个点转换成openlayers的多点

| 参数名         | 类型    | 描述    |
| ------------ | ------ | ------- |
|gpoint          | Array-[Zondy.Object.GPoint] |MapGIS 点几何|
