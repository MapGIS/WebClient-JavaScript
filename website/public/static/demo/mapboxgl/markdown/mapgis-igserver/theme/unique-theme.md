## 单值专题图

### 示例功能

单值专题图用不同的颜色或图案表示属性表中指定字段的每一个不同的值。

### 示例实现

本示例需要使用include-mapboxgl-local.js开发库实现，通过关键接口`Zondy.Service.ThemeOper()`实现MapGIS地图文档的`单值专题图`操作功能。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

> MapGIS IGServer发布地图文档服务请参见`MapGIS IGServer`目录下的`地图-EPSG3857`示例的说明部分

### 实现步骤

1. 引用开发库，本示例通过本地离线include-mapboxgl-local.js脚本引入开发库；

2. 创建`id="map"`的div作为地图容器，并设置其样式；

3. 创建地图对象，设置地图的必要参数，如地图div容器、缩放层级、中心点等，以及在地图中添加地图文档图层，具体操作参考`互联网地图`目录下的`天地图墨卡托`示例；

4. 创建**专题图结构信息对象**，并将该对象存放数组中，执行专题图功能时使用，如`添加专题图`、`更新专题图`。重点内容：使用`Zondy.Object.Theme.CUniqueTheme()`实现**单值**专题图；

   ```javascript
   //专题图信息数组
   var themesInfoArr = [];
   //初始化Zondy.Object.Theme.ThemesInfo，用于设置需添加的专题相关信息
   themesInfoArr[0] = new Zondy.Object.Theme.ThemesInfo();
   //设置图层名层
   themesInfoArr[0].LayerName = "湖北省市级区划2";
   //初始化指定图层的专题图信息对象，之后再给该数组赋值
   themesInfoArr[0].ThemeArr = [];
   //实例化CUniqueTheme类
   themesInfoArr[0].ThemeArr[0] = new Zondy.Object.Theme.CUniqueTheme();
   themesInfoArr[0].ThemeArr[0].Name = "单值专题图";
   //指定为单值的专题图
   themesInfoArr[0].ThemeArr[0].IsBaseTheme = true;
   themesInfoArr[0].ThemeArr[0].Visible = true;
   themesInfoArr[0].ThemeArr[0].GeoInfoType = "Reg";
   themesInfoArr[0].ThemeArr[0].Expression = "NAME";
   //未分段值的图形信息设置
   themesInfoArr[0].ThemeArr[0].DefaultInfo = new Zondy.Object.Theme.CThemeInfo();
   themesInfoArr[0].ThemeArr[0].DefaultInfo.Caption = "未分类";
   themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo = new Zondy.Object.Theme.CRegInfo();
   themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.Ovprnt = true;
   themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.Angle = 0;
   themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.EndClr = 0;
   themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FillClr = 2;
   themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FillMode = 0;
   themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FullPatFlg = true;
   themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatClr = 45;
   themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatHeight = 5;
   themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatWidth = 5;
   themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatID = 0;
   themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.OutPenW = 1;
   //每段专题绘制信息
   themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr = [];
   themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0] = new Zondy.Object.Theme.CUniqueThemeInfo();
   themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].Value = "十堰市";
   themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].Caption = "十堰市";
   themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].IsVisible = true;
   themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].RegInfo = new Zondy.Object.Theme.CRegInfo();
   themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].RegInfo.FillClr = Math.floor(Math.random() * 100 + 1);
   ```

5. 创建**专题图服务**对象，并使用该对象执行添加、更新、删除操作；

   ```javascript
   //初始化专题图服务类
   ThemeOper = new Zondy.Service.ThemeOper(guid);
   //设置ip地址
   ThemeOper.ip = "develop.smaryun.com";
   //设置端口号
   ThemeOper.port = "6163";
   ```

   * 使用专题图服务对象`添加专题图`，添加专题图前生成`专题图结构信息对象`的数组；

     ```javascript
     themesInfoArr = createThemesInfoArr();
     //添加专题图（不是在原文档上添加，会重新生成一个专题图缓存文档）
     ThemeOper.addThemesInfo("Hubei3857", "1/0", themesInfoArr, onUniqueTheme);
     ```

   * 使用专题图服务对象`更新专题图`，更新专题图前生成`专题图结构信息对象`的数组；

     ```javascript
     themesInfoArr = createThemesInfoArr();
     //更新专题图,onUniqueTheme为回调函数
     ThemeOper.updateThemesInfo("Hubei3857", "1/0", themesInfoArr, onUniqueTheme);
     ```

   * 使用专题图服务对象`删除专题图`；

     ```javascript
     //删除专题图,onUniqueTheme为回调函数
     ThemeOper.removeThemesInfo("Hubei3857", "1/0", onUniqueTheme);
     ```

