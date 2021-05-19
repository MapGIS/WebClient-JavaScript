<template>
    <div class="overview-header">
        <div class="title">插件<span>PLUG-IN&nbsp;UNIT</span></div>
        <div class="overview-nav">
            <router-link to="/total/plugins">
                <div :class="['item', { select: $route.path === '/total/plugins' }]">
                    插件列表
                    <div class="triangle"></div>
                </div>
            </router-link>
            <router-link to="/total/detailChart">
                <div :class="['item', { select: $route.path === '/total/detailChart' }]">
                    详细图表
                    <div class="triangle"></div>
                </div>
            </router-link>
            <router-link to="/total/pluginTags">
                <div :class="['item', { select: $route.path === '/total/pluginTags' }]">
                    插件标签
                    <div class="triangle"></div>
                </div>
            </router-link>
            <router-link to="/total/bugCommit">
                <div :class="['item', { select: $route.path === '/total/bugCommit' }]">
                    提交bug
                    <div class="triangle"></div>
                </div>
            </router-link>
            <router-link to="/total/other">
                <div :class="['item', { select: $route.path === '/total/other' }]">
                    其他
                    <div class="triangle"></div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'plugin-tab'
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.overview-header {
  width: 100%;
  height: 240px;
  background-image: url('../../../public/static/assets/total/totallogo.png');
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
      padding: 0 10vw;
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
</style>
