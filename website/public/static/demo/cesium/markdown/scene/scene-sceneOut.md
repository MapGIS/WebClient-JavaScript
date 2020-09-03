## 场景出图

### 示例功能

此功能用于将当前场景输出成图片。可通过CommonFuncManager类的outputImageFile()与outputImageObj()实现此功能。


### 示例实现：

本示例需要使用include-cesium-local.js开发库实现。
先初始化Cesium三维球控件 `Cesium.WebSceneControl()` 加载数据；然后初始化常用功能管理类 `CesiumZondy.Manager.CommonFuncManager()` ，调用常用功能管理类的 `outputImageFile()` 方法或`outputImageObj()`方法进行场景输出图片。

- `outputImageFile`：将屏幕截图输出为`图片文件`；
- `outputImageObj`：将屏幕截图输出为`图像对象`，可保存为不同类型图片，应用场景比较丰富。

### 实现步骤：

1. <font color=red>引用开发库</font>：本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能；

2. <font color=red>创建三维地图容器并加载三维球控件</font>：创建 `id='GlobeView'` 的div作为三维视图的容器，并设置其样式，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，完成此步后可在三维场景中加载三维球控件；

``` Javascript
//构造三维视图类（视图容器div的id，三维视图设置参数）
var webGlobe = new Cesium.WebSceneControl('GlobeView', {
    terrainExaggeration: 1,
});
```

``` html
<div id='GlobeView'></div>
```

3. <font color=red>场景出图</font>：初始化常用功能管理类 `CesiumZondy.Manager.CommonFuncManager()` ，调用常用功能管理类的 `outputImageFile()` 方法或`outputImageObj()`方法进行场景输出图片；

- 使用outputImageFile()
``` Javascript
var commonFuncManager = new CesiumZondy.Manager.CommonFuncManager({
    viewer: webGlobe.viewer
});
//当前屏幕图片输出为一个图片文件
commonFuncManager.outputImageFile("图片.png");
```
- 使用outputImageObj()
``` Javascript
var comm = new CesiumZondy.Manager.CommonFuncManager({
     viewer: webGlobe.viewer
});
//当前屏幕输出为一个图片对象
var res = comm.outputImageObj();
//下载打印此图片对象为png
res.downloadPng("image.png");
//可输出如下其他格式，可结合其他应用场景使用：
//res.toImg();    
//res.toBase64();
//res.downloadPng(name);
//res.toCanvas();
//res.toJpeg();
//res.toPng();
```
说明：outputImageObj()返回的是一个图像对象，可直接输出为图片，也可以结合其他应用场景使用，如将图像输出到Canvas显示等。

### 关键接口

#### 1. 【三维视图的主要类】 `Cesium.WebSceneControl`

#### 2. 【常用功能管理类】`CesiumZondy.Manager.CommonFuncManager`

##### (1) `outputImageFile(fileName)` 屏幕截图输出为图片文件

> `outputImageFile` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|fileName|String|输出图片名称|

##### (2) `outputImageObj()` 屏幕截图输出为图像对象，返回值为图片对象（Object）

