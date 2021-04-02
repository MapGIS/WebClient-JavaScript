## 量算长度

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例在二维视图中加载显示一个地图文档服务数据作为底图，坐标系为`Web墨卡托`，使用 MapBox-GL 第三方绘制控件，绘制折线，调用 MapGIS WebClient 接口获取折线长度。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-mapboxgl-local.js 】开发库实现，通过关键接口`Zondy.Service.CalPolyLineLength()`实现指定折线长度测量。

> 开发库使用请参见*首页-概述-调用方式*。

> MapGIS IGServer 发布地图文档服务请参见`MapGIS IGServer`目录下的`地图-EPSG3857`示例的说明部分

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;引用开发库，本示例通过本地离线【include-mapboxgl-local.js】脚本引入开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="map"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数，如地图 div 容器、缩放层级、中心点等，以及在地图中添加地图文档图层，具体操作参考`MapGIS IGServer`目录下的`地图-EPSG3857`示例；

**Step 4. <font color=red>创建绘制空间对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建**绘制控件对象**，并使用该对象在地图中绘制折线；

- Example
  ```javascript
    draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        line_string: true,
        polygon: false,
        trash: false,
      },
    })
    map.addControl(draw, 'top-left') //绘制工具
  ```

**Step 5. <font color=red>注册几何完成事件</font>**:
&ensp;&ensp;&ensp;&ensp;注册`几何创建完成事件`，绘制几何结束的回调函数中组织`MapGIS二维几何点`数组；

- Example:

  ```javascript
    map.on('draw.create', function(e) {
      var lonlats = e.features[e.features.length - 1].geometry.coordinates
      var dots = []
      for (var i = 0; i < lonlats.length; i++) {
        dots.push(new Zondy.Object.Point2D(lonlats[i][0], lonlats[i][1]))
      }
      markerlatLng = lonlats[lonlats.length - 1]
      CalPolyLineLength(dots)
    })
  ```

**Step 6. <font color=red>创建折线长度测量功能服务对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建`折线长度测量功能服务`及相关参数对象，执行测量功能；

- Example：
  ```javascript
    //初始化长度测量服务
    var calLength = new Zondy.Service.CalPolyLineLength(dots, {
      //IP地址
      ip: 'develop.smaryun.com',
      //端口号
      port: '6163',
    })
    //建议普通用户采用此类直接获取MapGIS GDB已经提供的空间参考系
    var gdbInfo = new Zondy.Object.CGDBInfo({
      //数据库名称
      GDBName: 'OpenLayerVecterMap',
      //数据源名称
      ServerName: 'MapGISLocal',
      //除MapGISLocal数据源，其它的都设置
      Password: '',
      //除MapGISLocal数据源，其它的都设置
      User: '',
    })
    //用于进行SRSID投影的参数类
    var projBySRSID = new Zondy.Service.CProjectBySRSID(601, gdbInfo)
    //执行长度测量服务，measureCallBack为测量回调函数
    calLength.execute(projBySRSID, measureCallBack)
  ```

**Step 7. <font color=red>结果展示</font>**:
&ensp;&ensp;&ensp;&ensp;测量结果展示，在查询成功的回调函数中将结果通过标记的形式展示，其中`GeoJSON数据源`的使用请参考`MapGIS IGServer`目录下的`要素-要素查询`示例。

### 关键接口

#### 1.【MapBox 第三方绘制控件】`MapboxDraw(options)`

通过这个控件可以在地图中绘制点、线、面几何图形

| 参数名  | 类型   | 说明                             |
| ------- | ------ | -------------------------------- |
| options | Object | （可选）设置其他属性键值对对象。 |

- `options`属性主要参数

| 参数                        | 类型    | 默认值                                                                                                                                       | 描述                                                                                                                                                                                                                                                                 |
| --------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keybindings                 | boolean | true                                                                                                                                         | 是否为绘图启用键盘交互                                                                                                                                                                                                                                               |
| touchEnabled                | boolean | true                                                                                                                                         | 是否为绘图启用触摸交互                                                                                                                                                                                                                                               |
| boxSelect                   | boolean | true                                                                                                                                         | 是否通过 shift +单击+拖动启用功能框选择。如果为 false，则按住 Shift 键并单击+拖动缩放到某个区域                                                                                                                                                                      |
| clickBuffer                 | number  | 2                                                                                                                                            | 将响应单击的任何要素或顶点（在每个方向上）周围的像素数                                                                                                                                                                                                               |
| touchBuffer                 | number  | 25                                                                                                                                           | 将响应触摸的任何要素或顶点（在每个方向上）周围的像素数                                                                                                                                                                                                               |
| controls                    | object  | {<br/>point: true,<br/>line_string: true,<br/>polygon: true,<br/>trash: true,<br/>combine_features: true,<br/>uncombine_features: true<br/>} | 隐藏或显示单个控件。每个属性的名称都是一个控件，value 是一个布尔值，指示控件是打开还是关闭。可用的控件名称是 point，line_string，polygon，trash，combine_features 和 uncombine_features。默认情况下，所有控件都已打开。要更改该默认值，请使用 displayControlsDefault |
| displayControls<br/>Default | boolean | true                                                                                                                                         | 控件的默认值。例如，如果您希望默认关闭所有控件，并指定带控件的白名单，请使用 displayControlsDefault：false                                                                                                                                                           |
| styles                      | array   | 地图样式                                                                                                                                     | 一组地图样式对象。默认情况下，Draw 为您提供地图样式。要了解重写样式，请查看样式绘制部分                                                                                                                                                                              |
| modes                       | object  | 无                                                                                                                                           | 重写 MapboxDraw 附带几种默认模式，MapboxDraw.modes 可用于查看默认值，有关自定义模式的更多信息，请访问此处                                                                                                                                                            |
| defaultMode                 | string  | 'simple_select'                                                                                                                              | 默认情况下，MapboxDraw 附带几种模式,包含以下几种类型：'simple_select'、'direct_select'、'draw_line_string'、'draw_polygon'、'draw_point'。这些模式旨在涵盖 MapboxDraw 创建核心 GeoJSON 要素类型所需的基本功能                                                        |
| userProperties              | boolean | false                                                                                                                                        | 功能的属性也可用于样式并以 user\_为前缀，如：['==', 'user_custom_label', 'Example']                                                                                                                                                                                  |

