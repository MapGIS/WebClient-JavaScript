<template>
  <el-table
    height="100%"
    :data="data"
    border
    style="wfuncth: 100%; margin-top: 20px"
  >
    <el-table-column
      prop="func"
      label="详细功能"
    >
    </el-table-column>
    <el-table-column
      prop="leaflet"
      :label="mobile? 'leaf':'leaflet'"
      :filters="[
      { text: '支持', value: '支持' }, 
      { text: '后续支持', value: '后续支持'},
       { text: '支持', value: '支持'}, 
       { text: '无计划', value: '无计划'}]"
      :filter-method="filterLeafletTag"
      filter-placement="bottom-end"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.leaflet === '支持' ? 'success' : scope.row.leaflet === '支持' ? 'primary' : scope.row.leaflet === '后续支持' ? 'warning' : 'danger'"
          disable-transitions
        >{{scope.row.leaflet}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="mapboxgl"
      :label="mobile? 'map':'MapboxGL'"
      :filters="[
      { text: '支持', value: '支持' }, 
      { text: '后续支持', value: '后续支持'}, 
      { text: '支持', value: '支持'}, 
      { text: '无计划', value: '无计划'}]"
      :filter-method="filterMapboxTag"
      filter-placement="bottom-end"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.mapboxgl === '支持' ? 'success' : scope.row.mapboxgl === '支持' ? 'primary' : scope.row.mapboxgl === '后续支持' ? 'warning' : 'danger'"
          disable-transitions
        >{{scope.row.mapboxgl}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="openlayers"
      :label="mobile? 'ol':'OpenLayers'"
      :filters="[
      { text: '支持', value: '支持' }, 
      { text: '后续支持', value: '后续支持'}, 
      { text: '支持', value: '支持'}, 
      { text: '无计划', value: '无计划'}]"
      :filter-method="filterOpenlayerTag"
      filter-placement="bottom-end"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.openlayers === '支持' ? 'success' : scope.row.openlayers === '支持' ? 'primary' : scope.row.openlayers === '后续支持' ? 'warning' : 'danger'"
          disable-transitions
        >{{scope.row.openlayers}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="cesium"
      :label="mobile? 'ce':'Cesium'"
      :filters="[
      { text: '支持', value: '支持' }, 
      { text: '后续支持', value: '后续支持'}, 
      { text: '支持', value: '支持'}, 
      { text: '无计划', value: '无计划'}]"
      :filter-method="filterCesiumTag"
      filter-placement="bottom-end"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.cesium === '支持' ? 'success' : scope.row.cesium === '支持' ? 'primary' : scope.row.cesium === '后续支持' ? 'warning' : 'danger'"
          disable-transitions
        >{{scope.row.cesium}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { isMobile } from "@/utils/mobile";
export default {
  props: {
    data: {
      type: Array,
      required: true,
    }
  },
  data () {
    return {
      mobile: isMobile(),
    }
  },
  methods: {
    filterLeafletTag (value, row) {
      return row.leaflet === value
    },
    filterMapboxTag (value, row) {
      return row.mapboxgl === value
    },
    filterOpenlayerTag (value, row) {
      return row.openlayers === value
    },
    filterCesiumTag (value, row) {
      return row.cesium === value
    }
  }
}
</script>