<template>
  <el-table
    :data="data"
    border
    style="margin-top: 20px"
    :header-cell-style="headerCellStyle"
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
        <div :class="['default',{'support': scope.row.leaflet === '支持'}, {'not-support': scope.row.leaflet === '不支持'}]">{{scope.row.leaflet === '支持'? '√': scope.row.leaflet === '不支持'? '×': '-'}}</div>
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
        <div :class="['default',{'support': scope.row.leaflet === '支持'}, {'not-support': scope.row.leaflet === '不支持'}]">{{scope.row.leaflet === '支持'? '√': scope.row.leaflet === '不支持'? '×': '-'}}</div>
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
        <div :class="['default',{'support': scope.row.leaflet === '支持'}, {'not-support': scope.row.leaflet === '不支持'}]">{{scope.row.leaflet === '支持'? '√': scope.row.leaflet === '不支持'? '×': '-'}}</div>
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
        <div :class="['default',{'support': scope.row.leaflet === '支持'}, {'not-support': scope.row.leaflet === '不支持'}]">{{scope.row.leaflet === '支持'? '√': scope.row.leaflet === '不支持'? '×': '-'}}</div>
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
      headerCellStyle: {
          backgroundColor: '#F5F7FA',
          fontSize: '14px',
          fontFamily: 'Microsoft YaHei',
          fontWeight: 'bold',
          color: '#606266'
      }
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

<style rel="stylesheet/scss" lang="scss" scoped>
.default {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}

.support {
  color: #45AC50;
}

.not-support {
  color: #EA4614;
}
</style>