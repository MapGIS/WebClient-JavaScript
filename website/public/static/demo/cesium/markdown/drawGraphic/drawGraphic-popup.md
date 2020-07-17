## 添加气泡弹窗

### 示例功能

本示例实现在三维场景中添加Popup气泡弹窗。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.PopupController`类提供的`appendPopUp()`方法，实现气泡弹窗的添加。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建三维视图Div容器，构造三维场景控件WebSceneControl，构造并设置鼠标位置信息显示控件，加载Google地图作为底图显示；

3. 添加气泡弹窗：首先构造`CesiumZondy.Manager.PopupController`实体绘制控制器对象，调用`appendPopUp()`方法，设置气泡容器的id、显示的文字内容、气泡位置、像素位置偏移、以及close按钮点击的回调函数，在此设置点击close按钮时移除气泡；

    ``` javascript
    //构造实体绘制控制器对象
    var popupController = new CesiumZondy.Manager.PopupController({
        viewer: webGlobe.viewer
    });

    //popup的位置
    var postion = Cesium.Cartesian3.fromDegrees(114.30252372618706, 30.544641875459394);
    //添加PopUP
    var popup = popupController.appendPopUp(
        //容器的div id
        'popup',
        //文本
        '<center>黄鹤楼</center>位于湖北省武汉市长江南岸的武昌蛇山之巅',
        //坐标位置
        postion,
        //偏移
        [0, 0],
        //popup的close按钮点击回调函数
        popupController.removePopUp);
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【气泡弹窗控制类】CesiumZondy.Manager.PopupController

##### （1）`appendPopUp(containID, content, posion, offset, closeCallback, options)`：添加PopUP

> `appendPopUp`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|containID|string|容器的div id（注意该容器不能放在球容器中）|
|content|string|popup的内容，可以为带html标签的字符串|
|posion|Posion:Cartesian3|popup的位置（地图单位）|
|offset|Array|[x,y]偏移值，像素单位|
|closeCallback|function|popup的close按钮点击回调函数|
|options|Object|附加属性|