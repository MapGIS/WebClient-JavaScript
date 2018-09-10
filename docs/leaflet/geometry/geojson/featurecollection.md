### GeoJSON

---
#### 提交BUG
> 找到bug请提交,我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Mapbox/issues)

---
#### Geojson特征集合数据格式：
> 这里重点说明的是当一份geojson数据中含有`多种数据格式，点线面`时，如何通过`filter`字段实现过滤功能。

**类型筛选器**
> + `"Point"`  注意传入的是`字符串`
> + `"LineString"` 注意传入的是`字符串`
> + `"Polygon"` 注意传入的是`字符串`

~~~ javascript
  map.addLayer({
        "id": "lineid",
        "type": "line",
        "source": "geojsonCollections", //必须和上面的geojsonCollections一致
        "filter": ["==", "$type", "LineString"], //关键点：$type是固定语法，类型是Point、LineString、Polygon
        "layout": {
          ...
        },
        "paint": {
          ...
        }
      });
~~~

---

**标准数据格式如下：**

~~~javascript
 var FeaCollection = {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": []
        },
      }, {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": [[]]
        }
      }, {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [[[]]]
        }
      }]
    }
~~~
