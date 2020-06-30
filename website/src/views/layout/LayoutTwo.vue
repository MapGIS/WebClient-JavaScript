<template>
  <el-container>
    <el-main class="webclient-two-layout">
      <app-main></app-main>
    </el-main>
    <el-footer :height="mobile?'300':'250'" style="padding:0px;">
      <main-footer></main-footer>
    </el-footer>
  </el-container>
</template>

<script>
import { AppMain, MainFooter } from "./components";
import { isMobile } from "@/utils/mobile";

export default {
  name: "layouttwo",
  components: {
    AppMain,
    MainFooter
  },
  data () {
    return {
      mobile: isMobile()
    }
  },
  computed: {},
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.webclient-two-layout {
  padding: 0px;
  min-height: 80vh;
  // height: fit-content;
  margin: 0px 0px;
}
.el-footer {
  padding: 0 0px;
}
</style>
