## 地图域当前信息

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例底图显示一个天地图世界地图，实现显示地图域当前信息功能。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】 ，通过 ol.view()类的 getResolution()方法实现显示当前分辨率功能；通过 ol.map()类的方法实现显示当前地图范围功能；通过 ol.map()类的 getView()方法实现显示当前视口范围功能；

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线 【include-openlayers-local.js】 脚本引入开发库；

**Step 2. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数,将 layers 属性设置为天地图地图图层；

**Step 4. <font color=red>获取当前视图分辨率</font>**:
&ensp;&ensp;&ensp;&ensp;通过 ol.view()类的 getResolution()方法实现显示当前分辨率功能；

* Example:

    ```javascript
        //获取最大分辨率
        var view = map.getView()
        var curResolution = view.getResolution()
    ```
**Step 5. <font color=red>获取当前地图视窗范围</font>**:
&ensp;&ensp;&ensp;&ensp;通过 ol.map()类的 getSize()方法实现显示当前地图的视窗范围(单位：像素)；

* Example:

    ```javascript
        //获取视窗范围
        var viewSize = map.getSize()
        var viewStr = viewSize[0] + ',' + viewSize[1]
    ```
**Step 6. <font color=red>获取当前地图范围</font>**:
&ensp;&ensp;&ensp;&ensp;通过 ol.view()类的 calculateExtent(opt_size)方法实现显示当前地图范围功能；

* Example:

    ```javascript
        //获取地图范围
        var ex = view.calculateExtent(viewSize)
        var mapstr = Number(ex[0]).toFixed(0) + ',' + Number(ex[1]).toFixed(0) + ',' + Number(ex[2]).toFixed(0) + ',' + Number(ex[3]).toFixed(0)
    ```

### 关键接口

#### 1.【地图视图类】`ol.View`
##### 【method】`getResolution()`：获取地图视图的分辨率

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_View-View.html#getResolution

##### 【method】`calculateExtent(opt_size)`：计算当前地图视图的地图范围

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_View-View.html#calculateExtent

#### 2.【地图类】`ol.map`
##### 【method】`getSize()`：获取当前地图的大小

详细信息见 OpenLayers API
https://openlayers.org/en/v5.3.0/apidoc/module-ol_Map-Map.html#getSize


