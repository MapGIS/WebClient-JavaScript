<template>
  <div class="webclient-epsg-wrapper">
    <div class="overview-header">
      <div class="title">协议<span>AGREEMENT</span></div>
      <div class="overview-nav">
        <router-link to="/standard/epsg">
          <div :class="['item',{select:$route.path === '/standard/epsg'}]">
              epsg
              <div class="triangle"></div>
          </div>
        </router-link>
        <router-link to="/standard/ogc">
          <div :class="['item',{select:$route.path === '/standard/ogc'}]">
              ogc
              <div class="triangle"></div>
          </div>
        </router-link>
        <router-link to="/standard/geojson">
          <div :class="['item',{select:$route.path === '/standard/geojson'}]">
              geojson
              <div class="triangle"></div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="standard-content">
      <div class="standard-content-link">
        <a href="http://epsg.io/">EPSG官方网址</a>
      </div>
      <div class="standard-menu">
        <div class="span-left" @click="prepage()"></div>
        <div class="span-right" @click="nextpage()"></div>
        <div class="standard-menu-total" id="menuvw">
          <div class="standard-menu-content" id="menuTotal">
            <div @click="changeCheck('1')" :class="['standard-menuitem', menucheck=='1'?'standard-menuitem-check': '']">高斯大地坐标系_中国2000</div>
            <div @click="changeCheck('2')" :class="['standard-menuitem', menucheck=='2'?'standard-menuitem-check': '']">高斯大地坐标系_西安80</div>
            <div @click="changeCheck('3')" :class="['standard-menuitem', menucheck=='3'?'standard-menuitem-check': '']">高斯大地坐标系_北京54</div>
            <div @click="changeCheck('4')" :class="['standard-menuitem', menucheck=='4'?'standard-menuitem-check': '']">Web墨卡托_WGS1984</div>
            <div @click="changeCheck('5')" :class="['standard-menuitem', menucheck=='5'?'standard-menuitem-check': '']">中国2000国家大地坐标系_度</div>
            <div @click="changeCheck('6')" :class="['standard-menuitem', menucheck=='6'?'standard-menuitem-check': '']">地理坐标系(西安)_度</div>
            <div @click="changeCheck('7')" :class="['standard-menuitem', menucheck=='7'?'standard-menuitem-check': '']">地理坐标系(北京)_度</div>
            <div @click="changeCheck('8')" :class="['standard-menuitem', menucheck=='8'?'standard-menuitem-check': '']">WGS1984_度</div>
          </div>
        </div>
      </div>
            <OgcTable v-if="menucheck=='1'" :tableData="gauss_china2000" />
            <OgcTable v-if="menucheck=='2'" :tableData="gauss_xian80" />
            <OgcTable v-if="menucheck=='3'" :tableData="gauss_beijing54" />
            <OgcTable v-if="menucheck=='4'" :tableData="web_mecarot" />
            <OgcTable v-if="menucheck=='5'" :tableData="lonlat_china2000" />
            <OgcTable v-if="menucheck=='6'" :tableData="lonlat_xian80" />
            <OgcTable v-if="menucheck=='7'" :tableData="lonlat_beijin54" />
            <OgcTable v-if="menucheck=='8'" :tableData="lonlat_wgs84" />
    </div>
  </div>
</template>

<script>
// import treeTable from '@/components/TreeTable'
import { isMobile } from "@/utils/mobile";
import OgcTable from "@/components/Table/OgcTable";
import epsg from "@/config/config-epsg";

