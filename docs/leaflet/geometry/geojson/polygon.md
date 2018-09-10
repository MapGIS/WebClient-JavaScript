### GeoJSON

---
#### 提交BUG
> 找到bug请提交,我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Mapbox/issues)

---

#### GeoJSON-Polygon

***注：*** 对类型"Polygon"来说，"coordinates"成员必须是一个线性环坐标数组的数组(`三维数组`)。对拥有多个环的的面来说，第一个环必须是外部环，其他的必须是内部环或者孔。外部环是`顺时针方向`，内部环是`逆时针方向`.

> 请注意， 如果只是一个简单的区的话`顺时针、逆时针`都可以显示。但是针对带洞区，最好采取外圈`顺时针`，内圈`逆时针`的方式，这样在其他的平台如mapbox上保证显示效果的一致性。不然`一份数据`可能在前端的显示效果会`不尽相同`。

> Mapbox上`外顺内逆`是带洞区， `外顺内顺`是类似同心圆的`叠加区`。

**标准数据格式：**

```javascript
var GeoPolygon = {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        114.32510375976562,
                        30.63968439181164
                    ],
                    [
                        114.22931671142578,
                        30.608958829007946
                    ],
                    [
                        114.22348022460937,
                        30.601275914486066
                    ],
                    [
                        114.22931671142578,
                        30.580588116155223
                    ],
                    [
                        114.32510375976562,
                        30.63968439181164
                    ]
                ]
            ]
        }
    };
```

---
#### MapBox样式说明
~~~ json
{
  "layout": {
    "visibility": "visible" //是否可见  visible / none
  },
  "paint": {
    "fill-antialias": true, //抗锯齿，true表示针对边界缝隙进行填充
    "fill-color": "#000000", //颜色
    "fill-opacity": 0.8, //透明度
    "fill-outline-color": "#FFFF00",//边线颜色，没错,确实没有边线宽度这个选项
    "fill-pattern":"picture_name", //线的拉伸图片类型，一定要与对应的样式库的图片名字一一对应
    "fill-translate": [0,0] //表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上
  }
}
~~~
