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
      <el-main>
        <vue-markdown
            :watches="['show','html','breaks','linkify','emoji','typographer']"
            :style="{padding: '2px 1vw'}"
            :source="markdown"
            :html="true"
            :toc="false"
            :linkify="true"
            @rendered="markdownRendered"
        ></vue-markdown>
        <el-backtop></el-backtop>
      </el-main>
    </el-container>
    <el-footer :height="mobile ? '300' : '250'" style="padding: 0px">
        <main-footer></main-footer>
    </el-footer>
  </el-container>
</template>

<script>
import axios from "axios";
import {isMobile} from "@/utils/mobile";
import {Header, MainFooter} from "@/views/layout/components";
import VueMarkdown from "vue-markdown";
import Prism from "prismjs";
import "prismjs/themes/prism-coy.css";  // theme
import 'prismjs/components/prism-javascript';  // language
// theme css
import "@/styles/markdown.css";
import "@/styles/prism.css";

export default {
  name: "product",
  data() {
    return {
      mobile: isMobile(),
      asideContent: "",
      asideMenu: "",
      light: true,
      hint: '新',
      markdown: "> `暂无说明`, 请检查改目录下的帮助说明是否存在",
    }
  },
  components: {
    Header,
    MainFooter,
    VueMarkdown
  },
  mounted() {
    this.initConfig();
  },
  methods: {
    initConfig() {
      let anchors = location.href.split("#");
      if (!anchors || anchors.length < 2) return;

      let hrefs = anchors[1].split("/").slice(2);
      let mode = this.getMapMode();
      let file = hrefs[hrefs.length - 1];
      let first;
      if (hrefs.length <= 3) {
        first = hrefs[hrefs.length - 3];
      }
      this.resetHtml(mode, file, first);
      this.getAsideList();
    },
    getMapMode() {
      var mapMode = "leaflet";
      if (this.$route.path.indexOf("leaflet") > 0) {
        mapMode = "leaflet";
      } else if (this.$route.path.indexOf("openlayer") > 0) {
        mapMode = "openlayers";
      } else if (this.$route.path.indexOf("cesium") > 0) {
        mapMode = "cesium";
      } else if (this.$route.path.indexOf("mapboxgl") > 0) {
        mapMode = "mapboxgl";
      } else if (this.$route.path.indexOf("component") > 0) {
        mapMode = "component";
      }
      return mapMode;
    },
    resetHtml(mode, file, first) {
      this.loading = true;
      var self = this;

      var url = this.getHtmlUrl(mode, file, first);
      axios.get(url)
          .then(response => {
            self.markdown = response.data;
          }).catch(() => {
        window.console.warn('暂无该帮助的markdown说明，后续持续补充......');
      })
    },
    getHtmlUrl(type, image) {
      var baseUrl = "./static/demo/";
      var imageUrl = baseUrl + type + "/source/" + image + ".md";
      return imageUrl;
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
    },
    markdownRendered() {
      this.$nextTick(() => {
        Prism.highlightAll();
      });
    },
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