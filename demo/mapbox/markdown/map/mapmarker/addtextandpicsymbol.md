### Symbol样式

**Symbol样式由两部分组成，分别是`图标`与`文字`,这两者是各自独立互不影响的**
> 请特别关注 `"icon-image": "college-15"`, 它与line-pattern,fill-pattern一样是对应样式库中的图片的名字，样式库sprite在下面有详细讲解。`特别重要，与上面的Marker添加图片的方式不同的是，这里的添加的图片不能是随意添加的图片，只能是一套完整的样式库图片`,优点在于该图片的表现形式和分辨率都完爆传统的png方式

> 核心思想是，通过`geojson图层`来实现特定的样式配置，然后再通过geojson图层`动态添加数据`的方式实现动态添加图片注记。

``` javascript
map.on('click', function(mapMouseEvent) {
  //鼠标单击点坐标
  var latlon = mapMouseEvent.lngLat;
  //添加一个新的标注（矢量要素）
  var symbol = { //一定要是最标准的geojson格式
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": latlon.toArray()
    },
    "properties": {
      "name": "新增点",
    }
  };
  GeoPoints.features.push(symbol);
  map.getSource('symbolLayer').setData(GeoPoints);//名字symbolLayer与上面的source一致
});
```

---
#### 提交BUG
> 找到bug请提交,我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Mapbox/issues)

