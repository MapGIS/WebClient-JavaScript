<template>
  <el-table
    :data="data"
    :default-sort="{prop: 'name', order: 'descending'}"
    border
    stripe
    style="width: 100%"
  >
    <el-table-column type="index">
    </el-table-column>
    <el-table-column
      fixed
      sortable
      prop="name"
      label="三方插件"
      width="125"
    >
    </el-table-column>
    <el-table-column
      sortable
      prop="func"
      label="插件功能"
      width="200"
    >
    </el-table-column>
    <el-table-column
      sortable
      prop="dev"
      label="环境依赖"
      width="200"
    >
    </el-table-column>
    <el-table-column
      sortable
      prop="update"
      label="最近更新日期"
      width="100"
    >
    </el-table-column>
    <el-table-column
      label="近期同步更新"
      prop="recent"
      width="120"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.recent ? 'success' : 'info'"
          effect="dark"
        >
          {{ scope.row.recent ? '是' : '否' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      sortable
      prop="version"
      label="当前使用版本/最新版本"
    >
    </el-table-column>
    <el-table-column
      sortable
      prop="licesen"
      label="证书"
      width="170"
    >
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

  }
}
</script>