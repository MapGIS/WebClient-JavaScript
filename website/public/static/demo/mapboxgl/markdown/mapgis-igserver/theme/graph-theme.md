## 统计专题图

### 示例功能

提供多种统计类型，如直方图、折线图、饼图等，分析统计多个数值变量，即地理要素属性字段。

### 示例实现

本示例需要使用include-mapboxgl-local.js开发库实现，通过关键接口`Zondy.Service.ThemeOper()`实现MapGIS地图文档的`统计专题图`操作功能。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

> MapGIS IGServer发布地图文档服务请参见`MapGIS IGServer`目录下的`地图-EPSG3857`示例的说明部分

### 实现步骤

1. 引用开发库，本示例通过本地离线include-mapboxgl-local.js脚本引入开发库；

2. 创建`id="map"`的div作为地图容器，并设置其样式；

3. 创建地图对象，设置地图的必要参数，如地图div容器、缩放层级、中心点等，以及在地图中添加地图文档图层，具体操作参考`互联网地图`目录下的`天地图墨卡托`示例；

4. 创建**专题图结构信息对象**，并将该对象存放数组中，执行专题图功能时使用，如`添加专题图`、`更新专题图`。重点内容：使用`Zondy.Object.Theme.CChartTheme()`实现**统计**专题图；

   ```javascript
   //专题图信息数组
   var themesInfoArr = [];
   //初始化Zondy.Object.Theme.ThemesInfo，用于设置需添加的专题相关信息
   themesInfoArr[0] = new Zondy.Object.Theme.ThemesInfo();
   //设置图层名层
   themesInfoArr[0].LayerName = "湖北省市级区划2";
   //初始化指定图层的专题图信息对象，之后再给该数组赋值
   themesInfoArr[0].ThemeArr = [];
   //实例化CChartTheme类
   themesInfoArr[0].ThemeArr[0] = new Zondy.Object.Theme.CChartTheme();
   //专题图名称
   themesInfoArr[0].ThemeArr[0].Name = "统计专题图";
   themesInfoArr[0].ThemeArr[0].ChartType = Zondy.Object.Theme.CChartType.Bar3D;
   //ChartThemeInfoArr设置
   //设置指定专题图的专题信息，专题图可以有多个专题信息
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr = [];
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0] = new Zondy.Object.Theme.CChartThemeInfo();
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].Expression = "GDP2016";
   //必须要填写,否则会出错dcserver会挂掉
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].Caption = "GDP2016";
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].IsVisible = true;
   //实例化CRegInfo类
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo = new Zondy.Object.Theme.CRegInfo();
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.Angle = 0;
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.EndClr = 0;
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.FillClr = 81;
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.FillMode = 0;
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.FullPatFlg = true;
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.PatClr = 3;
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.PatHeight = 5;
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.PatWidth = 5;
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.OutPenW = 1;
   
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[1] = new
   Zondy.Object.Theme.CChartThemeInfo();
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[1].Expression = "GDP2015";
   //必须要填写,否则会出错dcserver会挂掉
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[1].Caption = "GDP2015";
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[1].IsVisible = true;
   //实例化CRegInfo类
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[1].RegInfo = new
   Zondy.Object.Theme.CRegInfo();
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[1].RegInfo.Angle = 0;
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[1].RegInfo.EndClr = 0;
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[1].RegInfo.FillClr = 10;
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[1].RegInfo.FillMode = 0;
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[1].RegInfo.FullPatFlg = true;
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[1].RegInfo.PatClr = 10;
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[1].RegInfo.PatHeight = 5;
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[1].RegInfo.PatWidth = 5;
   themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[1].RegInfo.OutPenW = 1;
   //RepresentInfo设置
   themesInfoArr[0].ThemeArr[0].RepresentInfo = new Zondy.Object.Theme.CChartThemeRepresentInfo();
   themesInfoArr[0].ThemeArr[0].RepresentInfo.AnnInfoLabel = new Zondy.Object.Theme.CAnnInfo();
   //标注(参数值)覆盖方式：覆盖
   themesInfoArr[0].ThemeArr[0].RepresentInfo.AnnInfoLabel.Ovprnt = true;
   //小数位数
   themesInfoArr[0].ThemeArr[0].RepresentInfo.DigitLabel = 7;
   //是否显示参数值
   themesInfoArr[0].ThemeArr[0].RepresentInfo.IsDrawLabel = true;
   //参数值类型：真实值
   themesInfoArr[0].ThemeArr[0].RepresentInfo.FormatLabel = Zondy.Object.Theme.CChartLabelFormat.Value;
   //直方图,折线图，点图属性设置
   //最大高度
   themesInfoArr[0].ThemeArr[0].RepresentInfo.MaxLength = 120;
   //厚度
   themesInfoArr[0].ThemeArr[0].RepresentInfo.ThickPersent = 10;
   //直方图中的宽度或折线图中的横向间隔
   themesInfoArr[0].ThemeArr[0].RepresentInfo.Width = 2;
   //点图半径或折线图中的点半径
   themesInfoArr[0].ThemeArr[0].RepresentInfo.PlotRadius = 1;
   //饼图属性设置
   //最小半径
   themesInfoArr[0].ThemeArr[0].RepresentInfo.MinRadius = 2;
   //角度
   themesInfoArr[0].ThemeArr[0].RepresentInfo.PieTiltedAngle = 30;
   //固定大小
   themesInfoArr[0].ThemeArr[0].RepresentInfo.PieSizeFixFlag = 1;
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
     themesInfoArr = getDefaultThemesInfo();
     //添加专题图（不是在原文档上添加，会重新生成一个专题图缓存文档）
     ThemeOper.addThemesInfo("Hubei3857", "1/0", themesInfoArr, onUniqueTheme);
     ```
     
   * 使用专题图服务对象`更新专题图`，更新专题图前生成`专题图结构信息对象`的数组；
   
     ```javascript
     themesInfoArr = getDefaultThemesInfo();
    themesInfoArr[0].ThemeArr[0].ChartType = Zondy.Object.Theme.CChartType.Pie;
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
| ThemeArr  | Array-[<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CTheme">Zondy.Object.Theme.CTheme</a>] | 专题图数组                         |

#### 2.【统计专题图图形信息类】CChartTheme

##### `Zondy.Object.Theme.CChartTheme(opt_options)`：统计专题图图形信息类的构造函数

> `CChartTheme`主要参数

| 参数名      | 类型   | 描述                                                         |
| ----------- | ------ | ------------------------------------------------------------ |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性和<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CTheme.html">Zondy.Object.Theme.CTheme</a>类的 属性。例如：{key1：value1, key2：value2…} |

> `opt_options`参数属性说明

| 属性              | 类型                                                         | 默认值 | 描述               |
| ----------------- | ------------------------------------------------------------ | ------ | ------------------ |
| ChartType         | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CChartType.html" target="_blank">Zondy.Object.Theme.CChartType</a> | 1      | 统计图类型         |
| ChartThemeInfoArr | Array-[<a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CChartThemeInfo.html" target="_blank">Zondy.Object.Theme.CChartThemeInfo</a>] | Null   | 统计专题图信息     |
| RepresentInfo     | Number                                                       | Null   | 统计图符号参数信息 |

#### 3.【未参与分类数据图形参数】CChartType

##### `Zondy.Object.Theme.CChartType`：未参与分类数据图形参数

> `CChartType`主要参数

| 常量                                  | 取值 | 描述     |
| ------------------------------------- | ---- | -------- |
| Zondy.Object.Theme.CChartType.Unknown | 0    | 未知类型 |
| Zondy.Object.Theme.CChartType.Bar     | 1    | 直方图   |
| Zondy.Object.Theme.CChartType.Bar3D   | 2    | 直方图   |
| Zondy.Object.Theme.CChartType.Pie     | 3    | 饼图     |
| Zondy.Object.Theme.CChartType.Pie3D   | 4    | 3D饼图   |
| Zondy.Object.Theme.CChartType.Line    | 5    | 折线图   |
| Zondy.Object.Theme.CChartType.Line3D  | 6    | 3D折线图 |
| Zondy.Object.Theme.CChartType.Point   | 7    | 散点图   |

#### 4.【统计专题图图形信息】CChartThemeInfo

##### `Zondy.Object.Theme.CChartThemeInfo(expression, opt_options)`：统计专题图图形信息的构造函数

> `CChartThemeInfo`主要参数

| 参数        | 类型   | 描述                                                         |
| ----------- | ------ | ------------------------------------------------------------ |
| expression  | String | 字段表达式                                                   |
| opt_options | Object | （可选）设置其他属性键值对对象。对象中的属性来自 Zondy.Object.Theme.CThemeInfo 类属性。例如：{key1： value1,  key2 ：value2 …} |

#### 5. 【区符号参数信息】CRegInfo

##### `Zondy.Object.CRegInfo(opt_options)`：区符号参数信息的构造函数

> `CRegInfo`主要参数

| **参数**    | **类型** | **描述**                                                     |
| ----------- | -------- | ------------------------------------------------------------ |
| opt_options | Object   | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

> `opt_options`属性参数说明

| 属性       | 类型    | 默认值 | 描述                                                         |
| ---------- | ------- | ------ | ------------------------------------------------------------ |
| LibID      | Number  | 0      | 系统库ID                                                     |
| Ovprnt     | Boolean | FALSE  | 覆盖方式，取值：<br/>true（覆盖，不透明显示）\|false（默认值，指透明显示）。 |
| Angle      | Number  | 0      | 图案角度                                                     |
| EndClr     | Number  | 0      | 结束填充色（请参考MapGIS颜色库中颜色的编号）                 |
| FillClr    | Number  | 46     | 区域填充色（请参考MapGIS颜色库中颜色的编号）                 |
| FillMode   | Number  |        | 填充模式，取值范围：<br/>0：常规填充<br/>1：线性渐变填充<br/>2：矩形渐变填充<br/>3：圆形渐变填充 |
| FullPatFlg | Boolean | TRUE   | 是否需要完整图案填充                                         |
| PatClr     | Number  | 3      | 图案颜色（请参考MapGIS颜色库中颜色的编号）                   |
| PatHeight  | Number  | 5      | 图案高度                                                     |
| PatID      |         | 0      | 填充图案编号（请参考MapGIS符号库中填充符号的编号）           |
| PatWidth   | Number  | 5      | 图案宽度                                                     |
| OutPenW    | Number  | 1      | 图案笔宽                                                     |

#### 5. 【统计图符号参数信息】CChartThemeRepresentInfo

##### `Zondy.Object.CChartThemeRepresentInfo(opt_options)`：统计图符号参数信息的构造函数

> `CChartThemeRepresentInfo`主要参数

| 参数        | 类型   | 描述                                                         |
| ----------- | ------ | ------------------------------------------------------------ |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类属性。例如：{key1：value1,  key2：value2 …} |

> `opt_options`参数属性说明

| 属性           | 类型                                                         | 默认值 | 描述                                                         |
| -------------- | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| AnnInfoLabel   | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CAnnInfo.html" target="_blank">Zondy.Object.Theme.CAnnInfo</a> |        | 统计值作为注记的表现信息                                     |
| DigitLabel     | Number                                                       | 0      | 统计值小数点位置                                             |
| FormatLabel    | <a href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Theme.CChartLabelFormat.html" target="_blank">Zondy.Object.Theme.CChartLabelFormat</a> | 0      | 统计值类型                                                   |
| IsDrawLabel    | Number                                                       | TRUE   | 是否显示统计值                                               |
| LineColor      | Number                                                       | -1     | 线颜色值（请参考MapGIS颜色库中颜色编号）                     |
| MaxLength      | Number                                                       | 30     | 统计图标最大长度                                             |
| MinRadius      | Number                                                       | 10     | 统计图标最小半径                                             |
| PieSizeFixFlag | Number                                                       | 0      | 相同大小（饼图\3D饼图适用），取值为：     0：按属性求和值计算大小     1：相同大小 |
| PieTiltedAngle | Number                                                       | 30     | 统计图标倾斜角度                                             |
| PlotRadius     | Number                                                       | 1      | 统计图标半径                                                 |
| ThickPersent   | Number                                                       | 10     | 统计图标厚度                                                 |
| Width          | Number                                                       | 3      | 统计图标宽度                                                 |

#### 6. 【统计图符号参数信息】CAnnInfo

##### `Zondy.Object.CAnnInfo(opt_options)`：统计图符号参数信息的构造函数

> `CAnnInfo`主要参数

| 参数        | 类型   | 描述                                                         |
| ----------- | ------ | ------------------------------------------------------------ |
| opt_options | Object | （可选）设置其他属性键值对对象。对象中的属性来自本类属性。例如：{key1：value1,  key2：value2 …} |

> `opt_options`参数属性说明

| 属性      | 类型    | 默认值 | 描述                                                         |
| --------- | ------- | ------ | ------------------------------------------------------------ |
| LibID     | Number  | 0      | 系统库ID                                                     |
| Ovprnt    | Boolean | FALSE  | 覆盖方式，取值：<br/>true（覆盖，不透明显示）\|false（默认值，指透明显示）。 |
| Angle     |         | 0      | 图案角度                                                     |
| BackClr   | Number  | 0      | 背景颜色（请参考MapGIS颜色库中颜色的编号）                   |
| BackExp   | Number  | 0      | 背景范围扩展                                                 |
| Chnt      | Number  | 0      | 西文字体（请参考MapGIS字体库字体编号）                       |
| Color     | Number  | 0      | 注记颜色（请参考MapGIS颜色库中颜色的编号）                   |
| FontAngle | Number  | 0      | 字符角度值                                                   |
| Height    | Number  | 0      | 注记高度                                                     |
| Ifnt      | Number  | 0      | 中文字体（请参考MapGIS字体库字体编号）                       |
| Ifnx      | Number  | 0      | 字形，取值范围：<br/> 0：正体 <br/>1：左斜<br/>2：右斜<br/>3：左耸<br/>4：右耸 |
| IsFilled  | Boolean | FALSE  | 自动压背景颜色标志                                           |
| IsHzpl    | Boolean | TRUE   | 排列方式，是否水平排列。取值：<br/>true（水平排列）\|false（垂直排列）。 |
| OffsetX   | Number  | 0      | X方向的偏移                                                  |
| OffsetY   | Number  | 0      | Y方向的偏移                                                  |
| Space     | Number  | 0      | 间隔值                                                       |
| Width     | Number  | 0      | 注记宽度                                                     |

#### 7. 【专题图服务】ThemeOper

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