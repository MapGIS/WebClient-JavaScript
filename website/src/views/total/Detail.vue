<template>
  <div class="webclient-detail-panel">
    <el-row
      type="flex"
      justify="center"
      class="banner"
    >
      <el-col :span="mobile ? 23 : 18">
        <el-tabs
          tab-position='top'
          style="height: 100%;"
        >
          <el-tab-pane
            :label="t.name"
            v-for="t in tabs"
            :key="t.name"
          >
            <Kind :data="t.data" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { isMobile } from "@/utils/mobile";
import {
  IGServer,
  ClientView, ClientAnalysis, ClientTheme,
  VectorTile,
  ElasticSearch,
  Spark
} from './DetailConfig';
import Kind from '../../components/Table/Kind';

export default {
  components: {
    Kind,
  },
  data () {
    return {
      mobile: isMobile(),
      tabs: [
        {
          name: 'IGServer',
          data: IGServer,
        },
        {
          name: '客户端可视化',
          data: ClientView,
        },
        {
          name: '客户端分析',
          data: ClientAnalysis,
        },
        {
          name: '客户端专题图',
          data: ClientTheme,
        },
        {
          name: '矢量瓦片',
          data: VectorTile,
        },
        {
          name: '弹性搜索',
          data: ElasticSearch,
        },
        {
          name: '大数据分析',
          data: Spark,
        }
      ]
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.banner {
  padding-top: 20px;
  text-align: center;
}
.webclient-detail-panel {
  margin: 30px 0px;
}
</style>