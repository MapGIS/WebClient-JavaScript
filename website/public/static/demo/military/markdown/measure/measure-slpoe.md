## 坡度测量

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例提供用于计算两点<a href="https://baike.baidu.com/item/倾斜度/8974327" target="_blank">坡度</a>的功能，可以应用于各个场景，满足用户在使用时对不在同一水平面的两点进行坡度测量。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 include-cesium-local.js 开发库实现，通过初始化坡度计算工具对象 `Cesium.MeasureSlopeTool()` ，实现坡度计算功能。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维 WebGL 的功能；
**Step 2. <font color=red>创建三维地图容器并加载三维球控件</font>**:
&ensp;&ensp;&ensp;&ensp;创建 `id='GlobeView'` 的 div 作为三维视图的容器，并设置其样式，初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` ，完成此步后可在三维场景中加载三维球控件；

- Example:

  ```Javascript
    //构造三维视图类（视图容器div的id，三维视图设置参数）
    var webGlobe = new Cesium.WebSceneControl('GlobeView', {
      terrainExaggeration: 1,
    });
  ```

  ```html
    <div id="GlobeView"></div>
  ```

**Step 3. <font color=red>创建坡度计算工具</font>**:
&ensp;&ensp;&ensp;&ensp;初始化坡度计算工具对象 `Cesium.MeasureSlopeTool()` ，完成此步后可在三维场景中加载坡度计算工具；

- Example:
  ```Javascript
    //创建坡度计算工具
    var measureSlopeTool = new Cesium.MeasureSlopeTool(webGlobe.viewer);
  ```

**Step 4. <font color=red>激活坡度计算工具</font>**:
&ensp;&ensp;&ensp;&ensp;调用坡度计算工具对象 `Cesium.MeasureSlopeTool()` 的 `startTool()` 方法激活坡度计算工具，完成此步后可在三维场景中使用坡度计算工具；

- Example:
  ```Javascript
    //激活坡度计算工具
    measureSlopeTool.startTool();
  ```

**Step 5. <font color=red>停止坡度计算工具</font>**:
&ensp;&ensp;&ensp;&ensp;功能使用结束后调用坡度计算工具对象 `Cesium.MeasureSlopeTool()` 的 `stopTool()` 方法停止坡度计算工具，完成此步后可在三维场景中停止使用坡度计算工具。

- Example:
  ```Javascript
    //停止坡度计算工具
    measureSlopeTool.stopTool();
  ```

### 关键接口

#### 1. 【坡度测量工具主要类】`Cesium.MeasureSlopeTool(viewer, options)`

- `Cesium.MeasureSlopeTool` 主要参数

| 参数名  | 类型   | 说明                           |
| ------- | ------ | ------------------------------ |
| viewer  | Object | viewer 对象                    |
| options | Object | (可选)坡度测量工具可选参数设置 |

- `options` 主要参数

| 参数名                   | 类型    | 默认值                    | 说明                                                                    |
| ------------------------ | ------- | ------------------------- | ----------------------------------------------------------------------- |
| callBack                 | Boolean | function(){}              | (可选)回调函数                                                          |
| disableDepthTestDistance | Number  | Number. POSITIVE_INFINITY | (可选)只要小于这个距离深度检测就会失效，就会一直显示在最前面 不会被遮挡 |

##### 【method】 `startTool()` 激活坡度测量工具方法

##### 【method】 `stopTool()` 停止激活坡度测量工具方法
