<template>
  <div class="content">
    <div class="content-head">
      <el-row type="flex" class="row-bg" justify="space-around" :gutter="30">
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <span class="head-text">Leaflet</span>
              <p class="head-star">★ 22030</p>
              <ul class="head-list">
                <li>6602 Commits提交</li>
                <li>90 Branches分支</li>
                <li>38 Release版本</li>
                <li>573 Contributors维护人员</li>
              </ul>
            </div>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <span class="head-text">Cesium</span>
              <p class="head-star">★ 3314</p>
              <ul class="head-list">
                <li>27738 Commits提交</li>
                <li>89 Branches分支</li>
                <li>81 Release版本</li>
                <li>161 Contributors维护人员</li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <span class="head-text">Mapbox GL</span>
              <p class="head-star">★ 3171</p>
              <ul class="head-list">
                <li>8162 Commits提交</li>
                <li>83 Branches分支</li>
                <li>127 Release版本</li>
                <li>198 Contributors维护人员</li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <span class="head-text">OpenLayers</span>
              <p class="head-star">★ 3786</p>
              <ul class="head-list">
                <li>23782 Commits提交</li>
                <li>11 Branches分支</li>
                <li>185 Release版本</li>
                <li>214 Contributors维护人员</li>
              </ul>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="content-main">
      <el-row type="flex" justify="space-around" class="banner">
        <el-col :span="20">
          <div
            class="warning"
          >选择的方式主要是根据业务需求，主要分为: 传统GIS业务(Leaflet)，三维业务(Cesium)，互联网展示型(MapboxGL)，老ie浏览器，老业务维护(OpenLayers).</div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="20">
          <el-tabs tab-position="top" style="margin-top:30px;" :stretch="true">
            <el-tab-pane label="Leaflet">
              <div>
                <div class="tip">
                  <h3>Leaflet是常规的的最适合常规gis开发的地图，因此核心功能就是“传统GIS”功能.</h3>
                </div>

                <el-row>
                  <el-divider>
                    <h3>优点</h3>
                  </el-divider>
                </el-row>

                <el-row
                  type="flex"
                  class="row-bg left-text"
                  justify="space-around"
                  style="margin-top:20px"
                >
                  <el-col :span="5">
                    <img :src="leafletg1" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>1.主流投影坐标支持</h3>
                    <el-tag type="primary">PROJECTION</el-tag>
                    <h4>几乎所有的主流投影坐标系都可以支持</h4>
                  </el-col>

                  <el-col :span="5">
                    <img :src="leafletg2" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>2.矢量表达</h3>
                    <el-tag type="primary">VECTOR GRAPHIC</el-tag>
                    <h4>矢量专题图，矢量空间分析，矢量瓦片，矢量可视化等矢量表达</h4>
                  </el-col>
                </el-row>
                <el-row
                  type="flex"
                  class="row-bg left-text"
                  justify="space-around"
                  style="margin-top:20px"
                >
                  <el-col :span="5">
                    <img :src="leafletg3" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>3.全样式表达</h3>
                    <el-tag type="primary">D3</el-tag>
                    <el-tag type="primary">Echarts</el-tag>
                    <el-tag type="primary">MapV</el-tag>
                    <h4>结合主流的互联网客户四化技术D3,Echarts,Mapv，几乎主要的地图的可视化表达都可以实现.</h4>
                  </el-col>

                  <el-col :span="5">
                    <img :src="leafletg4" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>4.功能全，操作友好</h3>
                    <el-tag type="primary">GITHUB</el-tag>
                    <el-tag type="primary">BAIDU</el-tag>
                    <el-tag type="primary">GOOGLE</el-tag>
                    <h4>功能全，插件丰富，社区生态完善.出现bug几乎百度找到，对开发者友好.</h4>
                  </el-col>
                </el-row>
                <el-row
                  type="flex"
                  class="row-bg left-text"
                  justify="space-around"
                  style="margin-top:20px"
                >
                  <el-col :span="5">
                    <img :src="leafletg5" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>5.跨平台</h3>
                    <el-tag type="primary">CHROME</el-tag>
                    <el-tag type="primary">IE</el-tag>
                    <el-tag type="primary">FIREFOX</el-tag>
                    <h4>兼容大部分浏览器，跨平台强.</h4>
                  </el-col>

                  <el-col :span="5">
                    <img :src="leafletg6" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>6.移动设备的支持</h3>
                    <el-tag type="primary">MOBILE</el-tag>
                    <h4>内部代码框架设计的时候考虑到移动设备的支持.针对移动设备天然支持.</h4>
                  </el-col>
                </el-row>

                <el-row>
                  <el-divider>
                    <h3>缺点</h3>
                  </el-divider>
                </el-row>

                <el-row>
                  <el-tag type="danger">没有使用webgl进行渲染，在可视化表达上差一点点（其实是显卡越贵差距越大）</el-tag>
                </el-row>
                <p />
                <el-row>
                  <el-tag type="danger">没有使用硬件加速，在数据量上没有发挥硬件的最大效果</el-tag>
                </el-row>

                <el-row>
                  <el-divider>
                    <h3>维护与跟进</h3>
                  </el-divider>
                </el-row>

                <el-row>
                  <el-tag type="primary">Leaflet-IGSserver主框架:基础平台-龚跃健</el-tag>
                </el-row>
                <p />
                <el-row>
                  <el-tag type="success">Leaflet-DataStore/开源插件:基础平台-潘卓然</el-tag>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Cesium">
              <div>
                <div class="tip">
                  <h3>Cesium强调的是BIM三维模型，倾斜摄影的表达，重点在于三维建模与时态模拟.</h3>
                </div>

                <el-row>
                  <el-divider>
                    <h3>优点</h3>
                  </el-divider>
                </el-row>

                <el-row
                  type="flex"
                  class="row-bg left-text"
                  justify="space-around"
                  style="margin-top:20px"
                >
                  <el-col :span="5">
                    <img :src="cesiumg1" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>1.倾斜摄影</h3>
                    <el-tag type="primary">MODEL</el-tag>
                    <h4>支持倾斜摄影，地形，海洋环境等三维场景展现...</h4>
                  </el-col>

                  <el-col :span="5">
                    <img :src="cesiumg2" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>2.M3D 3d瓦片</h3>
                    <el-tag type="primary">3D TILES</el-tag>
                    <h4>支持中地数码独家的三维瓦片格式：m3d.</h4>
                  </el-col>
                </el-row>
                <el-row
                  type="flex"
                  class="row-bg left-text"
                  justify="space-around"
                  style="margin-top:20px"
                >
                  <el-col :span="5">
                    <img :src="cesiumg3" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>3.BIM三维建模</h3>
                    <el-tag type="primary">BIM</el-tag>
                    <el-tag type="primary">MODEL</el-tag>
                    <h4>支持BIM管网建模和3dx,gltf,中地模型的展示.</h4>
                  </el-col>

                  <el-col :span="5">
                    <img :src="cesiumg4" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>4.时态表达</h3>
                    <el-tag type="primary">TIME</el-tag>
                    <h4>支持时态，时间播放，时间动画，时空聚类等时空展现.</h4>
                  </el-col>
                </el-row>

                <el-row>
                  <el-divider>
                    <h3>缺点</h3>
                  </el-divider>
                </el-row>

                <el-tag type="danger">1.webgl的渲染没有类似unity的特殊光晕效果，虽然使用了webgl但效果平平</el-tag>
                <p />
                <el-tag type="danger">2.独特自成体系的模型与几何绘制策略，需要重新学习</el-tag>
                <p />
                <el-tag type="danger">3.代码过重，并且主视图必须获取顶级div，影响工程代码结构,复杂场景需要手动开辟释放内存</el-tag>

                <el-row>
                  <el-divider>
                    <h3>互联网高效教程</h3>
                  </el-divider>
                </el-row>

                <el-tag type="warning">
                  <a
                    href="https://github.com/vtxf/Cesium-Tutorials-Index"
                    target="_blank"
                  >Cesium-Tutorials-Index</a>
                </el-tag>

                <el-row>
                  <el-divider>
                    <h3>维护与跟进</h3>
                  </el-divider>
                </el-row>

                <el-row>
                  <el-tag type="primary">Cesium-主框架：基础平台-邱文坤、冯桂英、周凌风</el-tag>
                </el-row>
                <p />
                <el-row>
                  <el-tag type="success">Cesium-插件：基础平台-潘卓然</el-tag>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Mapbox GL">
              <div>
                <div class="tip">
                  <h3>Mapbox GL主要是构建世界上最漂亮的地图，因此核心功能就是一个“看”字.</h3>
                </div>

                <el-row>
                  <el-divider>
                    <h3>优点</h3>
                  </el-divider>
                </el-row>

                <el-row
                  type="flex"
                  class="row-bg left-text"
                  justify="space-around"
                  style="margin-top:20px"
                >
                  <el-col :span="5">
                    <img :src="mapboxg1" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>1.高效矢量瓦片</h3>
                    <el-tag type="primary">VECTOR TILE</el-tag>
                    <h4>真正高效实用的矢量瓦片</h4>
                  </el-col>

                  <el-col :span="5">
                    <img :src="mapboxg2" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>2.顶级可视化</h3>
                    <el-tag type="primary">DATAVIEW</el-tag>
                    <h4>真正顶级的可视化渲染，mapboxGL,echartGL，KeplerGl等</h4>
                  </el-col>
                </el-row>
                <el-row
                  type="flex"
                  class="row-bg left-text"
                  justify="space-around"
                  style="margin-top:20px"
                >
                  <el-col :span="5">
                    <img :src="mapboxg3" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>3.高清矢量图形</h3>
                    <el-tag type="primary">VECTOR GRAPHIC</el-tag>
                    <h4>真正顶级的高清矢量图形绘制SVG，Canvas.</h4>
                  </el-col>

                  <el-col :span="5">
                    <img :src="mapboxg4" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>4.Top级互联网技术加持</h3>
                    <el-tag type="primary">Top</el-tag>
                    <h4>国内Baidu，国外Uber，Mapbox等顶级可视化巨头技术加持.</h4>
                  </el-col>
                </el-row>

                <el-row>
                  <el-divider>
                    <h3>缺点</h3>
                  </el-divider>
                </el-row>

                <el-tag type="danger">1.只支持经纬度/web墨卡托投影：EPSG：4326/3857</el-tag>
                <p />
                <el-tag type="danger">2.三维表达局限于高程和基本高程无法支持海量DEM三维模型</el-tag>

                <el-row>
                  <el-divider>
                    <h3>互联网高效教程</h3>
                  </el-divider>
                </el-row>

                <el-tag type="warning">
                  <a
                    href="http://echarts.baidu.com/examples/index.html#chart-type-globe"
                    target="_blank"
                  >Echart-GL</a>
                </el-tag>
                <el-tag type="warning">
                  <a href="https://github.com/uber/kepler.gl" target="_blank">Kepler-GL</a>
                </el-tag>

                <el-row>
                  <el-divider>
                    <h3>维护与跟进</h3>
                  </el-divider>
                </el-row>

                <el-tag type="primary">MapboxGL主框架：基础平台-潘卓然</el-tag>
                <p />
                <el-tag type="success">MapboxGL插件：基础平台-潘卓然</el-tag>
              </div>
            </el-tab-pane>
            <el-tab-pane label="OpenLayers">
              <div>
                <div class="tip">
                  <h3>Openlayers强调的是老ie等浏览器的兼容性.</h3>
                </div>

                <el-row>
                  <el-divider>
                    <h3>优点</h3>
                  </el-divider>
                </el-row>

                <el-row
                  type="flex"
                  class="row-bg left-text"
                  justify="space-around"
                  style="margin-top:20px"
                >
                  <el-col :span="5">
                    <img :src="openlayersg1" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>1.主流投影坐标系</h3>
                    <el-tag type="primary">PROJECTION</el-tag>
                    <h4>几乎所有的主流投影坐标系都可以支持</h4>
                  </el-col>

                  <el-col :span="5">
                    <img :src="openlayersg2" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>2.脚本一体化</h3>
                    <el-tag type="primary">JAVASCRIPT</el-tag>
                    <h4>功能全并且集成到官方脚本</h4>
                  </el-col>
                </el-row>
                <el-row
                  type="flex"
                  class="row-bg left-text"
                  justify="space-around"
                  style="margin-top:20px"
                >
                  <el-col :span="5">
                    <img :src="openlayersg3" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>3.ogc协议</h3>
                    <el-tag type="primary">OGC</el-tag>
                    <h4>几乎是最遵循ogc协议的脚本了</h4>
                  </el-col>

                  <el-col :span="5">
                    <img :src="openlayersg4" class="card-image" />
                  </el-col>

                  <el-col :span="5">
                    <h3>4.兼容性</h3>
                    <el-tag type="primary">IE</el-tag>
                    <h4>兼容老的ie6789等疑难浏览器问题.</h4>
                  </el-col>
                </el-row>

                <el-row>
                  <el-divider>
                    <h3>缺点</h3>
                  </el-divider>
                </el-row>

                <el-tag type="danger">1.功能大，很多功能有实现但是实际使用效果不理想</el-tag>
                <p />
                <el-tag type="danger">2.可视化表达一般</el-tag>

                <el-row>
                  <el-divider>
                    <h3>维护与跟进</h3>
                  </el-divider>
                </el-row>
                <el-tag type="primary">Openlayers-主框架：基础平台-龚跃健</el-tag>
                <p />
                <el-tag type="success">Openlayers-插件：基础平台-潘卓然</el-tag>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leafletg1: "./static/assets/total/select/leaflet-good-1.png",
      leafletg2: "./static/assets/total/select/leaflet-good-2.gif",
      leafletg3: "./static/assets/total/select/leaflet-good-3.gif",
      leafletg4: "./static/assets/total/select/leaflet-good-4.jpg",
      leafletg5: "./static/assets/total/select/leaflet-good-5.png",
      leafletg6: "./static/assets/total/select/leaflet-good-6.png",

      cesiumg1: "./static/assets/total/select/cesium-good-1.jpg",
      cesiumg2: "./static/assets/total/select/cesium-good-2.jpg",
      cesiumg3: "./static/assets/total/select/cesium-good-3.jpg",
      cesiumg4: "./static/assets/total/select/cesium-good-4.jpg",

      mapboxg1: "./static/assets/total/select/mapboxgl-good-1.png",
      mapboxg2: "./static/assets/total/select/mapboxgl-good-2.png",
      mapboxg3: "./static/assets/total/select/mapboxgl-good-3.png",
      mapboxg4: "./static/assets/total/select/mapboxgl-good-4.png",

      openlayersg1: "./static/assets/total/select/openlayer-good-1.png",
      openlayersg2: "./static/assets/total/select/openlayer-good-2.png",
      openlayersg3: "./static/assets/total/select/openlayer-good-3.png",
      openlayersg4: "./static/assets/total/select/openlayer-good-4.jpg"
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.banner {
  padding-top: 20px;
  text-align: space-around;
}

