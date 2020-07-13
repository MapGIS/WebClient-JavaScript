<template>
  <div class="webclient-detail-chart">
    <el-row type="flex">
      <el-col :offset="mobile ? 1 : 2">
        <h2>{{title}}</h2>
      </el-col>
    </el-row>

    <el-row type="flex">
      <el-col :offset="mobile ? 1 : 2">
        <h4>{{titledetail}}</h4>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center" class="banner">
      <el-col :span="mobile ? 23 : 20">
        <el-tabs type tab-position="top" style="height: 100%;" v-model="mapmode">
          <el-tab-pane :label="t.label" v-for="(t) in tabs" :key="t.name" :name="t.name"></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <br />
      <v-chart :options="treemap" theme="ovilia-green" />
    <br />
    <v-chart :options="tree" />
    <br />
    <v-chart :options="sunburst" />
  </div>
</template>

<script>
import { isMobile } from '@/utils/mobile'
import { initCube, initTree, initBar } from './config/ConfigEchart'

import ECharts from 'vue-echarts'
import 'echarts/theme/dark'
import 'echarts/lib/chart/treemap'
import 'echarts/lib/chart/tree'
import 'echarts/lib/chart/sunburst'

import theme from './config/theme.json'
ECharts.registerTheme('ovilia-green', theme)

import axios from 'axios'

export default {
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      mobile: isMobile(),
      title: '图表统计',
      titledetail: '统计各个模块的比例，难度以及树状结构',
      mapmode: 'leaflet',
      treemap: {},
      tree: {},
      sunburst: {},
      tabs: [
        {
          name: 'leaflet',
          label: 'LEAFLET'
        },
        {
          name: 'cesium',
          label: 'CESIUM'
        },
        {
          name: 'mapboxgl',
          label: 'MAPBOX GL'
        },
        {
          name: 'openlayers',
          label: 'OPENLAYERS'
        }
      ],
      optionscube: {
        leaflet: {},
        cesium: {},
        mapboxgl: {},
        openlayers: {}
      },
      optionstree: {
        leaflet: {},
        cesium: {},
        mapboxgl: {},
        openlayers: {}
      },
      optionsbar: {
        leaflet: {},
        cesium: {},
        mapboxgl: {},
        openlayers: {}
      }
    }
  },
  watch: {
    mapmode(next) {
      this.treemap = this.optionscube[next]
      this.tree = this.optionstree[next]
      this.sunburst = this.optionsbar[next]
    }
  },
  mounted() {
    const vm = this
    const maps = ['leaflet', 'openlayers', 'cesium', 'mapboxgl']
    const gets = maps.map(i => {
      return axios.get(`./static/demo/config/config-${i}.json`)
    })
    Promise.all(gets).then(([l, o, c, m]) => {
      const leafletOptions = initCube(l.data, 'leaflet难度统计')
      const openlayersOptions = initCube(o.data, 'openlayers难度统计')
      const cesiumOptions = initCube(c.data, 'cesium难度统计')
      const mapboxglOptions = initCube(m.data, 'mapboxgl难度统计')
      const leafletOptions1 = initTree(l.data, 'leaflet功能统计')
      const openlayersOptions1 = initTree(o.data, 'openlayers功能统计')
      const cesiumOptions1 = initTree(c.data, 'cesium功能统计')
      const mapboxglOptions1 = initTree(m.data, 'mapboxgl功能统计')
      const leafletOptions2 = initBar(l.data, 'leaflet人员统计')
      const openlayersOptions2 = initBar(o.data, 'openlayers人员统计')
      const cesiumOptions2 = initBar(c.data, 'cesium人员统计')
      const mapboxglOptions2 = initBar(m.data, 'mapboxgl人员统计')

      vm.optionscube = {
        leaflet: leafletOptions,
        cesium: cesiumOptions,
        mapboxgl: mapboxglOptions,
        openlayers: openlayersOptions
      }
      vm.optionstree = {
        leaflet: leafletOptions1,
        cesium: cesiumOptions1,
        mapboxgl: mapboxglOptions1,
        openlayers: openlayersOptions1
      }
      vm.optionsbar = {
        leaflet: leafletOptions2,
        cesium: cesiumOptions2,
        mapboxgl: mapboxglOptions2,
        openlayers: openlayersOptions2
      }
      vm.treemap = vm.optionscube[vm.mapmode]
      vm.tree = vm.optionstree[vm.mapmode]
      vm.sunburst = vm.optionsbar[vm.mapmode]
    })
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.webclient-detail-chart {
  .echarts {  // Mobile端
      width: 85vw;
      height: 700px;
      margin-left: 30px;
  }
  .banner {
    padding-top: 20px;
    text-align: center;
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