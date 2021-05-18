<template>
  <el-container>
    <el-header
        style="padding:0px;"
        :height="mobile?'48px':'64px'"
    >
      <Header></Header>
    </el-header>
    <div class="product-header">
      <span class="product-span">组件</span>
    </div>
    <!--    <el-header class="product-header">-->
    <!--    </el-header>-->
    <el-container class="product-container">
      <el-aside
          class="aside-scroll-content"
      >
        <el-scrollbar
            class="element-scroll-content"
            wrapStyle="overflow-x: hidden;"
            viewStyle="overflow-y: hidden;"
        >
          <div class="header-menu-col">
            <span class="strong">{{ asideMenu.title }}</span>
            <div class="header-menu-links" v-for="(link, i) in asideMenu.links" :key="i">
              <div class="header-menu-link" v-for="(l, j) in link" :key="j">
                <div class="header-menu-link-text">
                  <el-badge type="success" :value="asideMenu.hightlights[i][j] ? hint : ''" class="menu-badge">
                    <a class="header-menu-link-text" :href="asideMenu.routes[i][j]">
                      <span :class="{ 'light-subtitle': light }">{{ l }}</span>
                    </a>
                  </el-badge>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-aside>
      <el-main></el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from "axios";
import {isMobile} from "@/utils/mobile";
import {Header} from "@/views/layout/components";

export default {
  name: "product",
  data() {
    return {
      mobile: isMobile(),
      asideContent: "",
      asideMenu: "",
      light: true,
      hint: '新'
    }
  },
  components: {
    Header
  },
  mounted() {
    this.initConfig();
  },
  methods: {
    initConfig() {
      this.getAsideList();
    },
    getAsideList() {
      let self = this;
      let asideUrl = "./static/demo/config/config-headers.json";
      axios.get(asideUrl).then(response => {
        let temp = response.data;
        for (let i in temp) {
          if ("组件" === (temp[i].title).toLowerCase()) {
            self.asideContent = temp[i];
            break;
          }
        }
        self.asideMenu = self.asideContent.menus[0];
      });
    }
  }
}
</script>

<style scoped lang="scss">
.product-header {
  padding: 0;
  height: 240px !important;
  background-image: url("../../../public/static/assets/product/component.png");

  .product-span {
    width: fit-content;
    height: 240px;
    margin-left: 132px;
    margin-top: 86px;
    color: rgba(255, 255, 255, 1);
    font-stretch: normal;
    letter-spacing: 1.5px;
    font-size: 22px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-style: italic;
    color: #ffffff;
    line-height: 240px;
  }
}

.img-class {
  height: 100%;
  width: 100%;
}

.product-container {
  height: fit-content;
  width: 100%;

  .aside-scroll-content {
    height: calc(100vh - 240px);
    width: 250px;
    margin: 36px 0px 36px 79px;
    overflow-x: hidden;
    background-color: #F5F7FB;
  }
}

.strong {
  font-weight: bold !important;
  width: 37px;
  height: 18px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  color: #333333;
  line-height: 48px;
}

.light-subtitle {
  color: #3C4858 !important;
}
.header-menu-link{
  margin: 4px 0px;
  width: fit-content;
  height: fit-content;
  span {
    width: 60px;
    height: 14px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 30px;
  }
}
.header-menu-col{
  padding: 5px 90px;
}
</style>