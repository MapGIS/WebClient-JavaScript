<template>
  <el-container>
    <el-header
        style="padding:0px;"
        :class="{'webclient-three-header-mobile':mobile, 'webclient-three-header': true}"
    >
      <Header></Header>
    </el-header>
    <el-container class="helper-asideContent">
      <el-drawer
          title=""
          :size="drawerSize"
          :visible.sync="drawerShow"
          direction="ltr"
          :show-close="false"
          v-if="mobile">
        <el-scrollbar
            class="element-scroll-content"
            wrapStyle="overflow-x: hidden;"
            viewStyle="overflow-y: hidden;"
        >
          <div class="header-menu-col">
            <span :class="{ strong: strong, 'light-title': light }">{{ asideMenu.title }}</span>
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
      </el-drawer>
      <el-aside
          class="aside-scroll-content"
          v-else
      >
        <el-scrollbar
            class="element-scroll-content"
            wrapStyle="overflow-x: hidden;"
            viewStyle="overflow-y: hidden;"
        >
          <div class="header-menu-col">
            <span :class="{ strong: strong, 'light-title': light }">{{ asideMenu.title }}</span>
            <div class="header-menu-links" v-for="(link, i) in asideMenu.links" :key="i">
              <div class="header-menu-link" v-for="(l, j) in link" :key="j">
                <div class="header-menu-link-text">
                  <el-badge type="success" :value="asideMenu.hightlights[i][j] ? hint : ''" class="menu-badge">
                  <router-link :to="asideMenu.routes[i][j]">  
                    <a class="header-menu-link-text">
                      <span :class="{ 'light-subtitle': light }">{{ l }}</span>
                    </a>
                  </router-link>
                  </el-badge>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <div
            class="mobile-drawer-open"
            @click="handleDrawer"
            v-if="mobile"
        >
          <IconFont type="iconcollapseright" />
        </div>
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
    </el-container>
    <el-footer
        :height="mobile?'300':'250'"
        style="padding:0px;"
    >
      <main-footer></main-footer>
    </el-footer>
  </el-container>
</template>

<script>
import {Header, MainFooter} from "@/views/layout/components";
import {isMobile} from "@/utils/mobile";
import VueMarkdown from "vue-markdown";
import Prism from "prismjs";
import axios from 'axios';
import IconFont from "@/components/IconFont/iconfront";

import "prismjs/themes/prism-coy.css";  // theme
import 'prismjs/components/prism-javascript';  // language
// theme css
import "@/styles/markdown.css";
import "@/styles/prism.css";

export default {
  name: 'Helper',
  components: {
    Header,
    MainFooter,
    VueMarkdown,
    IconFont
  },
  data() {
    return {
      mobile: isMobile(),
      markdown: "> `暂无说明`, 请检查改目录下的帮助说明是否存在",
      asideContent: "",
      asideMenu: "",
      strong: true,
      light: false,
      hint: '新',
      drawerShow: false,
      drawerSize: "60%"
    }
  },
  mounted() {
    this.getCurrentKind();
  },
  watch: {
    "$route.path"() {
      this.getCurrentKind();
    }
  },
  methods: {
    getCurrentKind() {
      // let anchors = location.href.split("#");
      // if (!anchors || anchors.length < 2) return;

      // let file = anchors[anchors.length - 1];
      // let mode = this.getMapMode();
      // let first, second;
      // if (anchors.length <= 4) {
      //   first = anchors[anchors.length - 2];
      //   second = undefined;
      // } else {
      //   first = anchors[anchors.length - 3];
      //   second = anchors[anchors.length - 2];
      // }

      let anchors = location.href.split("#");
      if (!anchors || anchors.length < 2) return;

      let hrefs = anchors[1].split("/").slice(2);
      let mode = this.getMapMode();
      let file = hrefs[hrefs.length - 1];
      let first, second;
      if (hrefs.length <= 3) {
        first = hrefs[hrefs.length - 2];
        second = undefined;
      } else {
        first = hrefs[hrefs.length - 3];
        second = hrefs[hrefs.length - 2];
      }

      this.resetHtml(mode, file, first, second);
      this.getAsideContent(mode);
    },
    getAsideContent(mode,file,first,second) {
      let self = this;
      let asideUrl = "./static/demo/config/config-headers.json";
      // let url =  mode + "/helper/" + first + "/"+ second + "/" + file ;
      axios.get(asideUrl).then(response => {
        let temp = response.data;
        for (let i in temp) {
          if (mode === (temp[i].title).toLowerCase()) {
            self.asideContent = temp[i];
            break;
          }
        }
        let menus = self.asideContent.menus;
        for (let j in menus) {
          if (menus[j].type || menus[j].type === "helper") {
            self.asideMenu = menus[j]
            break;
          }
        }
        // for (let i in self.asideMenu.routes[0]){
        //   if (url === self.asideMenu.routes[0][i]){
        //     let activeDiv = document.getElementsByClassName('');
        //   }
        // }

      });
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
      }
      return mapMode;
    },
    getHtmlUrl(type, image, first, second) {
      var baseUrl = "./static/demo/";
      var imageUrl = baseUrl + type + "/helper/" + first + "/";
      if (second !== undefined) {
        imageUrl = imageUrl + second + "/" + image + ".md";
      } else {
        imageUrl = imageUrl + image + ".md";
      }
      return imageUrl;
    },
    resetHtml(mode, file, first, second) {
      this.loading = true;
      var self = this;

      window.console.log('reset', mode, file, first, second);
      var url = this.getHtmlUrl(mode, file, first, second);

      axios.get(url)
          .then(response => {
            self.markdown = response.data;
          }).catch(() => {
        window.console.warn('暂无该帮助的markdown说明，后续持续补充......');
      })
    },
    markdownRendered() {
      this.$nextTick(() => {
        Prism.highlightAll();
      });
    },
    handleDrawer () {
      this.drawerShow = !this.drawerShow;
    }
  },
}
</script>

<style lang="scss" scoped>
.strong {
  font-weight: bold !important;
}

.light-title {
  color: #ffffff !important;
}

.helper-asideContent {
  .aside-scroll-content {
    height: calc(100vh - 80px);
    width: 250px !important;
    margin: 36px 0px 36px 79px;
    overflow-x: hidden;
    background-color: #F5F7FB;
  }
}

.header-menu-col {
  margin: 7px 30px;
  width: fit-content;
  height: fit-content;

  span {
    margin-left: 10px;
    width: 60px;
    height: 14px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 30px;
  }

  .el-badge__content--success {
    background: linear-gradient(90deg, #1CA054, #24C066);
  }

  .header-menu-links {
    padding: 10px;
    border-top: 1px solid #D2D8E2;
  }

  .header-menu-link-text {
    color: #323333;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
  }

  .header-menu-link-text:hover {
    color: #3A85C6;
  }

  .header-menu-link:hover {
    border-left: 2px solid #3A85C6;
  }

  .mobile-drawer-open {
    position: absolute;
    top: 100px;
    left: 0;
    width: 40px;
    height: 40px;
    cursor: pointer;
    z-index: 100;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    background: #fff;
    -webkit-box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    border-radius: 0 4px 4px 0;
  }
}
</style>