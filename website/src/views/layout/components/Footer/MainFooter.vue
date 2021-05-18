<template>
  <div
    class="footer"
    :class="{'footer-mobole': mobile}"
  >
    <el-row
      :gutter="16"
      class="footer-mapgis-smaryun"
    >
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="5"
        :xl="6"
        class="footer-col"
      >
        <div class="icp">
          <img
            :src="logo"
            class="logo"
          />
          <div class="icp-row">
            <a>
              © 2020 MapGis.com版权所有
            </a>
          </div>
          <div class="icp-row">
            <!-- <img
              src="http://oss-smaryun-new.oss-cn-beijing.aliyuncs.com/images/police_icon.png"
              style="height:18px;"
            /> -->
            <a
              href="http://www.beian.miit.gov.cn"
              target="_blank"
            >&nbsp;鄂ICP备14000625号</a>&nbsp;
          </div>
          <div class="icp-row">
            <!-- <img
              src="http://oss-smaryun-new.oss-cn-beijing.aliyuncs.com/images/police_icon.png"
              style="height:18px;"
            /> -->
            <a
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42018502000503"
              target="_blank"
            >&nbsp;鄂公网安备 42018502000503号
            </a>
          </div>
          <!-- <div class="icp-row">
            <img
              src="http://oss-smaryun-new.oss-cn-beijing.aliyuncs.com/images/govIcon.gif"
              style="height:18px;"
              title="武汉网监电子标识"
              alt
              border="0"
            />
            <a
              href="http://wljg.scjgj.wuhan.gov.cn:80/whwjww/indexquery/indexqueryAction!dizviewjk.dhtml?webId=2ec48b653aa55ca194b9df62cc4e45fe"
              target="_blank"
            >
              工商电子标识
            </a>
          </div> -->
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="10"
        :lg="8"
        :xl="6"
        class="footer-col"
      >
        <footer-menu
          :menus="common"
          :divider="false"
          strong
          light
        />
      </el-col>
      <el-col
        :xs="24"
        :sm="10"
        :md="6"
        :lg="4"
        :xl="6"
        class="footer-col"
      >
        <footer-menu
          :menus="link"
          :divider="false"
          strong
          light
        />
      </el-col>
      <el-col
        :xs="24"
        :sm="14"
        :md="9"
        :lg="7"
        :xl="6"
        class="footer-col"
      >
        <div class="code-text">服务热线:400-880-9970</div>
        <div class="code-wrapper">
          <div class="code-text">关注我们 </div>
          <img
            class="code"
            :src="code.mapgis"
          />
          <img
            class="code"
            :src="code.smaryun"
          />

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { isMobile } from "@/utils/mobile";
import { CommonUrls, CommonLinks } from './config';
import FooterMenu from './Menu';

export default {
  data () {
    return {
      mobile: isMobile(),
      logo: './static/assets/logo/mapgis_blue.png',
      common: CommonUrls,
      link: CommonLinks,
      code: {
        mapgis: './static/assets/home/code_mapgis.png',
        smaryun: './static/assets/home/code_smaryun.png',
      }
    };
  },
  components: {
    FooterMenu,
  },
  computed: {},
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.footer-mobole {
  padding: 20px 20px !important;
  padding-bottom: 40px !important;
  .icp {
    padding-left: 40px;
  }
  .footer-col {
    height: fit-content;
    padding-left: 10px;
    border-right: 1px solid transparent !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important;
  }
  .footer-col:last-child {
    border-right: 1px solid transparent !important;
    border-bottom: 1px solid transparent !important;
  }
}

.footer {
  background-color: #252d45;
  padding: 24px 80px;
  .footer-col {
    height: fit-content;
    padding-left: 30px;
    border-right: 1px solid rgba(255, 255, 255, 0.3);
  }
  .footer-col:last-child {
    border-right: 0px solid rgba(255, 255, 255, 0.3);
  }
  .logo {
    width: 133px;
    height: 38px;
  }
  .icp {
    text-align: left;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.4);
    line-height: 12px;
    .icp-row {
      margin: 12px 0px;
      display: flex;
      text-align: center;
      a {
        height: 18px;
        line-height: 18px;
        color: rgba(255, 255, 255, 0.4);
      }
    }
    p {
      height: 18px;
    }
  }
  h4 {
    color: #ffffff;
    margin-left: 30px;
  }
  .header-menu-link {
    span {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .code-text {
    margin-left: 20px;
    margin-top: 24px;
    font-size: 16px;
    letter-spacing: 4px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(247, 247, 247, 1);
    line-height: 16px;
  }
  .code-wrapper {
    height: 106px;
    display: flex;
  }
  .code {
    margin-top: 24px;
    margin-left: 10px;
    height: 106px;
    width: 106px;
  }
}
</style>