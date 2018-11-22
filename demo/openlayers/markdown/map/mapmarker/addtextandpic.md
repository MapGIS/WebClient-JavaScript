### 核心关键
#### 坐标转换

1. 由于日常生活中使用`经纬度`较多，而默认的地图的投影坐标系是`Web墨卡托`
2. 经纬度的坐标在Web墨卡托下的位置是世界的中心，即非洲的某个地方，如下图所示
    ![error](../demo/openlayers/markdown/map/mapmarker/addpopup.png)
3. 需要针对`经纬度`数据进行对应的坐标转换

|投影类型|投影范围|EPSG号码|Proj4指令|
|:---|:---|:---|:---|
|Web墨卡托_WGS1984|[20037508.3427892, -20037508.3427892]|EPSG:3857|+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs|
|WGS1984_度|[180, -180]|EPSG:4326|+proj=longlat +datum=WGS84 +no_defs|
|地理坐标系(西安)_度|[180, -180]|EPSG:4610|+proj=longlat +a=6378140 +b=6356755.288157528 +units=degrees +no_defs|
|地理坐标系(北京)_度|[180, -180]|EPSG:4214|	+proj=longlat +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +no_defs|
|中国2000国家大地坐标系_度|[180, -180]|EPSG:4490|+proj=longlat +ellps=GRS80 +units=degrees +no_defs|

> [EPSG官方网址](http://epsg.io/)
> [Proj4官方网址](http://proj4js.org/)

#### 核心代码

> `ol.proj.fromLonLat([116.28, 39.54]))`
> > 返回的是地图map设置的地理坐标系坐标，默认是EPSG:3857（Web墨卡托）