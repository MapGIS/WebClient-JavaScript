/** 源码读取显示 **/
var sCopyTarget = "#code-content";
var showCodeFlag = true; //源码面板显示/隐藏标志位，用来辨别当前是显示源码还是显示接口说明
var editor = null; //源码高亮显示
var client = null;

var clientWid = 0;
var codeMidWidth = 0.38;
var codeMaxWidth = 0.7;

var markedRender = new marked.Renderer();

var isFlash = false;

/**系统初始默认页面源码显示 **/
$(function () {
    initParam();
    initMarkdown();
    setCore(mapDemoName, mapMode, mapFilefolder); //显示默认页面的源码
});

function initParam() {
    clientWid = document.body.clientWidth;
    initUrlParam();
}

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
    isFlash = false;
    //这里是伪装实现动态路由的效果，下个版本直接上react-router，这个版本先临时用着
    var url = window.location.hash;
    if (url) {
        var namespace = url.replace("#", "").split('-');
        if (namespace && namespace.length == 2) {
            mapFilefolder = namespace[0];
            mapDemoName = namespace[1];
            isFlash = true;
        } else if (namespace && namespace.length == 3) {
            mapFilefolder = namespace[0] + "/" + namespace[1];
            mapDemoName = namespace[2];
            isFlash = true;
        } else {
            mapFilefolder = mapDemoName = "base";
        }
    } else {
        mapFilefolder = mapDemoName = "base";
    }
}

function initMarkdown() {
    //增加的代码，用于个性化输出table
    markedRender.table = function (header, body) {
        return '<table class="table table-striped">' + header + body + '</table>'
    }
    marked.setOptions({
        renderer: markedRender,
        gfm: true,
        tables: true,
        breaks: true, // '>' 换行，回车换成 <br>
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
    });
}

/** 二级菜单项对应功能页面的源码显示 **/
function setCore(name, catalog, filefolder) {
    //根据当前选择的菜单项，显示接口说明
    var interFaceUrl = "../docs/" + catalog + "/" + filefolder + "/" + name + ".md"; //接口说明页路径
    var mdString = ""; //接口页面的代码（字符串形式）
    var mdContent;
    jQuery.ajax({
        async: false,
        url: interFaceUrl,
        success: function (result) {
            mdString = result;
        }
    });

    mdContent = marked(mdString, {
        renderer: markedRender
    });

    $('#body-helper').html(mdContent);
    $('#body-helper pre code').each(function (i, block) {
        Prism.highlightElement(block);
    });
}

//当浏览器大小变化的时候调用该函数
window.onresize = function () {
    //location = location;
}

function hashChange() {
    initParam();
    initMarkdown();
    setCore(mapDemoName, mapMode, mapFilefolder); //显示默认页面的源码
}

if (('onhashchange' in window) && ((typeof document.documentMode === 'undefined') || document.documentMode == 8)) {
    // 浏览器支持onhashchange事件
    window.onhashchange = hashChange; // TODO，对应新的hash执行的操作函数
}