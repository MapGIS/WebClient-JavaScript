<template>
    <div class="webclient-plugin-list">
        <plugin-tab />
        <div class="plugintags-content">
            <div class="plugintags-title">各个插件 include-xxx-local.lib的include标签以及说明文件</div>
            <el-row type="flex" justify="center" class="banner">
                <el-col :span="mobile ? 23 : 24">
                    <el-tabs type tab-position="top" style="height: 100%; width: 100%">
                        <el-tab-pane :label="t.label" v-for="t in tabs" :key="t.name">
                            <plugin-card :list="tags[t.name]" />
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
            <!-- <div class="plugintags-menu">
        <div @click="changeCheck('1')" :class="['plugintags-menuitem', menucheck=='1'?'plugintags-menuitem-check': '']">INCLUDE-LEAFLET.JS</div>
        <div @click="changeCheck('2')" :class="['plugintags-menuitem', menucheck=='2'?'plugintags-menuitem-check': '']">INCLUDE-MAPBOX.JS</div>
        <div @click="changeCheck('3')" :class="['plugintags-menuitem', menucheck=='3'?'plugintags-menuitem-check': '']">INCLUDE-OPENLAYERS5.JS</div>
        <div @click="changeCheck('4')" :class="['plugintags-menuitem', menucheck=='4'?'plugintags-menuitem-check': '']">INCLUDE-CESIUM.JS</div>
        <div @click="changeCheck('5')" :class="['plugintags-menuitem', menucheck=='5'?'plugintags-menuitem-check': '']">INCLUDE-LIB.JS</div>
      </div>
      <div  v-for="(t, i) in tabs" :key="t.name">
        <plugin-card v-if="menucheck==i+1" :list="tags[t.name]"/>
      </div> -->
        </div>
    </div>
</template>

<script>
import { isMobile } from '@/utils/mobile';
import { Tags } from './PluginConfig';
import PluginCard from '@/config/components/Card/PluginCard';
import PluginTab from '@/config/components/Tabs/PluginTab';

export default {
    components: { PluginCard, PluginTab },
    data() {
        return {
            menucheck: '1',
            mobile: isMobile(),
            title: '插件标签以及说明',
            titledetail: '各个插件 include-xxx-local.lib的include标签以及说明文件',
            tags: Tags,
            tabs: [
                {
                    name: 'Leaflet',
                    label: 'INCLUDE-LEAFLET.JS'
                },
                {
                    name: 'Mapbox',
                    label: 'INCLUDE-MAPBOX.JS'
                },
                {
                    name: 'Openlayers',
                    label: 'INCLUDE-OPENLAYERS5.JS'
                },
                {
                    name: 'Cesium',
                    label: 'INCLUDE-CESIUM.JS'
                },
                {
                    name: 'Lib',
                    label: 'INCLUDE-LIB.JS'
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
.webclient-plugin-list {
    //  margin: 30px 0px;
    .el-card {
        width: 80vw;
        display: inline-block;
        margin: 0.3em;
        border-radius: 20px;
    }
    .banner {
        // padding-top: 20px;
        text-align: left;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: '';
    }
    .clearfix:after {
        clear: both;
    }
}
.plugintags-title {
    margin: 48px 0 24px 0;
    width: 100%;
    background: #eeeeee;
    text-indent: 17px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    line-height: 70px;
}
.plugintags-content {
    padding: 0 10vw 36px 10vw;
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
