### 加载自定义投影瓦片

> 参考网址 
>> [EPSG](http://epsg.io)  

>> [proj4](https://github.com/kartena/Proj4Leaflet) 

>> [spatialreference](http://spatialreference.org/ref/epsg/)

``` javascript
var crs = new L.Proj.CRS('EPSG:2362',
            '+proj=tmerc +a=6378137 +b=6356752.31414036 +lat_0=0 +lon_0=114 +x_0=38500000+y_0=0 +ellps=GRS80 +units=m +no_defs', {
                resolutions: [
                    35.07833000659791, 17.539165003298955, 8.769582501649477,
                    4.384791250824739, 2.1923956254123693, 1.0961978127061847
                ],
                origin: [38570106.6565339, 4107440.9868805557],
                bounds: L.bounds([
                    [38570106.6565339, 4100174.3296849937],
                    [38576679.186042026, 4107440.9868805557]
                ])
            }),


        map = L.map('map', {
            crs: crs,
            center: [37.09, 114.80],   //注意这里要使用经纬度坐标
            zoom: 1,
            continuousWorld: true,
            worldCopyJump: false,
        });
```

### igserver瓦片分辨率与范围

> 上述代码中的 `resolutions origin bounds` 来自igserver页面

![igserver](../demo/leaflet/markdown/map/customtile/igserver.png)

### 投影信息

> 上述代码中的 `+a=6378137 +b=6356752.31414036 +lat_0=0 +lon_0=114 +x_0=38500000+y_0=0 +ellps=GRS80 +units=m +no_defs` 来自平台K10里面的投影信息

![projection](../demo/leaflet/markdown/map/customtile/projection.png)

