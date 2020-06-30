### 数据格式要求
> 通用可视化的格式要求是 GeoJSON
> 聚类图目前支持持`点数据`的 GeoJSON 格式

#### 示例数据
``` json
{
"type": "FeatureCollection",
"features": [
{ "type": "Feature", 
  "properties": { "AREA": 0, "PERIMETER": 0, "name": "三亚市", "mapgis_style": 1 }, 
  "geometry": { "type": "Point", "coordinates": [ 109.513357866988571, 18.2382733141521243 ] } },
{ "type": "Feature", 
  "properties": { "AREA": 0, "PERIMETER": 0, "name": "临沧", "mapgis_style": 1 }, 
  "geometry": { "type": "Point", "coordinates": [ 100.088115020674039, 23.880495588961768 ] } }
]
}
```


### 参数说明
| 名称     | 类型   | 说明                                                               |
| ---      | ---    | ---                                                                |
| zoom      | 数字型 | 最大的`聚类级别`                                                   |
| title     | 字符串 | 单个聚类点的`半径`大小                                             |
| field    | 字符串 | 选择对应的字段，该字段必须是`数字型`的字段，用来计算大小和颜色     |



