## 设置地图背景

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例在加载了天地图矢量图层以及其注记图层的基础上，设置的地图显示的背景

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现，然后通过设置地图容器 div 的背景图片实现设置地图背景

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线【include-openlayers-local.js】脚本引入开发库;

**Step 2. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式;

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数，如地图 div 容器、缩放层级、中心点等，添加天地图，具体操作参考`互联网地图`目录下的`天地图`示例;

**Step 4. <font color=red>设置地图背景</font>**:
&ensp;&ensp;&ensp;&ensp;通过地图容器的 Div，设置其背景样式，从而实现设置地图的背景。

- Example:

  ```javascript
    var div = document.getElementById('mapCon')
    //通过style的填充背景图属性设置背景
    div.style.backgroundImage = 'url(./static/assets/logo/mapgis_black.png)'
  ```
