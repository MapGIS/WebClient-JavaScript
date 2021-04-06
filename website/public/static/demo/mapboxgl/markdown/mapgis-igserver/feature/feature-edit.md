## 要素编辑

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例在二维视图中加载显示一个矢量图层数据，坐标系为`WGS84`，重点内容为`矢量图层要素编辑`，包含 MapGIS 矢量图层中地图要素信息的添加、更新、删除操作。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-mapboxgl-local.js】开发库实现，通过关键接口`Zondy.Service.EditLayerFeature()`实现 MapGIS 矢量图层的`要素编辑`功能。

> 开发库使用请参见*首页-概述-调用方式*。

##### MapGIS Desktop 获取矢量图层 URL：

<img src="../static/demo/mapboxgl/markdown/mapgis-igserver/feature/copy_sfcls_url.png" alt="获取矢量图层URL" style="zoom:60%;" />

获取到的矢量图层 URL 如下：`gdbp://MapGisLocal/Templates/sfcls/湖北省县驻地`

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;引用开发库，本示例通过本地离线【include-mapboxgl-local.js 】脚本引入开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="map"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数，如地图 div 容器、缩放层级、中心点等，具体操作参考`互联网地图`目录下的`天地图经纬度`示例；

**Step 4. <font color=red>创建矢量图层对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建**矢量图层对象**，将 MapGIS 矢量图层添加到地图中，其中**行政区**图层（gdbp://MapGisLocal/武汉市区/sfcls/行政区）作为底图，**点编辑**图层（gdbp://MapGisLocal/武汉市区/sfcls/点编辑）是进行矢量要素编辑的图层；

- Example:
  ```javascript
    guid = new Date().getTime().toString()
    //创建矢量图层
    vectorLayer = new mapboxgl.Zondy.Map.MapVectorLayer(['gdbp://MapGisLocal/ClientTheme/ds/epsg4326/sfcls/湖北省市级区划2', 'gdbp://MapGisLocal/ClientTheme/ds/epsg4326/sfcls/点编辑'], {
      //IP地址
      ip: 'develop.smaryun.com',
      //端口号
      port: '6163',
      //只显示一个图层,不平铺显示
      noWrap: true,
      //添加guid，确保图层从IGS中加载，不读取缓存文件
      guid: guid,
    })
    vectorLayer.addToMap(map)
  ```

**Step 5. <font color=red>创建示例图层要素编辑对象</font>**；
&ensp;&ensp;&ensp;&ensp;创建**矢量图层要素编辑**对象，并使用该对象执行添加、更新、删除操作；

- 创建要素数据集

* Example：
  ```javascript
    //创建一个点形状，描述点形状的几何信息
    var gpoint = new Zondy.Object.GPoint(114.3, 30.59)
    //设置当前点要素的几何信息
    var fGeom = new Zondy.Object.FeatureGeometry({ PntGeom: [gpoint] })
    //描述点要素的符号参数信息
    var pointInfo = new Zondy.Object.CPointInfo({
      Angle: 0,
      Color: color,
      Space: 0,
      SymHeight: 10,
      SymID: 98,
      SymWidth: 10,
    })
    //设置当前点要素的图形参数信息
    var webGraphicInfo = new Zondy.Object.WebGraphicsInfo({
      InfoType: 1,
      PntInfo: pointInfo,
    })
    //设置添加点要素的属性信息
    var attValue = ['1', '市政协', '', '', '江岸区', '0', '0']
    //创建一个要素
    var feature = new Zondy.Object.Feature({
      fGeom: fGeom,
      GraphicInfo: webGraphicInfo,
      AttValue: attValue,
    })
    //设置要素为点要素
    feature.setFType(1)
    //设置更新要素的FID
    if (fid !== undefined && fid !== null) {
      feature.setFID(fid)
    }
    //创建一个要素数据集
    var featureSet = new Zondy.Object.FeatureSet()
    featureSet.clear()
    //设置属性结构
    var cAttStruct = new Zondy.Object.CAttStruct({
      FldNumber: 7,
      FldName: ['ID', '名称', '地址', '图片', '城区', 'LayerID', 'mpLayer'],
      FldType: ['long', 'string', 'string', 'string', 'string', 'long', 'long'],
      FldAlias: [null, null, null, null, null, null, null],
    })
    featureSet.AttStruct = cAttStruct
    //添加要素到要素数据集
    featureSet.addFeature(feature)
  ```

