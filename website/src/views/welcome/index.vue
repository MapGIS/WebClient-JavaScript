<template>
  <div>
    <el-row type="flex" justify="center" class="banner banner-desc">
      <h1 v-if="!mobile">MapGIS WebClient For JavaScript</h1>
      <h2 v-else>MapGIS WebClient For JavaScript</h2>
    </el-row>

    <el-row type="flex" justify="center" class="banner-desc">
      <p class="main-detail-text">
        增强的MapGIS Web开发平台，集成Openalyers、Leaflet、MapBox、Cesium等框架，在传统WebGIS开发基础之上，增强大数据、实时流数据的搞笑可视化表达和分析，为用户带来全新开发体验
      </p>
    </el-row>

    <el-row type="flex" justify="center" class="banner">
      <el-col :span="carouselSpan">
        <el-carousel :height="carouselHeight" :width="carouselWidth">
          <el-carousel-item>
            <img class="carousel-img" :src="banner1" />
          </el-carousel-item>
          <el-carousel-item>
            <img class="carousel-img" :src="banner2" />
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>

    <div class="second-banner">
      <el-row type="flex" class="section banner" justify="center">
        <el-col :span="mobile?20:10" class="banner-desc">
          <el-divider>
            <h2 class="grid-content bg-purple" v-if="!mobile">四大前端显示引擎</h2>
            <h4 class="grid-content bg-purple" v-else>四大脚本</h4>
          </el-divider>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16" :offset="4">
          <el-row :gutter="12" class="second-banner-inner">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <box-card
                :background="leaflet"
                textname="Leaflet"
                textdetail="CANVAS/SVG 双擎轻量级绘制,多插件"
                index="/gallery/leaflet"
              ></box-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <box-card
                :background="cesium"
                textname="Cesium"
                textdetail="倾斜摄影, 3D TILES, WEBGL硬件加速"
                index="/gallery/cesium"
              ></box-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <box-card
                :background="openlayers"
                textname="Openlayers"
                textdetail="传统前端引擎，内置绝大部分可视化功能"
                index="/gallery/openlayers"
              ></box-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <box-card
                :background="mapboxgl"
                textname="MapboxGL"
                textdetail="矢量地图，WEBGL硬件加速，最漂亮地图"
                index="/gallery/mapboxgl"
              ></box-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="third-banner">
      <el-row type="flex" class="section banner" justify="center">
        <el-col :span="mobile?20:10" class="banner-desc">
          <el-divider>
            <h2 v-if="!mobile" class="grid-content bg-purple">版本历史</h2>
            <h4 v-else class="grid-content bg-purple">版本历史</h4>
          </el-divider>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="mobile?20:16" :offset="mobile?2:4">
          <el-timeline :reverse="false">
            <el-timeline-item timestamp="2020/1/16" placement="top" type="success" size="large">
              <el-card>
                <h4>司马云正式版本 10.3.4.10</h4>
                <a
                  href="http://develop.smaryun.com:8899/#/index"
                >http://develop.smaryun.com:8899</a>
                <p
                  class="client-timeline-p"
                >逻辑上重构设计webclient-javascript，整合统一igserver,datastore,d3,mapv,echarts主流开源技术</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/9/10" placement="top" type="warning" size="large">
              <el-card>
                <h4>Github初始开发模板 10.3.0-beta</h4>
                <a
                  href="https://github.com/MapGIS/WebClient-JavaScript"
                >https://github.com/MapGIS/WebClient-JavaScript</a>
                <p
                  class="client-timeline-p"
                >物理上整合了leaflet,mapboxgl,cesium,openlayers, zondyclient等多个脚本</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
/*   import banner1 from '@/assets/welcome/banner1.png'
  import banner2 from '@/assets/welcome/banner2.png'
  import banner3 from '@/assets/welcome/banner3.png' */

import { isMobile } from "@/utils/mobile";
import BoxCard from "./components/BoxCard";

export default {
  name: "welcome",
  data() {
    return {
      mobile: isMobile(),
      carouselSpan: isMobile() ? 24 : 16,
      carouselHeight: isMobile() ? "40vh" : "80vh",
      carouselWidth: isMobile() ? "100vw" : "80vw",
      banner1: "./static/assets/welcome/banner1.png",
      banner2: "./static/assets/welcome/banner2.png",
      banner3: "./static/assets/welcome/banner3.png",
      leaflet: "./static/assets/welcome/svg-leaflet.png",
      openlayers: "./static/assets/welcome/svg-openlayers.png",
      cesium: "./static/assets/welcome/svg-cesium.png",
      mapboxgl: "./static/assets/welcome/svg-mapboxgl.png",
      elasticsearch: "./static/assets/welcome/ElasticSearch.png",
      geospark: "./static/assets/welcome/GeoSpark.png",
      vectortile: "./static/assets/welcome/VectorTile.png"
    };
  },

  components: {
    BoxCard
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
body {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
}

.banner {
  padding-top: 20px;
  text-align: center;
}

.second-banner {
  // background-color: #f7fbfd;
  background-color: #ffffff;
  padding-bottom: 30px;
  width: 100%;
  box-sizing: border-box;
}

.second-banner-inner {
  /* margin-left: 10vw;
  margin-right: 10vw; */
  /* padding-left: 12vw;
  padding-right: 12vw; */
  /* width: 75vw; */
}

h1 {
  font-size: 34px;
  margin: 0;
  line-height: 48px;
  color: #555;
}

h2 {
  margin: 0;
  line-height: 48px;
  color: #555;
}

h3 {
  font-size: 22px;
  font-weight: 400;
  margin: 0 0 30px;
  color: #1f2d3d;
}

h4 strong {
  color: #5e6d82;
  font-weight: 400;
}

.main-detail-text {
  width: 60vw;
  left: 20vw;
}

p {
  font-size: 18px;
  line-height: 28px;
  color: #888;
  margin: 10px 0 5px;
}

.content-title {
  margin-top: 30px;
}

.content-title li {
  font-size: 14px;
  color: #99a9bf;
  padding: 10 25px;
  line-height: 20px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  background-image: url;
}

.carousel-img {
  height: 100%;
  width: 100%;
}

.el-carousel__item:nth-child(2n) {
  /* background-color: #99a9bf; */
}

.el-carousel__item:nth-child(2n + 1) {
  /* background-color: #d3dce6; */
}

.section {
  margin-top: 30px;
  margin-bottom: 20px;
}

.elasticsearch-img {
  float: left;
  width: 256px;
}

.client-timeline-p {
  font-size: 14px;
}
</style>