#### GeoJSON-MultiPoint
-------

> 对类型"MultiPoint"来说，"coordinates"成员必须是`二维数组`。

##### 提交BUG
> 找到bug请提交，我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)。

标准数据格式：
```javascript
var MultiPoint = {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "MultiPoint",
            "coordinates": [
                [
                    114.29351806640625,
                    30.602457940999596
                ],[
                    114.21146392822264,
                    30.56580841410847
                ],[
                    114.30896759033203,
                    30.529145036680408
                ]
            ]
        }
    };
```