h2 {
  margin: 0;
  line-height: 48px;
  color: #555;
}

.left-text h3 {
  font-size: 18px;
  font-weight: 400;
  margin: 0 0 30px;
  color: #1f2d3d;
}

.left-text h4 {
  color: #5e6d82;
  font-weight: 400;
}

.content {
  margin-left: 5%;
  margin-right: 5%;
}

.content-head {
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 50px;
}

.content-main {
  box-sizing: border-box;
  border-radius: 10px;
  /* background-color: #eee; */
  text-align: space-around;
  padding: 10px;
  margin-top: 30px;
}

.head-text {
  font-size: 20px;
  font-weight: bold;
  color: #50bfff;
}

.head-star {
  font-size: 35px;
  font-weight: bold;
  color: #e91e63;
}

.head-list {
  font-size: 15px;
  font-weight: bold;
  color: #070707;
}

.card-image {
  width: 180px;
  height: 150px;
  margin-right: 0px;
}

.left-text {
  text-align: left;
}

.image-head {
  height: 300px;
}

.first-title {
  margin-top: 50px;
}

.tip {
  padding: 8px 16px;
  background-color: #ecf8ff;
  border-radius: 4px;
  border-left: 5px solid #50bfff;
  margin: 20px 0;
  line-height: 38px;
  color: #555;
  font-size: 14px;
}

.warning {
  padding: 8px 16px;
  background-color: #fff6f7;
  border-radius: 4px;
  border-left: 5px solid #fe6c6f;
  margin: 20px 0;
  font-size: 16px;
  font-weight: bold;
  line-height: 38px;
  color: #555;
}

.important {
  color: #e91e63 !important;
  font-weight: bold;
}

.primaryrmation {
  color: #67c23a;
  font-weight: bold;
}

.el-tabs__nav-wrap {
  text-align: center;
}
.el-tabs__nav-scroll {
  display: inline-block;
}
.el-tabs__nav {
  // width: 100%;
  display: flex;
  // display: inline-block;
  justify-content: space-around;
  text-align: center;
}
</style>