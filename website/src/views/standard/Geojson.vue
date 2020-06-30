<template>
    <div>
       <el-table
          :data="tableData"
          style="width:60%;margin:0 auto;"
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
    </div>
</template>
<script>
import geojson   from '../../config/config-geojson'
export default {
    data(){
        return {
            tableData:geojson.data
        }
    },
    methods:{
        formatMethod (data) {
            return data.replace(/\n/g, "<br />")
        }
    }
}
</script>