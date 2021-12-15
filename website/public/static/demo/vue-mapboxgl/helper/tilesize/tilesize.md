# 显示模糊

以下**栅格**瓦片类组件会触发该场景:
1. **mapgis-rastertile-layer**
2. **mapgis-ogc-wmts-layer**
3. **mapgis-igs-tile-layer**
4. **mapgis-igs-vector-layer**
5. **mapgis-arcgis-tile-layer**

## `tileSize`
 - **类型:** `Number`
- **默认值:** `512`
- **描述:** 加载瓦片的大小，如果数据瓦片本身是256大小的设置512大小会被强制拉伸至512大小。

| 512                                                         | 256                                                         |
| :---------------------------------------------------------- | :---------------------------------------------------------- |
| ![512](./static/demo/mapboxgl/helper/tilesize/tile/512.png) | ![256](./static/demo/mapboxgl/helper/tilesize/tile/256.png) |

# 天地图模糊
请传入tileSize为256即可，2种方式
``` vue
<mapgis-ogc-wmts-layer :tileSize="256" />
```
``` vue
<mapgis-ogc-wmts-layer :source="{'tileSize': 256}" />
```
:::

``` vue
<template>
  <div class="hello">
    <mapgis-web-map crs="EPSG:4326" :center="[107.19, 26.85]" :zoom="3">
      <mapgis-ogc-wmts-layer v-bind="tdt"> </mapgis-ogc-wmts-layer>
    </mapgis-web-map>
</template>
<script>
export default {
  data() {
    return {
      tdt: {
        tileSize: 256,
        baseUrl: "http://t0.tianditu.gov.cn/vec_c/wmts",
        wmtsLayer: "vec",
        tileMatrixSet: "c",
        format: "tiles",
        layerId: "ogcwmts_layerId",
        sourceId: "ogcwmts_sourceId",
        token: {
          key: "tk",
          value: "f5347cab4b28410a6e8ba5143e3d5a35",
        },
      },
    }
  }
};
</script>
```

## 示例

```vue
<template>
  <mapgis-web-map
    class="main"
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    :zoom="mapZoom"
    :center="outerCenter"
    :crs="mapCrs"
  >
    <mapgis-ogc-wmts-layer
      :layer-id="layerWmtsId"
      :source-id="sourceWmtsId"
      :base-url="baseUrl"
      :tile-matrix-set="tileMatrixSet"
      :wmts-layer="wmtsLayer"
      :zoom-offset="zoomoffset"
    >
    </mapgis-ogc-wmts-layer>
  </mapgis-web-map>
</template>

<script>
export default {
  data() {
    return {
      mapStyle: {
        //设置版本号，一定要设置
        version: 8,
        //添加来源
        sources: {},
        //设置加载并显示来源的图层信息
        layers: []
      }, // 地图样式
      mapZoom: 8, // 地图初始化级数
      outerCenter: [116.39, 40.2], // 地图显示中心
      mapCrs: "EPSG:4326",
      wmtsLayer: "beijing",
      layerWmtsId: "ogcwmts_layerId",
      sourceWmtsId: "ogcwmts_sourceId",
      tileMatrixSet: "EPSG:4326_北京市_arcgis_GB",
      baseUrl:
        "http://develop.smaryun.com:6163/igs/rest/ogc/beijing/WMTSServer",
      //因为司马云是用的老版本的igs服务，因此offset必须传-1
      zoomoffset: -1
    };
  },

  created() {
    // 在组件中使用mapbox-gl.js的脚本库功能
    this.mapbox = Mapbox;
  }
};
</script>

<style lang="css">
.main {
  height: 600px;
  width: 100%;
}
</style>
```
