# Vue组件引入
> 由于 Cesium 本身就存在纹理/多线程等重框架，导致无法像 leaflet/openalers 一样简单的独立引用，因此很容易导致引入失败

[官方解决方案-强烈不推荐-除非你使用纯开源版本Cesium](https://cesium.com/docs/tutorials/cesium-and-webpack/);

> 由于 cesium 本身`涉及大量的纹理材质以及多线程Worker`， 公司内部修改版实现`M3D格式`， M3D`不是`3dtile，是中地数码自己独特的格式，与开源的 3dtile 不是一种格式。很多高级分析功能`只能作用于M3D`,而不支持 3d tile.

webclient-vue-cesium 支持一层封装，除了本身需要安装以外，你还需要拷贝@mapgis/cesium

## 源问题
如果使用`淘宝源`，则导致下载的@mapgis/cesium很容易是1.0.0或者较低的版本.通过npm的淘宝镜像源下载的@mapgis/cesium库存在版本偏差问题，例如当前最新版本为1.59.0，使用淘宝镜像源下载的最新的版本只有1.0.0，可以关掉淘宝镜再行下载。
目前最新的公网版本是 [NPM-Verison](https://www.npmjs.com/package/@mapgis/cesium?activeTab=versions)
![代码结构](./static/demo/cesium/helper/vue/import/version.png)

```bash
# 不同时安装@mapgis/cesium的原因在于这个对外的是非高级版本，事业部一般全内部使用高级版本开发
npm install --save @mapgis/webclient-vue-cesium
```
> 要实现 cesium 主体的引入，一定要看下面的`文件拷贝`章节, 光是@mapgis/webclient-vue-cesium 是无法正常开发的 Orz...

## 文件拷贝

由于标准的 Cesium 在支持 Webpack 编译的时候也是采取的 copy 插件来执行对应的文件夹拷贝操作。 因此为了统一处理，这里`统一不采取`手动修改 webpack.config 的方式，而是将 cesium 的所有文件放在 public 或者 asset 的某个目录下，自己`手动实现`静态资料的拷贝

> 这样做的本质原因是，MapGIS 的高级版本的 Cesium 是只对内不对外提供，导致不同事业部的 Cesium 版本各不一致

以`@mapgis/cesium`的包结构展示如下：
![代码结构](./static/demo/cesium/helper/vue/import/cesium_dist.png)

> 请将上述文件统一拷贝到你的 vue 工程对应的 public 文件夹下的某个目录中，记录对应的路径为

```sh
# quasar 的静态资源目录为src/static
# 常见的静态资源目录为 public
# 主Cesium主体路径
path/to/statics/cesium/Cesium.js
# Cesium拓展插件路径
path/to/statics/cesium/webclient-cesium-plugins.min.js
```

> 如果在浏览器中 访问 `http://localhost:xxxx/path/to/statics/cesium/Cesium.js` 成功则说明整个 Cesium 的环境准备已经完毕。

## 引入

### 全局引入
在main.js中实现以下代码
``` javascript
import VueCesium from '@mapgis/webclient-vue-cesium';
vue.use(VueCesium);
```

### 局部引入
``` javascript
import { MapgisWebScene } from '@mapgis/webclient-vue-cesium';

export default {
  components: {
    MapgisWebScene
  },
}
```

## 开发结构

> 强烈建议使用前了解基本的cesium引导[Cesium - 向导](https://cesium.com/docs/) 以及 cesium 的开发方式[cesium - API](https://cesium.com/docs/cesiumjs-ref-doc/)

如果你使用的地形是 cesium 提供的地形, 需要设置[Cesium ion](https://cesium.com/docs/oauth/). 更多细节请查看[Ion](https://cesium.com/ion).

如果你使用`MapGIS-IGServer`提供的地形数据，你可以忽略该参数

上一章节文件`拷贝目录`中的2个路径，这里初始化的时候就需要传入`libPath`以及`pluginPath` 如果不传入则从司马云上自动下载对应的网络地址，没有互联网则无法下载

``` sh
# quasar 的静态资源目录为src/static
# 常见的静态资源目录为 public
# 主Cesium主体路径 对应 libPath
path/to/statics/cesium/Cesium.js
# Cesium拓展插件路径 对应 pluginPath
path/to/statics/cesium/webclient-cesium-plugin.min.js
```

``` javascript
<template>
  <mapgis-web-scene
    libPath="statics/cesium/Cesium.js"
    pluginPath="statics/cesium/webclient-cesium-plugin.min.js"
    @load="handleLoad"
  />
</template>

<style lang="css">
.main {
  height: 600px;
  width: 100%;
}
</style>

<script>
import { MapgisWebScene } from '@mapgis/webclient-vue-cesium';

export default {
  components: {
    MapgisWebScene
  },
  methods: {
    handleLoad(payload) {
      const { webGlobe, Cesium } = payload;
      this.map = webGlobe;
      this.Cesium = Cesium;
    }
  }
};
</script>
```



