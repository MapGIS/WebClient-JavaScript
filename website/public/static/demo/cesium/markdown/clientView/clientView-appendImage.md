## 叠加图片数据

### 示例功能

此功能用于在当前场景中叠加显示图片文件数据，支持本地数据和网络数据加载。

### 示例实现：

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.CommonDataManager`类提供的`appendImageByUrl()`方法与`removeImage()`方法，实现图片叠加显示与移除功能。

>开发库使用请参见首页-概述-原生JS调用内容。

### 实现步骤：

1. <font color=red>引用开发库</font>：本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能；

2. <font color=red>创建三维地图容器加载三维球控件,并加载底图;</font>：创建 `id='GlobeView'` 的div作为三维视图的容器，并设置其样式，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，并调用`appendTDTuMap()` 方法加载天地图数据作为底图显示；


3. <font color=red>叠加显示图片文件数据</font>：首先构造`CesiumZondy.Manager.CommonDataManager`通用数据管理类对象，然后调用`appendImageByUrl()`方法加载，须设置图片的URL与经纬度参数。相对加载功能，移除则调用`removeImage()`方法实现。

``` Javascript
            //实例化通用数据管理类
            var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
                viewer: webGlobe.viewer
            });

            //通过地址添加图片，支持本地图片和网络图片
            var imgObj = commonDataManager.appendImageByUrl(
                //图片URL
                'http://5b0988e595225.cdn.sohucs.com/images/20180917/455c51316ec24a97958a254dc66c18f6.jpeg',
                //东经
                114.3473,
                //北纬
                30.5479,
                //西经
                114.4637,
                //南纬
                30.6120
            );
            //定位跳转
            sceneManager.flyToComm(114.4, 30.55, 30000);

            //通过removeImage()删除
            //commonDataManager.removeImage(imgObj,false);
```


### 关键接口

#### 1.【三维场景控件】 `CesiumZondy.WebSceneControl` 

#### 2.【通用数据管理类】 `CesiumZondy.Manager.CommonDataManager`

##### (1) `appendImageByUrl(url, west, south, east, north, options) → {Object}` 通过路径添加图片数据，返回图片数据对象（Object）
> `appendImageByUrl` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|url|String|图片地址，本地数据路径设置如“./static/data/imge/xxx.png”，网络数据路径设置如“http://{域名或IP}/xxx.jpg”|
|west|Number|西经|
|south|Number|南纬|
|east|Number|东经|
|north|Number|北纬|
|options|Object|扩展参数|



##### (2) `removeImage(imageryLayer, isDestroy)` 移除添加的图片
> `removeImage` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|imageryLayer|Object|添加的图片对象，即appendImageByUrl方法返回的数据对象|
|isDestroy|Boolean|是否销毁图片对象|

