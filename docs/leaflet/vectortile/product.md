## 1 桌面端裁图流程
> 后台管理一共是4大步
> + 配图,设置显示比
> + 创建索引,用来生成矢量瓦片,分为全图索引和智能索引
> + 裁图
   - 高级参数(可选), 针对不同的数据设置不同的模板


### 1.1配图

> 矢量瓦片一定要配图,针对不同的图层设置不同的可见显示比,如下图所示,别忘了点击`同步到图层`按钮.如果没有配图,则会造成前几级瓦片特别的大(前几级瓦片绘制了太多的矢量图层).

> 主要是配置各种可见显示比  这一步很重要,直接影响最后的体积与展示效果

![配图](../../docs/mapbox/vectortile/img/process/peitu.png)

### 1.2创建索引

![索引](../../docs/mapbox/vectortile/img/process/suoyin.png)

#### 1.2.1全图索引
> 就是传统的栅格瓦片的索引架构

![全图索引](../../docs/mapbox/vectortile/img/process/suoyin-all.png)

#### 1.2.2智能索引

> 智能索引会根据数据形态生成对应的索引网格,数据`密集`的地方网格划分`越细`,数据`稀疏`的地方网格划分`越大`.

![智能索引](../../docs/mapbox/vectortile/img/process/suoyin-index.png)

> 智能索引只能用于MapBox GL上!

### 1.3 裁图
![裁图](../../docs/mapbox/vectortile/img/process/maketile.png)

#### 1.3.2高级参数(可选)
![高级参数](../../docs/mapbox/vectortile/img/process/maketile-adv.png)

#### 1.3.3默认模板(可选)
![默认模板](../../docs/mapbox/vectortile/img/process/maketile-demo.png)


## 2 IGServer发布流程
> 发布流程格外简单,如果裁图生成的是VTDF,则选择`xxx.vtdf`发布即可

> 发布流程格外简单,如果裁图生成的是文件夹,则选择`对应的文件夹`,注意是文件夹不是`xxx.json文件`

![IGServer发布](../../docs/mapbox/vectortile/img/process/igserver1.png)![IGServer发布](../../docs/mapbox/vectortile/img/process/igserver2.png)![IGServer发布](../../docs/mapbox/vectortile/img/process/igserver3.png)![IGServer发布](../../docs/mapbox/vectortile/img/process/igserver4.png)


## 3 浏览器前端配图
> 点击按钮预览,打开对应的页面

### 3.1 预览
![浏览矢量瓦片](../../docs/mapbox/vectortile/img/process/web-explorer.png)

### 3.2 主界面
![配置矢量瓦片](../../docs/mapbox/vectortile/img/process/web-edit.png)

### 3.3 默认模板
![默认模板](../../docs/mapbox/vectortile/img/process/web-demos.png)

### 3.4 保存与打开
> 配置好地图后就可以点击保存按钮,会生成一个xxx.json的文件,这个文件记录了所有的配置信息,这个文件是提供给别人打开,可以重复使用的.

![保存](../../docs/mapbox/vectortile/img/process/web-save.png)
![保存文件](../../docs/mapbox/vectortile/img/process/web-save-file.png)

> 之前保存的`json文件`可以通过代开按钮打开,这样别人就可以使用你之前编辑好的样式了.至于怎么在代码中使用,请看下几节`中地矢量瓦片样式`的说明.

![打开](../../docs/mapbox/vectortile/img/process/web-open.png)
