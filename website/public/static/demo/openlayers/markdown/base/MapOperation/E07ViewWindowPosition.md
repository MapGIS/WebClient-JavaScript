## 视窗逻辑坐标

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例底图显示一个天地图世界地图，实现显示视窗逻辑坐标功能。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】 ，通过 MousePosition 对象的 setProjection()方法实现显示视窗逻辑坐标功能。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线 【include-openlayers-local.js】 脚本引入开发库；

**Step 2. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数,将 layers 属性设置为天地图地图图层；

**Step 4. <font color=red>添加鼠标位置控件</font>**:
&ensp;&ensp;&ensp;&ensp;创建`ol.control.MousePosition()`类和`ol.Map()`类，通过设置`ol.Map()`类的 view 属性确定地图的显示中心和级别，通过设置`ol.Map()`类的 controls 属性加载鼠标位置控件；

- Example:

  ```javascript
    mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        // projection: 'EPSG:3857'
    })
    map.addControl(mousePositionControl)
  ```

  **Step 5. <font color=red>设置鼠标位置的投影信息</font>**:
  &ensp;&ensp;&ensp;&ensp;通过 MousePosition 对象的 setProjection()方法实现在鼠标位置控件中显示相应投影的坐标信息。

- Example:

  ```javascript
    if (cordinateSys == 'EPSG:4326') {
      mousePositionControl.setProjection(ol.proj.get('EPSG:4326'))
    } else if (cordinateSys == 'EPSG:3857') {
      mousePositionControl.setProjection(ol.proj.get('EPSG:3857'))
    }
  ```

### 关键接口

#### 1.【鼠标位置控件类】`ol.control.MousePosition`

##### 【method】`setProjection(projection)`：设置鼠标位置的投影信息

**详细信息见 openlayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_Geolocation-Geolocation.html#setProjection
