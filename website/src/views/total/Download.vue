<template>
  <div class="download-wrapper">
    <total-tab/>
    <div class="content-wrapper">
      <div class="title">
        <img src="../../../public/static/assets/total/retouch.png"/>
        <div class="text">离线包</div>
      </div>
      <div class="warning">下载地址：
        <!--              <el-button type="primary"><a href="http://smaryun.com/dev/download_detail.html#/download828" target="_blank">下载</a></el-button>-->
        <a href="http://smaryun.com/dev/download_detail.html#/download828">http://smaryun.com/dev/download_detail.html#/download828</a>
      </div>
      <!--            <div :class="['download-area', { mobile: mobile }]">-->
      <!--                <div class="complete package">-->
      <!--                    <span class="name">完整包</span>-->
      <!--                    <div class="text">该包含有webclient四大主脚本以及所需的全部的三方cdn脚本</div>-->
      <!--                    <el-button type="primary"><a :href="SDK.websiteUrl" target="_blank">立即下载</a></el-button>-->
      <!--                </div>-->
      <!--                <div class="streamline package">-->
      <!--                    <span class="name">精简包</span>-->
      <!--                    <div class="text">只包含webclient主脚本</div>-->
      <!--                    <el-button type="primary"><a :href="SDK.websiteUrl" target="_blank">立即下载</a></el-button>-->
      <!--                </div>-->
      <!--            </div>-->
      <div class="title">
        <img src="../../../public/static/assets/total/retouch.png"/>
        <div class="text">Npm</div>
      </div>
      <el-row>
        <div class="warning">npm上的版本是release包，按需引入。</div>
        <div style="padding-left: 20px">
          <el-tag class="download-tag" effect="plain" type="info"> npm install @mapgis/webclient-es6-service</el-tag>
          <p/>
          <el-tag class="download-tag" effect="plain" type="info"> npm install @mapgis/webclient-vue-mapboxgl</el-tag>
          <p/>
          <el-tag class="download-tag" effect="plain" type="info"> npm install @mapgis/webclient-vue-cesium</el-tag>
          <p/>
        </div>
      </el-row>
      <div class="title">
        <img src="../../../public/static/assets/total/retouch.png"/>
        <div class="text">源码</div>
      </div>
      <el-row>
        <div class="warning">
          <div class="urlCss">
            <span>GitHub托管地址：<a href="https://github.com/MapGIS/WebClient-JavaScript">https://github.com/MapGIS/WebClient-JavaScript</a></span>
          </div>
          <br>
          <div>
            <span>Gitee托管地址：<a href="https://gitee.com/osmapgis/WebClient-JavaScript">https://gitee.com/osmapgis/WebClient-JavaScript</a></span>
          </div>
        </div>
      </el-row>
      <!-- <div class="title">
      <img/>
      <div class="text">版本信息</div>
  </div> -->
      <!-- <el-row>
      <el-col v-for="(v, i) in version" :key="i" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-divider content-position="center">
              <el-tag type="info">{{ v.name }}</el-tag>
          </el-divider>
          <iframe class="version-frame" frameborder="0" :src="`/static/libs/cdn/zondyclient/${v.plugin}.html`" />
          <br />
      </el-col>
  </el-row> -->
    </div>
  </div>
</template>

<script>
import {download} from './DownloadConfig';
import TotalTab from '@/components/Tabs/TotalTab';
import {isMobile} from '@/utils/mobile';

export default {
  components: {TotalTab},
  data() {
    return {
      mobile: isMobile(),
      version: [
        {
          name: 'Cesium运行时版本',
          plugin: 'webclient-cesium-plugin.min'
        },
        {
          name: 'Cesium调试时版本',
          plugin: 'webclient-cesium-plugin'
        },
        {
          name: 'MapboxGL运行时版本',
          plugin: 'webclient-mapboxgl-plugin.min'
        },
        {
          name: 'MapboxGL调试时版本',
          plugin: 'webclient-mapboxgl-plugin'
        },
        {
          name: 'Leaflet运行时版本',
          plugin: 'webclient-leaflet-plugin.min'
        },
        {
          name: 'Leaflet调试时版本',
          plugin: 'webclient-leaflet-plugin'
        },
        {
          name: 'Openlayers运行时版本',
          plugin: 'webclient-openlayers-plugin.min'
        },
        {
          name: 'Openlayers调试时版本',
          plugin: 'webclient-openlayers-plugin'
        }
      ],
      SDK: download
    };
  }
};
</script>
<style lang="scss" scoped>
.download-wrapper {
  .content-wrapper {
    width: 80vw;
    margin: 10px auto;
  }

  .title {
    display: flex;
    align-items: center;
    height: 22px;
    margin-top: 32px;
    margin-bottom: 2px;

    img {
      width: 10px;
      height: 22px;
    }

    .text {
      margin-left: 8px;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #3c4858;
    }
  }

  .download-area {
    display: flex;

    .package {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      flex: 1;
      height: 216px;
      background: #ffffff;
      box-shadow: 0px 8px 20px 0px rgba(17, 83, 182, 0.2);
      border-radius: 3px;
      overflow: hidden;

      .name {
        position: absolute;
        top: 10px;
        left: -30px;
        height: 36px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
        text-align: center;
        line-height: 36px;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        width: 120px;
        display: block;
      }

      &.complete {
        .name {
          background: linear-gradient(232deg, #ff6e02, #ffff00, #ff6d00);
        }
      }

      &.streamline {
        .name {
          background: linear-gradient(90deg, #4794fa, #43d481);
        }
      }

      .text {
        margin-top: 56px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #3c4858;
      }

      .el-button {
        width: 240px;
        height: 56px;
        margin-top: 32px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
      }
    }

    .package + .package {
      margin-left: 40px;
    }

    &.mobile {
      flex-wrap: wrap;

      .package {
        flex: initial;
        width: 100%;
        margin-top: 20px;
        margin-left: 0;
        padding: 0 20px;
      }
    }
  }

  .warning {
    margin-bottom: 2px;
    padding: 18px 20px;
    //background-color: #eeeeee;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333;

    .urlCss {
      padding-top: 10px;
    }
  }

  a {
    color: #3a85c6;
    font-weight: 550;
  }

  .download-tag {
    width: 100%;
    font-size: 14px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #3F454D;
  }

  .version-frame {
    width: 100%;
    height: 180px;
  }
}
</style>
