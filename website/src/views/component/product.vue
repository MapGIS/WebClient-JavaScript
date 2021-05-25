<template>
  <el-container class="mapgis-product-wrapper">
    <el-header style="padding:0px;" :height="mobile?'48px':'72px'">
      <Header></Header>
    </el-header>
    <div class="product-header">
      <span class="product-span">{{ asideMenu.title }}</span>
    </div>
    <el-container class="product-container">
      <el-aside class="aside-scroll-content">
        <el-scrollbar class="element-scroll-content" wrapStyle="overflow-x: hidden;" viewStyle="overflow-y: hidden;">
          <div class="header-menu-col">
            <span class="strong">{{ asideMenu.title }}</span>
            <div class="header-menu-col">
              <div id="develop-markdown-toc"></div>
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
            :toc="true"
            :toc-first-level="2"
            toc-id="develop-markdown-toc"
            toc-class="mapgis-toc-class"
            :toc-anchor-link="true"
            :linkify="true"
            @rendered="markdownRendered"
            @toc-rendered="tocRendered"
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
      markdown: "> `暂无说明`, 请检查该目录下的帮助说明是否存在",
      mode: "",
      isContentFinish: false,
      isTocFinish: false
    }
  },
  components: {
    Header,
    MainFooter,
    VueMarkdown
  },
  mounted() {
    this.initConfig();
    this.initScroll();
    this.changeTabBackground();
  },
  watch: {
    "$route.path"() {
      this.initConfig();
      this.changeTabBackground();
    }
  },
  methods: {
    initScroll() {
      /**
       *  目标元素和视窗viewport的交集的变化的方法API
       * @type {IntersectionObserver}
       */
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          let id = entry.target.getAttribute('id');
          id = encodeURI(id);
          //intersectionRatio：目标元素出现在视窗的比例
          if (entry.intersectionRatio > 0) {
            document.querySelector(`li a[href="#${id}"]`).parentElement.classList.add('active');
          } else {
            document.querySelector(`li a[href="#${id}"]`).parentElement.classList.remove('active');
          }
        });
      });
      //observer.observe():监听当前所有的h2[id]
      document.querySelectorAll('h2[id]').forEach((section) => {
        observer.observe(section);
      });
      document.querySelectorAll('h3[id]').forEach((section) => {
        observer.observe(section);
      });
    },
    initConfig() {
      let anchors = location.href.split("#");
      if (!anchors || anchors.length < 2) return;

      let hrefs = anchors[1].split("/").slice(2);
      this.mode = this.getMapMode();
      let file = hrefs[hrefs.length - 1];
      let first;
      if (hrefs.length <= 3) {
        first = hrefs[hrefs.length - 3];
      }
      this.resetHtml(this.mode, file, first);
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
    changeTabBackground() {
      let tabs = document.getElementsByClassName('product-header');
      if(tabs && tabs.length > 0) {
        let tab = tabs[0];
        let mode = this.getMapMode();
        tab.style.backgroundImage = `url('../../../static/assets/tab/${mode}.png')`;
      }
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
          if (self.mode === "component") {
             self.mode = "组件";
          }
          if (self.mode === (temp[i].title).toLowerCase()) {
            self.asideContent = temp[i];
            break;
          }
        }
        self.asideMenu = self.asideContent.menus[0];
      });
    },
    /**
     * @rendered: markdown内容已渲染完毕时调用下面方法
     */
    markdownRendered() {
      this.isContentFinish = true;
      if (this.isTocFinish && this.isContentFinish) {
        this.initScroll();
      }
      this.$nextTick(() => {
        Prism.highlightAll();
      });
    },
    /**
     * @toc-rendered: toc目录渲染完成时调用下面方法
     */
    tocRendered() {
      this.isTocFinish = true;
      if (this.isTocFinish && this.isContentFinish) {
        this.initScroll();
      }
    }
  }
}
</script>

<style lang="scss">
.mapgis-product-wrapper {
  .mapgis-toc-class {
    ul {
      list-style-type: none;
      padding-left: 16px;
      margin: 8px 0px;
    }

    li {
      list-style-type: none;
      margin: 8px 0px;
    }

    a {
      color: #3f454d;
    }

    .active {
      border-left: 3px solid #000000;
      padding-left: 6px;
      color: #000000;
      font-weight: bold;
    }
  }
}

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

.header-menu-link {
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

.header-menu-col {
  padding: 5px 5px;
}

#develop-markdown-toc {
  width: fit-content;
}
</style>