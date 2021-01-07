# Markers 以及 Popups

## Marker

Marker组件主要是封装了 [Mapbox GL Marker API](https://docs.mapbox.com/mapbox-gl-js/api/#marker).

```vue
<template>
  <mapbox-map
    :accessToken="mapboxAccessToken"
    :mapStyle.sync="mapStyle"
    :center="coordinates"
  >
    <mapbox-marker :coordinates="coordinates" color="blue" />
  </mapbox-map>
</template>

<script>
import { MapboxMap, MapboxMarker } from "@mapgis/webclient-vue-mapboxgl";

export default {
  components: {
    MapboxMap,
    MapboxMarker
  },
  data() {
    return {
      mapStyle: "mapbox://styles/mapbox/basic-v10",
      coordinates: [-111.549668, 39.014]
    };
  }
};
</script>
```

### Props

- `color {String}` 设置默认的颜色 (当使用`marker` slot时不生效)
- `coordinates {Array}` GeoJSON格式的coordinates部分, 用于标注位置
- `offset {Object, Array}` 相对显示位置的偏移

完整的参数请看 [API](/zh/api/marker.md#props)

### 插槽
Marker组件有2中插槽： `marker` 插槽和用于Marker上popup的 `默认` 插槽

#### The `marker` slot

marker插槽 `marker` 可以自定义marker的内部html样式. 请参考 [IconFont](https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.16&helptype=code) 替代默认的icon图形:

```vue
<template>
  <mapbox-map
    :accessToken="mapboxAccessToken"
    :mapStyle.sync="mapStyle"
    :center="coordinates"
  >
    <mapbox-marker :coordinates="coordinates">
      <iconfont slot="marker">mdi-map-marker</iconfont>
    </mapbox-marker>
  </mapbox-map>
</template>

<script>
import { MapboxMap, MapboxMarker } from "@mapgis/webclient-vue-mapboxgl";

export default {
  components: {
    MapboxMap,
    MapboxMarker
  },

  data() {
    return {
      mapStyle: "mapbox://styles/mapbox/basic-v10",
      coordinates: [-111.549668, 39.014]
    };
  }
};
</script>
```

``` vue
<template >
  <div class="iconfont-wrapper">
    <svg v-if="iconId" class="icon" aria-hidden="true" @click="click()">
      <use :xlink:href="iconId" />
    </svg>
    <div class="iconfont-text" v-if="name">{{ name }}</div>
    <div class="iconfont-text-none" v-else />
  </div>
</template>

<script>
import "./iconfont.js";

export default {
  name: "iconfont",
  props: {
    type: {
      type: String,
      default: ""
    },
    name: String
  },
  computed: {
    iconId() {
      return this.type ? `#${this.type}` : "";
    }
  },
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>
<style lang="scss">
.iconfont-wrapper {
  display: inline;

  .icon {
    width: 1.15em;
    height: 1.15em;
    vertical-align: -0.25em;
    line-height: 16px;
    fill: currentColor;
    overflow: hidden;
  }

  .iconfont-text {
    display: inline;
    margin-left: 12px;
    // line-height: 12px;
    font-size: 14px;
  }

  .iconfont-text-none {
    display: none;
    margin-left: 12px;
    // line-height: 12px;
    font-size: 14px;
  }
}
</style>
```


### 默认插槽
默认的插槽允许定制 当点击一个Marker后弹出的Popup的样式。请看 [Markder&Popups](#MarkersPopups)

## Popup

Popup组件是对[Mapbox GL Popup API](https://docs.mapbox.com/mapbox-gl-js/api/#popup)的封装.
你可以直接HTML或者Vue组件设置popup的内部的样式.

如下所示 [Element-Card](https://element.eleme.cn/#/zh-CN/component/card) 作为内容:

```vue
<template>
  <mapbox-map
    :accessToken="mapboxAccessToken"
    :mapStyle.sync="mapStyle"
    :center="coordinates"
  >
    <mapbox-popup :coordinates="coordinates" anchor="top">
      <el-card class="box-card"> <div>Hello, I'm popup!</div> </el-card>
    </mapbox-popup>
  </mapbox-map>
</template>

<script>
import { MapboxMap, MapboxPopup } from "@mapgis/webclient-vue-mapboxgl";

export default {
  components: {
    MapboxMap,
    MapboxPopup
  },
  data() {
    return {
      mapStyle: "mapbox://styles/mapbox/basic-v10",
      coordinates: [-111.549668, 39.014]
    };
  }
};
</script>
```

如果你设置 `onlyText` 属性为 `true`, 内容被统一当做文本处理. 一般用于从一个不信任的数据源获取对应的显示html内容，防止注入。

通常Popup被添加到地图上是默认隐藏的，如果你想加载的时候立即展示，你需要设置`showed` 属性为 `true`。

### Props

- `showed {Boolean}` 如果是 `true`, 在组件创建后会立即显示。

- `closeButton {Boolean}` 如果 `true`, 右上角出现关闭按钮。

- `closeOnClick {Boolean}` 如果 `true`, 当点击地图的时候，该popup会消失。

- `coordinates {Array}` GeoJSON格式的coordinates参数.如果popup用于markder内部忽略该参数，使用marker的位置。

- `anchor {string}` 指定了popup出现的位置是在设置的那个方位。

完整的参数列表请看 [API](/zh/api/popup.md#props)

## MarkersPopups

Popup通常使用内部的地图注记Marker. 你可以将Popup组件作为子组件内嵌在Marker组件中。

```vue
<template>
  <mapbox-map
    :accessToken="mapboxAccessToken"
    :mapStyle.sync="mapStyle"
    :center="coordinates"
  >
    <mapbox-marker :coordinates="coordinates">
      <mapbox-popup>
        <el-card>
          <div>Hello, I'm popup!</div>
        </el-card>
      </mapbox-popup>
    </mapbox-marker>
  </mapbox-marker>
</template>

<script>
import { MapboxMap, MapboxPopup, MapboxMarker } from "@mapgis/webclient-vue-mapboxgl";

export default {
  components: {
    MapboxMap,
    MapboxMarker,
    MapboxPopup
  },

  data() {
    return {
      mapStyle: "mapbox://styles/mapbox/basic-v10",
      coordinates: [-111.549668, 39.014]
    };
  }
};
</script>
```
在该场景下，Popup会自动的挂载到Marker上。你可以使用`togglePopup`方法控制popup的可见与不可见。

> 在该场景下, Popup的 `coordinates`属性会被忽略

