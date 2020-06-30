## 添加图片

### 示例功能

本示例实现在三维场景中添加图片。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`appendImageByUrl()`方法，实现图片的添加。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，加载Google地图作为底图显示；

3. 添加图片：调用`appendImageByUrl()`方法，需要传入图片的地址（可为本地图片地址，也可以为网络图片的URL），以及图片显示的坐标范围；

    ``` javascript
    var image;
    //添加图片
    image = webGlobe.appendImageByUrl('./static/data/picture/world.jpg', -180.0, -90, 180.0, 90);
    ```

    添加图片后，可调用`removeImage()`方法进行移除。

    ``` javascript
    if (image) webGlobe.removeImage(image);
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`appendImageByUrl(url, west, south, east, north)`：通过地址添加图片，包括本地图片和网络图片

> `appendImageByUrl`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|url|String|图片地址|
|west|float|西经|
|south|float|南纬|
|east|float|东经|
|north|float|北纬|

##### （2）`removeImage(ImageryLayer, isDestroy)`：删除图片，与appendImageByUrl对应

> `removeImage`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|ImageryLayer|ImageryLayer|图片地址|
|isDestroy|bool|是否销毁|
