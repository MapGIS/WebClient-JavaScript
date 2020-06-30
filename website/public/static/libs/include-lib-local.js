(function () {
  var r = new RegExp("(^|(.*?\\/))(include-lib-local\.js)(\\?|$)"),
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
    //"../../libs/zondyclient/include-lib-local-local.js" ==> "../../libs/zondyclient"
    var loadPath = targetUrl.split("/include-lib-local");
    return loadPath[0];
  }

  function load() {

    var includes = (targetScript.getAttribute('include') || "").split(",");
    // var excludes = (targetScript.getAttribute('exclude') || "").split(",");

    var httpUrl = getInitPath();

    if (inArray(includes, 'jquery')) {
      inputScript(httpUrl + "/cdn/jquery/jquery-1.12.4.min.js");
    }
    if (inArray(includes, 'jquery-easyui')) {
      inputCSS(httpUrl + "/cdn/jquery-easyui/themes/default/easyui.css");
      inputCSS(httpUrl + "/cdn/jquery-easyui/themes/icon.css");
      inputCSS(httpUrl + "/cdn/jquery-easyui/themes/color.css");
      inputScript(httpUrl + "/cdn/jquery-easyui/jquery.easyui.min.js");
    }
    if (inArray(includes, 'colorpicker')) {
      inputCSS(httpUrl + "/cdn/colorpicker/js_color_picker_v2.css");
      inputScript(httpUrl + "/cdn/colorpicker/js_color_picker_v2.js");
      inputScript(httpUrl + "/cdn/colorpicker/color_functions.js");
    }
    if (inArray(includes, 'geohash')) {
      inputScript(httpUrl + "/cdn/geohash/geohash.js");
    }
    if (inArray(includes, 'moment')) { //用于时间戳转换
      inputScript(httpUrl + "/cdn/moment/2.18.1/moment.min.js");
      inputScript(httpUrl + "/cdn/moment/2.18.1/locale/zh-cn.js");
    }
    if (inArray(includes, 'geojson')) {
      inputScript(httpUrl + "/cdn/geojson/geojson.min.js");
    }
    if (inArray(includes, 'bootstrap')) {
      inputCSS(httpUrl + "/cdn/bootstrap/bootstrap.min.css");
      inputScript(httpUrl + "/cdn/bootstrap/bootstrap.min.js");
    }
    if (inArray(includes, 'lazyload')) {
      inputScript(httpUrl + "/cdn/jquerylazyload/lazyload.min.js");
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
    if (inArray(includes, 'echarts')) {
      inputScript(httpUrl + "/cdn/echarts/echarts.min.js");
    }
    if (inArray(includes, 'checkjs')) {
      inputScript(httpUrl + "/cdn/checkjs/checkjs.js");
    }
    if (inArray(includes, 'papaparse')) {
      inputScript(httpUrl + "/cdn/papaparse/papaparse.js");
    }
  }

  load();
})();