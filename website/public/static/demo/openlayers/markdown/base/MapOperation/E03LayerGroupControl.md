## 图层组控制

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例实现图层组控制功能

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】 开发库实现。通过 layer 对象的 setOpacity()方法设置图层透明度以及 setVisible()方法设置图层是否可见

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线 【include-openlayers-local.js】 脚本引入开发库;

**Step 2. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式;

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数,将 layers 属性设置为天地图矢量图层、天地图注记图层以及 ;mapbox TileJson 图层

**Step 4. <font color=red>设置图层透明度</font>**:
&ensp;&ensp;&ensp;&ensp;创建图层组控制控件，通过 layer 对象的 setOpacity()方法设置图层透明度;

* Example:

    ```javascript
        layer.setOpacity(parseFloat(this.value))
    ```
**Step 5. <font color=red>设置图层是否可见</font>**:
&ensp;&ensp;&ensp;&ensp;通过 layer 对象的 setVisible()方法设置图层是否可见。

* Example:

    ```javascript
        layer.setVisible(this.checked)
    ```

### 关键接口

#### 1.【图层基类】`ol.layer.Layer`
##### 【method】`setVisible(visible)`：设置图层的可见性

| 参数名  | 类型    | 说明         |
| ------- | ------- | ------------ |
| visible | boolean | 图层的可见性 |

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_layer_Layer-Layer.html#setVisible

##### 【method】`setOpacity(opacity)`：设置图层的可见性

| 参数名  | 类型     | 说明            |
| ------- | ------- | --------------  |
| opacity | number  | 图层的透明度(0-1)|

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_layer_Layer-Layer.html#setOpacity



