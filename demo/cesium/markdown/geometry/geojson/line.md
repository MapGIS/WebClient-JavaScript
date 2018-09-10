#### GeoJSON-Line
------
> 对类型"LineString"来说，“coordinates"成员必须是`两个`或者`多个`位置的数组。

##### 提交BUG
> 找到bug请提交，我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)。

标准数据格式：
```javascript
var GeoLine = {
        "type": "LineString",
        "properties":{
            "prop0": "value0"
        },
        "coordinates": [
                [
                    114.34776306152344,
                    30.623436511269382
                ],
                [
                    114.32510375976562,
                    30.63909360759635
                ],
                [
                    114.30673599243164,
                    30.634958017061198
                ],
                [
                    114.29180145263672,
                    30.629640569460406
                ]]
    };
```

> 线性环具有`4个`或者`更多`位置的封闭的线。第一个和最后一个位置是相等的（它们表示相同的的点）。