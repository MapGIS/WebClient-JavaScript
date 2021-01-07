# 原因

旁边不是有一个例子专门讲解wmts吗? 为什么要再讲一次? 多此一举? 

`还不是我们公司的深圳项目的特殊情况特殊处理， 下面是怎么处理这类情况:`

1. 传统的标准的geoserver 官方的测试用例的wmts是正确的
   1. [OGC-WMTS测试ARCGIS-WMTS](https://services.arcgisonline.com/arcgis/rest/services/USA_Topo_Maps/MapServer/WMTS/1.0.0/WMTSCapabilities.xml) 
   2. 官方的测试用例是放开的了OGC-WMTS的跨域问题的，为了测试放开了跨域限制
   3. 按照WMTS-KVP的方式 打开该链接 
      1. ``` sh
            https://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/WMTS/?layer=Demographics_USA_Population_Density&style=default&tilematrixset=default028mm&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=5&TileCol=9&TileRow=12
         ``` 
      3. 预览图片如下 ![wmts-no-cors](static/demo/mapboxgl/markdown/vue/raster/wmts-no-cors.png)
   
2.  深圳信息中心的OGC-WMTS的做了跨域限制，只有在特定白名单的网址访问才能成功访问,`不要再问为什么报什么404 cors  400的问题了，都是一个本质原因`
    1. [深圳-WMTS测试ARCGIS-WMTS](http://219.142.81.85/arcgis/rest/services/10wanZH/MapServer/WMTS/1.0.0/WMTSCapabilities.xml) [深圳内网才能真正看到-用左边的网测在公网测试是一样的](http://suplicmap.pnr.sz/tilemap_1/rest/services/SZMAP/SZMAP_BASEMAP_ZW2K/MapServer/WMTS/1.0.0/WMTSCapabilities.xml)
    2. 内网沟通-跨域限制
    3. 按照WMTS-KVP的方式 打开该链接 
       ``` sh
       http://219.142.81.85/arcgis/rest/services/10wanZH/MapServer/WMTS/?layer=10wanZH&style=default&tilematrixset=default&Service=WMTS&
       ```
      1. Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3&TileCol=2&TileRow=1
      2. 发现无法预览图片如下 ![wmts-no-cors](static/demo/mapboxgl/markdown/vue/raster/wmts-cors.png)
      

> 难道你去和深圳信息中心的沟通让人家放开吗? 想想都不现实， 怎么处理呢?

`核心处理方式： 用ArcServer自身的 MapServer/tile/{z}/{y}/{x}`的方式替代WMTS

``` js
let url = 'http://219.142.81.85/arcgis/rest/services/10wanZH/`MapServer/tile/{z}/{y}/{x}?blankTile=false'
http://219.142.81.85/arcgis/rest/services/10wanZH/`MapServer/tile`/5/10/46?blankTile=false
```

1. 按照MapServer/tile 打开该链接 
    1. http://219.142.81.85/arcgis/rest/services/10wanZH/`MapServer/tile`/5/10/46?blankTile=false
    2. 预览如下所示 ![mapserver-tile](static/demo/mapboxgl/markdown/vue/raster/mapserver-tile.png)


2. 特别注意，使用了 Mapserver/tile的方式替代KVP后，由于不同版本的arcgis的4326的初始级不同 可能为0 可能为1，因此需要针对不同版本设置不同的zoom-offset / zoomOffset, `深圳信息中心`使用的是`10.6.1`，因此此处应该是 offset为-1
   1. 代码如下
      ``` js
        <mapbox-ogc-wmts-layer 
            v-bind:layer="layerWmts" 
            v-bind:layer-id="layerWmtsId" 
            v-bind:source-id="sourceWmtsId" 
            v-bind:url="wmtsurl"
            v-bind:zoom-offset="offset"
        >
        </mapbox-ogc-wmts-layer>
         new Vue({
            el: '#app',
            data() {
                return {
                    layerWmts: {},
                    layerWmtsId: 'ogcwmts_layerId',
                    sourceWmtsId: 'ogcwmts_sourceId',
                    wmtsurl: 'http://219.142.81.85/arcgis/rest/services/10wanZH/MapServer/tile/{z}/{y}/{x}',
                    offset: -1,  //这里一定不能去掉
                };
            }
         }
      ```