## 服务端分段专题图(多字段)

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例通过在服务端生成图层的分段专题图，在客户端更新展示其专题图效果。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】 开发库实现。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线 【include-openlayers-local.js】 脚本引入开发库；

**Step 2. <font color=red>构建地图对象,创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建以`id="mapCon"`的 div 作为容器的地图对象，并设置当前视图的中心点及投影信息；

- Example:

  ```javascript
    //初始化地图容器
    var  map = new ol.Map({
        target: "mapCon",
        view: new ol.View({
            center: [(108.34341 + 116.150939561213) / 2, (29.0125822276524 + 33.2932017737021) / 2],
            zoom: 6,
            projection: "EPSG:4326"
        })
    });
  ```

  **Step 3. <font color=red>添加地图文档图层</font>**:
  &ensp;&ensp;&ensp;&ensp;创建地图文档瓦片图层对象,设置其服务的名称、服务器的 IP 和 Port,以及文档的 GUID,在把该图层加载到地图容器中显示 (说明：该 GUID 用于该地图文档服务在客户端生成缓存的文件夹名称，这样在指定 GUID 以后，该文档服务生成的缓存就只有一份，且保存在该文件夹下)；

- Example:

  ```javascript
    //初始化地图文档图层对象
    guid = Math.floor(Math.random() * 10000000).toString()
    mapDocLayer = new Zondy.Map.MapDocTileLayer('MapGIS IGS MapDocLayer', 'Hubei4326', {
      ip: `${ip}`,
      port: `${port}`,
      //文档guid
      guid: guid,
    })
    //将地图文档图层加载到地图中
    map.addLayer(mapDocLayer)
  ```

**Step 4. <font color=red>构建专题图服务类对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建专题图服务对象，指定服务的 IP 和 Port,同时指定缓存的 GUID；

- Example:

  ```javascript
    //初始化专题图服务类
    ThemeOper = new Zondy.Service.ThemeOper(null, guid)
    //设置ip地址
    ThemeOper.ip = `${ip}`
    //设置端口号
    ThemeOper.port = `${port}`
  ```

**Step 5. <font color=red>创建图层专题图信息数组</font>**:
&ensp;&ensp;&ensp;&ensp;专题图是针对整个地图而言的，每个图层都可设置对应一个专题图信息对象，因此地图的专题图信息是一个数组，其中的每一个索引项通过图层名称(`LayerName`)的指定来对应匹配到地图的某一图层上；

- Example:

  ```javascript
    //专题图信息数组
    var themesInfoArr = []
    //初始化Zondy.Object.Theme.ThemesInfo，用于设置需添加的专题相关信息
    themesInfoArr[0] = new Zondy.Object.Theme.ThemesInfo()
    //设置图层名层
    themesInfoArr[0].LayerName = '湖北省市级区划2'
  ```

**Step 6. <font color=red>实例化图层的分段专题图对象</font>**:
&ensp;&ensp;&ensp;&ensp;每个图层可维护多个不同类型的专题图，比如单值、分段等，本示例以图层的分段专题图为例，实例化一个分段专题图对象`CMultiClassTheme`，同时初始化该分段专题图信息的一些相关属性：`Visible`(是否可见)、`GeoInfoType`(几何图形信息的类型)等；

- Example:

  ```javascript
    //实例化CMultiClassTheme类
    themesInfoArr[0].ThemeArr[0] = new Zondy.Object.Theme.CMultiClassTheme()
    themesInfoArr[0].ThemeArr[0].Name = '分段专题图'
    //指定为分段专题图
    themesInfoArr[0].ThemeArr[0].IsBaseTheme = false
    themesInfoArr[0].ThemeArr[0].Visible = true
    themesInfoArr[0].ThemeArr[0].GeoInfoType = 'Reg'
  ```

**Step 7. <font color=red>设置分段专题图的未参与分类的分段信息</font>**:
&ensp;&ensp;&ensp;&ensp;对于上述图层"湖北省市级区划 2"，未参与分类的字段值统一归为一类以相同的样式进行渲染显示其要素，根据`GeoInfoType`的值来设置默认的几何图形信息；

