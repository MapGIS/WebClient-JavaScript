### 地理数据转换为GeoJSON
------

##### 提交BUG
> 找到bug请提交，我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)。

#### 特定格式
使用GeoJSON脚本库的`parse()`方法，可以将一组或单个地理数据对象转换为GeoJSON数据。

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

#### 非特定格式
若地理数据非以上格式，而是地理数据中`嵌套对象或数组`，如以下数据：
```javascript
var data =[{"geo":{"lon":108.898895,"lat":34.185112},
            "result":"false",
            "model":"R611",
            "dataTime":1514864532000},
           {"geo":{"lon":108.88043,"lat":34.240665},
            "result":"false",
            "model":"R611",
            "dataTime":1516543650000}];
```
针对以上数据格式，可以通过下面这个方法解决数据：
1. 根据相应数据（点，线，面）创建相应的标准GeoJSON数据模板。如：
```javascript
 var GeoPoint = {         //根据数据类型做相应改变
        "type":"FeatureCollection",
        "features":[]
    }
```

2. 通过ajax异步获取网络数据或者相对路径获取本地数据。异步请求代码如下：
```javascript
$.ajax({
    url:"http 或者../data",   //请求的url地址
    dataType:"json",   //返回格式为json
    async:true,   //请求是否异步，默认为异步，这也是ajax重要特性
    type:"GET",
    success:function(data){
        //将获取到的数据传给一个变量
    },
    error:function(){
        //请求出错的处理，一般为弹出一个警示框
    }
})
```
3. 对获取到的数据，访问相应的数据位置（对象或数组）。取出数据并存放到'feature'模板下的‘coordinates’中。代码如下：
```javascript
var feature1 = {             //点
    "type": "Feature",
    "geometry": {
        "type": "Point",    //注意数据类型不要写错，如大小写
        "coordinates": []   
        },
    "properties": {
        "prop0": "value0"
    }
}
//注：基本类型为"Point","Linesting","Polygon","MultiPoint","MultiLineString","MultiPolygon"
```
4. 通过数组push()方法将feature添加到第1步features中。


