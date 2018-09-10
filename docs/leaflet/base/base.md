## 《快速上手教程》详细说明文档
**TileLayer**
------
> 在地图上加载和显示瓦片图层.可拓展[GridLayer](#).
#### &ensp;用法示例

```javascript
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
```
##### &ensp;URL模板
###### &ensp;&ensp;以下形式的字符串：

```javascript
'http://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'
```
- {s}:表示可用子域之一(用于帮助处理每个域限制的浏览器并行请求；在选项中指定子域值；默认情况下可以省略a、b或c)。
- {z}:缩放级别。
- {x}、{y}:瓦片坐标。
- {r}:可以用来添加“@2x”到URL来加载视网膜瓦片。可以在模板中使用自定义键，它将从TileLayer选项中取值，如下所示：

```javascript
L.tileLayer('http://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png', {foo: 'bar'});
```
#### &ensp;创建
##### &ensp;&ensp;拓展方法

|  构造器        |   描述        |
|:-------|:------------|
| `L.tilelayer` |通过给定URL模板和具有选项的对象来实例化一个切片图层。|

#### &ensp;选项

| 选项 | 类型 | 默认 |    描述    |
|:---:|:---:|:---:|:-----------|
|minZoom|Number|0|显示的最小级别数。|
|maxZoom|Number|18|显示的最大级别数。|
|subdomains|String\String[]|'abc'|服务的子域。可以传递一个字符串（其中每一个字母都是一个子域名称）或是一个字符串数组。|
|errorTileUrl|String|''|图片的URL给出加载错误的位置。|
|zoomOffset|Number|0|用此值来补偿URL中地图的缩放级别。|
|tms|Number|false|如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）。|
|zoomReverse|Boolean|false|如果此项为true，URL中的缩放级别会被反转（用最大到最小缩放级别来替代缩放级别）。|
|detectRetina|Boolean|false|如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率。|
|crossOrigin|Boolean|false|如果为true，则所有图块将其crossOrigin属性设置为''。如果你想访问瓦片像素数据，这是必需的。|

> 从[GridLayer]()继承的选项

> 从[Layer]()继承的选项

#### &ensp;事件

> 从[GridLayer]()继承的事件

> 从[Layer]()继承的事件

> 从[Layer]()继承的弹出事件

> 从[Layer]()继承的Tooltip事件

> 从[Evented]()继承的方法

**Map**
------
> API各种类中的核心部分，用来在页面中创建地图并操纵地图.
#### &ensp;用法示例

```javascript
// initialize the map on the "map" div with a given center and zoom
var map = L.map('map', {
	center: [51.505, -0.09],
	zoom: 13
});
```
#### &ensp;创建

|  构造器        |   描述        |
|:-------|:------------|
| `L.map` (String)|给定div元素的DOM ID 和可选的对象字面值，来实例化映射对象Map options。|
| `L.map`(HTMLElement) |通过div元素和带有地图选项的描述的文字对象来实例化一个地图对象，其中文字对象是可选的。|

#### &ensp;选项

| 选项 | 类型 | 默认 |    描述    |
|:---:|:---:|:---:|:-----------|
|preferCanvas|Boolean|false|[Paths](#)是否应该呈现在[Canvas](#)渲染器上。默认情况下，所有Paths都在[SVG](#)渲染器中呈现。|

##### &ensp;控制选项

| 选项 | 类型 | 默认 |    描述    |
|:---:|:---:|:---:|:-----------|
|attributionControl|Boolean|true|是否默认将属性控件添加到地图|
|zoomControl|Boolean|true|是否默认将缩放控件添加到地图|

##### &ensp;交互选项

| 选项 | 类型 | 默认 |    描述    |
|:---:|:---:|:---:|:-----------|
|closePopupOnClick|Boolean|true|当你不想用户点击地图关闭消息弹出框时，请将其设置为false。|
|zoomSnap|Number|1|强制地图的缩放级别始终为此的倍数，特别是在`fitBounds()`放大或缩小之后。|
|zoomDelta|Number|1|控制地图的缩放级别多少后改变`zoomIn()`，`zoomOut()`，在键盘上点+或-，或者使用缩放控件。|
|trackResize|Boolean|true|确定地图在窗口尺寸改变时是否可以自动处理浏览器以更新视图.|
|boxZoom|Boolean|true|决定地图是否可被缩放到鼠标拖拽出的矩形的视图，鼠标拖拽时需要同时按住shift键.|
|doubleClickZoom|Boolean\String|true|决定地图是否可被双击缩放.|
|dragging|Boolean|true|决定地图是否可被鼠标或触摸拖动.|

##### &ensp;地图状态选项

| 选项 | 类型 | 默认 |    描述    |
|:---:|:---:|:---:|:-----------|
|crs|[CRS]()|L.CRS.EPSG3857|使用的坐标系，当你不确定坐标系是什么时请不要更改.|
|center|[LatLng]()|true|初始化地图的地理中心.|
|zoom|Number|true|初始化地图的缩放.|
|minZoom|Number|true|地图的最小视图。可以重写地图图层的`minZoom`.|
|maxZoom|Number|true|地图的最大视图。可以重写地图图层的`maxZoom`.|
|layers|Layer[]|true|初始化后加载到地图上的图层.|
|maxBounds|[LatLngBounds]()|true|当这个选项被设置后，地图被限制在给定的地理边界内，当用户平移将地图拖动到视图以外的范围时会出现弹回的效果，并且也不允许缩小视图到给定范围以外的区域（这取决于地图的尺寸）。|
|renderer|[Renderer]()|true|在地图上绘制矢量图层的默认方法。[L.SVG]()或者[L.Canvas]()默认取决于浏览器支持。|

##### &ensp;动画选项

| 选项 | 类型 | 默认 |    描述    |
|:---:|:---:|:---:|:-----------|
|zoomAnimation|Boolean|true|确定瓦片缩放动画是否可用。通常默认在所有浏览器中都支持CSS3转场，android例外.|
|zoomAnimationThreshold|Number|4|如果缩放差异超过此值，将不会动画缩放.|
|fadeAnimation|Boolean|true|确定瓦片淡出动画是否可用。通常默认在所有浏览器中都支持CSS3转场，android例外.|
|markerZoomAnimation|Boolean|true|确定注记的缩放是否随地图缩放动画而播放，如果被禁用，注记在动画中拉长时会消失。通常默认在所有浏览器中都支持CSS3转场，android例外.|
|transform3DLimit|Number|2^23|定义CSS转换转换的最大大小。默认值不应该改变，除非网页浏览器在做了很大的工作后在错误的位置放置图层panBy.|

##### &ensp;平移惯性选项

| 选项 | 类型 | 默认 |    描述    |
|:---:|:---:|:---:|:-----------|
|inertia|Boolean|*|如果该选项可用，在拖动和在某一时间段内持续朝同一方向移动建有动力的地图时，会有惯性的效果.|
|inertiaDeceleration|Number|3000|确定惯性移动减速的速率，单位是像素每秒的二次方.|
|inertiaMaxSpeed|Number|Infinity|惯性移动的最大速度，单位是像素每秒.|
|easeLinearity|Number|0.2||
|worldCopyJump|Boolean|false|启用此选项后，地图会跟踪何时平移到世界的另一个“副本”.|
|maxBoundsViscosity|Number|0.0|如果maxBounds已设置，则此选项将控制拖动地图时边界的固定程度.|

##### &ensp;键盘导航选项
| 选项 | 类型 | 默认 |    描述    |
|:---:|:---:|:---:|:-----------|
|keyboard|Boolean|true|聚焦到地图且允许用户通过键盘的方向键和+/-键来漫游地图.|
|keyboardPanDelta|Number|80|确定按键盘方向键时地图平移的像素.|

##### &ensp;鼠标滚轮选项
| 选项 | 类型 | 默认 |    描述    |
|:---:|:---:|:---:|:-----------|
|scrollWheelZoom|Boolean\Sting|true|是否可以使用鼠标滚轮缩放地图。如果通过'center'，它将放大到视图的中心，而不管鼠标在哪里。|
|wheelDebounceTime|Number|40|限制车轮发射的速率（以毫秒为单位）。默认情况下，用户无法每40ms更频繁地通过滚轮进行缩放。|
|wheelPxPerZoomLevel|Number|60|意味着一个完整缩放级别的变化。较小的值将使车轮变焦更快（反之亦然）。|

##### &ensp;触感交互选项
| 选项 | 类型 | 默认 |    描述    |
|:---:|:---:|:---:|:-----------|
|tap|Boolean|true|支持即时点击的移动黑客。|
|tapTolerance|Number|15|用户在触摸过程中可以移动手指的最大像素数，因此可以认为它是有效的轻击。|
|touchZoom|Boolean\String|*|是否可以通过用两根手指拖动来缩放地图。|
|bounceAtZoomLimits|Boolean|true|如果您不想让地图缩小超过最小/最大缩放范围，然后在捏缩放时反弹回来，请将其设置为false。|

#### &ensp;事件
##### &ensp;图层事件

| 事件 | 数据 |   描述    |
|:---:|:---:|:-----------|
|baselayerchange|[LayersControlEvent]()|通过图层控件更改基础图层时触发。|
|overlayadd|[LayersControlEvent]()|通过图层控件选择叠加层时触发。|
|overlayremove|[LayersControlEvent]()|通过图层控件取消选择覆盖图时触发。|
|layeradd|LayerEvent|将新图层添加到地图时触发。|
|layerremove|LayerEvent|从地图中移除某个图层时触发。|

##### &ensp;映射状态更改事件
| 事件 | 数据 |   描述    |
|:---:|:---:|:-----------|
|zoomlevelschange|[Event]()|由于添加或移除图层而导致地图上缩放级别的数量发生更改时触发。|
|resize|[ResizeEvent]()|调整地图大小时触发。|
|unload|[Event]()|使用删除方法销毁地图时触发。|
|viewreset|[Event]()|当地图需要重新绘制其内容时（这通常发生在地图缩放或加载上）时触发。对创建自定义叠加非常有用。|
|load|[Event]()|初始化地图时（第一次设置中心和缩放时）触发。|
|zoomstart|[Event]()|地图缩放即将改变时（例如缩放动画之前）触发。|
|movestart|[Event]()|当地图视图开始变化时（例如，用户开始拖动地图）触发。|
|zoom|[Event]()|在缩放级别发生任何变化时反复发射，包括缩放和飞行动画。|
|move|[Event]()|在地图的任何移动过程中反复发射，包括平移和飞行动画。|
|zoomend|[Event]()|任何动画之后，当地图发生变化时触发。|
|moveend|[Event]()|地图中心停止改变时（例如，用户停止拖动地图）触发。|
