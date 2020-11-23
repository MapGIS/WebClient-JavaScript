<template>
  <div class="download-wrapper">
    <!-- <br />
    <el-divider>
      <h2>All-in-One整合包</h2>
    </el-divider>
    <el-row>
      <el-tooltip
        class="item"
        effect="dark"
        content="百度网盘链接"
        placement="bottom"
      >
        <el-button type="primary">
          <a
            href=""
            target="_blank"
          >完整包</a>
        </el-button>
      </el-tooltip>
      <el-divider direction="vertical"></el-divider>
      <span>该包含有webclient主站点、四大脚本SDK、三方cdn以及离线数据</span>
    </el-row>
    <br />
    <el-row>
      <el-tooltip
        class="item"
        effect="dark"
        content="包含webclient主站点、四大脚本、三方cdn"
        placement="bottom"
      >
        <el-button type="info">
          <a
            href=""
            target="_blank"
          >精简包</a>
        </el-button>
      </el-tooltip>
      <el-divider direction="vertical"></el-divider>
      <span>该包含有webclient主站点、四大脚本SDK、三方cdn</span>
    </el-row> -->
    <br />
    <el-divider>
      <h2>SDK下载</h2>
    </el-divider>
    <el-row>
      <h4>在这里，可以下载到所有您需要的中地数码 WebClient 产品。</h4>
      <h2>10.3.5.10</h2>
      <el-row>
        <el-tooltip
          class="item"
          effect="dark"
          content="包含webclient主脚本以及三方cdn脚本"
          placement="bottom"
        >
          <el-button type="primary"><a
              href="/static/download/webclient-all.rar"
              download="webclient-all.rar"
            >完整包</a></el-button>
        </el-tooltip>
        <el-divider direction="vertical"></el-divider>
        <span>该包含有webclient四大主脚本以及所需的全部的三方cdn脚本</span>
      </el-row>
      <br />
      <el-row>
        <el-tooltip
          class="item"
          effect="dark"
          content="只包含webclient主脚本"
          placement="bottom"
        >
          <el-button type="info"><a
              href="/static/download/webclient-min.rar"
              download="webclient-min.rar"
            >精简包</a></el-button>
        </el-tooltip>
        <el-divider direction="vertical"></el-divider>
        <span>只包含webclient主脚本</span>
      </el-row>
    </el-row>
    <el-divider>
      <h2>Npm</h2>
    </el-divider>
    <el-row>
      <h4>npm上的版本是release包，按需引入。</h4>
      <el-tag
        class="download-tag"
        effect="plain"
        type="info"
      >
        npm install @mapgis/webclient-es6-service
      </el-tag>
      <p />
      <el-tag
        class="download-tag"
        effect="plain"
        type="info"
      >
        npm install @mapgis/webclient-vue-mapboxgl
      </el-tag>
      <p />
      <el-tag
        class="download-tag"
        effect="plain"
        type="info"
      >
        npm install @mapgis/webclient-vue-cesium
      </el-tag>
    </el-row>
    <br />
    <el-divider>
      <h2>版本信息</h2>
    </el-divider>
    <el-row>
      <el-col
        v-for="(v,i) in version"
        :key="i"
        :xs="24"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
      >
        <el-divider content-position="center">
          <el-tag type="info">{{v.name}}</el-tag>
        </el-divider>
        <iframe
          class="version-frame"
          frameborder="0"
          :src="`/static/libs/cdn/zondyclient/${v.plugin}.html`"
        />
        <br />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      version: [
        {
          name: 'Cesium运行时版本',
          plugin: 'webclient-cesium-plugin.min'
        },
        {
          name: 'Cesium调试时版本',
          plugin: 'webclient-cesium-plugin'
        },
        {
          name: 'MapboxGL运行时版本',
          plugin: 'webclient-mapboxgl-plugin.min'
        },
        {
          name: 'MapboxGL调试时版本',
          plugin: 'webclient-mapboxgl-plugin'
        }, {
          name: 'Leaflet运行时版本',
          plugin: 'webclient-leaflet-plugin.min'
        },
        {
          name: 'Leaflet调试时版本',
          plugin: 'webclient-leaflet-plugin'
        }, {
          name: 'Openlayers运行时版本',
          plugin: 'webclient-openlayers-plugin.min'
        },
        {
          name: 'Openlayers调试时版本',
          plugin: 'webclient-openlayers-plugin'
        },
      ]
    }
  }
}
</script>
<style lang="scss">
.download-wrapper {
  width: 80vw;
  margin: 10px auto;
  a {
    color: #ffffff;
  }
  .download-tag {
    width: 100%;
  }
  .version-frame {
    width: 100%;
    height: 180px;
  }
}
</style>