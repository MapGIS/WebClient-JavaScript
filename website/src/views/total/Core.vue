<template>
    <div class="webclient-core-wrapper">
        <total-tab />
        <el-row type="flex" justify="center" class="banner">
            <el-col :span="mobile ? 22 : 18">
                <el-image class="framework-style-image" :src="framework" :preview-src-list="frameworks"> </el-image>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" class="banner">
            <el-col :span="mobile ? 22 : 18">
                <el-tabs tab-position="top" style="height: 100%">
                    <el-tab-pane label="DataStore">
                        <el-table
                            :data="datastore"
                            border
                            stripe
                            style="width: 100%"
                            header-cell-style="background-color: #F5F7FA;font-size: 14px;font-family: Microsoft YaHei;font-weight: bold;color: #606266;"
                        >
                            <el-table-column type="index" label="序号" width="60"> </el-table-column>
                            <el-table-column prop="func" label="功能"> </el-table-column>
                            <el-table-column prop="detail" label="说明"> </el-table-column>
                            <el-table-column prop="url" label="Url地址"> </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="DataAnalysis">
                        <el-table
                            :data="dataanalysis"
                            border
                            stripe
                            style="width: 100%"
                            header-cell-style="background-color: #F5F7FA;font-size: 14px;font-family: Microsoft YaHei;font-weight: bold;color: #606266;"
                        >
                            <el-table-column type="index" label="序号" width="60"> </el-table-column>
                            <el-table-column prop="func" label="功能"> </el-table-column>
                            <el-table-column prop="detail" label="说明"> </el-table-column>
                            <el-table-column prop="url" label="Url地址"> </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="DataView">
                        <el-table
                            :data="dataview"
                            border
                            stripe
                            style="width: 100%"
                            header-cell-style="background-color: #F5F7FA;font-size: 14px;font-family: Microsoft YaHei;font-weight: bold;color: #606266;"
                        >
                            <el-table-column type="index" label="序号" width="60"> </el-table-column>
                            <el-table-column prop="func" label="功能"> </el-table-column>
                            <el-table-column prop="detail" label="说明"> </el-table-column>
                            <el-table-column prop="url" label="环境依赖"> </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="IgServer">
                        <el-table
                            :data="igserver"
                            border
                            stripe
                            style="width: 100%"
                            header-cell-style="background-color: #F5F7FA;font-size: 14px;font-family: Microsoft YaHei;font-weight: bold;color: #606266;"
                        >
                            <el-table-column type="index" label="序号" width="60"> </el-table-column>
                            <el-table-column prop="func" label="功能"> </el-table-column>
                            <el-table-column prop="detail" label="说明"> </el-table-column>
                            <el-table-column prop="url" label="环境依赖"> </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { isMobile } from '@/utils/mobile';
import TotalTab from '@/components/Tabs/TotalTab';

