<template>
  <el-container>
    <el-header style="padding:0px;height:72px;">
      <Header></Header>
    </el-header>
    <el-main class="webclient-empty-wrapper">
      <div class="overview-header">
        <div class="title">插件<span>PLUG-IN&nbsp;UNIT</span></div>
        <div class="overview-nav">
          <router-link to="/total/plugins">
            <div :class="['item',{select:$route.path === '/total/plugins'}]">
                插件列表
                <div class="triangle"></div>
            </div>
          </router-link>
          <router-link to="/total/detailChart">
            <div :class="['item',{select:$route.path === '/total/detailChart'}]">
                详细图表
                <div class="triangle"></div>
            </div>
          </router-link>
          <router-link to="/total/pluginTags">
            <div :class="['item',{select:$route.path === '/total/pluginTags'}]">
                插件标签
                <div class="triangle"></div>
            </div>
          </router-link>
          <router-link to="/total/bugCommit">
            <div :class="['item',{select:$route.path === '/total/bugCommit'}]">
                提交bug
                <div class="triangle"></div>
            </div>
          </router-link>
          <router-link to="/total/other">
            <div :class="['item',{select:$route.path === '/total/other'}]">
                其他
                <div class="triangle"></div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="wscn-http404-container">
        <div class="wscn-http404">
          <div class="pic-404">
            <img
              class="pic-404__parent"
              :src="empty.main"
              alt="404"
            >
            <img
              class="pic-404__child left"
              :src="empty.cloud"
              alt="404"
            >
            <img
              class="pic-404__child mid"
              :src="empty.cloud"
              alt="404"
            >
            <img
              class="pic-404__child right"
              :src="empty.cloud"
              alt="404"
            >
          </div>
          <div class="bullshit">
            <div class="bullshit__oops">哦哦!</div>
            <div class="bullshit__info">貌似出现了小问题
              <a
                style="color:#20a0ff"
                href="https://wallstreetcn.com"
                target="_blank"
              >司马云</a>
            </div>
            <div class="bullshit__headline">{{ message }}</div>
            <div class="bullshit__info">{{reason}}</div>
            <a
              href=""
              class="bullshit__return-home"
            >回到主页</a>
          </div>
        </div>
      </div>
    </el-main>
    <el-footer :height="mobile?'300':'250'">
      <main-footer></main-footer>
    </el-footer>
  </el-container>

</template>

<script>
import { Header, MainFooter } from "../layout/components";
import { isMobile } from "@/utils/mobile";
export default {
  name: 'Page404',
  components: {
    Header,
    MainFooter
  },
  data () {
    return {
      mobile: isMobile(),
      empty: {
        main: './static/assets/404_images/404.png',
        cloud: './static/assets/404_images/404_cloud.png',
      },
      reason: '路由名称与对应的示例名称不匹配 & 该示例或者该资源已下架 & 司马云IGserver正在重启中...'
    };
  },
  computed: {
    message () {
      return '你不能访问这个网页...';
    }
  }
}
</script>

<style lang="scss" scoped>
.el-footer {
  padding: 0 0px;
}
.overview-header {
  background-image: url('../../../public/static/assets/total/totallogo.png');
}
.webclient-empty-wrapper {
  padding: 0px;
  min-height: 70vh;
  margin: 0px 0px;
}
.wscn-http404 {
  position: relative;
  width: 1200px;
  padding: 0 50px;
  margin: 48px 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row;
  .pic-404 {
    position: relative;
    float: left;
    width: 600px;
    overflow: hidden;
    &__parent {
      width: 100%;
    }
    &__child {
      position: absolute;
      &.left {
        width: 80px;
        top: 17px;
        left: 220px;
        opacity: 0;
        animation-name: cloudLeft;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      &.mid {
        width: 46px;
        top: 10px;
        left: 420px;
        opacity: 0;
        animation-name: cloudMid;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1.2s;
      }
      &.right {
        width: 62px;
        top: 100px;
        left: 500px;
        opacity: 0;
        animation-name: cloudRight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      @keyframes cloudLeft {
        0% {
          top: 17px;
          left: 220px;
          opacity: 0;
        }
        20% {
          top: 33px;
          left: 188px;
          opacity: 1;
        }
        80% {
          top: 81px;
          left: 92px;
          opacity: 1;
        }
        100% {
          top: 97px;
          left: 60px;
          opacity: 0;
        }
      }
      @keyframes cloudMid {
        0% {
          top: 10px;
          left: 420px;
          opacity: 0;
        }
        20% {
          top: 40px;
          left: 360px;
          opacity: 1;
        }
        70% {
          top: 130px;
          left: 180px;
          opacity: 1;
        }
        100% {
          top: 160px;
          left: 120px;
          opacity: 0;
        }
      }
      @keyframes cloudRight {
        0% {
          top: 100px;
          left: 500px;
          opacity: 0;
        }
        20% {
          top: 120px;
          left: 460px;
          opacity: 1;
        }
        80% {
          top: 180px;
          left: 340px;
          opacity: 1;
        }
        100% {
          top: 200px;
          left: 300px;
          opacity: 0;
        }
      }
    }
  }
  .bullshit {
    position: relative;
    float: left;
    width: 300px;
    padding: 30px 0;
    overflow: hidden;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>