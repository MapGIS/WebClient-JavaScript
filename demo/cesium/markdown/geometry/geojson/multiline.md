#### GeoJSON-MultiLineString
---------

> 对类型“MultiLineString"来说，"coordinates"成员必须是一个`线坐标数组`的数组(即`三维数组`)。

##### 提交BUG
> 找到bug请提交，我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)。


标准数据格式：
```javascript
var MultiLine = {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "MultiLineString",
            "coordinates": [
                [
                    [
                        114.30862426757812,
                        30.65533885862785
                    ],
                    [
                        114.23755645751953,
                        30.55191344082329
                    ]
                ],[
                    [
                        114.3134307861328,
                        30.677191798461496
                    ],
                    [
                        114.38827514648437,
                        30.528849308009075
                    ]
                ]
            ]
        }
    };
```
