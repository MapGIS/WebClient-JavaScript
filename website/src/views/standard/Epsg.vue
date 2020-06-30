<template>
  <div>
    <el-row type="flex" justify="center" class="banner">
      <el-col :span="18">
        <el-tabs type="border-card" tab-position="top" style="height: 100%;">
          <el-tab-pane label="高斯大地坐标系_西安80">
            <OgcTable :tableData="gauss_xian80" />
          </el-tab-pane>
          <el-tab-pane label="高斯大地坐标系_北京54">
            <OgcTable :tableData="gauss_beijing54" />
          </el-tab-pane>
          <el-tab-pane label="高斯大地坐标系_中国2000">
            <OgcTable :tableData="gauss_china2000" />
          </el-tab-pane>
          <el-tab-pane label="Web墨卡托_WGS1984">
            <OgcTable :tableData="web_mecarot" />
          </el-tab-pane>
          <el-tab-pane label="地理坐标系(西安)_度">
            <OgcTable :tableData="lonlat_xian80" />
          </el-tab-pane>
          <el-tab-pane label="地理坐标系(北京)_度">
            <OgcTable :tableData="lonlat_beijin54" />
          </el-tab-pane>
          <el-tab-pane label="中国2000国家大地坐标系_度">
            <OgcTable :tableData="lonlat_china2000" />
          </el-tab-pane>
          <el-tab-pane label="WGS1984_度">
            <OgcTable :tableData="lonlat_wgs84" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import treeTable from '@/components/TreeTable'
import OgcTable from "@/components/Table/OgcTable";
import epsg from "@/config/config-epsg";

export default {
  components: {
    OgcTable
  },
  data() {
    return {
      gauss_xian80: epsg.gauss_xian80,
      gauss_beijing54: epsg.gauss_beijing54,
      gauss_china2000: epsg.gauss_china2000,
      web_mecarot: epsg.web_mecarot,
      lonlat_xian80: epsg.lonlat_xian80,
      lonlat_beijin54: epsg.lonlat_beijin54,
      lonlat_china2000: epsg.lonlat_china2000,
      lonlat_wgs84: epsg.lonlat_wgs84
    };
  },
  methods: {
    filterLeafletTag(value, row) {
      return row.leaflet === value;
    },
    filterMapboxTag(value, row) {
      return row.mapboxgl === value;
    },
    filterOpenlayerTag(value, row) {
      return row.openlayers === value;
    },
    filterCesiumTag(value, row) {
      return row.cesium === value;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.banner {
  padding-top: 20px;
  text-align: center;
}
</style>