---
#### 针对图层进行绑定
> * map.on('click', 'men_ids', function(){}); 是针对Layer.id = 'men_ids'的图层进行处理
> * map.on('click', function(mapMouseEvent){}); 是针对整个地图进行处理 [mapMouseEvent](https://www.mapbox.com/mapbox-gl-js/api#mapmouseevent)


``` javascript
map.on('click', function(mapMouseEvent) {
  mapMouseEvent.lngLat;
  ...
}

map.on('click', 'men_ids', function (e) {//请注意这里的men_ids要与上面的layer-id一致
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.name;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }//防止数据越界

    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
});
```

#### Mapbox样式

[官方参考示例](https://www.mapbox.com/mapbox-gl-js/style-spec#layers-symbol)

MapBox对矢量数据的样式设置都是`基于图层级别`的，即下面的核心代码

``` javascript
//添加数据源，这里是geojson
map.addSource('symbolLayer', {
  "type": "geojson",
  "data": GeoPoints
});

//当你看到下面的注释时，肯定要骂人，但是实际上常用的参数就几个  
map.addLayer({
  "id": "zondy",
  "type": "symbol",
  "source": "symbolLayer", //必须和上面的symbolLayer一致
  "filter": ["==", "name", "东正门", "南副门", "北副门"], //关键点：name对应geojson中的属性字段
  "layout": {
    "symbol-placement": "point", //"point"表示基于单个点的注记, "line"表示平铺在线上的注记
    "symbol-spacing": 200, //单位像素,便是每个注记的占用空间，只有symbol-placement=line才生效
    "symbol-avoid-edges": false, //避免在边界情况的，注记碰撞压盖，一般不设置

    "icon-allow-overlap": false, //true表示在图层有压盖关系时，仅仅是当前图标保持可见
    "icon-ignore-placement": false, //说句实话，这个属性我测了好久真心不知道怎么生效，如果你找到了请提交bug通知我
    "icon-optional": true, // true表示和其他注记冲突的时候,如果文字没被压盖，显示文字，隐藏图标
    "icon-rotation-alignment": "viewport", //map表示随地图旋转角度旋转，viewport表示随当前视角/数据形态（线的方向）一致
    "icon-size": 1.4, //表示图片的缩放比例
    "icon-text-fit": "none", //"none", "width", "height", "both"让图片适应文字的宽高
    "icon-text-fit-padding": [0, 0, 0, 0], // 在适应文字大小的基础上添加对应的内部padding距离
    "icon-image": "college-15", //与line-pattern,fill-pattern一样是对应样式库中的图片的名字
    "icon-rotate": 0, //图片旋转角度
    "icon-padding": 2, //图片正常的内部padding间距
    "icon-keep-upright": false, //true表示在地图旋转方向变化是保持图片的上下翻转，就是防止拼接的时候上下颠倒
    "icon-offset": [0, 0], //[x,y]图片的偏移
    "icon-anchor": "center", //"center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"图片的对齐方向
    "icon-pitch-alignment": "auto", //"map", "viewport"对齐方向，这个用于道路的注记，表示是延道路方向显示还是生硬的添加注记

    "text-pitch-alignment": "auto", //"map", "viewport"对齐方向，这个用于道路的注记，表示是延道路方向显示还是生硬的添加注记
    "text-rotation-alignment": "auto", //map表示随地图旋转角度旋转，viewport表示随当前视角/数据形态（线的方向）一致
    "text-field": "{name}", //固定语法，请不要忘记{}号
    "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"], //这个请特别注意，涉及版权mapgis的字体只有少数，最好使用mapbox的自带的字体库
    "text-size": 20, //字体大小，默认16
    "text-max-width": 10, //字体最大宽度，默认10 ems
    "text-line-height": 1.2, //字体高度,默认 1.2 ems
    "text-letter-spacing": 0,
    "text-justify": "center", //文字对齐方式,"left", "center", "right"
    "text-anchor": "center", //文字对齐方向，"center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"
    "text-max-angle": 45, //针对拐角处，相邻字符的最大角度差
    "text-rotate": 0, //文字旋转方向，单位degrees
    "text-padding": 0, //文字的padding内间距，单位像素
    "text-keep-upright": false, //true表示在地图旋转方向变化是保持文字的上下翻转，就是防止文字拼接的时候上下颠倒
    "text-transform": "none", //"none", "uppercase", "lowercase",显示文字的时候是全大写、全小写，保持不变
    "text-offset": [4.5,0], ////[x,y]文字的偏移
    "text-allow-overlap": false, // true表示和其他注记有压盖关系时，当前文字保持可见
    "text-ignore-placement": false, //说句实话，这个属性我测了好久真心不知道怎么生效，如果你找到了请提交bug通知我
    "text-optional": true, // true表示和其他注记冲突的时候,如果图标没被压盖，显示图标，隐藏文字
    "visibility": "visible", //visible/none
  },
  "paint": {
    "icon-opacity": 1.0, //图标透明度
    "icon-color": "#202", //图标颜色
    "icon-halo-color": "#888", //图标光晕颜色
    "icon-halo-width": 2, //图标光晕宽度
    "icon-halo-blur": 1, //图标光晕模糊度
    "icon-translate": [0, 0], //表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上

    "text-opacity": 1.0, // 文字透明度
    "text-color": "#fff", //文字颜色
    "text-halo-color": "#000", //文字光晕颜色
    "text-halo-width": 2, //文字光晕宽度
    "text-halo-blur": 1, //文字光晕模糊度
    "text-translate": [0, 0] //表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上
  }
});
```

上面的代码核心部分是4个部分

> + **source** `数据源的名称`必须和之前的map.addSource('sourceName')一致，`特别重要`
> + **filter** `过滤条件` 按照各自的业务实现对应的数据过滤，注意属性字段的一一匹配
> + **layout** `视图` 一般是控制是否可见、注记的避让压盖关系等，`类型type=symbol时`需要特别重视
> + **paint** `画笔样式` *这才是真正决定颜色、宽度、透明度等样式的地方*，不同的类型对应的属性也各自不同，需要注意这点

---
#### 参数

> 最常用参数已经用`红色标红强调`了，其他的参数其实真心用的少

##### layout参数
|名称|类型|说明|
|:---|:---|:---|
|||**Symbol参数**|
|`symbol-placement`|String字符串| "point"表示基于单个点的注记, "line"表示平铺在线上的注记|
|symbol-spacing|Number数字型| 200,  单位像素,便是每个注记的占用空间，只有symbol-placement=line才生效|
|symbol-avoid-edges|Bool布尔型| false,  避免在边界情况的，注记碰撞压盖，一般不设置|
|||**Icon参数**|
|icon-allow-overlap|Bool布尔型| false,  true表示在图层有压盖关系时，仅仅是当前图标保持可见|
|icon-ignore-placement|Bool布尔型| false,  说句实话，这个属性我测了好久真心不知道怎么生效，如果你找到了请提交bug通知我|
|icon-optional|Bool布尔型| true,   true表示和其他注记冲突的时候,如果文字没被压盖，显示文字，隐藏图标|
|`icon-rotation-alignment`|String字符串| "viewport",  map表示随地图旋转角度旋转，viewport表示随当前视角/数据形态（线的方向）一致|
|`icon-size`|Number数字型|1.4,  表示图片的缩放比例|
|icon-text-fit|String字符串| "none",  "none", "width", "height", "both"让图片适应文字的宽高|
|icon-text-fit-padding|Number数组型| [0, 0, 0, 0],  在适应文字大小的基础上添加对应的内部padding距离|
|`icon-image`|String字符串| "college-15",  与line-pattern,fill-pattern一样是对应样式库中的图片的名字|
|icon-rotate|Number数字型| 0,  图片旋转角度|
|icon-padding|Number数字型| 2,  图片正常的内部padding间距|
|icon-keep-upright|Bool布尔型| false,  true表示在地图旋转方向变化是保持图片的上下翻转，就是防止拼接的时候上下颠倒|
|`icon-offset` |Number数组型|[0, 0],  [x,y]图片的偏移|
|icon-anchor|String字符串| "center",  "center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"图片的对齐方向|
|icon-pitch-alignment|String字符串| "auto",  "map", "viewport"对齐方向，这个用于道路的注记，表示是延道路方向显示还是生硬的添加注记|
|||**Text参数**|
|text-pitch-alignment|String字符串| "auto",  "map", "viewport"对齐方向，这个用于道路的注记，表示是延道路方向显示还是生硬的添加注记|
|text-rotation-alignment|String字符串| "auto",  map表示随地图旋转角度旋转，viewport表示随当前视角/数据形态（线的方向）一致|
|`text-field`|String字符串| "{name}",|
|`text-font`|String字符串数组| ["Open Sans Regular", "Arial Unicode MS Regular"],  这个请特别注意，涉及版权mapgis的字体只有少数，最好使用mapbox的自带的字体库|
|`text-size`|Number数字型| 20,  字体大小，默认16|
|text-max-width|Number数字型| 10,  字体最大宽度，默认10 ems|
|text-line-height|Number数字型| 1.2,  字体高度,默认 1.2 ems|
|text-letter-spacing|Number数字型| 0,文字字母间距，基本没用|
|text-justify|String字符串| "center",  文字对齐方式,"left", "center", "right"|
|text-anchor|String字符串| "center",  文字对齐方向，"center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"|
|text-max-angle|Number数字型|45,  针对拐角处，相邻字符的最大角度差|
|text-rotate|Number数字型| 0,  文字旋转方向，单位degrees|
|text-padding|Number数字型| 0,  文字的padding内间距，单位像素|
|text-keep-upright|Bool布尔型| false,  true表示在地图旋转方向变化是保持文字的上下翻转，就是防止文字拼接的时候上下颠倒|
|text-transform|String字符串| "none",  "none", "uppercase", "lowercase",显示文字的时候是全大写、全小写，保持不变|
|`text-offset`|Number数组型| [4.5,0],   [x,y]文字的偏移|
|text-allow-overlap|Bool布尔型|true表示和其他注记有压盖关系时，当前文字保持可见|
|text-ignore-placement|Bool布尔型| `false,说句实话，这个属性我测了好久真心不知道怎么生效，如果你找到了请提交bug通知我`|
|text-optional|Bool布尔型| true,   true表示和其他注记冲突的时候,如果图标没被压盖，显示图标，隐藏文字|
|visibility|String字符串| "visible",  visible/none|

##### paint参数
|名称|类型|说明|
|:---|:---|:---|
|||**Icon参数**|
|`icon-opacity`|Number数字型| 1.0,图标透明度|
|`icon-color`|String字符串|图标颜色,颜色举例：`#ff0`，`#ffff00`,`rgb(255, 255, 0)`,`rgba(255, 255, 0, 1)`,`hsl(100, 50%, 50%)`,`hsla(100, 50%, 50%, 1)`,`yellow`|
|`icon-halo-color`|String字符串|图标光晕颜色,颜色举例：`#ff0`，`#ffff00`,`rgb(255, 255, 0)`,`rgba(255, 255, 0, 1)`,`hsl(100, 50%, 50%)`,`hsla(100, 50%, 50%, 1)`,`yellow`|
|`icon-halo-width`|Number数字型| 2, 图标光晕宽度|
|`icon-halo-blur`|Number数字型| 1, 图标光晕模糊度|
|icon-translate|Number数组型|[x,y]表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上|
|||**Text参数**|
|`text-opacity`|Number数字型| 1.0, 文字透明度|
|`text-color`|String字符串|文字颜色,颜色举例：`#ff0`，`#ffff00`,`rgb(255, 255, 0)`,`rgba(255, 255, 0, 1)`,`hsl(100, 50%, 50%)`,`hsla(100, 50%, 50%, 1)`,`yellow`|
|`text-halo-color`|String字符串|文字光晕颜色,颜色举例：`#ff0`，`#ffff00`,`rgb(255, 255, 0)`,`rgba(255, 255, 0, 1)`,`hsl(100, 50%, 50%)`,`hsla(100, 50%, 50%, 1)`,`yellow`|
|`text-halo-width`|Number数字型| 2,文字光晕宽度|
|`text-halo-blur`|Number数字型| 1, 文字光晕模糊度，这里的数值要`小于`上面`text-halo-width`的宽度|
|text-translate|Number数组型|[x,y]表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上|


---
#### Sprite 样式库

**基本导入**

``` javascript
var map = new mapboxgl.Map({
  style: {
    "version": 8,
    //特别注意，这里是用的mapbox官方的，中地内部的请参考中地glyphs
    "glyphs":   "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    //特别注意，这里是用的mapbox官方的，中地内部的请参考中地sprite
    "sprite": "mapbox://sprites/mapbox/bright-v8"
  },
});
```


![样式库图片](./sprite.png)
[官方样式png](https://api.mapbox.com/styles/v1/mapbox/streets-v8/sprite.png?access_token=pk.eyJ1IjoicGFybmRlZWRsaXQiLCJhIjoiY2o1MjBtYTRuMDhpaTMzbXhpdjd3YzhjdCJ9.sCoubaHF9-nhGTA-sgz0sA)以及[官方样式json](https://api.mapbox.com/styles/v1/mapbox/streets-v8/sprite.json?access_token=pk.eyJ1IjoicGFybmRlZWRsaXQiLCJhIjoiY2o1MjBtYTRuMDhpaTMzbXhpdjd3YzhjdCJ9.sCoubaHF9-nhGTA-sgz0sA)

> Sprite 样式库将将所有的符号排列在一张图片上，然后更具每个字符`airport-15`的映射找到对应的符号在整个图片的起始位置和宽高

~~~ json
airport-15: {
  width: 17,   //宽为17
  height: 17,  //高为17
  x: 45,       //在大图中的水平位置是45
  y: 37,       //在大图中的竖直位置是37
  pixelRatio: 1,//像素角度，使效果先对圆润
  visible: true
}
~~~



[官方样式库地址](https://api.mapbox.com/styles/v1/mapbox/bright-v8/sprite.json?access_token=pk.eyJ1IjoicGFybmRlZWRsaXQiLCJhIjoiY2o1MjBtYTRuMDhpaTMzbXhpdjd3YzhjdCJ9.sCoubaHF9-nhGTA-sgz0sA)

~~~ json
{
    airport-15: {
      width: 17,
      height: 17,
      x: 45,
      y: 37,
      pixelRatio: 1,
      visible: true
    }
    alcohol-shop-11: {
      width: 13,
      height: 13,
      x: 204,
      y: 124,
      pixelRatio: 1,
      visible: true
    }
    alcohol-shop-15: {
      width: 17,
      height: 17,
      x: 50,
      y: 55,
      pixelRatio: 1,
      visible: true
    }
}
~~~

---
#### 自己生成样式库
请参考[Sprite样式库](https://www.mapbox.com/mapbox-gl-js/style-spec#sprite)和[生成工具](https://github.com/mapbox/spritezero-cli)
