/** 源码读取显示 **/
var sCopyTarget = "#code-content";
var showCodeFlag = true; //源码面板显示/隐藏标志位，用来辨别当前是显示源码还是显示接口说明
var editor = null; //源码高亮显示
var client = null;

var clientWid = 0;
var codeMidWidth = 0.38;
var codeMaxWidth = 0.7;

var markedRender = new marked.Renderer();

//mapMode mapFilefolder, mapFilefolder;来自app.js

var isFlash = false;

/**系统初始默认页面源码显示 **/
$(function () {
  initParam();
  initPosition();
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
 // console.log(url);
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
    }
  }
}

function initPosition() {
  var height = window.screen.height - 220;
  $('#code-wrapper').css("height", height);
  $('div.iframe-wrapper').css("height", height);
  $('#code-core').css("height", height);
  $('#code_body').css("height", height - 41);
}

/** 二级菜单项对应功能页面的源码显示 **/
function setCore(name, catalog, filefolder) {
  var oIframeWrapper = $('div.iframe-wrapper');
  var leftsidebar_box = $('#code-wrapper');
  var leftsidebarWidth = parseInt(leftsidebar_box.css('width'));

  $("#code-wrapper").show();
  if (!showCodeFlag) {
    showInstruction();
  } else {
    showCore();
  }
  var pageName = name;
  //根据当前选择的菜单项，显示源码
  var htmlUrl = "../demo/" + catalog + "/example/" + filefolder + "/" + name + ".htm"; //请求的页面
  //console.log(htmlUrl);
  var htmlString = ""; //请求页面的代码（字符串形式）
  $.ajax({
    async: false,
    url: htmlUrl,
    success: function (result) {
      htmlString = result;
      $('#code-content').val(htmlString); //设置源码到源码容器的textarea控件中
      localStorage.code = $(sCopyTarget).val();
    }
  });

  initEditor();

  //根据当前选择的菜单项，显示接口说明
  var interFaceUrl = "../demo/" + catalog + "/markdown/" + filefolder + "/" + name + ".md"; //接口说明页路径
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

  $('#interface-iframe').html(mdContent);
  $('#interface-iframe pre code').each(function (i, block) {
    Prism.highlightElement(block);
  });
  run();
}

/** 源码控制 **/
$(function () {
  initEditor(); //源码高亮显示
  initCopy(); //复制源码
  initMain();
});

function initMain() {
  //源码域显示/隐藏控制
  var icodeMidWidth = clientWid * codeMidWidth;
  var oArrow = $('#code-arrow');
  var oCodeCore = $('#code_core');
  var oArrow2 = $('#code-arrow2');
  var oCodeWrapper = $('#code-wrapper');
  var oIframeWrapper = $('div.iframe-wrapper');
  var leftsidebar_box = $('#code-wrapper');
  var leftsidebarWidth = parseInt(leftsidebar_box.css('width'));
  oArrow.click(function () {
    if (oArrow.hasClass('go-back')) {
      oCodeCore.animate({
        width: 0
      });
      oCodeWrapper.animate({
        width: 0
      });
      oIframeWrapper.animate({
        marginLeft: 0
      });
      oArrow.removeClass('go-back');
      oArrow2.hide();
    } else {
      oCodeCore.animate({
        width: icodeMidWidth
      });
      oCodeWrapper.animate({
        width: icodeMidWidth
      });
      oIframeWrapper.animate({
        marginLeft: clientWid * codeMidWidth
      });
      oArrow.addClass('go-back');
      oArrow2.show();
    }
  });
  oArrow2.removeClass('go-back');
  oArrow2.click(function () {
    if (oArrow2.hasClass('go-back')) {
      oCodeCore.animate({
        width: clientWid * codeMidWidth
      });
      oCodeWrapper.animate({
        width: clientWid * codeMidWidth
      });
      oIframeWrapper.animate({
        marginLeft: clientWid * codeMidWidth
      });
      oArrow2.removeClass('go-back');
      //控制复制代码控件的位置
      //copy.css("left", clientWid * codeMidWidth - 68);
    } else {
      oCodeCore.animate({
        width: clientWid * codeMaxWidth
      });
      oCodeWrapper.animate({
        width: clientWid * codeMaxWidth
      });
      oIframeWrapper.animate({
        marginLeft: clientWid * codeMaxWidth
      });
      oArrow2.addClass('go-back');
      //控制复制代码控件的位置
      //copy.css("left", clientWid - leftsidebarWidth - 68);
    }
  });
}

