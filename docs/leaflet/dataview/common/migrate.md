# leaflet.migrationLayer
> git log 版本号 dbcb196a5be7a91e21a0facab28cf0c9587b3e52

!> 版本维护时间 2017-10-09 10:33:32

## 提交BUG
找到bug请提交[issue](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)

** leafet.migrationLayer用来描述人口流动,航班,出行等流向 **

<div style="text-align:center" align="center">
  <img src="https://sylvenas.github.io/leaflet.migrationLayer/demo.gif" />
</div>

## 浏览器支持   
-  Internet Explorer 10+     
- Google Chrome     
- Safari    
- Firefox        

## 在线Demo
[点击进入](https://sylvenas.github.io/leaflet.migrationLayer/).

1.使用     

```html
  <script include="migrate" src="../../libs/zondyclient/include-leaflet-local.js"></script>
```    
** Or **
```html
<script src="./dist/leaflet.migrationLayer.js"></script>
```

2.创建迁移图层
```js
var data = [
  {
    "from": [point_iter[0][1], point_iter[0][0]], //本例中经纬度是反过来的[lon, lat]
    "to": [point_iter[last][1], point_iter[last][0]], //leaflet标准是[lat, lon]
    "labels": ["起点", "终点"],
    "color": "#ff3a31"
  }
];
var migrationLayer = new L.migrationLayer({
    map: map,
    data: data
})
```     
3.更新或者设置数据
```js
migrationLayer.setData(newData);
```   
4.隐藏迁移图层    
```js
migrationLayer.hide();
```   
5.展示迁移图层       
```js
migrationLayer.show();
```   
6.暂停动画  
```js
migrationLayer.pause();
```   
7.播放动画
```js
migrationLayer.play();
```   
8.销毁图层   
```js
migrationLayer.destroy();
```   

## API(options)   

| option          | Description            | Default Value    | Possible  values         | Required       |
| --------------- | ---------------------- | -----------------| ------------------------ | -------------- |
| map             | the map obj            | null             | Map                      | yes            |
| data            | data for migrationLayer| null             | Json                     | yes            |
| pulseRadius     | the pulse radius       | 25               | any number>0             | no             |
| pulseBorderWidth| pulse border width     | 3                | any number>0             | no             |
| arcWidth        | arc width              | 1                | any number>0             | no             |
| arcLabel        | show from and to label | true             | Bool                     | no             |
| arcLabelFont    | label font and size    | '15px sans-serif'| 'size font'              | no             |   

## Leaflet Version     
Requires Leaflet 1.0.2 or newer   

## License   
MIT.    
