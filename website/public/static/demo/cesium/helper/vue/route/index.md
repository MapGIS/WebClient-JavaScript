# Vue 路由问题

> 由于中地数码-Cesium在销毁的时候需要考虑多线程问题以及卸载WebGL不能即刻销毁的原因，因此如果需要切换cesium视图的时候需要将cesium组件保活处理。

常见情况：
> 二维和三维地图需要在同一页面上加载和切换展示时，只能用v-show来控制组件的显示与隐藏，同时需要用<keep-alive></keep-alive>来包裹三维地图组件，否则组件来回切换时，三维地球会加载不出来，出现空白。代码示例如下所示

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

