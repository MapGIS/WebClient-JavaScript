## 军标

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能用于计算绘制线的长度，可以应用于各个场景，满足用户在使用时进行两点之间距离测量，多点之间距离测量等业务需求。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-cesium-local.js】 开发库实现。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**:
&nbsp;&nbsp;&nbsp;&nbsp;本示例引用 local 本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
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

**Step 3. <font color=red>加载数据</font>**:
&ensp;&ensp;&ensp;&ensp;调用 Cesium 三维球控件 `Cesium.WebSceneControl()` 的 `append()` 方法传入 M3D 数据服务地址，即可加载浏览数据。

- Example:
  ```Javascript
    //加载数据
    var tileset = webGlobe.append('http://develop.smaryun.com:6163/igs/rest/g3d/M3D', {});
  ```

### 关键接口

### 【method】 `showPosition(elementId, options)` : 显示经纬度 高程 视角高度

- `append` 方法主要参数

- `options` 属性说明
