## 图层选择控件

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例在加载了天地图矢量图层以及其注记图层以及天地图影像图层及其注记图层的基础上添加了图层选择控件

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】 开发库实现，通过关键接口`setVisible`控制图层可见性。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线 【include-openlayers-local.js】 脚本引入开发库;

**Step 2. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式;

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数，如地图 div 容器、缩放层级、中心点等，添加天地图，具体操作参考`互联网地图`目录下的`天地图`示例;

**Step 4. <font color=red>创建图层</font>**:
&ensp;&ensp;&ensp;&ensp;创建多个图层，构建图层目录树列表，根据图层列表前的复选框来切换图层显示与隐藏状态;

**Step 5. <font color=red>控制图层显示</font>**:
&ensp;&ensp;&ensp;&ensp;图层的显示;

- Example:

  ```javascript
    layer.setVisible(true)
  ```

  **Step 6. <font color=red>控制图层隐藏</font>**:
  &ensp;&ensp;&ensp;&ensp;图层的隐藏。

- Example:

  ```javascript
    layer.setVisible(false)
  ```

### 关键接口

#### 1.【图层基类】`ol.layer.Layer`

##### 【method】`setVisible(visible)`：设置图层的可见性

| 参数名  | 类型    | 说明         |
| ------- | ------- | ------------ |
| visible | boolean | 图层的可见性 |
