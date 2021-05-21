<template>
    <div :class="{ 'webclient-home': true, 'webclient-home-mobile': mobile }">
        <Header class="home-header" />
        <el-row type="flex" justify="center" class="banner banner-desc">
            <div :class="{ 'banner-desc-wrapper': true, 'banner-desc-wrapper-mobile': mobile }">
                <div class="main-title">热门开源可视化技术<span>JavaSript&nbsp;Client</span></div>
                <div class="sub-title">Echart, MapV, d3, turfjs等主流技术</div>
                <div>
                    <img :src="mains[0]" alt="logo" :style="{ width: '100%', height: mobile ? '240px' : '640px' }" />
                </div>

                <div class="main-bane-texts" v-if="!mobile">
                    <div class="main-bane-text" v-for="d in detailMains" :key="d.title">
                        <a v-if="d.link" :href="d.link" target="_blank">
                            <div class="title">{{ d.title }}</div>
                            <span>{{ d.subtitle }}</span>
                        </a>
                        <router-link v-if="d.index" :to="d.index">
                            <div class="title">{{ d.title }}</div>
                            <span>{{ d.subtitle }}</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </el-row>
        <el-row type="flex" justify="center" class="banner banner-developer">
            <div>
                <h1 class="text-center">云 GIS 网络客户端开发平台</h1>
                <div class="text-center-detail">
                    MapGIS Client for JavaScript，在云计算、大数据管理与分析等技术支撑下，将传统WebGIS与云GIS完美融合，
                    集成四大主流地图开源框架和Echarts、MapV、D3 等可视化库，进一步增强了大数据、实时流数据的高效可视化表达和分析功能
                </div>
                <el-row justify="space-around">
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" v-for="(dev, i) in develops" :key="i">
                        <div class="main-flat-card-wrapper">
                            <flat-card
                                class="main-flat-card"
                                :icon="dev.icon"
                                :iconHover="dev.iconHover"
                                :title="dev.title"
                                :subtitle="dev.subtitle"
                                :index="dev.index"
                                :routeGallery="dev.routeGallery"
                                :routeAPI="dev.routeAPI"
                            />
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-row>
        <el-row class="banner banner-gallery">
            <div>
                <h1 class="text-center" style="color: #3c4858; margin-bottom: 64px">热门功能示例</h1>
                <el-row :gutter="20">
                    <el-col v-for="g in gallyers" :key="g.title" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                        <div class="hot-examples-content">
                            <div class="hot-examples-imghover">
                                <div class="hot-examples-text">
                                    {{ g.subtitle }}
                                </div>
                                <router-link :to="g.index">
                                    <div class="hot-examples-detail">
                                        查看示例
                                        <div class="right-icon">></div>
                                    </div>
                                </router-link>
                            </div>
                            <img class="hot-examples-img" :src="g.icon" alt="" />
                            <div class="hot-examples-title">
                                {{ g.title }}
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-row>
        <el-row class="banner banner-carousel">
            <div>
                <h1 class="text-center">功能特性</h1>
                <el-row class="line-menu">
                    <el-col class="menu-item" @click.native="changeCheckLine('1')" :span="8" :class="{ 'check-line-item': checkLineItem === '1' }"
                        >开源地图库</el-col
                    >
                    <el-col class="menu-item" @click.native="changeCheckLine('2')" :span="8" :class="{ 'check-line-item': checkLineItem === '2' }"
                        >可视化技术</el-col
                    >
                    <el-col class="menu-item" @click.native="changeCheckLine('3')" :span="8" :class="{ 'check-line-item': checkLineItem === '3' }"
                        >开发方式</el-col
                    >
                </el-row>
                <div class="gradient-line"></div>
                <div class="menu-content">
                    <el-row class="menu-content-row" v-for="(b, i) in banners" :key="i" v-show="checkLineItem == i + 1">
                        <el-col :span="12" class="menu-content-item">
                            <img class="menu-content-item-image" :src="b.icon" />
                        </el-col>
                        <el-col :span="12" class="menu-content-item">
                            <div class="menu-content-item-title">{{ b.title }}</div>
                            <div class="menu-content-item-text">{{ b.detail }}</div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-row>
        <el-row class="banner-history">
            <div class="history-title">版本信息</div>
            <el-row class="history-content" v-for="h in historys" :key="h.title">
                <el-col class="history-content-time" :span="4">
                    <div class="history-content-timedata">{{ h.timestamp }}</div>
                    <div class="history-content-timeicon">
                        <img src="static/assets/home/flow.png" alt="图片" />
                    </div>
                </el-col>
                <el-col class="history-content-text" :span="18">
                    <div class="history-content-text-title">{{ h.title }}</div>
                    <div v-for="l in h.link" :key="l" class="history-content-text-link">
                        <a style="word-break: break-all" :href="l" target="_blank">
                            {{ l }}
                        </a>
                    </div>
                    <div class="history-content-text-detail">{{ h.detail }}</div>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>

