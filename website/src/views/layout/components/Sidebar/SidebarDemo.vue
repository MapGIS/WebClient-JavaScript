<template>
  <div class="sidebar-demo-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-openeds="defaultOpeneds"
      :default-active="defaultActive"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleOpen"
    >
      <sidebar-item
        v-for="child in configList.childs"
        :key="child.name"
        :item="child"
        :route="true"
        :base-path="child.path"
        :type="configList.mapmode"
      ></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  components: {
    SidebarItem
  },
  props: {
    configList: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      defaultOpeneds: [],
      defaultActive: ''
    }
  },
  mounted () {
    let keys = this.$route.path.split('/');
    keys = keys.slice(3, keys.length);
    this.defaultOpeneds = keys;
    this.defaultActive = keys[keys.length - 1];
  },
  watch: {
    "$route.path" () {
      let anchors = location.href.split('#');
      if (!anchors || anchors.length < 2) return;

      // /demo/leaflet/client-view/vectortile/mapgisstyle
      let hrefs = anchors[1].split('/')
      if (hrefs.length < 4) return;

      let routers = hrefs.slice(3)
      let active = routers.splice(routers.length - 1)
      if (active.length > 0) active = active[0]
      else active = 'undefined'

      this.defaultOpeneds = routers;
      this.defaultActive = active;
    }
  },
  methods: {
    handleSelect (key) {
      let se = key;
      return se;
    },
    handleOpen (key) {
      let href = window.location.href; // .split("/");
      let newHref = href.replace('/demo', '/gallery');
      const mapmode = this.$route.params.mapmode;
      const first = this.$route.params.first;
      let match,matchIndex,baseUrl;
      if (this.$route.params.hasOwnProperty("second")){
        match = `/gallery/${mapmode}/${first}`;
        matchIndex = newHref.indexOf(match);
        match = `/gallery/${mapmode}#${first}`;
        baseUrl = newHref.slice(0,matchIndex);
        baseUrl = baseUrl + match;
      } else {
        match = `/gallery/${mapmode}`;
        matchIndex = newHref.indexOf(match);
        baseUrl = newHref.slice(0, matchIndex + match.length);
      }
      window.location.href = baseUrl + `#${key}`;
      return key;
    }
  }
};
</script>

<style lang="scss">
.sidebar-demo-wrapper {
  .el-menu {
        background: #f4f7fb;
    }
    .el-submenu .el-menu {
        border-left: 1px solid #C8CDD4;
        margin-left: 30px;
    }
    .el-menu-item {
        font-size: 12px;
        height: 36px !important;
        line-height: 36px !important;
        border-left: 7px solidrgba(49, 225, 230, 1);
    }
    .is-opened:first-child {
        // background: linear-gradient(90deg, rgba(71, 148, 250, 0.31), rgba(49, 225, 230, 0.31));
    }
    .el-menu-item:focus,
    .el-menu-item:hover {
        outline: 0;
        color: #ffffff;
        background: linear-gradient(90deg, rgba(71, 148, 250, 0.31), rgba(49, 225, 230, 0.31));
    }
    .el-menu-item.is-active {
        // background: linear-gradient(90deg, rgba(71, 148, 250, 0.31), rgba(49, 225, 230, 0.31));
        color: #3A85C6;
    }
    .el-menu-item {
        .is-active {
            color: #ffffff !important;
        }
    }
    .el-submenu .is-opened {
        // background: linear-gradient(90deg, rgba(71, 148, 250, 0.31), rgba(49, 225, 230, 0.31));
    }
    .el-submenu__title {
        padding-left: 20px !important;
    }
    .submenu-item-span {
        padding-left: 4px !important;
    }
    .el-submenu .el-menu-item {
        min-width: 156px;
    }
}
</style>