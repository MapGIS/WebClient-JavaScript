<template>
  <div class="webclient-plugin-list">
    <el-row type="flex">
      <el-col :span="mobile ? 23 : 18" offset="3">
        <h1>{{title}}</h1>
      </el-col>
    </el-row>

    <el-row type="flex">
      <el-col :span="mobile ? 23 : 18" offset="3">
        <h4>{{titledetail}}</h4>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center" class="banner">
      <el-col :span="mobile ? 23 : 18">
        <el-tabs type tab-position="top" style="height: 100%;width:100%;">
          <el-tab-pane :label="t.label" v-for="t in tabs" :key="t.name">
            <plugin-card :list="tags[t.name]" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { isMobile } from '@/utils/mobile'
import { Tags } from './PluginConfig'
import PluginCard from '@/components/Card/PluginCard'

export default {
  components: { PluginCard },
  data() {
    return {
      mobile: isMobile(),
      title: '插件标签以及说明', 
      titledetail:
        '各个插件 include-xxx-local.lib、include-xxx-online.lib的include标签以及说明文件',
      tags: Tags,
      tabs: [
        {
          name: 'Leaflet',
          label: 'INCLUDE-LEAFLET.JS'
        },
        {
          name: 'Mapbox',
          label: 'INCLUDE-MAPBOX.JS'
        },
        {
          name: 'Openlayers',
          label: 'INCLUDE-OPENLAYERS5.JS'
        },
        {
          name: 'Cesium',
          label: 'INCLUDE-CESIUM.JS'
        },
        {
          name: 'Lib',
          label: 'INCLUDE-LIB.JS'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.webclient-plugin-list {
  .el-card {
    width: 80vw;
    display: inline-block;
    margin: 0.3em;
    border-radius: 20px;
  }
  .banner {
    padding-top: 20px;
    text-align: left;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }
}
</style>