#### Geojson特征集合数据格式：
------

##### 提交BUG
> 找到bug请提交，我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)。

标准数据格式如下：
```javascript
  var FeaCollection = {
       "type": "FeatureCollection",
       "features": [{
         "type": "Feature",
         "geometry": {
           "type": "Point",
           "coordinates": []
         },
       }, {
         "type": "Feature",
         "geometry": {
           "type": "LineString",
           "coordinates": [[]]
         }
       }, {
         "type": "Feature",
         "geometry": {
           "type": "Polygon",
           "coordinates": [[[]]]
         }
       }]
     }
```

***注:*** 若访问对象路径过长时，可以通过赋值给变量的方法来解决：
```javascript
var item = data.aggregations.mapExtent.geohash.buckets[i];
var coordinate = decodeGeoHashToPolygon(item.key);
```
