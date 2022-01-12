## 添加气泡弹窗

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在三维场景中添加 Popup 气泡弹窗。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.PopupController`类提供的`appendPopup()`方法，实现气泡弹窗的添加；可分别通过`removePopup()、clearPopups()、refreshPopups()`方法移除、更新 Popup 标注。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;引用开发库：本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建三维视图 Div 容器，构造三维场景控件 WebSceneControl，构造并设置鼠标位置信息显示控件，加载 Google 地图作为底图显示；

**Step 3. <font color=red>添加气泡弹窗</font>**:
&ensp;&ensp;&ensp;&ensp;添加气泡弹窗：首先构造`CesiumZondy.Manager.PopupController`气泡弹窗控制对象，调用`appendPopup()`方法，设置气泡容器的 id、显示的文字内容、气泡位置、像素位置偏移、以及 close 按钮点击的回调函数，在此设置点击 close 按钮时移除气泡，添加完气泡之后，调用`refreshPopups()`方法刷新使气泡能够随地图操作不断更新位置。

- Example:

  ```javascript
    //构造气泡弹窗控制对象
    var popupController = new CesiumZondy.Manager.PopupController({
      viewer: webGlobe.viewer,
    })

    //添加PopUP
    var popup = popupController.appendPopup(
      //容器div的id
      'popup',
      //文本
      '<center>黄鹤楼</center>位于湖北省武汉市长江南岸的武昌蛇山之巅',
      //坐标位置
      Cesium.Cartesian3.fromDegrees(114.30252372618706, 30.544641875459394),
      //偏移量
      [0, 0],
      //弹窗的关闭按钮点击回调函数
      function() {
        popupController.removePopup(popup, 'popup', {})
      }
    )
    //刷新
    popupController.refreshPopups()
  ```

### 关键接口

#### 1.【三维场景控件类】`Cesium.WebSceneControl(elementId, options)`

| 参数名    | 类 型             | 说 明             |
| --------- | ----------------- | ----------------- |
| elementId | Element \| String | 放置视图的div的id |
| options   | Object            | （可选）附加属性  |

* `options`属性主要参数

| 参数名           | 类 型   | 默认值 | 说 明                                                        |
| ---------------- | ------- | -------- | ------------------------------------------------------------ |
| viewerMode       | String  | ‘3D’   | （可选）初始视图模式默认为三维球视图 '2D'表示二维视图 'COLUMBUS_VIEW' 表示三维平面视图 |
| showInfo         | Boolean | false  | （可选）是否显示默认的属性信息框                             |
| animation        | Boolean | true   | （可选）默认动画控制不显示                                   |
| baseLayerPicker  | Boolean | true   | （可选）是否创建图层控制显示小组件                           |
| fullscreenButton | Boolean | true   | （可选）是否创建全屏控制按钮                                 |
| vrButton         | Boolean | false  | （可选）是否创建VR按钮                                       |

#### 2.【气泡弹窗控制类】`CesiumZondy.Manager.PopupController`

##### 【method】`appendPopup(containID, content, position, offset, closeCallback, options)`：添加 PopUP，需考虑相机的高度对 PopUp 大小、透明度、偏移值的影响

- `appendPopUp`方法主要参数

| 参数名        | 类 型      | 说 明                                       |
| ------------- | ---------- | ------------------------------------------- |
| containID     | String     | 容器的 div id（注意该容器不能放在球容器中） |
| content       | String     | popup 的内容，可以为带 html 标签的字符串    |
| posion        | Cartesian3 | popup 的位置（地图单位）                    |
| offset        | Array      | [x,y]偏移值，像素单位                       |
| closeCallback | function   | popup 的 close 按钮点击回调函数             |
| options       | Object     | 附加属性                                    |

- `options`参数主要属性

| 参数名                     | 类 型  | 默认值       | 说 明                                                                                                                               |
| -------------------------- | ------ | ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| scaleByDistance            | Number | cameraHeight | （可选）options.scaleByDistance = new Cesium.NearFarScalar(1.5e2, 1.5, 8.0e6, 0.0) 基于距摄像机距离指定广告牌比例                   |
| translucencyByDistance     | Number | cameraHeight | （可选）options.translucencyByDistance = new Cesium.NearFarScalar(1.5e2, 1.5, 8.0e6, 0.0) 基于距摄像机的距离来指定广告牌的透明度    |
| pixelOffsetScaleByDistance | Number | cameraHeight | （可选）options.pixelOffsetScaleByDistance = new Cesium.NearFarScalar(1.5e2, 0.0, 8.0e6, 10.0) 基于距摄像机的距离指定广告牌像素偏移 |

##### 【method】`removePopup(popID, popupOwner, options)`：移除某个 PopUP

- `removePopup`方法主要参数

| 参数名     | 类 型  | 说 明                             |
| ---------- | ------ | --------------------------------- |
| popID      | String | popup 的 div id 添加 popup 返回值 |
| popupOwner | Object | popup 所有者                      |
| options    | Object | 扩展参数                          |

- `options`参数主要属性

| 参数名    | 类 型   | 默认值 | 说 明        |
| --------- | ------- | ------ | ------------ |
| removeDiv | Boolean | false  | 是否移除 div |

##### 【method】`refreshPopups()`：刷新，Popup 更新事件

##### 【method】`clearPopups()`：移除所有的 PopUP
