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