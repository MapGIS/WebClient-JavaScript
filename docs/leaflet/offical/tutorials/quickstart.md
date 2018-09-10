## Leaflet Quick Start Guide
本教程将快速介绍有关于Leaflet的基础知识，包括设置Leaflet地图、创建(线、标记、提示框)以及处理一些事件，让你对‘叶子’有个基本的了解。

#### 准备
- 引入leaflet.js、leaflet.css文件。
`leaflet.js`、`leaflet.css`
- 创建一个拥有具体id的div容器。
`<div id="mapid"></div>`
- 明确容器的高度。
`#mapid { height: 180px; }`

#### 设置地图
- 用Mapbox Streets的瓦片数据来创建一个以武汉为中心的地图。首先我们将初始化地图，通过选定的地理坐标设置地图视角以及缩放级别。
```javascript
//在leaflet中的经纬度坐标与实际坐标位置是相反的，即真实的地理经纬度坐标为[114.398902, 30.518762]
var mymap = L.map('mapid').setView([30.518762, 114.398902], 13);
```
&emsp;&emsp;默认情况下（在我们创建地图实例的时候没有传入任何的选项配置），所有的鼠标和触控交互都是无效的，界面上会有缩放(左上角)和来源(右下角)控件。

- 添加瓦片图层到地图上。创建一个瓦片图层通常需要为瓦片影像设置`URL template`、数据来源、最大缩放级别。
```javascript
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);
```
&emsp;&emsp;值得注意的是，Leaflet不会强制用户使用特定提供商的瓦片地图。当然，使用不同提供商的瓦片地图时，在使用语法上会有些许不同(详情请参考:[Leaflet-providers](https://github.com/leaflet-extras/leaflet-providers))，就比如Mapbox，你必须在Mapbox官网注册，获得`ID`以及`ACCESS_TOKEN`才可以使用。密钥获取地址：[mapbox密钥](https://www.mapbox.com/account/access-tokens)。

#### Markers，circles，polygons
&emsp;&emsp;除了瓦片图层，还可以很方便地在地图上添加其他一些东西，包括marker、polylines、polygons、circles和popups。

- 添加marker
```javascript
var marker = L.marker([51.5, -0.09]).addTo(mymap); //可以添加相应的options
```
- 添加circle
```javascript
//通过传入相应options控制circle样式
var circle = L.circle([51.508, -0.11], {
    color: 'red',         //圈轨迹颜色，即外边框的颜色
    fillColor: '#f03',    //填充色，默认值与color值一致
    fillOpacity: 0.5,     //填充透明度
    radius: 500           //circle半径，单位为米
}).addTo(mymap);
```
- 添加polygon
```javascript
//面是一个二维坐标数组
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap);
```
#### 使用弹出窗口
&emsp;&emsp;当您想要将某些信息附加到地图上的特定对象时，通常需要使用弹出窗口，Leaflet有非常方便快捷的方法：
```javascript
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");
```
&emsp;&emsp;`bindPopup`方法将带有指定HTML内容的弹出窗口附加到您的标记上,以便在您单击该对象时出现弹出窗口。同时`openPopup`方法仅仅只适用于marker。
&emsp;&emsp;当你需要的东西不仅仅是附加一个弹出对象时，可以将popups作为图层来使用：
```javascript
var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(mymap); //使用openOn而不是addTo,此方法在打开一个新的弹出窗口时，会自动关闭之前打开的弹出窗口
```
#### 处理事件
&emsp;&emsp;在Leaflet上发生的一些事件，比如用户点击标记或改变地图缩放大小，相应的对象会发送一个可以用函数描述的事件。它可以对用户交互作出反应：
```javascript
//点击地图任意位置，会弹出当前位置的坐标信息
function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}
mymap.on('click', onMapClick);
```
&emsp;&emsp;每个对象都有自己的一组事件，监听函数`on()`的第一个参数是一个事件对象，它包含有发生的事件的有用信息。例如，地图点击事件对象（上例中的e）具有latlng属性，该属性是点击发生时的位置。
&emsp;&emsp;让我们通过使用弹出窗口而不是消息对话框来改进我们的示例：
```javascript
var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}
mymap.on('click', onMapClick);
```

