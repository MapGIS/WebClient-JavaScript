## 粒子特效-火焰

### 示例功能

此功能用于添加烟雾粒子特效，与火焰粒子特效相同，可以模拟火灾等各类火焰烟雾、水汽烟雾相关的场景。

### 示例实现：

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.AdvancedAnalysisManager`类提供的`createFire()`方法，实现添加烟雾粒子特效功能。

>开发库使用请参见首页-概述-原生JS调用内容。

### 实现步骤：

1. <font color=red>引用开发库</font>：本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能；

2. <font color=red>创建三维地图容器加载三维球控件,并加载底图;</font>：创建 `id='GlobeView'` 的div作为三维视图的容器，并设置其样式，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，并调用`appendTDTuMap()` 方法加载天地图数据作为底图显示，然后再叠加显示M3D服务的建筑模型；


3. <font color=red>添加火焰烟雾粒子特效</font>：首先构造`CesiumZondy.Manager.AdvancedAnalysisManager`高级分析功能类对象，然后调用`createFire()`方法添加火焰与烟雾粒子特效，可通过可选参数实现烟雾特效的调整。

``` Javascript
            //初始化高级分析功能管理类
            var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({ viewer: webGlobe.viewer });
            //粒子发射位置点
            let position = [114.40103, 30.4679, 12];
            //火焰与烟雾图片url
            let imageUrl1 = './static/data/effect/fire1.png';
            let imageUrl2 = './static/data/effect/smoke1.png';          
            //添加烟雾粒子特效
            fireObj = advancedAnalysisManager.createFire(imageUrl1, position,{
                emissionRate:3,
                startScale:1,
                endScale:3
            });
            //添加烟雾粒子特效
            smokeObj = advancedAnalysisManager.createFire(imageUrl2, position,{
                emissionRate:35,
                startScale:5,
                endScale:8
            });

```
``` Javascript
    if (name === 'emissionRate') {
        //排放率
        smokeObj.emissionRate = parseFloat(newValue);
    }
    if (name === 'particleSize') {
        var particleSize = parseFloat(newValue);
        //图像尺寸
        smokeObj.imageSize = new Cesium.Cartesian2(particleSize, particleSize);
    }
    if (name === 'particleLife') {
        //粒子生命
        smokeObj.particleLife = parseFloat(newValue);
    }
    if (name === 'speed') {
        //速度
        smokeObj.speed = parseFloat(newValue);
    }
    if (name === 'startScale') {
        //起始规模
        smokeObj.startScale = parseFloat(newValue);
    }
    if (name === 'endScale') {
        //终止规模
        smokeObj.endScale = parseFloat(newValue);
    }
```

### 关键接口

#### 1.【三维场景控件】 `CesiumZondy.WebSceneControl` 

#### 2.【高级分析功能管理类】 CesiumZondy.Manager.AdvancedAnalysisManager

##### (1) `createFire(imageUrl, position, options) → {Object}` 创建火焰或烟雾粒子特效，返回火焰特效实例（Object）

> `createFire` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|imageUrl|String |粒子特效图片url|
|position|Array.<Number> |粒子特效位置点|
|options|Object|粒子特效参数|

> `options` 主要属性

|参数名|类型|说明|
|-|-|-|
|modelUrl|String|（可选）模型url|
|minimumPixelSize|Number|（可选）模型最小像素尺寸|
|startScale|Number|（可选）起始规模|
|endScale|Number|（可选）终止规模|
|particleLife|Number|（可选）粒子生命|
|speed|Number|（可选）速度|
|imageSize|Cartesian2 |（可选）图像尺寸|
|emissionRate|Number|（可选）排放率|
|lifetime|Number|（可选）持续时间|