- 创建矢量图层要素编辑对象，执行添加、更新、删除操作，分别对应 add()、update()、deletes()方法；

* Example:

  ```javascript
    //创建一个编辑服务类
    var editService = new Zondy.Service.EditLayerFeature('gdbp://MapGisLocal/ClientTheme/ds/epsg4326/sfcls/点编辑', { ip: 'develop.smaryun.com', port: '6163' })
    //执行添加点要素功能,OnSuccess为回调函数
    editService.add(featureSet, addSuccess)
    editService.update(featureSet, UpdateSuccess)
    editService.deletes(featureIds, deleteSuccess)
    ```

    > 矢量图层要素`更新`与`删除`操作必须有`FID`，所以进行这 2 个操作前，先查询要素是否存在。关于矢量图层要素查询请参考`FID查询`、`要素查询`

  * Example：
    ```javascript
    //初始化查询结构对象，设置查询结构包含几何信息
    var queryStruct = new Zondy.Service.QueryFeatureStruct()
    //是否包含几何图形信息
    queryStruct.IncludeGeometry = false
    //是否包含属性信息
    queryStruct.IncludeAttribute = true
    //是否包含图形显示参数
    queryStruct.IncludeWebGraphic = false
    //实例化查询参数对象
    var queryParam = new Zondy.Service.QueryByLayerParameter('gdbp://MapGisLocal/武汉市区/sfcls/点编辑', {
      resultFormat: 'json',
      struct: queryStruct,
    })
    //设置查询要素数目
    queryParam.recordNumber = 1000
    //设置属性条件
    queryParam.where = "名称='市政协'"
    //实例化地图文档查询服务对象
    var queryService = new Zondy.Service.QueryLayerFeature(queryParam, {
      ip: 'develop.smaryun.com',
      port: '6163',
    })
    //执行查询操作，querySuccess为查询回调函数
    //queryService.query(querySuccess);
    const promise = new Promise(resolve => {
      queryService.query(res => {
        if (!res || !res.SFEleArray || res.SFEleArray.length <= 0) {
          resolve(null)
        } else {
          // 获取属性值，还需知道res.AttStruct，才能将值与属性名对应起来
          resolve(res)
        }
      })
    })
  ```

**Step 6. <font color=red>结果展示</font>**:
&ensp;&ensp;&ensp;&ensp;编辑结果展示，在编辑成功的回调函数中刷新矢量图层即可查看编辑结果。

- Example:
  ```javascript
    vectorLayer.refreshMap(guid)
  ```

### 关键接口

#### 1.【矢量图层类】`mapboxgl.Zondy.Map.MapVectorLayer(gdbps, option)`

通过该类将 MapGIS 矢量图层加载到地图中

| 参数名 | 类型   | 说明                                                                                             |
| ------ | ------ | ------------------------------------------------------------------------------------------------ |
| gdbps  | String | 必选。图层的 gdbps 地址，允许多个图层，以“,”隔开                                                 |
| option | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2 …} |

- `option`属性主要参数

