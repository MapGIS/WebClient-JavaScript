# 显示模糊

## `tileSize`
 - **类型:** `Number`
- **默认值:** `512`
- **描述:** 加载瓦片的大小，如果数据瓦片本身是256大小的设置512大小会被强制拉伸至512大小。

| 512                                                         | 256                                                         |
| :---------------------------------------------------------- | :---------------------------------------------------------- |
| ![512](./static/demo/mapboxgl/helper/tilesize/tile/512.png) | ![256](./static/demo/mapboxgl/helper/tilesize/tile/256.png) |

> tip 天地图模糊
>> 请传入tileSize为256即可，2种方式

``` js
//实例化要加载的source来源对象（世界矢量地图）
      var tianditu4326 = {
        type: "raster",
        tiles: [
          //来源请求地址，请求天地图提供的全球矢量地图WMTS服务
          "http://t" +
          Math.round(Math.random() * 7) +
          ".tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0" + 
          "&LAYER=img&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles" +
          "&TILECOL=" +
          "{x}" +
          "&TILEROW=" +
          "{y}" +
          "&TILEMATRIX=" +
          "{z}" +
          "&tk=" +
          tiandituKey,
        ],
        //栅格瓦片的分辨率
        tileSize: 256,
      };
      //实例化Map对象加载地图
      map = new mapboxgl.Map({
        crs: "EPSG:4326", //经纬度一定要设置crs参数
        maxBounds: [
          [-180, -90],
          [180, 90],
        ],
        //地图容器div的id
        container: "map",
        //设置地图样式信息
        style: {
          //设置版本号，一定要设置
          version: 8,
          //添加来源
          sources: {
            tianditu4326: tianditu4326,
          },
          //设置加载并显示来源的图层信息
          layers: [
            {
              //图层id，要保证唯一性
              id: "tianditu4326",
              //图层类型
              type: "raster",
              //连接图层来源
              source: "tianditu4326",
              //图层最小缩放级数
              minzoom: 0,
              //图层最大缩放级数
              maxzoom: 22,
            },
          ],
        },
        zoom: 7.5,
        center: [116.39, 40.20]
      });
```