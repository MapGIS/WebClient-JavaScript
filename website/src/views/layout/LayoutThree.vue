<template>
  <el-container>
    <el-header :class="{'webclient-three-header-mobile':mobile}">
      <Header></Header>
    </el-header>
    <el-main class="webclient-three-layout">
      <app-main></app-main>
    </el-main>
    <el-footer
      :height="mobile?'300':'250'"
      style="padding:0px;"
    >
      <main-footer></main-footer>
    </el-footer>
  </el-container>
</template>

<script>
import { Header, AppMain, MainFooter } from "./components";
import { isMobile } from "@/utils/mobile";

export default {
  name: "layoutthree",
  components: {
    Header,
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
.webclient-three-header-mobile {
  padding: 0px;
  height: 48px !important;
}
.webclient-three-header {
  padding: 0px;
  height: 72px !important;
}
.webclient-three-layout {
  padding: 0px;
  min-height: 80vh;
  // height: fit-content;
  margin: 0px 0px;
}
.el-footer {
  padding: 0 0px;
}
</style>
