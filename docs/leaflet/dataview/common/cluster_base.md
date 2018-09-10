### 基本使用
[Bug提交地址,如有问题请提交问题说明,我们会及时响应](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)

---
#### 默认值 (boolean 类型)
> **showCoverageOnHover**: 鼠标移到聚类图标时显示聚类边界范围
> **zoomToBoundsOnClick**: 点击聚类图标时是否展开到这级的聚类详情状态
> **spiderfyOnMaxZoom**: 当点击一个聚类图标如数量为5,并且该级别没有聚类效果了,则将这5个图标直接像蜘蛛网一样展开显示 (*注意: 除此之外, `disableClusteringAtZoom` 选项为true时,也会触发对应的效果*)
> **removeOutsideVisibleBounds**: 当聚类图标或者注记图标离当前的视图太远的时候就不显示,移出对应的图标,这样可以提升显示的性能.
> **spiderLegPolylineOptions**: 设置蜘蛛线的样式,使用的 [PolylineOptions](http://leafletjs.com/reference.html#polyline-options) 的标准样式. 默认值是 `{ weight: 1.5, color: '#222', opacity: 0.5 }`.

---
#### 屏蔽聚类效果
 MarkerClusterGroup:
```javascript
var markers = L.markerClusterGroup({
	spiderfyOnMaxZoom: false,
	showCoverageOnHover: false,
	zoomToBoundsOnClick: false
});
```
