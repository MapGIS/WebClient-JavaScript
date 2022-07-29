p<template>
    <div class="webclient-use-wrapper">
        <total-tab />
        <div class="content-wrapper">
            <div :class="[{ steps: !mobile }, { mobile: mobile }]">
                <div class="index">
                    <div class="number">01</div>
                    <div class="content">
                        <div class="main">核心用法</div>
                        <div class="sub">include-xxx.js</div>
                    </div>
                </div>
                <img src="../../../public/static/assets/total/use/arrow.png" />
                <div class="index">
                    <div class="number">02</div>
                    <div class="content">
                        <div class="main">离线使用</div>
                        <div class="sub">include-xxx-local.js</div>
                    </div>
                </div>
                <img src="../../../public/static/assets/total/use/arrow.png" />
                <div class="index">
                    <div class="number">03</div>
                    <div class="content">
                        <div class="main">在线使用</div>
                        <div class="sub">include-xxx-online.js</div>
                    </div>
                </div>
            </div>

            <div class="tip">
                <p>使用方式主要分为三种: 本地离线使用，局域网使用，在线互联网使用.。</p>
            </div>

            <div class="title">
                <img src="../../../public/static/assets/total/retouch.png" />
                <div class="main">核心用法</div>
                <div class="sub">include-xxx.js</div>
            </div>

            <div class="tip">
                <p>这里是引入基本的三方库如jquery，bootstrap等.</p>
                <p>
                    除了常规的引入
                    <span class="information">include-lib-local.js脚本</span>外，通过设置属性
                    <span class="important">include="jquery,bootstrap"</span>
                    的方式自动寻找引入对应的第三方脚本jquery,bootstrap。
                </p>
            </div>

            <div class="tip">
                <p>这里是引入常见的地图脚本leaflet以及对应的geojson,turf,elasticsearch插件.</p>
                <p>
                    除了常规的引入
                    <span class="information">include-leaflet-local.js脚本</span>外，通过设置属性
                    <span class="important">include="geojson,turf"</span>
                    的方式自动寻找引入对应的第三方脚本leaflet,geojson,turf。
                </p>
            </div>

            <div class="warning">
                <p>include="geojson,turf"的里面的插件没有先后顺序，内部维护了其先后顺序.</p>
                <p>include-*.js中include="xxx"具体的名字类型geojson,turf,elasticsearc等可以在include-*.js内部的代码中查看</p>
            </div>

            <el-image :class="{ 'image-mobile': mobile }" :src="useCoreImg" :preview-src-list="[useCoreImg]" />

            <div class="title">
                <img src="../../../public/static/assets/total/retouch.png" />
                <div class="main">本地离线使用</div>
                <div class="sub">include-xxx-local.js</div>
            </div>

            <div class="warning">
                <p>离线版本的核心原理就是根据include=""中的名字，在 当前cdn文件夹下寻找对应的js的脚本并按照规定的顺序引入到浏览器中.</p>
            </div>

            <div class="tip">
                <p>请把webclient安装包安装完成后的cdn的文件夹与include-*.js在同一目录下，然后只需正常的引入对应的include-*.js即可”.</p>
                <p>“include-*.js 通过include="xxx"的方式自动寻找引入对应的第三方脚本”.</p>
                <el-image :class="{ 'image-mobile': mobile }" :src="useLocalImg" :preview-src-list="[useLocalImg]" />
                <p>
                    <el-image :class="{ 'image-mobile': mobile }" :src="useLocalFileImg" :preview-src-list="[useLocalFileImg]" />
                </p>
            </div>

            <div class="title">
                <img src="../../../public/static/assets/total/retouch.png" />
                <div class="main">互联网在线使用</div>
                <div class="sub">include-xxx-online.js</div>
            </div>

            <div class="warning">
                <p>
                    在线版本的核心原理就是根据include=""中的名字，在
                    <span class="information">互联网众多cdn网址</span>下寻找对应的js的脚本并按照规定的顺序引入到浏览器中.
                </p>
            </div>

            <div class="tip">
                <p>只需正常的引入对应的include-xxx-online.js即可.</p>
                <p>include-*.js 通过include="xxx"的方式自动寻找引入对应的第三方脚本.</p>
                <el-image :class="{ 'image-mobile': mobile }" :src="useOnlineImg" :preview-src-list="[useOnlineImg]" />
            </div>

            <h4>司马云的官方在线的网址是</h4>
            <div class="tip">
                <div v-for="l in smaryun" :key="l.name">
                    <span class="information">{{ l.name }}</span>
                    <p>
                        <a :href="l.href" target="_blank"> {{ l.href }} </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { isMobile } from '@/utils/mobile';
