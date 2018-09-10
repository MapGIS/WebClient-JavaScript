### Leaflet.Icon.Glyph
> 此脚本允许将字体图标添加进leaflet标记中。与其他标记插件不同的是，不需要任何CSS设置，可以使用任何`bootstrap-style`的图标字体。

#### 用法说明
##### 代码：
**注：** 用不同的字体图标需要引入相应的css类。
```javascript
var marker = L.marker(latlng, {
	icon: L.icon.glyph({
		prefix: 'mdi',
		glyph: 'package'
	})
});
```
如果想要显示一个正常的字体（例如“WH”）,可以将`prefix`设置为空。
```javascript
var marker = L.marker(latlng, {
	icon: L.icon.glyph({
		prefix: '',
		glyph: 'WH'
	})
});
```

#### Options
> L.Icon.Glyph脚本实例支持L.Icon的选项。

|   option   |   类型   |    描述   |
|:----------:|:---------|
|  className |String|类似于[L.DivIcon](http://leafletjs.com/reference-1.3.0.html#divicon)中的`className`选项。|
|  prefix |String|用于所有字形的CSS类，每个字形名称的前缀。|
|  glyph |String|字形名称。|
|  glyphColor |String|字形颜色，值可以是任何具有CSS颜色定义的字符串。|
|  glyphSize |String|字形的大小，以像素为单位。|
|  glyphAnchor |Array|字形中心相对于图标中心的位置。|
|  bgPos |Array|类似于[L.DivIcon](http://leafletjs.com/reference-1.3.0.html#divicon)中的`bgPos`选项。|
|  bgSize |Array|强制背景图像的大小，在视网膜模式下使用。|

#### 子类
如果您广泛使用一组字体图标或自定义图标图像，则可以将L.Icon.Glyph拓展到自己的图标类中：

```javascript
L.Icon.Glyph.MDI = L.Icon.Glyph.extend({     //拓展L.Icon.Glyph
	options: {
		prefix: 'mdi',
		iconUrl: '/path/to/your/icon/image.png',
		iconSize: [30, 50]
	}
});

// Factory
L.icon.glyph.mdi = function(options) {       //构造函数
    return new L.Icon.Glyph.MDI(options); 
};
var marker = L.marker(latlng, {
	icon: L.icon.glyph.mdi({ glyph: 'package' })     //调用选项
});
```

