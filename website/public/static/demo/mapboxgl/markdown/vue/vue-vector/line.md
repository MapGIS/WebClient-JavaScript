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
