<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="EPSG编号"
        :width="mobile ? 90 : 100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        :width="mobile ? 80 : 280">
      </el-table-column>
      <el-table-column
        prop="proj"
        label="描述">
      </el-table-column>
    </el-table>
</template>

<script>
import { isMobile } from "@/utils/mobile";
export default {
  components: {},
  props: {
      tableData: Array
  },
  data() {
    return {
       mobile: isMobile()
    };
  }
};
</script>

<style lang="less">

</style>