- Example:

  ```javascript
    //未分段值的图形信息设置
    themesInfoArr[0].ThemeArr[0].DefaultInfo = new Zondy.Object.Theme.CThemeInfo()
    themesInfoArr[0].ThemeArr[0].DefaultInfo.Caption = '未分类'
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo = new Zondy.Object.Theme.CRegInfo()
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.Ovprnt = true
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.Angle = 0
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.EndClr = 0
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FillClr = 17
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FillMode = 0
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FullPatFlg = true
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatClr = 45
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatHeight = 5
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatWidth = 5
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatID = 0
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.OutPenW = 1
  ```

  **Step 8. <font color=red>分段取值设置 1</font>**:
  &ensp;&ensp;&ensp;&ensp;对于上述图层"湖北省市级区划 2"，由于是多个字段参与分段，首先设置一个字段的分段取值信息`Zondy.Object.Theme.ExpInfo`,需指定该分段取值的属性字段的名称`Expression`,以及按照这个属性字段值进行各个分段的值域`Zondy.Object.Theme.ItemValue`设置,包括分段类型(本示例是范围域)、以及每个分段的起始、终止值；

- Example:

  ```javascript
    themesInfoArr[0].ThemeArr[0].ExpInfoArr = []
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[0] = new Zondy.Object.Theme.ExpInfo()
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[0].Expression = 'GDP2016'
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[0].ItemValueArr = []
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[0].ItemValueArr[0] = new Zondy.Object.Theme.ItemValue()
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[0].ItemValueArr[0].StartValue = '4.25'
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[0].ItemValueArr[0].EndValue = '443.53'
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[0].ItemValueArr[0].ClassItemType = 2  //2代表取范围值
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[0].ItemValueArr[1] = new Zondy.Object.Theme.ItemValue()
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[0].ItemValueArr[1].StartValue = '443.53'
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[0].ItemValueArr[1].EndValue = '882.82'
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[0].ItemValueArr[1].ClassItemType = 2
  ```

  **Step 9. <font color=red>分段取值设置 2</font>**:
  &ensp;&ensp;&ensp;&ensp;由于是多个字段参与分段，Step 8 已经设置了一个属性字段为'GDP2016'的分段，这一步是完成设置另外一个属性字段的分段取值信息；

- Example:

  ```javascript
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1] = new Zondy.Object.Theme.ExpInfo()
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].Expression = '第一产业增加值2016'
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr = []
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr[0] = new Zondy.Object.Theme.ItemValue()
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr[0].StartValue = '74.47'
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr[0].EndValue = '972.32'
    //2代表取范围值
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr[0].ClassItemType = 2
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr[1] = new Zondy.Object.Theme.ItemValue()
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr[1].StartValue = '972.32'
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr[1].EndValue = '1870.18'
    //2代表取范围值
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr[1].ClassItemType = 2
  ```

**Step 10. <font color=red>分段取值设置 2</font>**:
&ensp;&ensp;&ensp;&ensp;由于是多个字段参与分段，Step 8 已经设置了一个属性字段为'GDP2016'的分段，这一步是完成设置另外一个属性字段的分段取值信息；

- Example:

  ```javascript
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1] = new Zondy.Object.Theme.ExpInfo()
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].Expression = '第一产业增加值2016'
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr = []
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr[0] = new Zondy.Object.Theme.ItemValue()
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr[0].StartValue = '74.47'
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr[0].EndValue = '972.32'
    //2代表取范围值
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr[0].ClassItemType = 2

    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr[1] = new Zondy.Object.Theme.ItemValue()
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr[1].StartValue = '972.32'
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr[1].EndValue = '1870.18'
    //2代表取范围值
    themesInfoArr[0].ThemeArr[0].ExpInfoArr[1].ItemValueArr[1].ClassItemType = 2
  ```

  **Step 11. <font color=red>设置分段专题图的参与分类的每个分段信息</font>**:
  &ensp;&ensp;&ensp;&ensp;由于该示例是多字段的分段专题图，因此总的分段数是每个属性字段分段的卡迪尔积，而每个分段信息主要包含:是否可见(`IsVisible`)以及根据分段专题图指定的`GeoInfoType`而相应的几何图形信息(如`RegInfo`)；

