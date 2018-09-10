### 事件 Events

常规的 **Markers** 的点击,鼠标移动时间 `click`, `mouseover`,
聚类的 **Cluster**, 模板类似:`cluster` + `<eventName>`, 举例如右边: `clusterclick`, `clustermouseover`, `clustermouseout`.

下面是代码演示

```javascript
markers.on('click', function (a) {
	console.log('marker ' + a.layer);
});

markers.on('clusterclick', function (a) {
	// a.layer is actually a cluster
	console.log('cluster ' + a.layer.getAllChildMarkers().length);
});
```

### Additional MarkerClusterGroup Events

>- **animationend**: 当聚类/借宿聚类动画完成时候的回调函数
>- **spiderfied**: 当蜘蛛网展开的回调函数 (Contains ```cluster``` and ```markers``` attributes)
>- **unspiderfied**: 当蜘蛛网收缩时的回调函数 (Contains ```cluster``` and ```markers``` attributes)

---

---
## 方法 Methods

### 图层方法 Group methods

#### 添加/删除图层
`addLayer`, `removeLayer` and `clearLayers` 可以应用于大部分的场景

---
#### 批量添加/删除图层
`addLayers` and `removeLayers` 批量添加/删除在性能上要比单个添加删除要优秀,上一节的`聚类图-属性`来使用`addLayers`.

> 正如我上一节所说,这个功能主要是应用与加载大数据时防止浏览器等待过久导致的崩溃,因此先对是比较鸡肋的......

---
#### 分批添加聚类属性-`大数据使用`
> 下面这些属性的应用场景和特别,在我看来还有点鸡肋,主要是如果添加一个100000级别的数据的时候,由于准备时间过长导致地图的卡顿.因此为了解决卡顿的情况,通过一个进度条来等待.跟现在手机下拉刷新的等待进度条一个道理. 在example/marker-clustering-realworld.50000.html的例子中,如果你在地图没有加载的时候疯狂的缩放操作,就可以看到这个进度条,`这个功能说实话很鸡肋......`

Options for the [addLayers](#bulk-adding-and-removing-markers) method. See [#357](https://github.com/Leaflet/Leaflet.markercluster/issues/357) for explanation on how the chunking works.
>* **chunkedLoading**: 分批加载大量的marker标注,主要是为了`避免`浏览器弹出 xxx无响应,是否关闭的提示,这个还可以
>* **chunkInterval**: 单个图层分批添加的时间间隔, 默认是200ms.
>* **chunkDelay**: 不同图层的之间的时间间隔. 默认50ms.
>* **chunkProgress**: 进度回调条,通知前端更新对应的加载进度,`鸡肋功能`[code in RealWorld 50k](https://github.com/Leaflet/Leaflet.markercluster/blob/master/example/marker-clustering-realworld.50000.html#L33-L49). 默认为null. 形参是:
  1. `current` Number of processed markers 当前处理的marker的数量
  2. `total` Total number of markers being added 总共添加的marker数量
  3. `cost` Elapsed time (in ms) 消耗时间

当你删除大量的标注的时候`clearLayers`后再`addLayers`就可以实现相对流畅的效果.请参考 [#59](https://github.com/Leaflet/Leaflet.markercluster/issues/59#issuecomment-9320628)

---
#### 获取一个标注的父亲标注,隐藏跟踪

> 应用场景,你像跟踪一个标注,但是它自己或者是他的上一级都被聚类了,导致看不见了,但是还是想特别标注它的位置,就使用该父亲注记

```javascript
var visibleOne = markerClusterGroup.getVisibleParent(myMarker);
console.log(visibleOne.getLatLng());
```
