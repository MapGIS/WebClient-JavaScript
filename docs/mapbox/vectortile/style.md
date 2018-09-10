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
    "glyphs": "http://192.168.10.185:6163/igs/rest/mrms/vtiles/fonts/{fontstack}/{range}.pbf",
    //特别注意，这里是真正的图片样式库
    "sprite": "http://192.168.10.185:6163/igs/rest/mrms/vtiles/sprite"
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
