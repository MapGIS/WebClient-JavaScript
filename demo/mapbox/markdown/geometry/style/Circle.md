### Circle样式

---
#### 提交BUG
> 找到bug请提交,我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Mapbox/issues)


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
