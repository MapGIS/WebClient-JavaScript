### GeoJSON

---
#### 提交BUG
> 找到bug请提交,我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Mapbox/issues)

> 参考官方网页 [GeoJSON解析器官方示例](https://www.npmjs.com/package/geojson)

> 该解析函数`只能`转换**数组**，`不能`转换`嵌套对象`如下

``` json
---------------分割线，下面的可以----------
{
  name : "panzhuoran",
  id : 123456,
  lon : 114.9,
  lat : 30
}
---------------分割线，下面的不行----------
{
  name : "panzhuoran",
  id : 123456,
  geo : {
    lon : 114.9,
    lat : 30
  }
}

```

---
#### 手动转换
``` javascript
var collections =
      "type": "FeatureCollection",
      "features": [];
}
//再针对你的数据，进行对应的类型转换
var yourdata = [
  {
    name: "panzhuora",
    geo: {
      lon: 114.30,
      lat: 30.50
    }
  },
  ...,
  {}
]
//一个一个追加数据
for(var i =0; i < yourdata.length; i++){
  var point = {//这个的point声明一定要写在循环体里面，特别重要
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [ yourdata[i].geo.lon, yourdata[i].geo.lat] ]
    },
    "properties": {
        "name": yourdata[i].name
    }
  };
  collections.features.push(point);
}
```


---
#### 特定地理数据转换为GeoJSON
------

***注：*** 使用GeoJSON脚本库的`parse()`方法，可以将一组或单个地理数据对象转换为GeoJSON数据。

**1. 一组对象**
代码示例：
```javascript
var data = [
  { name: 'Location A', category: 'Store', street: 'Market', lat: 39.984, lng: -75.343 },
  { name: 'Location B', category: 'House', street: 'Broad', lat: 39.284, lng: -75.833 },
  { name: 'Location C', category: 'Office', street: 'South', lat: 39.123, lng: -74.534 }
];
GeoJSON.parse(data, {Point: ['lat', 'lng']});
//如果不需要全部的properties,则使用下面这个句子选择性的添加：
GeoJSON.parse(data, {Point: ['lat', 'lng'], include: ['name']});
//只保留了name属性
```
转换结果：
```javascript
var output = {
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature",
      "geometry": {"type": "Point", "coordinates": [-75.343, 39.984]},
      "properties": {
        "name": "Location A",
        "category": "Store"
      }
    },
    { "type": "Feature",
      "geometry": {"type": "Point", "coordinates": [-75.833, 39.284]},
      "properties": {
        "name": "Location B",
        "category": "House"
      }
    }
  ]
};
```

**2. 单个对象**

代码示例：
```javascript
var singleobject = { name: 'Location A', category: 'Store', street: 'Market', lat: 39.984, lng: -75.343 }
GeoJSON.parse(singleobject, {Point: ['lat', 'lng']});
```
转换结果：
```javascript
 var output = {
    "type": "Feature",
    "geometry": {"type": "Point", "coordinates": [-75.343, 39.984]},
    "properties": {
      "name": "Location A",
      "category": "Store"
    }
  };
```
**3. 对象之间拥有相同属性**

***注：*** 若数据对象拥有相同特性，则可以通过include取它们共同的特性。
代码示例：
```javascript
var data1 = [{ name: 'Location A', street: 'Market', x: 34, y: -75 }];

var data2 = [{ name: 'Location B', date: '11/23/2012', x: 54, y: -98 }];

GeoJSON.defaults = {Point: ['x', 'y'], include: ['name']};

GeoJSON.parse(data1, {});
GeoJSON.parse(data2, {});
```
转换结果：
```javascript
var output = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-75, 34]
      },
      "properties": {
        "name": "Location A"
      }
    }
  ]
};
var output1 = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-98, 54]
        },
        "properties": {
          "name": "Location B"
        }
      }
    ]
  };
```

**4. 转换后直接执行函数**
```javascript
GeoJSON.parse(geojson1, { Point: 'coordinate'}, function(geojson){
    console.log(JSON.stringify(geojson));
    //注意这里不能马上执行map相关的事件，
    //map相关的事件必须map.on('load', function() {}触发时才能初始化对应的map
    //可以把GeoJSON.parse()写在map.on()里面
  });
```
