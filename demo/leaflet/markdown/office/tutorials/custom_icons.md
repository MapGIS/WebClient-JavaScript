## Markers with Custom Icons
在这个教程中，你将学会如何使用自定义的图标作为地图上的标注点。

#### 创建一个图标的方法：
通过`L.Icon`对象定义一个图标，在对象options中设置即可。代码如下：

```javascript
var greenIcon = L.icon({
    iconUrl: 'leaf-green.png',
    shadowUrl: 'leaf-shadow.png',
    iconSize:     [38, 95], // 图标的大小
    shadowSize:   [50, 64], // 图标影子的大小
    iconAnchor:   [22, 94], 
    shadowAnchor: [4, 62],  
    popupAnchor:  [-3, -76]
});
L.marker([31.5, 113.09], {icon: greenIcon}).addTo(map);
```

#### L.Icon()

|   Factory   |   Description   |
|:-----------|:----------------|
|L.icon(`<Icon options>` options)|使用给定的选项创建一个图标实例。|

#### Icon Options

|   Options   |   Type   |   Default   |   Description   |
|:-----------:|:--------:|:-----------:|:----------------|
|   iconUrl  |   String   |   null   |（必需）icon图标图像的URL（绝对或相对于您的脚本路径）。|
|   iconRetinaUrl  |  String  |   null   |用于Retina屏幕设备大尺寸版本的图标图像的URL（绝对或相对于您的脚本路径）。|
|   iconSize  |   Point   |   null   |icon图片的大小（单位：像素）。|
|   iconAnchor  |  Point   |   null   |图标的“指示地理位置的锚点”的坐标（相对于其左上角）。 以便图标显示准确位于标记的地理位置。 如果指定大小，则iconAnchor默认为图标中心点，也可以在带有负边距的CSS中设置。|
|  popupAnchor  |  Point   |   [0, 0]   |popup弹窗相对于图标的锚点“打开”的点的坐标。|
|tooltipAnchor |   Point  |   [0, 0]  |工具提示将相对于图标定位点“打开”的点的坐标。|
|   shadowUrl |   String  |   null   |图标阴影图像的URL。如果未指定，将不会创建阴影图像。|
|  shadowRetinaUrl  |  String   |  null   |用于Retina屏幕设备大尺寸版本的图标图像阴影图像的URL。如果未指定，将不会创建阴影图像。|
|   shadowSize |   Point   |  null  |阴影部分的图片大小（单位：像素）。|
|   shadowAnchor  |   Point   |   null   |阴影（相对于其左上角）的“提示”的坐标（与未指定的iconAnchor相同）。|
|  className  |  String   |  ''  |要分配给图标和阴影图像的自定义css类名称。默认为空。|

