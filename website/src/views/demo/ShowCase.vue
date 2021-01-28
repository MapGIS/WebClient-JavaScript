<template>
  <el-container :class="{'webclient-showcase-main': true, 'webclient-showcase-main-mobile' : mobile}">
    <el-header
      v-if="!fullScreen"
      style="height:72px;"
      :class="{'mapgis-header': !mobile, 'mapgis-header-mobile': mobile}"
    >
      <transition name="bounce">
        <Header></Header>
      </transition>
    </el-header>
    <el-container>
      <el-drawer
        title="示例分类"
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
          <sidebar-demo
            class="sidebar-container"
            :config-list="config"
          ></sidebar-demo>
        </el-scrollbar>
      </el-drawer>
      <el-aside
        class="aside-scroll-content"
        width="220px"
        v-if="!fullScreen && !mobile"
      >
        <el-scrollbar
          :noresize="true"
          class="element-scroll-content"
          wrapStyle="overflow-x: hidden;"
          viewStyle="overflow-y: hidden;"
        >
          <transition name="bounce">
            <sidebar-demo
              class="sidebar-container"
              :config-list="config"
            ></sidebar-demo>
          </transition>
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
          <transition name="bounce">
            <ShowGallery
              v-if="currentKind.length > 0 && !fullScreen"
              :list="currentKind"
            />
          </transition>
          <router-view
            class="main-demo-wrapper"
            :fullscreen="fullScreen"
            @handleFullscreen="handleFullscreen"
          >
          </router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-footer
      v-if="false"
      :height="mobile?'300':'250'"
    >
      <main-footer></main-footer>
    </el-footer>
  </el-container>
</template>

<script>
import axios from 'axios';
import { Header, SidebarDemo, MainFooter } from "@/views/layout/components";
import ShowGallery from "./ShowGallery";
import IconFont from "@/components/IconFont/iconfront";
import { isMobile } from "@/utils/mobile";

export default {
  name: "layout",
  components: {
    Header,
    MainFooter,
    SidebarDemo,  //边栏展示
    IconFont,
    ShowGallery
  },
  data () {
    return {
      currentKind: this.getCurrentKind(),
      defaultOpeneds: [],
      defaultActive: "",
      mobile: isMobile(),
      drawerSize: "60%",
      drawerShow: false,
      fullScreen: false,
      config: {}
    };
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      if (to.params.mapmode !== from.params.mapmode) {
        this.initConfig();
      }
    },
    "$route.path" () {
      this.getCurrentKind();
    }
  },
  computed: {},
  mounted () {
    this.initConfig();
  },
  methods: {
    handleFullscreen (fullscreen) {
      this.fullScreen = fullscreen;
      if (fullscreen && this.mobile) {
        var mobileContent = document.getElementsByClassName("main-demo-wrapper");
        if (mobileContent.length > 0) {
          mobileContent[0].style.height = window.innerHeight - 20 + 'px';
        }
      }
    },
    handleDrawer () {
      this.drawerShow = !this.drawerShow;
    },
    getCurrentKind () {
      let anchors = location.href.split("#");
      if (!anchors || anchors.length < 2) return;

      let hrefs = anchors[1].split("/");
      if (hrefs.length < 4) return;

      let routers = hrefs.slice(3);
      if (!routers) return;

      let index = routers.length > 2 ? 1 : 0;
      let kind = routers[index];

      this.defaultOpeneds = [routers[0]];
      this.defaultActive = routers[1];

      if (!this.config) return [];

      let length = this.config.childs.length;
      for (let i = 0; i < length; i++) {
        let first = this.config.childs[i];
        if (first.folder === kind) {
          this.currentKind = first.childs;
          return first.childs;
        }
        if (!first.folder) continue;
        let length2 = first.childs.length;
        for (let j = 0; j < length2; j++) {
          let second = first.childs[j];
          if (second.folder === kind) {
            this.currentKind = second.childs;
            return second.childs;
          }
        }
      }
      this.currentKind = [];
      return [];
    },
    async initConfig () {
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
      } else {
        url = `./static/demo/config/config-${mapmode}.json`;
      }
      let res = await axios.get(url);
      this.config = res.data;
      this.getCurrentKind();
      return res.data;
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.webclient-showcase-main-mobile {
  .main-demo-wrapper {
    margin-left: 0px !important;
    height: calc(100vh - 155px) !important;
  }
  .main-scroll-content {
    overflow-y: hidden;
    padding: 6px !important;
  }
  .mapgis-header-mobile {
    padding: 0px !important;
    height: 48px !important;
  }
}
.webclient-showcase-main {
/*   .mapgis-header {
    padding: 0px;
    height: 72px;
  } */
  .el-footer {
    padding: 0 0px;
  }

  .main-demo-wrapper {
    margin-left: 10px;
  }

  .aside-scroll-content {
    .element-scroll-content {
      /* padding-left: 79px;
    padding-right: 30px;
    padding-top: 20px;
    padding-bottom: 30px; */
    }

    /*   .el-scrollbar__wrap {
    overflow: scroll;
    height: 100%;
  } */

    .element-scroll-content {
      height: calc(100vh - 72px);
      overflow-x: hidden;
      overflow-y: hidden;
    }
  }

  .main-scroll-content {
    overflow-y: hidden;
    padding: 10px;
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
  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>