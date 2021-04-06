## 三角测量

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例提供两点之间<a href="https://baike.baidu.com/item/三角测量/3333949?fr=aladdin" target="_blank">三角测量</a>功能，可测量两点之间高差、水平距离、直线距离等信息，可以应用于各个场景，满足用户在使用时对于两点之间距离的直观数据获取。

### 功能实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 include-cesium-local.js 开发库实现，通过初始化三角测量工具对象 `Cesium.TriangulationTool()` ，实现三角测量功能。

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

**Step 3. <font color=red>创建三角测量工具</font>**:
&ensp;&ensp;&ensp;&ensp;初始化三角测量工具对象 `Cesium.TriangulationTool()` ，完成此步后可在三维场景中加载三角测量工具;

- Example:
  ```Javascript
    //创建三角测量工具
    var triangulationTool = new Cesium.TriangulationTool(webGlobe.viewer);
  ```

**Step 4. <font color=red>激活三角测量工具</font>**:
&ensp;&ensp;&ensp;&ensp;调用三角测量工具对象 `Cesium.TriangulationTool()` 的 `startTool()` 方法激活三角测量工具，完成此步后可在三维场景中使用三角测量工具;

- Example:
  ```Javascript
    //激活三角测量工具
    triangulationTool.startTool();
  ```

**Step 5.<font color=red>停止三角测量工具</font>**:
&ensp;&ensp;&ensp;&ensp;功能使用结束后调用三角测量工具对象 `Cesium.TriangulationTool()` 的 `stopTool()` 方法停止三角测量工具，完成此步后可在三维场景中停止使用三角测量工具。

- Example:
  ```Javascript
    //停止三角测量工具
    triangulationTool.stopTool();
  ```

### 关键接口

#### 1. 【三角测量工具主要类】`Cesium.TriangulationTool(viewer, options)`

- `Cesium.TriangulationTool` 主要参数

| 参数名  | 类型   | 说明                     |
| ------- | ------ | ------------------------ |
| viewer  | Object | viewer 对象              |
| options | Object | 三角测量工具可选参数设置 |

- `options` 主要参数

| 参数名                   | 类型    | 默认值                    | 说明                                                              |
| ------------------------ | ------- | ------------------------- | ----------------------------------------------------------------- |
| callBack                 | Boolean | function(){}              | 回调函数                                                          |
| disableDepthTestDistance | Number  | Number. POSITIVE_INFINITY | 只要小于这个距离深度检测就会失效，就会一直显示在最前面 不会被遮挡 |

##### 【method】 `startTool()` 激活三角测量工具方法

##### 【method】 `stopTool()` 停止激活三角测量工具方法
