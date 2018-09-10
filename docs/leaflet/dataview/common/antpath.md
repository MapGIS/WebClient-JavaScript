# Leaflet Ant Path
![leaflet-ant-path logo](https://raw.githubusercontent.com/rubenspgcavalcante/leaflet-ant-path/master/assets/ant-path.png)  
[![Build Status](https://travis-ci.org/rubenspgcavalcante/leaflet-ant-path.svg?branch=master)](https://travis-ci.org/rubenspgcavalcante/leaflet-ant-path)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ca1062428b51428b8204e9044d4fdc3b)](https://www.codacy.com/app/rubenspgcavalcante/leaflet-ant-path?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rubenspgcavalcante/leaflet-ant-path&amp;utm_campaign=Badge_Grade)
[![npm version](https://badge.fury.io/js/leaflet-ant-path.svg)](https://badge.fury.io/js/leaflet-ant-path)
[![Bower version](https://badge.fury.io/bo/leaflet-ant-path.svg)](https://badge.fury.io/bo/leaflet-ant-path)

## *实现蚂蚁轨迹线*
[Live demo here](http://rubenspgcavalcante.github.io/leaflet-ant-path)  
[![example of the animation](https://raw.githubusercontent.com/rubenspgcavalcante/leaflet-ant-path/master/assets/ant-path-demo.gif)](http://rubenspgcavalcante.github.io/leaflet-ant-path)

## 提交BUG
找到bug请提交[issue](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)

### 源码
[源码download](https://github.com/rubenspgcavalcante/leaflet-ant-path-bower/archive/master.zip) this source code

### 版本要求
  - Leaflet >= 1

### 重要提示!
- 如果第版本浏览器不支持CSS3(或者地图属性`preferCanvas`为`false`) ,则该动画几乎无效. Leaflet AntPath uses CSS transitions to animate the SVG element. If the map options **preferCanvas** is active (true),
the animation will not work, as there's no information about what was drawn inside the canvas tag.

- MultiAntPath该特性被移除, 并且该插件不在支持早期版本(0.7.7). 如果想在早期版本使用该插件,请使用低于0.6版本的该插件

### 使用方式
使用方式和L.Polyline一致

```javascript
    // 使用对象构造函数
    var antPolyline = new L.Polyline.AntPath(latlngs, options);

    // 工厂模式构造
    antPolyline = L.polyline.antPath(latlngs, options);

    antPolyline.addTo(map);
```

### 参数
AntPath 继承自[FeatureGroup](http://leafletjs.com/reference.html#featuregroup)并且实现了[Path](http://leafletjs.com/reference.html#path)接口

Initialise with the same options of a common [Polyline]((http://leafletjs.com/reference.html#polyline)), with some extra options, like the flux color.  

| name | type | example | description |
|------|------|---------| ------------|
|latlngs| L.LatLng[] **or** Array\[number, number\]  | \[ \[0, 10\], \[-20, 0\], ... \] |经纬度数组 (用法与 [Polyline constructor](http://leafletjs.com/reference.html#polyline)一致 )
|options| Object  | {color: 'red', weight: 5, ...}  |[Polyline options](http://leafletjs.com/reference.html#polyline-options) 加上下面 **extra** options
|options.paused| boolean | true/false | 暂停(default: false)
|options.reverse| boolean | true/false | 流动方向
|options.pulseColor| string | #FF00FF |  dashed flux颜色 (default: 'white')
|options.delay | string | 120 | 流动速度 (default: 400)
|options.dashArray| [number, number] **or** string | [15, 30] |虚实线长度 (default: "10, 20").[参考文档](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray)

---

### 方法
| name | returns | description |
|------|---------|-------------|
| pause() | boolean | 暂停动画 |
| resume() | booelan | 恢复动画 |
| reverse() | **this** instance | 改变流动方向 |
| map(callback) | new AntPath or extended class | Iterates over the latlngs |

同样带有 L.Polyline API and以及行为(继承L.Polyline嘛^ ^!). [See it here.](http://leafletjs.com/reference.html#polyline)

---


#### map method
AntPath可以通过map方法映射成一条新的蚂蚁线,比如将原先的数据的经纬度一起做偏移之类....
 *(or the child class which extends it, because of its Functor property)*:
```javascript
//New path with translated path
const newAnthPath = myAntPath.map(function(pos){
  latLng(pos.lat + 1, pos.lng + 1);
});
```

### License
This project is under the [MIT LICENSE](http://opensource.org/licenses/MIT)