#### 2.【MapGIS 点几何形状对象类】`Zondy.Object.Point2D (x, y, opt_options)`

MapGIS 点几何形状对象类，描述构成点形状的空间几何信息。

| 参数名          | 类型   | 描述                                                                                                                                                                                                                            |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **x**           | Number | 点 x 轴坐标                                                                                                                                                                                                                     |
| **y**           | Number | 点 y 轴坐标                                                                                                                                                                                                                     |
| **opt_options** | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性和 <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Tangram">Zondy.Object.Tangram</a>类的属性。例如：{key1：value1, key2：value2…} |

- `opt_options`属性主要参数

| 属性        | 类型   | 默认值   | 描述 |
| ----------- | ------ | -------- | ---- |
| **nearDis** | Number | 容差半径 | Null |

- `Point2D`方法说明

| 方法              | 返回值 | 描述                                                                                                  | 参数                                                                   |
| ----------------- | ------ | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| getGeometryType() | String | 获取几何类型名称，默认为“point”                                                                       |                                                                        |
| setByOL(point)    | None   | 将 openlayers 的点几何转换为 MapGIS 的点几何                                                          | 参数 1：<br/>point ：（ ol.geom.Point ）由 openlayers 定义的点几何对象 |
| toString()        | String | 将对象转化为字符串，返回一个以字符串形式表示的点。例如：“x,y”，由点形状坐标和逗号分割符构成的字符串。 |                                                                        |

#### 3.【矢量图层查询服务类】`Zondy.Object.CGDBInfo(opt_options)`

| 参数名      | 类型   | 描述                                                                                            |
| ----------- | ------ | ----------------------------------------------------------------------------------------------- |
| opt_options | Object | 可选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2…} |

- `opt_options`属性主要参数

| 属性       | 类型   | 默认值 | 描述                   |
| ---------- | ------ | ------ | ---------------------- |
| GDBSvrName | String | Null   | GDB 地理数据源名称     |
| GDBName    | String | Null   | GDB 地理数据库名称     |
| User       | String | Null   | GDB 数据源访问用户名   |
| Password   | String | Null   | GDB 数据源访问用户密码 |

#### 4.【投影转换参数信息类】`Zondy.Service.CProjectBySRSID(desSrsID, gdbInfo)`

| 参数名   | 类型                                                                                                                    | 描述                               |
| -------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| desSrsID | Number                                                                                                                  | 目的空间参照系 ID                  |
| gdbInfo  | <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.CGDBInfo">Zondy.Object.CGDBInfo</a> | 关于指定空间参照系的地理数据库信息 |

#### 5.【折线长度测量功能服务类】`Zondy.Service.CalPolyLineLength(obj, opt_options)`

| 参数        | 类型                                                                                                                          | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| obj         | Array-[<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Object.Point2D">Zondy.Object.Point2D</a>] | 需要计算的点数组                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| opt_options | Object                                                                                                                        | 可选项，设置其他属性键值对对象。对象中的属性来自<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.CalServiceBase">Zondy.Service.CalServiceBase</a>、<br/> <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.GeometryAnalysisBase">Zondy.Service.GeometryAnalysisBase</a>类、<br/><a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.HttpRequest">Zondy.Service.HttpRequest</a>类的属性。<br/>例如：{key1： value1, key2 ：value2 …} |

##### 【method】`execute(onSuccess,onError,requestType,options)`：折线长度测量功能服务的执行函数

通过传入投影转换参数或者 投影转换参数信息（通过空间参照系 ID） 进行计算，建议普通用户采用传入空间参照系 ID 方式。

- `execute`主要参数（来自<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.CalServiceBase">Zondy.Service.CalServiceBase</a>）

| 参数名    | 类型                                                                                                                                                                                                                                                                          | 说明                                   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| projParam | <a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.CProjectParam">Zondy.Service.CProjectParam </a>\|<a target="_blank" href="http://develop.smaryun.com:8899/docs/mapboxgl/Zondy.Service.CProjectBySRSID">Zondy.Service.CProjectBySRSID</a> | 投影转换参数                           |
| onSuccess | Function                                                                                                                                                                                                                                                                      | 成功回调函数                           |
| onError   | Function                                                                                                                                                                                                                                                                      | 失败回调函数                           |
| options   | Object                                                                                                                                                                                                                                                                        | （可选）设置其他扩展 ajax 请求补充参数 |

```

```
