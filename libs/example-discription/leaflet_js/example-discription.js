     /** 代码块的引入,写代码的js文件作为key,将显示代码的id作为键值对的value **/
     var maps = {
         'navbar-control': 'navbar-control-wrapper',
         'layer-control': 'layer-control-wrapper',
         'map-location': 'map-location-wrapper',
         'grid-layers-control': 'grid-layers-control-wrapper',
         'mapevent-operation': 'mapevent-operation-wrapper',
         'mapevent-mousekeyboard': 'mapevent-mousekeyboard-wrapper',
         'maptext-mark': 'maptextMark-wrapper',
         'cluster-labels': 'clusterLabels-wrapper',
         'baidumap-display': 'baidumap-display-wrapper',
         'ogcwmts-display': 'ogcwmts-display-wrapper',
         'customtile-gauss': 'customtile-gauss-wrapper'
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
     var contentId = ["mapControl", "navbarControl", "layerControl",
         "mapOperation", "mapLocation", "gridLayerscontrol",
         "mapEvent", "mapOperationEvent", "mapMousekeyboardEvent",
         "mapAnnotation", "maptextMark", "clusterLabels",
         "mapBase", "baidumapDisplay", "ogcwmtsDisplay",
         "proCorSystem", "gassProjection"
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
         'myiframe1': '../demo/leaflet/iframe_html/01_mapLayer.html',
         'myiframe2': '../demo/leaflet/iframe_html/02_layerControl.html',
         'myiframe3': '../demo/leaflet/iframe_html/03_mapLocation.html',
         'myiframe4': '../demo/leaflet/iframe_html/04_gridLayerscontrol.html',
         'myiframe5': '../demo/leaflet/iframe_html/05_mapOperationEvent.html',
         'myiframe6': '../demo/leaflet/iframe_html/06_mapeventMousekeyboard.html',
         'myiframe7': '../demo/leaflet/iframe_html/07_maptextMarker.html',
         'myiframe8': '../demo/leaflet/iframe_html/08_clusterLabels.html',
         'myiframe9': '../demo/leaflet/iframe_html/09_baidumapDisplay.html',
         'myiframe10': '../demo/leaflet/iframe_html/10_ogcwmtsDisplay.html',
         'myiframe11': '../demo/leaflet/iframe_html/11_customtileGauss.html',

     };

     function load() {
         var array_iframe = document.getElementsByTagName("iframe");
         for (var key in url_maps) {
             var url_value = url_maps[key]; //url_value对应是url路径,此处key是嵌入的每一个iframe的id值
             $('#' + key).attr("src", url_value);
         }
     }