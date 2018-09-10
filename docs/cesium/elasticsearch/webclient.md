# 中地elasticsearch封装接口

> 三大接口api

## 时空查询
+ 纯Query
  - 全查询
+ 空间+ Query
+ 时间 + Query
+ 时间+空间过滤 Query

## 时空聚类
+ 纯Query
  - 全查询
+ 空间+ Query
  - 聚合aggregations
  - facets
+ 时间 + Query
  - 聚合aggregations
  - facets
+ 时间+空间过滤 Query
  - 聚合aggregations
  - facets

``` javascript
Service(timeRange, extent, type(aggregations|facets));
```

  |timeRange参数|类型|
  |:---|:----|
  |unix时间戳|毫秒/秒|
  |2018-10-10 00:00:00|dateType类型|

  |extent|类型|示例|
  |:---|:----|:----|
  |left_top/bottom_right|json对象|{lat:30, lon: 100}|
  | left_top/bottom_right|数组|[30,120] `(格式是[lat, lon])`|
  | bound_box|二维数组|[[lat,lon],[lat,lon],[lat,lon]]|

## 地理围栏
+ setGeoFence(geoFence)

+ checkFenceSates()

# 西安博识风云举例
## 时空查询功能
如:
	1. ID+时间范围查询 = geojson
	2. status+imei查询 = geojson
	3. 圆、环、矩形空间查询 = geojson
	4. 查询多媒体url = 自定义
	5. imei+多媒体 = geojson

> 参数：空间[bbox(xmin,ymax,xmax,ymin), circle, pnt, line, polygon]，时间[字段名(可选)，时间范围]， IDs[唯一ID值列表], 属性字段条件[ES自带格式]

> 返回：geojson

## 时空聚合统计功能
	如：空间聚合 = 自定义
> 参数：空间[bbox(xmin,ymax,xmax,ymin), circle, pnt, line, polygon]，时间[字段名，时间范围]， 属性字段条件[ES自带格式]，type[聚合类型(个数聚合，统计(最大，最小，中值等)聚合)] 	

> 返回：geojson、聚合格式


## 地理围栏查询
    如：空间围栏
> 参数：空间围栏[bbox(xmin,ymax,xmax,ymin), circle, pnt, line, polygon]，时间[可选][字段名(可选)，时间戳]，属性围栏[即属性字段条件][ES自带格式]

> 返回：geojson、围栏结果
