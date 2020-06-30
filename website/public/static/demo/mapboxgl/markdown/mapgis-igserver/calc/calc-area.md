## 量算面积

### 示例功能

本示例在二维视图中加载显示一个地图文档服务数据作为底图，坐标系为`Web墨卡托`，使用MapBox-GL第三方绘制控件，绘制多边形，调用MapGIS WebClient接口获取多边形面积。

### 示例实现

本示例需要使用include-mapboxgl-local.js开发库实现，通过关键接口`Zondy.Service.CalArea()`实现指定多边形面积测量。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

> MapGIS IGServer发布地图文档服务请参见`MapGIS IGServer`目录下的`地图-EPSG3857`示例的说明部分

### 实现步骤

1. 引用开发库，本示例通过本地离线include-mapboxgl-local.js脚本引入开发库；

2. 创建`id="map"`的div作为地图容器，并设置其样式；

3. 创建地图对象，设置地图的必要参数，如地图div容器、缩放层级、中心点等，以及在地图中添加地图文档图层，具体操作参考`MapGIS IGServer`目录下的`地图-EPSG3857`示例；

4. 创建**绘制控件对象**，并使用该对象在地图中绘制多边形；

   ```javascript
   draw = new MapboxDraw({
       displayControlsDefault: false,
       controls: {
           line_string: false,
           polygon: true,
           trash: false
       }
   });
   map.addControl(draw, "top-left");//绘制工具
   ```

5. 注册`几何创建完成事件`，绘制几何结束的回调函数中组织`MapGIS二维几何点`数组；

   ```javascript
   map.on('draw.create', function (e) {
       console.log(e);
       var lonlats = e.features[e.features.length - 1].geometry.coordinates;
       var dots = [];
       for (var i = 0; i < lonlats.length; i++) {
           dots.push(new Zondy.Object.Point2D(lonlats[i][0], lonlats[i][1]))
       }
       markerlatLng = lonlats[lonlats.length - 1];
       CalPolyLineLength(dots)
   });
   ```
   
6. 创建`面积测量功能服务`及相关参数对象，执行测量功能；

   ```javascript
   //初始化长度测量服务
   var calLength = new Zondy.Service.CalArea(dots, {
       //IP地址
       ip: "develop.smaryun.com",
       //端口号
       port: "6163"
   });
   //建议普通用户采用此类直接获取MapGIS GDB已经提供的空间参考系
   var gdbInfo = new Zondy.Object.CGDBInfo({
       //数据库名称
       GDBName: "OpenLayerVecterMap",
       //数据源名称
       ServerName: "MapGISLocal",
       //除MapGISLocal数据源，其它的都设置
       Password: "",
       //除MapGISLocal数据源，其它的都设置
       User: ""
   });
   //用于进行SRSID投影的参数类
   var projBySRSID = new Zondy.Service.CProjectBySRSID(601, gdbInfo);
   //执行长度测量服务，measureCallBack为测量回调函数
   calLength.execute(projBySRSID, measureCallBack);
   ```

7. 测量结果展示，在查询成功的回调函数中将结果通过标记的形式展示，其中`GeoJSON数据源`的使用请参考`MapGIS IGServer`目录下的`要素-要素查询`示例；

### 关键接口

#### 1.【MapBox第三方绘制控件】MapboxDraw

##### `MapboxDraw(options)`：绘制控件的构造函数

通过这个控件可以在地图中绘制点、线、面几何图形

> `MapboxDraw`主要参数

| 参数名  | 类型   | 说明                             |
| ------- | ------ | -------------------------------- |
| options | Object | （可选）设置其他属性键值对对象。 |

> `options`属性参数说明

| 参数                        | 类型    | 默认值                                                       | 描述                                                         |
| --------------------------- | ------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| keybindings                 | boolean | true                                                         | 是否为绘图启用键盘交互                                       |
| touchEnabled                | boolean | true                                                         | 是否为绘图启用触摸交互                                       |
| boxSelect                   | boolean | true                                                         | 是否通过shift  +单击+拖动启用功能框选择。如果为false，则按住Shift键并单击+拖动缩放到某个区域 |
| clickBuffer                 | number  | 2                                                            | 将响应单击的任何要素或顶点（在每个方向上）周围的像素数       |
| touchBuffer                 | number  | 25                                                           | 将响应触摸的任何要素或顶点（在每个方向上）周围的像素数       |
| controls                    | object  | {<br/>point:  true,<br/>line_string: true,<br/>polygon: true,<br/>trash: true,<br/>combine_features:  true,<br/>uncombine_features: true<br/>} | 隐藏或显示单个控件。每个属性的名称都是一个控件，value是一个布尔值，指示控件是打开还是关闭。可用的控件名称是point，line_string，polygon，trash，combine_features和uncombine_features。默认情况下，所有控件都已打开。要更改该默认值，请使用displayControlsDefault |
| displayControls<br/>Default | boolean | true                                                         | 控件的默认值。例如，如果您希望默认关闭所有控件，并指定带控件的白名单，请使用displayControlsDefault：false |
| styles                      | array   | 地图样式                                                     | 一组地图样式对象。默认情况下，Draw为您提供地图样式。要了解重写样式，请查看样式绘制部分 |
| modes                       | object  | 无                                                           | 重写MapboxDraw附带几种默认模式，MapboxDraw.modes可用于查看默认值，有关自定义模式的更多信息，请访问此处 |
| defaultMode                 | string  | 'simple_select'                                              | 默认情况下，MapboxDraw附带几种模式,包含以下几种类型：'simple_select'、'direct_select'、'draw_line_string'、'draw_polygon'、'draw_point'。这些模式旨在涵盖MapboxDraw创建核心GeoJSON要素类型所需的基本功能 |
| userProperties              | boolean | false                                                        | 功能的属性也可用于样式并以user_为前缀，如：['==',  'user_custom_label', 'Example'] |

