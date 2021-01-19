# Vue 路由问题

> 由于中地数码-Cesium在销毁的时候需要考虑多线程问题以及卸载WebGL不能即刻销毁的原因，因此如果需要切换cesium视图的时候需要将cesium组件保活处理。

1. 路由切换,导致Cesium视图创建/销毁
2. v-if/v-show切换,导致 Cesium视图创建/销毁

核心解决方案如下： `keep-alive`
``` javascript
<template>
  <div class="mp-map-container">
    <mapbox-view
      v-show="render2D"
      :page-height="pageHeight"
      :document="document"
      :map-style="style"
      v-bind="mapOptions"
    />
    <keep-alive>
      <cesium-view
        v-show="!render2D"
        :page-height="pageHeight"
        :document="document"
        :map-style="style"
        :lib-path="cesiumLibPath"
        :plugin-path="cesiumPluginPath"
        v-bind="mapOptions"
      />
    </keep-alive>
  </div>
</template>
```

