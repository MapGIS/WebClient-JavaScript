## 粒子特效-烟雾

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能用于添加烟雾粒子特效，可以模拟火灾等各类火焰相关的场景。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.AdvancedAnalysisManager`类提供的`createStableParticle()`方法，实现添加火焰+烟雾粒子特效功能。

>开发库使用请参见首页-概述-原生JS调用内容。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能；

**Step 2. <font color=red>创建三维地图容器加载三维球控件,并加载底图</font>**：
&ensp;&ensp;&ensp;&ensp;创建 `id='GlobeView'` 的div作为三维视图的容器，并设置其样式，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，并调用`appendTDTuMap()` 方法加载天地图数据作为底图显示，然后再叠加显示M3D服务的建筑模型；

**Step 3. <font color=red>添加烟雾粒子特效</font>**：
&ensp;&ensp;&ensp;&ensp;构造`CesiumZondy.Manager.AdvancedAnalysisManager`高级分析功能类对象，然后调用`createStableParticle()`方法分别添加火焰与烟雾粒子特效，通过可选参数实现火焰特效的调整。

* Example:
  ``` Javascript
    //初始化高级分析功能管理类
    var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
        viewer: webGlobe.viewer
    });
    //粒子发射位置点
    let position = [114.40103, 30.4679, 12];
    //火焰与烟雾图片url
    let imageUrl1 = './static/data/effect/fire1.png';
    let imageUrl2 = './static/data/effect/smoke1.png';
    //添加烟雾粒子特效
    fireObj = advancedAnalysisManager.createStableParticle(imageUrl1, position, {
        emissionRate: 3,
        startScale: 1,
        endScale: 3
    });
    //添加烟雾粒子特效
    smokeObj = advancedAnalysisManager.createStableParticle(imageUrl2, position, {
        emissionRate: 35,
        startScale: 5,
        endScale: 8
    });
  ```

* Example:
  ``` Javascript
    //火焰烟雾特效初始参数
    var viewModel = {
        emissionRate: 35.0, //排放率
        particleLife: 1.2, //粒子生命
        speed: 2.0, //速度
        startScale: 5.0, //起始规模
        endScale: 8.0, //终止规模
        particleSize: 25.0 //图像尺寸
    };
    //火焰烟雾参数设置绑定UI
    Cesium.knockout.track(viewModel);
    var toolbar = document.getElementById('toolbar');
    Cesium.knockout.applyBindings(viewModel, toolbar);
    function subscribeParameter(name) {
        Cesium.knockout.getObservable(viewModel, name).subscribe(
            function(newValue) {
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
                    smokeObj.particleLife = parseFloat(newValue);
                }
                if (name === 'speed') {
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
            }
        );
        scene.requestRender();
    }
    //改变属性值时调用
    subscribeParameter('emissionRate');
    subscribeParameter('particleSize');
    subscribeParameter('particleLife');
    subscribeParameter('speed');
    subscribeParameter('startScale');
    subscribeParameter('endScale');
  ```

### 关键接口

#### 1.【三维场景控件】 `CesiumZondy.WebSceneControl` 

#### 2.【高级分析功能管理类】 `CesiumZondy.Manager.AdvancedAnalysisManager`

##### 【method】 `createStableParticle(imageUrl, position, options) → {Object}` ：固定位置粒子特效，可通过更改image与附加参数来实现火焰、喷泉、烟雾等粒子特效，返回粒子特效实例（Object）

|参数名|类型|说明|
|-|-|-|
|imageUrl|String |粒子特效图片url|
|position|Cartesian3 |粒子特效位置点|
|options|Object|粒子特效参数|

* `options` 主要属性

|参数名|类型|说明|
|-|-|-|
|modelUrl|String|模型url|
|minimumPixelSize|Number|（可选）模型最小像素尺寸|
|startColor|Color|（可选）开始的颜色|
|endColor|Color|（可选）结束的颜色|
|startScale|Number|（可选）起始尺寸|
|endScale|Number|（可选）结束尺寸|
|minimumParticleLife|Number|（可选）最小粒子周期|
|maximumParticleLife|Number|（可选）最大粒子周期|
|minimumSpeed|Number|（可选）最小速率|
|maximumSpeed|Number|（可选）最大速率|
|imageSize|Cartesian2|（可选）粒子图像大小|
|emissionRate|Number|（可选）排放率|
|minimumImageSize|Number|（可选）最小Image尺寸|
|maximumImageSize|Number|（可选）最大Image尺寸|
|lifetime|Number|（可选）单个粒子生命周期|
|emitter|Object|（可选）粒子发射器类型|
|gravity|Number|（可选）粒子重力|
|viewHeight|Number|（可选）用于控制粒子特效在0到该值范围内可见，范围外不可见，当值为-1时，默认全部可见|
|heading|Number|（可选）俯仰角|
|pitch|Number|（可选）偏航角|
|roll|Number|（可选）翻滚角|



