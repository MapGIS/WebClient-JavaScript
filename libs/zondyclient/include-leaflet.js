(function () {
  var r = new RegExp("(^|(.*?\\/))(include-leaflet\.js)(\\?|$)"),
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
      if (arr[i].toLowerCase() == item) {
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
    var local = ".";

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

    if (!inArray(excludes, 'leaflet')) {
      if (onInternetMode) {
        inputCSS(httpUrl + "/cdn/leaflet/leaflet.css");
        inputScript(httpUrl + "/cdn/zondyclient/webclient-leaflet-framework.min.js");
      } else {
        inputCSS(httpUrl + "/cdn/leaflet/leaflet.css");
        inputScript(httpUrl + "/cdn/zondyclient/webclient-leaflet-framework.min.js");
      }
    }
    if (inArray(includes, 'json')) {
      if (onInternetMode) {
        inputScript(httpUrl + "/cdn/json/jsonExtend.js");
      } else {
        inputScript(httpUrl + "/cdn/json/jsonExtend.js");
      }
    }
    if (inArray(includes, 'proj4')) {
      inputScript(httpUrl + "/cdn/proj4/proj4.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/Proj4Leaflet/lib/proj4-compressed.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/Proj4Leaflet/src/proj4leaflet.js");
    }
    if (inArray(includes, 'd3')) {
      if (onInternetMode) {
        inputScript("https://d3js.org/d3.v5.min.js");
        inputScript("https://d3js.org/d3-hexbin.v0.2.min.js");
        inputScript(httpUrl + "/cdn/d3/d3layer.js");
      } else {
        inputScript(httpUrl + "/cdn/d3/d3.min.js");
        inputScript(httpUrl + "/cdn/d3/d3-hexbin.min.js");
        inputScript(httpUrl + "/cdn/d3/d3layer.js");
      }
    }
    if (inArray(includes, 'mapv')) {
      inputScript(httpUrl + "/cdn/mapv/mapv.min.js");
    }
    if (inArray(includes, 'echarts')) {
      inputScript(httpUrl + "/cdn/echarts/echarts.min.js");
      inputScript(httpUrl + "/cdn/echarts/echartsgl.min.js");
    }
    if (inArray(includes, 'vectortile')) {
      inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet-VectorGrid/dist/Leaflet.VectorGrid.min.js");
    }
    if (inArray(includes, 'mvt')) {
      inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-mapbox/mapbox-gl.css");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-mapbox/mapbox-gl.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-mapbox/leaflet-mapbox-gl.js");
    }
    if (inArray(includes, 'cluster')) {
      //https://unpkg.com/leaflet.markercluster@1.3.0/dist/
      inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.markercluster-1.3.0/dist/MarkerCluster.css");
      inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.markercluster-1.3.0/dist/MarkerCluster.Default.css");
      inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.markercluster-1.3.0/dist/leaflet.markercluster.js");
    }
    if (inArray(includes, 'colors-marker')) {
      inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.awesome-markers/examples/css/font-awesome.min.css");
      inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.awesome-markers/dist/leaflet.awesome-markers.css");
      inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.awesome-markers/dist/leaflet.awesome-markers.js");
    }
    if (inArray(includes, 'heater')) {
      if (onInternetMode) {
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.heat/dist/leaflet-heat.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/heatmapjs/heatmap.min.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/heatmapjs/leaflet-heatmap.js");
      } else {
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.heat/dist/leaflet-heat.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/heatmapjs/heatmap.min.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/heatmapjs/leaflet-heatmap.js");
      }
    }
    if (inArray(includes, 'animate-marker')) {
      if (onInternetMode) {
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.AnimatedMarker/src/AnimatedMarker.js");
      } else {
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.AnimatedMarker/src/AnimatedMarker.js");
      }
    }
    if (inArray(includes, 'realmove-marker')) {
      if (onInternetMode) {
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.MovingMarker/MovingMarker.js");
      } else {
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.MovingMarker/MovingMarker.js");
      }
    }
    if (inArray(includes, 'elasticsearch')) {
      inputScript(httpUrl + "/cdn/elasticsearch/14.1.0/elasticsearch.min.js");
    }
    if (inArray(includes, 'ant-path')) {
      if (onInternetMode) {
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-ant-path/dist/leaflet-ant-path.js");
      } else {
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-ant-path/dist/leaflet-ant-path.js");
      }
    }
    if (inArray(includes, 'migrate')) {
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet.MigrationLayer/dist/leaflet.migrationLayer.js");
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
    if (inArray(includes, 'geojson')) {
      inputScript(httpUrl + "/cdn/geojson/geojson.min.js");
      inputScript(httpUrl + "/cdn/geojson/topojson.min.js");
    }
    if (inArray(includes, 'shapefile')) {
      inputScript(httpUrl + "/cdn/shapefile/shapefile.js");
    }
    if (inArray(includes, 'turf')) {
      //https://cdn.jsdelivr.net/npm/@turf/turf@5/turf.min.js
      inputScript(httpUrl + "/cdn/turf/turf.min.js");
    }
    if (inArray(includes, 'measure')) {
      if (onInternetMode) {
        inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-measure/leaflet-measure.css");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-measure/leaflet-measure.js");
      } else {
        inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-measure/leaflet-measure.css");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-measure/leaflet-measure.js");
      }
    }
    if (inArray(includes, 'measurement')) {
      inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-measurement/leaflet-ruler.css");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-measurement/leaflet-ruler.js");
    }
    if (inArray(includes, 'editable')) {
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Editable/Leaflet.Editable.js");
    }
    if (inArray(includes, 'wfs')) {
      if (onInternetMode) {
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet-WFST/dist/leaflet-wfst.src.js");
      } else {
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet-WFST/dist/leaflet-wfst.src.js");
      }
    }
    if (inArray(includes, 'draw')) {
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Leaflet.draw.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Leaflet.Draw.Event.js");
      inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/leaflet.draw.css");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Toolbar.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Tooltip.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/GeometryUtil.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/LatLngUtil.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/LineUtil.Intersect.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Polygon.Intersect.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Polyline.Intersect.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/TouchEvents.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/DrawToolbar.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Draw.Feature.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Draw.SimpleShape.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Draw.Polyline.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Draw.Marker.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Draw.Circle.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Draw.CircleMarker.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Draw.Polygon.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Draw.Rectangle.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/EditToolbar.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/EditToolbar.Edit.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/EditToolbar.Delete.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Control.Draw.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Edit.Poly.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Edit.SimpleShape.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Edit.Rectangle.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Edit.Marker.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Edit.CircleMarker.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Draw/Edit.Circle.js");
    }
    if (inArray(includes, 'toolbar')) {
      //inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/bootstrap.min.css");
      inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/bootstrap-theme.min.css");
      inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/leaflet.draw.css");
      inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/leaflet.toolbar.css");
      inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/leaflet.draw-toolbar.css");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/leaflet.toolbar-src.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/leaflet.draw-src.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/leaflet.draw-toolbar.js");
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Toolbar/ColorPicker.js");
    }
    if (inArray(includes, 'fullscreen')) {
      if (onInternetMode) {
        inputCSS("https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css");
        inputScript("https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js");
      } else {
        inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-fullscreen/leaflet.fullscreen.css");
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-fullscreen/Leaflet.fullscreen.js");
      }
    }
    if (inArray(includes, 'mouseposition')) {
      if (onInternetMode) {
        inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.MousePosition/src/L.Control.MousePosition.css");
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.MousePosition/src/L.Control.MousePosition.js");
      } else {
        inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.MousePosition/src/L.Control.MousePosition.css");
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.MousePosition/src/L.Control.MousePosition.js");
      }
    }
    if (inArray(includes, 'minimap')) {
      if (onInternetMode) {
        inputCSS("https://cdnjs.cloudflare.com/ajax/libs/leaflet-minimap/3.6.1/Control.MiniMap.min.css");
        inputScript("https://cdnjs.cloudflare.com/ajax/libs/leaflet-minimap/3.6.1/Control.MiniMap.min.js");
      } else {
        inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet-MiniMap/dist/Control.MiniMap.min.css");
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet-MiniMap/dist/Control.MiniMap.min.js");
      }
    }
    if (inArray(includes, 'iconglyph')) {
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-IconGlyph/Leaflet.Icon.Glyph.js");
    }

    if (inArray(includes, 'pathdrag')) {
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-PathDrag/Path.Drag.js");
    }
    if (inArray(includes, 'graticule')) {
      inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Graticule/Leaflet.Graticule.js");
    }
    if (inArray(includes, 'export')) {
      if (onInternetMode) {
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet_outmap/bundle.js");
      } else {
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet_outmap/bundle.js");
      }
    }
    if (inArray(includes, 'china')) {
      if (onInternetMode) {
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.ChineseTmsProviders/src/leaflet.ChineseTmsProviders.js");
      } else {
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.ChineseTmsProviders/src/leaflet.ChineseTmsProviders.js");
      }
    }
    if (inArray(includes, 'magnifying')) {
      if (onInternetMode) {
        inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.MagnifyingGlass/leaflet.magnifyingglass.css");
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.MagnifyingGlass/leaflet.magnifyingglass.js");
      } else {
        inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.MagnifyingGlass/leaflet.magnifyingglass.css");
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.MagnifyingGlass/leaflet.magnifyingglass.js");
      }
    }
    if (inArray(includes, 'opacity')) {
      if (onInternetMode) {
        inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.OpacityControls/lib/opacity/Control.Opacity.css");
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.OpacityControls/lib/opacity/Control.Opacity.js");
        inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.OpacityControls/lib/jquery/jquery-ui-1.10.3.custom.min.css");
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.OpacityControls/lib/jquery/jquery-1.9.1.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.OpacityControls/lib/jquery/jquery-ui-1.10.3.custom.min.js");
      } else {
        inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.OpacityControls/lib/opacity/Control.Opacity.css");
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.OpacityControls/lib/opacity/Control.Opacity.js");
        inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.OpacityControls/lib/jquery/jquery-ui-1.10.3.custom.min.css");
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.OpacityControls/lib/jquery/jquery-1.9.1.js");
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.OpacityControls/lib/jquery/jquery-ui-1.10.3.custom.min.js");
      }
    }
    if (inArray(includes, 'arrow')) {
      if (onInternetMode) {
        inputScript("https://cdnjs.cloudflare.com/ajax/libs/leaflet-polylinedecorator/1.1.0/leaflet.polylineDecorator.min.js");
      } else {
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.PolylineDecorator/dist/leaflet.polylineDecorator.js");
      }
    }
    if (inArray(includes, 'snake')) {
      if (onInternetMode) {
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.Polyline.SnakeAnim/L.Polyline.SnakeAnim.js");
      } else {
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.Polyline.SnakeAnim/L.Polyline.SnakeAnim.js");
      }
    }
    if (inArray(includes, 'iconpulse')) {
      if (onInternetMode) {
        inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-icon-pulse/src/L.Icon.Pulse.css");  
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-icon-pulse/src/L.Icon.Pulse.js");
      } else {
        inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-icon-pulse/src/L.Icon.Pulse.css");  
        inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-icon-pulse/src/L.Icon.Pulse.js");
      }
    }

    if (inArray(includes, 'boundarycanvas')) {
      if (onInternetMode) {
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet-BoundaryCanvas/BoundaryCanvas.js");
      } else { 
        inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet-BoundaryCanvas/BoundaryCanvas.js");
      }
    }

    if (inArray(includes, 'picture')) {
      inputScript(httpUrl + "/cdn/filesaver/dist/FileSaver.min.js");
    }
    if (inArray(includes, 'pdf')) {
      inputScript(httpUrl + "/cdn/jspdf/dist/jspdf.min.js");
    }

    if (!inArray(excludes, 'plugin')) {
      inputScript(httpUrl + "/cdn/zondyclient/webclient-leaflet-plugins.js");
    }

  }

  load();
  window.isLocal = false;
  window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8800" : 'http://' + document.location.host;
})();
