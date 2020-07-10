<template>
  <div class="plugins-group-card">
    <div v-for="(g,i) in Object.keys(list)" :key="i" class="group">
      <el-row>
        <el-col
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          v-for="(l,index) in list[g].list"
          :key="index"
        >
          <el-card v-bind:style="list[g].styleObject" class="little-card">
            <h2 class="info-title">{{l.name}}</h2>
            <p>{{l.info}}</p>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Object
  }
}
</script>

<style lang="scss">
.plugins-group-card {
  .group {
    .el-card {
      width: 90%;
      height: 200px;
      // display: inline-block;
      margin: 12px;
      border-radius: 20px;
    }
  }
}
</style>