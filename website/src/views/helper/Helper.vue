<template>
  <el-container>
    <el-header
      style="padding:0px;"
      :class="{'webclient-three-header-mobile':mobile, 'webclient-three-header': true}"
    >
      <Header></Header>
    </el-header>
    <el-main class="webclient-three-layout">
      <vue-markdown
        :watches="['show','html','breaks','linkify','emoji','typographer']"
        :style="{padding: '20px 15vw'}"
        :source="markdown"
        :html="true"
        :toc="false"
        :linkify="true"
        @rendered="markdownRendered"
      ></vue-markdown>
      <el-backtop></el-backtop>
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
import { Header, MainFooter } from "@/views/layout/components";
import { isMobile } from "@/utils/mobile";
import VueMarkdown from "vue-markdown";
import Prism from "prismjs";
import axios from 'axios';

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
  },
  data () {
    return {
      mobile: isMobile(),
      markdown: "> `暂无说明`, 请检查改目录下的帮助说明是否存在",
    }
  },
  mounted () {
    this.getCurrentKind();
  },
  watch: {
    "$route.path" () {
      this.getCurrentKind();
    }
  },
  methods: {
    getCurrentKind () {
      let anchors = location.href.split("#");
      if (!anchors || anchors.length < 2) return;

      let file = anchors[anchors.length - 1];
      let mode = this.getMapMode();
      let first, second;
      if (anchors.length <= 4) {
        first = anchors[anchors.length - 2];
        second = undefined;
      } else {
        first = anchors[anchors.length - 3];
        second = anchors[anchors.length - 2];
      }

      this.resetHtml(mode, file, first, second);
    },
    getMapMode () {
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
    getHtmlUrl (type, image, first, second) {
      var baseUrl = "./static/demo/";
      var imageUrl = baseUrl + type + "/helper/" + first + "/";
      if (second !== undefined) {
        imageUrl = imageUrl + second + "/" + image + ".md";
      } else {
        imageUrl = imageUrl + image + ".md";
      }
      return imageUrl;
    },
    resetHtml (mode, file, first, second) {
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
    markdownRendered () {
      this.$nextTick(() => {
        Prism.highlightAll();
      });
    }
  },
}
</script>