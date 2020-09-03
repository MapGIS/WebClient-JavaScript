## M3D数据单体查询

### 示例功能

本示例实现在三维场景中展示M3D模型数据，并实现单体查询功能。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为：`Cesium.WebSceneControl.Scene`类的`pick()`方法来选取要素，`CesiumZondy.Manager.AnalysisManager`类的`startCustomDisplay()`方法来实现模型高亮。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建三维视图Div容器，构造三维场景控件WebSceneControl，构造并设置鼠标位置信息显示控件，加载Google地图作为底图显示；

3. 加载M3D模型数据：例如M3D建筑粗模数据；

    ``` javascript
    //构造M3D模型层管理对象（视图）
    var m3dLayer = new CesiumZondy.Layer.M3DLayer({
        viewer: webGlobe.viewer
    });
    //加载M3D地图文档（服务地址，配置参数）
    var layerList = m3dLayer.append(
        'http://develop.smaryun.com:6163/igs/rest/g3d/buildings1',
        {
            maximumScreenSpaceError: 1
        }
    );
    ```

4. 注册鼠标点击事件：构造`CesiumZondy.Manager.MouseEventManager`对象，调用`registerMouseEvent()`方法注册鼠标左键单击事件，在事件方法中选取要素，然后构造`CesiumZondy.Manager.AnalysisManager`对象，调用其`startCustomDisplay()`方法实现高亮；

    ``` javascript
    //构造鼠标事件管理对象
    var mouseEventManager = new CesiumZondy.Manager.MouseEventManager({
        viewer: webGlobe.viewer
    });
    //注册鼠标左键单击事件
    mouseEventManager.registerMouseEvent('LEFT_CLICK', highlightPicking);
    ```

    鼠标左键单击事件方法：实现高亮；

    ``` javascript
    /*鼠标左键单击事件回调：模型高亮*/
    function highlightPicking(movement) {
        //根据鼠标点击位置选择对象
        var pickedFeature = webGlobe.scene.pick(movement.position);

        //获取要素的瓦片集
        var currentLayer = [pickedFeature.tileset];
        //获取名称属性
        var title = pickedFeature.getProperty('name');
        //采用_分割
        var values = title.split('_');
        //获取数组中第三个数值，即为要素的ID
        var vlueNumber = parseInt(values[2]);
        //构建数组
        var idList = [vlueNumber];
        //构建参数：设置颜色
        var options = {
            //高亮颜色
            color: new Cesium.Color(255 / 255, 255 / 255, 0 / 255, 1),
            //高亮模式：REPLACE为替换
            colorBlendMode: Cesium.Cesium3DTileColorBlendMode.REPLACE
        }

        //构造分析功能管理对象
        var analysisManager = new CesiumZondy.Manager.AnalysisManager({
            viewer: webGlobe.viewer
        });
        //开始闪烁查找到的模型
        analysisManager.startCustomDisplay(currentLayer, idList, options);
    }
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【鼠标事件管理类】MouseEventManager

##### （1）`registerMouseEvent(eventType, callbackFun, handler) → {Handler}`：注册鼠标事件

> `registerMouseEvent`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|eventType|String|事件类型：LEFT_CLICK、RIGHT_CLICK、MOUSE_MOVE、LEFT_DOUBLE_CLICK、RIGHT_DOUBLE_CLICK、WHEEL(鼠标滚轮)|
|callbackFun|function|回调函数|
|handler|Object|事件句柄|

#### 3.【分析功能管理类】AnalysisManager

##### （1）`startCustomDisplay(layerList, idList, options)`：高亮显示

> `startCustomDisplay`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|layerList|Array.\<layer>|图层列表|
|idList|Array.\<id>|id列表|
|optionsParam|Object|扩展属性|

> `options`属性主要参数

|参数名|类 型|默认值|说 明|
|-|-|-|-|
|color|Color|new Cesium.Color(1.0,0,0,0.5)|（可选）高亮颜色|
|colorBlendMode|Cesium3DTileColorBlendMode|Cesium.Cesium3DTileColorBlendMode.HIGHLIGHT|（可选）高亮模式|
|colorBlendAmount|Number|0.5|（可选）混合系数|
|applyForLayer|Boolean|false|（可选）是否应用至图层|
|negate|Color|true|（可选）是否取反 ——意思是除了id列表中的要素应用color|
|negateColor|Color|new Cesium.Color.WHITE|（可选）取反的颜色 只有在negate=true 的时候才起作用|
|style|String|'EdgeHighlight'|（可选）高亮模式//'EdgeHighlight'高亮+描边 'Edge'//描边|
|edgeColor|Color|new Cesium.Color(0, 0, 1,1.0)|（可选）默认红色|

##### （2）`stopCustomDisplay()`：停止全部高亮
