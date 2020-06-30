## M3D数据单体查询

### 示例功能

本示例实现在三维场景中展示M3D地质体数据，并实现单体查询功能。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`appendPoint()`方法，实现点实体的添加绘制。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件；

3. 加载地图：加载Google地图作为底图显示，并添加M3D地质体数据；

    ``` javascript
    //加载Google地图
    webGlobe.appendGoogleMap('m@207000000');

    //定义三维瓦片类
    var layersList;
    //加载M3D地质体数据
    layersList = webGlobe.append('http://develop.smaryun.com:6163/igs/rest/g3d/M3D', {});
    ```

4. 注册鼠标点击事件：调用`registerMouseEvent()`方法注册鼠标单击事件，在单击事件方法中高亮选中的层体，并获取其信息展示在界面中；

    ``` javascript
    //注册鼠标单击事件
    webGlobe.registerMouseEvent('LEFT_CLICK', leftClick);
    
    //获取视图和场景，备后续使用
    viewer = webGlobe.viewer;
    scene = webGlobe.scene;
    ```

    ``` javascript
    //弹出信息
    var infobox = new Cesium.Entity('infobox');
    //鼠标单击方法
    function leftClick(movement) {
        //模型高亮
        highlightPicking(movement);
        if (!enablePicking) {
            return;
        }
        var feature = current.feature;
        //显示拾取的模型相关信息
        if (Cesium.defined(feature)) {
            var str = '拾取到的属性，这里可以根据拾取到的id取到属性后再赋值';
            //移除弹出信息框
            viewer.entities.remove(infobox);
            var properties = feature.primitive.properties;
            infobox.name = feature.getProperty('name');
            /*弹出信息框代码*/
            var entity = viewer.entities.add(infobox);
            viewer.selectedEntity = infobox;
            feature.setProperty('clicked', true);
        }
    }
    ```

    模型高亮实现方法；

    ``` javascript
    //单体化模型信息对象
    var current = {
        feature: undefined,
        originalColor: new Cesium.Color()
    }

    //高亮的颜色
    var HIGHLIGHT_COLOR = new Cesium.Color(1.0, 0.0, 0.0, 0.4);
    //是否拾取
    var enablePicking = true;
    /*模型高亮*/
    function highlightPicking(movement) {
        if (enablePicking) {
            //获取鼠标点击位置
            var pickedFeature = scene.pick(movement.position);
            //判断current对象中要素有值，该值和鼠标点击位置不相同
            if (Cesium.defined(current.feature) && (current.feature !== pickedFeature)) {
                layerList = [current.feature.tileset];
                var title = current.feature.getProperty('name');
                var values = title.split('_');
                var vlueNumber = parseInt(values[2]);
                var idList = [vlueNumber];
                //结束闪烁
                webGlobe.stopCustomDisplay(layerList);
                current.feature = undefined;
            }
            //判断点击位置是否有值，该值和鼠标点击位置不相同
            if (Cesium.defined(pickedFeature) && (pickedFeature !== current.feature)) {
                current.feature = pickedFeature;
                //设置高亮颜色
                Cesium.Color.clone(pickedFeature.color, current.originalColor);
                layerList = [current.feature.tileset];
                var title = current.feature.getProperty('name');
                var values = title.split('_');
                var vlueNumber = parseInt(values[2]);
                var idList = [vlueNumber];
                var options = {
                    color: new Cesium.Color(1, 0, 0, 0.2)
                }
                //结束闪烁
                webGlobe.stopCustomDisplay(layerList);
                //开始闪烁查找到的模型
                webGlobe.startCustomDisplay(layerList, idList, options);
            }
        }
    }
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`registerMouseEvent(eventType, callbackFun, handler)`：注册鼠标事件

> `registerMouseEvent`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|eventType|String|事件类型：LEFT_CLICK、RIGHT_CLICK、MOUSE_MOVE、LEFT_DOUBLE_CLICK、RIGHT_DOUBLE_CLICK、WHEEL(鼠标滚轮)|
|callbackFun|function|回调函数|
|handler|Object|事件句柄|

##### （2）`startCustomDisplay(layerList, idList, options)`：高亮显示

> `startCustomDisplay`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|layerList|Array.<layer>|图层列表|
|idList|Array.<id>|id列表|
|options|Object|扩展属性|

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

##### （3）`stopCustomDisplay()`：停止全部高亮
