## 加载地形影像

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在三维场景中加载在线地形影像数据，对接 MapGIS IGServer 发布的二维瓦片地图服务。

### 示例实现

&ensp;&ensp;&ensp;&ensp;数据准备：需提前在 MapGIS Server Manager 服务管理器中将地形影像数据发布为二维瓦片地图服务。

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Layer.TilesLayer`类提供的`appendMapGISTile()`方法，以此来加载 IGServer 二维瓦片地图服务数据。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id='GlobeView'`的 div 作为三维视图的容器，并设置其样式；

**Step 3. <font color=red>构造三维场景控件</font>**：
&ensp;&ensp;&ensp;&ensp;实例化`Cesium.WebSceneControl`对象，完成此步骤后可在三维场景中加载三维球控件；

- Example:
  ```javascript
    //构造三维视图对象（视图容器div的id，三维视图设置参数）
    var webGlobe = new Cesium.WebSceneControl('GlobeView', {})
  ```

**Step 4. <font color=red>加载数据</font>**:
&ensp;&ensp;&ensp;&ensp;加载数据：首先构造`CesiumZondy.Layer.TilesLayer`瓦片图层管理对象，然后构造图层加载的参数，如范围、瓦片初始级行列数、最大显示级别等信息，可用来指定瓦片显示的范围、最大级别等；然后调用`appendMapGISTile()`方法传入二维瓦片服务地址及参数，即可加载浏览数据。

- Example:
  ```javascript
    //构造瓦片图层管理对象（视图）
    var layer = new CesiumZondy.Layer.TilesLayer({
      viewer: webGlobe.viewer,
    })
    //参数
    var options = {
      tileRang: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
      //瓦片初始级的列数 默认为2
      colNum: 2,
      //瓦片初始级的行数 默认为1
      rowNum: 1,
      //瓦片最大显示级数 默认为19
      maxLevel: 19,
      //如瓦片裁的不是256,则需设置下面两个参数
      //瓦片宽度
      tileWidth: 256,
      //瓦片高度
      tileHeight: 256,
    }
    //添加MapGIS IGServer发布的二维瓦片地图服务
    var tilelayer = layer.appendMapGISTile('http://develop.smaryun.com:6163/igs/rest/mrms/tile/250DEM', options)
  ```

### 关键接口

#### 1.【三维场景控件类】`Cesium.WebSceneControl(elementId, options)`

| 参数名    | 类 型             | 说 明                |
| --------- | ----------------- | -------------------- |
| elementId | Element \| String | 放置视图的 div 的 id |
| options   | Object            | （可选）附加属性     |

- `options`属性主要参数

| 参数名           | 类 型   | 默认值 | 说 明                                                                                  |
| ---------------- | ------- | ------ | -------------------------------------------------------------------------------------- |
| viewerMode       | String  | ‘3D’   | （可选）初始视图模式默认为三维球视图 '2D'表示二维视图 'COLUMBUS_VIEW' 表示三维平面视图 |
| showInfo         | Boolean | false  | （可选）是否显示默认的属性信息框                                                       |
| animation        | Boolean | true   | （可选）默认动画控制不显示                                                             |
| baseLayerPicker  | Boolean | true   | （可选）是否创建图层控制显示小组件                                                     |
| fullscreenButton | Boolean | true   | （可选）是否创建全屏控制按钮                                                           |
| vrButton         | Boolean | false  | （可选）是否创建 VR 按钮                                                               |

#### 2.【瓦片图层管理类】`CesiumZondy.Layer.TilesLayer`

##### 【method】`appendMapGISTile(url, options)`：添加 MapGIS IGSserver 发布的瓦片服务

| 参数名  | 类 型  | 说 明        |
| ------- | ------ | ------------ |
| url     | String | 瓦片服务地址 |
| options | Object | 附加属性     |

- `options`属性主要参数

| 参数名    | 类 型     | 默认值 | 说 明                                                     |
| --------- | --------- | ------ | --------------------------------------------------------- |
| tileRange | Rectangle | 无     | Rectangle.fromDegrees(-180,-90,180,90) 默认范围为全球范围 |
| colNum    | Number    | 2      | 瓦片初始级的列数                                          |
| rowNum    | Number    | 1      | 瓦片初始级的行数                                          |
| tileWidth | Number    | 256    | 瓦片宽度                                                  |
| tileHeigh | Number    | 256    | 瓦片高度                                                  |
| maxLevel  | Number    | 19     | 瓦片最大显示级数 默认为 19                                |
| proxy     | String    | 无     | 转发代理，不存在跨域可不设置                              |
