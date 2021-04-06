## 地图事件

### 示例功能

&ensp;&ensp;&ensp;&ensp;该示例底图显示一个天地图世界地图，实现了地图的不同事件的监听和触发。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】 ，通过 map.on(type，listener)方法绑定事件和 map.un(type，listener)方法删除绑定事件。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线【include-openlayers-local.js】 脚本引入开发库;

**Step 2. <font color=red>创建地图容器</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式;

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数,将 layers 属性设置为天地图地图图层;

**Step 4. <font color=red>监听地图视图鼠标点击事件</font>**:
&ensp;&ensp;&ensp;&ensp;调用`ol.map.on`实现监听地图视图鼠标点击;

- Example:

  ```javascript
    //鼠标绑定点击事件
    map.on(eventType, eventCallback)
  ```

**Step 5. <font color=red>注销地图视图鼠标点击事件</font>**:
&ensp;&ensp;&ensp;&ensp;调用`ol.map.un`实现注销地图视图鼠标点击。

- Example:

  ```javascript
    //取消上一次鼠标绑定的点击事件
    map.un(preEventType, eventCallback)
  ```

### 关键接口

#### 1.【地图类】`ol.map`

##### 【method】`on(type，listener)`：监听地图事件

| 参数名   | 类型     | 说明                     |
| -------- | -------- | ------------------------ |
| type     | String   | Array{String}            | 事件类型 |
| listener | function | 监听事件发生时触发的函数 |

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_PluggableMap-PluggableMap.html#on

##### 【method】`un(type，listener)`：注销地图事件

| 参数名   | 类型     | 说明                     |
| -------- | -------- | ------------------------ |
| type     | String   | Array{String}            | 事件类型 |
| listener | function | 监听事件发生时触发的函数 |

**详细信息见 OpenLayers API**
https://openlayers.org/en/v5.3.0/apidoc/module-ol_PluggableMap-PluggableMap.html#un
