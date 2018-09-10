## Video on leaflet
Leaflet可以帮助您在地图上的某个地方显示视频。

#### 图像叠加的边界
首先创建一个瓦片地图作为背景底图，然后选择在合适的区域放置video。通过两点确定区域，分别上左上角和右下角两点。

```javascript
var bounds = L.latLngBounds([[ 32, -130], [ 13, -100]]);
```
如果您想查看LatLngBounds覆盖的区域，可以使用`L.Rectangle`方法：
```javascript
L.rectangle(bounds).addTo(map);
map.fitBounds(bounds);
```

#### 添加视频
添加视频叠加与添加图像叠加非常相似。仅仅有以下两点不同：

- 使用`L.videoOverlay`而不是`L.imageOverlay`。
- 指定一个视频网址或一组视频网址，而不是图片网址。

```javascript
  var videoUrls = [
        'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
        'https://www.mapbox.com/bites/00188/patricia_nasa.mp4'
    ];
    var bounds = L.latLngBounds([[ 32, -130], [ 13, -100]]);
    var videoOverlay = L.videoOverlay( videoUrls, bounds, {
        opacity: 0.8
    }).addTo(map);
```

#### 对视频进行控制
如果您阅读API文档，您会注意到`L.VideoOverlay`类没有`play()`或`pause()`方法。不过我们通过`getElement()`对视频进行控制。

```javascript
videoOverlay.getElement().pause();
```