6. 专题图结果展示，在专题图执行成功的回调函数中刷新地图文档即可查看专题图结果；

   ```javascript
   //刷新图层，实时显示专题图
   mapDocLayer.refreshMap(guid);
   ```


### 关键接口

#### 1.【专题图结构信息对象】ThemesInfo

##### `Zondy.Object.Theme.ThemesInfo(LayerName, themeArr)`：专题图结构信息对象的构造函数

> `ThemesInfo`主要参数

| **参数**  | **类型**                                                     | **描述**                           |
| --------- | ------------------------------------------------------------ | ---------------------------------- |
| LayerName | Array-[Number]                                               | 图层索引数组,图层序号默认从0开始。 |
| ThemeArr  | Array-[<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CTheme.html">Zondy.Object.Theme.CTheme</a>] | 专题图数组                         |

#### 2.【单值专题图图形信息类】CUniqueTheme

##### `Zondy.Object.Theme.CUniqueTheme(opt_options)`：单值专题图图形信息类的构造函数

> `CUniqueTheme`主要参数

| 参数名      | 类型   | 描述                                                         |
| ----------- | ------ | ------------------------------------------------------------ |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性和<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CTheme.html">Zondy.Object.Theme.CTheme</a>类的 属性。例如：{key1：value1, key2：value2…} |

> opt_options属性参数说明

| 属性               | 类型                                                         | 默认值 | 描述                                        |
| ------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------- |
| DefaultInfo        | <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CThemeInfo.html" >Zondy.Object.Theme.<br/>CThemeInfo</a> | Null   | 缺省专题图的图形信息                        |
| Expression         | String                                                       | Null   | 唯一字段表达式，来自图层的某个属性字段。    |
| UniqueThemeInfoArr | Array-[<br/><a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CUniqueThemeInfo.html" >Zondy.Object.Theme.<br/>CUniqueThemeInfo</a>] | Null   | 每段专题图的图形信息                        |
| GeoInfoType        | String                                                       | Null   | 每段专题图的图形类型，取值为：Reg/Lin/Pnt。 |

#### 3.【专题图图形信息类】CThemeInfo

##### `Zondy.Object.CThemeInfo(opt_options)`：专题图图形信息类的构造函数

> `CThemeInfo`主要参数

| 参数名      | 类型   | 描述                                                         |
| ----------- | ------ | ------------------------------------------------------------ |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

> `opt_options`属性参数说明

| 属性      | 类型                                                         | 默认值 | 描述                                   |
| --------- | ------------------------------------------------------------ | ------ | -------------------------------------- |
| Caption   | String                                                       | Null   | 专题图名称                             |
| IsVisible | Boolean                                                      | TRUE   | 可见标志，专题图信息是否可见。         |
| MaxScale  | Number                                                       | 0      | 最大显示比                             |
| MinScale  | Number                                                       | 0      | 最小显示比                             |
| RegInfo   | <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CRegInfo.html" >Zondy.Object.Theme.CRegInfo</a> | Null   | 区要素信息，当专题图基于区图层时设置。 |
| LinInfo   | <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CLineInfo.html" >Zondy.Object.Theme.CLineInfo</a> | Null   | 线要素信息，当专题图基于线图层时设置。 |
| PntInfo   | <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CPntInfo.html" >Zondy.Object.Theme.CPntInfo</a> | Null   | 点要素信息，当专题图基于点图层时设置。 |

#### 4. 【区符号参数信息】CRegInfo

##### `Zondy.Object.CRegInfo(opt_options)`：区符号参数信息的构造函数

> `CRegInfo`主要参数

| **参数**    | **类型** | **描述**                                                     |
| ----------- | -------- | ------------------------------------------------------------ |
| opt_options | Object   | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

> `opt_options`属性参数说明

| 属性       | 类型    | 默认值 | 描述                                                         |
| ---------- | ------- | ------ | ------------------------------------------------------------ |
| LibID      | Number  | 0      | 系统库ID                                                     |
| Ovprnt     | Boolean | FALSE  | 覆盖方式，取值：true（覆盖，不透明显示）\|false（默认值，指透明显示）。 |
| Angle      | Number  | 0      | 图案角度                                                     |
| EndClr     | Number  | 0      | 结束填充色（请参考MapGIS颜色库中颜色的编号）                 |
| FillClr    | Number  | 46     | 区域填充色（请参考MapGIS颜色库中颜色的编号）                 |
| FillMode   | Number  |        | 填充模式，取值范围：     0：常规填充     1：线性渐变填充     2：矩形渐变填充     3：圆形渐变填充 |
| FullPatFlg | Boolean | TRUE   | 是否需要完整图案填充                                         |
| PatClr     | Number  | 3      | 图案颜色（请参考MapGIS颜色库中颜色的编号）                   |
| PatHeight  | Number  | 5      | 图案高度                                                     |
| PatID      |         | 0      | 填充图案编号（请参考MapGIS符号库中填充符号的编号）           |
| PatWidth   | Number  | 5      | 图案宽度                                                     |
| OutPenW    | Number  | 1      | 图案笔宽                                                     |

#### 5. 【专题图服务】ThemeOper

##### （1）`Zondy.Service.ThemeOper(opt_guid, opt_options)`：专题图服务的构造函数

> `ThemeOper`主要参数

| **参数**    | **类型** | **描述**                                                     |
| ----------- | -------- | ------------------------------------------------------------ |
| opt_guid    | String   | 可选项，地图文档缓存唯一标识。                               |
| opt_options | Object   | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

> opt_options属性参数说明

| 属性 | 类型   | 默认值      | 描述                                               |
| ---- | ------ | ----------- | -------------------------------------------------- |
| ip   | String | "localhost" | 服务器ip地址，如本地默认为“127.0.0.1”或“localhost” |
| port | String | "6163"      | 服务器端口号                                       |

##### （2）`getThemesInfo(mapDocName,idxArr,onSuccess)`：获取专题图信息

> `getThemesInfo`主要参数

| 参数       | 类型     | 描述                                                         |
| ---------- | -------- | ------------------------------------------------------------ |
| mapDocName | String   | 地图文档名称                                                 |
| idxArr     | String   | 专题图索引与图层索引对应关系。语法为：“图层索引号/专题图索引号”，多个用“，”隔开。如："0/0,1/1,2/2" |
| onSuccess  | Function | 成功回调函数                                                 |
##### （3）`removeThemesInfo(mapDocName,idxArr,onSuccess)`：删除专题图信息

> `removeThemesInfo`主要参数

| 参数       | 类型     | 描述                                                         |
| ---------- | -------- | ------------------------------------------------------------ |
| mapDocName | String   | 地图文档名称                                                 |
| idxArr     | String   | 专题图索引与图层索引对应关系。语法为：“图层索引号/专题图索引号”，多个用“，”隔开。如："0/0,1/1,2/2" |
| onSuccess  | Function | 成功回调函数                                                 |
##### （4）`updateThemesInfo(mapDocName,idxArr,ThemesInfoArr,onSuccess)`：更新专题图信息

> `updateThemesInfo`主要参数

| 参数          | 类型                                                         | 描述                                                         |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| mapDocName    | String                                                       | 地图文档名称                                                 |
| idxArr        | String                                                       | 专题图索引与图层索引对应关系。语法为：“图层索引号/专题图索引号”，多个用“，”隔开。如："0/0,1/1,2/2" |
| ThemesInfoArr | Array-[<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.ThemesInfo.html" >Zondy.Object.Theme.ThemesInfo</a>] | 更新的专题图信息数组                                         |
| onSuccess     | Function                                                     | 成功回调函数                                                 |
##### （5）`addThemesInfo(mapDocName,idxArr,ThemesInfoArr,onSuccess)`：添加专题图信息

> `addThemesInfo`主要参数

| 参数          | 类型                                                         | 描述                                                         |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| mapDocName    | String                                                       | 地图文档名称                                                 |
| idxArr        | String                                                       | 专题图索引与图层索引对应关系。语法为：“图层索引号/专题图索引号”，多个用“，”隔开。如："0/0,1/1,2/2" |
| ThemesInfoArr | Array-[<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.ThemesInfo.html" >Zondy.Object.Theme.ThemesInfo</a>] | 添加的专题图信息数组                                         |
| onSuccess     | Function                                                     | 成功回调函数                                                 |
