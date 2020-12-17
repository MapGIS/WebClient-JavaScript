# 要素图层

要素图层`某种程度`上可以临时顶替 `OGC-WMS` 来使用

## 元数据信息
[要素图层信息](http://219.142.81.85/arcgis/rest/services/10wanZH/MapServer/11)

![说明示例](static/demo/mapboxgl/markdown/arcgis-mapserver/arcgismapserver/featurelayerinfo.png)

> 上面得图片里面最关键得有2点 第一点是 空间参考系 4326 和对应得空间范围
> 1. 如果空间参考系不是4326/4490/4610的话，如深圳常用的`4547`，下面代码的BBOXSR，IMAGESR还是设置成`4326/4490`表示强行投影到经纬度/大地2000坐标上
> 2. 如果是`4547`, 对应Extent的[Xmin, Ymin, Xmax, Ymax ],里面的值极有可能是很大的数值，如果换算成经纬度呢，使用proj4进行单点投影即可,下面对应的字符串规则可以在 [EPSG换算表上获取](http://develop.smaryun.com:8899/#/standard/epsg)

``` javascript
var firstProjection = 'PROJCS["NAD83 / Massachusetts Mainland",GEOGCS["NAD83",DATUM["North_American_Datum_1983",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],AUTHORITY["EPSG","6269"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4269"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",42.68333333333333],PARAMETER["standard_parallel_2",41.71666666666667],PARAMETER["latitude_of_origin",41],PARAMETER["central_meridian",-71.5],PARAMETER["false_easting",200000],PARAMETER["false_northing",750000],AUTHORITY["EPSG","26986"],AXIS["X",EAST],AXIS["Y",NORTH]]';
var secondProjection = "+proj=gnom +lat_0=90 +lon_0=0 +x_0=6300000 +y_0=6300000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";
//I'm not going to redefine those two in latter examples.
proj4(firstProjection,secondProjection,[2,5]);
// [-2690666.2977344505, 3662659.885459918]
```

``` javascript
tiles: [
    `http://219.142.81.85/arcgis/rest/services/10wanZH/MapServer/export?` +
        'F=image' +
        '&FORMAT=PNG32' +
        '&TRANSPARENT=true' +
        '&LAYERS=show:0,2,4,7,9,10,11,12' +
        '&SIZE=512,512' +
        '&bbox={bbox}' +
        '&BBOXSR=4326' +     // 即便这个地方是4547,也得设置成4326/4490
        '&IMAGESR=4326' +    // 即便这个地方是4547,也得设置成4326/4490
        '&DPI=90'
],
```

