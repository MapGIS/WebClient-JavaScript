<template>
  <div :class="{'webclient-home': true, 'webclient-home-mobile': mobile}">
    <Header class="home-header" />
    <el-row
      type="flex"
      justify="center"
      class="banner banner-desc"
    >
      <div :class="{'banner-desc-wrapper': true, 'banner-desc-wrapper-mobile': mobile}">
        <el-carousel
          :interval="4000"
          :height="mobile?'240px':'640px'"
          width="100vw"
        >
          <el-carousel-item
            v-for="banner in mains"
            :key="banner"
          >
            <img
              :src="banner"
              class="main-bane-img"
            >
          </el-carousel-item>
        </el-carousel>

        <div
          class="main-bane-texts"
          v-if="!mobile"
        >
          <div
            class="main-bane-text"
            v-for="d in detailMains"
            :key="d.title"
          >
            <div class="title">{{d.title}}</div>
            <span>{{d.subtitle}}</span>
          </div>
        </div>
      </div>
    </el-row>
    <el-row
      type="flex"
      justify="center"
      class="banner banner-developer"
    >
      <div>
        <h1 class="text-center">云 GIS 网络客户端开发平台</h1>
        <h6 class="text-center text-detail">MapGIS Client for JavaScript，在云计算、大数据管理与分析等技术支撑下，将传统WebGIS与云GIS完美融合，
          集成四大主流地图开源框架和Echarts、MapV、D3等可视化库，进一步增强了大数据、实时流数据的高效可视化表达和分析功能
        </h6>
        <el-row justify="space-around">
          <el-col
            :xs="12"
            :sm="12"
            :md="6"
            :lg="6"
            :xl="6"
            v-for="(dev, i) in develops"
            :key="i"
          >
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
        <h1 class="text-center">热门功能示例</h1>
        <el-divider><i
            class="el-icon-star-on"
            style="color:#666666"
          ></i></el-divider>
        <el-row gutter="20">
          <el-col
            v-for="g in gallyers"
            :key="g.title"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="6"
          >
            <box-card
              class="gallery-card"
              :src="g.icon"
              :title="g.title"
              :subtitle="g.subtitle"
              :index="g.index"
              imageStyle="width: 100%; height: 236px;"
            ></box-card>
          </el-col>
        </el-row>
      </div>
    </el-row>
    <el-row class="banner banner-carousel">
      <div>
        <h1 class="text-center">功能特性</h1>
        <el-row
          v-for="(b,i) in banners"
          :key="i"
        >
          <el-col
            :class="{'banner-right': i % 2 === 1 && !mobile}"
            :span="mobile ? 20 :10"
            :offset="2"
          >
            <h3>{{b.title}}</h3>
            <p class="h3-divider" />
            <span>{{b.detail}}</span>
          </el-col>
          <el-col
            :class="{'banner-right': i % 2 === 1  && !mobile}"
            :span="mobile ? 20 :10"
            :offset="mobile? 2 : 0"
          >
            <img
              class="feature-image"
              :src="b.icon"
            >
          </el-col>
          <p v-if="mobile" />
        </el-row>
      </div>
    </el-row>
    <el-row class="banner banner-history">
      <el-col
        :span="mobile?23:16"
        :offset="mobile?0:4"
      >
        <h1 class="text-center">版本进化史</h1>
        <el-divider><i
            class="el-icon-star-on"
            style="color:#666666"
          ></i></el-divider>
        <el-timeline :reverse="false">
          <el-timeline-item
            v-for="h in historys"
            :key="h.title"
            :timestamp="h.timestamp"
            placement="top"
            :type="h.type"
            size="large"
          >
            <el-card>
              <h4>{{h.title}}</h4>
              <a
                :href="h.link"
                target="_blank"
              >{{h.link}}</a>
              <p class="client-timeline-p">{{h.detail}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { isMobile } from "@/utils/mobile";
import { Header } from '../layout/components'
import { MainBanners, DetailMains, Develops, Gallerys, DetailBanners, Histroys } from './config';
import FlatCard from "./components/FlatCard";
import BoxCard from "./components/BoxCard";

export default {
  name: "home",
  data () {
    return {
      mobile: isMobile(),
      carouselSpan: isMobile() ? 24 : 16,
      carouselHeight: isMobile() ? "40vh" : "300px",
      carouselWidth: isMobile() ? "100vw" : "80vw",
      mains: MainBanners,
      detailMains: DetailMains,
      develops: Develops,
      gallyers: Gallerys,
      banners: DetailBanners,
      historys: Histroys,
      carouselIndex: 0,
    };
  },

  components: {
    Header,
    BoxCard,
    FlatCard,
  },
  methods: {
    handleCarousel (index) {
      this.carouselIndex = index
    }
  }
};
</script>

<style  lang="scss">
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
  .mapgis-header {
    background: transparent !important;
  }
  .home-header {
    position: absolute;
    z-index: 9999;
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
    margin-top: 80px;
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
    margin-top: 10px;
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
    background: rgba(245, 245, 245, 1);
    padding: 30px 137px;
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
      background-image: linear-gradient(90deg, #4794fa 0%, #31e1e6 100%),
        linear-gradient(#2575f2, #2575f2);
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
    min-height: 720px;
    background: url("../../../public/static/assets/home/history.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    .el-divider__text {
      background-color: #cbe4f2;
    }
    .el-divider--horizontal {
      background: #ffffff;
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
    margin: 70px 45px;
  }
  .gallery-card {
    margin: 8px 4px;
  }
}
</style>