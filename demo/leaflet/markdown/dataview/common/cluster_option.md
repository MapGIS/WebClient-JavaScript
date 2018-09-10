### 属性详解
[Bug提交地址,如有问题请提交问题说明,我们会及时响应](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)

----
#### 自定义图标

```javascript
var markers = L.markerClusterGroup({
	iconCreateFunction: function(cluster) {
    //这里可以换成其他的icon http://leafletjs.com/reference-1.3.0.html#icon
		return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
	}
});
```
---
#### 默认激活属性 (boolean 类型)
> * **showCoverageOnHover**: 标移到聚类图标时显示聚类边界范围
> * **zoomToBoundsOnClick**: 点击聚类图标时是否展开到这级的聚类详情状态
> * **spiderfyOnMaxZoom**: 当点击一个聚类图标如数量为5,并且该级别没有聚类效果了,则将这5个图标直接像蜘蛛网一样展开显示 (*注意: 除此之外, `disableClusteringAtZoom` 选项为true时,也会触发对应的效果*)
> * **removeOutsideVisibleBounds**: 当聚类图标或者注记图标离当前的视图太远的时候就不显示,移出对应的图标,这样可以提升显示的性能.
> * **animate**: 平滑过渡动画. 当 `L.DomUtil.TRANSITION` 为false, 这个属性即使是true也无效

#### 其他属性
> * **animateAddingMarkers**: 如果在现有的基础上新添一个marker,则以动态形势添加,鸡肋功能,最好别开,浪费性能.

> * **disableClusteringAtZoom**: 该设定级别及其以下级别都不聚类显示 [See Example](https://leaflet.github.io/Leaflet.markercluster/example/marker-clustering-realworld-maxzoom.388.html). *注意 该属性和 `spiderfyOnMaxZoom`属性为`false`的区别.
> * **maxClusterRadius**: 最大聚类半径 (单位:像素). 默认 80.
> * **polygonOptions**: 传递L.Polygon(points, options)展示聚类边界.使用的是默认属性[default Path options](http://leafletjs.com/reference.html#path-options).
>* **singleMarkerMode**: 当设置为`true`时,原本单个的非聚类的图标会编程聚类图标的样式,并且显示数字1 *注意: 单个的非聚类的图标只是图片换成了聚类的样式,该对象本身仍然还是一个marker. 因此`disableClusteringAtZoom`属性设置了,也无法将其图标还原成原先的蓝色marker,请看错误说明[#391](https://github.com/Leaflet/Leaflet.markercluster/issues/391)).
* **spiderLegPolylineOptions**: 设置蜘蛛线的样式,使用的 [PolylineOptions](http://leafletjs.com/reference.html#polyline-options) 的标准样式. 默认值是 `{ weight: 1.5, color: '#222', opacity: 0.5 }`.
* **spiderfyDistanceMultiplier**: 使用大图标的时候很容易出现图标挤在一起,因此增加蜘蛛线的长度,让图标分散开 (Default: 1).
* **iconCreateFunction**: 创建自定义图标. 请看[the default implementation](https://github.com/Leaflet/Leaflet.markercluster/blob/15ed12654acdc54a4521789c498e4603fe4bf781/src/MarkerClusterGroup.js#L542)或者[custom example](https://leaflet.github.io/Leaflet.markercluster/example/marker-clustering-custom.html).
* **clusterPane**: 聚类图标的Pane类型. 默认是L.Marker'的默认配置 (currently 'markerPane'). `这个属性主要用于两个不同聚类图层同时显示时,通过不同的pane来区分不同的聚类图层`[See the pane example](https://leaflet.github.io/Leaflet.markercluster/example/marker-clustering-pane.html).

#### 分批添加聚类属性-大数据使用
> 下面这些属性的应用场景和特别,在我看来还有点鸡肋,主要是如果添加一个100000级别的数据的时候,由于准备时间过长导致地图的卡顿.因此为了解决卡顿的情况,通过一个进度条来等待.跟现在手机下拉刷新的等待进度条一个道理. 在example/marker-clustering-realworld.50000.html的例子中,如果你在地图没有加载的时候疯狂的缩放操作,就可以看到这个进度条,`这个功能说实话很鸡肋......`

Options for the [addLayers](#bulk-adding-and-removing-markers) method. See [#357](https://github.com/Leaflet/Leaflet.markercluster/issues/357) for explanation on how the chunking works.
>* **chunkedLoading**: 分批加载大量的marker标注,主要是为了`避免`浏览器弹出 xxx无响应,是否关闭的提示,这个还可以
>* **chunkInterval**: 单个图层分批添加的时间间隔, 默认是200ms.
>* **chunkDelay**: 不同图层的之间的时间间隔. 默认50ms.
>* **chunkProgress**: 进度回调条,通知前端更新对应的加载进度,`鸡肋功能`[code in RealWorld 50k](https://github.com/Leaflet/Leaflet.markercluster/blob/master/example/marker-clustering-realworld.50000.html#L33-L49). 默认为null. 形参是:
  1. `current` Number of processed markers 当前处理的marker的数量
  2. `total` Total number of markers being added 总共添加的marker数量
  3. `cost` Elapsed time (in ms) 消耗时间
