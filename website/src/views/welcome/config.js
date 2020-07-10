export const MainBanners = [
  "./static/assets/bane/banner1.png",
  "./static/assets/bane/banner2.png",
  "./static/assets/bane/banner3.png",
];

export const DetailMains = [
  {
    title: "产品下载",
    subtitle:
      "产品开发包下载，获取开发库、示例、API，即刻快速开发",
  },
  {
    title: "资源中心",
    subtitle:
      "集成丰富的开发资源，技术文档、教学视频等，赋能开发者",
  },
  {
    title: "开源社区",
    subtitle:
      "Github开源社区，获取产品源码，共建共享",
  },
  {
    title: "云听社区",
    subtitle:
      "开发者社区，产品反馈、开发交流与分享，倾听您的声音",
  },
];

export const Develops = [
  {
    icon: "./static/assets/home/cesium.png",
    iconHover: "./static/assets/home/cesium-hover.png",
    routeGallery: '/gallery/cesium',
    routeAPI: './docs/cesium/index.html',
    title: "Cesium",
    subtitle:
      "MapGIS M3D，全新的三维交换格式，支持桌面端、Web端、移动端多平台，高效地质体渲染",
    index: "/",
  },
  {
    icon: "./static/assets/home/mapboxgl.png",
    iconHover: "./static/assets/home/mapboxgl-hover.png",
    routeGallery: '/gallery/mapboxgl',
    routeAPI: './docs/mapboxgl/index.html',
    title: "MapboxGL",
    subtitle:
      "高清经纬度矢量瓦片，个性化前端表达，前端矢量绘制，支持海量地名地址",
    index: "/",
  },
  {
    icon: "./static/assets/home/openlayers.png",
    iconHover: "./static/assets/home/openlayers-hover.png",
    routeGallery: '/gallery/openlayers',
    routeAPI: './docs/openlayers/index.html',
    title: "OpenLayers",
    subtitle:
      "稳定可靠的集成式地图开发脚本，兼容老IE，适合传统的WebGIS开发",
    index: "/",
  },
  {
    icon: "./static/assets/home/leaflet.png",
    iconHover: "./static/assets/home/leaflet-hover.png",
    routeGallery: '/gallery/leaflet',
    routeAPI: './docs/leaflet/index.html',
    title: "Leaflet",
    subtitle:
      "轻量级的地图脚本，丰富插件，优秀拓展性，适合轻应用以及移动端WebGIS开发",
    index: "/",
  },
];

export const Gallerys = [
  {
    icon: "./static/assets/gallery/m3d.png",
    title: "M3D三维协议",
    subtitle: "高效、轻量的新一代三维交换格式",
    index: "/demo/cesium/m3d/m3d-landscape",
  },
  {
    icon: "./static/assets/gallery/assise.png",
    title: "M3D地质建模",
    subtitle: "根据专控动态渲染生成地质模型，高保证，高密度三角网",
    index: "/demo/cesium/m3d/m3d-geobody1",
  },
  {
    icon: "./static/assets/gallery/oblique.png",
    title: "倾斜摄影",
    subtitle: "展示大雁塔的倾斜摄影",
    index: "/demo/cesium/mapgis/mapgis-oblique",
  },
  {
    icon: "./static/assets/gallery/dem.png",
    title: "全球数字高程",
    subtitle: "基于250M、90M、30M的全球数字高程模型展示",
    index: "/demo/cesium/mapgis/mapgis-dem",
  },
  {
    icon: "./static/assets/gallery/biggps.png",
    title: "亿级全球千万GPS点",
    subtitle: "动态渲染全球的GPS热点聚类情况",
    index: "/demo/mapboxgl/client-view/echarts/echartsbiggps",
  },
/*   {
    icon: "./static/assets/gallery/contour.png",
    title: "等高线",
    subtitle: "展示不同高度不同线性粗细的等高线",
    index: "",
  }, */
  {
    icon: "./static/assets/gallery/commons.png",
    title: "聚类分布",
    subtitle: "动态展示聚类的强度以及范围",
    index: "/demo/leaflet/client-view/common/common_cluster",
  },
  {
    icon: "./static/assets/gallery/vectortile.png",
    title: "矢量瓦片",
    subtitle: "前端动态渲染矢量绘制能力-个性化地图表达",
    index: "/demo/mapboxgl/client-view/vectortile/mapgisstyle",
  },
  {
    icon: "./static/assets/gallery/chinadata.png",
    title: "海量矢量数据",
    subtitle: "国家级数据量的高效渲染，高比例尺地物",
    index: "/demo/mapboxgl/client-view/vectortile/lightstyle",
  },
];

export const DetailBanners = [
  {
    title: '集成四大开源地图库',
    detail: '集成OpenLayers、Leaflet、MapBoxGL、Cesium四大地图开源框架，同时接入了MapGIS服务器、大数据存储、大数据分析、智能GIS、云运维等云服务器产品提供的数据和功能服务，轻松实现地图二三维应用开发',
    icon: './static/assets/bane/sub1.png',
  },
  {
    title: '融合热门前端可视化技术',
    detail: '集成Echarts、MapV、D3等主流开源可视化技术，全面对接全空间、大数据、智能GIS的云GIS服务器，深入大数据挖掘，展示绚丽前端渲染效果',
    icon: './static/assets/bane/sub2.png',
  },
  {
    title: '支持多样化的开发方式',
    detail: '拥有酷炫的空间数据快速可视化能力、大数据深度融合的数据运维分析能力、便捷的Web端应用可视化搭建开发能力，提供H5原生JS开发、Node.js开发、组件式Vue的开发方式',
    icon: './static/assets/bane/sub3.png',
  }
];

export const Histroys = [
  {
    type: "success",
    timestamp: "2020/7/30",
    title: "九州 10.5.0",
    link: "http://develop.smaryun.com:8899",
    detail:
      "结构上重新设计了WebGL的结构，采用最新的ES6以及Vue、React框架，正式对外推出高级Pro版本功能",
  },
  {
    type: "info",
    timestamp: "2020/1/16",
    title: "司马云正式版本 10.3.4",
    link: "http://develop.smaryun.com:8899",
    detail:
      "逻辑上重构设计webclient-javascript，整合统一igserver,datastore,d3,mapv,echarts主流开源技术",
  },
  {
    type: "danger",
    timestamp: "2018/9/10",
    title: "Github初始开发模板 10.3.0-beta",
    link: "https://github.com/MapGIS/WebClient-JavaScript",
    detail:
      "物理上整合了leaflet,mapboxgl,cesium,openlayers, zondyclient等多个脚",
  },
];
