## 添加本地图片数据

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在三维场景中添加图片。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.CommonDataManager`类提供的`appendImageByUrl()`方法，实现图片的添加。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建三维视图 Div 容器，构造三维场景控件 WebSceneControl，构造并设置鼠标位置信息显示控件；

**Step 3. <font color=red>添加图片</font>**:
&ensp;&ensp;&ensp;&ensp;添加图片：首先构造`CesiumZondy.Manager.CommonDataManager`通用数据管理对象，然后调用`appendImageByUrl()`方法，需要传入图片的地址（可为本地图片地址，也可以为网络图片的 URL），以及图片显示的坐标范围；

- Example:
  ```javascript
    //构造通用数据管理对象
    var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
      viewer: webGlobe.viewer,
    })
    //添加图片
    var image = commonDataManager.appendImageByUrl(
      //本地图片地址
      './static/data/picture/world.jpg',
      //图片显示范围（西经、南纬、东经、北纬）
      -180.0,
      -90,
      180.0,
      90
    )
  ```

### 关键接口

#### 1.【三维场景控件】`WebSceneControl`

#### 2.【通用数据管理类】`CesiumZondy.Manager.CommonDataManager`

##### 【method】`appendImageByUrl(url, west, south, east, north, options)`：通过地址添加图片，包括本地图片和网络图片

| 参数名  | 类 型  | 说 明    |
| ------- | ------ | -------- |
| url     | String | 图片地址 |
| west    | Number | 西经     |
| south   | Number | 南纬     |
| east    | Number | 东经     |
| north   | Number | 北纬     |
| options | Object | 扩展参数 |
