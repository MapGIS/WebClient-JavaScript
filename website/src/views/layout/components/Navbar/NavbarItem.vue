<template>
  <el-submenu class="right-menu-item" :index="index">
    <template slot="title" class="title_mobile" v-if="mobile">
      <IconFont :type="type" :name="emptyLabel"/>
    </template>
    <template slot="title" class="title_mobile" v-else>
      <IconFont :type="type" :name="name" />
    </template>

    <div v-for="(item, key1) in list" :key="key1">
      <el-submenu v-if="item.list" :index="item.index">
        <template slot="title">
          <IconFont :type="item.type" :name="item.name" />
        </template>
        <el-menu-item v-for="(i, key2) in item.list" :index="i.index" :key="key2">
          <a :href="i.href" v-if="i.href">
            <IconFont :type="i.type" :name="i.name" />
          </a>
          <IconFont v-else :type="i.type" :name="i.name" />
        </el-menu-item>
      </el-submenu>

      <el-menu-item v-else :index="item.index">
        <a :href="item.href" v-if="item.href">
          <IconFont :type="item.type" :name="item.name" />
        </a>
        <IconFont v-else :type="item.type" :name="item.name" />
      </el-menu-item>
    </div>
  </el-submenu>
</template>

<script>
import IconFont from "@/components/IconFont/iconfront";
import { isMobile } from "@/utils/mobile";

export default {
  name: "navbaritem",
  components: {
    IconFont
  },
  props: {
    name: String,
    type: String,
    index: String,
    list: Array
  },
  data() {
    return {
      mobile: isMobile(),
      emptyLabel : ""
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.right-menu-item {
  float: right;
}

a {
  color: #3A85C6;
  text-decoration: none;
}

.zondy-sub-menu {
  // width: 100px;
}
</style>