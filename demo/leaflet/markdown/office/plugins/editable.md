## Leaflet.Editable
这不是即插即用的用户界面，也不会是。这是一个轻量且可完全扩展的API，用于控制几何图形的编辑。因此，您可以根据自己的需求和选择轻松构建自己的用户界面。
#### 用法示例
leaflet版本须在1.0.0以上，且引入`Leaflet.Editable.js`脚本。  
在地图选项中允许Leaflet.Editable：

```javascript
var map = L.map('map', {editable: true});
```

然后，要开始编辑现有功能，请调用其上的enableEdit方法：

```javascript
var polyline = L.polyline([[43.1, 1.2], [43.2, 1.3],[43.3, 1.2]]).addTo(map);
polyline.enableEdit();
```
如果你想画一条新线：

```javascript
map.editTools.startPolyline();  // map.editTools已经被创建
                                // 通过将editable：true选项传递给地图
```
如果你想继续现有的线路：

```javascript
polyline.editor.continueForward();
// or
polyline.editor.continueBackward();
```
