(function () {
    var r = new RegExp('(^|(.*?\\/))(include-mapboxgl-local.js)(\\?|$)'),
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
            if (arr[i] == item) {
                return true;
            }
        }
        return false;
    }

    function getInitPath() {
        //"./static/libs/include-mapboxgl-local.js" ==> "./static/libs/"
        var loadPath = targetUrl.split('/include-mapboxgl-local');
        return loadPath[0];
    }

    //comman leaflet librarys
    function load() {
        var includes = (targetScript.getAttribute('include') || '').split(',');
        var excludes = (targetScript.getAttribute('exclude') || '').split(',');

        var httpUrl = getInitPath();

        if (!inArray(excludes, 'mapboxgl')) {
            inputCSS(httpUrl + '/cdn/mapboxgl/mapbox-gl.css');
            inputScript(httpUrl + '/cdn/mapboxgl/mapbox-gl.js');
        }
        if (inArray(includes, 'compare')) {
            inputCSS(httpUrl + '/cdn/mapboxgl-plugins/mapbox-gl-compare/dist/mapbox-gl-compare.css');
            inputScript(httpUrl + '/cdn/mapboxgl-plugins/mapbox-gl-compare/dist/mapbox-gl-compare.js');
        }
        if (inArray(includes, 'language')) {
            inputScript(httpUrl + '/cdn/mapboxgl-plugins/mapbox-gl-language/dist/mapbox-gl-language.js');
        }
        if (inArray(includes, 'picture')) {
            inputScript(httpUrl + '/cdn/filesaver/dist/FileSaver.min.js');
        }
        if (inArray(includes, 'pdf')) {
            inputScript(httpUrl + '/cdn/jspdf/dist/jspdf.min.js');
        }
        if (inArray(includes, 'layersearch')) {
            inputScript(httpUrl + '/cdn/mapboxgl-plugins/mapbox-gl-layersearch/CanvasWebGL.js');
        }
        if (inArray(includes, 'echarts')) {
            inputScript(httpUrl + '/cdn/echarts/echarts.min.js');
            inputScript(httpUrl + '/cdn/echarts/echartsgl.min.js');
        }
        if (inArray(includes, 'echarts-gl')) {
            inputScript(httpUrl + '/cdn/echartsgl/echarts.min.js'); //这是一个特别的版本，上面的一直是最新的
            inputScript(httpUrl + '/cdn/echartsgl/echarts-gl.min.js'); //这是一个特别的版本，上面的一直是最新的
        }
        if (inArray(includes, 'mapv')) {
            inputScript(httpUrl + '/cdn/mapv/mapv.min.js');
        }
        if (inArray(includes, 'd3')) {
            inputScript(httpUrl + '/cdn/d3/d3.min.js');
            inputScript(httpUrl + '/cdn/d3/d3-hexbin.min.js');
        }
        if (inArray(includes, 'elasticsearch')) {
            inputScript(httpUrl + '/cdn/elasticsearch/14.1.0/elasticsearch.min.js');
        }
        if (inArray(includes, 'els-mapgis')) {
            inputScript(httpUrl + '/cdn/zondyclient/els-mapgis.js');
        }
        if (inArray(includes, 'geohash')) {
            inputScript(httpUrl + '/cdn/geohash/geohash.js');
        }
        if (inArray(includes, 'json')) {
            inputScript(httpUrl + '/cdn/json/jsonExtend.js');
        }
        if (inArray(includes, 'geojson')) {
            inputScript(httpUrl + '/cdn/geojson/geojson.min.js');
            inputScript(httpUrl + '/cdn/geojson/topojson.min.js');
        }
        if (inArray(includes, 'shapefile')) {
            inputScript(httpUrl + '/cdn/shapefile/shapefile.js');
        }
        if (inArray(includes, 'turf')) {
            inputScript(httpUrl + '/cdn/turf/turf.min.js');
        }
        if (inArray(includes, 'proj4')) {
            inputScript(httpUrl + '/cdn/proj4/proj4.js');
        }
        if (inArray(includes, 'transform')) {
            inputScript(httpUrl + '/cdn/mapboxgl-plugins/mapbox-gl-transform/coorTransform.js');
        }
        if (inArray(includes, 'draw')) {
            inputCSS(httpUrl + '/cdn/mapboxgl-plugins/mapbox-gl-draw/dist/mapbox-gl-draw.css');
            inputScript(httpUrl + '/cdn/mapboxgl-plugins/mapbox-gl-draw/dist/mapbox-gl-draw.js');
            inputScript(httpUrl + '/cdn/mapboxgl-plugins/mapbox-gl-draw-rect/index.js');
            inputScript(httpUrl + '/cdn/mapboxgl-plugins/mapbox-gl-draw-circle/index.js');
        }
        if (inArray(includes, 'l7')) {
            inputScript(httpUrl + '/cdn/l7/l7.js');
        }
        if (inArray(includes, 'deckgl')) {
            inputScript(httpUrl + '/cdn/deckgl/deckgl.js');
        }
        if (!inArray(excludes, 'plugin')) {
            inputCSS(httpUrl + '/cdn/zondyclient/webclient-mapboxgl-plugin.css');
            inputScript(httpUrl + '/cdn/zondyclient/webclient-mapboxgl-plugin.min.js');
            // inputScript(httpUrl + "/cdn/zondyclient/webclient-mapboxgl-framework.js");
        }
        if (inArray(includes, 'vue')) {
            inputCSS(httpUrl + '/cdn/zondyclient/vue/webclient-vue-mapboxgl.css');
            inputScript(httpUrl + '/cdn/vue/2.6/vue.js');
            inputScript(httpUrl + '/cdn/zondyclient/vue/webclient-vue-mapboxgl.umd.min.js');
        }
		if (inArray(includes, 'antd')) {
			inputScript(httpUrl + '/cdn/moment/2.18.1/moment.min.js');
			inputCSS(httpUrl + '/cdn/ant-design-vue/dist/antd.min.css');
			inputScript(httpUrl + '/cdn/ant-design-vue/dist/antd.min.js');
		}
    }

    load();
    window.webclient = {
        ip: 'develop.smaryun.com',
        port: 6163,
        protocol: 'http'
    };
    window.isLocal = false;
    window.server = document.location.toString().match(/file:\/\//) ? 'http://localhost:8899' : 'http://' + document.location.host;
})();
