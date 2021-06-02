<template>
    <div class="webclient-detail-panel">
        <total-tab />
        <el-row type="flex" justify="center" class="banner">
            <el-col :span="mobile ? 23 : 18">
                <el-tabs tab-position="top" style="height: 100%">
                    <el-tab-pane :label="t.name" v-for="t in tabs" :key="t.name">
                        <Kind :data="t.data" />
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { isMobile } from '@/utils/mobile';
import { IGServer, ClientView, ClientAnalysis, ClientTheme, VectorTile, ElasticSearch, Spark } from './DetailConfig';
import TotalTab from '@/components/Tabs/TotalTab';
import Kind from '../../components/Table/Kind';

export default {
    components: {
        Kind,
        TotalTab
    },
    data() {
        return {
            mobile: isMobile(),
            tabs: [
                {
                    name: 'IGServer',
                    data: IGServer
                },
                {
                    name: '客户端可视化',
                    data: ClientView
                },
                {
                    name: '客户端分析',
                    data: ClientAnalysis
                },
                {
                    name: '客户端专题图',
                    data: ClientTheme
                },
                {
                    name: '矢量瓦片',
                    data: VectorTile
                },
                {
                    name: '弹性搜索',
                    data: ElasticSearch
                },
                {
                    name: '大数据分析',
                    data: Spark
                }
            ]
        };
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.banner {
    padding-top: 20px;
    text-align: center;

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
}
.webclient-detail-panel {
    margin: 0px 0px;
    margin-bottom: 30px;
}
</style>
