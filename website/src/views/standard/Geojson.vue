<template>
    <div class="webclient-geojson-wrapper">
    <el-row type="flex" justify="center">
      <el-col :span="mobile? 22 : 14">
         <el-link type="primary" href="https://geojson.org/" target="_blank">GeoJSON官方网址</el-link>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="mobile? 22 : 14">

       <el-table
          :data="tableData"
       >
          <el-table-column
             label="图解"
             prop='img'
             width="120"
          >
            <template   slot-scope="scope">            
                <img :src="scope.row.img"  min-width="70" height="70" />
            </template> 
          </el-table-column>
         <el-table-column
             label="类型"
             prop="type"
             width="150"
         ></el-table-column>
         <el-table-column
           label="格式"
           prop="format"
         >
          <template   slot-scope="scope">            
             <div v-html="formatMethod(scope.row.format)"></div>
         </template> 
         </el-table-column>
       </el-table>
      </el-col>
    </el-row>
    </div>
</template>
<script>
import { isMobile } from "@/utils/mobile";
import geojson   from '../../config/config-geojson'
export default {
    data(){
        return {
            mobile: isMobile(),
            tableData:geojson.data,
        }
    },
    methods:{
        formatMethod (data) {
            return data.replace(/\n/g, "<br />")
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.webclient-geojson-wrapper {
  margin: 30px 0px;
}
</style>