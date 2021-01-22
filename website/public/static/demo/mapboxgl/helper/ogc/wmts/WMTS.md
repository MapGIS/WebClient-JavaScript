# 0. wmts - 教程

[标准的 WMTS 元数据](http://develop.smaryun.com:6163/igs/rest/ogc/beijing/WMTSServer)

![说明](./static/demo/mapboxgl/helper/ogc/wmts/gettile.png)

## 1. restful 调用 - 使用受限

> `restful调用`的核心是将所有的 级别 行列 图层 样式 的参数统一明码的标记在 url 请求中
> 使用这种方式 级别 行列号 都一定是`数字型` 这里很关键 , 常见的金字塔模型里面的级别 都`一般是整数表示`。

```js
map.addLayer({
    id: 'wmts-layer',
    type: 'raster',
    source: {
        type: 'raster',
        tiles: [
            `${protocol}://${ip}:${port}/igs/rest/ogc/beijing/WMTSServer?` +
                'service=WMTS' +
                '&request=GetTile' +
                '&version=1.0.0' +
                '&style=default' +
                '&tilematrixSet=EPSG:4326_北京市_arcgis_GB' +
                '&format=image/png' +
                '&layer=beijing' +
                '&tilematrix={z}' +
                '&tilerow={y}' +
                '&tilecol={x}'
        ],
        tileSize: 256,
        mapgisOffset: -1 // 请看下面的3. 错级瓦片
    },
    paint: {}
});
```

### 1.1 参数说明

| 参数          | 类型   | OGC-名称      | 图片说明                                                             |
| :------------ | :----- | :------------ | :------------------------------------------------------------------- |
| layer         | 字符串 | Layer         | ![图层](./static/demo/mapboxgl/helper/ogc/wmts/layer.png)              |
| style         | 字符串 | Style         | ![样式](./static/demo/mapboxgl/helper/ogc/wmts/style-type.png)         |
| format        | 字符串 | Format        | ![样式](./static/demo/mapboxgl/helper/ogc/wmts/wmts-format.png)        |
| tilematrixSet | 字符串 | TileMatrixSet | ![总称](./static/demo/mapboxgl/helper/ogc/wmts/tilematrixset-name.png) |

![restful](./static/demo/mapboxgl/helper/ogc/wmts/restful.png)

> 这一种是最常见的 WMTS 加载方式， 但这种方式一般只能处理全球裁瓦片的方式： 如经纬度 EPSG:4326/4490/4610 或者墨卡托 EPSG:3857

## 2. kvp

> 目前 mapboxgl 不支持 kvp 方式调用，如有需求请提交 [Github-Issues](https://github.com/MapGIS/WebClient-JavaScript/issues/new)

## 3. 错级瓦片

> 虽然目前不提供 KVP 的传参方式，但是仍然有额外的方式处理 错级瓦片 如初始级为 0 / 1 / -1 等情况。

```javascript
map.addLayer({
    id: 'wmts-layer',
    type: 'raster',
    source: {
        type: 'raster',
        tiles: [`${protocol}://${ip}:${port}/igs/rest/mrms/tile/EPSG_4326_WORLD_TILE/{z}/{y}/{x}`],
        tileSize: 256,
        mapgisOffset: -1 // 通过设置级别的偏移实现对应的偏移
    }
});
```

结果如下所示： 
[在线链接](/#/demo/mapboxgl/mapgis-igserver/map/mapgisoffset)

![offset](./static/demo/mapboxgl/helper/ogc/wmts/offset.png)
