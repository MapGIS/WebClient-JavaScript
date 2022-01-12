## 绕点旋转

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现场景绕点旋转功能，配合场景绕点旋转事件，实现开启、暂停、停止绕点旋转功能。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现。
先初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` , 然后初始化公共方法管理类 `CesiumZondy.Manager.CommonFuncManager()` ，分别调用如下对应的方法实现开启、暂停、停止绕点旋转功能。

- `rotationView`：绕点旋转事件，相机绕点飞行一周或者相机绕自身旋转一周；
- `removeRotationView`：移除绕点自旋转事件；
- `startRotationAroundPos`：开始围绕旋转，与暂停配合使用；
- `pauseRotationView`：暂停围绕旋转，与开始围绕旋转配合使用。

### 实现步骤：

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

**Step 3. <font color=red>实现场景绕点旋转控制功能</font>**:
&ensp;&ensp;&ensp;&ensp;初始化公共方法管理类 `CesiumZondy.Manager.CommonFuncManager()` ，分别调用如下对应的方法实现开启、暂停、停止绕点旋转功能。

- rotationView()

* Example:
  ```Javascript
    //设置旋转点
    var opt ={
      position:Cesium.Cartesian3.fromDegrees(108.96044700955785,34.21796237686321,60.99772929683282),
      pitch:-15,
      distance:700,
      duration:10,
      ClockRange:Cesium.ClockRange.CLAMPED
    };
    //初始化公共方法管理类
    var commfun = new CesiumZondy.Manager.CommonFuncManager({
      viewer: webGlobe.viewer
    });
    //初始化创建一个绕点旋转事件
    var update = commfun.rotationView('rotationAroundPos',opt) ;
  ```

- startRotationAroundPos()

* Example:
  ```Javascript
    //设置开始绕点旋转
    commfun.startRotationAroundPos(update);
  ```

- pauseRotationView()

* Example:
  ```Javascript
    //设置暂停绕点旋转
    commfun.pauseRotationView(update);
  ```

- removeRotationView()

* Example:
  ```Javascript
    //设置移除绕点旋转事件
    commfun.removeRotationView(update);
  ```

### 关键接口

#### 1.【三维场景控件类】`Cesium.WebSceneControl(elementId, options)`

| 参数名    | 类 型             | 说 明                |
| --------- | ----------------- | -------------------- |
| elementId | Element \| String | 放置视图的 div 的 id |
| options   | Object            | （可选）附加属性     |

- `options`属性主要参数

| 参数名           | 类 型   | 默认值 | 说 明                                                                                  |
| ---------------- | ------- | ------ | -------------------------------------------------------------------------------------- |
| viewerMode       | String  | ‘3D’   | （可选）初始视图模式默认为三维球视图 '2D'表示二维视图 'COLUMBUS_VIEW' 表示三维平面视图 |
| showInfo         | Boolean | false  | （可选）是否显示默认的属性信息框                                                       |
| animation        | Boolean | true   | （可选）默认动画控制不显示                                                             |
| baseLayerPicker  | Boolean | true   | （可选）是否创建图层控制显示小组件                                                     |
| fullscreenButton | Boolean | true   | （可选）是否创建全屏控制按钮                                                           |
| vrButton         | Boolean | false  | （可选）是否创建 VR 按钮                                                               |

#### 2. 【公共方法管理类】 `CesiumZondy.Manager.CommonFuncManager`

##### 【method】 `rotationView(typeopt, optionsParam opt) → {Event}` 绕点旋转事件，相机绕点飞行一周或者相机绕自身旋转一周

| 参数名       | 类型   | 默认值              | 说明                                 |
| ------------ | ------ | ------------------- | ------------------------------------ |
| type         | String | 'rotationAroundPos' | （可选）旋转类型，默认绕相机自身旋转 |
| optionsParam | Object | ——                  | （可选）附加参数信息                 |

- `optionsParam` 属性参数

| 参数名     | 类型       | 默认值                    | 说明                                |
| ---------- | ---------- | ------------------------- | ----------------------------------- |
| position   | Cartesian3 |                           | （可选）要进行围绕旋转的点          |
| pitch      | Number     | -30                       | （可选）相机的俯仰角 单位（度）     |
| distance   | Number     | 500000                    | （可选）相机距离点的距离 单位（米） |
| duration   | Number     | 10                        | 绕点飞行一周所用的时间 单位（秒）   |
| ClockRange | Number     | Cesium.ClockRange.CLAMPED | （可选）循环方式                    |

##### 【method】 `removeRotationView(event)` 移除绕点自旋转事件

| 参数名 | 类型                                     | 说明         |
| ------ | ---------------------------------------- | ------------ |
| event  | Event,即 rotationView 方法返回的事件对象 | 绕点旋转事件 |

##### 【method】 `startRotationAroundPos()` 开始围绕旋转，与暂停配合使用

##### 【method】 `pauseRotationView()` 暂停围绕旋转，与开始围绕旋转配合使用
