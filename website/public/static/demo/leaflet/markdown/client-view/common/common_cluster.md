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
| size     | 数字型 | 单个聚类点的`半径`大小                                             |
| max      | 数字型 | 最大的`聚类程度`                                                   |
| field    | 字符串 | 选择对应的字段，该字段必须是`数字型`的字段，用来计算大小和颜色     |
| type     | 字符串 | grid表示`网格`聚类，honeycomb表示`蜂窝`聚类                          |
| gradient | 对象   | 不同比例程度对应的`颜色`，如25%对应蓝色，55%对应绿色，100%对应红色 |


``` json
gradient: {
   0.25: "rgb(0,0,255)",
   0.55: "rgb(0,255,0)",
   0.85: "yellow",
   1.0: "rgb(255,0,0)"
}
```
