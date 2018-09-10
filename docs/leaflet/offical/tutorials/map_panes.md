## Working with map panes
这个教程主要告诉你如何使默认的地图分层显示在瓦片图层的顶部，并且如何覆盖它。
#### 什么是地图分层
在Leaflet中，地图分层是隐式的，不需要开发者了解它。分层允许浏览器在多个图层上表现的比单独处理各个图层要高效的多。地图分层使用CSS属性z-index 来允许一些图层位于其他图层的顶部。默认顺序是:

```text
•切片图层和格网图层；
•路径，比如线、圈或Geojson图层；
•标记的阴影；
•标记的图标；
•弹出框。
```

### 自定义分层
自定义地图分层首先应该创建一个L.Map实例和pane：

```javascript
var map = L.map('map');
map.createPane('labels'); 
```
接下来就是设置分层的z-index:
```javascript
map.getPane('labels').style.zIndex = 650; 
```
对于瓦片图层位于其他图层的顶部所带来的问题就是，瓦片图层将捕获点击和触摸事件。如果用户在地图上点击的话，浏览器将默认用户点击的是注记图层，而不是GeoJSON或者标注点。这个问题可以通过CSS属性`pointer-events`来解决：
```javascript
map.getPane('labels').style.pointerEvents = 'none';
```

#### Map panes
panes窗格是用于控制地图上图层顺序的DOM元素。你可以通过`map.getPane`或`map.getPanes`方法来获得地图窗口。可以使用`map.createPane`方法创建新窗格 。 每个地图都有以下默认窗格，仅在zIndex中不同。

| Pane        | Type        | Z-index | Description                                               |
|:-----------:|:-----------:|:-------:|:----------------------------------------------------------|
| mapPane     | HTMLElement | 'auto'  | 根节点，包含其他panes窗格层的父panes窗格层。              |
| tilePane    | HTMLElement | 200     | 切片图层所在的panes窗格层，如`GridLayer`和`TileLayer`等。 |
| overlayPane | HTMLElement | 400     | Path矢量图层所在的panes窗格层，如 Polyline和 Polygon等。  |
| shadowPane  | HTMLElement | 500     | 阴影所在的panes窗格层（例如Marker阴影）。                 |
| markerPane  | HTMLElement | 600     | Marker标注所在的panes窗格层。                             |
| tooltipPane | HTMLElement | 650     | tooltip鼠标提示框 所在的panes窗格层。                     |
| popupPane   | HTMLElement | 700     | popup弹窗 所在的panes窗格层。                             |

