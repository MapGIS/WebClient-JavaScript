## 3DTiles 数据加载

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能用于在当前场景中加载 3DTiles 数据，支持本地数据和网络数据加载。

### 3DTiles

&ensp;&ensp;&ensp;&ensp;3D Tiles 是用于流式传输大规模异构 3D 地理空间数据集的开放规范。为了扩展 Cesium 的地形和图像流，3D Tiles 将用于流式传输 3D 内容，包括建筑物，树木，点云和矢量数据。关于 3D Tiles 可自行了解其更多内容。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.CommonDataManager`类提供的`append3DTile()`方法与`remove3DTile()`方法，实现 3D Tiles 数据的加载与移除功能。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建三维视图 Div 容器，构造三维场景控件 WebSceneControl，构造并设置鼠标位置信息显示控件，加载 Google 地图作为底图显示；

**Step 3. <font color=red>加载 3DTiles 数据</font>**:
&ensp;&ensp;&ensp;&ensp;首先构造`CesiumZondy.Manager.CommonDataManager`通用数据管理对象，然后调用`append3DTile()`方法加载，须设置 3DTiles 数据的 URL 参数，通过加载成功回调函数定位跳转到所加载的 3DTiles 数据范围。相对加载功能，移除则调用`remove3DTile()`方法实现。

- Example:
  ```Javascript
    //构造通用数据管理对象
    var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
      viewer: webGlobe.viewer
    });
    //加载3DTile数据
    var tiles = commonDataManager.append3DTile(
      //3DTile数据路径，支持本地与网络数据
          './static/data/3DTile/BatchedTilesets/tileset.json',
      //成功回调函数
      load
    );
    function load(layer) {
      //加载成功后定位跳转
      webGlobe.viewer.flyTo(layer);
      console.log("这是一个加载成功回调");
    }
    //通过remove3DTile方法移除
    //commonDataManager.remove3DTile(tiles);
  ```

### 关键接口

#### 1.【三维场景控件】 `CesiumZondy.WebSceneControl`

#### 2.【通用数据管理类】 CesiumZondy.Manager.CommonDataManager

##### 【method】 `append3DTile(url, onsuccess, options) → {Object}` 通过路径添加 3DTile 数据，返回 kml 数据对象（Object）

| 参数名    | 类型     | 说明                                                                                                                                   |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| url       | String   | 3DTile 数据路径，本地数据路径设置如“./static/data/3DTile/BatchedTilesets/tileset.json”，网络数据路径设置如“http://{域名或IP}/xxx.json” |
| onsuccess | function | 加载成功回调函数                                                                                                                       |
| options   | Object   | 扩展参数                                                                                                                               |

##### 【method】 `remove3DTile(tileset)` 移除 3DTiles 数据对象

| 参数名  | 类型   | 说明                                                 |
| ------- | ------ | ---------------------------------------------------- |
| tileset | Object | 3DTiles 数据对象，即 append3DTile 方法返回的数据对象 |
