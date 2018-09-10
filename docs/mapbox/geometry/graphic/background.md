### Background样式

---
#### 提交BUG
> 找到bug请提交,我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Mapbox/issues)


#### Mapbox样式

[官方参考示例](https://www.mapbox.com/mapbox-gl-js/style-spec#layers-background)

> MapBox的样式只针对矢量数据有效，如geojson，矢量瓦片等。 栅格瓦片是不生效的。

MapBox对矢量数据的样式设置都是`基于图层级别`的，即下面的核心代码,不过背景图层相对简单，一般是作为`底图添加`的，因此一般是通过`初始化`的时候添加。

``` json
var map = new mapboxgl.Map({
    container: 'mapid',
    style: {
      "version": 8,
      "sources": {
        "osm-tiles": {
          "type": "raster",
          'tiles': [
            "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ],
          'tileSize': 256
        }
      },
      "layers": [{ //注意该图层的顺序，是在下面的图层之下的，因此在缩放的时候才能看见该背景图层
        "id": "backgroundid",
        "type": "background",
        "layout": {
          "visibility": "visible",//visible/none  表示是否可见
        },
        "paint": {
          "background-color": "#009688", //颜色
          "background-opacity": 0.6, //透明度
          "background-pattern": 5, //选择图片填充对应的背景，这个其实应该没有太多应用场景
        }
      }, {
        "id": "simple-tiles",
        "type": "raster",
        "source": "osm-tiles",
        "minzoom": 0,
        "maxzoom": 20
      }]
    },
    zoom: 11,
    pitch: 45,
    center: [114.39960479736327, 30.495722001885323]
  });
```

> **source** `数据源的名称` `背景图层不需要这个数据源`，因此不要再添加对应的数据源了

**上面的代码核心部分是2个部分**

> + **layout** `视图` 一般是控制是否可见
> + **paint** `画笔样式` *这才是真正决定颜色、宽度、透明度等样式的地方*，

---
#### 参数

##### layout参数
|名称|类型|说明|
|:---|:---|:---|
|visibility|String字符串| visible, 是否可见  visible / none|

##### paint参数
|名称|类型|说明|
|:---|:---|:---|
|background-color|String字符串|颜色举例：`#ff0`，`#ffff00`,`rgb(255, 255, 0)`,`rgba(255, 255, 0, 1)`,`hsl(100, 50%, 50%)`,`hsla(100, 50%, 50%, 1)`,`yellow`|
|background-opacity|Number数字型|0～1.0, 透明度，越低越透明|
|`background-pattern`|String字符串|picture_name, 区的拉伸图片类型，一定要与对应的样式库的图片名字一一对应|

> 由于上面几节已经详细的介绍了对应的样式库Sprite，加上背景图层用的极少，因此不在重复的介绍对应的知识了，请回头看`Line`,`Fill`,`Fill-Extrusion`等知识
