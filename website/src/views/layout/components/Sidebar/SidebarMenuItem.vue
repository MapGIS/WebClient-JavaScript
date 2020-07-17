<template>
  <router-link :to="linkUrl">
    <el-menu-item
      class="submenu-item-span"
      v-if="child.name"
      :key="child.file"
      :index="child.file"
    >
      <div class="menu-item-left">
        <IconFont
          v-if="child&&child.diffcult"
          class="icon"
          :type="getDiffIcon(child.diffcult)"
        ></IconFont>
      </div>
      <div class="menu-item-right">
        <span
          v-if="child.name"
          slot="title"
        >{{child.name}}</span>
      </div>
    </el-menu-item>
  </router-link>
  <!-- <div v-else>
    <el-menu-item class="submenu-item-span" v-if="child.name" 
      :key="child.file" :index="child.file">
      <div class="menu-item-left">
        <IconFont v-if="child&&child.diffcult" class="icon" :type="getDiffIcon(child.diffcult)"></IconFont>
      </div>
      <div class="menu-item-right">
        <span v-if="child.name" slot="title">{{child.name}}</span>
      </div>
    </el-menu-item>
  </div> -->
</template>

<script>
import IconFont from "@/components/IconFont/iconfront";
export default {
  name: "card-view",
  components: {
    IconFont
  },
  data () {
    return {
      linkUrl: this.getLinkUrl(
        this.type,
        this.file,
        this.firstkind,
        this.secondkind
      )
    };
  },
  props: {
    route: {
      type: Boolean,
      default: false
    },
    child: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    firstkind: {
      type: String
    },
    secondkind: {
      type: String
    },
    file: {
      type: String,
      required: true
    }
  },
  methods: {
    getLinkUrl (type, file, firstkind, secondkind) {
      var baseUrl = "/demo/" + type + "/" + firstkind + "/";
      if (secondkind !== undefined) {
        baseUrl = baseUrl + secondkind + "/" + file;
      } else {
        baseUrl += file;
      }
      return baseUrl;
    },
    getLinkObject (type, file, firstkind, secondkind) {
      var baseUrl = "/demo/" + type + "/" + firstkind + "/";
      if (secondkind !== undefined) {
        baseUrl = baseUrl + secondkind + "/" + file;
      } else {
        baseUrl += file;
      }
      let route = { path: baseUrl };
      return route;
    },
    getDiffIcon (diffcult) {
      let icon = "iconstar1-vue";
      if (diffcult == 1) {
        icon = "iconstar1-vue";
      } else if (diffcult == 2) {
        icon = "iconstar2-vue";
      } else if (diffcult == 3) {
        icon = "iconstar3-vue";
      } else if (diffcult == 4) {
        icon = "iconstar4-vue";
      } else if (diffcult == 5) {
        icon = "iconstar5-vue";
      }
      icon = '';
      return icon;
    }
  }
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
.submenu-item-span {
  width: 100%;
  display: flex;
  .menu-item-row {
    width: 100%;
    height: 100%;
  }

  .menu-item-left {
    float: left;
    margin-left: 0px;
  }

  .menu-item-right {
    float: right;
    margin-right: 0px;
  }
  .icon {
    // float: left;
    width: 1.5em;
    height: 1.5em;
    margin-top: 0px;
    margin-right: 8px;
  }
}
</style>