<template>
  <div :class="{'gallery-image-col':true, 'gallery-image-col-mobile':mobile}">
    <div
      v-for="(item, i) in list"
      :key="i"
      class="gallyer-image-wrapper"
    >
      <div
        class="gallyer-image-select"
        v-if="isCurrent(item.file)"
        v-on:click="changeUrl(item.file)"
      >
        <el-card
          :body-style="{ padding: '0px'}"
          shadow="hover"
        >
          <img
            :src="nullImg"
            v-lazy="getImageUrl(item.icon)"
            class="image"
          />
        </el-card>
      </div>
      <div
        class="gallyer-image-unselect"
        v-else
        v-on:click="changeUrl(item.file)"
      >
        <el-card
          :body-style="{ padding: '0px'}"
          shadow="hover"
        >
          <img
            :src="nullImg"
            v-lazy="getImageUrl(item.icon)"
            class="image"
          />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { isMobile } from "@/utils/mobile";

export default {
  name: "layout",
  components: {},
  data () {
    return {
      mobile: isMobile(),
      nullImg: "./static/assets/components/CardGroup/null-img.png",
      current: this.getCurrentKind()
    };
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  watch: {
    "$route.path" () {
      this.getCurrentKind();
    }
  },
  methods: {
    getImageUrl (icon) {
      let anchors = location.href.split("#");
      if (!anchors || anchors.length < 2) return;

      let hrefs = anchors[1].split("/").slice(2);
      var baseUrl = "./static/demo/";
      var imageUrl;
      if (hrefs.length <= 3) {
        imageUrl = baseUrl + hrefs[0] + "/gallery/" + hrefs[1] + "/" + icon;
      } else {
        imageUrl =
          baseUrl +
          hrefs[0] +
          "/gallery/" +
          hrefs[1] +
          "/" +
          hrefs[2] +
          "/" +
          icon;
      }
      return imageUrl;
    },
    getCurrentKind () {
      let anchors = location.href.split("#");
      if (!anchors || anchors.length < 2) return;

      let hrefs = anchors[1].split("/").slice(2);
      let kind = hrefs[hrefs.length - 1];
      this.current = kind;
      return kind;
    },
    isCurrent (file) {
      if (file == this.current) return true;
      return false;
    },
    getLinkUrl (file) {
      let anchors = location.href.split("#");
      if (!anchors || anchors.length < 2) return;

      let hrefs = anchors[1].split("/").slice(2);
      var baseUrl = "/demo/" + hrefs[0] + "/" + hrefs[1];
      if (hrefs.length > 3) {
        baseUrl = baseUrl + "/" + hrefs[2] + "/" + file;
      } else {
        baseUrl = baseUrl + "/" + file;
      }
      window.console.log("link", hrefs, baseUrl);
      return baseUrl;
    },
    changeUrl (file) {
      let url = this.getLinkUrl(file);
      this.$router.push(url);
    }
  }
};
</script>

<style lang="less" scoped>
.gallery-image-col-mobile {
  margin: 6px 0px !important;
  .image {
    height: 64px !important;
    width: 64px !important;
  }
}
.gallery-image-col {
  display: flex;
  margin: 10px 0px;
  // overflow-x: scroll;
  overflow-y: hidden;

  .gallyer-image-wrapper {
    margin-right: 6px;
    margin-left: 6px;
    margin-bottom: 6px;
  }

  .gallyer-image-select {
    border-radius: 3px;
    /* box-shadow: 0 0 10px #409eff;
    margin-top: 3px; */
    padding: 4px;
    background: linear-gradient(
      90deg,
      rgba(71, 148, 250, 1),
      rgba(49, 225, 230, 1)
    );
    // border: 3px solid #409eff;
  }

  .gallyer-image-unselect {
    border-radius: 3px;
    background: transparent;
    padding: 4px;
    //border: 3px solid transparent;
  }

  .image {
    height: 96px;
    width: 96px;
  }
}
</style>
