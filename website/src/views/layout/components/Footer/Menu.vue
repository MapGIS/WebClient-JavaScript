<template>
  <div
    class="footer-menu-wrapper"
    :class="{'footer-menu-wrapper-mobile': mobile}"
  >
    <div
      class="footer-menu-col"
      v-for="menu in menus"
      :key="menu.title"
    >
      <span :class="{strong: strong, 'light-title': light, title: true}">
        {{menu.title}}
      </span>
      <el-divider v-if="divider"></el-divider>
      <p v-else />
      <div
        class="footer-menu-links"
        v-for="(link, i) in menu.links"
        :key="i"
      >
        <div
          class="footer-menu-link"
          v-for="(l, j) in link"
          :key="j"
        >
          <a
            v-if="isLink(menu.routes[i][j])"
            :href="menu.routes[i][j]"
            target="_blank"
          >
            <span :class="{'light-subtitle': light}">{{l}}</span>
          </a>
          <a
            v-else-if="isDocs(menu.routes[i][j])"
            :href="menu.routes[i][j]"
          >
            <span :class="{'light-subtitle': light}">{{l}}</span>
          </a>
          <router-link
            v-else
            :to="menu.routes[i][j]"
          >
            <span :class="{'light-subtitle': light}">{{l}}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isMobile } from "@/utils/mobile";

export default {
  name: 'HeaderMenu',
  props: {
    title: {
      type: String,
    },
    menus: {
      type: Array,
    },
    divider: {
      type: Boolean,
      default: true,
    },
    strong: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      mobile: isMobile(),
    };
  },
  methods: {
    isLink (link) {
      if (link.indexOf('http') >= 0) {
        return true;
      }
      return false;
    },
    isDocs (link) {
      if (link.indexOf('docs') >= 0) {
        return true;
      }
      return false;
    }
  },
}
</script>

<style lang="scss">
.footer-menu-wrapper-mobile {
  .footer-menu-link {
    width: 120px !important;
  }
}
.footer-menu-wrapper {
  display: flex;
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 16px 0;
  }
  .footer-menu-col {
    margin: 19px 30px;
    width: fit-content;
    height: fit-content;
    .title {
      letter-spacing: 3px;
      font-size: 16px;
    }
    span {
      margin-left: 10px;
      width: 60px;
      height: 14px;
      font-size: 13px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
      line-height: 30px;
    }
  }
  .strong {
    font-weight: bold !important;
  }
  .light-title {
    color: #ffffff !important;
  }
  .light-subtitle {
    color: #ffffff88 !important;
  }
  .light-subtitle:hover {
    font-weight: bold;
    color: #ffffff !important;
  }
  .footer-menu-links {
    display: inherit;
    float: left;
    height: fit-content;
  }
  .footer-menu-link {
    width: 160px;
    height: 30px;
    span {
      margin-left: 10px;
      width: 61px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 30px;
    }
  }
  .footer-menu-link:hover {
    width: 160px;
    height: 30px;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>
