(function () {
  var r = new RegExp("(^|(.*?\\/))(include-openlayers-local\.js)(\\?|$)"),
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

    if (!inArray(excludes, 'openlayers')) {
      inputCSS(httpUrl + "/cdn/zondyclient/webclient-openlayers-framework.css");
      inputScript(httpUrl + "/cdn/zondyclient/webclient-openlayers-framework.js");
    }
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
    if (inArray(includes, 'echarts')) {
      inputScript(httpUrl + "/cdn/echarts/echarts.min.js");
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
    if (!inArray(excludes, 'plugin')) {
      inputScript(httpUrl + "/cdn/zondyclient/webclient-openlayers-plugins.js");
    }

  }

  load();
  window.isLocal = false;
  window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8800" : 'http://' + document.location.host;
})();