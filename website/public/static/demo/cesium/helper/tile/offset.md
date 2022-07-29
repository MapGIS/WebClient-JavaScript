# 错级问题

## 问题现象
> 原本请求瓦片  {z}/{x}/{y} 可以请求到瓦片数据， 实际请求的是  {z`+`1}/{x}/{y} 或者 {z`-`1}/{x}/{y} 

## 问题原因
1. 10.3版本以前平台裁剪瓦片起始级别为1，10.3版本`以前`igserver起始级别也为1
2. 10.3版本以前平台裁剪瓦片起始级别为1，10.3版本`以后`igserver起始级别为0
![destop](./static/demo/cesium/helper/tile/destop.png)
![igserver](./static/demo/cesium/helper/tile/igserver.png)
![wmts](./static/demo/cesium/helper/tile/wmts.png)

## 如何产生类似问题
1. 如果出现了是10.3版本平台裁剪的瓦片结果发布再新的igs版本上就会出现对应的问题
2. 从三方爬取的瓦片（天地图、谷歌、百度）,加载显示在mapgis后裁图，此时对应的是mapgis自定义裁图方式

## 如何避免
1. 请用版本匹配的平台和igserver进行统一处理
2. 如果使用网上爬取的瓦片，请通过WMTS的方式进行瓦片显示

## 计算错级

### js形式
``` js
import { Util } from "@mapgis/webclient-es6-service";
const { TileInfo } = Util;
let tileinfo = new TileInfo();
let zoomOffset = await tileinfo.getZoomOffset(
    "WMTS",
    "localhost",
    "6163",
    "东城区_瓦片_MAPGIS",
);
var tileMatrixLabels = Array.from(
{ length: 20 },
(v, k) => `EPSG:4326_东城区_瓦片_MAPGIS_dpi96_GB:${k + zoomOffset}`
);
// tileMatrixLabels就是计算纠偏后的正确的级别
```

### Vue组件形式
``` html
<template>
  <mapgis-web-scene
    @load="onLoad"
    libPath="cesium/Cesium.js"
    pluginPath="cesium/webclient-cesium-plugin.min.js"
  >
    <mapgis-3d-ogc-wmts-layer
      v-if="tileMatrixLabels.length > 0"
      baseUrl="http://localhost:8089/igs/rest/services/东城区_瓦片_MAPGIS/WMTSServer"
      :options="{
        tileMatrixLabels: tileMatrixLabels,
      }"
      wmtsLayer="东城区_瓦片_MAPGIS"
      tileMatrixSet="EPSG:4326_东城区_瓦片_MAPGIS_028mm_GB"
      tilingScheme="EPSG:4326"
    />
  </mapgis-web-scene>
</template>
<script>
import { Util } from "@mapgis/webclient-es6-service";
const { TileInfo } = Util;

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
        tileMatrixLabels: []
    }
  },
  methods: {
    onLoad(payload) {
      this.getOffset();
    },
    async getOffset() {
      let tileinfo = new TileInfo();
      let zoomOffset = await tileinfo.getZoomOffset(
        "WMTS",
        "localhost",
        "6163",
        "东城区_瓦片_MAPGIS",
      );
      var tileMatrixLabels = Array.from(
        { length: 20 },
        (v, k) => `EPSG:4326_东城区_瓦片_MAPGIS_dpi96_GB:${k + zoomOffset}`
      );
      this.tileMatrixLabels = tileMatrixLabels;
      console.warn("zoomOffset", zoomOffset, tileMatrixLabels);
    },
  }
}
</script>
```
