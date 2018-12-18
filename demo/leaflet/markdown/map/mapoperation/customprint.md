### 自定义范围打印输出
> `说明:`只要map.getContainer()里有的图层都支持，包括标注、绘制的图层等。
> 图框、标题、左下角文字、右下角文字必须在有输出版面参数的前提下，才能添加

```javascript
//关键代码:
//width和height为必须参数，其他参数为可选参数(扩展参数)
domtoimage.toPng(map.getContainer(), {
    width: mapParams.width,//输出地图内容的宽
    height: mapParams.height,//输出地图内容的高
    startPointX: mapParams.startPointX,//输出地图内容左上角x像素坐标
    startPointY: mapParams.startPointY,//输出地图内容左上角y像素坐标
    layParams: layParams,//输出版面参数
    mapFrameStyleParams: mapFrameStyleParams,//图框参数
    titleParams: titleParams,//标题参数
    leftTextParams: leftTextParams,//左下角文字参数
    rightTextParams: rightTextParams//右下角文字参数
    }).then(function (dataUrl) {
        var blob = _dataURItoBlob(dataUrl);
        saveAs(blob, 'map.png');
    });
```