| 属性            | 类型   | 默认值                                       | 描述                                                                                                                                                                                                                                     |
| --------------- | ------ | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| domain          | String | ''                                           | 【domain 和（networkProtocol，ip，port）二选一】。域名                                                                                                                                                                                   |
| networkProtocol | String | location.protocol.split(":" )[0] \|\| "http" | 【domain 和（networkProtocol，ip，port）二选一】。网络协议                                                                                                                                                                               |
| ip              | String | localhost                                    | 【domain 和（networkProtocol，ip，port）二选一】。地图服务 ip                                                                                                                                                                            |
| port            | String | 6163                                         | 【domain 和（networkProtocol，ip，port）二选一】。地图服务端口                                                                                                                                                                           |
| filters         | String | null                                         | （可选）用户指定的图层过滤条件，它由多个键值对组成，值为过滤条件。例：filters=1:ID>4,3:ID>1                                                                                                                                              |
| style           | String | null                                         | （可选）用户指定的图层显示样式，每个 gdbp 对应一个 style，style 为 CDisplayStyleExtend 的 json 序列化形式，多个 style 之间用“，”隔开。例：sytles=[{index:0,symbleshow:true,followscale:true},{index:1,symbleshow:true,FollowScale:true}] |
| f               | String | null                                         | （可选）矢量图片的格式。jpg\|png\|gif(默认)                                                                                                                                                                                              |
| tileSize        | String | 512                                          | （可选）瓦片大小                                                                                                                                                                                                                         |

#### 2.【点几何类】`Zondy.Object.GPoint(x, y, opt_options)`

| 参数名      | 类型   | 描述                                                                                                                                                                                                                                                        |
| ----------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x           | Number | 点 x 轴坐标                                                                                                                                                                                                                                                 |
| y           | Number | 点 y 轴坐标                                                                                                                                                                                                                                                 |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性和 <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.FeatureGraphicBase.html" target="_blank">Zondy.Object.FeatureGraphicBase</a>类的 属性。例如：{key1：value1, key2：value2…} |

- opt_options 属性参数说明（来自<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.QueryParameterBase.html" target="_blank">Zondy.Service.QueryParameterBase</a>）

| 属性 | 类型   | 默认值 | 描述            |
| ---- | ------ | ------ | --------------- |
| GID  | Number | 0      | 要素几何图形 ID |

#### 3.【MapGIS 要素几何图形信息类】`Zondy.Object.FeatureGeometry(opt_options)`

| 参数名      | 类型   | 描述                                                                                            |
| ----------- | ------ | ----------------------------------------------------------------------------------------------- |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

- `opt_options`属性主要参数

