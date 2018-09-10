### GeoJSON

---
#### 提交BUG
> 找到bug请提交,我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Mapbox/issues)

***注：*** 是一种对各种地理数据结构进行编码的格式。GeoJSON对象可以表示几何、特征或者特征集合。GeoJSON支持下面几何类型：`点`、`线`、`面`、`多点`、`多线`、`多面`和`几何集合`。GeoJSON里的特征包含一个`几何对象`和`属性对象`，特征集合表示一系列特征。

---
#### GeoJSON-Point

***注：*** 对类型"Point"来说，“coordinates"成员必须是一个一维数组。

**标准数据格式：**

```javascript
var Point = {
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [102.0, 0.5]},
    "properties": {
        "prop0": "value0"
    }
}
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