<script>
import { isMobile } from '@/utils/mobile';
import { Header } from '../layout/components';
import { MainBanners, DetailMains, Develops, Gallerys, DetailBanners, Histroys } from './config';
import FlatCard from './components/FlatCard';
import BoxCard from './components/BoxCard';

export default {
    name: 'home',
    data() {
        return {
            mobile: isMobile(),
            carouselSpan: isMobile() ? 24 : 16,
            carouselHeight: isMobile() ? '40vh' : '300px',
            carouselWidth: isMobile() ? '100vw' : '80vw',
            mains: MainBanners,
            detailMains: DetailMains,
            develops: Develops,
            gallyers: Gallerys,
            banners: DetailBanners,
            historys: Histroys,
            carouselIndex: 0,
            checkLineItem: '1'
        };
    },

    components: {
        Header,
        BoxCard,
        FlatCard
    },
    methods: {
        handleCarousel(index) {
            this.carouselIndex = index;
        },
        changeCheckLine(i) {
            this.checkLineItem = i;
        }
    }
};
</script>

<style lang="scss">
$padding-left: 60px;
$margin-left: 80px;
.webclient-home-mobile {
    h1 {
        font-family: MicrosoftYaHei;
        font-size: 24px !important;
        margin-top: 40px !important;
    }
    h3 {
        margin-top: 10px !important;
    }
    .text-detail {
        width: 80vw !important;
        margin-left: 10vw !important;
    }
    .main-flat-card {
        margin: 35px 5px !important;
    }
    .banner-gallery {
        padding: 30px 10px !important;
    }
    .banner-carousel {
        padding: 0 10px !important;
    }
    .feature-image {
        width: 250px !important;
        height: 180px !important;
        background: transparent;
    }
}
.webclient-home {
    .main-title {
        position: absolute;
        height: 48px;
        font-size: 48px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        line-height: 48px;
        top: 251px;
        left: 89px;

        span {
            margin-left: 15px;
            color: rgba(255, 255, 255, 0.3);
        }
    }
    .sub-title {
        position: absolute;
        height: 33px;
        font-size: 30px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.3);
        line-height: 36px;
        opacity: 0.85;
        top: 334px;
        left: 89px;
    }
    .mapgis-header {
        background: transparent !important;
        box-shadow: 0px 3px 7px 0px transparent !important;
    }
    .mapgis-webclient-header {
        background: transparent !important;
    }

    .mapgis-webclient-text {
        color: #ffffff !important;
    }

    .mapgis-header .mapgis-webclient-menu span {
        color: #ffffff;
    }

    .mapgis-webclient-menu-icon {
        color: #ffffff !important;
    }

    .home-header {
        position: absolute;
        z-index: 100;
    }
    a {
        color: #3a85c6;
        text-decoration: none;
        word-wrap: break-word;
    }
    h1 {
        height: 36px;
        font-family: MicrosoftYaHei;
        font-size: 36px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 36px;
        letter-spacing: 0px;
        color: #3c4858;
        margin: 98px 0 25px 0;
    }
    h3 {
        height: 26px;
        font-family: MicrosoftYaHei;
        font-size: 26px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 36px;
        letter-spacing: 0px;
        color: #3c4858;
        margin-top: 70px;
    }
    h6 {
        margin-top: 0px;
    }
    .text-center {
        text-align: center;
    }
    .text-detail {
        width: 60vw;
        margin-left: calc(20vw - 80px);
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 300;
        color: rgba(102, 102, 102, 1);
        line-height: 25px;
    }
    .text-center-detail {
        width: 80vw;
        margin: 0 auto;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
        text-align: center;
        opacity: 0.7;
    }
    .main-bane-img {
        height: 100%;
        width: 100%;
    }
    .main-div-flex {
        display: flex;
    }
    .banner {
    }
    .banner-desc-wrapper {
        width: 100%;
        height: 640px;
        .banner-logo {
            width: 100vw;
        }
    }
    .banner-desc-wrapper-mobile {
        width: 100%;
        height: 240px !important;
    }
    .banner-developer {
        min-height: 630px;
        background: #ffffff;
    }
    .banner-gallery {
        background: #fff;
        padding: 0 137px;
        .el-divider__text {
            background-color: rgba(245, 245, 245, 1);
        }
    }
    .banner-carousel {
        padding: 0 80px;
        background: #ffffff;
        min-height: 630px;

        .feature-image {
            width: 492px;
            height: 374px;
            background: transparent;
        }

        .banner-right {
            float: right;
        }

        .h3-divider {
            width: 121px;
            height: 2px;
            margin-bottom: 28px;
            background-image: linear-gradient(90deg, #4794fa 0%, #31e1e6 100%), linear-gradient(#2575f2, #2575f2);
            background-blend-mode: normal, normal;
        }

        span {
            font-size: 16px;
            color: #666666;
        }

        img {
            color: rgba(102, 102, 102, 1);
            background: rgba(102, 102, 102, 1);
            height: 100%;
            width: 100%;
        }
    }
    .banner-history {
        padding: 0 10%;
        min-height: 720px;
        background-image: url('../../../public/static/assets/home/version.png');
        background-size: 100% 720px;
        /* background: #f7fcff; */
        .history-content {
            padding-bottom: 56px;
        }
        .history-title {
            text-align: center;
            padding: 100px 0 56px 0;
            font-size: 36px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #3c4858;
            line-height: 36px;
        }
        .history-content-time {
            text-align: right;
            .history-content-timedata {
                font-size: 20px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #3c4858;
                line-height: 36px;
            }
            .history-content-timeicon {
                width: 100%;
                text-align: right;
            }
        }
        .history-content-text {
            padding-left: 10%;
            .history-content-text-title {
                padding: 6px 0 15px 0;
                font-size: 20px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #3c4858;
                line-height: 26px;
            }
            .history-content-text-link {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #3a85c6;
                line-height: 26px;
            }
            .history-content-text-detail {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #666666;
                line-height: 26px;
            }
        }
    }
    .main-bane-texts {
        position: absolute;
        z-index: 1000;
        bottom: 0;
        height: fit-content;
        background: rgba(255, 255, 255, 0.1);
        width: 100%;
        display: flex;
    }
    .main-bane-text {
        height: fit-content;
        width: calc(((100vw - 2 * #{$margin-left})) / 4);
        border-left: 1px solid rgba(255, 255, 255, 0.2);
        border-right: 1px solid rgba(255, 255, 255, 0.2);
        padding: 22px 60px;

        .title {
            height: 18px;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            margin-top: 0px;
            margin-bottom: 16px;
            color: rgba(255, 255, 255, 1);
            line-height: 20px;
        }
        span {
            width: 256px;
            height: 34px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 21px;
            opacity: 0.4;
        }
    }
    .main-bane-text:first-child {
        margin-left: $margin-left;
    }
    .main-bane-text:last-child {
        margin-right: $margin-left;
    }
    .main-flat-card-wrapper {
        text-align: center;
        margin: auto;
    }
    .main-flat-card {
        margin: 75px 45px;
    }
    .gallery-card {
        margin: 8px 4px;
    }
}
</style>

<style scoped>
.line-menu {
    margin: 40px 0 21px 0;
    text-align: center;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #3c4858;
    line-height: 36px;
}
.gradient-line {
    height: 2px;
    width: 100%;
    background: -webkit-linear-gradient(-90deg, rgba(176, 185, 200, 0), #b0b9c8, rgba(176, 185, 200, 0));
    background: linear-gradient(-90deg, rgba(176, 185, 200, 0), #b0b9c8, rgba(176, 185, 200, 0));
}
.menu-item {
    position: relative;
    cursor: pointer;
}
.check-line-item {
    color: #3a85c6;
    position: relative;
}
.check-line-item::before {
    content: ' ';
    position: absolute;
    left: calc(50% - 8px);
    top: 49px;
    width: 16px;
    height: 16px;
    border: 1px solid #b0b9c8;
    background: #ffffff;
    transform: rotate(45deg);
}
.check-line-item::after {
    content: ' ';
    position: absolute;
    left: calc(50% - 3px);
    top: 54px;
    width: 8px;
    height: 8px;
    background: linear-gradient(90deg, #4794fa, #31e1e6);
    transform: rotate(45deg);
}
.menu-content {
    width: 100%;
    height: 512px;
}
.menu-content-row {
    height: 100%;
}
.menu-content-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    height: 100%;
}
.menu-content-item-image {
    width: 492px !important;
    height: 374px !important;
    background: transparent !important;
}
.menu-content-item-title {
    width: 100%;
    font-size: 26px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #3c4858;
    line-height: 36px;
    padding-bottom: 45px;
}
.menu-content-item-text {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666666;
    line-height: 26px;
    padding-right: 46px;
}
.hot-examples-img {
    width: 100%;
    height: 236px;
}
.hot-examples-content {
    position: relative;
    font-size: 0;
    margin-bottom: 24px;
}
.hot-examples-imghover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 236px;
    opacity: 0;
}
.hot-examples-imghover:hover {
    background: linear-gradient(90deg, rgba(14, 98, 210, 0.5), rgba(0, 192, 197, 0.5));
    opacity: 1;
}
.hot-examples-text {
    padding: 13px 44px 13px 16px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    line-height: 21px;
}
.hot-examples-detail {
    cursor: pointer;
    padding: 13px 44px 13px 16px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    line-height: 21px;
}
.right-icon {
    margin-left: 3px;
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background: #fff;
    color: #000;
    line-height: 16px;
    text-align: center;
}
.hot-examples-title {
    height: 65px;
    line-height: 65px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #3c4858;
    font-size: 14px;
    text-indent: 16px;
    background: #ffffff;
    border: 1px solid #e0e4ea;
}
</style>
