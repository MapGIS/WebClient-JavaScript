### 军标绘制(箭头)
> `说明:`获取绘制图层点集的接口为`MilStd.Arrow.getArrowFromVert(vertices, milStdType, milParam)`
* vertices：控制点数组
* milStdType：箭头类型
  + SimpleArrow 简单箭头
  + DoubleArrow 双箭头
  + StraightArrow 直箭头
  + SingleLineArrow 单线箭头
* milParam：绘制军标图形参数
  + headHeightFactor 箭头头部高度因子
  + headWidthFactor 箭头头部宽度因子
  + neckHeightFactor 箭头腰部高度因子
  + neckWidthFactor 箭头腰部宽度因子
  + tailWidthFactor 箭头尾部宽度因子
  + hasSwallowTail 是否有箭头尾部
  + swallowTailFactor 箭头尾部因子

```javascript
//根据选择类型，用算法绘制图形的点集
  var parseDots = MilStd.Arrow.getArrowFromVert(vertices, milStdType, milParam);
//根据点集绘制几何图形（SingleLineArrow画线，其余三个箭头画多边形）
  var tempPoly = null; //图形或线
  if (milStdType === "SingleLineArrow") {
      tempPoly = L.polyline(parseDots);
  } else {
      tempPoly = L.polygon(parseDots);
  }
//最后将绘制的图形添加到地图容器中，如果有多个图形，使用L.LayerGroup()的方式添加绘制图层，便于绘制图层管理
  this._PolygonLayer = new L.LayerGroup();
  map.addLayer(this._PolygonLayer);
  tempPoly.addTo(this._PolygonLayer);
``` 