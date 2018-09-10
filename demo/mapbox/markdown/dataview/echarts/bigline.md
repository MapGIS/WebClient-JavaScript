#### 百度 Echarts
> [Echarts官方教程](http://echarts.baidu.com/api.html#echarts)  [官方下载](http://echarts.baidu.com/download.html)

#### 特别说明
> 由于我们是GIS公司，我不会花费过多的时间在图表等这些插件的对接上，因此如果该插件有bug,我不会优先解决该类bug。如果依赖echarts新的东西请使用echarts原生的用法请~~屏蔽下面的用法~~

``` javascript
layer = new mapboxgl.zondy.EchartsLayer(map, option).addTo(map);
```

#### 关键代码
由于echart本省是作用在百度地图上的，因此别的地图在使用的时候需要设置对应的坐标系，以leaflet举例，关键代码如下

``` javascript
var option = {
    //backgroundColor: '#000',
    title: {
        text: '10000000 GPS Points',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    mapboxgl: {     //关键地方---1
        roam: true
    },
    series: [{
        name: '弱',
        type: 'scatterGL',
        progressive: 20000,
        coordinateSystem: 'mapboxgl',//关键地方---2
        symbolSize: 1,
        zoomScale: 0.002,
        blendMode: 'lighter',
        large: true,
        itemStyle: {
            color: 'rgb(20, 15, 2)'
        },
        postEffect: {
            enable: true
        },
        silent: true,
        dimensions: ['lng', 'lat'],
        data: new Float32Array()
    }]
};
```
