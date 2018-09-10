### Marker 样式
> Marker的样式与常规的css样式一致，因此该示例相对容易实现

> Marker的Picture样式主要还是通过HTML的方式来实现的，

**核心代码**

``` javascript
#marker {
  background-image: url('../../images/myImg/diqiu.png');
  background-size: cover;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
}

// 创建一个DOM element
var el = document.createElement('div');
el.id = 'marker';//将该div与marker的样式绑定

new mapboxgl.Marker(el);////绑定对应的HTML的元素

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
