### leaflet.latlng-graticule

> 此脚本用于创建一个画布作为覆盖图像来绘制经纬刻度，同时在地图边缘显示网格标记。

#### 用法说明
```javascript
    L.latlngGraticule({
        showLabel: true,
        zoomInterval: [
            {start: 2, end: 3, interval: 30},
            {start: 4, end: 4, interval: 10},
            {start: 5, end: 7, interval: 5},
            {start: 8, end: 10, interval: 1}
        ]
    }).addTo(map);
```

#### Options

|   options   |   默认   |   描述   |
|:-----------:|:-------:|:---------|
|  showLabel  |`true`|在地图的边缘显示网格标记|
|  opacity  |1|经纬网和标签的透明度|
|   weight   |0.8|经纬刻度线的宽度|
|  color   |#aaa|经纬刻度线的颜色|
|  font   |12px Verdana|刻度标签的字体样式|
| fontColor|#aaa|刻度标签的颜色|

> option ==> zoomInterval

在不同的缩放级别使用不同的间隔。可以以纬度和经度线为例，为纬度和经度设置不同的间隔，如下所示:
```javascript
  zoomInterval: {
    latitude: [
      {start: 4, end: 6, interval: 5},
      {start: 7, end: 20, interval: 1}
    ],
    longitude: [
      {start: 4, end: 6, interval: 10},
      {start: 7, end: 20, interval: 2}
    ]
  }
```

默认为：
```javascript
  zoomInterval: [
    {start: 2, end: 2, interval: 40},
    {start: 3, end: 3, interval: 20},
    {start: 4, end: 4, interval: 10},
    {start: 5, end: 7, interval: 5},
    {start: 8, end: 20, interval: 1}
  ]
```

#### 特殊选项
> 某些投影（如兰伯特）不是直线，需要设置这些选项来绘制经纬网线。

| options |   默认   |   描述   |
|:-----------:|:-------:|:---------|
|  lngLineCurved  |0|多段线的间隔|
| latLineCurved  |0|多段线的间隔|
