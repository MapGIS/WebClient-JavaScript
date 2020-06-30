<template>
  <div class="download-wrapper">
    <br />
    <el-divider>
      <h2>下载</h2>
    </el-divider>
    <el-row>
      <h4>在这里，可以下载到所有您需要的中地数码 WebClient 产品。</h4>
      <h2>10.3.4.10</h2>
      <el-row>
        <el-tooltip
          class="item"
          effect="dark"
          content="包含webclient主脚本以及三方cdn脚本"
          placement="bottom"
        >
          <el-button type="primary"><a
              href="/static/download/webclient-all.rar"
              download="webclient-all.rar"
            >完整包</a></el-button>
        </el-tooltip>
        <el-divider direction="vertical"></el-divider>
        <span>该包含有webclient四大主脚本以及所需的全部的三方cdn脚本</span>
      </el-row>
      <br />
      <el-row>
        <el-tooltip
          class="item"
          effect="dark"
          content="只包含webclient主脚本"
          placement="bottom"
        >
          <el-button
            type="info"
            plain
          ><a
              href="/static/download/webclient-min.rar"
              download="webclient-min.rar"
            >精简包</a></el-button>
        </el-tooltip>
        <el-divider direction="vertical"></el-divider>
        <span>只包含webclient主脚本</span>
      </el-row>
    </el-row>
    <el-divider>
      <h2>Npm</h2>
    </el-divider>
    <el-row>
      <h4>npm上的版本是release包，按需引入。</h4>
      <el-tag
        class="download-tag"
        effect="plain"
        type="info"
      >
        npm install @mapgis/webclient
      </el-tag>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="scss">
.download-wrapper {
  width: 80vw;
  margin: 10px auto;
  a {
    color: #ffffff;
  }
  .download-tag {
    width: 100%;
  }
}
</style>