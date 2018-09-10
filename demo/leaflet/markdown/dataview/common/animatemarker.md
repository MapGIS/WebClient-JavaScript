# Leaflet Animated Marker
一个可以播放标注动画的leaflet插件,如自行车沿着行驶道路的行车轨迹等[官方示例](http://openplans.github.com/Leaflet.AnimatedMarker/).

## 提交BUG
找到bug请提交[issue](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)

## 工作原理
使用CSS3的动画原理,让leaflet的marker能够在点与点之间按照指定的速度移动(米/毫秒).

> 老浏览器兼容性问题-如果是不支持CSS3的浏览器,原理是将整个轨迹切分成`distance`大小的多个线段,然后按照每`interval`秒的时间不断移动来实现,该方式性能不好,`技术是进步的,请使用现代浏览器`.

## 使用方法

下面的代码创建一个 AnimatedMarker 让`marker`沿着`line`移动, 声明一个`Leaflet.Map` 的变量 `map`.

``` javascript
    var line = L.polyline(
      [[40.68510, -73.94136],
      [40.68576, -73.94149],
      [40.68649, -73.94165]]);
    var animatedMarker = L.animatedMarker(line.getLatLngs());

    map.addLayer(animatedMarker);
```

## 改变播放速度

``` javascript
    var animatedMarker = L.animatedMarker(line.getLatLngs(), {
      distance: 300,  // meters米,表示每帧移动的距离,越大则一帧移动的距离越远,速度越快
      interval: 2000, // milliseconds毫秒,每帧之间移动的时间间隔,与distance相互配合
    });
```

!> 如果interval = 1000`毫秒`, distance = 1000`米`; 表示`每秒移动` interval/distance = `1公里`

## 如何实现设置自动播放? 或者在移动中途停止动画?
``` javascript
    var animatedMarker = L.animatedMarker(line.getLatLngs(), {
      autoStart: false
    });

    // Start when you're ready
    animatedMarker.start();

    setTimeout(function() {
      // Stop the animation
      animatedMarker.stop();
    }, 2000);
```

## 自定义图标

使用标准的图片组件 `L.icon`
``` javascript
    var myIcon = L.icon({
      iconUrl: 'myicon.png'
    });

    var animatedMarker = L.animatedMarker(line.getLatLngs(), {
      icon: myIcon
    });
```

## 移动到轨迹尽头让图标消失

使用 `onEnd` 回调函数.
```javascript
    var animatedMarker = L.animatedMarker(line.getLatLngs(), {
      onEnd: function() {
        // TODO: blow up this marker
        this.remove();//消除该图标marker
      }
    });
```
