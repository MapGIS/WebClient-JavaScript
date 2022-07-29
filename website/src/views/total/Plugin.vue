<template>
    <div class="webclient-plugin-wrapper">
        <plugin-tab />
        <div class="plugin-content">
            <el-row type="flex" justify="center" class="banner">
                <el-col :span="mobile ? 23 : 24">
                    <el-tabs type="" tab-position="top" style="height: 100%">
                        <el-tab-pane :label="t.name" v-for="t in tabs" :key="t.name">
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
import { isMobile } from '@/utils/mobile';
import PluginTable from '@/config/components/Table/Plugin';
import { Leaflet, MapboxGL, OpenLayers, Cesium } from './PluginConfig';
import PluginTab from '@/config/components/Tabs/PluginTab';

export default {
    components: {
        PluginTable,
        PluginTab
    },
    data() {
        return {
            menucheck: '1',
            mobile: isMobile(),
            tabs: [
                {
                    name: 'Leaflet',
                    data: Leaflet
                },
                {
                    name: 'MapboxGL',
                    data: MapboxGL
                },
                {
                    name: 'OpenLayers',
                    data: OpenLayers
                },
                {
                    name: 'Cesium',
                    data: Cesium
                }
            ]
        };
    },
    methods: {
        changeCheck(i) {
            this.menucheck = i;
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.banner {
    // padding-top: 20px;
    text-align: center;
}

.plugin-content {
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
            border: 1px solid #b0b9c8;
            background: #ffffff;
            transform: rotate(45deg);
        }

        &::after {
            content: ' ';
            position: absolute;
            left: calc(50% - 3px);
            top: 39px;
            width: 8px;
            height: 8px;
            background: linear-gradient(90deg, #4794fa, #31e1e6);
            transform: rotate(45deg);
        }
    }

    .el-tabs__item {
        height: 56px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #3c4858;

        &.is-active {
            color: #3a85c6;
        }
    }
}
</style>
