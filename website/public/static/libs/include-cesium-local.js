(function() {
  var r = new RegExp("(^|(.*?\\/))(include-cesium-local.js)(\\?|$)"),
    s = document.getElementsByTagName("script"),
    targetScript,
    targetUrl;
  for (var i = 0; i < s.length; i++) {
    var src = s[i].getAttribute("src");
    if (src) {
      var m = src.match(r);
      if (m) {
        targetUrl = src;
        targetScript = s[i];
        break;
      }
    }
  }

  function inputScript(url) {
    var script =
      '<script type="text/javascript" src="' + url + '"><' + "/script>";
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

  function getInitPath() {
    //"./static/libs/include-leaflet-local-local.js" ==> "./static/libs/"
    var loadPath = targetUrl.split("/include-cesium-local");
    return loadPath[0];
  }

  //comman leaflet librarys
  function load() {
    var includes = (targetScript.getAttribute("include") || "").split(",");
    var excludes = (targetScript.getAttribute("exclude") || "").split(",");

    var httpUrl = getInitPath();

    if (!inArray(excludes, "cesium")) {
      inputCSS(httpUrl + "/cdn/cesium/Widgets/widgets.css");
      inputCSS(httpUrl + "/cdn/cesium/MapGIS/Css/mapgis.css");
      inputScript(httpUrl + "/cdn/cesium/Cesium.js");
    }
    // if (!inArray(includes, 'wmts')) {
    //    inputScript("http://" + ip + ":" + socket + "/cdn/leaflet plugins/leaflet-tilelayer-wmts.js");
    // }
    if (inArray(includes, "d3")) {
      inputScript(httpUrl + "/cdn/d3/d3.min.js");
      inputScript(httpUrl + "/cdn/d3/d3-hexbin.min.js");
    }
    if (inArray(includes, "proj4")) {
      inputScript(httpUrl + "/cdn/proj4/proj4.js");
    }
    if (inArray(includes, "geohash")) {
      inputScript(httpUrl + "/cdn/geohash/geohash.js");
    }
    if (inArray(includes, "geojson")) {
      inputScript(httpUrl + "/cdn/geojson/geojson.min.js");
    }
    if (inArray(includes, "shapefile")) {
      inputScript(httpUrl + "/cdn/shapefile/shapefile.js");
    }
    if (inArray(includes, "turf")) {
      inputScript(httpUrl + "/cdn/turf/turf.min.js");
    }
    if (inArray(includes, "mapv")) {
      inputScript(httpUrl + "/cdn/mapv/mapv.min.js");
    }
    if (inArray(includes, "echarts")) {
      inputScript(httpUrl + "/cdn/echarts/echarts.min.js");
      inputScript(httpUrl + "/cdn/echarts/echartsgl.min.js");
    }
    if (inArray(includes, "elasticsearch")) {
      inputScript(httpUrl + "/cdn/elasticsearch/14.1.0/elasticsearch.min.js");
    }
    if (inArray(includes, "vectortile")) {
      inputScript(
        httpUrl + "/cdn/zondyclient/webclient-cesium-vectortile-plugin.min.js"
      );
    }
    if (!inArray(excludes, "plugins")) {
      inputScript(httpUrl + "/cdn/zondyclient/webclient-cesium-plugin.min.js");
    }
    if (inArray(includes, 'vue')) {
      inputCSS(httpUrl + '/cdn/zondyclient/vue/webclient-vue-cesium.css');
      inputScript(httpUrl + '/cdn/vue/2.6/vue.js');
      inputScript(httpUrl + '/cdn/zondyclient/vue/webclient-vue-cesium.umd.js');
  }
  }

  load();
  window.webclient = {
    ip: "develop.smaryun.com",
    port: 6163,
    protocol: "http",
  };
  window.isLocal = false;
  window.server = document.location.toString().match(/file:\/\//)
    ? "http://localhost:8899"
    : "http://" + document.location.host;
})();
