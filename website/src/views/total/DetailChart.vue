<template>
    <div class="webclient-detail-chart">
        <plugin-tab />
        <div class="detailchart-content">
            <div class="detailchart-title">统计各个模块的比例，难度以及树状结构</div>
            <el-row type="flex" justify="center" class="banner">
                <el-col :span="mobile ? 24 : 24">
                    <el-tabs type tab-position="top" style="height: 100%" v-model="mapmode">
                        <el-tab-pane :label="t.label" v-for="t in tabs" :key="t.name" :name="t.name"></el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
            <!-- <div class="detailchart-menu">
        <div @click="changeCheck('1')" :class="['detailchart-menuitem', menucheck=='1'?'detailchart-menuitem-check': '']">Leaflet</div>
        <div @click="changeCheck('2')" :class="['detailchart-menuitem', menucheck=='2'?'detailchart-menuitem-check': '']">Cesium</div>
        <div @click="changeCheck('3')" :class="['detailchart-menuitem', menucheck=='3'?'detailchart-menuitem-check': '']">MapboxGL</div>
        <div @click="changeCheck('4')" :class="['detailchart-menuitem', menucheck=='4'?'detailchart-menuitem-check': '']">OpenLayers</div>
      </div> -->
        </div>

        <el-row type="flex" justify="center" class="banner">
            <el-col :span="mobile ? 22 : 22">
                <v-chart :options="treemap" theme="ovilia-green" />
                <br />
                <v-chart :options="tree" />
                <br />
                <v-chart :options="sunburst" />
            </el-col>
        </el-row>
        <!-- <el-row type="flex">
      <el-col :offset="mobile ? 1 : 2">
        <h2>{{title}}</h2>
      </el-col>
    </el-row>

    <el-row type="flex">
      <el-col :offset="mobile ? 1 : 2">
        <h4>{{titledetail}}</h4>
      </el-col>
    </el-row>-->
    </div>
</template>

<script>
import { isMobile } from '@/utils/mobile';
import { initCube, initTree, initBar } from './config/ConfigEchart';
import PluginTab from '@/config/components/Tabs/PluginTab';

import ECharts from 'vue-echarts';
import 'echarts/theme/dark';
import 'echarts/lib/chart/treemap';
import 'echarts/lib/chart/tree';
import 'echarts/lib/chart/sunburst';

import theme from './config/theme.json';
ECharts.registerTheme('ovilia-green', theme);

import axios from 'axios';

export default {
    components: {
        'v-chart': ECharts,
        PluginTab
    },
    data() {
        return {
            menucheck: '1',
            mobile: isMobile(),
            title: '图表统计',
            titledetail: '统计各个模块的比例，难度以及树状结构',
            mapmode: 'leaflet',
            treemap: {},
            tree: {},
            sunburst: {},
            tabs: [
                {
                    name: 'leaflet',
                    label: 'LEAFLET'
                },
                {
                    name: 'cesium',
                    label: 'CESIUM'
                },
                {
                    name: 'mapboxgl',
                    label: 'MAPBOX GL'
                },
                {
                    name: 'openlayers',
                    label: 'OPENLAYERS'
                }
            ],
            optionscube: {
                leaflet: {},
                cesium: {},
                mapboxgl: {},
                openlayers: {}
            },
            optionstree: {
                leaflet: {},
                cesium: {},
                mapboxgl: {},
                openlayers: {}
            },
            optionsbar: {
                leaflet: {},
                cesium: {},
                mapboxgl: {},
                openlayers: {}
            }
        };
    },
    watch: {
        mapmode(next) {
            this.treemap = this.optionscube[next];
            this.tree = this.optionstree[next];
            this.sunburst = this.optionsbar[next];
        }
    },
    mounted() {
        const vm = this;
        const maps = ['leaflet', 'openlayers', 'cesium', 'mapboxgl'];
        const gets = maps.map((i) => {
            return axios.get(`./static/demo/config/config-${i}.json`);
        });
        Promise.all(gets).then(([l, o, c, m]) => {
            const leafletOptions = initCube(l.data, 'leaflet难度统计');
            const openlayersOptions = initCube(o.data, 'openlayers难度统计');
            const cesiumOptions = initCube(c.data, 'cesium难度统计');
            const mapboxglOptions = initCube(m.data, 'mapboxgl难度统计');
            const leafletOptions1 = initTree(l.data, 'leaflet功能统计');
            const openlayersOptions1 = initTree(o.data, 'openlayers功能统计');
            const cesiumOptions1 = initTree(c.data, 'cesium功能统计');
            const mapboxglOptions1 = initTree(m.data, 'mapboxgl功能统计');
            const leafletOptions2 = initBar(l.data, 'leaflet人员统计');
            const openlayersOptions2 = initBar(o.data, 'openlayers人员统计');
            const cesiumOptions2 = initBar(c.data, 'cesium人员统计');
            const mapboxglOptions2 = initBar(m.data, 'mapboxgl人员统计');

            vm.optionscube = {
                leaflet: leafletOptions,
                cesium: cesiumOptions,
                mapboxgl: mapboxglOptions,
                openlayers: openlayersOptions
            };
            vm.optionstree = {
                leaflet: leafletOptions1,
                cesium: cesiumOptions1,
                mapboxgl: mapboxglOptions1,
                openlayers: openlayersOptions1
            };
            vm.optionsbar = {
                leaflet: leafletOptions2,
                cesium: cesiumOptions2,
                mapboxgl: mapboxglOptions2,
                openlayers: openlayersOptions2
            };
            vm.treemap = vm.optionscube[vm.mapmode];
            vm.tree = vm.optionstree[vm.mapmode];
            vm.sunburst = vm.optionsbar[vm.mapmode];
        });
    },
    methods: {
        changeCheck(i) {
            this.menucheck = i;
            let next = 'leaflet';
            switch (i) {
                case '1':
                    next = 'leafleat';
                    break;
                case '2':
                    next = 'cesium';
                    break;
                case '3':
                    next = 'mapboxgl';
                    break;
                case '4':
                    next = 'openlayers';
                    break;
                default:
                    break;
            }
            this.treemap = this.optionscube[next];
            this.tree = this.optionstree[next];
            this.sunburst = this.optionsbar[next];
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detailchart-title {
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
.detailchart-content {
    padding: 0 10vw 36px 10vw;
    .detailchart-menu {
        position: relative;
        box-sizing: border-box;
        height: 40px;
        width: 100%;
        line-height: 36px;
        border-bottom: 1px solid #b0b9c8;
        white-space: nowrap;
        .detailchart-menuitem {
            display: inline-block;
            cursor: pointer;
            padding: 0 20px 0 20px;
            position: relative;
        }
    }

    .detailchart-menuitem-check {
        color: #3a85c6;
        position: relative;
    }
    .detailchart-menuitem-check::before {
        content: ' ';
        position: absolute;
        left: calc(50% - 5px);
        top: 33px;
        width: 10px;
        height: 10px;
        border: 1px solid #b0b9c8;
        background: #ffffff;
        transform: rotate(45deg);
    }
    .detailchart-menuitem-check::after {
        content: ' ';
        position: absolute;
        left: calc(50% - 2px);
        top: 37px;
        width: 6px;
        height: 6px;
        background: linear-gradient(90deg, #4794fa, #31e1e6);
        transform: rotate(45deg);
    }
}
.webclient-detail-chart {
    .echarts {
        // Mobile端
        width: 85vw;
        height: 700px;
        margin-left: 30px;
    }
    .banner {
        // padding-top: 20px;
        text-align: center;
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
