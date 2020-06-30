## 批量添加GLTF模型

### 示例功能

本示例实现在三维场景中批量添加多个GLTF模型数据。常用于需要一次性添加多个模型的应用场景，多个模型可为相同数据，也可以是不同数据，参数单独设置，简化代码操作步骤。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`appendModels()`方法，实现多个模型数据的批量加载。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，并加载Google地图作为底图；

3. 添加模型：首先构造多模型对象models，构造时需传递模型ID、模型名称、描述、添加的位置、模型文件路径、模型缩放比例等信息，然后调用`appendModels()`方法即可实现多模型的批量加载；

    ``` javascript
    //多个模型
    var models = [
        {
            "id": "document",
            "name": "Models",
            "version": "1.0"
        },
        {
            //模型的ID
            "id": "aerogenerator1",
            //模型的名字
            "name": "风机1",
            //模型要添加的坐标位置
            "position": {
                "cartographicDegrees": [117.9298, 40.3828, 0]
            },
            //模型文件参数
            "model": {
                //模型文件的路径
                "gltf": "./static/data/model/donghua.gltf",
                //模型的比例
                "scale": 20000,
                //模型最小显示的像素
                "minimumPixelSize": 16
            },
            //描述
            "description": "这是1号风机"
        },
        { //模型的ID
            "id": "aerogenerator2",
            //模型的名字
            "name": "风机2",
            //模型要添加的坐标位置
            "position": {
                "cartographicDegrees": [117.9298, 41.3828, 0]
            },
            //模型文件参数
            "model": {
                //模型文件的路径
                "gltf": "./static/data/model/donghua.gltf",
                //模型的比例
                "scale": 20000,
                //模型最小显示的像素
                "minimumPixelSize": 16
            },
            //描述
            "description": "这是2号风机"
        },
        {
            //模型的ID
            "id": "aerogenerator3",
            //模型的名字
            "name": "风机3",
            //模型要添加的坐标位置
            "position": {
                "cartographicDegrees": [117.9298, 42.3828, 0]
            },
            //模型文件参数
            "model": {
                //模型文件的路径
                "gltf": "./static/data/model/donghua.gltf",
                //模型的比例
                "scale": 20000,
                //模型最小显示的像素
                "minimumPixelSize": 16
            },
            //描述
            "description": "这是3号风机"
        }
    ];
    //添加多个模型
    modelSource = webGlobe.appendModels(models);
    ```

    添加完模型后，可利用以下方法跳转到模型所在处；

    ``` javascript
    //跳转到模型处
    webGlobe.viewer.zoomTo(modelSource);
    ```
    
    可以批量添加模型，当然也可批量移除模型，可通过`removeModels()`方法来实现；

    ``` javascript
    //移除模型
    if (modelSource) webGlobe.removeModels(modelSource);
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`appendModels(modelsString, successCall)`：批量添加模型

|参数名|类 型|说 明|
|-|-|-|
|modelsString|String|模型组织|
|successCall|function|成功后的回调|

##### （2）`removeModels(models)`：移除通过appendModelsByFile()和appendModels()添加的模型

|参数名|类 型|说 明|
|-|-|-|
|models|DataSource|模型组|
