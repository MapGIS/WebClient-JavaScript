(function () {
  var r = new RegExp("(^|(.*?\\/))(include-mapboxgl\.js)(\\?|$)"),
    s = document.getElementsByTagName('script'),
    targetScript;
  for (var i = 0; i < s.length; i++) {
    var src = s[i].getAttribute('src');
    if (src) {
      var m = src.match(r);
      if (m) {
        targetScript = s[i];
        break;
      }
    }
  }

  function inputScript(url) {
    var script = '<script type="text/javascript" src="' + url + '"><' + '/script>';
    document.writeln(script);
  }

  function inputCSS(url) {
    var css = '<link rel="stylesheet" href="' + url + '">';
    document.writeln(css);
  }

  function inArray(arr, item) {
    for (i in arr) {
      if (arr[i] == item) {
        return true;
      }
    }
    return false;
  }

  //comman leaflet librarys
  function load() {
    var onInternetMode = true;
    var ip = targetScript.getAttribute('ip');
    var socket = targetScript.getAttribute('socket');

    var includes = (targetScript.getAttribute('include') || "").split(",");
    var excludes = (targetScript.getAttribute('exclude') || "").split(",");

    var httpUrl = "";

    if (ip && socket) {
      onInternetMode = false; //区域网模式
    } else if(ip && (socket == null|| socket == undefined)){
      onInternetMode = false; //区域网模式
      socket = 80;
    } else { //互联网模式
      onInternetMode = true;
    }

    if (onInternetMode) {
      httpUrl = "http://client.snanyun.com:8800"; //"http://www.smaryun.com";
    } else {
      httpUrl = "http://" + ip + ":" + socket + "";
    }

    if (!inArray(excludes, 'mapboxgl')) {
      inputCSS(httpUrl + "/cdn/zondyclient/webclient-mapboxgl-framework.min.css");      inputCSS(httpUrl + "/cdn/mapboxgl/mapbox-gl.css");
      inputScript(httpUrl + "/cdn/zondyclient/webclient-mapboxgl-framework.min.js");//这里是igserver的api
    }
    if (inArray(includes, 'compare')) {
      if (onInternetMode) {
        inputCSS("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.1.0/mapbox-gl-compare.css");
        inputScript("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.1.0/mapbox-gl-compare.js");
      } else {
        inputCSS(httpUrl + "/cdn/mapboxgl-plugins/mapbox-gl-compare/dist/mapbox-gl-compare.css");
        inputScript(httpUrl + "/cdn/mapboxgl-plugins/mapbox-gl-compare/dist/mapbox-gl-compare.js");
      }
    }
    if (inArray(includes, 'language')) {
      if (onInternetMode) {
        inputScript("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-language/v0.9.2/mapbox-gl-language.js");
      } else {
        inputScript(httpUrl + "/cdn/mapboxgl-plugins/mapbox-gl-language/dist/mapbox-gl-language.js");
      }
    }
/*     if (inArray(includes, 'minimap')) {
      if (onInternetMode) {
        inputScript("http://aesqe.github.io/mapboxgl-minimap/mapboxgl-control-minimap.js");
      } else {
        inputScript(httpUrl + "/cdn/mapboxgl-plugins/mapbox-gl-minimap/mapboxgl-control-minimap.js");
      }
    }    */ 
    if (inArray(includes, 'picture')) {
      if (onInternetMode) {
        inputScript(httpUrl + "/cdn/filesaver/dist/FileSaver.min.js");
      } else {
        inputScript(httpUrl + "/cdn/filesaver/dist/FileSaver.min.js");
      }
    }
    if (inArray(includes, 'pdf')) {
      if (onInternetMode) {
        inputScript(httpUrl + "/cdn/jspdf/dist/jspdf.min.js");
        //inputScript("https://unpkg.com/jspdf@latest/dist/jspdf.min.js");
      } else {
        inputScript(httpUrl + "/cdn/jspdf/dist/jspdf.min.js");
      }
    }
    if (inArray(includes, 'layersearch')) {
      if (onInternetMode) {
        inputScript(httpUrl + "/cdn/mapboxgl-plugins/mapbox-gl-layersearch/CanvasWebGL.js");
      } else {
        inputScript(httpUrl + "/cdn/mapboxgl-plugins/mapbox-gl-layersearch/CanvasWebGL.js");
      }
    }
    if (inArray(includes, 'echarts')) {
      inputScript(httpUrl + "/cdn/echarts/echarts.min.js");
      inputScript(httpUrl + "/cdn/echarts/echartsgl.min.js");
    }
    if (inArray(includes, 'echarts-gl')) {
      inputScript(httpUrl + "/cdn/echartsgl/echarts.min.js"); //这是一个特别的版本，上面的一直是最新的
      inputScript(httpUrl + "/cdn/echartsgl/echarts-gl.min.js"); //这是一个特别的版本，上面的一直是最新的
    }
    if (inArray(includes, 'mapv')) {
      inputScript(httpUrl + "/cdn/mapv/mapv.min.js");
    }
    if (inArray(includes, 'd3')) {
      if (onInternetMode) {
        inputScript("https://d3js.org/d3.v5.min.js");
        inputScript("https://d3js.org/d3-hexbin.v0.2.min.js");
      } else {
        inputScript(httpUrl + "/cdn/d3/d3.min.js");
        inputScript(httpUrl + "/cdn/d3/d3-hexbin.min.js");
      }
    }
    if (inArray(includes, 'threebox')) {
      inputScript(httpUrl + "/cdn/mapboxgl-plugins/threebox/dist/threebox.js");
    }
    if (inArray(includes, 'elasticsearch')) {
      inputScript(httpUrl + "/cdn/elasticsearch/14.1.0/elasticsearch.min.js");
    }
    if (inArray(includes, 'els-mapgis')) {
      inputScript(httpUrl + "/cdn/zondyclient/els-mapgis.js");
    }
    if (inArray(includes, 'geohash')) {
      inputScript(httpUrl + "/cdn/geohash/geohash.js");
    }
    if (inArray(includes, 'json')) {
      if (onInternetMode) {
        inputScript(httpUrl + "/cdn/json/jsonExtend.js");
      } else {
        inputScript(httpUrl + "/cdn/json/jsonExtend.js");
      }
    }
    if (inArray(includes, 'geojson')) {
      inputScript(httpUrl + "/cdn/geojson/geojson.min.js");
      inputScript(httpUrl + "/cdn/geojson/topojson.min.js");
    }
    if (inArray(includes, 'shapefile')) {
      inputScript(httpUrl + "/cdn/shapefile/shapefile.js");
    }
    if (inArray(includes, 'turf')) {
      inputScript(httpUrl + "/cdn/turf/turf.min.js");
    }
    if (inArray(includes, 'proj4')) {
      inputScript(httpUrl + "/cdn/proj4/proj4.js");
    }
    if (inArray(includes, 'transform')) {
      inputScript(httpUrl + "/cdn/mapboxgl-plugins/mapbox-gl-transform/coorTransform.js");
    }
    if(inArray(includes, 'draw')){
      if(onInternetMode){
        inputCSS("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.4/mapbox-gl-draw.css");
        inputScript("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.js");
        inputScript(httpUrl + "/cdn/mapboxgl-plugins/mapbox-gl-draw-mode/rectangle/index.js");
      }else{
        inputCSS(httpUrl + "/cdn/mapboxgl-plugins/mapbox-gl-draw/dist/mapbox-gl-draw.css");
        inputScript(httpUrl + "/cdn/mapboxgl-plugins/mapbox-gl-draw/dist/mapbox-gl-draw.js");
        inputScript(httpUrl + "/cdn/mapboxgl-plugins/mapbox-gl-draw-mode/rectangle/index.js");
      }
    }
    if (inArray(includes, 'filesaver')) {
      inputScript(httpUrl + "/cdn/filesaver/src/FileSaver.js");
    }
    if (inArray(includes, 'domtoimage')) {
      inputScript(httpUrl + "/cdn/dom-to-image/dom-to-image.js");
    }
    if (inArray(includes, 'webgl')) {
      inputScript(httpUrl + "/cdn/webgl/cuon-matrix.js");
      inputScript(httpUrl + "/cdn/webgl/cuon-utils.js");
      inputScript(httpUrl + "/cdn/webgl/webgl-debug.js");
      inputScript(httpUrl + "/cdn/webgl/webgl-utils.js");
    }
    if (!inArray(excludes, 'plugin')) {
      inputCSS(httpUrl + "/cdn/zondyclient/webclient-mapboxgl-plugins.css");      
      inputScript(httpUrl + "/cdn/zondyclient/webclient-mapboxgl-plugins.min.js");//这里是三方如igserver-x，datastore的api
    }

  }

  load();
  window.isLocal = false;
  window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8800" : 'http://' + document.location.host;
})();