import TotalTab from '@/config/components/Tabs/TotalTab';

export default {
    components: { TotalTab },
    data() {
        return {
            mobile: isMobile(),
            useCoreImg: './static/assets/total/use/use-core.png',
            useLocalImg: './static/assets/total/use/use-local.png',
            useLocalFileImg: './static/assets/total/use/use-local-file.png',
            useOnlineImg: './static/assets/total/use/use-online.png',
            useInnerImg: './static/assets/total/use/use-inner.png',
            useOnlineInnerImg: './static/assets/total/use/use-online-inner.png',
            useNode1Img: './static/assets/total/use/node-1.png',
            useNode2Img: './static/assets/total/use/node-2.png',
            useNode3Img: './static/assets/total/use/node-3.png',

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

            smaryun: [
                {
                    name: 'Openlayers',
                    href: 'http://develop.smaryun.com:8899/static/libs/include-openlayers-local.js'
                },
                {
                    name: 'leaflet',
                    href: 'http://develop.smaryun.com:8899/static/libs/include-leaflet-local.js'
                },
                {
                    name: 'mapboxgl',
                    href: 'http://develop.smaryun.com:8899/static/libs/include-mapboxgl-local.js'
                },
                {
                    name: 'cesium',
                    href: 'http://develop.smaryun.com:8899/static/libs/include-cesium-local.js'
                }
            ]
        };
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.webclient-use-wrapper {
    padding-bottom: 30px;
    .content-wrapper {
        margin-left: 10%;
        margin-right: 10%;
        padding-top: 40px;
        .steps {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 38px;

            .index {
                display: flex;
                align-items: center;

                .number {
                    font-size: 48px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    font-style: italic;
                    color: rgba(51, 51, 51, 0.2);
                }

                .content {
                    margin-left: 16px;
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    font-style: italic;
                    color: #3c4858;
                }
            }

            img {
                width: 77px;
                height: 34px;
            }
        }

        .mobile {
            display: flex;
            justify-content: space-between;

            .index {
                width: 54px;

                .number {
                    font-size: 36px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    font-style: italic;
                    color: rgba(51, 51, 51, 0.2);
                }

                .content {
                    font-size: 12px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    font-style: italic;
                    color: #3c4858;
                }
            }

            img {
                margin-top: 12px;
                width: 48px;
                height: 24px;
            }
        }

        .first-title {
            margin-top: 50px;
        }

        .title {
            display: flex;
            align-items: center;
            height: 22px;
            margin: 56px 0 24px 0;

            img {
                width: 10px;
                height: 22px;
            }

            .main {
                margin-left: 8px;
                font-size: 20px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #3c4858;
            }

            .sub {
                margin-left: 16px;
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #999999;
            }
        }

        .tip {
            padding: 8px 16px;
            background-color: #ecf8ff;
            border-radius: 4px;
            border-left: 5px solid #50bfff;
            margin: 20px 0;
            .image-mobile {
                width: 70vw;
            }
        }

        .warning {
            padding: 8px 16px;
            background-color: #fff6f7;
            border-radius: 4px;
            border-left: 5px solid #fe6c6f;
            margin: 20px 0;
        }

        .important {
            color: #e91e63 !important;
            font-weight: bold;
        }

        .information {
            color: #67c23a;
            font-weight: bold;
        }

        .image-mobile {
            width: 80vw;
        }
    }
}
</style>
