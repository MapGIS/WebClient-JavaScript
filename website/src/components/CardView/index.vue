<template>
  <div class="gallery-card-div">
    <router-link :to="linkUrl">
      <el-card
        class="gallery-card-wrapper"
        :id="file"
        shadow="hover"
      >
        <div
          slot="header"
          class="box-card-header"
        >
          <img
            lazy
            v-lazy="imgUrl"
            class="card-image"
          />
          <!-- <el-image
            lazy
            :src="imgUrl"
            :scroll-container="webclientScrollContainer"
            class="card-image"
          >
            <div
              slot="error"
              class="card-image"
            >
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image> -->
        </div>
        <div style="position:relative;">
          <span class="title">{{ name }}</span>
        </div>
      </el-card>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "card-view",
  components: {},
  data () {
    return {
      webclientScrollContainer: "el-scrollbar__wrap",
      lazyImg: true,
      nullImg: "./static/assets/components/CardGroup/null-img.png",
      nullUser: "./static/assets/user/admin-big.png",
      imgUrl: this.getImageUrl(
        this.type,
        this.image,
        this.firstkind,
        this.secondkind
      ),
      linkUrl: this.getLinkUrl(
        this.type,
        this.file,
        this.firstkind,
        this.secondkind
      )
    };
  },
  watch: {
    type (val) {
      let { file, image, firstkind, secondkind } = this;
      this.imgUrl = this.getImageUrl(val, image, firstkind, secondkind);
      this.linkUrl = this.getLinkUrl(val, file, firstkind, secondkind);
    },
  },
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    firstkind: {
      type: String
    },
    secondkind: {
      type: String
    },
    file: {
      type: String,
      required: true
    },
    update: {
      type: String,
      required: true
    },
    detail: {
      type: String
    },
    image: {
      type: String,
      required: true
    }
  },
  methods: {
    getImageUrl (type, image, first, second) {
      var baseUrl = "./static/demo/";
      var imageUrl = baseUrl + type + "/gallery/" + first + "/";
      if (second !== undefined) {
        imageUrl = imageUrl + second + "/" + image;
      } else {
        imageUrl = imageUrl + image;
      }
      return imageUrl;
    },
    getLinkUrl (type, file, firstkind, secondkind) {
      var baseUrl = "/demo/" + type + "/" + firstkind + "/";
      if (secondkind !== undefined) {
        baseUrl = baseUrl + secondkind + "/" + file;
      } else {
        baseUrl += file;
      }
      return baseUrl;
    }
  }
};
</script>

<style lang="scss">
.gallery-card-div {
    margin: 4px;
    display: flex;
    .card-image {
        height: 256px;
        width: 256px;
        /* min-height: 256px;
    min-width: 256px; */
    }
    .el-card__header {
        padding: 0px 0px;
        border-bottom: 1px solid #ebeef5;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .el-card {
        background: transparent;
    }
    .el-card__body {
        background: transparent;
    }
    .gallery-card-wrapper {
        .box-card-header {
            position: relative;
            margin-top: 0px;
            margin-left: 0px;
            margin-right: 0px;
            height: 100%;
            /* width: calc( 20vw - 60px); */
            img {
                height: 100%;
                width: 100%;
                transition: all 0.2s linear;
                &:hover {
                    transform: scale(1.1, 1.1);
                    /* filter: contrast(130%); */
                }
            }
            .title {
                font-size: 18px;
            }
        }
        .card-content {
            // width: calc( (100vw - 550px) / 4);
            /* width: 250px; */
            span {
                color: #888;
            }
        }
        span {
            font-size: 14px;
        }
    }
}
.gallery-card-wrapper:hover {
    border-radius: 4px;
    background: linear-gradient(90deg, rgba(71, 148, 250, 1), rgba(49, 225, 230, 1));
    .title {
        color: #ffffff;
    }
    .el-icon-picture-outline {
        height: 256px;
        width: 256px;
        background: #888;
    }
}
</style>