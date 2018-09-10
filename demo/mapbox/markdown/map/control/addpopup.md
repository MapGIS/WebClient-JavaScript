### Popup 样式
> Popup的样式与常规的css样式一致，因此该示例相对容易实现,不过唯一需要注意的是，如何`针对某个特定图层`或者是`特定marker`添加对应的Popup事件。

---
#### 提交BUG
> 找到bug请提交,我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Mapbox/issues)

---
#### Mapbox官方说明

[官方Popup API](https://www.mapbox.com/mapbox-gl-js/api#popup)

---
#### 构造函数参数
|名称| 类型 | 描述|
|:---|:---|:---|
|options.closeButton|boolean(default true)|该popup的右上角的关闭x图标按钮|
|options.closeOnClick|boolean(default true)|为true时，表示点击地图其他位置时，该Popup会消失|
|options.anchor|String|'top' ,  'bottom' ,  'left' ,  'right' ,  'top-left' ,  'top-right' ,  'bottom-left' , and  'bottom-right'表示停靠的方位|
|options.offset|(number/PointLike/Object)|number表示简单的距离，pointlike表示类似点数组的意思，第三个object是特指的`针对上面提到的anchor`属性的对象，示例如下|

``` javascript
var markerHeight = 50, markerRadius = 10, linearOffset = 25;
var popupOffsets = {
 'top': [0, 0],
 'top-left': [0, 0],
 'top-right': [0, 0],
 'bottom': [0, -markerHeight],
 'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
 'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
 'left': [markerRadius, (markerHeight - markerRadius) * -1],
 'right': [-markerRadius, (markerHeight - markerRadius) * -1]
 };
var popup = new mapboxgl.Popup({offset:popupOffsets})
  .setLngLat(e.lngLat)
  .setHTML("<h1>Hello World!</h1>")
  .addTo(map);
```


#### 方法

|方法名|参数|返回值|说明|
|:---|:---|:---|:---|
|addTo(map)|map|Popup.this|将这个Popup标注添加到地图上|
|isOpen|无|boolean|打开状态返回`true`,关闭状态返回`false`|
|remove()|无|Popup.this |将这个Popup标注添加到地图上|
|getLngLat()|无|[Lnglat](https://www.mapbox.com/mapbox-gl-js/api/#lnglat)|返回该标注的经纬度对象|
|setLngLat(lnglat)|[Lnglat](https://www.mapbox.com/mapbox-gl-js/api/#lnglat)|Popup.this|设置该标注的经纬度信息|
|setText(text)|String|Popup.this|设置该Popup的文字信息|
|setHTML(html)|String|Popup.this|将一些简单的HTML描述传入，如"<h4>MapGIS</h4>"|
|setDOMContent(htmlNode)|[Node](https://developer.mozilla.org/docs/Web/API/Node/nextSibling)|Popup.this|`var div = window.document.createElement('div');div.innerHTML = 'Hello, world!';`|


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

    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
});
```
