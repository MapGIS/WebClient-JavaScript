## Path.Drag.js
> 此脚本用于给leaflet路径添加拖拽能力。

#### 用法说明

> 启用拖动

```javascript
layer.dragging.enable()
```

> 禁用拖动

```javascript
layer.dragging.disable()
```

> 如果希望路径在添加到地图后立即可拖动，请将`draggable：true`添加到其选项中：

```javascript
const layer = L.polygon([[[]]], {draggable: true})
```