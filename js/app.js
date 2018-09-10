var MODE_LEAFLET = "leaflet";
var MODE_MAPBOX = "mapbox";
var MODE_OPENLAYER = "openlayers";
var MODE_CESIUM = "cesium";

//下面三个变量用于网页跳转的时候传递对应的路径下去
//为什么不搞个动态网页，马上就要使用react-router全新的开发模式了
//不要浪费过多的时间在过去落后的静态网页上了
var mapMode = MODE_LEAFLET;
var mapDemoName = "base";//示例js的名字
var mapFilefolder = "base";//示例js的文件夹归属,如Base,Analysis等不同的文件夹

(function(){
  initView();
})();

function initView(){
  // $("#body-header").load("../ui/navi-header.html");
  // $("#body-framework").load("../ui/main.html");
}
