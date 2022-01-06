# 0. wmts - 教程

[标准的 WMTS 元数据](http://develop.smaryun.com:6163/igs/rest/ogc/SAMPLETILE/WMTSServer)

![说明](./static/demo/cesium/helper/ogc/wmts/gettile.png)

## 1. restful 调用 - 使用受限

> `restful调用`的核心是将所有的 级别 行列 图层 样式 的参数统一明码的标记在 url 请求中
> 使用这种方式 级别 行列号 都一定是`数字型` 这里很关键 , 常见的金字塔模型里面的级别 都`一般是整数表示`。

```js
var tianditu = new Cesium.WebMapTileServiceImageryProvider({
    url: 'http://t0.tianditu.com/DataServer?T=vec_w&L={TileMatrix}&Y={TileRow}&X={TileCol}&tk=9c157e9585486c02edf817d2ecbc7752',
    maximumLevel: 19,
    credit: new Cesium.Credit('3857')
});
webGlobe.viewer.imageryLayers.addImageryProvider(tianditu);
```

![restful](./static/demo/cesium/helper/ogc/wmts/restful.png)

> 这一种是最常见的 WMTS 加载方式， 但这种方式一般只能处理全球裁瓦片的方式： 如经纬度 EPSG:4326/4490/4610 或者墨卡托 EPSG:3857

## 2. kvp - 推荐使用

> restful 调用 一般处理数值型的 全球金字塔瓦片， kvp 一般处理高斯 或者 局部裁剪的金字塔瓦片

### 2.1 kvp 参数说明

| 参数                 | 类型          | OGC-名称                  | 图片说明                                                             |
| :------------------- | :------------ | :------------------------ | :------------------------------------------------------------------- |
| layer                | 字符串        | Layer                     | ![图层](./static/demo/cesium/helper/ogc/wmts/layer.png)              |
| style                | 字符串        | Style                     | ![样式](./static/demo/cesium/helper/ogc/wmts/style-type.png)         |
| format               | 字符串        | Format                    | ![样式](./static/demo/cesium/helper/ogc/wmts/wmts-format.png)        |
| tileMatrixLabels     | Array<字符串> | ArrayM<TileMatrix 的名称> | ![级别](./static/demo/cesium/helper/ogc/wmts/tilematrixset.png)      |
| layertileMatrixSetID | 字符串        | TileMatrixSet             | ![总称](./static/demo/cesium/helper/ogc/wmts/tilematrixset-name.png) |

> 用通俗的话说
>
> 1. `TileMatrix`对应瓦片的某一级
> 1. `TileMatrixSet` 对应多个级别合并成的金字塔集合，
> 1. `TileMatrixLabels` 对应各个级别的称呼（一般是整数，特定情况是`字符串型`）
> 1. `layertileMatrixSetID` 对应整个金字塔的模型的名称

`tileMatrixLabels` 一般 restful 的金字塔级别都是数值型。 但是一些特定的投影方式或者坐标处理方式无法采取对应的整数级别来表示，需要一长串的字符型来具体表达对应的数据细节，因此这个地方就是来替代原来的整数级别。

如传统的 [0 , 1, 2, 3 , 4] 替换成 ['EPSG:2379_SAMPLETILE_dpi96_GB:11', EPSG:2379_SAMPLETILE_dpi96_GB:12', 'EPSG:2379_SAMPLETILE_dpi96_GB:13', 'EPSG:2379_SAMPLETILE_dpi96_GB:14']

上面的 EPSG:2379_SAMPLETILE_dpi96_GB:11 的名字命名不重要，关键的是对应的自定义裁图的方式，如果此处是 EPSG:3857_SAMPLETILE_dpi96_GB:0 几乎等效于 墨卡托的 0 级。

### 2.2 kvp 举例说明

原始数据是高斯投影的 ，其元数据信息如下：
![gauss](./static/demo/cesium/helper/ogc/wmts/2397.png)

对应的 wmts 的描述如下：
![原始瓦片](./static/demo/cesium/helper/ogc/wmts/origin-data.png)

```js
var lnglat = new Cesium.WebMapTileServiceImageryProvider({
    url: 'http://develop.smaryun.com:6163/igs/rest/ogc/SAMPLETILE/WMTSServer',
    layer: 'SAMPLETILE',
    style: 'default',
    format: 'image/png',
    tilingScheme: new Cesium.WebMercatorTilingScheme(),
    tileMatrixLabels: [
        'EPSG:2379_SAMPLETILE_dpi96_GB:11',
        'EPSG:2379_SAMPLETILE_dpi96_GB:12',
        'EPSG:2379_SAMPLETILE_dpi96_GB:13',
        'EPSG:2379_SAMPLETILE_dpi96_GB:14',
        'EPSG:2379_SAMPLETILE_dpi96_GB:15',
        'EPSG:2379_SAMPLETILE_dpi96_GB:16',
        'EPSG:2379_SAMPLETILE_dpi96_GB:17'
    ],
    tileMatrixSetID: 'GoogleMapsCompatible_GB',
    maximumLevel: 19,
    credit: new Cesium.Credit('3857')
});
```

结果如下：
![kvp](./static/demo/cesium/helper/ogc/wmts/wmts-kvp.png)

## 3. WMTS 元数据信息不可信！！

与其说 WMTS 元数据信息不可信，本质上是说实际线下实操人员的操作不可信。以上面为例

> 原始数据明明只有 1 种 高斯的处理方式
> ![原始数据](./static/demo/cesium/helper/ogc/wmts/origin-data.png)
> 但是元数据信息描述里面的矩阵集居然有 2 类，其中一类是全球墨卡托， Orz....
> ![错误描述](./static/demo/cesium/helper/ogc/wmts/error-info.png)

### 3.1 出现过该场景的情况

> 从下面数据情况几乎可以得出结论，无法避免不同平台不同版本带来的差异， `强烈推荐`使用`KVP`的方式`手动匹配`来统一处理，而不是自动解析 WMTS.xml 的元数据信息

1. MapGIS 平台官方测试数据 [MapGIS 10.3 & OGC 1.0.0](http://develop.smaryun.com:6163/igs/rest/ogc/SAMPLETILE/WMTSServer)
1. MapGIS 九州官方测试数据 [MapGIS 10.5 & OGC 1.0.0]()
1. ArcGIS 官方测试数据 [ArcServer 10.8 & OGC 1.0.0](https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/1.0.0/WMTSCapabilities.xml)
1. ArcGIS 官方测试数据 [ArcServer 10.7 OGC 1.0.0](http://219.142.81.85/arcgis/rest/services/10wanZH/MapServer/WMTS/1.0.0/WMTSCapabilities.xml)
1. 西安测绘总站 ArcMap 10.2 & OGC 1.0.0
1. 北京发改委 ArcMap 10.5 & OGC 1.0.0
1. 深圳信息中心 ArcMap 10.6 & OGC 1.3.0
1. 深圳工程中心 ArcMap 10.6 & OGC 1.3.0
1. 深圳规划中心 ArcMap 10.6 & OGC 1.3.0
1. 地矿云南项目 MapGIS 10.3 & OGC 1.0.0
