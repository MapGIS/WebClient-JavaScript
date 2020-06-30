<template>
  <el-container>
    <el-header style="padding:0px;height:72px;">
      <Header></Header>
    </el-header>
    <el-container>
      <el-drawer
        title="地图演示示例"
        :size="drawerSize"
        :visible.sync="drawerShow"
        direction="ltr"
        :show-close="false"
        v-if="mobile"
      >
        <el-scrollbar
          :noresize="true"
          class="element-scroll-content"
          wrapStyle="overflow-x: hidden;"
          viewStyle="overflow-y: hidden;"
        >
          <sidebar-gallery :config-list="config"></sidebar-gallery>
        </el-scrollbar>
      </el-drawer>
      <el-aside
        class="aside-scroll-content"
        width="280px"
        v-else
      >
        <el-scrollbar
          class="element-scroll-content"
          wrapStyle="overflow-x: hidden;"
          viewStyle="overflow-y: hidden;"
        >
          <sidebar-gallery :scrollActive="scrollActive" :config-list="config"/>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-main class="main-scroll-content">
          <div
            class="mobili-drawer-open"
            @click="handleDrawer"
            v-if="mobile"
          >
            <IconFont type="iconcollapseright" />
          </div>
          <el-scrollbar
            ref="componentScrollBar"
            class="element-scroll-content"
            wrapStyle="overflow-x: hidden;"
            viewStyle="overflow-x: hidden;display:grid;"
          >
            <el-backtop></el-backtop>
            <gallery-card :scrollActive="scrollActive" :config-list="config" />
            <el-footer :height="mobile?'300':'250'">
              <main-footer></main-footer>
            </el-footer>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios';
import { throttle } from "throttle-debounce";
import { isMobile } from "@/utils/mobile";

import { Header, SidebarGallery, MainFooter } from "@/views/layout/components";

import GalleryCard from "@/components/Gallery/GalleryCard";
import IconFont from "@/components/IconFont/iconfront";

