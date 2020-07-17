<template>
  <div
    class="flat-card-component"
    @mouseover="handleInStyle"
    @mouseout="handleOutStyle"
  >
    <img
      :src="src"
      class="image"
    />
    <div class="title">
      {{title}}
    </div>
    <div class="subtitle">
      {{subtitle}}
    </div>
    <div class="actions">
      <router-link :to="routeGallery">
        <span>示例</span>
      </router-link>
      <el-divider direction="vertical"></el-divider>
      <a
        :href="routeAPI"
        target="_blank"
      >
        <span>API</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    icon: String,
    iconHover: String,
    title: String,
    subtitle: String,
    index: String,
    routeGallery: String,
    routeAPI: String
  },
  mounted () {
    this.src = this.icon;
  },
  data () {
    return {
      src: this.icon
    };
  },
  methods: {
    handleInStyle () {
      this.src = this.iconHover;
    },
    handleOutStyle () {
      this.src = this.icon;
    }
  }
};
</script>


<style lang="scss">
.flat-card-component {
  text-align: center;
  width: 205px;
  .image {
    width: 123px;
    height: 123px;
    background: transparent;
  }
  .title {
    width: 100%;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 23px;
  }
  .subtitle {
    margin-top: 29px;
    width: 100%;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 300;
    color: rgba(102, 102, 102, 1);
    line-height: 24px;
  }
  .actions {
    margin-top: 16px;
  }
}
</style>