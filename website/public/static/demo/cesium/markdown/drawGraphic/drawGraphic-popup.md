## 添加Popup气泡

### 示例功能

本示例实现在三维场景中添加Popup气泡。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`AppendPopUp()`方法，实现气泡的添加。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，加载Google地图作为底图显示；

3. 添加Popup气泡：调用`AppendPopUp()`方法，设置气泡容器的id、显示的文字内容、气泡位置、像素位置偏移、以及close按钮点击的回调函数，在此设置点击close按钮时移除气泡；

    ``` javascript
    //popup的位置
    var postion = Cesium.Cartesian3.fromDegrees(114.2, 31);
    //添加PopUP
    webGlobe.AppendPopUp('popup', '测试1测试1测试1<br/>测试1测试2<br/>', postion, [95, 0], webGlobe.removePopUp);
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`AppendPopUp(containID, content, posion, offset, closeCallback, options)`：添加PopUP

> `appendPoint`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|containID|string|容器的div id（注意该容器不能放在球容器中）|
|content|string|popup的内容，可以为带html标签的字符串|
|posion|Posion:Cartesian3|popup的位置（地图单位）|
|offset|Array|[x,y]偏移值，像素单位|
|closeCallback|function|popup的close按钮点击回调函数|
|options|Object|附加属性|