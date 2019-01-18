### 新版天地图需要key

> [Key地址](http://lbs.tianditu.gov.cn/)


### mapboxgl中国2000坐标系支持

> 这里请注意，这里的mapboxgl与github上有点不同，这里的是特别编译的版本主要针对经纬度投影使用。

``` js
<script exclude="mapboxgl" include="crs" src="../../libs/zondyclient/include-mapboxgl-local.js"></script>
```

#### 注意事项

> `exclude`="mapboxgl" ~~~排除~~~ 默认加载的github上的**官方的mapboxgl**

> `include`="crs" **引入** 特别编译的**mapboxgl**