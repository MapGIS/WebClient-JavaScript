## Zoom levels
本教程将使你更深入地了解缩放级别。

#### 控制缩放
leaflet有很多方法控制显示缩放级别，但最常用是`setZoom()`方法。
```javascript
map.setZoom(0);   //设置地图缩放级别为0。
```
其他设置缩放的方法：
- `setView(center, zoom)`---> 同时可以设置地图中心。
- `flyTo(center, zoom)`---> 同setView一样，只是加入了平滑动画效果。
- `zoomIn() / zoomIn(delta)`---> 放大缩放级别的变化量，默认值为1。
- `zoomOut() / zoomOut(delta)`---> 减小缩放级别的变化量，默认值为1。
- `setZoomAround(fixedPoint, zoom)`---> 设置缩放级别，同时保持点固定（滚动缩放的功能）
- `fitBounds(bounds)`---> 自动计算缩放以适应地图上的矩形区域。

#### 分数缩放
Leaflet 1.0.0中引入的功能是分数缩放的概念。在此之前，地图的缩放级别可能只是一个整数（0,1,2等等）。但现在你可以使用分数像1.5或1.25。

```javascript
var map = L.map('map', {
        zoomSnap: 0.25
    });
```