- Example:

  ```javascript
    //分段项的图形信息设置(笛卡尔积之后的分段项)
    themesInfoArr[0].ThemeArr[0].MultiClassThemeInfoArr = []
    themesInfoArr[0].ThemeArr[0].MultiClassThemeInfoArr[0] = new Zondy.Object.Theme.CThemeInfo()
    //不设置则采用分段值作为标题
    themesInfoArr[0].ThemeArr[0].MultiClassThemeInfoArr[0].Caption = '分段0'
    themesInfoArr[0].ThemeArr[0].MultiClassThemeInfoArr[0].IsVisible = true
    themesInfoArr[0].ThemeArr[0].MultiClassThemeInfoArr[0].RegInfo = new Zondy.Object.Theme.CRegInfo()
    themesInfoArr[0].ThemeArr[0].MultiClassThemeInfoArr[0].RegInfo.FillClr = 852
    themesInfoArr[0].ThemeArr[0].MultiClassThemeInfoArr[1] = new Zondy.Object.Theme.CThemeInfo()
    //不设置则采用分段值作为标题
    themesInfoArr[0].ThemeArr[0].MultiClassThemeInfoArr[1].Caption = '分段1'
    themesInfoArr[0].ThemeArr[0].MultiClassThemeInfoArr[1].IsVisible = true
    themesInfoArr[0].ThemeArr[0].MultiClassThemeInfoArr[1].RegInfo = new Zondy.Object.Theme.CRegInfo()
    themesInfoArr[0].ThemeArr[0].MultiClassThemeInfoArr[1].RegInfo.FillClr = 17
  ```

  **Step 12. <font color=red>根据上述的专题图信息实现专题图的添加、更新、删除</font>**:
  &ensp;&ensp;&ensp;&ensp;根据专题图的信息数组 themesInfoArr，调用专题图服务类对象 ThemeOper 提供的`addThemesInfo`、`updateThemesInfo`、`removeThemesInfo`的方法实现服务端专题图的添加、更新、删除，同时通过服务成功的回调函数，实现客户端的更新显示专题图的效果；

- Example:

  ```javascript
    //添加专题图
    ThemeOper.addThemesInfo('Hubei4326', '1/0', themesInfoArr, onUniqueTheme)
    //更新专题图
    ThemeOper.updateThemesInfo('Hubei4326', '1/0', themesInfoArr, onUniqueTheme)
    //删除专题图
    ThemeOper.removeThemesInfo('Hubei4326', '1/0', onUniqueTheme)
  ```

**Step 13. <font color=red>更新前端的专题图显示效果</font>**:
&ensp;&ensp;&ensp;&ensp;在 Step 4 中指定了专题图服务类对象的 guid，该 guid 对应的是地图文档缓存的 guid(指定文档的 guid 是为了防止每次请求都从服务端取图而造成的客户端显示效率低下)，由于专题图的添加、删除、更新是对地图文档进行了修改，因此需要对指定 guid 的缓存重新生成。

- Example:

  ```javascript
    function onUniqueTheme(flg) {
      if (flg) {
        //刷新图层前要进行此设置。加载之前的缓存文档,保证专题图能正常显示
        mapDocLayer.options.keepCache = false
        //刷新图层，实时显示专题图
        mapDocLayer.refresh()
        //设置为读取缓存，以加快显示效率
        mapDocLayer.options.keepCache = true
      }
    }
  ```

### 关键接口

#### 1.【专题图服务类】`Zondy.Service.ThemeOper(options opt_guid)`

| 参数名   | 类 型  | 说 明                  |
| -------- | ------ | ---------------------- |
| options  | Object | （可选）附加属性       |
| opt_guid | String | （可选）客户端缓存标识 |

- `options`属性主要参数

| 参数名      | 类 型    | 默认值 | 说 明                      |
| ----------- | -------- | ------ | -------------------------- |
| p_onSuccess | function | null   | （可选）执行成功的回调方法 |

##### 【method】`addThemesInfo(mapDocName, idxArr, themesInfoArr, onSuccess, onError)`：添加专题图

| 参数名        | 类型              | 说明                       |
| ------------- | ----------------- | -------------------------- |
| mapDocName    | String            | 地图文档名称               |
| idxArr        | Array{String}     | Array<图层索引/专题图索引> |
| themesInfoArr | Array{CThemeInfo} | 专题图信息数组             |
| onSuccess     | Function          | 执行成功回调函数           |
| onError       | Function          | 执行失败回调函数           |

##### 【method】`updateThemesInfo(mapDocName, idxArr, themesInfoArr, onSuccess, onError)`：更新专题图

