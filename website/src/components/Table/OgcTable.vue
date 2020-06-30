<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="EPSG编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="proj"
        label="描述">
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  components: {},
  props: {
      tableData: Array
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="less">

</style>