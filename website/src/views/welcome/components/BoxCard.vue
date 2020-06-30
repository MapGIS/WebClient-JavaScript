<template>
  <div class="box-card-component">
    <router-link :to="index">
      <el-card shadow="hover">
        <div class="box-card-header">
          <img
            :src="src"
            :style="imageStyle"
          />
        </div>
        <div>
          <div class="box-card-wrapper">
            <span class="title">{{ title }}</span>
            <div class="subtitle">
              <span>{{ subtitle }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </router-link>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    imageStyle: String,
    src: String,
    title: String,
    subtitle: String,
    index: String
  },
  data () {
    return {
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      }
    };
  }
};
</script>


<style lang="scss">
.box-card-component {
  border-radius: 4px;
  background: transparent;
  height: fit-content;
  width: 100%;
  // text-align: center;
  .el-card {
    background: transparent;
  }
  .el-card__body {
    padding: 0px;
    background: transparent;
  }

  .box-card-header {
    position: relative;
    height: fit-content;
    img {
      // width: 220px;
      min-height: 120px;
      min-width: 120px;
      margin: 0 auto;
      text-align: center;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }

  @media only screen and (max-width: 1510px) {
    .mallki-text {
      display: none;
    }
  }
  .box-card-wrapper {
    padding: 20px 16px;
  }
  .title {
    margin-top: 20px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
  }
  .subtitle {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 300;
    color: rgba(102, 102, 102, 1);
    line-height: 25px;
    height: 48px;
  }
}
.box-card-component:hover {
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    rgba(71, 148, 250, 1),
    rgba(49, 225, 230, 1)
  );
  .title {
    color: #ffffff;
  }
  .subtitle {
    color: #ffffff;
  }
}
</style>