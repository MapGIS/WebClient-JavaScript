### 图文注记 样式
> mapbox的图文注记实现方式有两种，一种是采取marker的方式，另一种是采用MapBox自带的symbol样式。 marker用于`临时自己添加`的图文样式，symbol用于`提前准备好的矢量瓦片的`图文样式，这种方式使用相对苛刻，但是显示效果极佳。

**这里主要是介绍第一种marker的实现方式，矢量瓦片的sprite样式的方式请参考，“基本样式-注记symbol”**

> Marker的Picture&Text样式主要还是通过HTML的方式来实现的，不同之处在与是通过一个`父div`动态添加`子picture div`和`子text div`来实现

**核心代码**

``` javascript
// 创建一个子picture DOM element
var icon = document.createElement('div');
icon.id = 'marker-icon';//绑定图片样式

// 创建一个子text DOM element
var text = document.createElement('div');
text.id = 'marker-text';//绑定文字样式
text.innerText = "测试注记";//添加文字样式

// 创建一个父 div DOM elemen
var el = document.createElement('div');
el.id = 'marker'; //将该div与marker的样式绑定
el.appendChild(icon);//整个父标注添加图片内容
el.appendChild(text);//整个父标注添加文字内容

new mapboxgl.Marker(el)
```

---
#### 提交BUG
> 找到bug请提交,我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Mapbox/issues)

---
#### Mapbox官方说明

[官方Marker API](https://www.mapbox.com/mapbox-gl-js/api#marker)

---
#### 方法

|方法名|参数|返回值|说明|
|:---|:---|:---|:---|
|addTo(map)|map|Marker.this|将这个Marker标注添加到地图上|
|remove()|无|Marker.this |将这个Marker标注添加到地图上|
|getLngLat()|无|[Lnglat](https://www.mapbox.com/mapbox-gl-js/api/#lnglat)|返回该标注的经纬度对象|
|setLngLat(lnglat)|lnglat|Marker.this|设置该标注的经纬度信息|
|getElement()|无|[HTML5 Element](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)|返回该标注的html信息|
|setPopup(popup)|[Popup](https://www.mapbox.com/mapbox-gl-js/api#popup)|Marker.this|针对该标注绑定一个Popup信息|
|getPopup()|无|[Popup](https://www.mapbox.com/mapbox-gl-js/api#popup)|返回该标注的Popup对象|
|togglePopup()|无|Marker.this|触发该标注的Popup对象|
|getOffset()|无|[Point](https://www.mapbox.com/mapbox-gl-js/api#point)|返回该标注的偏移值|
|setOffset(offset)|offset|[Offset](https://www.mapbox.com/mapbox-gl-js/api/#pointlike)|设置该标注的偏移值|

> `Offset`这个属性的示例可以参考[Offset](https://www.mapbox.com/mapbox-gl-js/api#popup),说实话这个用处相对较少

#### 针对图层进行绑定
> * map.on('click', 'men_ids', function(){}); 是针对Layer.id = 'men_ids'的图层进行处理
> * map.on('click', function(mapMouseEvent){}); 是针对整个地图进行处理 [mapMouseEvent](https://www.mapbox.com/mapbox-gl-js/api#mapmouseevent)

``` javascript
map.on('click', function(mapMouseEvent) {
  mapMouseEvent.lngLat;
  ...
}

map.on('click', 'men_ids', function (e) {//请注意这里的men_ids要与上面的layer-id一致
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.name;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }//防止数据越界

    new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);
});
```
