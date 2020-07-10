<template>
  <el-timeline class="gallery-fix-anchors">
    <el-timeline-item
      v-for="(item, index) in anchors"
      :key="index"
      :color="getColor(item.anchor)"
      :class="{'active': isActive(item.anchor)}"
    >
      {{item.name}}
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
      if (this.isActive(key)) return '#33dbe8'
      else return ''
    }
  },
}
</script>
<style lang="scss">
.gallery-fix-anchors {
  .active {
    color: #33dbe8;
    .el-timeline-item__content {
      color: #33dbe8;
    }
  }
  .el-timeline-item__node--normal {
    left: -3px;
    width: 12px;
    height: 12px;
  }
  .el-timeline-item__node {
    border: 2px solid #ffffff;
  }
  .el-timeline-item__content {
    color: #ffffff;
  }
}
</style>

