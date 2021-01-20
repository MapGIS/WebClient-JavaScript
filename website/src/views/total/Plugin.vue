<template>
  <div class="webclient-plugin-wrapper">
    <el-row
      type="flex"
      justify="center"
      class="banner"
    >
      <el-col :span="mobile ? 23 : 18">
        <el-tabs
          type=""
          tab-position='top'
          style="height: 100%;"
        >
          <el-tab-pane
            :label="t.name"
            v-for="t in tabs"
            :key="t.name"
          >
            <PluginTable :data="t.data" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { isMobile } from "@/utils/mobile";
import PluginTable from '../../components/Table/Plugin';
import { Leaflet, MapboxGL, OpenLayers, Cesium } from './PluginConfig';

export default {
  components: {
    PluginTable,
  },
  data () {
    return {
      mobile: isMobile(),
      tabs: [
        {
          name: 'Leaflet',
          data: Leaflet,
        },
        {
          name: 'MapboxGL',
          data: MapboxGL,
        },
        {
          name: 'OpenLayers',
          data: OpenLayers,
        },
        {
          name: 'Cesium',
          data: Cesium,
        }
      ]
    }
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.webclient-plugin-wrapper {
  margin: 30px 0px;
}
.banner {
  padding-top: 20px;
  text-align: center;
}
</style>