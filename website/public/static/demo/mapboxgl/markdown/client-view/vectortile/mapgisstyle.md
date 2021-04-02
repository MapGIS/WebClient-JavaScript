## 上传样式

### 示例功能

 &ensp;&ensp;&ensp;&ensp;使用MapGIS IGServer配置矢量瓦片的显示样式，配置的样式信息保存为xxx.json文件，上传文件到MapGIS IGServer服务器，客户端通过接口即可访问定制样式的矢量瓦片。本示例通过MapGIS IGServer矢量瓦片配置界面，使用`默认`矢量瓦片地图样式。

### 示例实现

 &ensp;&ensp;&ensp;&ensp;本示例需要使用【include-mapboxgl-local.js】开发库实现，通过关键接口`mapboxgl.Map()`实现MapGIS矢量瓦片的加载。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

#### 1.MapGIS桌面工具裁剪矢量瓦片

（1）准备矢量地图文档

<img src="../static/demo/mapboxgl/markdown/client-view/vectortile/document.png" alt="矢量地图文档" style="zoom: 40%;" />

（2）矢量瓦片裁剪：设置**输入瓦片索引区要素类**，其他选项使用默认值

<img src="../static/demo/mapboxgl/markdown/client-view/vectortile/index.png" alt="矢量瓦片裁剪设置瓦片索引区要素类" style="zoom: 50%;" />

（3）矢量瓦片裁剪：选择一个**空文件夹**用来**存放生成的矢量瓦片文件**，**高级**设置中将**最小显示块级别**修改为0，其他选项使用默认值

<img src="../static/demo/mapboxgl/markdown/client-view/vectortile/generate_file.png" alt="矢量瓦片裁剪生成文件设置" style="zoom: 50%;" />

<img src="../static/demo/mapboxgl/markdown/client-view/vectortile/generate_advance.png" alt="矢量瓦片裁剪的高级设置" style="zoom:50%;" />

（4）矢量瓦片裁剪：**附加裁剪项设置**使用默认值

<img src="../static/demo/mapboxgl/markdown/client-view/vectortile/other_set.png" alt="矢量瓦片裁剪附加裁剪项设置" style="zoom:50%;" />

（5）矢量瓦片裁剪：瓦片裁剪的过程，瓦片裁剪级别越高需要的生成时间越久

<img src="../static/demo/mapboxgl/markdown/client-view/vectortile/generate_process.png" alt="瓦片裁剪过程" style="zoom: 50%;" />

（6）矢量瓦片裁剪：裁剪的结果文件展示

<img src="../static/demo/mapboxgl/markdown/client-view/vectortile/result.png" alt="矢量瓦片裁剪结果展示" style="zoom:50%;" />

#### 2.矢量瓦片的服务发布与样式管理

（1）矢量瓦片服务发布：打开MapGIS Server Manager，找到**矢量瓦片发布**选项

<img src="../static/demo/mapboxgl/markdown/client-view/vectortile/server_manager.png" alt="MapGIS Server Manager" style="zoom: 50%;" />

（2）矢量瓦片服务发布：选择矢量瓦片发布的格式为**目录格式**，选中矢量瓦片发布的**数据路径**

<img src="../static/demo/mapboxgl/markdown/client-view/vectortile/publish_format.png" alt="矢量瓦片发布格式" style="zoom:50%;" />

（3）矢量瓦片服务发布：点击发布的矢量瓦片的左边的**预览**按钮，进入对应的编辑界面

![矢量瓦片预览](../static/demo/mapboxgl/markdown/client-view/vectortile/publish_preview.png)

（4）矢量瓦片样式管理：按照个性化需求进行样式配色等操作

<img src="../static/demo/mapboxgl/markdown/client-view/vectortile/style_edit.png" alt="矢量瓦片样式编辑" style="zoom: 33%;" />

（5）矢量瓦片样式管理：样式配置完毕后， 点击左上方的**保存**按钮保存对应的样式json文件到当前计算机

<img src="../static/demo/mapboxgl/markdown/client-view/vectortile/style_save.png" alt="矢量瓦片样式JSON文件保存" style="zoom:50%;" />

（6）矢量瓦片样式管理：将第5步保存的文件**上传**到对应的服务器上, `该按钮在第3步的最右边有个绿色上传箭`

![矢量瓦片样式文件上传](../static/demo/mapboxgl/markdown/client-view/vectortile/upload.png)

（7）矢量瓦片样式管理：上传完成的提示如下

<img src="../static/demo/mapboxgl/markdown/client-view/vectortile/upload_success.png" alt="矢量瓦片样式文件上传成功提示" style="zoom: 50%;" />

（7）矢量瓦片样式管理：以上步骤完成后得到矢量瓦片样式URL：`http://localhost:6163/igs/rest/mrms/vtiles/styles/hubei-id.json`，在`步骤实现`中通过该URL即可访问矢量瓦片地图服务

### 实现步骤

**Step 1.<font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线【include-mapboxgl-local.js】脚本引入开发库；

**Step 2. <font color=red>创建布局</font>**：
 &ensp;&ensp;&ensp;&ensp;创建`id="map"`的div作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**：
 &ensp;&ensp;&ensp;&ensp;设置地图的必要参数，如地图div容器、缩放层级、中心点等，具体操作参考`互联网地图`目录下的`天地图墨卡托`示例；

**Step 4. <font color=red>加载矢量瓦片</font>**：
 &ensp;&ensp;&ensp;&ensp;通过**矢量瓦片样式URL**加载MapGIS矢量瓦片地图服务；

* Example:
  ```javascript
    var map = new mapboxgl.Map({
      container: 'map', // 绑定div
      style: 'http://develop.smaryun.com:6163/igs/rest/mrms/vtiles/styles/黑暗样式.json',
      center: [106.563777, 29.578285],
      zoom: 3
    });
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');
  ```

**Step 5. <font color=red> 数据展示</font>**：
 &ensp;&ensp;&ensp;&ensp; 浏览矢量瓦片地图服务。

