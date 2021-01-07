# 矢量瓦片

> 中地数码的矢量瓦片统一格式为mapbox vector tile( ** MVT ** 格式)
>> 中地数码的矢量瓦片单张矢量瓦片的后缀是 ** .pbf **

> 最能发挥矢量瓦片效率的前端引擎是 **mapbox gl**

![gallery](https://raw.githubusercontent.com/mapbox/mapbox-gl-js/master/docs/pages/assets/gallery.png)

## 产生原因

> 随着大数据技术的发展，人们对电子地图的快速共享需求也越来越强烈。传统电子地图共享时，通常会通过瓦片裁剪工具获取栅格瓦片。相对于其他技术，栅格瓦片底图有其优越性，例如有效减少了传输数据体积，多级缩放等。然而，栅格瓦片底图也有一些短处，缺乏灵活性、实时性，数据完整性受损是比较突出的问题，这正是栅格数据的问题：

+ `缺乏灵活性`。栅格瓦片完成后，已经保存为图片格式，样式不可修改。若要多种栅格底图，需裁剪多分栅格瓦片底图；
+ `缺乏实时性`。由于栅格瓦片已保存为图片格式，当现实世界地物有变化时，不能实时更新，只能重新裁剪栅格瓦片；
+ `丢失属性信息`。栅格瓦片没有属性信息，若要查询图片的多边形的属性，需要到服务器重新请求。

## 优点

> 基于栅格瓦片底图的劣势，MapGIS 可支持矢量瓦片底图。矢量瓦片针对矢量电子地图，按照一定的标准和技术将其保存为多种比例尺的矢量分块数据，在前端显示电子地图时，可直接调用矢量分块进行绘制。

`MapGIS矢量瓦片具有如下优势：`

+ 可保留属性信息，在客户端进行查询时，无需再次请求服务器；

  ![属性查询](../../static/demo/mapboxgl/helper/vectortile/img/attr.png)
+ 采用分块编码模式，客户端获取时只返回请求区域和相应级别的矢量瓦片底图，且采用实时绘制矢量模式，绘制效率更高；

  ![改变图层顺序](../../static/demo/mapboxgl/helper/vectortile/img/layers.png)
+ 矢量瓦片分辨率高达4096*4096，是栅格瓦片的16倍，可保证缩放过程中的细节高度还原，且满足高分屏绘制需求；

  ![无级缩放](../../static/demo/mapboxgl/helper/vectortile/img/zoom.png)
+ 样式可以改变和定制，矢量切片可以在客户端渲染，可以按照用户赋予的样式渲染。如导航地图有白天和黑夜两种模式，只需共用一份矢量瓦片底图，利用两套样式进行渲染即可；

  ![定制图层样式](../../static/demo/mapboxgl/helper/vectortile/img/styles.jpg)
+ 客户端显示矢量瓦片底图时，可以通过属性过滤条件可以任意过滤筛选图元，实现个性化定制；

  ![定制图层样式](../../static/demo/mapboxgl/helper/vectortile/img/colors.png)
+ 客户端显示矢量瓦片底图时，可以编辑底图中每一个矢量图层的可见状态，调整矢量层的叠加压盖顺序，修改矢量图层的颜色、大小等显示样式。

  ![编辑图元样式](../../static/demo/mapboxgl/helper/vectortile/img/controls.jpg)

## 缺点

> 别看矢量瓦片有着这么多优秀的特性,但矢量有矢量的优势,瓦片有瓦片的优势,矢量瓦片的极限与应用场景也是存在的.矢量瓦片的极限在于webgl的绘制极限与阈值抽稀的问题.webgl的绘制极限决定了矢量瓦片同时显示绘制的图元数量有上限,这要么是在裁图的时候设置可见显示比控制图元数量,要么是前端显示的时候控制可见显示比.这个问题相对容易解决.

> 其主要矛盾​ 是 `矢量瓦片是专门用于电子地图/地形图的技术`.它在解决`人造建筑与地形的切分`上有着**极大**的优势.但是针对地类图斑这种区与区之间存在紧密的拓扑相连的流体的形态时,其劣势尽显.主要体现在以下3点:

1. 体积与形态一致性的矛盾,目前的算法(这也是​ 道格拉斯普克算法​ 的极限)一旦保证整体的形态不出现较大的镂空,其体积必然过大;反之如果要控制保证密集区域的体积,则必然增大阈值,加大抽稀力度,则会产生对应的镂空(前者是MapGIS的策略,保证形态,​ 后者是ArcGIS的策略,做了合并操作,存在镂空).
2. 相邻多边形抽稀产生的缝隙,在一些理想阈值情况下产生了缝隙,原因在于​ 道格拉斯普克算法​ 本身`无法保证相邻区之间的拓扑关系`,​ 说 明白一点,矢量瓦片仅仅是一种​ `前端快速显示`​ 的技术.它是栅格瓦片的改进版,但是也跳不出​ `瓦片技术的极限​` .
3. 目前算法确实没有找到地类图斑这类流体的自适应阈值的规律

## MapGIS 整体架构

![整体架构](../../static/demo/mapboxgl/helper/vectortile/img/mapgis-k10.png)

## MapGIS 矢量瓦片金字塔

![矢量瓦片](../../static/demo/mapboxgl/helper/vectortile/img/frame-all.png)


## 索引解析

![索引解析](../../static/demo/mapboxgl/helper/vectortile/img/frame-index-tree.png)


## 格式解析

![格式解析](../../static/demo/mapboxgl/helper/vectortile/img/frame-format.png)


## 符号架构

![符号架构](../../static/demo/mapboxgl/helper/vectortile/img/frame-symbol.png)

## 样式库架构

![样式架构](../../static/demo/mapboxgl/helper/vectortile/img/frame-style.png)

## 字体库架构

![字体库架构](../../static/demo/mapboxgl/helper/vectortile/img/frame-font.png)

## 1 桌面端裁图流程
> 后台管理一共是4大步
> + 配图,设置显示比
> + 创建索引,用来生成矢量瓦片,分为全图索引和智能索引
> + 裁图
   - 高级参数(可选), 针对不同的数据设置不同的模板


### 1.1配图

> 矢量瓦片一定要配图,针对不同的图层设置不同的可见显示比,如下图所示,别忘了点击`同步到图层`按钮.如果没有配图,则会造成前几级瓦片特别的大(前几级瓦片绘制了太多的矢量图层).

> 主要是配置各种可见显示比  这一步很重要,直接影响最后的体积与展示效果

![配图](../../static/demo/mapboxgl/helper/vectortile/img/process/peitu.png)

### 1.2创建索引

![索引](../../static/demo/mapboxgl/helper/vectortile/img/process/suoyin.png)

#### 1.2.1全图索引
> 就是传统的栅格瓦片的索引架构

![全图索引](../../static/demo/mapboxgl/helper/vectortile/img/process/suoyin-all.png)

#### 1.2.2智能索引

> 智能索引会根据数据形态生成对应的索引网格,数据`密集`的地方网格划分`越细`,数据`稀疏`的地方网格划分`越大`.

![智能索引](../../static/demo/mapboxgl/helper/vectortile/img/process/suoyin-index.png)

> 智能索引只能用于MapBox GL上!

### 1.3 裁图
![裁图](../../static/demo/mapboxgl/helper/vectortile/img/process/maketile.png)

#### 1.3.2高级参数(可选)
![高级参数](../../static/demo/mapboxgl/helper/vectortile/img/process/maketile-adv.png)

#### 1.3.3默认模板(可选)
![默认模板](../../static/demo/mapboxgl/helper/vectortile/img/process/maketile-demo.png)


## 2 IGServer发布流程
> 发布流程格外简单,如果裁图生成的是VTDF,则选择`xxx.vtdf`发布即可

> 发布流程格外简单,如果裁图生成的是文件夹,则选择`对应的文件夹`,注意是文件夹不是`xxx.json文件`

![IGServer发布](../../static/demo/mapboxgl/helper/vectortile/img/process/igserver1.png)![IGServer发布](../../static/demo/mapboxgl/helper/vectortile/img/process/igserver2.png)![IGServer发布](../../static/demo/mapboxgl/helper/vectortile/img/process/igserver3.png)![IGServer发布](../../static/demo/mapboxgl/helper/vectortile/img/process/igserver4.png)


## 3 浏览器前端配图
> 点击按钮预览,打开对应的页面

### 3.1 预览
![浏览矢量瓦片](../../static/demo/mapboxgl/helper/vectortile/img/process/web-explorer.png)

### 3.2 主界面
![配置矢量瓦片](../../static/demo/mapboxgl/helper/vectortile/img/process/web-edit.png)

### 3.3 默认模板
![默认模板](../../static/demo/mapboxgl/helper/vectortile/img/process/web-demos.png)

### 3.4 保存与打开
> 配置好地图后就可以点击保存按钮,会生成一个xxx.json的文件,这个文件记录了所有的配置信息,这个文件是提供给别人打开,可以重复使用的.

![保存](../../static/demo/mapboxgl/helper/vectortile/img/process/web-save.png)
![保存文件](../../static/demo/mapboxgl/helper/vectortile/img/process/web-save-file.png)

> 之前保存的`json文件`可以通过代开按钮打开,这样别人就可以使用你之前编辑好的样式了.至于怎么在代码中使用,请看下几节`中地矢量瓦片样式`的说明.

![打开](../../static/demo/mapboxgl/helper/vectortile/img/process/web-open.png)

## 官方示例

---
##### MapBox Key
> pk.eyJ1IjoicGFybmRlZWRsaXQiLCJhIjoiY2o1MjBtYTRuMDhpaTMzbXhpdjd3YzhjdCJ9.sCoubaHF9-nhGTA-sgz0sA

*这是测试key,请在下面的网页注册一个自己的key*

**mapbox底图Token获取网址：**
> [mapbox密钥获取](https://www.mapbox.com/account/access-tokens)

**流量计费**
> [密钥收费标准说明](https://www.mapbox.com/pricing/)

---
#### Bug

> 由于该地图是以https的方式提供的，如果是通过公司的CProxy代理，一般大部分请求都无法转发，请注意这一点。

---


## 样式库
> 这个可能是最不好理解的部分，因为和我们中地数码的系统库`完全是两种模式`，因此如果带着`中地系统库的思维方式`理解是很难理解的。

![样式架构](../../static/demo/mapboxgl/helper/vectortile/img/frame-style.png)

---
#### 提交BUG
> 找到bug请提交,我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Mapbox/issues)

---
#### 基本介绍
**我只介绍拥有svg策略的样式， 勉强对应中地数码的符号库**

|拥有的表达样式|说明|
|:---|:---|
|**线数据类型**||
|circle样式|这里的意思是线数据可以使用点的样式表示，显示结果是线上零星的圆点|
|line样式|线使用本身的样式，显示结果可以是沟线，实虚线，虚化线等等|
|symbol样式|线使用注记的样式，其实是针对线进行对应的标记标注，如道路的注记标注，这里请仔细参考`基本样式-注记`一节，symbol样式分为图片和文字两部分|
|**区数据类型**||
|circle样式|这里的意思是区数据可以使用点的样式表示，显示结果是线上零星的圆点|
|line样式|区使用本身的样式，显示结果可以是区的边界线，如：沟线，实虚线，虚化线等|
|fill样式|区使用本身的样式，显示结果可以是各种颜色的填充，svg图片的填充等|
|fill-extrusion样式|区使用带高度的情况，显示结果可以是各种颜色的建筑表面，svg图片的填充表面等，这个样式是有`高程信息`的。|
|symbol样式|区使用注记的样式，其实是针对线进行对应的标记标注，如道路的注记标注，这里请仔细参考`基本样式-注记`一节，symbol样式分为图片和文字两部分|

> 针对上述使用svg的样式，其主要的属性是：line的`line-pattern`, fill的`fill-pattern`, fill-extrusion的`fill-extrusion-pattern`, symbol的`icon-image`等都是对应的svg图标的名字。，那么问题来了，`如何获得对应的图标呢`

---
#### 图标获取 Sprite库


**基本导入**

``` javascript
var map = new mapboxgl.Map({
  style: {
    "version": 8,
    //特别注意，这里是字体库，下面的sprite才是样式库
    "glyphs": "http://develop.smaryun.com:6163/igs/rest/mrms/vtiles/fonts/{fontstack}/{range}.pbf",
    //特别注意，这里是真正的图片样式库
    "sprite": "http://develop.smaryun.com:6163/igs/rest/mrms/vtiles/sprite",
  },
});
```

**样式库图片**

![样式库图片](../../static/demo/mapboxgl/helper/vectortile/img/sprite.png)


[官方样式png](https://api.mapbox.com/styles/v1/mapbox/streets-v8/sprite.png?access_token=pk.eyJ1IjoicGFybmRlZWRsaXQiLCJhIjoiY2o1MjBtYTRuMDhpaTMzbXhpdjd3YzhjdCJ9.sCoubaHF9-nhGTA-sgz0sA)以及[官方样式json](https://api.mapbox.com/styles/v1/mapbox/streets-v8/sprite.json?access_token=pk.eyJ1IjoicGFybmRlZWRsaXQiLCJhIjoiY2o1MjBtYTRuMDhpaTMzbXhpdjd3YzhjdCJ9.sCoubaHF9-nhGTA-sgz0sA)

> Sprite 样式库将将所有的符号排列在一张图片上，然后更具每个字符`star-24`的映射找到对应的符号在整个图片的起始位置和宽高

~~~ json
"star-24": {
  "height": 24, //高为24
  "pixelRatio": 1,//像素角度，使效果先对圆润
  "width": 24,  //宽为24
  "x": 360,//在大图中的水平位置是360
  "y": 96 //在大图中的竖直位置是96
}，{

}
...
~~~

> 根据上面的信息，最终得到的图片就是：

![样式库图片](../../static/demo/mapboxgl/helper/vectortile/img/star-24.svg)



[官方样式库地址](https://api.mapbox.com/styles/v1/mapbox/bright-v8/sprite.json?access_token=pk.eyJ1IjoicGFybmRlZWRsaXQiLCJhIjoiY2o1MjBtYTRuMDhpaTMzbXhpdjd3YzhjdCJ9.sCoubaHF9-nhGTA-sgz0sA)

~~~ json
{
    airport-15: {
      width: 17,
      height: 17,
      x: 45,
      y: 37,
      pixelRatio: 1,
      visible: true
    }
    alcohol-shop-11: {
      width: 13,
      height: 13,
      x: 204,
      y: 124,
      pixelRatio: 1,
      visible: true
    }
    alcohol-shop-15: {
      width: 17,
      height: 17,
      x: 50,
      y: 55,
      pixelRatio: 1,
      visible: true
    }
}
~~~

---
#### 自己生成样式库
请参考[Sprite样式库](https://www.mapbox.com/mapbox-gl-js/style-spec#sprite)和[生成工具](https://github.com/mapbox/spritezero-cli)

---

## 字体库

![字体库架构](../../static/demo/mapboxgl/helper/vectortile/img/frame-font.png)

**基本导入**

``` javascript
var map = new mapboxgl.Map({
  style: {
    "version": 8,
    //特别注意，这里是字体库,字体库往往和下面的样式库一起使用
    "glyphs": "http://develop.smaryun.com:6163/igs/rest/mrms/vtiles/fonts/{fontstack}/{range}.pbf",
    //特别注意，这里是真正的图片样式库
    "sprite": "http://develop.smaryun.com:6163/igs/rest/mrms/vtiles/sprite"
  },
});
```

> 这个理解起来很简单，就是将各个字体的`字符集合`生成很多`碎片文件`(pbf文件)，如0-255.pbf, 256-511.pbf...3840-4095.pbf等。假设：字符“中”字的序列号是450，这请求256-512.pbf这个文件即可获取对应的"中"字了.

> `{fontstack}`表示什么字体:宋体,黑体... `{range}`表示你使用的字符在很多碎片文件中的位置序号.

``` html
//如使用了"中"字,并且使用的是"黑体",假设"中"字是第450个,450 在256~511之间.则发出请求
http://localhost:8822/vectortile/glyphs/黑体/256-511.pbf
```

## Circle样式

---

#### Mapbox样式

[官方参考示例](https://www.mapbox.com/mapbox-gl-js/style-spec#layers-circle)

> MapBox的样式只针对矢量数据有效，如geojson，矢量瓦片等。 栅格瓦片是不生效的。

MapBox对矢量数据的样式设置都是`基于图层级别`的，即下面的核心代码

``` json
//添加数据源，这里是geojson
map.addSource('circleLayer', {
  "type": "geojson",
  "data": geojsonData
});
//针对数据源设置图层样式
map.addLayer({
  "id": "circle_cug", //id不同重复，否则只绘制一次
  "type": "circle",// 固定语法 circle/line/fill/fill-extrusion/symbol/background
  "source": "circleLayer", //必须和上面的map.addSource('circleLayer'）的circleLayer一致
  "filter": ["==", "name", "中国地质大学（武汉）"], //过滤属性，关键点：name对应geojson中的属性字段
  "layout": {
    "visibility": "visible",//visible/none  表示是否可见
  },
  "paint": {
    "circle-radius": 15, //半径
    "circle-color": "#202", //颜色
    "circle-opacity": 0.8, //透明度
    "circle-stroke-width": 5, //轮廓线宽度
    "circle-stroke-color": "#0000FF", //轮廓线颜色
    "circle-stroke-opacity": 0.7, //轮廓线透明度
    "circle-translate": [0,0] //表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上
  }
});
```

上面的代码核心部分是4个部分

> + **source** `数据源的名称`必须和之前的map.addSource('sourceName')一致，`特别重要`
> + **filter** `过滤条件` 按照各自的业务实现对应的数据过滤，注意属性字段的一一匹配
> + **layout** `视图` 一般是控制是否可见、注记的避让压盖关系等，`类型type=symbol时`需要特别重视
> + **paint** `画笔样式` *这才是真正决定颜色、宽度、透明度等样式的地方*，不同的类型对应的属性也各自不同，需要注意这点

---
#### 参数

##### layout参数
|名称|类型|说明|
|:---|:---|:---|
|visibility|String字符串| visible, 是否可见  visible / none|

##### paint参数
|名称|类型|说明|
|:---|:---|:---|
|circle-radius|Number数字型|15, 半径|
|circle-color|String字符串|颜色举例：`#ff0`，`#ffff00`,`rgb(255, 255, 0)`,`rgba(255, 255, 0, 1)`,`hsl(100, 50%, 50%)`,`hsla(100, 50%, 50%, 1)`,`yellow`|
|circle-opacity|Number数字型|0～1.0, 透明度，越低越透明|
|circle-stroke-width|Number数字型|5, 轮廓线宽度|
|circle-stroke-color|String字符串|: #0000FF, 轮廓线颜色，颜色举例：`#ff0`，`#ffff00`,`rgb(255, 255, 0)`,`rgba(255, 255, 0, 1)`,`hsl(100, 50%, 50%)`,`hsla(100, 50%, 50%, 1)`,`yellow`|
|circle-stroke-opacity|Number数字型|0.7, 轮廓线透明度|
|circle-translate|Number数组型|[0,0] 表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上|



-------


## Line样式

> 请特别关注`line-pattern`这个属性，下面的`Sprite 样式库`会详细介绍


#### Mapbox样式

[官方参考示例](https://www.mapbox.com/mapbox-gl-js/style-spec#layers-line)

> MapBox的样式只针对矢量数据有效，如geojson，矢量瓦片等。 栅格瓦片是不生效的。

MapBox对矢量数据的样式设置都是`基于图层级别`的，即下面的核心代码

``` json
//添加数据源，这里是geojson
map.addSource('lineLayer', {
  "type": "geojson",
  "data": geojsonData
});
//针对数据源设置图层样式
map.addLayer({
  "id": "roadid", //id不同重复，否则只绘制一次
  "type": "line",
  "source": "lineLayer", //必须和上面的lineLayer一致
  "filter": ["==", "name", "光谷大道"], //关键点：name对应geojson中的属性字段
  "layout": {
    "line-cap": "square", //butt 尖头，round 圆头，square平头
    "line-join": "miter", //bevel平拐，round 圆拐，miter棱拐
    "line-miter-limit": 2, //棱拐的限制，一般用不上
    "line-round-limit": 1.05, //圆拐的限制，一般用不上
    "visibility": "visible", //是否可见  visible / none
  },
  "paint": {
    "line-width": 10, //宽度
    "line-color": "#9c27b0", //颜色
    "line-opacity": 0.8, //透明度 `0 ~ 1.0`
    "line-gap-width": 0, //线的沟宽，如果有一条线会变成2条线，中间有条沟
    "line-offset": 0, //尽量少用，如果这个值相对大的话在拐角处很容易变形变胖
    "line-dasharray": [1,1],//实线、虚线的组合，可以表示铁路线等
    "line-blur": 2, //模糊度，和宽度配合使用，当宽度20，模糊度10时，出现边线模糊的效果，该值要小于线宽度
    "line-pattern": "picture_name", //线的拉伸图片类型，一定要与对应的样式库的图片名字一一对应
    "line-translate": [0,0] //表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上
  }
});
```

上面的代码核心部分是4个部分

> + **source** `数据源的名称`必须和之前的map.addSource('sourceName')一致，`特别重要`
> + **filter** `过滤条件` 按照各自的业务实现对应的数据过滤，注意属性字段的一一匹配
> + **layout** `视图` 一般是控制是否可见、注记的避让压盖关系等，`类型type=symbol时`需要特别重视
> + **paint** `画笔样式` *这才是真正决定颜色、宽度、透明度等样式的地方*，不同的类型对应的属性也各自不同，需要注意这点

---
#### 参数

##### layout参数

|名称|类型|说明|
|:---|:---|:---|
|line-cap|String字符串|默认square, `butt` 尖头，`round` 圆头，`square`平头|
|line-join|String字符串| 默认miter, `bevel`平拐，`round` 圆拐，`miter`棱拐|
|line-miter-limit|Number数字型| 2, 棱拐的限制，一般用不上|
|line-round-limit|Number数字型| 1.05, 圆拐的限制，一般用不上|
|visibility|String字符串| visible, 是否可见  visible / none|

##### paint参数
|名称|类型|说明|
|:---|:---|:---|
|line-width|Number数字型| 10, 宽度|
|line-color|String字符串| 颜色举例：`#ff0`，`#ffff00`,`rgb(255, 255, 0)`,`rgba(255, 255, 0, 1)`,`hsl(100, 50%, 50%)`,`hsla(100, 50%, 50%, 1)`,`yellow`|
|line-opacity|Number数字型| 0.8, 透明度`0 ~ 1.0`|
|line-gap-width|Number数字型| 0, 线的沟宽，如果有一条线会变成2条线，中间有条沟|
|line-offset|Number数字型| 0,`尽量少用`，如果这个值相对大的话在拐角处很容易变形变胖|
|line-dasharray|Number数组型| [1,1],实线、虚线的组合，可以表示铁路线等|
|line-blur|Number数字型| 2, 模糊度，和宽度配合使用，当宽度20，模糊度10时，出现边线模糊的效果，该值要小于线宽度|
|`line-pattern`|String字符串| picture_name, 线的拉伸图片类型，`一定`要与对应的`样式库Sprite`的图片名字`一一对应`|
|line-translate|Number数组型| [0,0] `[x,y]`表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上|


-----------

## Fill样式

> + 请特别关注`fill-pattern`这个属性，下面的`Sprite 样式库`会详细介绍
> + 请特别关注`"type":"line",`这个属性，这里要表达的是虽然`数据源是区`，但是仍然可以使用`线的样式`来绘制对应的区的边界线。`区可以复用线的样式`
> + 同理`区可以复用点的样式`

#### Mapbox样式

[官方参考示例](https://www.mapbox.com/mapbox-gl-js/style-spec#layers-fill)

> MapBox的样式只针对矢量数据有效，如geojson，矢量瓦片等。 栅格瓦片是不生效的。

MapBox对矢量数据的样式设置都是`基于图层级别`的，即下面的核心代码

``` json
//添加数据源，这里是geojson
map.addSource('fillLayer', {
  "type": "geojson",
  "data": geojsonData
});
//针对数据源设置图层样式
map.addLayer({
  "id": "huiyishi", //id不同重复，否则只绘制一次
  "type": "fill",
  "source": "fillLayer", //必须和上面的geojsonPolygon一致
  "filter": ["==", "name", "会议室"], //关键点：name对应geojson中的属性字段
  "layout": {
    "visibility": "visible",//visible/none  表示是否可见
  },
  "paint": {
    "fill-antialias": true, //抗锯齿，true表示针对边界缝隙进行填充
    "fill-color": "#00695c", //颜色
    "fill-opacity": 0.9, //透明度 `0 ~ 1.0`
    "fill-outline-color": "#FFFF00", //边线颜色，没错,确实没有边线宽度这个选项
    "fill-pattern":"picture_name", //线的拉伸图片类型，一定要与对应的样式库的图片名字一一对应
    "fill-translate": [0,0] //表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上
  }
});
map.addLayer({
  "id": "bounding",
  "type": "line",  //相信你的眼睛，这里的的确确是line，区可以复用线的样式
  "source": "fillLayer", //必须和上面的geojsonPolygon一致
  "filter": ["==", "name", "边界区"], //关键点：name对应geojson中的属性字段
  "paint": {
    "line-width": 4, //宽度
    "line-color": "#e51c23", //颜色
    "line-opacity": 1.0, //透明度
    "line-gap-width": 2, //线的沟宽，如果有一条线会变成2条线，中间有条沟
  }
});
```

上面的代码核心部分是4个部分

> + **source** `数据源的名称`必须和之前的map.addSource('sourceName')一致，`特别重要`
> + **filter** `过滤条件` 按照各自的业务实现对应的数据过滤，注意属性字段的一一匹配
> + **layout** `视图` 一般是控制是否可见、注记的避让压盖关系等，`类型type=symbol时`需要特别重视
> + **paint** `画笔样式` *这才是真正决定颜色、宽度、透明度等样式的地方*，不同的类型对应的属性也各自不同，需要注意这点

---
#### 参数

##### layout参数

|名称|类型|说明|
|:---|:---|:---|
|visibility|String字符串| visible, 是否可见  visible / none|

##### paint参数
|名称|类型|说明|
|:---|:---|:---|
|fill-antialias|Bool布尔型| true, 抗锯齿，true表示针对边界缝隙进行填充|
|fill-color|String字符串|颜色举例：`#ff0`，`#ffff00`,`rgb(255, 255, 0)`,`rgba(255, 255, 0, 1)`,`hsl(100, 50%, 50%)`,`hsla(100, 50%, 50%, 1)`,`yellow`|
|fill-opacity|Number数字型| 0.9, 透明度|
|fill-outline-color|String字符串| #FFFF00, 边线颜色，没错,确实`没有边线宽度`这个选项|
|`fill-pattern`|String字符串|picture_name, 区的拉伸图片类型，一定要与对应的样式库的图片名字一一对应|
|fill-translate|Number数组型| [0,0] `[x,y]`表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上|


-------

## Fill-Extrusion样式

> + 请特别关注`fill-extrusion-height`这个属性，该属性即可以传递`固定值`，也可以传入`属性字段`
> + 请特别关注`fill-extrusion-pattern`这个属性，下面的`Sprite 样式库`会详细介绍

#### Mapbox样式

[官方参考示例](https://www.mapbox.com/mapbox-gl-js/style-spec#layers-fill-extrusion)

> MapBox的样式只针对矢量数据有效，如geojson，矢量瓦片等。 栅格瓦片是不生效的。

MapBox对矢量数据的样式设置都是`基于图层级别`的，即下面的核心代码

``` json
//添加数据源，这里是geojson
map.addSource('fillExtrusionLayer', {
  "type": "geojson",
  "data": geojsonData
});
//针对数据源设置图层样式
map.addLayer({
  "id": "main", //id不同重复，否则只绘制一次
  "type": "fill-extrusion",
  "source": "fillExtrusionLayer", //必须和上面的fillExtrusionLayer一致
  "filter": ["==", "name", "主楼"], //关键点：name对应geojson中的属性字段
  "paint": {
    "fill-extrusion-height": ['get', 'height'], //固定语法，获取属性值height的数值
    "fill-extrusion-base": 10,//基础高度，表示相对水平面的高度
    "fill-extrusion-color": "#00695c", //颜色
    "fill-extrusion-opacity": 0.9, //透明度 `0 ~ 1.0`
    "fill-extrusion-pattern":"si-main-3", //线的拉伸图片类型，一定要与对应的样式库的图片名字一一对应
    "fill-extrusion-translate": [0,0] //表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上
  }
});
```

上面的代码核心部分是4个部分

> + **source** `数据源的名称`必须和之前的map.addSource('sourceName')一致，`特别重要`
> + **filter** `过滤条件` 按照各自的业务实现对应的数据过滤，注意属性字段的一一匹配
> + **layout** `视图` 一般是控制是否可见、注记的避让压盖关系等，`类型type=symbol时`需要特别重视
> + **paint** `画笔样式` *这才是真正决定颜色、宽度、透明度等样式的地方*，不同的类型对应的属性也各自不同，需要注意这点

---
#### 参数

##### layout参数

|名称|类型|说明|
|:---|:---|:---|
|visibility|String字符串| visible, 是否可见  visible / none|

##### paint参数
|名称|类型|说明|
|:---|:---|:---|
|`fill-extrusion-height`|Number数字型| `['get', 'height']`, 固定语法，获取属性值height的数值,或者是直接传递`固定数值`|
|fill-extrusion-base|Number数字型| 10,基础高度，表示`相对水平面`的高度|
|fill-extrusion-color|String字符串|#00695c颜色举例：`#ff0`，`#ffff00`,`rgb(255, 255, 0)`,`rgba(255, 255, 0, 1)`,`hsl(100, 50%, 50%)`,`hsla(100, 50%, 50%, 1)`,`yellow`|
|fill-extrusion-opacity|Number数字型| 0.9, 透明度|
|`fill-extrusion-pattern`|String字符串|`si-main-3`, 区表面的拉伸图片类型，一定要与对应的样式库的图片名字一一对应|
|fill-extrusion-translate|Number数组型| [0,0] `[x,y]`表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上|


--------

## Background样式

#### Mapbox样式

[官方参考示例](https://www.mapbox.com/mapbox-gl-js/style-spec#layers-background)

> MapBox的样式只针对矢量数据有效，如geojson，矢量瓦片等。 栅格瓦片是不生效的。

MapBox对矢量数据的样式设置都是`基于图层级别`的，即下面的核心代码,不过背景图层相对简单，一般是作为`底图添加`的，因此一般是通过`初始化`的时候添加。

``` json
var map = new mapboxgl.Map({
    container: 'mapid',
    style: {
      "version": 8,
      "sources": {
        "osm-tiles": {
          "type": "raster",
          'tiles': [
            "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ],
          'tileSize': 256
        }
      },
      "layers": [{ //注意该图层的顺序，是在下面的图层之下的，因此在缩放的时候才能看见该背景图层
        "id": "backgroundid",
        "type": "background",
        "layout": {
          "visibility": "visible",//visible/none  表示是否可见
        },
        "paint": {
          "background-color": "#009688", //颜色
          "background-opacity": 0.6, //透明度
          "background-pattern": 5, //选择图片填充对应的背景，这个其实应该没有太多应用场景
        }
      }, {
        "id": "simple-tiles",
        "type": "raster",
        "source": "osm-tiles",
        "minzoom": 0,
        "maxzoom": 20
      }]
    },
    zoom: 11,
    pitch: 45,
    center: [114.39960479736327, 30.495722001885323]
  });
```

> **source** `数据源的名称` `背景图层不需要这个数据源`，因此不要再添加对应的数据源了

**上面的代码核心部分是2个部分**

> + **layout** `视图` 一般是控制是否可见
> + **paint** `画笔样式` *这才是真正决定颜色、宽度、透明度等样式的地方*，

---
#### 参数

##### layout参数
|名称|类型|说明|
|:---|:---|:---|
|visibility|String字符串| visible, 是否可见  visible / none|

##### paint参数
|名称|类型|说明|
|:---|:---|:---|
|background-color|String字符串|颜色举例：`#ff0`，`#ffff00`,`rgb(255, 255, 0)`,`rgba(255, 255, 0, 1)`,`hsl(100, 50%, 50%)`,`hsla(100, 50%, 50%, 1)`,`yellow`|
|background-opacity|Number数字型|0～1.0, 透明度，越低越透明|
|`background-pattern`|String字符串|picture_name, 区的拉伸图片类型，一定要与对应的样式库的图片名字一一对应|

> 由于上面几节已经详细的介绍了对应的样式库Sprite，加上背景图层用的极少，因此不在重复的介绍对应的知识了，请回头看`Line`,`Fill`,`Fill-Extrusion`等知识


----------

## Symbol样式

**Symbol样式由两部分组成，分别是`图标`与`文字`,这两者是各自独立互不影响的**
> 请特别关注 `"icon-image": "college-15"`, 它与line-pattern,fill-pattern一样是对应样式库中的图片的名字，样式库sprite在下面有详细讲解。

#### Mapbox样式

[官方参考示例](https://www.mapbox.com/mapbox-gl-js/style-spec#layers-symbol)

MapBox对矢量数据的样式设置都是`基于图层级别`的，即下面的核心代码

``` javascript
//添加数据源，这里是geojson
map.addSource('symbolLayer', {
  "type": "geojson",
  "data": GeoPoints
});

//当你看到下面的注释时，肯定要骂人，但是实际上常用的参数就几个  
map.addLayer({
  "id": "zondy",
  "type": "symbol",
  "source": "symbolLayer", //必须和上面的symbolLayer一致
  "filter": ["==", "name", "东正门", "南副门", "北副门"], //关键点：name对应geojson中的属性字段
  "layout": {
    "symbol-placement": "point", //"point"表示基于单个点的注记, "line"表示平铺在线上的注记
    "symbol-spacing": 200, //单位像素,便是每个注记的占用空间，只有symbol-placement=line才生效
    "symbol-avoid-edges": false, //避免在边界情况的，注记碰撞压盖，一般不设置

    "icon-allow-overlap": false, //true表示在图层有压盖关系时，仅仅是当前图标保持可见
    "icon-ignore-placement": false, //说句实话，这个属性我测了好久真心不知道怎么生效，如果你找到了请提交bug通知我
    "icon-optional": true, // true表示和其他注记冲突的时候,如果文字没被压盖，显示文字，隐藏图标
    "icon-rotation-alignment": "viewport", //map表示随地图旋转角度旋转，viewport表示随当前视角/数据形态（线的方向）一致
    "icon-size": 1.4, //表示图片的缩放比例
    "icon-text-fit": "none", //"none", "width", "height", "both"让图片适应文字的宽高
    "icon-text-fit-padding": [0, 0, 0, 0], // 在适应文字大小的基础上添加对应的内部padding距离
    "icon-image": "college-15", //与line-pattern,fill-pattern一样是对应样式库中的图片的名字
    "icon-rotate": 0, //图片旋转角度
    "icon-padding": 2, //图片正常的内部padding间距
    "icon-keep-upright": false, //true表示在地图旋转方向变化是保持图片的上下翻转，就是防止拼接的时候上下颠倒
    "icon-offset": [0, 0], //[x,y]图片的偏移
    "icon-anchor": "center", //"center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"图片的对齐方向
    "icon-pitch-alignment": "auto", //"map", "viewport"对齐方向，这个用于道路的注记，表示是延道路方向显示还是生硬的添加注记

    "text-pitch-alignment": "auto", //"map", "viewport"对齐方向，这个用于道路的注记，表示是延道路方向显示还是生硬的添加注记
    "text-rotation-alignment": "auto", //map表示随地图旋转角度旋转，viewport表示随当前视角/数据形态（线的方向）一致
    "text-field": "{name}", //固定语法，请不要忘记{}号
    "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"], //这个请特别注意，涉及版权mapgis的字体只有少数，最好使用mapbox的自带的字体库
    "text-size": 20, //字体大小，默认16
    "text-max-width": 10, //字体最大宽度，默认10 ems
    "text-line-height": 1.2, //字体高度,默认 1.2 ems
    "text-letter-spacing": 0,
    "text-justify": "center", //文字对齐方式,"left", "center", "right"
    "text-anchor": "center", //文字对齐方向，"center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"
    "text-max-angle": 45, //针对拐角处，相邻字符的最大角度差
    "text-rotate": 0, //文字旋转方向，单位degrees
    "text-padding": 0, //文字的padding内间距，单位像素
    "text-keep-upright": false, //true表示在地图旋转方向变化是保持文字的上下翻转，就是防止文字拼接的时候上下颠倒
    "text-transform": "none", //"none", "uppercase", "lowercase",显示文字的时候是全大写、全小写，保持不变
    "text-offset": [4.5,0], ////[x,y]文字的偏移
    "text-allow-overlap": false, // true表示和其他注记有压盖关系时，当前文字保持可见
    "text-ignore-placement": false, //说句实话，这个属性我测了好久真心不知道怎么生效，如果你找到了请提交bug通知我
    "text-optional": true, // true表示和其他注记冲突的时候,如果图标没被压盖，显示图标，隐藏文字
    "visibility": "visible", //visible/none
  },
  "paint": {
    "icon-opacity": 1.0, //图标透明度
    "icon-color": "#202", //图标颜色
    "icon-halo-color": "#888", //图标光晕颜色
    "icon-halo-width": 2, //图标光晕宽度
    "icon-halo-blur": 1, //图标光晕模糊度
    "icon-translate": [0, 0], //表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上

    "text-opacity": 1.0, // 文字透明度
    "text-color": "#fff", //文字颜色
    "text-halo-color": "#000", //文字光晕颜色
    "text-halo-width": 2, //文字光晕宽度
    "text-halo-blur": 1, //文字光晕模糊度
    "text-translate": [0, 0] //表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上
  }
});
```

上面的代码核心部分是4个部分

> + **source** `数据源的名称`必须和之前的map.addSource('sourceName')一致，`特别重要`
> + **filter** `过滤条件` 按照各自的业务实现对应的数据过滤，注意属性字段的一一匹配
> + **layout** `视图` 一般是控制是否可见、注记的避让压盖关系等，`类型type=symbol时`需要特别重视
> + **paint** `画笔样式` *这才是真正决定颜色、宽度、透明度等样式的地方*，不同的类型对应的属性也各自不同，需要注意这点

---
#### 参数

> 最常用参数已经用`红色标红强调`了，其他的参数其实真心用的少

##### layout参数
|名称|类型|说明|
|:---|:---|:---|
|||**Symbol参数**|
|`symbol-placement`|String字符串| "point"表示基于单个点的注记, "line"表示平铺在线上的注记|
|symbol-spacing|Number数字型| 200,  单位像素,便是每个注记的占用空间，只有symbol-placement=line才生效|
|symbol-avoid-edges|Bool布尔型| false,  避免在边界情况的，注记碰撞压盖，一般不设置|
|||**Icon参数**|
|icon-allow-overlap|Bool布尔型| false,  true表示在图层有压盖关系时，仅仅是当前图标保持可见|
|icon-ignore-placement|Bool布尔型| false,  说句实话，这个属性我测了好久真心不知道怎么生效，如果你找到了请提交bug通知我|
|icon-optional|Bool布尔型| true,   true表示和其他注记冲突的时候,如果文字没被压盖，显示文字，隐藏图标|
|`icon-rotation-alignment`|String字符串| "viewport",  map表示随地图旋转角度旋转，viewport表示随当前视角/数据形态（线的方向）一致|
|`icon-size`|Number数字型|1.4,  表示图片的缩放比例|
|icon-text-fit|String字符串| "none",  "none", "width", "height", "both"让图片适应文字的宽高|
|icon-text-fit-padding|Number数组型| [0, 0, 0, 0],  在适应文字大小的基础上添加对应的内部padding距离|
|`icon-image`|String字符串| "college-15",  与line-pattern,fill-pattern一样是对应样式库中的图片的名字|
|icon-rotate|Number数字型| 0,  图片旋转角度|
|icon-padding|Number数字型| 2,  图片正常的内部padding间距|
|icon-keep-upright|Bool布尔型| false,  true表示在地图旋转方向变化是保持图片的上下翻转，就是防止拼接的时候上下颠倒|
|`icon-offset` |Number数组型|[0, 0],  [x,y]图片的偏移|
|icon-anchor|String字符串| "center",  "center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"图片的对齐方向|
|icon-pitch-alignment|String字符串| "auto",  "map", "viewport"对齐方向，这个用于道路的注记，表示是延道路方向显示还是生硬的添加注记|
|||**Text参数**|
|text-pitch-alignment|String字符串| "auto",  "map", "viewport"对齐方向，这个用于道路的注记，表示是延道路方向显示还是生硬的添加注记|
|text-rotation-alignment|String字符串| "auto",  map表示随地图旋转角度旋转，viewport表示随当前视角/数据形态（线的方向）一致|
|`text-field`|String字符串| "{name}",|
|`text-font`|String字符串数组| ["Open Sans Regular", "Arial Unicode MS Regular"],  这个请特别注意，涉及版权mapgis的字体只有少数，最好使用mapbox的自带的字体库|
|`text-size`|Number数字型| 20,  字体大小，默认16|
|text-max-width|Number数字型| 10,  字体最大宽度，默认10 ems|
|text-line-height|Number数字型| 1.2,  字体高度,默认 1.2 ems|
|text-letter-spacing|Number数字型| 0,文字字母间距，基本没用|
|text-justify|String字符串| "center",  文字对齐方式,"left", "center", "right"|
|text-anchor|String字符串| "center",  文字对齐方向，"center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"|
|text-max-angle|Number数字型|45,  针对拐角处，相邻字符的最大角度差|
|text-rotate|Number数字型| 0,  文字旋转方向，单位degrees|
|text-padding|Number数字型| 0,  文字的padding内间距，单位像素|
|text-keep-upright|Bool布尔型| false,  true表示在地图旋转方向变化是保持文字的上下翻转，就是防止文字拼接的时候上下颠倒|
|text-transform|String字符串| "none",  "none", "uppercase", "lowercase",显示文字的时候是全大写、全小写，保持不变|
|`text-offset`|Number数组型| [4.5,0],   [x,y]文字的偏移|
|text-allow-overlap|Bool布尔型|true表示和其他注记有压盖关系时，当前文字保持可见|
|text-ignore-placement|Bool布尔型| `false,说句实话，这个属性我测了好久真心不知道怎么生效，如果你找到了请提交bug通知我`|
|text-optional|Bool布尔型| true,   true表示和其他注记冲突的时候,如果图标没被压盖，显示图标，隐藏文字|
|visibility|String字符串| "visible",  visible/none|

##### paint参数
|名称|类型|说明|
|:---|:---|:---|
|||**Icon参数**|
|`icon-opacity`|Number数字型| 1.0,图标透明度|
|`icon-color`|String字符串|图标颜色,颜色举例：`#ff0`，`#ffff00`,`rgb(255, 255, 0)`,`rgba(255, 255, 0, 1)`,`hsl(100, 50%, 50%)`,`hsla(100, 50%, 50%, 1)`,`yellow`|
|`icon-halo-color`|String字符串|图标光晕颜色,颜色举例：`#ff0`，`#ffff00`,`rgb(255, 255, 0)`,`rgba(255, 255, 0, 1)`,`hsl(100, 50%, 50%)`,`hsla(100, 50%, 50%, 1)`,`yellow`|
|`icon-halo-width`|Number数字型| 2, 图标光晕宽度|
|`icon-halo-blur`|Number数字型| 1, 图标光晕模糊度|
|icon-translate|Number数组型|[x,y]表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上|
|||**Text参数**|
|`text-opacity`|Number数字型| 1.0, 文字透明度|
|`text-color`|String字符串|文字颜色,颜色举例：`#ff0`，`#ffff00`,`rgb(255, 255, 0)`,`rgba(255, 255, 0, 1)`,`hsl(100, 50%, 50%)`,`hsla(100, 50%, 50%, 1)`,`yellow`|
|`text-halo-color`|String字符串|文字光晕颜色,颜色举例：`#ff0`，`#ffff00`,`rgb(255, 255, 0)`,`rgba(255, 255, 0, 1)`,`hsl(100, 50%, 50%)`,`hsla(100, 50%, 50%, 1)`,`yellow`|
|`text-halo-width`|Number数字型| 2,文字光晕宽度|
|`text-halo-blur`|Number数字型| 1, 文字光晕模糊度，这里的数值要`小于`上面`text-halo-width`的宽度|
|text-translate|Number数组型|[x,y]表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上|




---


## Sprite 样式库

**基本导入**

``` javascript
var map = new mapboxgl.Map({
  style: {
    "version": 8,
    //特别注意，这里是用的mapbox官方的，中地内部的请参考中地glyphs
    "glyphs":   "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    //特别注意，这里是用的mapbox官方的，中地内部的请参考中地sprite
    "sprite": "mapbox://sprites/mapbox/bright-v8",

    //中地的样式库与字体库
    //特别注意，这里是字体库,字体库往往和下面的样式库一起使用
    "glyphs": "http://develop.smaryun.com:6163/igs/rest/mrms/vtiles/fonts/{fontstack}/{range}.pbf",
    //特别注意，这里是真正的图片样式库
    "sprite": "http://develop.smaryun.com:6163/igs/rest/mrms/vtiles/sprite"
  },
});
```


![样式库图片](./sprite.png)


[官方样式png](https://api.mapbox.com/styles/v1/mapbox/streets-v8/sprite.png?access_token=pk.eyJ1IjoicGFybmRlZWRsaXQiLCJhIjoiY2o1MjBtYTRuMDhpaTMzbXhpdjd3YzhjdCJ9.sCoubaHF9-nhGTA-sgz0sA)以及[官方样式json](https://api.mapbox.com/styles/v1/mapbox/streets-v8/sprite.json?access_token=pk.eyJ1IjoicGFybmRlZWRsaXQiLCJhIjoiY2o1MjBtYTRuMDhpaTMzbXhpdjd3YzhjdCJ9.sCoubaHF9-nhGTA-sgz0sA)

> Sprite 样式库将将所有的符号排列在一张图片上，然后更具每个字符`star-24`的映射找到对应的符号在整个图片的起始位置和宽高

~~~ json
"star-24": {
  "height": 24, //高为24
  "pixelRatio": 1,//像素角度，使效果先对圆润
  "width": 24,  //宽为24
  "x": 360,//在大图中的水平位置是360
  "y": 96 //在大图中的竖直位置是96
}，{

}
...
~~~

> 根据上面的信息，最终得到的图片就是：

![样式库图片](./star-24.svg)



[官方样式库地址](https://api.mapbox.com/styles/v1/mapbox/bright-v8/sprite.json?access_token=pk.eyJ1IjoicGFybmRlZWRsaXQiLCJhIjoiY2o1MjBtYTRuMDhpaTMzbXhpdjd3YzhjdCJ9.sCoubaHF9-nhGTA-sgz0sA)

~~~ json
{
    airport-15: {
      width: 17,
      height: 17,
      x: 45,
      y: 37,
      pixelRatio: 1,
      visible: true
    }
    alcohol-shop-11: {
      width: 13,
      height: 13,
      x: 204,
      y: 124,
      pixelRatio: 1,
      visible: true
    }
    alcohol-shop-15: {
      width: 17,
      height: 17,
      x: 50,
      y: 55,
      pixelRatio: 1,
      visible: true
    }
}
~~~

---
#### 自己生成样式库
请参考[Sprite样式库](https://www.mapbox.com/mapbox-gl-js/style-spec#sprite)和[生成工具](https://github.com/mapbox/spritezero-cli)

## 前端性能与效率

> 前端才是矢量瓦片的全部重心,其测试重要性`远远胜于`后台的数据生成.很多问题都是前端的`瓶颈`导致的.下面花费这么多的篇幅讲解前端性能的目的是让用户与开发者明白,矢量瓦片的`核心技术是前端渲染`.

### 性能

> 以常见的电脑配置 ThinkPad X250为例作为测试用例,从瓦片的传输速度和大小以及绘制卡顿情况分析对应的前端性能

|设备|类型|数值|
|:---|:---|:---|
|CPU | intel i5 5300U|2.3G Hz|
|内存|金士顿 DDR3L（低电压版）1600MHz|8G|
|显卡   |核心显卡 Intel GMA HD 5500  |900mhz, 24个EU,一句话`低端显卡`|


---
#### 瓦片大小
> 瓦片大小影响的是传输速度与解码速度,以内网100M和外网2M的网速举例

下面是地类图斑的两张有代表性的瓦片大小

|瓦片行列号|shapefile|geojson|pbf|
|:---|:---|:---|:---|
|6-54-24 |3.5 MB| 4.6 MB |370.8 KB |
|压缩率|100%|131.42%|10.345%|
|6-54-25 |6.2MB| 8.3 MB |660 KB |
|压缩率|100%|133.87%|10.395%|

> 上面的数据表明矢量瓦片的体积相比以往的传统的矢量格式是做到`10~15%的压缩比`,压缩率很高

> 插句题外话,由于矢量瓦片可以携带属性数据,如果某些图元的属性列有200多列的话,并且是中文(占2字节),其体积大小可想而知.......

---
### 绘制帧率

> 下面的表格是一个笼统的表格: 由于每台机器的显卡性能各不一样,只能是参考意义:

|绘制引擎|每张瓦片图元数量|拖动流畅度|渲染速度|
|:---|:---|:---|:---|
|MapBox GL|40000|一般|一般|
|MapBox GL|20000|`流畅`|`流畅`|
|Leaflet|40000|卡顿|一般|
|Leaflet|20000|一般|流畅|
|OpenLayers3|40000|卡顿|动不了|
|OpenLayers3|20000|卡顿|超慢|

> 结论,webgl硬件加速支持的`MapBox明显是矢量瓦片的最优选择`.

---
### 绘制内存

> 针对地类图斑等密集的区数据,每张瓦片的大小是3-5M之间,几乎每张瓦片的数据量到了30000-50000点左右

|绘制引擎|是否内存优化策略|内存极限|
|:---|:---|:---|
|MapBox GL  | 有 | 理论上无限 |
|Leaflet  | 有 | 如果快速滑动的话,则是在1.2G左右浏览器崩溃,8G内存机器 |
|OpenLayer-直接绘制模式  | 无 | 几乎动不了,无法绘制 |
|OpenLayer-混合绘制模式  | 有,实际上有但是没点用 | 最优绘制,线和区生成图片,实时绘制点图元 |
|OpenLayer-图片绘制模式  | 有,实测无效... | 相对一般绘制,所有图元前端生成图片,图元数过多会卡顿 |

> 无论OpenLayer是那种模式,在大数据量下,都会崩溃.`几乎无解`..........


---
### 绘制方式与颜色

> 1. MapBox GL是直接绘制矢量图元,颜色是高保真的支持`#ff0`，`#ffff00`,`rgb(255, 255, 0)`,`rgba(255, 255, 0, 1)`,`hsl(100, 50%, 50%)`,`hsla(100, 50%, 50%, 1)`,`yellow`颜色模式,支持`无级缩放`

> 2. Leaflet是前端生成图片进行组合,颜色支持8/16位色彩,只能`按级缩放`

> 3. OpenLayers,3种模式:,只能`按级缩放`

> > 直接绘制模式-一坨屎一样的东西,简直是恶心人,不管是下面的区的方向和速度都是垃圾中的垃圾,谁用谁SB

> > 混合绘制模式-官方默认的模式,线和区生成图片,点直接绘制,相对合理,就是颜色显示不太正确,相同的颜色显示色彩偏暗.缺点:瓦片与瓦片之间如果存在注记`重复`的话`不会避让`,甚至是左边绘一半,右边绘一半的尴尬场面.....

> > 图片绘制模式-点线区都生成图片进行绘制,这个其实和上面的区别不大,就是不会出现上面的点图层的分割现象.

> OpenLayer官方压根就是不想支持矢量瓦片的,其内部对其代码的维护也停止了,千万不要强行使用OpenLayer加载矢量瓦片,否则进坑几乎无法跳出来.....




---
### 绘制效果

> 特别注意,同一份矢量瓦片数据在不同的地图前端引擎的绘制效果是不一致的.

原因如下, 我们中地数码的数据模型是自己定义的,MapBox严格`准守ogc标准`,Leaflet`相对严格`,OpenLayers也是部分ogc标准(与我们类似).以多次测试中经常出现的带洞区为例.

|绘制引擎|MapBox|Leaflet|OpenLayer|中地数码|
|:---|:---|:---|:---|:---|
|带洞区-外圈顺时针,内圈逆时针 |![带洞区](../../static/demo/mapboxgl/helper/vectortile/img/geom/vt-polygon-2.png)|![带洞区](../../static/demo/mapboxgl/helper/vectortile/img/geom/vt-polygon-2.png)|![带洞区](../../static/demo/mapboxgl/helper/vectortile/img/geom/vt-polygon-2.png)|![带洞区](../../static/demo/mapboxgl/helper/vectortile/img/geom/vt-polygon-2.png)|
|带洞区-外圈顺时针,内圈顺时针 |![同心区](../../static/demo/mapboxgl/helper/vectortile/img/geom/vt-polygon-1.png)|![](../../static/demo/mapboxgl/helper/vectortile/img/geom/vt-polygon-3.png)|![](../../static/demo/mapboxgl/helper/vectortile/img/geom/vt-polygon-3.png)|![](../../static/demo/mapboxgl/helper/vectortile/img/geom/vt-polygon-3.png)|
|多带洞区-外圈顺时针,内圈顺时针,内内全顺时针|![同心区](../../static/demo/mapboxgl/helper/vectortile/img/geom/vt-polygon-4.png)|![](../../static/demo/mapboxgl/helper/vectortile/img/geom/vt-polygon-4.png)|![](../../static/demo/mapboxgl/helper/vectortile/img/geom/vt-polygon-4.png)|![](../../static/demo/mapboxgl/helper/vectortile/img/geom/vt-polygon-5.png)|

> MapBox的标准定义,也是OGC的官方标准, 我们`中地数码`的规则是`内圈永远是空心`的区.

*示例说明*，左边是`mapbox`, 右边是`openlayers`

![Mapbox](../../static/demo/mapboxgl/helper/vectortile/img/geom/error-1.jpg) ![Openlayers](../../static/demo/mapboxgl/helper/vectortile/img/geom/error-2.jpg)




### 浏览器支持

|浏览器|IE | Edge|Chrome|Firefox|Opera|Safari|
|:---|:---|:---|:---|:---|:---|:---|
| MapBox GL  | 不支持 |  不支持 |  23.0+ |38.0+   |20.0+   |12+|
| Leaflet  | 7-11(0.7支持7 ,1.3支持) IE9+ |  支持 |  26.0+ |23.0+   |12.0+   |5+|
| OpenLayers3  | 10+ |  支持 |  26.0+ |23.0+   |20.0+   |5+|

## 前端BUG

> 如果遇见新的BUG，请到[中地数码官方BUG下提交]()


|序号|说明|是否解决|
|:---|:---|:---|
|1|设置点、线、填充图层样式时，都有一个透明度的参数，建议去掉。因为在设置颜色时，有透明度的参数，与此处重复|这个其实是应用场景的不同，如果只是颜色的确可以去掉，但是针对图片的透明度就不能这样了|
|2|点图层样式中有两个透明度，建议区分，一个是填充透明度，一个是外边界线透明度|已解决|
|3|在设置颜色时候可以设置透明度，但颜色面板中透明度是0-100，但是在参数的对话框中透明度值为0-1，建议统一|已解决|
|4|在编辑器中，修改图层名称 "id"，不能成功，但是在功能界面中可以成功|尚未解决|
|5|无法修改图层类型，如将点改为注记。如果不能修改，请将界面下拉框灰掉|尚未解决|
|6|有实虚线设置时，设置线填充图案不起作用|`这个是矢量瓦片的规范，后面使用的时候按照这个规范使用`|
|7|点节距模式、线头、线拐角等能否用下拉框方式，切换按钮的方式太不明显了，都不知道选择的是哪一个|已解决|
|8|注记调整图层参数后，不会及时刷新显示|尚未解决|
|9|道路线动态注记，不勾选“是否保持垂直”时，注记会重复，好不清楚|尚未解决|
|10|符号光环不起作用，设置了没有效果|`这个必须和符号宽度一起使用，光环宽度应该小于等于符号宽度`|
|11|区参数设置时，勾选抗锯齿，结果显示区边界，不勾选则不显示区边界。这个效果不对，抗锯齿应该是平滑显示才对。|尚未解决|
|12|在前端设置矢量瓦片样式时，应该有保存和另存两个功能，保存后修改样式后下次打开是修改后的样式；另存是将修改后的样式保存为xml文件。|由于前端是无状态设置，是不保存之前的操作的，都通过json的方式实现本地保存|
|13|图层属性过滤时，建议可以通过下拉框选择属性字段，需要用户手动输入比较麻烦，容易输入错误|尚未解决|

## 后台性能与效率

### 瓦片体积
> 由于矢量瓦片可以携带/不携带属性字段,因此下面的测试都是不携带属性字段的测试,为了屏蔽属性字段的干扰.

> 一般一张矢量瓦片的体积中,矢量与属性的比重是2:8左右,绝大部分体积都是被属性字段撑大的.

#### 整体瓦片体积
> 由于不同的数据的属性字段各不相同，因此下面的体积是没有什么意义的，仅做参考，目的只是为了说明矢量瓦片的体积要小很多。

> 20w中国的1-13级的`矢量瓦片`的整体大小是201M， 而`栅格瓦片`在第10级就到达了1G左右。。。。

#### 单张瓦片体积

> 由于不同的数据的属性字段/几何形态各不相同，因此下面的体积是没有什么意义的，仅做参考，目的只是为了说明矢量瓦片的体积要小很多。

|级别|平均大小|该级别瓦片张数|
|:---|:---|:---|
|1|1.69M|1|
|2|471Kb|4|
|3|256Kb|8|
|4|144Kb|17|
|5|61Kb|47|
|6|40Kb|155|
|7|20Kb|559|
|8|2 Kb|2117|
|9|800字节|8208|
|10|250字节|366|

### 速度对比

#### 大范围-低密度数据量测试

   > 数据信息

   |说明|点要素数量|线要素数量|区要素数量|
   |:---|:---|:---|:---|
   |25w中国地形图|63万|90万|8万|

   > 时间信息

   |线程数|总计时间|构建索引时间|数据预处理时间|瓦片裁剪0～9|瓦片裁剪10|瓦片裁剪11|瓦片裁剪12|
   |:---|:---|:---|:---|:---|:---|:---|:---|
   |栅格瓦片||||||||
   |无线程概念|`7小时14分23秒`|无|无|2分23秒|9分36秒|54分15秒|5小时48分23秒|
   |全裁图模式||||||||
   |4线程|`5小时52分34秒`|25秒|4分11秒|3分02秒|8分26秒|48分12秒|4小时48分23秒|
   |8线程|`5小时1分3秒`|23秒|4分16秒|2分45秒|7分16秒|43分08秒|3小时53分16秒|
   |智能裁图模式||||||||
   |4线程|`7分08秒`|28秒|4分14秒|1分30秒|36秒|18秒|2秒|
   |8线程|`6分58秒`|24秒|4分14秒|1分24秒|34秒|16秒|2秒|


#### 小范围-高密度数据量测试

   > 数据信息

   |说明|点要素数量|线要素数量|区要素数量|
   |:---|:---|:---|:---|
   |测试数据|无|10万|89万|

   > 时间信息

   |线程数|总计时间|构建索引时间|数据预处理时间|瓦片裁剪0～15|
   |:---|:---|:---|:---|:---|
   |全裁图模式|||||
   |4线程|`20分58秒`|38秒|1分25秒|19分05秒|
   |8线程|`18分43秒`|36秒|1分23秒|18分07秒|
   |智能裁图模式|||||
   |4线程|`12分59秒`|43秒|1分23秒|10分53秒|
   |8线程|`11分52秒`|43秒|1分26秒|9分43秒|

#### 流体类异常数据量测试

   > 数据信息

   |说明|点要素数量|线要素数量|区要素数量|
   |:---|:---|:---|:---|
   |测试数据|无|无|46万|

   > 数据破损情况

   + 阈值设置为1的时候`没有破损`，但是瓦片的体积却达到了`2-4M`
   + 阈值设置为2的时候`轻微破损`，瓦片的体积却达到了1-3M
   + 阈值设置为4的时候`明显破损`，瓦片的体积却达到了`1M以下`，但是在8-10级的时候呈现的效果却是`很多镂空`。

## 后台BUG

|序号|说明|是否解决|
|:---|:---|:---|
|1|当选择全裁图模式时，如果输出是VTDF格式，如果最大级别大于实际级别的话，会停在等待界面|已修复，重新判断真正的最大级别|
|2|模板中，省级模板和地类图斑模板没有默认图片|已修复，补充了默认图片|

