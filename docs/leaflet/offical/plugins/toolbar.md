## Leaflet.Toolbar
Leaflet.Toolbar为Leaflet地图提供了灵活的，可扩展的工具栏界面。

#### 用法示例
通过HTML标签引入下列脚本：

```javascript
<script src="node_modules/leaflet-toolbar/dist/leaflet.toolbar.js"></script>
<link rel="stylesheet" href="node_modules/leaflet-toolbar/dist/leaflet.toolbar.css"/>
```
Leaflet.Toolbar导出两种可用于工具栏的工具栏样式：弹出式工具栏和控件式工具栏。要实例化一个控制风格的工具栏并将其添加到地图中，请使用：

```javascript
new L.Toolbar2.Control({
	actions: [MyAction1, MyAction2, ...]
}).addTo(map);
```