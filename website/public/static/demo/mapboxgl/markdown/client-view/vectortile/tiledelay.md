# 瓦片延申显示
> 实际在生产瓦片的时候无法一次性生产大数据大范围下的瓦片，尤其是16级以后的瓦片，因此可以利用mapboxgl延申瓦片的特性减少瓦片的裁剪
> 
> mapboxgl最大的精度为向后延申4级  默认extent `4096  = 256 * 2^4`
> 
> 只需将图层的"maxzoom": level + 4, //往后延申设置4级为8级

## 桌面生产
![默认裁剪级别](../../static/demo/mapboxgl/helper/vectortile/delay/默认裁剪级别.png)

## 前端修改样式
``` json
{
    "version": 8,
    "name": "世界行政区 Style",
    "sources": {
        "世界行政区": {
        "type": "vector",
        "tiles": [
            "http://develop.smaryun.com:6163/igs/rest/mrms/tile/世界行政区/{z}/{y}/{x}?type=cpbf"
        ],
        "minZoom": 0,
        "maxZoom": 4
        }
    },
    "sprite": "http://develop.smaryun.com:6163/igs/rest/mrms/vtiles/sprite",
    "glyphs": "http://develop.smaryun.com:6163/igs/rest/mrms/vtiles/fonts/{fontstack}/{range}.pbf",
    "layers": [
        {
        "id": "背景",
        "type": "background",
        "paint": {
            "background-color": "rgba(247, 247, 247, 1)"
        }
        },
        {
        "id": "世界海洋",
        "type": "fill",
        "source": "世界行政区",
        "source-layer": "世界海洋",
        "minzoom": 0,
        "maxzoom": 4,
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(221, 92, 92, 1)",
            "fill-color": "rgba(241, 109, 122, 1)"
        }
        },
        {
        "id": "世界行政区",
        "type": "fill",
        "source": "世界行政区",
        "source-layer": "世界行政区",
        "minzoom": 0,
        "maxzoom": 4,
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(221, 92, 92, 1)",
            "fill-color": "rgba(184, 241, 237, 1)"
        }
        },
        {
        "id": "中国",
        "type": "fill",
        "source": "世界行政区",
        "source-layer": "中国",
        "minzoom": 0,
        "maxzoom": 8, //往后延申设置4级为8级
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(221, 92, 92, 1)",
            "fill-color": "rgba(225, 98, 47, 1)"
        }
        }
    ],
    "id": "世界行政区-id",
    "crs": null,
    "path": "D:\\平台二次开发部门资源\\阿里云服务器数据\\new\\webClient\\世界行政区\\世界行政区"
}
```