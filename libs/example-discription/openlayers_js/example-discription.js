     /** 代码块的引入,写代码的js文件作为key,将显示代码的id作为键值对的value **/
     var maps = {
         'overview-control': 'overview-control-wrapper',
         'layer-control': 'layer-control-wrapper',
         'map-dynaanno': 'map-dynaanno-wrapper',
         'docfilter-display': 'docfilter-display-wrapper',
         'load-measurement': 'load-measurement-wrapper',
         'maesure-feature': 'maesure-feature-wrapper',
         'mapdisplay-arcgislld': 'mapdisplay-arcgislld-wrapper',
         'mapdisplay-ogcwfs': 'mapdisplay-ogcwfs-wrapper',
         'thirdmap-kml': 'thirdmap-kml-wrapper',
         'overlayer-maps': 'overlayer-maps-wrapper',
         'get-geometryinfo': 'get-geometryinfo-wrapper',
         'graphic-style':'graphic-style-wrapper'
     };
     /**初始化显示代码函数**/
     $(function () {
         // initMarkdown();
         initUrlParam();
         setCore(mapMode); //显示默认页面的源码
     });

     function initUrlParam() {
         if (window.location.pathname.indexOf("leaflet") > 0) {
             mapMode = MODE_LEAFLET;
         } else if (window.location.pathname.indexOf("cesium") > 0) {
             mapMode = MODE_CESIUM;
         } else if (window.location.pathname.indexOf("mapbox") > 0) {
             mapMode = MODE_MAPBOX;
         } else if (window.location.pathname.indexOf("openlayers") > 0) {
             mapMode = MODE_OPENLAYER;
         }
     }
     /** marked.js用法**/
     function initMarkdown() {
         markedRender.table = function (header, body) {
             return '<table class="table table-striped">' + header + body + '</table>'
         }
         marked.setOptions({
             renderer: markedRender,
             gfm: true,
             tables: true,
             breaks: true,
             pedantic: false,
             sanitize: true,
             smartLists: true,
             smartypants: false
         });
     }
     /**根据引入代码块的js文件对应的标签id，显示源码**/
     function setCore(catalog) {
         var htmlString = "";
         for (var key in maps) {
             var value = maps[key];
             var htmlUrl = "../demo/" + catalog + "/iframe_js/" + key + ".js";
             console.log(htmlUrl);
             $.ajax({
                 async: false,
                 url: htmlUrl,
                 success: function (result) {
                     // htmlString = result;
                     // mdContent = marked(result, {
                     //     renderer: markedRender
                     // });
                     // $('#' + value).html(mdContent);  // 变量的使用方式 +value
                     var textarea = $('#' + value).val(result); //使用CodeMirror渲染代码                
                     var editor = CodeMirror.fromTextArea($('#' + value)[0], {                       
                         lineNumbers: true,   //显示行号
                         lineWrapping: true, //代码折叠
                         foldGutter: true,
                         gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                         matchBrackets: true,    //括号匹配
                     });
                 }
             });
         }
     }


     /**获取内容向上偏移量**/
     var contentId = ["mapControl", "overviewControl", "layerControl",
         "mapStyle", "mapDynaanno", "docfilterDisplay",
         "mapMeasure", "loadMeasurement", "measureFeature",
         "mapBase", "mapdisplayArcgislld", "mapdisplayOgcwfs",
         "loadThirdmap", "thirdmapKML", "overlayerMaps",
         "geometryObject", "getGeometryinfo","graphicStyle"
     ];
     var topOffsets = [];
     for (var i = 0; i < contentId.length; i++) {
         var content = document.getElementById(contentId[i]);
         var disTop = content.offsetTop;
         topOffsets[i] = disTop;
         // console.log(contentId[i] + "-----" + topOffsets[i]);
     }

     /**窗口添加滚动条事件**/
     window.onscroll = function (e) {
         var pageOffset = window.pageYOffset; //获取当前页面相对于浏览器顶部的偏移量
         var abs = Math.abs;

         function disMin(a, b) {
             return abs(a - pageOffset) > abs(b - pageOffset) ? b : a;
         }
         var nearHash = topOffsets.reduce(disMin);
         var index = topOffsets.indexOf(nearHash);
         // console.log($('.icl-docs-sidebar ul [href]').length);           
         var navLength = $('.icl-docs-sidebar ul [href]').length;
         for (var i = 0; i < navLength - 1; i++) { //此处将其他active全部屏蔽，然后只激活一个
             $('.icl-docs-sidebar ul [href]')[i].className = '';
         }
         $('.icl-docs-sidebar ul [href]')[index].className = 'active'
     }
     /**页面加载完成后，加载iframe内容**/
     var url_maps = {
         'myiframe1': '../demo/openlayers/iframe_html/01_overviewControl.html',
         'myiframe2': '../demo/openlayers/iframe_html/02_layerControl.html',
         'myiframe3': '../demo/openlayers/iframe_html/03_mapDynaanno.html',
         'myiframe4': '../demo/openlayers/iframe_html/04_docfilterDisplay.html',
         'myiframe5': '../demo/openlayers/iframe_html/05_loadMeasurement.html',
         'myiframe6': '../demo/openlayers/iframe_html/06_measureFeature.html',
         'myiframe7': '../demo/openlayers/iframe_html/07_mapdisplayArcgislld.html',
         'myiframe8': '../demo/openlayers/iframe_html/08_mapdisplayOgcwfs.html',
         'myiframe9': '../demo/openlayers/iframe_html/09_thirdmapKML.html',
         'myiframe10': '../demo/openlayers/iframe_html/10_overlayermaps.html',
         'myiframe11': '../demo/openlayers/iframe_html/11_getGeometryinfo.html',
         'myiframe12':'../demo/openlayers/iframe_html/12_graphicStyle.html'

     };

     function load() {
         var array_iframe = document.getElementsByTagName("iframe");
         for (var key in url_maps) {
             var url_value = url_maps[key]; //url_value对应是url路径,此处key是嵌入的每一个iframe的id值
             $('#' + key).attr("src", url_value);
         }
     }