function initEditor() {
  if (!editor) {
    editor = CodeMirror.fromTextArea(document.getElementById("code-content"), {     
      lineNumbers: true, // 显示代码行号
      styleActiveLine: true, //当前行背景高亮
      matchBrackets: true,  //括弧匹配
      mode: "htmlmixed", //样式类型
      viewportMargin: Infinity, 
      lineWrapping: true, //代码折叠    
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    });
  } else {
    editor.setValue($(sCopyTarget).val());
  }
}

function initMarkdown() {
  //增加的代码，用于个性化输出table
  markedRender.table = function (header, body) {
    return '<table class="table table-striped">' + header + body + '</table>';
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

/** 代码复制功能 **/
function initCopy() {
  /*$('a[rel]').zclip({
      path: 'libs/jqueryzclip/ZeroClipboard.swf',
      copy: function () {
          return $(this.getAttribute('rel')).val();
      },
      afterCopy: function () {
          alert("代码已成功复制到粘贴板！ ");
      }
  });*/
}
//运行
function run() {
  var iframeContent = $("#code-content").val();
  if (editor) {
    iframeContent = editor.getValue();
  }
  //获取站点地址
  var urlStr = window.location.href;
  var nr = urlStr.indexOf("/index.htm");
  urlStr = urlStr.slice(0, nr); 
  //替换相对路径为绝对路径../..
  var req = /\.\.\/\.\./g;
  //iframeContent = iframeContent.replace(req, urlStr);
  var iFrame = document.getElementById("container-iframe").contentWindow;
  iFrame.document.open();
  iFrame.document.write(iframeContent);
  iFrame.document.close();
}

//还原
function reStore() {
  $("#code-content").val(localStorage.code);
  initEditor();
  run();
}

//显示源码
function showCore() {
  $("#code_copy,#code-run,#code-restore").show();
  $("#coreContent").show();
  $("#interfaceContent").hide();
  $("#coreHeader").removeClass("code-head-unselect").addClass("code-head-select");
  $("#interfaceHeader").removeClass("code-head-select").addClass("code-head-unselect");
  // initEditor();
  showCodeFlag = true;
}

//显示接口说明
function showInstruction() {
  $("#code-run,#code-restore").hide();
  $("#coreContent").hide();
  $("#interfaceContent").show();
  $("#coreHeader").removeClass("code-head-select").addClass("code-head-unselect");
  $("#interfaceHeader").removeClass("code-head-unselect").addClass("code-head-select");
  showCodeFlag = false;
}

//最大化窗口
$(function () {
  $("#code-content").val(localStorage.code);
  initEditor();
  initCopy(); //复制源码
  run();
});

//初始化
$(function () {
  //源码域显示/隐藏控制
  var icodeMidWidth = clientWid * codeMidWidth;
  var oArrow = $('#code-arrow');
  var oCodeCore = $('#code_core');
  var oArrow2 = $('#code-arrow2');
  var oCodeWrapper = $('#code-wrapper');
  var oIframeWrapper = $('div.iframe-wrapper');
  var leftsidebar_box = $('#code-wrapper');
  var leftsidebarWidth = parseInt(leftsidebar_box.css('width'));

  oCodeCore.animate({
    width: icodeMidWidth
  });
  oCodeWrapper.animate({
    width: icodeMidWidth
  });
  oIframeWrapper.animate({
    marginLeft: clientWid * codeMidWidth
  });
  oArrow.addClass('go-back');
  oArrow2.show();

  $("#code-arrow2").hover(function () {
    $("#code-arrow2").css("opacity", 1);
  }, function () {
    $("#code-arrow2").css("opacity", 0.55);
  });
  //鼠标滑过改变透明度
  $("#code-arrow").hover(function () {
    $("#code-arrow").css("opacity", 1);
  }, function () {
    $("#code-arrow").css("opacity", 0.55);
  });
});

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