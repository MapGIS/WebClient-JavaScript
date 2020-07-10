<template>
  <div class="webclient-detail-chart">
    <el-row type="flex">
      <el-col :offset="3">
        <h1>{{title}}</h1>
      </el-col>
    </el-row>

    <el-row type="flex">
      <el-col :offset="3">
        <h4>{{titledetail}}</h4>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center" class="banner">
      <el-col :span="18">
        <el-card class="card" shadow="always" :body-style="{width: '80vw'}">
          <el-tabs type tab-position="top" style="height: 100%;" v-model="mapmode">
            <el-tab-pane :label="t.label" v-for="(t) in tabs" :key="t.name" :name="t.name"></el-tab-pane>
          </el-tabs>
          <h4>难度统计</h4>
          <v-chart :options="treemap" theme="ovilia-green" />
          <h4>功能统计</h4>
          <v-chart :options="tree" theme="ovilia-green" />

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { isMobile } from '@/utils/mobile'
import { initCube, initTree } from './config/ConfigEchart'

import ECharts from 'vue-echarts'
import 'echarts/theme/dark'
import 'echarts/lib/chart/treemap'
import 'echarts/lib/chart/tree'
// custom theme
import theme from './config/theme.json'
// registering custom theme
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
      mapmode: 'leaflet',
      titledetail: '统计各个模块的比例，难度以及树状结构',
      treemap: {},
      tree: {},
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
      }
    }
  },
  watch: {
    mapmode(next) {
      this.treemap = this.optionscube[next]
      this.tree = this.optionstree[next]
      // window.console.log('mapmode', next, this.options)
    }
  },
  mounted() {
    const vm = this
    const maps = ['leaflet', 'openlayers', 'cesium', 'mapboxgl']
    const gets = maps.map(i => {
      return axios.get(`./static/demo/config/config-${i}.json`)
    })
    Promise.all(gets).then(([l, o, c, m]) => {
      const leafletOptions = initCube(l.data, 'leaflet')
      const openlayersOptions = initCube(o.data, 'openlayers')
      const cesiumOptions = initCube(c.data, 'cesium')
      const mapboxglOptions = initCube(m.data, 'mapboxgl')
      const leafletOptions1 = initTree(l.data, 'leaflet')
      const openlayersOptions1 = initTree(o.data, 'openlayers')
      const cesiumOptions1 = initTree(c.data, 'cesium')
      const mapboxglOptions1 = initTree(m.data, 'mapboxgl')

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
      vm.treemap = vm.optionscube[vm.mapmode]
      vm.tree = vm.optionstree[vm.mapmode]
    })
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.webclient-detail-chart {
  .echarts {
    width: 80vw;
    height: 500px;
  }
  .el-card {
    width: 80vw;
    display: inline-block;
    margin: 0.3em;
    border-radius: 20px;
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