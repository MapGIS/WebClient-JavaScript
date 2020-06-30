<template>
  <div class="sidebar-gallery-wrapper">
    <el-menu
      mode="vertical"
      :collapse="false"
      :default-openeds="defaultOpeneds"
      :default-active="defaultActive"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleOpen"
    >
      <sidebar-item
        v-for="child in configList.childs"
        :key="child.name"
        :active="defaultActive"
        :item="child"
        :base-path="child.path"
        :type="configList.mapmode"
      ></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem";

export default {
  components: {
    SidebarItem
  },
  props: {
    configList: {
      type: Object,
      required: true
    },
    scrollActive: Array,
  },
  data () {
    return {
      defaultOpeneds: [],
      defaultActive: ''
    }
  },
  computed: {},
  watch: {
    scrollActive (next) {
      this.defaultOpeneds = next;
      this.defaultActive = next.length > 0 ? next[next.length - 1] : '';
    }
  },
  mounted () {
    const keys = window.location.href.split('#');
    const anchors = keys.slice(2, keys.length);
    this.defaultOpeneds = anchors;
    this.defaultActive = anchors[anchors.length - 1];
  },
  methods: {
    handleSelect (key) {
      /* var href = window.location.href.split("#");
      var localte = "/" + key.replace('#', '/');
      if (href.length >= 2) {
        let newHref = href[0] + "#" + href[1].replace('gallery', 'demo') + localte;
        window.location.href = newHref;
      } */
      return key;
    },
    handleOpen (key) {
      var href = window.location.href.split("#");
      var localte = "#" + key;
      if (href.length >= 2) {
        let newHref = href[0] + "#" + href[1] + localte;
        window.location.href = newHref;
      }
    }
  }
};
</script>

<style lang="scss">
.sidebar-gallery-wrapper {
  .el-menu {
    background: #f4f7fb;
  }
  .el-menu-item {
    border-left: 7px solidrgba(49, 225, 230, 1);
  }
  .is-opened:last-child  {
    background: linear-gradient(
      90deg,
      rgba(71, 148, 250, 1),
      rgba(49, 225, 230, 1));
    // .el-submenu__title{  
  }
  /* .el-menu-item .is-active {
    border-left: 4px solid #409eff;
  } */
  // .el-submenu:hover,
  .el-menu-item:focus,
  .el-menu-item:hover {
    outline: 0;
    color: #ffffff;
    background: linear-gradient(
      90deg,
      rgba(71, 148, 250, 1),
      rgba(49, 225, 230, 1)
    );
  }
  .el-menu-item.is-active {
    background: linear-gradient(
      90deg,
      rgba(71, 148, 250, 1),
      rgba(49, 225, 230, 1)
    );
    color: #ffffff;
  }
  .el-menu-item {
    .is-active {
      color: #ffffff !important;
    }
  }
}
</style>