<template>
    <div class="webclient-geojson-wrapper">
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
        <a href="http://epsg.io/">GeoJSON官方网址</a>
      </div>
       <el-table
          border
          :header-cell-style="{background:'#F5F7FA',fontFamily: 'Microsoft YaHei',fontWeight: 'bold',color: '#606266'}"
          :cell-style="{fontFamily: 'Microsoft YaHei'}"
          style="width: 100%;margin:32px 0"
          :data="tableData"
       >
          <el-table-column
             label="图解"
             prop='img'
             width="120"
          >
            <template   slot-scope="scope">
                <img :src="scope.row.img"  min-width="70" height="70" />
            </template>
          </el-table-column>
         <el-table-column
             label="类型"
             prop="type"
             width="150"
         ></el-table-column>
         <el-table-column
           label="格式"
           prop="format"
         >
          <template   slot-scope="scope">
             <div v-html="formatMethod(scope.row.format)"></div>
         </template>
         </el-table-column>
        </el-table>
    </div>
    </div>
</template>
<script>
import { isMobile } from "@/utils/mobile";
import geojson   from '../../config/config-geojson'
export default {
    data(){
        return {
            mobile: isMobile(),
            tableData:geojson.data,
        }
    },
    methods:{
        formatMethod (data) {
            return data.replace(/\n/g, "<br />")
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
}
</style>