(function () {
    var r = new RegExp("(^|(.*?\\/))(include-leaflet-local\.js)(\\?|$)"),
        s = document.getElementsByTagName('script'),
        targetScript,
        targetUrl;
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
            if (arr[i].toLowerCase() == item) {
                return true;
            }
        }
        return false;
    }

    function getInitPath() {
        //"../../libs/zondyclient/include-leaflet-local-local.js" ==> "../../libs/zondyclient"
        var loadPath = targetUrl.split("/include-leaflet-local");
        return loadPath[0];
    }

    //comman leaflet librarys
    function load() {

        var includes = (targetScript.getAttribute('include') || "").split(",");
        var excludes = (targetScript.getAttribute('exclude') || "").split(",");

        var httpUrl = getInitPath();

        if (!inArray(excludes, 'leaflet')) {
            /* inputCSS(httpUrl + "/cdn/leaflet/leaflet.css");
             inputScript(httpUrl + "/cdn/leaflet/leaflet.js"); */
            inputCSS(httpUrl + "/cdn/zondyclient/webclient-leaflet-framework.css");
            inputScript(httpUrl + "/cdn/zondyclient/webclient-leaflet-framework.min.js");
        }

        if (!inArray(excludes, 'jquery')) {
            inputScript(httpUrl + "/cdn/jquery/jquery-1.12.4.min.js");
        }
        if (!inArray(excludes, 'jqueryeasyui')) {
            inputCSS(httpUrl + "/cdn/jquery-easyui/themes/default/easyui.css");
            inputCSS(httpUrl + "/cdn/jquery-easyui/themes/icon.css");
            inputCSS(httpUrl + "/cdn/jquery-easyui/themes/color.css");
            inputScript(httpUrl + "/cdn/jquery-easyui/jquery.easyui.min.js");
        }
        if (!inArray(excludes, 'colorpicker')) {
            inputCSS(httpUrl + "/cdn/colorpicker/js_color_picker_v2.css");
            inputScript(httpUrl + "/cdn/colorpicker/js_color_picker_v2.js");
            inputScript(httpUrl + "/cdn/colorpicker/color_functions.js");
        }
        if (!inArray(excludes, 'selectareafeature')) {
            inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.SelectAreaFeature/Leaflet.SelectAreaFeature.js");
        }
        if (inArray(includes, 'json')) {
            inputScript(httpUrl + "/cdn/json/jsonExtend.js");
        }
        if (inArray(includes, 'proj4')) {
            //inputScript(httpUrl + "/cdn/proj4/proj4.js");
            inputScript(httpUrl + "/cdn/leaflet-plugins/Proj4Leaflet/lib/proj4-compressed.js");
            inputScript(httpUrl + "/cdn/leaflet-plugins/Proj4Leaflet/src/proj4leaflet.js");
        }
        if (inArray(includes, 'd3')) {
            inputScript(httpUrl + "/cdn/d3/d3.min.js");
            inputScript(httpUrl + "/cdn/d3/d3-hexbin.min.js");
            inputScript(httpUrl + "/cdn/d3/d3layer.js");
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
            inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.heat/dist/leaflet-heat.js");
            inputScript(httpUrl + "/cdn/leaflet-plugins/heatmapjs/heatmap.min.js");
            inputScript(httpUrl + "/cdn/leaflet-plugins/heatmapjs/leaflet-heatmap.js");
        }
        if (inArray(includes, 'animate-marker')) {
            inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.AnimatedMarker/src/AnimatedMarker.js");

        }
        if (inArray(includes, 'realmove-marker')) {
            inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.MovingMarker/MovingMarker.js");
        }
        if (inArray(includes, 'elasticsearch')) {
            inputScript(httpUrl + "/cdn/elasticsearch/14.1.0/elasticsearch.min.js");
        }
        if (inArray(includes, 'ant-path')) {
            inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-ant-path/dist/leaflet-ant-path.js");
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
            inputScript(httpUrl + "/cdn/turf/turf.min.js");
        }
        if (inArray(includes, 'measure')) {
            inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-measure/leaflet-measure.css");
            inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-measure/leaflet-measure.js");
        }
        if (inArray(includes, 'measurement')) {
            inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-measurement/leaflet-ruler.css");
            inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-measurement/leaflet-ruler.js");
        }
        if (inArray(includes, 'editable')) {
            inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-Editable/Leaflet.Editable.js");
        }
        if (inArray(includes, 'wfs')) {
            inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet-WFST/dist/leaflet-wfst.src.js");
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
            inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-fullscreen/leaflet.fullscreen.css");
            inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-fullscreen/Leaflet.fullscreen.js");
        }
        if (inArray(includes, 'mouseposition')) {
            inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.MousePosition/src/L.Control.MousePosition.css");
            inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.MousePosition/src/L.Control.MousePosition.js");
        }
        if (inArray(includes, 'minimap')) {
            inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet-MiniMap/dist/Control.MiniMap.min.css");
            inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet-MiniMap/dist/Control.MiniMap.min.js");
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
            inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet_outmap/bundle.js");
        }
        if (inArray(includes, 'china')) {
            inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.ChineseTmsProviders/src/leaflet.ChineseTmsProviders.js");
        }
        if (inArray(includes, 'magnifying')) {
            inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.MagnifyingGlass/leaflet.magnifyingglass.css");
            inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.MagnifyingGlass/leaflet.magnifyingglass.js");
        }
        if (inArray(includes, 'opacity')) {
            inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.OpacityControls/lib/opacity/Control.Opacity.css");
            inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.OpacityControls/lib/opacity/Control.Opacity.js");
            inputCSS(httpUrl + "/cdn/leaflet-plugins/Leaflet.OpacityControls/lib/jquery/jquery-ui-1.10.3.custom.min.css");
            inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.OpacityControls/lib/jquery/jquery-1.9.1.js");
            inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.OpacityControls/lib/jquery/jquery-ui-1.10.3.custom.min.js");
        }
        if (inArray(includes, 'arrow')) {
            inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.PolylineDecorator/dist/leaflet.polylineDecorator.js");
        }
        if (inArray(includes, 'snake')) {
            inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet.Polyline.SnakeAnim/L.Polyline.SnakeAnim.js");
        }
        if (inArray(includes, 'iconpulse')) {
            inputCSS(httpUrl + "/cdn/leaflet-plugins/leaflet-icon-pulse/src/L.Icon.Pulse.css");
            inputScript(httpUrl + "/cdn/leaflet-plugins/leaflet-icon-pulse/src/L.Icon.Pulse.js");
        }
        if (inArray(includes, 'boundarycanvas')) {
            inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet-BoundaryCanvas/BoundaryCanvas.js");
        }
        if (inArray(includes, 'milstdbyleaflet')) {
            inputScript(httpUrl + "/cdn/leaflet-plugins/Leaflet-MilStdByLeaflet/MilStdByLeaflet.js");
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
    /* window.isLocal = false;
     window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8899" : 'http://' + document.location.host; */
})();