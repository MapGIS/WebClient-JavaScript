## 批量添加 GLTF 模型

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在三维场景中批量添加多个 GLTF 模型数据。常用于需要一次性添加多个模型的应用场景，多个模型可为相同数据，也可以是不同数据，参数单独设置，简化代码操作步骤。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.CommonDataManager`类提供的`appendModels()`方法，实现多个模型数据的批量加载。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建三维视图 Div 容器，构造三维场景控件 WebSceneControl，构造并设置鼠标位置信息显示控件，加载 Google 地图作为底图显示；

**Step 3. <font color=red>添加模型</font>**:
&ensp;&ensp;&ensp;&ensp;首先构造`CesiumZondy.Manager.CommonDataManager`通用数据管理对象，构造多模型对象 models，构造时需传递模型 ID、模型名称、描述、添加的位置、模型文件路径、模型缩放比例等信息，然后调用`appendModels()`方法即可实现多模型的批量加载；

- Example:
  ```javascript
    //多个模型
    var models = [
      {
        id: 'document',
        name: 'Models',
        version: '1.0',
      },
      {
        //模型的ID
        id: 'aerogenerator1',
        //模型的名字
        name: '风机1',
        //模型要添加的坐标位置
        position: {
          cartographicDegrees: [118.0385, 42.6374, -5],
        },
        //模型文件参数
        model: {
          //模型文件的路径
          gltf: './static/data/model/donghua.gltf',
          //模型的比例
          scale: 50,
          //模型最小显示的像素
          minimumPixelSize: 16,
        },
        //描述
        description: '这是1号风机',
      },
      {
        //模型的ID
        id: 'aerogenerator2',
        //模型的名字
        name: '风机2',
        //模型要添加的坐标位置
        position: {
          cartographicDegrees: [118.0356, 42.6354, -5],
        },
        //模型文件参数
        model: {
          //模型文件的路径
          gltf: './static/data/model/donghua.gltf',
          //模型的比例
          scale: 50,
          //模型最小显示的像素
          minimumPixelSize: 16,
        },
        //描述
        description: '这是2号风机',
      },
    ]
    //开启动画：如果模型自带动画，需开启此参数
    webGlobe.viewer.clock.shouldAnimate = true
    //构造通用数据管理对象
    var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
      viewer: webGlobe.viewer,
    })
    //添加多个模型
    modelSource = commonDataManager.appendModels(models)
  ```

添加完模型后，可利用以下方法跳转到模型所在处；

- Example:
  ```javascript
  //跳转到模型处
  webGlobe.viewer.zoomTo(modelSource)
  ```

### 关键接口

#### 1.【三维场景控件】`WebSceneControl`

#### 2.【通用数据管理类】`CesiumZondy.Manager.CommonDataManager`

##### 【method】`appendModels(modelsString, successCall)`：批量添加模型

| 参数名       | 类 型    | 说 明        |
| ------------ | -------- | ------------ |
| modelsString | String   | 模型组织     |
| successCall  | function | 成功后的回调 |

##### 【method】`removeModels(models)`：移除通过 appendModelsByFile()和 appendModels()添加的模型

| 参数名 | 类 型      | 说 明    |
| ------ | ---------- | -------- |
| models | DataSource | 模型组织 |
