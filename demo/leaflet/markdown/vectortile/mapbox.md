#### 弹窗事件说明：

> 当用户同意共享位置并且浏览器检测到该位置时，地图就会将视图设置为该位置。在成功获取地理位置后，通过`locationfound`事件在地图上使用标记精确显示出来。如果获取位置失败，则会弹出一个消息提示框，显示错误信息。

##### 代码如下：


```javascript
function onLocationFound(e) {           //获取位置成功
    var radius = e.accuracy / 2;
    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();
    L.circle(e.latlng, radius).addTo(map);
}
map.on('locationfound', onLocationFound);
function onLocationError(e) {           //获取位置失败
    alert(e.message);
}
map.on('locationerror', onLocationError);
```

