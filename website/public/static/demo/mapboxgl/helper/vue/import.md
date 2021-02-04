# 快速上手

<img src="../../static/assets/logo/framework.png" alt="图片替换文本" width="1034" height="600" align="bottom" />

## ES6 方式

### 中地版本安装 `建议使用`

> 由于 mapbox 本身`不支持 EPSG：4326`， 公司内部修改版实现`支持 EPSG：4326, 4490, 4610 4214`

```bash
# 支持 4326的坐标系的使用方式
npm install --save @mapgis/webclient-vue-mapboxgl
# 或者
yarn add @mapgis/webclient-vue-mapboxgl
```

在 main.js 中加入样式文件

```js
import "@mapgis/mapbox-gl/dist/mapbox-gl.css";
```

## 浏览器使用

### 安装

添加 vue, mapbox-gl, 和 vue-mapbox 脚本到页面中

> 由于公司的 cdn 包不在公网上发布，统一在[司马云](/#/total/download)上获取，下面展示的是开源的脚本

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- ... -->
    <!-- Mapbox GL CSS -->
    <link
      href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css"
      rel="stylesheet"
    />
    <!-- Vue-mapbox CSS -->
    <link
      href="https://cdn.jsdelivr.net/npm/vue-mapbox@latest/dist/vue-mapbox.css"
      rel="stylesheet"
    />
    <!-- Mapbox GL JS -->
    <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js"></script>
    <!-- VueJS -->
    <script src="https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.min.js"></script>
    <!-- Vue-mapbox -->
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/vue-mapbox@latest/dist/vue-mapbox.min.js"
    ></script>
    <!-- ... -->
  </head>
</html>
```

所有的组件都是在 全局对象 VueMapbox 中， 如(`VueMapbox.MglMap` 等.)
