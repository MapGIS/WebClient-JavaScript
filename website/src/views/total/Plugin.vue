<template>
  <div class="webclient-plugin-wrapper">
    <div class="overview-header">
      <div class="title">插件<span>PLUG-IN&nbsp;UNIT</span></div>
      <div class="overview-nav">
        <router-link to="/total/plugins">
          <div :class="['item',{select:$route.path === '/total/plugins'}]">
              插件列表
              <div class="triangle"></div>
          </div>
        </router-link>
        <router-link to="/total/detailChart">
          <div :class="['item',{select:$route.path === '/total/detailChart'}]">
              详细图表
              <div class="triangle"></div>
          </div>
        </router-link>
        <router-link to="/total/pluginTags">
          <div :class="['item',{select:$route.path === '/total/pluginTags'}]">
              插件标签
              <div class="triangle"></div>
          </div>
        </router-link>
        <router-link to="/total/bugCommit">
          <div :class="['item',{select:$route.path === '/total/bugCommit'}]">
              提交bug
              <div class="triangle"></div>
          </div>
        </router-link>
        <router-link to="/total/other">
          <div :class="['item',{select:$route.path === '/total/other'}]">
              其他
              <div class="triangle"></div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="plugin-content">
      <el-row
        type="flex"
        justify="center"
        class="banner"
      >
        <el-col :span="mobile ? 23 : 24">
          <el-tabs
            type=""
            tab-position='top'
            style="height: 100%;"
          >
            <el-tab-pane
              :label="t.name"
              v-for="t in tabs"
              :key="t.name"
            >
              <PluginTable :data="t.data" />
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <!-- <div class="plugin-menu">
        <div @click="changeCheck('1')" :class="['plugin-menuitem', menucheck=='1'?'plugin-menuitem-check': '']">Leaflet</div>
        <div @click="changeCheck('2')" :class="['plugin-menuitem', menucheck=='2'?'plugin-menuitem-check': '']">MapboxGL</div>
        <div @click="changeCheck('3')" :class="['plugin-menuitem', menucheck=='3'?'plugin-menuitem-check': '']">OpenLayers</div>
        <div @click="changeCheck('4')" :class="['plugin-menuitem', menucheck=='4'?'plugin-menuitem-check': '']">Cesium</div>
      </div>
        <div v-for="(t,i) in tabs" :key="t.name">
          <PluginTable :data="t.data" v-if="menucheck==i+1"/>
        </div> -->
    </div>
  </div>
</template>

<script>
import { isMobile } from "@/utils/mobile";
import PluginTable from '../../components/Table/Plugin';
import { Leaflet, MapboxGL, OpenLayers, Cesium } from './PluginConfig';

export default {
  components: {
    PluginTable,
  },
  data () {
    return {
      menucheck: '1',
      mobile: isMobile(),
      tabs: [
        {
          name: 'Leaflet',
          data: Leaflet,
        },
        {
          name: 'MapboxGL',
          data: MapboxGL,
        },
        {
          name: 'OpenLayers',
          data: OpenLayers,
        },
        {
          name: 'Cesium',
          data: Cesium,
        }
      ]
    }
  },
  methods: {
    changeCheck(i) {
      this.menucheck = i
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.banner {
  // padding-top: 20px;
  text-align: center;
}
.overview-header {
  width: 100%;
  height: 240px;
  background-image: url('../../../public/static/assets/total/totallogo.png');
  background-size: 100% 240px;

  .title {
      height: 176px;
      font-size: 30px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      font-style: italic;
      color: #ffffff;
      line-height: 176px;
      margin-left: 130px;

      span {
          margin-left: 15px;
          color: rgba(255, 255, 255, 0.3);
      }
  }

  .overview-nav {
      display: flex;
      height: 64px;
      padding: 0 10vw;
      background-color: rgba(255, 255, 255, 0.13);
      box-shadow: -1px 4px 8px 0px rgba(0, 0, 0, 0.1);

      a {
          flex: 1;

          .item {
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #ffffff;
              line-height: 64px;
              text-align: center;

              &.select {
                  background-color: rgba(255, 255, 255, 0.14);

                  .triangle {
                      width: 0;
                      height: 0;
                      margin: -20px auto 0;
                      border-top: 10px solid transparent;
                      border-left: 10px solid transparent;
                      border-right: 10px solid transparent;
                      border-bottom: 10px solid #ffffff;
                  }
              }
          }
      }
  }
}
.plugin-content{
  min-height: 70vh;
  padding: 36px 10vw;
}
::v-deep .el-tabs__nav-wrap {
      &::after {
        bottom: 12px;
      }

      .el-tabs__active-bar {
        width: 0;
        height: 0;
        position: relative;

      &::before {
          content: ' ';
          position: absolute;
          left: calc(50% - 8px);
          top: 34px;
          width: 16px;
          height: 16px;
          border: 1px solid #B0B9C8;
          background: #FFFFFF;
          transform: rotate(45deg);
      }

      &::after {
        content: ' ';
        position: absolute;
        left: calc(50% - 3px);
        top: 39px;
        width: 8px;
        height: 8px;
        background: linear-gradient(90deg, #4794FA, #31E1E6);
        transform: rotate(45deg);
      }
      }

      .el-tabs__item {
        height: 56px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #3C4858;

      &.is-active {
        color: #3A85C6;
      }
      }
    }
</style>