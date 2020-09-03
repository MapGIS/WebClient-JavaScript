(function () {
  var r = new RegExp("(^|(.*?\\/))(include-openlayers-local\.js)(\\?|$)"),
    s = document.getElementsByTagName('script'),
    targetScript, targetUrl;
  for (var i = 0; i < s.length; i++) {
    var src = s[i].getAttribute('src');
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

  function getInitPath() {
    //"./static/libs/include-mapboxgl-local-local.js" ==> "./static/libs/"
    var loadPath = targetUrl.split("/include-openlayers-local");
    return loadPath[0];
  }

  //comman leaflet librarys
  function load() {

    var includes = (targetScript.getAttribute('include') || "").split(",");
    var excludes = (targetScript.getAttribute('exclude') || "").split(",");

    var httpUrl = getInitPath();

    if (!inArray(excludes, 'openlayers')) {
      inputCSS(httpUrl + "/cdn/ol/ol.css");
      inputScript(httpUrl + "/cdn/ol/ol.js");
    }
    if (inArray(includes, 'picture')) {
      inputScript(httpUrl + "/cdn/filesaver/dist/FileSaver.min.js");
    }
    if (inArray(includes, 'pdf')) {
      inputScript(httpUrl + "/cdn/jspdf/dist/jspdf.min.js");
    }
    if (inArray(includes, 'arc')) {
      inputScript(httpUrl + "/cdn/arc/arc.js");
    }
    if (inArray(includes, 'echarts')) {
      inputScript(httpUrl + "/cdn/echarts/echarts.min.js");
    }
    if (inArray(includes, 'mapv')) {
      inputScript(httpUrl + "/cdn/mapv/mapv.min.js");
    }
    if (inArray(includes, 'd3')) {
      inputScript(httpUrl + "/cdn/d3/d3.min.js");
      inputScript(httpUrl + "/cdn/d3/d3-hexbin.min.js");
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
      inputScript(httpUrl + "/cdn/json/jsonExtend.js");
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
    if (inArray(includes, 'picture')) {
      inputScript(httpUrl + "/cdn/filesaver/dist/FileSaver.min.js");
    }
    if (inArray(includes, 'pdf')) {
      inputScript(httpUrl + "/cdn/jspdf/dist/jspdf.min.js");
    }
    if (inArray(includes, 'json')) {
      inputScript(httpUrl + "/cdn/json/json2.js");
      inputScript(httpUrl + "/cdn/json/jsonExtend.js");
    }
    if (inArray(includes, 'vectortile')) {
      inputScript(httpUrl + "/cdn/openlayers5/ol-mapbox-style/olms.js");
    }
    if (!inArray(excludes, 'plugin')) {
      inputScript(httpUrl + "/cdn/zondyclient/webclient-openlayers-plugin.min.js");
    }

  }

  load();
  window.webclient = {
    ip: "develop.smaryun.com",
    port: 6163,
    protocol: "http",
  };
  window.isLocal = false;
  window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8899" : 'http://' + document.location.host;
})();
