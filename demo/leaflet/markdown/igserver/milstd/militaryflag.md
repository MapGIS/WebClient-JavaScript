### 军标绘制(旗标)
> `说明:`获取绘制图层点集的接口为`MilStd.Flag.getFlagFromVert(vertices, milStdType)`
* vertices：控制点数组
* milStdType：旗标类型
  + TriangleFlag 三角旗
  + RectFlag 矩形旗
  + CurveFlag 波浪旗

```javascript
//根据选择类型，用算法绘制图形的点集
  var parseDots = MilStd.Flag.getFlagFromVert(vertices, milStdType);
//根据点集绘制几何图形
  var tempPoly = L.polygon(parseDots[0]);//图形
  var templine = L.polyline(parseDots[1]);//线
//最后将绘制的图形添加到地图容器中，如果有多个图形，使用L.LayerGroup()的方式添加绘制图层，便于绘制图层管理
  this._PolygonLayer = new L.LayerGroup();
  map.addLayer(this._PolygonLayer);
  tempPoly.addTo(this._PolygonLayer);
  templine.addTo(this._PolygonLayer);
``` 