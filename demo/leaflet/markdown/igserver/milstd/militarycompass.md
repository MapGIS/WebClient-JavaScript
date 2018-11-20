### 军标绘制(指北针)
> `说明:`获取绘制图层点集的接口为`MilStd.Compass.getCompassFromVert(vertices, milStdType)`
* vertices：控制点数组
* milStdType：指北针类型
  + ArrowCross 十字箭头指北针
  + CircleClosedangle 圆形尖角指北针
  + Closedangle 尖角指北针
  + DoubleClosedangle 双向尖角指北针
  + Fourstar 四角指北针
  + Rhombus 菱形指北针
  + SameDirectionClosedangle 同向尖角指北针
  + Triangle 三角指北针
  + Vane 风向标指北针

```javascript
//根据选择类型，用算法绘制图形的点集
  var parseDots = MilStd.Compass.getCompassFromVert(vertices, milStdType);
//根据点集绘制几何图形
  var tempPoly = L.polygon(parseDots[0]);//图形
  var templine = L.polyline(parseDots[1]);//线
//最后将绘制的图形添加到地图容器中，如果有多个图形，使用L.LayerGroup()的方式添加绘制图层，便于绘制图层管理
  this._PolygonLayer = new L.LayerGroup();
  map.addLayer(this._PolygonLayer);
  tempPoly.addTo(this._PolygonLayer);
  templine.addTo(this._PolygonLayer);
``` 