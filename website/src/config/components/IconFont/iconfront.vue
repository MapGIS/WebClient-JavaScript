<template >
  <div class="iconfont-wrapper">
    <svg v-if="iconId" class="icon" aria-hidden="true" @click="click()">
      <use :xlink:href="iconId" />
    </svg>
    <div class="iconfont-text" v-if="name">{{ name }}</div>
    <div class="iconfont-text-none" v-else />
  </div>
</template>

<script>
import "./iconfont";

export default {
  name: "iconfont",
  props: {
    type: {
      type: String,
      default: ""
    },
    name: String
  },
  computed: {
    iconId() {
      return this.type ? `#${this.type}` : "";
    }
  },
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>
<style lang="less">
.iconfont-wrapper {
  display: inline;

  .icon {
    width: 1.15em;
    height: 1.15em;
    vertical-align: -0.125em;
    line-height: 16px;
    fill: currentColor;
    overflow: hidden;
  }

  .iconfont-text {
    display: inline;
    margin-left: 12px;
    // line-height: 12px;
    font-size: 14px;
  }

  .iconfont-text-none {
    display: none;
    margin-left: 12px;
    // line-height: 12px;
    font-size: 14px;
  }
}
</style>