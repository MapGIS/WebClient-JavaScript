## 密度专题图

### 示例功能

&ensp;&ensp;&ensp;&ensp;用点的密集程度来表示与范围或区域面积相关联数据值，适用于表示具有数量特征散分布的专题。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-mapboxgl-local.js 开发库实现】，通过关键接口`Zondy.Service.ThemeOper()`实现 MapGIS 地图文档的`密度专题图`操作功能。

> 开发库使用请参见*首页-概述-调用方式*。

> MapGIS IGServer 发布地图文档服务请参见`MapGIS IGServer`目录下的`地图-EPSG3857`示例的说明部分

### 实现步骤

**Step 1.<font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;引用开发库，本示例通过本地离线【include-mapboxgl-local.js】脚本引入开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="map"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数，如地图 div 容器、缩放层级、中心点等，以及在地图中添加地图文档图层，具体操作参考`互联网地图`目录下的`天地图墨卡托`示例；

**Step 4. <font color=red>创建专题图结构信息对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建**专题图结构信息对象**，并将该对象存放数组中，执行专题图功能时使用，如`添加专题图`、`更新专题图`、`删除专题图`。重点内容：使用`Zondy.Object.Theme.CSimpleTheme()`实现**密度**专题图；

- Example:
  ```javascript
    //专题图信息数组
    var themesInfoArr = []
    //初始化Zondy.Object.Theme.ThemesInfo，用于设置需添加的专题相关信息
    themesInfoArr[0] = new Zondy.Object.Theme.ThemesInfo()
    //设置图层名层
    themesInfoArr[0].LayerName = '湖北省市级区划2'
    //初始化指定图层的专题图信息对象，之后再给该数组赋值
    themesInfoArr[0].ThemeArr = []
    //实例化CDotDensityTheme类
    themesInfoArr[0].ThemeArr[0] = new Zondy.Object.Theme.CDotDensityTheme()
    //专题图名称
    themesInfoArr[0].ThemeArr[0].Name = '点密度专题图'
    //单值专题图
    themesInfoArr[0].ThemeArr[0].IsBaseTheme = false
    //可见
    themesInfoArr[0].ThemeArr[0].Visible = true
    themesInfoArr[0].ThemeArr[0].Expression = 'GDP2016'
    //密度单元值
    themesInfoArr[0].ThemeArr[0].Value = '20'
    //实例化专题图图形信息对象
    //点图形信息
    themesInfoArr[0].ThemeArr[0].Info = new Zondy.Object.Theme.CPntInfo()
    themesInfoArr[0].ThemeArr[0].Info.SymID = 197
    //覆盖方式，覆盖
    themesInfoArr[0].ThemeArr[0].Info.Ovprnt = true
    themesInfoArr[0].ThemeArr[0].Info.Height = 5
    themesInfoArr[0].ThemeArr[0].Info.Width = 5
    //[子图颜色,可变颜色1,可变颜色2]
    themesInfoArr[0].ThemeArr[0].Info.OutClr = [6, 6, 6]
    //[笔宽，可变笔宽1，可变笔宽2]
    themesInfoArr[0].ThemeArr[0].Info.OutPenW = [0.05, 0.05, 0.05]
  ```

**Step 5. <font color=red>创建专题图服务对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建**专题图服务**对象，并使用该对象执行添加、删除操作；

- Example:

  ```javascript
    //初始化专题图服务类
    ThemeOper = new Zondy.Service.ThemeOper(guid)
    //设置ip地址
    ThemeOper.ip = 'develop.smaryun.com'
    //设置端口号
    ThemeOper.port = '6163'
  ```

- 使用专题图服务对象`添加专题图`，添加专题图前生成`专题图结构信息对象`的数组；

* Example

  ```javascript
    themesInfoArr = getDefaultThemesInfo()
    //添加专题图（不是在原文档上添加，会重新生成一个专题图缓存文档）
    ThemeOper.addThemesInfo('Hubei3857', '1/0', themesInfoArr, onUniqueTheme)
  ```

- 使用专题图服务对象`更新专题图`，更新专题图前生成`专题图结构信息对象`的数组；

