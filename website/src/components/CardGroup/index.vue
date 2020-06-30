<template>
  <div>
    <el-col :span="24">
      <el-col
        :span="24"
        class="col-divider-style gallery-divider"
      >
        <el-divider
          :id="folder"
          :key="title"
          content-position="left"
        >
          <el-tag
            v-if="secondname"
            type="info"
            effect="light"
          >{{ secondname }}</el-tag>
          <el-divider
            v-if="secondname"
            direction="vertical"
          ></el-divider>
          <el-tag
            type="info"
            effect="light"
          >{{ title }}</el-tag>
        </el-divider>
      </el-col>
      <el-col
        :xs="12"
        :sm="8"
        :md="6"
        :lg="4"
        :xl="4"
        v-for="item in cards"
        :key="item.name"
      >
        <card-view
          :id="item.file"
          :name="item.name"
          :file="item.file"
          :detail="item.detail"
          :update="item.update"
          :image="item.icon"
          :type="type"
          :firstkind="firstkind"
          :secondkind="secondkind"
        ></card-view>
      </el-col>
    </el-col>
  </div>
</template>

<script>
import CardView from "@/components/CardView/index";

export default {
  name: "card-group",
  components: {
    CardView
  },
  data () {
    return {
      nullImg: "./static/assets/components/CardGroup/null-img.png",
      cards: this.cardList
    };
  },
  watch: {
    cardList (val) {
      this.cards = val;
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    folder: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    firstkind: {
      type: String
    },
    secondkind: {
      type: String
    },
    firstname: {
      type: String
    },
    secondname: {
      type: String
    },
    cardList: {
      type: Array,
      required: true
    }
  },
  computed: {}
};
</script>

<style lang="less">
.gallery-divider {
  background: transparent;

  /* .el-divider--horizontal {
    display: block;
    height: 10px;
    width: 100%;
    margin: 24px 6px;
  } */

  /* .el-divider {
    background: linear-gradient(
      90deg,
      rgba(71, 148, 250, 1),
      rgba(49, 225, 230, 1)
    );
    position: relative;
  } */
}
.col-divider-style {
  margin-top: 16px;
  margin-bottom: 10px;
}

.card-breadcrumb-content {
  width: calc(100vw - 200px);
}
.title {
  /* background: #f0f0f0; */
  margin-top: 30px;
  margin-bottom: 5px;
  border-radius: 3px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.card-group {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.card-breadcrumb {
  height: 36px;
  width: 100%;
  background: #f00;
  margin-left: 10px;
  margin-top: 15px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
  font-size: 13px;
}

.float-card {
  float: left;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.card-image {
  height: 100%;
  width: 300px;
}
</style>