export default {
  name: "Layout",
  components: {
    Header,
    MainFooter,
    SidebarGallery,
    GalleryCard,
    IconFont
  },
  data () {
    return {
      componentScrollBar: null,
      mobile: isMobile(),
      drawerSize: "60%",
      drawerShow: false,
      config: {},
      scrollActive: [],
    };
  },
  watch: {
    '$route' (to, from) {
      const vm = this;
      // 对路由变化作出响应...
      if (to.params.mapmode !== from.params.mapmode) {
        vm.initConfig();
      }
      const actives = to.hash.split('#');
      this.scrollActive = actives;
    },
    "$route.path" () {
      // 触发伪滚动条更新
      this.componentScrollBox.scrollTop = 0;
      this.$nextTick(() => {
        this.componentScrollBar.update();
      });
    }
  },
  methods: {
    renderAnchorHref () {
      if (/changelog/g.test(location.href)) return;
      const anchors = document.querySelectorAll("h2 a,h3 a,h4 a,h5 a");
      const basePath = location.href
        .split("#")
        .splice(0, 2)
        .join("#");
      [].slice.call(anchors).forEach(a => {
        const href = a.getAttribute("href");
        a.href = basePath + href;
      });
    },
    goAnchor () {
      let self = this;
      if (location.href.match(/#/g).length > 1) {
        const anchors = location.href.split("#");
        if (!anchors || anchors.length < 1) return;
        let anchor = "#" + anchors[anchors.length - 1];
        const elm = document.querySelector(anchor);
        if (!elm) return;
        
        setTimeout(() => {
          self.componentScrollBox.scrollTop = elm.offsetTop - 40;
          self.$forceUpdate();
        }, 100);
      }
    },
    handleScroll () {
      let scrollTop = this.componentScrollBox.scrollTop;

      if (this.showHeader !== this.scrollTop > scrollTop) {
        this.showHeader = this.scrollTop > scrollTop;
      }
      if (scrollTop === 0) {
        this.showHeader = true;
      }
      /* if (!this.navFaded) {
        bus.$emit("fadeNav");
      } */
      this.scrollTop = scrollTop;     
      scrollTop = scrollTop + 40; 
      for(let i = 0; i < this.heightHash.length - 1; i++){
        if (this.heightHash[i].height < scrollTop
          && this.heightHash[i+1].height > scrollTop) {
            let actives = []
            if (this.heightHash[i].parent) {
              actives.push(this.heightHash[i].parent.folder);
            }
            actives.push(this.heightHash[i].anchor);
            this.scrollActive = actives;
        }
      }
    },
    handleDrawer () {
      this.drawerShow = !this.drawerShow;
    },
    initHeights () {
      let hash = {};
      this.config.childs.forEach(c => {
        this.loopTree(c, hash);
      });
      this.heightHash = Object.keys(hash).map(k => {
        return {
          anchor: k,
          height: hash[k].height,
          parent: hash[k].parent,
        }
      }).sort((a, b) => a.height > b.height);
    },
    loopTree (node, hash, parent) {
      const elm = document.querySelector('#'+ node.folder);  
      if (elm) hash[node.folder] = {height: elm.offsetTop, parent: parent};
      if (!node.leaffolder && node.childs) {
          node.childs.forEach(c => {
            this.loopTree(c, hash, node)
          });
      }
    },
    initConfig (cb) {
      const vm = this;
      const mapmode = this.$route.params.mapmode
      let url;

      if (mapmode === 'mapboxgl') {
        url = './static/demo/config/config-mapboxgl.json';
      } else if (mapmode === 'cesium') {
        url = './static/demo/config/config-cesium.json';
      } else if (mapmode === 'openlayers') {
        url = './static/demo/config/config-openlayers.json';
      } else if (mapmode === 'leaflet') {
        url = './static/demo/config/config-leaflet.json';
      }
      axios.get(url).then(res => {
        vm.config = res.data;        
        vm.$forceUpdate();
        cb();
      });
    },
  },
  mounted () {
    const vm = this;
    this.componentScrollBar = this.$refs.componentScrollBar;    
    this.componentScrollBox = this.componentScrollBar.$el.querySelector(
      ".el-scrollbar__wrap"
    );
    this.throttledScrollHandler = throttle(300, this.handleScroll);
    this.componentScrollBox.addEventListener(
      "scroll",
      this.throttledScrollHandler
    );
    // this.renderAnchorHref();
    // this.goAnchor();
    document.body.classList.add("is-component");
    this.initConfig(() => {
      setTimeout(() => { vm.goAnchor(); vm.initHeights(); }, 100);
    });
  },
  destroyed () {
    document.body.classList.remove("is-component");
  },
  beforeDestroy () {
    this.componentScrollBox.removeEventListener(
      "scroll",
      this.throttledScrollHandler
    );
  },
  beforeRouteUpdate (to, from, next) {
    next();
    let vm = this;
    setTimeout(() => {
      const toPath = to.path;
      const fromPath = from.path;

      document.documentElement.scrollTop = document.body.scrollTop = 0;

      if (toPath === fromPath && to.hash) {
        vm.goAnchor();
        vm.initHeights();
      }
      if (toPath !== fromPath) {
        // document.documentElement.scrollTop = document.body.scrollTop = 0;
        // self.renderAnchorHref();
      }
    }, 100);
  },
};
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
.el-footer {
  padding: 0 0px;
}
.main-scroll-content {
  height: calc(100vh - 80px);
  /*   .el-scrollbar__view {
    overflow-y: hidden;
    display: grid !important;
  } */
}
.aside-scroll-content {
  height: calc(100vh - 80px);
  overflow-x: hidden;
}
.element-scroll-content {
  height: calc(100vh - 80px);
  overflow-x: hidden;
}
.el-main {
  padding: 0 6px;
}
.mobili-drawer-open {
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
</style>