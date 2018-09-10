### GeoJSON

---
#### 提交BUG
> 找到bug请提交,我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Mapbox/issues)

---

#### GeoJSON-MultiPoint

***注：*** 对类型`MultiPoint`来说，`coordinates`成员必须是`二维数组`。


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

---
#### MapBox样式说明
~~~ json
"paint": {
  "circle-radius": 15,//半径
  "circle-color": "#FF0000",//颜色
  "circle-opacity": 0.8, //透明度
  "circle-stroke-width": 5, //轮廓线宽度
  "circle-stroke-color": "#0000FF",//轮廓线颜色
  "circle-stroke-opacity": 0.7//轮廓线透明度
  "circle-translate": [0,0] //表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上
}
~~~
