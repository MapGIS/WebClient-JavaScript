## Leaflet on Mobile
在这个例子中，你将学会如何创建一个全屏地图，从而在移动设备中使用，例如iPhone、iPad或者Android手机。同时也将学会如何获得和使用用户当前的地理位置。

#### 定位
Leaflet有一个非常巧妙的方法来处理地图的缩放级别和探测用户地理位置－－带有`setView`选项的`locate`方法。使用常用的setView方法在下面的代码中：
`map.locate({setView: true, maxZoom: 16});`

##### locate()

|   Method   |   Returns   |   Description   |
|:-----------|:-----------:|:----------------|
|locate(`<Locate options>` options?)|this|尝试使用`Geolocation API`定位用户，成功获取位置数据触发`locationfound`事件，失败则触发locationerror事件，并且可以根据检测精度将地图视图设置为用户的位置（定位失败则设置为世界视角）。请注意，如果您的页面不使用HTTPS，则此方法将在最新流行浏览器（Chrome 50及更高版本）中失败。|

##### locate options
`Map`在一些地理位置方法中使用到的options参数。

|   Options   |   Type   |   Default   |   Description   |
|:-----------:|:--------:|:-----------:|:----------------|
|   watch   |   Boolean   |   false   |如果true，使用W3C `watchPosition`方法开始连续观察位置变化（而不是检测到位置变化）。停止观看使用`map.stopLocate()`方法。|
|   setView   |   Boolean   |   false   |如果true自动将地图视图设置为与检测精度相关的用户位置，或者如果地理位置失败，则自动将其设置为世界视图。|
|   maxZoom   |   Number   |   Infinity   |使用setView选项时，自动查看设置的最大缩放级别。|
|   timeout  |   Number   |   10000   |在触发locationerror事件之前等待地理位置响应的毫秒数。|
|  maximumAge  |   Number   |   0   |检测到的位置的最大生命周期 如果小于上次地理位置响应以来的毫秒数，locate将返回缓存的位置。|
|enableHighAccuracy |   Boolean   |   false   |是否实现高精度，请参阅`W3C规范`中的说明。|