export default {
  components: {
    OgcTable
  },
  data() {
    return {
      menucheck: "1",
      menuitemsArray: [],
      menuLength: null,
      mobile: isMobile(),
      gauss_xian80: epsg.gauss_xian80,
      gauss_beijing54: epsg.gauss_beijing54,
      gauss_china2000: epsg.gauss_china2000,
      web_mecarot: epsg.web_mecarot,
      lonlat_xian80: epsg.lonlat_xian80,
      lonlat_beijin54: epsg.lonlat_beijin54,
      lonlat_china2000: epsg.lonlat_china2000,
      lonlat_wgs84: epsg.lonlat_wgs84
    };
  },
  methods: {
    filterLeafletTag(value, row) {
      return row.leaflet === value;
    },
    filterMapboxTag(value, row) {
      return row.mapboxgl === value;
    },
    filterOpenlayerTag(value, row) {
      return row.openlayers === value;
    },
    filterCesiumTag(value, row) {
      return row.cesium === value;
    },
    changeCheck(i) {
      let menu = document.getElementById("menuTotal")
      let menuX = document.defaultView.getComputedStyle(menu, null).transform
      let transfromlen;
       if(i === '1'){
        menu.style.transform = 'translateX(0px)'
        this.menucheck = i
        return;
      }
      if(this.menuitemsArray[i-1] > this.menuLength + Math.abs(menuX.split(',')[4])){
        // 移动菜单到视角
        transfromlen = this.menuitemsArray[i-1] - this.menuLength;
        menu.style.transform = 'translateX(-' + transfromlen + 'px)'
      } else if(this.menuitemsArray[i-2] < Math.abs(menuX.split(',')[4])){
        transfromlen = this.menuitemsArray[i-2];
        menu.style.transform = 'translateX(-' + transfromlen + 'px)'
      }
      this.menucheck = i
    },
    prepage() {
      let menu = document.getElementById("menuTotal")
      let menuX = document.defaultView.getComputedStyle(menu, null).transform
      let prevalue = Number(menuX.split(',')[4]) + this.menuLength
      if(prevalue>=0){
        menu.style.transform = 'translateX(0px)'
      }else{
        menu.style.transform = 'translateX(' + prevalue + 'px)'
      }
    },
    nextpage() {
      let menu = document.getElementById("menuTotal")
      let menuX = document.defaultView.getComputedStyle(menu, null).transform
      let prevalue = Number(menuX.split(',')[4]) - this.menuLength
      let maxvalue = this.menuLength - this.menuitemsArray[this.menuitemsArray.length-1]
      if(prevalue<= maxvalue){
        menu.style.transform = 'translateX(' + maxvalue + 'px)'
      }else{
        menu.style.transform = 'translateX(' + prevalue + 'px)'
      }
    }
  },
  mounted() {
    this.menuitemsArray = []
    this.menuLength = document.getElementById("menuvw").offsetWidth;
    let menuitems = document.getElementsByClassName("standard-menuitem")
    let total = 0;
    if(menuitems.length){
      for(let i=0;i<menuitems.length;i++){
        total+=menuitems[i].offsetWidth
        this.menuitemsArray.push(total)
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.webclient-epsg-wrapper {
  // margin: 30px 0px;
  .banner {
    padding-top: 24px;
    text-align: center;
  }
}
.overview-header {
  width: 100%;
  height: 240px;
  background-image: url('../../../public/static/assets/standard/standardlogo.png');
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
      padding: 0 122px;
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
.standard-content{
  min-height: 70vh;
  padding: 0 10vw;
  .standard-content-link{
    margin: 24px 0;
    width: 100%;
    height: 48px;
    background: #EBF7FE;
    font-size: 14px;
    line-height: 48px;
    text-indent: 17px;
    color: #3A85C6;
  }
  .standard-menu{
    position: relative;
    box-sizing: border-box;
    height: 40px;
    width: 100%;
    padding: 0 25px 0 20px;
    line-height: 36px;
    border-bottom: 1px solid #B0B9C8;
    white-space: nowrap;
    .standard-menu-total{
      height: 36px;
      width: 100%;
      overflow:hidden;
      padding-bottom: 20px;
      margin-bottom: -20px;
    }
    .standard-menu-content{
      position: relative;
      float: left;
      transform: translateX(0);
      .standard-menuitem{
        display: inline-block;
        cursor: pointer;
        padding: 0 20px 0 10px;
        position: relative;
      }
    }
  }
}
.span-right{
  position: absolute;
  top: 8px;
  right: 0;
  width: 5px;
  height: 5px;
  margin: 5px 5px;
  border-top: 3px solid #3A85C6; /*上面的线条*/
  border-right: 3px solid #3A85C6;/*右边线条*/
  transform: rotate(45deg);/*主要是这个旋转45度*/
}
.span-left{
  position: absolute;
  top: 8px;
  left: 0;
  width: 5px;
  height: 5px;
  margin: 5px 5px;
  border-top: 3px solid #3A85C6; /*上面的线条*/
  border-right: 3px solid #3A85C6;/*右边线条*/
  transform: rotate(-135deg);/*主要是这个旋转45度*/
}
.standard-menuitem-check{
  color: #3A85C6;
  position: relative;
}
.standard-menuitem-check::before{
  content: ' ';
  position: absolute;
  left: calc(50% - 5px);
  top: 33px;
  width: 10px;
  height: 10px;
  border: 1px solid #B0B9C8;
  background: #FFFFFF;
  transform: rotate(45deg);
}
.standard-menuitem-check::after{
  content: ' ';
  position: absolute;
  left: calc(50% - 2px);
  top: 37px;
  width: 6px;
  height: 6px;
  background: linear-gradient(90deg, #4794FA, #31E1E6);
  transform: rotate(45deg);
}
</style>