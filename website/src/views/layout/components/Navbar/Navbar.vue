<template>
  <el-menu
    class="navbar"
    :router="true"
    mode="horizontal"
    :unique-opened="true"
    :default-active="active"
    :collapse-transition="true"
  >
    <el-menu-item
      class="left-menu-item"
      v-if="!mobile"
      index="/"
    >
      <a href="/" class="mapgis-logo-name">
        <img
          class="logo-svg"
          :src="logo"
        />
        MapGIS WebClient
      </a>
    </el-menu-item>
    <a
      href="/"
      v-else
    >
      <img
        class="logo-svg-mobile"
        :src="logomobile"
        index="logo"
      />
    </a>

    <el-submenu
      class="right-menu-item"
      :index="sub.index"
      v-for="(sub, k) in navs"
      :key="k"
    >
      <template
        slot="title"
        class="title_mobile"
        v-if="mobile"
      >
        <IconFont
          :type="sub.type"
          :name="emptyLabel"
        />
      </template>
      <template
        slot="title"
        class="title_mobile"
        v-else
      >
        <IconFont
          :type="sub.type"
          :name="sub.name"
        />
      </template>

      <div
        v-for="(item, key1) in sub.list"
        :key="key1"
      >
        <el-submenu
          v-if="item.list"
          :index="item.index"
        >
          <template slot="title">
            <IconFont
              :type="item.type"
              :name="item.name"
            />
          </template>
          <el-menu-item
            v-for="(i, key2) in item.list"
            :index="i.index"
            :key="key2"
          >
            <a
              :href="i.href"
              v-if="i.href"
            >
              <IconFont
                :type="i.type"
                :name="i.name"
              />
            </a>
            <IconFont
              v-else
              :type="i.type"
              :name="i.name"
            />
          </el-menu-item>
        </el-submenu>

        <el-menu-item
          v-else
          :index="item.index"
        >
          <a
            :href="item.href"
            v-if="item.href"
          >
            <IconFont
              :type="item.type"
              :name="item.name"
            />
          </a>
          <IconFont
            v-else
            :type="item.type"
            :name="item.name"
          />
        </el-menu-item>
      </div>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import IconFont from "@/config/components/IconFont/iconfront";
// import NavbarItem from "./NavbarItem";

import { isMobile } from "@/utils/mobile";
import { getNavs } from "./navs.js";

export default {
  components: {
    IconFont
    // NavBarItem: NavbarItem
  },
  data () {
    return {
      logo: "./static/assets/logo/logo-mapgis.svg",
      logomobile: "./static/assets/logo/logo-mobile.svg",
      emptyLabel: " ",
      active: "",
      mobile: isMobile(),
      navs: getNavs()
    };
  },
  watch: {
    '$route' (to) {
      // 对路由变化作出响应...
      if (to.params.mapmode) {
        this.active = "/gallery/" + to.params.mapmode;
      } else {
        // this.active = 
      }
    },
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch("ToggleSideBar");
    },
    logout () {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    }
  }
};
</script>

<style lang="less" scoped>
.navbar {
  height: 60px;
  padding: 0 20px;
  border-radius: 0px !important;

  .el-submenu__title {
    font-size: 14px;
    color: #409eff;
    padding: 0 0px;
    cursor: pointer;
    -webkit-transition: border-color 0.3s, background-color 0.3s, color 0.3s;
    transition: border-color 0.3s, background-color 0.3s, color 0.3s;
    box-sizing: border-box;
  }

  .left-menu-item {
    float: left;
  }

  .right-menu-item {
    float: right;
  }

  .breadcrumb-container {
    float: left;
  }

  .logo-svg {
    width: 60px;
    height: 32px;
    margin-top: -4px;
  }

  .mapgis-logo-name {
    font-size: 20px;
    color: #303133;
  }

  .logo-svg-mobile {
    width: 30px;
    height: 30px;
    vertical-align: -0.25em;
    margin-top: 14px;
  }
}
</style>