export default {
    components: { TotalTab },
    data() {
        return {
            mobile: isMobile(),
            framework: './static/assets/logo/framework.png',
            frameworks: ['./static/assets/logo/framework.png'],
            datastore: [
                {
                    func: '创建大数据存储-Windows',
                    detail: '创建大数据存储window版本（postgresql、ES集群、mongoDB集群）',
                    url: '无说明'
                },
                {
                    func: '创建大数据存储-Linux',
                    detail: '创建大数据存储linux版本（postgresql、ES集群、mongoDB集群、hdfs集群）',
                    url: '无说明'
                },
                {
                    func: '数据导入',
                    detail: 'MapGisDataStore数据导入工具',
                    url: '无说明'
                },
                {
                    func: '数据管理',
                    detail: 'MapGisDataStores数据管理（数据目录、数据预览、词典上传（ES）、文件操作（hdfs））',
                    url: '无说明'
                },
                {
                    func: '时空查询功能',
                    detail: '根据空间、时间、ID列表、其它属性条件进行分页查询',
                    url: '/es/stQuery?'
                },
                {
                    func: '时空聚合统计功能',
                    detail: '	根据空间、时间、其它属性条件以及聚合条件（sum、max、min、average等）进行聚合查询',
                    url: '/es/stQueryByAgg?'
                },
                {
                    func: '时空聚合查询功能（GeoHash聚合）',
                    detail: '根据空间、时间、其它属性条件对指定属性字段的值进行GeoHash聚合',
                    url: '/es/stGeoHashQueryByAgg?'
                },
                {
                    func: '	地理围栏功能',
                    detail: '根据空间围栏、时间、属性围栏条件进行查询返回结果确定对象是否在围栏内',
                    url: '/es/GeoEnclosureQuery?'
                }
            ],
            dataanalysis: [
                {
                    func: '拷贝数据任务',
                    detail: '拷贝数据任务提交接口',
                    url: '/analysticservice/job/copyData/submit?'
                },
                {
                    func: '计算字段任务',
                    detail: '计算字段任务提交接口',
                    url: '/analysticservice/job/calculateField/submit?'
                },
                {
                    func: '连接要素图层任务',
                    detail: '连接要素图层任务提交接口',
                    url: '/analysticservice/job/joinFeature/submit?'
                },
                {
                    func: '属性汇总任务',
                    detail: '属性汇总任务提交接口',
                    url: '/analysticservice/job/summaryAttribute/submit?'
                },
                {
                    func: '范围内汇总要素任务',
                    detail: '范围内汇总要素任务提交接口',
                    url: '/analysticservice/job/summaryWithin/submit?'
                },
                {
                    func: '格网聚合点要素任务',
                    detail: '格网聚合点要素任务提交接口',
                    url: '/analysticservice/job/summaryMesh/submit?'
                },
                {
                    func: '构建追踪轨迹任务',
                    detail: '构建追踪轨迹任务提交接口',
                    url: '/analysticservice/job/reconstructTracks/submit?'
                },
                {
                    func: '创建缓冲分析任务',
                    detail: '创建缓冲分析任务提交接口',
                    url: '/analysticservice/job/createBuffer/submit?'
                },
                {
                    func: '探测事件分析任务',
                    detail: '探测事件分析任务提交接口',
                    url: '/analysticservice/job/detectIncidents/submit?'
                },
                {
                    func: '查找相似位置任务',
                    detail: '查找相似位置任务提交接口',
                    url: '/analysticservice/job/findSimilarLocation/submit?'
                },
                {
                    func: '计算密度任务',
                    detail: '计算密度任务提交接口',
                    url: '/analysticservice/job/calculateDensity/submit?'
                },
                {
                    func: '计算热点任务',
                    detail: '计算热点任务提交接口',
                    url: '	/analysticservice/job/findHotSpot/submit?'
                },
                {
                    func: '计算时空立方体任务',
                    detail: '计算时空立方体任务提交接口',
                    url: '/analysticservice/job/createSpaceTimeCube/submit?'
                }
            ],
            dataview: [
                {
                    func: '矢量瓦片',
                    detail: '支持mvt.pbf的矢量瓦片功能',
                    url: 'igserver的矢量瓦片的出图服务'
                },
                {
                    func: '矢量专题图',
                    detail: '支持geojson，object的矢量专题图功能',
                    url: 'igserver的矢量元素的出图服务'
                },
                {
                    func: '百度EchartGL',
                    detail: '支持百度EchartGL三维球的地图服务功能',
                    url: '编辑样式的时候必须严格遵守百度EchartGL的格式'
                },
                {
                    func: '百度MapV',
                    detail: '支持百度MapV的二维地图数据可视化表达',
                    url: '编辑样式的时候必须严格遵守百度MapV的格式'
                },
                {
                    func: '聚类图/热力图/密度图',
                    detail: '支持四大引擎的聚类热力密度图可视化表达',
                    url: 'MapBoxGl/Openlayers/Cesium无要求，leaflet必须引入对应插件'
                },
                {
                    func: 'ElasticSearch服务对接',
                    detail: '封装了原始的ElasticSearch.js接口和适应空间信息的中地接口，按照各自需求进行选择',
                    url: '必须引入对应elasticSearch/datastore的脚本'
                },
                {
                    func: 'GeoSpark服务对接',
                    detail: '针对分布式空间分析的结构进行的中地业务的封装，提供Rest的服务',
                    url: '必须引入对应dataanalysis的脚本'
                },
                {
                    func: '基本地图操作',
                    detail: '针对四大地图引擎的基本地图操作',
                    url: '必须引入对应地图引擎如leaflet.js/mapbox-gl.js/openlayers.js/cesium.js'
                },
                {
                    func: '前端空间分析服务',
                    detail: '针对四大地图引擎的前端空间分析服务',
                    url: '除了必须引入对应地图引擎如leaflet.js / mapbox-gl.js / openlayers.js / cesium.js外,必须引入公司对应turf.js脚本'
                },
                {
                    func: '前端GeoJSON服务',
                    detail: '针对四大地图引擎的前端GeoJSON的绘制、分析、计算服务',
                    url: '除了必须引入对应地图引擎外,必须引入对应geojson.js脚本用于格式解析、反解析'
                }
            ],
            igserver: [
                {
                    func: '底图服务',
                    detail: '针对四大地图引擎，关于mapgis的相关数据出图',
                    url: '除原始地图引擎脚本外，还需引入igserver.js,（leaflet 100%，mapboxgl 测试验证完成）'
                },
                {
                    func: '目录服务',
                    detail: '通用的mapgis提供的rest服务',
                    url: '除原始地图引擎脚本外，还需引入igserver.js'
                },
                {
                    func: '要素服务',
                    detail: '通用的mapgis提供的rest服务',
                    url: '除原始地图引擎脚本外，还需引入igserver.js'
                },
                {
                    func: '工作流服务',
                    detail: '通用的mapgis提供的rest服务',
                    url: '除原始地图引擎脚本外，还需引入igserver.js'
                },
                {
                    func: '几何空间分析服务',
                    detail: '通用的mapgis提供的rest服务',
                    url: '除原始地图引擎脚本外，还需引入igserver.js'
                },
                {
                    func: '地图服务',
                    detail: '通用的mapgis提供的rest服务',
                    url: '除原始地图引擎脚本外，还需引入igserver.js'
                },
                {
                    func: '专题图服务',
                    detail: '通用的mapgis提供的rest服务',
                    url: '除原始地图引擎脚本外，还需引入igserver.js'
                },
                {
                    func: '客户端专题图',
                    detail: '通过rest服务获取相关数据，绘制客户端专题图',
                    url: '除原始地图引擎脚本外，还需引入igserver.js'
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

    // ::v-deep.el-table .el-table__header-wrapper {
    //   tr {
    //     background-color: #F5F7FA;
    //   }
    // }
}

.webclient-core-wrapper {
    margin-bottom: 30px;
    .framework-style-image {
        width: 100%;
        height: fit-content;
    }
}
</style>
