(function () {
    'use strict';

    var defaultAction;
    var bucket = window.location.href;
    var pos = bucket.lastIndexOf('/');
    if (pos > 0 && pos < (bucket.length - 1)) {
      bucket = bucket.substring(pos + 1);
    }

    window.UIBuilder = {
      bucket: bucket,
      declare: function () {},
      highlight: function () {},
      registered: [],
      finishedLoading: function () {
        window.UIBuilder.reset();

        if (defaultAction) {
          window.UIBuilder.highlight(defaultAction);
          defaultAction();
          defaultAction = undefined;
        }

        document.body.className = document.body.className.replace(/(?:\s|^)UIBuilder-loading(?:\s|$)/, ' ');
      },

      addSidebar: function (config, sidebarId) {
        // var sibarnav = document.createElement('nav');
        // nav.className = 'mt-2';
        var sibarul = document.createElement('ul');
        sibarul.className = "nav nav-pills nav-sidebar flex-column";
        sibarul.setAttribute("role", "menu");
        sibarul.setAttribute("data-widget", "treeview");
        sibarul.setAttribute("data-accordion", "false");

        // sibarnav.appendChild(sibarul);

        config.list.forEach(function (value, index, array) {
          // <li class="nav-item has-treeview menu-open">
          //   <a href="#" class="nav-link active">
          //     <i class="nav-icon fa fa-dashboard"></i>
          //     <p>
          //       空间分析
          //       <span class="badge badge-info right">2</span>
          //       <i class="right fa fa-angle-left"></i>
          //     </p>
          //   </a>
          //   <ul class="nav nav-treeview"></ul>
          // </li>
          var itemList = document.createElement('li');
          itemList.className = "nav-item has-treeview menu-close";

          var itemListA = document.createElement('a');
          itemListA.className = "nav-link";
          var itemListUl = document.createElement('ul');
          itemListUl.className = "nav nav-treeview";

          var itemListAi = document.createElement('i');
          itemListAi.className = "nav-icon fa " + value.icon;

          var itemListAp = document.createElement('p');
          itemListAp.style.fontSize = "14px";
          itemListAp.innerText = value.name;

          var itemListApSpan = document.createElement('span');
          itemListApSpan.className = "badge badge-info right";
          itemListApSpan.style.marginRight = "20px";
          itemListApSpan.innerText = value.demos.length;

          var itemListApi = document.createElement('i');
          itemListApi.className = "right fa fa-angle-left";

          // <li class="nav-item">
          //   <a href="#analysis-buffer" class="nav-link">
          //           <i class="fa fa-circle-o nav-icon"></i>
          //           <p>缓冲区分析</p>
          //         </a>
          // </li>
          value.demos.forEach(function (item, index, array) {
            var li = document.createElement('li');
            li.className = "nav-item";

            var a = document.createElement('a');
            a.href = "#" + value.type + "-" + item.type;
            a.className = "nav-link";

            var i = document.createElement('i');
            var classDiffcult = "text-info";
            if (item.diffcult == 2) {
              classDiffcult = "text-warning";
            } else if (item.diffcult == 3) {
              classDiffcult = "text-danger";
            }
            i.className = 'fa fa-circle-o nav-icon ' + classDiffcult;

            var p = document.createElement('p');
            p.style.fontSize = "12px";
            p.innerText = item.name;

            a.appendChild(i);
            a.appendChild(p);
            li.appendChild(a);
            itemListUl.appendChild(li);
          });

          itemListAp.appendChild(itemListApSpan);
          itemListAp.appendChild(itemListApi);

          itemListA.appendChild(itemListAi);
          itemListA.appendChild(itemListAp);

          itemList.appendChild(itemListA);
          itemList.appendChild(itemListUl);

          sibarul.appendChild(itemList);
        });

        /* <li class="nav-header">标注说明</li>
        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fa fa-circle-o text-danger"></i>
            <p class="text">复杂</p>
          </a>
        </li> */

        var liInfo = document.createElement('li');
        liInfo.className = "nav-header";
        liInfo.innerText = "标注难度级别说明";
        liInfo.style.fontSize = "16px";
        sibarul.appendChild(liInfo);

        for (var index = 0; index < 3; index++) {
          var levelName = index == 0 ? "一般入门级别 - -!" :
            index == 1 ? "理解后豁然开朗 ^_^!" : "让人费解，慎重 Orz!";
          var levelText = index == 0 ? "text-info" : index == 1 ? "text-warning" : "text-danger";
          var liLevel = document.createElement('li');
          liLevel.className = "nav-item";
          var liLevelA = document.createElement('a');
          liLevelA.className = "nav-link";
          var liLevelI = document.createElement('i');
          liLevelI.className = "nav-icon fa fa-circle-o " + levelText;
          var liLevelP = document.createElement('p');
          liLevel.className = "text";
          liLevelP.innerText = levelName;
          liLevelP.style.fontSize = "13px";
          liLevelP.style.marginLeft = "10px";
          liLevelA.appendChild(liLevelI);
          liLevelA.appendChild(liLevelP);
          liLevel.appendChild(liLevelA);
          sibarul.appendChild(liLevel);
        }

        document.getElementById(sidebarId || 'body-sidebar').appendChild(sibarul);
      },

      addGallery: function (config, galleryId) {
        var gallery = document.getElementById(galleryId || 'body-gallery');

        config.list.forEach(function (value, index, array) {
          /*<div class="content-header">
            <hr class="feature-divider">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">空间分析</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <a href="#">Cesium</a>
                            </li>
                            <li class="breadcrumb-item active">空间分析</li>
                        </ol>
                    </div>
                </div>
            </div>
          </div>*/
          var typeHr = document.createElement('hr');
          typeHr.className = "feature-divider";
          var typeContainer = document.createElement('div');
          typeContainer.className = "container-fluid";
          var typeContainerRow = document.createElement('div');
          typeContainerRow.className = "row mb-2";
          var typeContainerRowLeft = document.createElement('div');
          typeContainerRowLeft.className = "col-sm-6";
          var typeContainerRowLeftName = document.createElement('h2');
          typeContainerRowLeftName.className = "m-0 text-dark";
          typeContainerRowLeftName.innerText = value.name;
          typeContainerRowLeft.appendChild(typeContainerRowLeftName);

          var typeContainerRowRight = document.createElement('div');
          typeContainerRowRight.className = "col-sm-6";
          var typeContainerRowRightOl = document.createElement('ol');
          typeContainerRowRightOl.className = "breadcrumb float-sm-right";
          var breadcrumb1 = document.createElement('li');
          breadcrumb1.className = "breadcrumb-item";
          var breadcrumb1A = document.createElement('a');
          breadcrumb1A.innerText = config.mapmode;
          breadcrumb1.appendChild(breadcrumb1A);

          var breadcrumb2 = document.createElement('li');
          breadcrumb2.className = "breadcrumb-item active";
          breadcrumb2.innerText = value.name;

          typeContainerRowRightOl.appendChild(breadcrumb1);
          typeContainerRowRightOl.appendChild(breadcrumb2);
          typeContainerRowRight.appendChild(typeContainerRowRightOl);

          typeContainerRow.appendChild(typeContainerRowLeft);
          typeContainerRow.appendChild(typeContainerRowRight);

          typeContainer.appendChild(typeContainerRow);


          var cardColumns = document.createElement('div');
          cardColumns.className = "card-columns";
          cardColumns.style.marginLeft = "10px";
          cardColumns.style.marginRight = "10px";

          value.demos.forEach(function (item, index, array) {
            /* <div class="card-columns" style="margin-left: 10px; margin-right: 10px;">
                  <div class="card text-center text-black p-0">
                      <!-- bg-primary -->
                      <img class="card-img-top" src="../demo/cesium/gallery/analysis/buffer.png" alt="Card image cap">
                      <div class="card-body">
                          <h5 class="card-title">缓冲区分析</h5>
                          <p class="card-text">提供最基本的缓冲区分析功能.</p>
                          <p class="card-text">
                              <small class="text-muted">最后更新时间：2018-05-05</small>
                          </p>
                      </div>
                  </div>
              </div> */
            var card = document.createElement('div');
            card.className = "card text-center text-black p-0";
            card.id = value.type + "-" + item.type;
            var cardLink = document.createElement('a');
            cardLink.className = "card-link";
            cardLink.target = "_blank";
            cardLink.title = config.title;
            cardLink.href = "http://" + window.location.host + "/ui/demos-" + config.mapmode + ".html#" + value.type + "-" + item.type;
            var cardImg = document.createElement('img');
            cardImg.className = "card-img-top lazyload";
            var defaultImg = "../img/card/null-img.png";
            var urlImg = "../demo/" + config.mapmode + "/gallery/" + value.type + "/" + item.icon;
            cardImg.setAttribute("data-src", urlImg);
            cardImg.src = defaultImg;
            cardImg.href = "http://" + window.location.host + "/ui/demos-" + config.mapmode + ".html#" + value.type + "-" + item.type;
            cardImg.alt = "Card image cap";
            var cardBody = document.createElement('div');
            cardBody.className = "card-body";
            var cardBodyH5 = document.createElement('h5');
            cardBodyH5.className = "card-title";
            cardBodyH5.innerText = item.name;
            var cardBodyP1 = document.createElement('p');
            cardBodyP1.className = "card-text";
            cardBodyP1.innerText = item.detail;
            var cardBodyP2 = document.createElement('p');
            cardBodyP2.className = "card-text";
            var small = document.createElement('small');
            small.className = "text-muted";
            small.innerText = item.update;

            cardBodyP2.appendChild(small);

            cardBody.appendChild(cardBodyH5);
            cardBody.appendChild(cardBodyP1);
            cardBody.appendChild(cardBodyP2);

            cardLink.appendChild(cardImg);
            card.appendChild(cardLink);
            card.appendChild(cardBody);

            cardColumns.appendChild(card);
          });

          gallery.appendChild(typeHr);
          gallery.appendChild(typeContainer);
          gallery.appendChild(cardColumns);
        });

        lazyload();
      },
       
      addMultiSidebar: function (config, sidebarId) {
        var sidebar = document.getElementById(sidebarId || 'body-sidebar');
        var containerUl = document.createElement('ul');

        containerUl.className = "nav nav-pills flex-column"; //"nav nav-pills nav-sidebar flex-column";
        containerUl.id = "body-sidebar-nav";

          //添加一级，二级，三级目录内容
        config.childs.forEach(function (node1, index, array) {
          var first = document.createElement('li');
          var firstul = window.UIBuilder._createFirstMenuItem(node1, node1.folder ,first);

          if (node1.leaffolder === false) {  //判断是否是叶结点，若不是，则表示还有子节点

            node1.childs.forEach(function (node2, index, array) {
              var second = document.createElement('li');
              var secondul = window.UIBuilder._createSecondMenuItem(node2,node1.folder + "-" + node2.folder,second);

              node2.childs.forEach(function (node3, index, array) {
                var thirdli = window.UIBuilder._createThirdMenuItem(node3, node1.folder + "-" + node2.folder);
                secondul.appendChild(thirdli);
              });
              firstul.appendChild(second);
            });
          } else {
            node1.childs.forEach(function (node2, index, array) {
              var menuitem = window.UIBuilder._createThirdMenuItem(node2, node1.folder);
              firstul.appendChild(menuitem);
            });
          }

          containerUl.appendChild(first);

        });

        sidebar.appendChild(containerUl);
      },


      /**
       * @param node 当前节点
       * @param linkpath 当前节点对应的url的#路径，如果是一级目录:#node.name
       */
      _createFirstMenuItem: function(node, linkpath, first) {
        first.className = "nav-item";
        first.onclick = function(){
          window.location.hash = linkpath;
        }
        /*
          <a class="nav-link" data-toggle="collapse" aria-expanded="false" href="#components1"">
            <i class="material-icons">person</i>
            <p>User Profile</p>
          </a>
        */
        var a1 = document.createElement('a');
        var className = "nav-link collapsed";
        a1.className = className;
       // a1.href = "#" + node.folder; //和下面的div.id = node.folder;对应起来
        a1.href = "#" + linkpath + "_firstli";
        a1.setAttribute("data-toggle", "collapse");
        a1.setAttribute("aria-expanded", false);
        //var iconDiv = document.createElement('div');
       // iconDiv.className = "icon icon-primary";
        var i = document.createElement('i');
        i.className = "material-icons";
        i.innerText = node.materialicon;
        var p = document.createElement('p');
        p.innerText = node.name;
        p.className = "sidebar-normal";
        var b = document.createElement('b');
        b.className = "caret";
        p.appendChild(b);
      //  iconDiv.appendChild(icon);
        a1.appendChild(i);
        a1.appendChild(p);
        /*
          <div class="collapse" id="components1" style="">
          <ul class="nav">
        */
        var div = document.createElement('div');
        div.className = "collapse";
       // div.id = node.folder; //和上面的a.href = "#" + node.folder;对应起来       
        div.id = linkpath + "_firstli";
        var firstul = document.createElement('ul');
        firstul.className = "nav";
        div.appendChild(firstul);

        first.appendChild(a1);
        first.appendChild(div);

        return firstul;
      },

      /**
       * @param node 当前节点
       * @param linkpath 当前节点对应的url的#路径，如果是二级目录：#first.name-second.name
       * @param isCollapsed 是否搜索菜单
       */
      _createSecondMenuItem: function (node,linkpath,second) {
        var isMenu = node.diffcult ? false : node.materialicon ? true : false;
        second.className = "nav-item nav-item-second";

        second.onclick = function(){
          window.location.hash = linkpath;
        }
        /*
          <a class="nav-link" data-toggle="collapse" href="#componentsA" aria-expanded="true">
              <span class="sidebar-mini"> MLT </span>
              <span class="sidebar-normal"> Multi Level Collapse
                  <b class="caret"></b>
              </span>
          </a>
        */
        var a2 = document.createElement('a');
        a2.className = "nav-link nav-link-second";  
       // a2.href = "#" + node.folder; //和下面的div.id = node.folder;对应起来
        a2.href = "#" + linkpath + "_secondli";
        a2.setAttribute("data-toggle", "collapse");
        a2.setAttribute("aria-expanded", true);
        if (isMenu) {
          var i = document.createElement('i');
          i.className = "material-icons";    // 二级目录是否添加字母或者图标
         // i.className = "sidebar-mini";
         // i.innerText = node.minitext ? node.minitext : "DT" ;
           i.innerText=node.materialicon;  
          a2.appendChild(i);
        } else {
          var spanMini = document.createElement('span');
          spanMini.className = "sidebar-mini";
          spanMini.innerText = node.folder ? node.folder : "";
          a2.appendChild(spanMini);
        }
        var spanNormal = document.createElement('span');
        spanNormal.innerText =  node.name;
        spanNormal.className = "sidebar-normal seconde-sidebar-text";

        var b = document.createElement('b');
        b.className = "caret";
        spanNormal.appendChild(b);
        a2.appendChild(spanNormal);
        /*
          <div class="collapse show" id="componentsA" style="">
            <ul class="nav"></ul>
          </div>
        */
        var div = document.createElement('div');
        div.className = "collapse" //"collapse show";

       // div.id = node.folder; //和上面的a.href = "#" + node.name;对应起来
        div.id = linkpath + "_secondli";;
        //div.style = "";
        var secondul = document.createElement('ul');
        secondul.className = "nav";
        div.appendChild(secondul);

        second.appendChild(a2);
        second.appendChild(div);
        return secondul;
      },

      /**
       * @param node 当前节点
       * @param linkpath 当前节点对应的url的#路径，如果是三级目录 first/second/xxx.htm
       * 则linkpath转换为#firstswcond-xxx
       * @param isCollapsed 是否搜索菜单
       */
      _createThirdMenuItem: function (node, linkpath) {
        /*
          <li class="nav-item ">
              <a class="nav-link" href="#0">
                  <span class="sidebar-mini"> E </span>
                  <span class="sidebar-normal"> Example </span>
              </a>
          </li>
        */
        var li = document.createElement('li');
        li.className = "nav-item nav-item-third";
        //20180901号添加的点击事件
        li.onclick = function(){
          var befores = document.getElementsByClassName("nav-item active");
         //消除其它点击的active
          for(var index = 0; index < befores.length; index++){
            var item = befores[index];
            item.className = "nav-item nav-item-third"
          }
          this.className += " active"
        };

        var a = document.createElement('a');
        a.className = "nav-link";
        a.href = "#" + linkpath + "-" + node.file; //和#xxx-xxx的跳转事件一起响应
        var spanMini = document.createElement('span');
        spanMini.style.fontSize = "15px";
        spanMini.className = "sidebar-mini text-info";
        var miniText = "★";
        if (node.diffcult) {
          if (node.diffcult <= 1) {
            //spanMini.style.color = "#17a2b8";
            spanMini.className = "sidebar-mini text-info";
          } else if (node.diffcult == 2) {
            //spanMini.style.color = "#ffc107";
            spanMini.className = "sidebar-mini text-warning";
            miniText = "★★";
          } else {
            //spanMini.style.color = "#dc3545";
            spanMini.className = "sidebar-mini text-danger";
            miniText = "★★★";
          }
        }
        spanMini.innerText = miniText;
        var spanNormal = document.createElement('span');
        spanNormal.className = "sidebar-normal third-sidebar-text";
        spanNormal.innerText = node.name;

        a.appendChild(spanMini);
        a.appendChild(spanNormal);
        li.appendChild(a);

        return li;
      },

      _addMuneNode: function (node) {
        // <li class="nav-item">
        //   <a href="#analysis-buffer" class="nav-link">
        //      <i class="fa fa-circle-o nav-icon"></i>
        //      <p>缓冲区分析</p>
        //   </a>
        // </li>
        var li = document.createElement('li');
        li.className = "nav-item";

        var a = document.createElement('a');
        a.href = "#" + node.type + "-" + node.type;
        a.className = "nav-link";

        var i = document.createElement('i');
        var classDiffcult = "text-info";
        if (node.diffcult == 2) {
          classDiffcult = "text-warning";
        } else if (node.diffcult == 3) {
          classDiffcult = "text-danger";
        }
        i.className = 'fa fa-circle-o nav-icon ' + classDiffcult;

        var p = document.createElement('p');
        p.style.fontSize = "12px";
        p.innerText = node.name;

        a.appendChild(i);
        a.appendChild(p);
        li.appendChild(a);
        return li;
      },
              //添加右边的条形框+card名片
      addMultiGallery: function (config, galleryId) {
        var gallery = document.getElementById(galleryId || 'body-gallery');

        config.childs.forEach(function (first, index, array) {

          if (first.leaffolder == false) {
            first.childs.forEach(function (second, index, array) {
              if (second.leaffolder == true) {
                gallery.appendChild(window.UIBuilder._createGalleryHeader(second, config.mapmode, first.folder, second.folder));
                gallery.appendChild(window.UIBuilder._createGalleryCard(second, config.mapmode, first.folder, second.folder));
              }
            });
          } else {
            gallery.appendChild(window.UIBuilder._createGalleryHeader(first, config.mapmode, first.folder));
            gallery.appendChild(window.UIBuilder._createGalleryCard(first, config.mapmode, first.folder));
          }
        });
      },

      _createGalleryHeader: function (node, mode, path1, path2) {
        /*
          <div class="card card-plain">
              <div class="card-header card-header-primary">   
                  <div class="row mb-2">
                      <div class="col-6">
                          <h4 class="card-title">一级标题</h4>
                          <p class="card-category">路径说明
                              <a target="_blank" href="">Google</a>
                          </p>
                      </div>
                      <div class="col-6">
                          <ol class="breadcrumb float-sm-right">
                              <li class="breadcrumb-item">
                                  <a href="#">Cesium</a>
                              </li>
                              <li class="breadcrumb-item active">空间分析</li>
                          </ol>
                      </div>
                  </div>
              </div>
          </div>
        */
       // 20180905本应该在cardHeader添加一个链接，但是由于没有在container中添加cardHeader，因此加载容器上
        var container = document.createElement('div');
        container.className = "divider-primary";
        var  headerUrlPath= path1 + (path2 != undefined ? "-" + path2 : "");
       // container.id = "http://"+ window.location.host +"/ui/demos-"+mode+".html#"+headurl;
        container.id = headerUrlPath;
      //  var cardHeaderLink = document.createElement('a');
      //  var headerUrlPath = path1 + (path2 != undefined ? "-" + path2 : "");
      //  var headerClickHref = "http://" + window.location.host + "/ui/demos-" + mode + ".html#" + headerUrlPath ;
      //  cardHeaderLink.href = headerClickHref;
      //  cardHeaderLink.className = "card-link";
      //  cardHeaderLink.target = "_blank";
      //  cardHeaderLink.title = node.name;

        var hr = document.createElement('hr');
        hr.className = "feature-divider";

        var card = document.createElement('div');
        card.className = "card card-plain";

        var cardHeader = document.createElement("div");
        cardHeader.className = "card-header card-header-primary";

        var cardBody = document.createElement("div");
        cardBody.className = "row";

        var row = document.createElement('div');
        row.className = "row mb-2";
        var colleft = document.createElement('div');
        colleft.className = "col-6";
        var colright = document.createElement('div');
        colright.className = "col-6";

        var h4 = document.createElement('h4');
        h4.className = "card-title text-white";
        h4.innerText = node.name;
        //在一级或者二级目录上添加超链接
        var HeaderLink = document.createElement('a');
        var headerClickHref = "http://" + window.location.host + "/ui/demos-" + mode + ".html#" + headerUrlPath ;
        HeaderLink.href = headerClickHref;

        var p = document.createElement('p');
        p.className = "card-category text-grey";
        p.innerText = (node.detail ? node.detail : "");
        colleft.appendChild(h4);
        colleft.appendChild(p);

        var ol = document.createElement('ol');
        ol.className = "breadcrumb float-sm-right";
        var li = document.createElement('li');
        li.className = "breadcrumb-item";
        var link = document.createElement('a');
        link.innerText = mode;
        link.href = "";
        li.appendChild(link);
        ol.appendChild(li);

        if (path1) {
          var li = document.createElement('li');
          li.className = "breadcrumb-item active";
          li.innerText = path1;
          ol.appendChild(li);
        }

        if (path2) {
          var li = document.createElement('li');
          li.className = "breadcrumb-item active";
          li.innerText = path2;
          ol.appendChild(li);
        }

        colright.appendChild(ol);

        row.appendChild(colleft);
        row.appendChild(colright);

        container.appendChild(hr);
        container.appendChild(row)

        /*       cardHeader.appendChild(row);
              card.appendChild(cardHeader);
              card.appendChild(cardBody); */
        return container;
      },

      _createGalleryCard: function (nodes, mode, path1, path2) {
        /*
        <div class="card-columns">
            <div class="card card-chart">
                <div class="card-header card-header-image" data-header-animation="true">
                    <img class="card-img-top" src="../demo/cesium/gallery/analysis/buffer.png"></img>
                </div>
                <div class="card-body">
                    <div class="card-actions text-center">
                        <button type="button" class="btn btn-danger btn-link fix-broken-card">
                            <i class="material-icons">build</i> 修复图片
                        </button>
                        <button type="button" class="btn btn-default btn-link" rel="tooltip" data-placement="bottom" title="" data-original-title="性能">
                            <i class="material-icons">art_track</i>
                        </button>
                        <button type="button" class="btn btn-success btn-link" rel="tooltip" data-placement="bottom" title="" data-original-title="最大数据量">
                            <i class="material-icons">edit</i>
                        </button>
                        <button type="button" class="btn btn-danger btn-link" rel="tooltip" data-placement="bottom" title="" data-original-title="维护人：潘卓然">
                            <i class="material-icons">person</i>
                        </button>
                    </div>
                    <h4 class="card-title">Email Subscriptions</h4>
                    <p class="card-category">
                        <span class="text-success">
                            <i class="fa fa-long-arrow-up"></i> 55%
                        </span> increase in today sales.
                    </p>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <i class="material-icons">access_time</i> campaign sent 2 days ago
                    </div>
                </div>
            </div>
        </div>
        */
        var colums = document.createElement('div');
        colums.className = "card-columns";

        nodes.childs.forEach(function (node, index, array) {
              var card = document.createElement('div');
              card.className = "card card-chart";
              card.id = path1 + (path2 != undefined ? "-" + path2 : "") + "-" + node.file;

              var header = document.createElement('div');
              var body = document.createElement('div');
              var footer = document.createElement('div');

              header.className = "card-header card-header-image animated";
              header.setAttribute("data-header-animation", true);

              var cardLink = document.createElement('a');
              var urlPath = path1 + (path2 != undefined ? "-" + path2 : "");
              var clickHref = "http://" + window.location.host + "/ui/demos-" + mode + ".html#" + urlPath + "-" + node.file;
              cardLink.href = clickHref;
              cardLink.className = "card-link";
              cardLink.target = "_blank";
              cardLink.title = node.name;

              var img = document.createElement('img');
              img.className = "card-img-top card-link lazyload";
              var filePath = path1 + (path2 != undefined ? "/" + path2 : "");
              var imgPath = "http://" + window.location.host + "/demo/" + mode + "/gallery/" + filePath + "/" + node.icon;
              var defaultImg = "../img/card/null-img.png";
              img.setAttribute("data-src", imgPath);
              img.alt = "Card image cap";
              img.src = defaultImg;
              img.href = clickHref;

              cardLink.appendChild(img);
              header.appendChild(cardLink);

              body.className = "card-body";
              var action = document.createElement('div');
              action.className = "card-actions text-center";
              var btnfix = document.createElement('button');
              var btneffect = document.createElement('button');
              var btndata = document.createElement('button');
              var btnperson = document.createElement('button');

              /*         btnfix.className = "btn btn-danger btn-link fix-broken-card";
                      btnfix.setAttribute("type", "button");
                      var i1 = document.createElement('i');
                      i1.className = "material-icons";
                      i1.innerText = "build"
                      btnfix.innerText = "修复图片";
                      btnfix.appendChild(i1); */

              btneffect.className = "btn btn-default btn-link";
              btneffect.setAttribute("type", "button");
              var i2 = document.createElement('i');
              i2.className = "material-icons";
              i2.innerText = "art_track"
              //btneffect.innerText = "性能";
              //这里也可以在config里面再子节点添加effect的标签
              btneffect.setAttribute("rel", "tooltip");
              btneffect.setAttribute("data-placement", "bottom");
              btneffect.setAttribute("data-original-title", node.effect ? node.effect : "无性能分析");
              btneffect.appendChild(i2);

              btndata.className = "btn btn-default btn-link";
              btndata.setAttribute("type", "button");
              var i3 = document.createElement('i');
              i3.className = "material-icons";
              i3.innerText = "edit";
              //btndata.innerText = "数据";
              //这里也可以在config里面再子节点添加data的标签
              btndata.setAttribute("rel", "tooltip");
              btndata.setAttribute("data-placement", "bottom");
              btndata.setAttribute("data-original-title", node.data ? node.data : "临时测试数据");
              btndata.appendChild(i3);

              btnperson.className = "btn btn-default btn-link";
              btnperson.setAttribute("type", "button");
              var i4 = document.createElement('i');
              i4.className = "material-icons";
              i4.innerText = "person";
              //btnperson.innerText = "维护人";
              btnperson.setAttribute("rel", "tooltip");
              btnperson.setAttribute("data-placement", "bottom");

              var worker = "基础平台/创新中心-潘卓然";
              //这里也可以在config里面再子节点添加persion的标签
              if (mapMode == MODE_MAPBOX && (path1 == "igserver" || path1 == "mapprovider" || path1 == "tools" || path1 == "viewanalysis")) {
                  worker = "基础平台-韩彦生";
                } else if (path2 == "geojson" || path1 == "office") {
                  worker = "平台二次开发部-程昌红";
                } else if (mapMode == MODE_LEAFLET && (path1 == "map" || path1 == "igserver")) {
                  worker = "平台二次开发部-吴卫卫，朱鹏飞";
                } else if (mapMode == MODE_OPENLAYER && (path1 == "map" || path1 == "igserver")) {
                  worker = "平台二次开发部-朱鹏飞";
                } else if (mapMode == MODE_MAPBOX && (path1 == "map" || path1 == "igserver")) {
                  worker = "平台二次开发部-吴卫卫，朱鹏飞";
                }

                btnperson.setAttribute("data-original-title", node.person ? node.person : worker); btnperson.appendChild(i4);

                //action.appendChild(btnfix);
                action.appendChild(btneffect); action.appendChild(btndata); action.appendChild(btnperson);

                var h4a = document.createElement('a'); h4a.className = "btn-link"; h4a.target = "_blank"; h4a.href = clickHref;
                var h4 = document.createElement('h4'); h4.className = "card-title"; h4.innerText = node.name; h4a.appendChild(h4);
                var category = document.createElement('p'); category.className = "card-category";
                var detail = document.createElement('span'); detail.className = "text-success"; detail.innerText = node.detail; category.appendChild(detail);

                body.appendChild(action); body.appendChild(h4a); body.appendChild(category);

                footer.className = "card-footer";
                var stats = document.createElement('div'); stats.className = "stats";
                var i = document.createElement("i"); i.className = "material-icons"; i.innerText = "access_time"; stats.innerText = node.update; stats.appendChild(i); footer.appendChild(stats);

                card.appendChild(header); card.appendChild(body); card.appendChild(footer);

                colums.appendChild(card);
              });

            return colums;
          },

          linkSiderbarAndGallery: function(){

          },

          adjustFrame: function (codeId, containId) {
            var mainContainer = document.getElementById(containId || 'body-framework');
            var codeContainer = document.getElementById(containId || 'iframe-wrapper');
            var codeEditor = document.getElementById(containId || 'code-wrapper');
            /* var height = mainContainer.style.height;
            var originHeight = codeContainer.style.height;
            codeContainer.clientHeight = height > 0? height : originHeight; */
            codeContainer.style.height = window.screen.height + "px";
            //codeEditor.style.height = window.screen.height + "px";
          }
      }

      if (window.location.protocol === 'file:') {
        if (window.confirm("中地数码WebClient.\n请联系基础平台/创新中心的潘卓然")) {
          window.location = 'http:/www.samryun.com';
        }
      }
    }());