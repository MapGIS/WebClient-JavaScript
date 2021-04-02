## 地图操作

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例在加载了天地图矢量图层以及其注记图层的基础上，添加了地图视图的放大、缩小、跳转以及复位功能。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】 开发库实现，然后通过 setZoom(zoom)方法设置地图的缩放等级，通过 setCenter(center)方法设置地图中心点。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线 【include-openlayers-local.js】 脚本引入开发库;

**Step 2. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式;

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数，如地图 div 容器、缩放层级、中心点等，添加天地图，具体操作参考`互联网地图`目录下的`天地图`示例;

**Step 4. <font color=red>地图放大</font>**:
&ensp;&ensp;&ensp;&ensp;通过设置地图视图的 Zoom 级别实现地图视图放大功能;

- Example:

  ```javascript
    //获取地图视图
    var view = map.getView()
    //获得当前缩放级数
    var zoom = view.getZoom()
    //地图放大一级
    view.setZoom(zoom + 1)
  ```

  **Step 5. <font color=red>地图缩小</font>**:
  &ensp;&ensp;&ensp;&ensp;通过设置地图视图的 Zoom 级别实现地图视图缩小功能;

- Example:

  ```javascript
    //获取地图视图
    var view = map.getView()
    //获得当前缩放级数
    var zoom = view.getZoom()
    //地图缩小一级
    view.setZoom(zoom - 1 >= 1 ? zoom - 1 : 1)
  ```

  **Step 6. <font color=red>地图跳转</font>**:
  &ensp;&ensp;&ensp;&ensp;通过设置地图视图的中心点位置和 Zoom 级别实现地图视图跳转;

- Example:

  ```javascript
    //获取地图视图
    var view = map.getView()
    var wh = ol.proj.fromLonLat([114, 30])
    //平移地图
    view.setCenter(wh)
    view.setZoom(7)
  ```

  **Step 7. <font color=red>地图复位</font>**:
  &ensp;&ensp;&ensp;&ensp;通过设置地图视图初始的中心点位置、Zoom 级别和旋转角度实现地图视图复位功能。

- Example:

  ```javascript
    var view = map.getView()
    //初始中心点
    view.setCenter(center)
    //初始旋转角度
    view.setRotation(rotation)
    //初始缩放级数
    view.setZoom(zoom)
  ```

### 关键接口

#### 1.【地图视图类】`ol.View`

##### 【method】`setZoom(zoom)`：设置地图视图的 Zoom 等级

| 参数名 | 类型   | 说明         |
| ------ | ------ | ------------ |
| zoom   | number | 地图缩放等级 |

##### 【method】`setCenter(center)`：设置地图视图的中心点

| 参数名 | 类型       | 说明           |
| ------ | ---------- | -------------- |
| center | coordinate | 视图中心点坐标 |
