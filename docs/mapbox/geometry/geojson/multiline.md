### GeoJSON

---
#### 提交BUG
> 找到bug请提交,我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Mapbox/issues)

---

#### GeoJSON-MultiLineString

***注：*** 对类型`MultiLineString`来说，`coordinates`成员必须是一个线坐标数组的数组(`三维数组`)。


**标准数据格式：**

```javascript
var MultiLine = {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "MultiLineString",
            "coordinates": [
                [ //第一条线开始
                    [
                        114.30862426757812,
                        30.65533885862785
                    ],
                    [
                        114.23755645751953,
                        30.55191344082329
                    ]
                ], //第一条线结束
                [  //第二条线开始
                    [
                        114.3134307861328,
                        30.677191798461496
                    ],
                    [
                        114.38827514648437,
                        30.528849308009075
                    ]
                ]  //第二条线结束
            ]
        }
    };
```

---
#### MapBox样式说明
~~~ json
{
  "layout": {
    "line-cap": "square", //butt 尖头，round 圆头，square平头
    "line-join": "round", //bevel平拐，round 圆拐，miter棱拐
    "line-miter-limit": 2, //棱拐的限制，一般用不上
    "line-round-limit": 1.05,//圆拐的限制，一般用不上
    "visibility": "visible",  //是否可见  visible / none
  },
  "paint": {
    "line-width": 20, //宽度
    "line-color": "#000000", //颜色
    "line-opacity": 0.8, //透明度
    "line-gap-width" : 0,  //线的沟宽，如果有一条线会变成2条线，中间有条沟
    "line-offset" : 0, //尽量少用，如果这个值相对大的话在拐角处很容易变形变胖
    "line-dasharray": [5,2],//实线、虚线的组合，可以表示铁路线等
    "line-blur" : 5,//模糊度，和宽度配合使用，当宽度20，模糊度10时，出现边线模糊的效果，该值要小于线宽度
    "line-pattern": "picture_name", //线的拉伸图片类型，一定要与对应的样式库的图片名字一一对应
    "line-translate": [0,0] //表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上
  }
}
~~~