* Example:

  ```javascript
    themesInfoArr = getDefaultThemesInfoArr()
    //密度单元值
    themesInfoArr[0].ThemeArr[0].Value = '200'
    //更新专题图,onUniqueTheme为回调函数
    ThemeOper.updateThemesInfo('Hubei3857', '1/0', themesInfoArr, onUniqueTheme)
  ```

- 使用专题图服务对象`删除专题图`；

* Example:
  ```javascript
    //删除专题图,onUniqueTheme为回调函数
    ThemeOper.removeThemesInfo('Hubei3857', '1/0', onUniqueTheme)
  ```

**Step 6. <font color=red>结果展示</font>**:
&ensp;&ensp;&ensp;&ensp;专题图结果展示，在专题图执行成功的回调函数中刷新地图文档即可查看专题图结果。

- Example:

```javascript
  //刷新图层，实时显示专题图
  mapDocLayer.refreshMap(guid)
```

### 关键接口

#### 1.【专题图结构信息对象类】`Zondy.Object.Theme.ThemesInfo(LayerName, themeArr)`

| 参数      | 类型                                                                                                                                         | 描述                                 |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| LayerName | Array-[Number]                                                                                                                               | 图层索引数组,图层序号默认从 0 开始。 |
| ThemeArr  | Array-[<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CTheme.html">Zondy.Object.Theme.CTheme</a>] | 专题图数组                           |

#### 2.【点密度专题图图形信息类】`Zondy.Object.Theme.CDotDensityTheme(opt_options)`

| 参数名      | 类型   | 描述                                                                                                                                                                                                                                           |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性和<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CTheme.html">Zondy.Object.Theme.CTheme</a>类的 属性。例如：{key1：value1, key2：value2…} |

- `opt_options`属性参数说明

| 属性       | 类型                                                                                                                                     | 默认值 | 描述                                 |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------ |
| Expression | String                                                                                                                                   | Null   | 字段表达式，来自图层的某个属性字段。 |
| Info       | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CPntInfo.html" target="_blank">Zondy.Object.Theme.CPntInfo</a> | Null   | 点图形信息                           |
| Value      | Number                                                                                                                                   | Null   | 专题图中每一个点所代表的数值         |

#### 3.【专题图图形信息类】`Zondy.Object.CThemeInfo(opt_options)`

| 参数名      | 类型   | 描述                                                                                            |
| ----------- | ------ | ----------------------------------------------------------------------------------------------- |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

- `opt_options`属性参数说明

| 属性      | 类型                                                                                                                                        | 默认值 | 描述                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------------------------------------- |
| Caption   | String                                                                                                                                      | Null   | 专题图名称                             |
| IsVisible | Boolean                                                                                                                                     | TRUE   | 可见标志，专题图信息是否可见。         |
| MaxScale  | Number                                                                                                                                      | 0      | 最大显示比                             |
| MinScale  | Number                                                                                                                                      | 0      | 最小显示比                             |
| RegInfo   | <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CRegInfo.html" >Zondy.Object.Theme.CRegInfo</a>   | Null   | 区要素信息，当专题图基于区图层时设置。 |
| LinInfo   | <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CLineInfo.html" >Zondy.Object.Theme.CLineInfo</a> | Null   | 线要素信息，当专题图基于线图层时设置。 |
| PntInfo   | <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CPntInfo.html" >Zondy.Object.Theme.CPntInfo</a>   | Null   | 点要素信息，当专题图基于点图层时设置。 |

#### 4. 【区符号参数信息类】`Zondy.Object.CRegInfo(opt_options)`

| 参数        | 类型   | 描述                                                                                            |
| ----------- | ------ | ----------------------------------------------------------------------------------------------- |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

- `opt_options`属性参数说明

| 属性       | 类型    | 默认值 | 描述                                                                             |
| ---------- | ------- | ------ | -------------------------------------------------------------------------------- |
| LibID      | Number  | 0      | 系统库 ID                                                                        |
| Ovprnt     | Boolean | FALSE  | 覆盖方式，取值：true（覆盖，不透明显示）\|false（默认值，指透明显示）。          |
| Angle      | Number  | 0      | 图案角度                                                                         |
| EndClr     | Number  | 0      | 结束填充色（请参考 MapGIS 颜色库中颜色的编号）                                   |
| FillClr    | Number  | 46     | 区域填充色（请参考 MapGIS 颜色库中颜色的编号）                                   |
| FillMode   | Number  |        | 填充模式，取值范围： 0：常规填充 1：线性渐变填充 2：矩形渐变填充 3：圆形渐变填充 |
| FullPatFlg | Boolean | TRUE   | 是否需要完整图案填充                                                             |
| PatClr     | Number  | 3      | 图案颜色（请参考 MapGIS 颜色库中颜色的编号）                                     |
| PatHeight  | Number  | 5      | 图案高度                                                                         |
| PatID      |         | 0      | 填充图案编号（请参考 MapGIS 符号库中填充符号的编号）                             |
| PatWidth   | Number  | 5      | 图案宽度                                                                         |
| OutPenW    | Number  | 1      | 图案笔宽                                                                         |

#### 5. 【专题图服务类】`Zondy.Service.ThemeOper(opt_guid, opt_options)`

| 参数        | 类型   | 描述                                                                                            |
| ----------- | ------ | ----------------------------------------------------------------------------------------------- |
| opt_guid    | String | 可选项，地图文档缓存唯一标识。                                                                  |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

- opt_options 属性参数说明

| 属性 | 类型   | 默认值      | 描述                                                 |
| ---- | ------ | ----------- | ---------------------------------------------------- |
| ip   | String | "localhost" | 服务器 ip 地址，如本地默认为“127.0.0.1”或“localhost” |
| port | String | "6163"      | 服务器端口号                                         |

##### 【method】`getThemesInfo(mapDocName,idxArr,onSuccess)`：获取专题图信息

| 参数       | 类型     | 描述                                                                                               |
| ---------- | -------- | -------------------------------------------------------------------------------------------------- |
| mapDocName | String   | 地图文档名称                                                                                       |
| idxArr     | String   | 专题图索引与图层索引对应关系。语法为：“图层索引号/专题图索引号”，多个用“，”隔开。如："0/0,1/1,2/2" |
| onSuccess  | Function | 成功回调函数                                                                                       |

##### 【method】`removeThemesInfo(mapDocName,idxArr,onSuccess)`：删除专题图信息

| 参数       | 类型     | 描述                                                                                               |
| ---------- | -------- | -------------------------------------------------------------------------------------------------- |
| mapDocName | String   | 地图文档名称                                                                                       |
| idxArr     | String   | 专题图索引与图层索引对应关系。语法为：“图层索引号/专题图索引号”，多个用“，”隔开。如："0/0,1/1,2/2" |
| onSuccess  | Function | 成功回调函数                                                                                       |

##### 【method】`updateThemesInfo(mapDocName,idxArr,ThemesInfoArr,onSuccess)`：更新专题图信息

| 参数          | 类型                                                                                                                                                  | 描述                                                                                               |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| mapDocName    | String                                                                                                                                                | 地图文档名称                                                                                       |
| idxArr        | String                                                                                                                                                | 专题图索引与图层索引对应关系。语法为：“图层索引号/专题图索引号”，多个用“，”隔开。如："0/0,1/1,2/2" |
| ThemesInfoArr | Array-[<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.ThemesInfo.html" >Zondy.Object.Theme.ThemesInfo</a>] | 更新的专题图信息数组                                                                               |
| onSuccess     | Function                                                                                                                                              | 成功回调函数                                                                                       |

##### 【method】`addThemesInfo(mapDocName,idxArr,ThemesInfoArr,onSuccess)`：添加专题图信息

| 参数          | 类型                                                                                                                                                  | 描述                                                                                               |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| mapDocName    | String                                                                                                                                                | 地图文档名称                                                                                       |
| idxArr        | String                                                                                                                                                | 专题图索引与图层索引对应关系。语法为：“图层索引号/专题图索引号”，多个用“，”隔开。如："0/0,1/1,2/2" |
| ThemesInfoArr | Array-[<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.ThemesInfo.html" >Zondy.Object.Theme.ThemesInfo</a>] | 添加的专题图信息数组                                                                               |
| onSuccess     | Function                                                                                                                                              | 成功回调函数                                                                                       |
