# 三大接口api

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
  | left_top/bottom_right|数组|[lat,lon]|

## 地理围栏