#### 2.【MapGIS点几何形状对象类】Point2D

##### `Zondy.Object.Point2D (x, y, opt_options)`：矢量图层查询参数的构造函数

MapGIS点几何形状对象类，描述构成点形状的空间几何信息。

> `Point2D `主要参数

| 参数名          | 类型   | 描述                                                         |
| --------------- | ------ | ------------------------------------------------------------ |
| **x**           | Number | 点x轴坐标                                                    |
| **y**           | Number | 点y轴坐标                                                    |
| **opt_options** | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性和 <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Tangram">Zondy.Object.Tangram</a>类的属性。例如：{key1：value1, key2：value2…} |

> `opt_options`属性参数说明

| 属性        | 类型   | 默认值   | 描述 |
| ----------- | ------ | -------- | ---- |
| **nearDis** | Number | 容差半径 | Null |

> `Point2D `方法说明

| 方法              | 返回值 | 描述                                                         | 参数                                                         |
| ----------------- | ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| getGeometryType() | String | 获取几何类型名称，默认为“point”                              |                                                              |
| setByOL(point)    | None   | 将openlayers的点几何转换为MapGIS的点几何                     | 参数1：<br/>point ：（ ol.geom.Point ）由openlayers定义的点几何对象 |
| toString()        | String | 将对象转化为字符串，返回一个以字符串形式表示的点。例如：“x,y”，由点形状坐标和逗号分割符构成的字符串。 |                                                              |

#### 3.【描述MapGIS地理数据库信息对象】CGDBInfo

##### `Zondy.Object.CGDBInfo(opt_options)`：矢量图层查询服务的构造函数

> `CGDBInfo`主要参数

| 参数名      | 类型   | 描述                                                         |
| ----------- | ------ | ------------------------------------------------------------ |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

> `opt_options`属性参数说明

| 属性       | 类型   | 默认值 | 描述                  |
| ---------- | ------ | ------ | --------------------- |
| GDBSvrName | String | Null   | GDB地理数据源名称     |
| GDBName    | String | Null   | GDB地理数据库名称     |
| User       | String | Null   | GDB数据源访问用户名   |
| Password   | String | Null   | GDB数据源访问用户密码 |

#### 4.【投影转换参数信息（通过空间参照系ID）】CProjectBySRSID

##### `Zondy.Service.CProjectBySRSID(desSrsID, gdbInfo)`：投影转换参数信息的构造函数

> `CProjectBySRSID`主要参数

| 参数名   | 类型                                                         | 描述                               |
| -------- | ------------------------------------------------------------ | ---------------------------------- |
| desSrsID | Number                                                       | 目的空间参照系ID                   |
| gdbInfo  | <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.CGDBInfo">Zondy.Object.CGDBInfo</a> | 关于指定空间参照系的地理数据库信息 |

#### 5.【面积测量功能服务】CalArea

##### （1）`Zondy.Service.CalArea(obj, opt_options)`：面积测量功能服务的构造函数

> `CalArea`主要参数

| 参数        | 类型                                                         | 描述                                                         |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| obj         | Array-[<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Point2D">Zondy.Object.Point2D</a>] | 需要计算的点数组，为保证多边形闭合，起点和终点需重合。       |
| opt_options | Object                                                       | 可选项，设置其他属性键值对对象。对象中的属性来自<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.CalServiceBase">Zondy.Service.CalServiceBase</a>、<br/> <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.GeometryAnalysisBase">Zondy.Service.GeometryAnalysisBase</a>类、<br/><a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.HttpRequest">Zondy.Service.HttpRequest</a>类的属性。<br/>例如：{key1： value1,  key2 ：value2 …} |

##### （2）**execute**(onSuccess,onError,requestType,options)：面积测量功能服务的执行函数

通过传入投影转换参数或者 投影转换参数信息（通过空间参照系ID） 进行计算，建议普通用户采用传入空间参照系ID方式。

> `execute`主要参数（来自<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.CalServiceBase">Zondy.Service.CalServiceBase</a>）

| 参数名    | 类型                                                         | 说明                                 |
| --------- | ------------------------------------------------------------ | ------------------------------------ |
| projParam | <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.CProjectParam">Zondy.Service.CProjectParam </a>\|<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.CProjectBySRSID">Zondy.Service.CProjectBySRSID</a> | 投影转换参数                         |
| onSuccess | Function                                                     | 成功回调函数                         |
| onError   | Function                                                     | 失败回调函数                         |
| options   | Object                                                       | （可选）设置其他扩展ajax请求补充参数 |
