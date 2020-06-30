<template>
  <div class="header-submenu-wrapper">
    <el-tabs
      :value="active"
      tab-position="left"
      style="height: 240px;width:100%;"
    >
      <el-tab-pane
        v-for="menu in menus"
        :key="menu.title"
        :label="menu.title.toLocaleLowerCase()"
        :name="menu.title.toLocaleLowerCase()"
      >
        <Menu :menus="menu.menus" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Menu from './Menu';

export default {
  name: 'HeaderMenu',
  components: {
    Menu,
  },
  props: {
    active: {
      type: String,
      default: 'cesium',
    },
    title: {
      type: String,
    },
    menus: {
      type: Array,
    },
  }
}
</script>

<style lang="scss">
.header-submenu-wrapper {
  .el-tabs__item {
    padding: 0 20px;
    height: 40px;
    box-sizing: border-box;
    // line-height: 40px;
    display: inline-block;
    list-style: none;
    // font-size: 14px;
    // font-weight: 500;
    // color: #303133;
    position: relative;

    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 40px;
  }
  .el-tabs__item.is-active {
    color: #33dbe8;
  }
  .el-tabs__item:hover {
    color: #33dbe8;
  }
  .el-tabs__active-bar {
    background-color: #33dbe8;
  }
}
</style>