| 参数名        | 类型              | 说明                       |
| ------------- | ----------------- | -------------------------- |
| mapDocName    | String            | 地图文档名称               |
| idxArr        | Array{String}     | Array<图层索引/专题图索引> |
| themesInfoArr | Array{CThemeInfo} | 专题图信息数组             |
| onSuccess     | Function          | 执行成功回调函数           |
| onError       | Function          | 执行失败回调函数           |

##### 【method】`removeThemesInfo(mapDocName, idxArr, onSuccess, onError)`：删除专题图

| 参数名     | 类型          | 说明                       |
| ---------- | ------------- | -------------------------- |
| mapDocName | String        | 地图文档名称               |
| idxArr     | Array{String} | Array<图层索引/专题图索引> |
| onSuccess  | Function      | 执行成功回调函数           |
| onError    | Function      | 执行失败回调函数           |

#### 2.【服务基类】`Zondy.Service.ServiceBase(options)`

| 参数名  | 类 型  | 说 明            |
| ------- | ------ | ---------------- |
| options | Object | （可选）附加属性 |

- `options`属性主要参数

| 参数名          | 类 型  | 默认值      | 说 明    |
| --------------- | ------ | ----------- | -------- |
| baseUrl         | String | null        | 基地址   |
| domain          | String | null        | 域名     |
| networkProtocol | String | "http"      | 网络协议 |
| ip              | String | "localhost" | 服务 ip  |
| port            | String | "6163"      | 服务端口 |
| partUrl         | String | null        | 服务地址 |

#### 3.【专题图信息类】`Zondy.Object.Theme.CThemeInfo(options)`

| 参数名  | 类 型  | 说 明            |
| ------- | ------ | ---------------- |
| options | Object | （可选）附加属性 |

- `options`属性主要参数

| 参数名    | 类 型                       | 默认值 | 说 明              |
| --------- | --------------------------- | ------ | ------------------ |
| Caption   | String                      | null   | （可选）专题图标题 |
| IsVisible | Boolean                     | True   | （可选）是否可见   |
| MaxScale  | Number                      | 0      | （可选）最大显示比 |
| MinScale  | Number                      | 0      | （可选）最小显示比 |
| RegInfo   | Zondy.Object.Theme.CRegInfo | null   | （可选）区图形信息 |
| LinInfo   | Zondy.Object.Theme.CLinInfo | null   | （可选）线图形信息 |
| PntInfo   | Zondy.Object.Theme.CPntInfo | null   | （可选）点图形信息 |

#### 4.【分段表达式信息类】`Zondy.Object.Theme.ExpInfo(expression, itemValueArr, options)`

| 参数名       | 类 型                               | 说 明                    |
| ------------ | ----------------------------------- | ------------------------ |
| expression   | String                              | （可选）分级字段表达式   |
| itemValueArr | Array{Zondy.Object.Theme.ItemValue} | （可选）分段专题图分段值 |
| options      | Object                              | （可选）附加属性         |

#### 5.【分段值类】`Zondy.Object.Theme.ItemValue(startValue, endValue, classItemType, ooptions)`

| 参数名        | 类 型                      | 说 明                    |
| ------------- | -------------------------- | ------------------------ |
| startValue    | String                     | （可选）分级字段表达式   |
| endValue      | String                     | （可选）分段专题图分段值 |
| classItemType | Zondy.Enum.Theme.CItemType | （可选）分段专题图分段值 |
| options       | Object                     | （可选）附加属性         |

**详细信息见 OpenLayers API**
http://develop.smaryun.com:8899/docs/openlayers/module-%25E4%25B8%2593%25E9%25A2%2598%25E5%259B%25BE%25E6%259C%258D%25E5%258A%25A1.ThemeOper.html
http://develop.smaryun.com:8899/docs/openlayers/theme_ThemeOper.js.html
http://develop.smaryun.com:8899/docs/openlayers/ServiceBase.js.html
http://develop.smaryun.com:8899/docs/openlayers/module-%25E4%25B8%2593%25E9%25A2%2598%25E5%259B%25BE%25E6%259C%258D%25E5%258A%25A1.CThemeInfo.html
http://develop.smaryun.com:8899/docs/openlayers/module-%25E4%25B8%2593%25E9%25A2%2598%25E5%259B%25BE%25E6%259C%258D%25E5%258A%25A1.ExpInfo.html
http://develop.smaryun.com:8899/docs/openlayers/module-%25E4%25B8%2593%25E9%25A2%2598%25E5%259B%25BE%25E6%259C%258D%25E5%258A%25A1.ItemValue.html
