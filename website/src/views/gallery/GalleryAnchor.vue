<template>
  <el-timeline class="gallery-fix-anchors">
    <el-timeline-item
      v-for="(item, index) in anchors"
      :key="index"
      :color="getColor(item.anchor)"
      :class="{'active': isActive(item.anchor)}"
    >
      <span @click="handleClick(item.anchor)"
            :class="{'active': isActive(item.anchor), 'anchor-text': true}"
      >{{item.name}}
      </span>
    </el-timeline-item>
  </el-timeline>
</template>
<script>
export default {
  props: {
    anchors: Array,
    active: Array
  },
  data () {
    return {
    };
  },
  methods: {
    isActive (key) {
      const { active } = this;
      if (!active || active.length <= 0) return false;
      if (active[active.length - 1] === key) {
        return true;
      }
      return false;
    },
    getColor (key) {
      if (this.isActive(key)) return '#3A85C6'
      else return ''
    },
    handleClick (key) {
      let href = window.location.href.split("#");
      let localte = `#${key}`;

      if (href.length >= 2) {
        let newHref = href[0] + "#" + href[1] + localte;
        window.location.href = newHref;
      }
    }
  },
}
</script>
<style lang="scss">
.gallery-fix-anchors {
  .active {
    color: #3A85C6 !important;
    .el-timeline-item__content {
      color: #3A85C6;
    }
  }
  .el-timeline-item__node--normal {
    left: -2.5px;
    width: 12px;
    height: 12px;
  }
  .el-timeline-item__node {
    border: 2px solid #ffffff;
  }
  .el-timeline-item__content {
    color: #303133;
    font-size: 12px;
// max-width: 96px;
}
.anchor-text {
color: #303133;
// font-weight: bold;
}
}

</style>

