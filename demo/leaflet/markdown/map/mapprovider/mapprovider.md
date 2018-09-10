## 瓦片地图URL以及使用规范
### 高德地图

```text
1.高德:`http://webst0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}`
2.高德卫星图:`http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}`
  注记:`http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}`  

> 需要在options中加入`subdomains: ["1", "2", "3", "4"]`
```


### 天地图

```text
1.天地图:`http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}`
  注记:`http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}`
2.天地图卫星:`http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}`
  注记:`http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}`
3.天地图地形:`http://t{s}.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}`
  注记:`http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}`

> 需要在options中加入`subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']`
```


### 谷歌地图

```text
谷歌地形图:`http://mt3.google.cn/vt/lyrs=t@132,r@249000000&hl=zh-CN&src=app&s=Galileo&x={x}&y={y}&z={z}`
谷歌矢量图:`http://mt3.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&s=Galile&x={x}&y={y}&z={z}`
谷歌遥感图:`http://mt1.google.cn/vt?lyrs=s@173&hl=zh-Hans-CN&gl=CN&token=63145&x={x}&y={y}&z={z}`
谷歌交通图:`http://mt2.google.cn/vt/imgtp=png32&lyrs=h@248000000,highlight:0x342eaef8dd85f26f:0x39c2c9ac6c582210@1%7Cstyle:maps&hl=zh-CN&gl=CN&src=app&s=Galileo&x={x}&y={y}&z={z}`
谷歌遥感(新):`https://khms0.googleapis.com/kh?v=800&hl=zh-CN&x={x}&y={y}&z={z}`
```


### OpenStreetMap

```text
OSM:`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
```


### Esri

```text
- `https://server.arcgisonline.com/ArcGIS/rest/services/{variant}/MapServer/tile/{z}/{y}/{x}`

> 需要在options中加入`variant: 'World_Street_Map'`
```


### Stamen

```text
`https://stamen-tiles-{s}.a.ssl.fastly.net/{variant}/{z}/{x}/{y}.{ext}`

需要在options中加入`subdomains: 'abcd'`,`variant: 'toner'`,`ext: 'png'`
```



**注意：**推荐使用天地图和OSM，使用的坐标系不需要纠偏。其余地图，使用的时候都需要纠偏。