| 属性    | 类型                                                                                                                                   | 默认值 | 描述                                   |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------------------------------------- |
| LinGeom | [Array-<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.GLine.html" target="_blank">Zondy.Object. GLine</a>]        | Null   | 线要素几何信息，可包含多个线图形成员。 |
| PntGeom | [Array-<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.GPoint.html" target="_blank">Zondy.Object.GPoint</a>]       | Null   | 点要素几何信息，可包含多个线图形成员。 |
| RegGeom | [Array-<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.CRegionInfo.html" target="_blank">Zondy.Object.GRegion</a>] | Null   | 区要素几何信息，可包含多个线图形成员。 |

#### 4. 【MapGIS 点要素的符号参数信息类】`Zondy.Object.CPointInfo(opt_options)`

| 参数名      | 类 型  | 描述                                                                                            |
| ----------- | ------ | ----------------------------------------------------------------------------------------------- |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

- `opt_options`属性主要参数

| 属性      | 类型   | 默认值 | 描述                                        |
| --------- | ------ | ------ | ------------------------------------------- |
| Angle     | Number | 1      | 子图角度，取值范围为 0~360。                |
| Color     | Number | 1      | 子图颜色（请参考 MapGIS 颜色库中颜色编号）  |
| SymHeight | Number | 1      | 子图高度                                    |
| SymID     | Number | 1      | 子图 ID（请参考 MapGIS 符号库中线符号编号） |
| SymWidth  | Number | 1      | 子图宽度                                    |

#### 5. 【描述要素符号参数信息类】`Zondy.Object.WebGraphicsInfo(opt_options)`

| 参数        | 类型   | 描述                                                                                            |
| ----------- | ------ | ----------------------------------------------------------------------------------------------- |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

- opt_options 属性主要参数

| 属性     | 类型                                                                                                                               | 默认值 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| InfoType | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Enum.FeatureType.html" target="_blank">Zondy.Enum.FeatureType</a>     | 0      | 要素图形参数类型，取值范围：<br/>1（代表<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Enum.FeatureType.html" target="_blank">Zondy.Enum.FeatureType.Pnt</a>类型即点）<br/>2（代表<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Enum.FeatureType.html" target="_blank">Zondy.Enum.FeatureType.Lin</a>类型即线）<br>3（代表<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Enum.FeatureType.html" target="_blank">Zondy.Enum.FeatureType.Reg</a></a>类型即区） |
| LinInfo  | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.CLineInfo.html" target="_blank">Zondy.Object.CLineInfo</a>     | Null   | 线要素符号参数信息。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| PntInfo  | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.CPointInfo.html" target="_blank">Zondy.Object.CPointInfo</a>   | Null   | 点要素符号参数信息。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| RegInfo  | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.CRegionInfo.html" target="_blank">Zondy.Object.CRegionInfo</a> | Null   | 区要素符号参数信息。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

#### 6. 【描述 MapGIS 要素的信息类】`Zondy.Object.Feature(opt_options)`

| 参数        | 类型   | 描述                                                                                            |
| ----------- | ------ | ----------------------------------------------------------------------------------------------- |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

- `opt_options`属性主要参数

| 属性        | 类型                                                                                                                                       | 默认值 | 描述                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AttValue    | Array                                                                                                                                      | Null   | 要素属性信息，与要素属性结构相对应。                                                                                                                                                                                                                                                                                                                                                                  |
| FID         | Number                                                                                                                                     | 0      | 要素唯一标识，由系统自动分配，不可编辑。                                                                                                                                                                                                                                                                                                                                                              |
| Bound       | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Rectangle.html" target="_blank">Zondy.Object.Rectangle</a>             | Null   | 要素外包矩形信息。要素的外包矩形信息由要素的最大、最小两组坐标组成。外包矩形是为了更好的描述不规划图形产生的。可通过获取一个不规划几何对象的外包矩形，用于粗略计算要素的中心点、要素定位、要素包含判断等操作。                                                                                                                                                                                        |
| fGeom       | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.FeatureGeometry.html" target="_blank">Zondy.Object.FeatureGeometry</a> | Null   | 要素几何图形信息。                                                                                                                                                                                                                                                                                                                                                                                    |
| Ftype       | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Enum.FeatureType.html" target="_blank">Zondy.Enum.FeatureType</a>             | 0      | 要素几何类型信息，要素几何图形类型，MapGIS 将几何图形简单划分为点、线、区三种类型。                                                                                                                                                                                                                                                                                                                   |
| GraphicInfo | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.WebGraphicsInfo.html" target="_blank">Zondy.Object.WebGraphicsInfo</a> | Null   | 要素图形参数信息，即显示的样式信息，如高、宽、颜色等信息。不同几何类型的数据，几何图形参数则不相同。如，点类型几何图形要素，在地图上表示为一个点子图，包含子图的 Id、大小、颜色、角度等信息；线类型几何图形要素，则包含了线型号、线宽、颜色等信息；区类型几何要素则包含了区边界、区填充色、填充图案等信息。因此，在填写相应的图形参数时，需根据要素几何图形类型进行填写。主要体现在添加或更新要素时。 |

#### 7. 【描述要素属性结构信息类】`Zondy.Object.CAttStruct(opt_options)`

| 参数        | 类型   | 描述                                                                                            |
| ----------- | ------ | ----------------------------------------------------------------------------------------------- |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

- `opt_options`属性主要参数

| 属性      | 类型           | 默认值 | 描述                                                                                                                   |
| --------- | -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| FldNumber | Number         | 0      | 属性个数，在添加要素时必须设置。                                                                                       |
| FldName   | Array-[String] | Null   | 属性字段名数组，在添加要素时必须设置，并且属性字段名必须与图层属性字段匹配（可不完全匹配）。                           |
| FldType   | Array          | Null   | 属性字段类型数组，在添加要素时必须设置。字段类型取值范围：FldLong（长整型）、FldString（字符串）、FldDouble（双精度）… |

#### 8. 【描述要素集合类】`Zondy.Object.FeatureSet(opt_options)`

| 参数        | 类型   | 描述                                                                                            |
| ----------- | ------ | ----------------------------------------------------------------------------------------------- |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

- `opt_options`属性主要参数

| 属性       | 类型                                                                                                                               | 默认值 | 描述         |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------ |
| AttStruct  | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.CAttStruct.html" target="_blank">Zondy.Object.CAttStruct</a>   | Null   | 要素属性结构 |
| SFEleArray | Array-[<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Feature.html" target="_blank">Zondy.Object.Feature</a>] | Null   | 要素集合     |

* `FeatureSet`对象的方法

| 方法                        | 返回值               | 描述                                 | 参数                                                                        |
| --------------------------- | -------------------- | ------------------------------------ | --------------------------------------------------------------------------- |
| clear()                     | None                 | 清除要素集合                         |                                                                             |
| addFeature(features)        | None                 | 向要素集中添加要素                   | 参数 1：<br/>lines ：（Array-[Zondy.Object.Feature\| Object）一个或一组要素 |
| getFeaturesLength()         | Number               | 获取当前要素集中要素个数             |                                                                             |
| getFeatureByIndex(i)        | Zondy.Object.Feature | 获取要素集中指定索引号的要素         | 参数 1：<br/>i ： （Number）要素在要素集中的索引号                          |
| getAttType（attKey）        | String               | 获取指定索引号的属性字段类型         | 参数 1：<br/>attKey ：（Number）目的属性字段在属性结构中的索引号            |
| getAttIndexByAttName (name) | Number               | 获取指定属性名称在属性结构中的索引号 | 参数 1：<br/>name ： （String）属性字段名称                                 |
| getAttNameByIndex (index)   | String               | 获取指定属性字段索引号的属性名称     | 参数 1：<br/>index ： （Number）属性字段的索引号                            |

#### 9. 【矢量图层要素编辑服务类】`Zondy.Service.EditLayerFeature(gdbp, opt_options)`

| 参数    | 类型 | 描述                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| gdbp        | String   | 矢量图层地址信息（包括源要素类存储路径与名称），用户根据语法设置 URL 地址，或在数据库中图层节点上右击选择“复制 URL”获得。                                                                                                                                                                                                                                                                        |
| opt_options | Object   | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性和 <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.EditServiceBase.html" target="_blank">Zondy.Service.EditServiceBase</a>、 <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.HttpRequest.html" target="_blank">Zondy.Service.HttpRequest</a>类的属性。例如：{key1： value1, key2 ：value2 …} |

* `EditLayerFeature`对象的方法

| 方法                                                               | 返回值  | 描述     | 参数                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------ | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| add(<br/>features,<br/>onSuccess,<br/>onError,<br/>options)        | Boolean | 添加要素 | 参数 1<br/> features （<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.FeatureSet.html" target="_blank">Zondy.Object.FeatureSet</a>）：添加的要素集合<br/>参数 2<br/>onSuccess （Function）：成功回调函数<br/>参数 3<br/>onError （Function）：失败回调函数<br/>参数 4<br/>options （Object）：可选项，设置其他扩展 ajax 请求补充参数。 |
| update(<br/>features,<br/>onSuccess,<br/>onError,<br/>options)     | Boolean | 更新要素 | 参数 1<br/>features （<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.FeatureSet.html" target="_blank">Zondy.Object.FeatureSet</a>）：添加的要素集合<br/>参数 2<br/>onSuccess （Function）：成功回调函数<br/>参数 3<br/>onError （Function）：失败回调函数<br/>参数 4<br/>options （Object）：可选项，设置其他扩展 ajax 请求补充参数。  |
| deletes(<br/>featureIds,<br/>onSuccess, <br/>onError,<br/>options) | Boolean | 删除要素 | 参数 1<br/>featureIds （String）：需要删除的要素的 OID 号，多个用“，”分隔，例如”OID1,OID2,OID3…”。<br/>参数 2 onSuccess （Function）：成功回调函数<br/>参数 3 <br/>onError （Function）：失败回调函数<br/>参数 4 <br/>options （Object）：可选项，设置其他扩展 ajax 请求补充参数。                                                                          |
