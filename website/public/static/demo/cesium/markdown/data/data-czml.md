## CZML数据加载

### 示例功能

本示例实现在三维场景中添加CZML数据。

> 什么是CZML？

CZML，是一种用来描述动态场景的JSON架构的地理数据可视化语言，可以用来描述点、线、布告板、模型以及其他的图元，不仅提供了丰富的图形及其外观选择，还专注于表现动态地理数据的变化特征，主要用于Cesium在浏览器中的展示。
<a href="https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CZML-Structure" target="_blank">CZML介绍参考</a>

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.CommonDataManager`类提供的`appendCZML()`方法，实现CZML数据的加载；对应可通过`removeDataSource()`方法移除。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，并加载Google地图作为底图；

3. 添加CZML数据：调用`appendCZML()`方法，传入CZML文件的地址即可实现数据的加载，并可添加回调函数，根据CZML文件中某一模型ID判断是否添加成功；

    ``` javascript
    //构造通用数据管理对象
    var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
        viewer: webGlobe.viewer
    });
    //添加CZML数据
    var datasource = commonDataManager.appendCZML(
        //CZML文件地址
        './static/data/czml/fengji.czml',
        //成功回调
        function (entities) {
            //判断是否添加成功
            var enti = entities.getById('aerogenerator10');
            if (enti == undefined) {
                alert('失败');
            }
        }
    );
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【通用数据管理类】CesiumZondy.Manager.CommonDataManager

##### （1）`appendCZML(url, successCall) → {CzmlDataSource}`：添加czml文件数据，返回数据对象（CzmlDataSource）

|参数名|类 型|说 明|
|-|-|-|
|url|String|数据文件地址，本地数据路径设置如“./static/data/czml/fengji.czml”，网络数据路径设置如“http://{域名或IP}/xxx.czml”|
|successCall|function|成功后的回调|

##### (2) `removeDataSource(datasource, isDestroy)` 移除数据对象

> `removeDataSource` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|datasource|DataSource|数据对象|
|isDestroy|Boolean|是否销毁|

##### (3) `removeAllDataSource(isDestroy)` 移除所有数据对象

> `removeAllDataSource` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|isDestroy|Boolean|是否销毁|
