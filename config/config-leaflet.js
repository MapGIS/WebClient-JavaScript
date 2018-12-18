var config = {
  name: "",
  title: "MapGIS WebClinet-Leaflet演示网站",
  mapmode: "leaflet",
  childs: [
    {
      name: "地图功能",
      materialicon: "map",
      folder: "map",
      leaffolder: false,
      childs: [
        {
          name: "地图控件",
          detail: "基本的地图控件功能",
          materialicon: "map",
          // minitext:"m",
          folder: "control",
          leaffolder: true,
          childs: [
            {
              name: "导航栏控件",
              file: "navigation",
              diffcult: "1",
              detail: "基本的导航栏控件。",
              icon: "navigation.png",
              update: "最后更新时间：2018-05-29"
            },
            {
              name: "缩放控制控件",
              file: "zoomslider",
              diffcult: "1",
              detail: "基本的缩放控制控件。",
              icon: "zoomslider.png",
              update: "最后更新时间：2018-05-29"
            },
            {
              name: "鼠标位置控件",
              file: "mouseposition",
              diffcult: "1",
              detail: "基本的鼠标位置控件。",
              icon: "mouseposition.png",
              update: "最后更新时间：2018-05-29"
            },
            {
              name: "比例尺控件",
              file: "scaleline",
              diffcult: "1",
              detail: "基本的比例尺控件。",
              icon: "scaleline.png",
              update: "最后更新时间：2018-05-29"
            },
            {
              name: "鹰眼控件",
              file: "overviewmap",
              diffcult: "1",
              detail: "基本的鹰眼控件。",
              icon: "overviewmap.png",
              update: "最后更新时间：2018-05-29"
            },
            {
              name: "图层控制控件",
              file: "layercontrol", //file指的是
              diffcult: "1",
              detail: "基本的图层控制控件。",
              icon: "layercontrol.png",
              update: "最后更新时间：2018-05-29"
            },
            {
              name: "全屏控件",
              file: "fullscreen",
              diffcult: "1",
              detail: "基本的全屏控件。",
              icon: "fullscreen.png",
              update: "最后更新时间：2018-05-29"
            },
            {
              name: "测量控件",
              file: "measure",
              diffcult: "2",
              detail: "基本的测量控件。",
              icon: "measure.png",
              update: "最后更新时间：2018-05-29"
            }
          ]
        },
        {
          name: "地图操作",
          detail: "基本的地图操作功能，主要是当前视窗坐标计算和图层控制",
          materialicon: "map",
          folder: "mapoperation",
          leaffolder: true,
          childs: [
            {
              name: "设置地图背景",
              file: "background",
              diffcult: "1",
              detail: "基本的地图背景设置。",
              icon: "background.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "地图定位",
              file: "positioning",
              diffcult: "1",
              detail: "基本的地图定位信息。",
              icon: "positioning.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "显示级数",
              file: "viewzoom",
              diffcult: "1",
              detail: "基本的显示级数信息。",
              icon: "viewzoom.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "视窗逻辑坐标",
              file: "windowposition",
              diffcult: "1",
              detail: "基本的视窗逻辑坐标信息。",
              icon: "windowposition.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "地图域当前信息",
              file: "information",
              diffcult: "1",
              detail: "基本的地图域当前信息。",
              icon: "information.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "导出成图片",
              file: "coutpicture",
              diffcult: "1",
              detail: "基本的导出成图片功能,支持垱店尺寸，A4横竖两种导出方式。",
              icon: "coutpicture.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "导出成PDF",
              file: "coutpdf",
              diffcult: "1",
              detail: "基本的。",
              icon: "coutpdf.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "图层探查",
              file: "layersearch",
              diffcult: "1",
              detail: "基本的图层探查功能，通过放大镜实现。",
              icon: "layersearch.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "栅格图层层级控制",
              file: "layerscontrol",
              diffcult: "1",
              detail: "基本的栅格图层层级控制功能。",
              icon: "layerscontrol.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "矢量图层层级控制",
              file: "vectorcontrol",
              diffcult: "1",
              detail: "基本的矢量图层层级控制。",
              icon: "vectorcontrol.png",
              update: "最后更新时间：2018-06-02"
            },
            {
              name: "图层组控制",
              file: "layergroupcontrol",
              diffcult: "1",
              detail: "基本的图层组控制功能,实际上是透明度空间的使用。",
              icon: "layergroupcontrol.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "地图裁剪",
              file: "boundarycanvas",
              diffcult: "1",
              detail:
                "多边形裁剪地图，通过绘制多边形，只显示多边形范围内的地图部分",
              icon: "boundarycanvas.png",
              update: "最后更新时间：2018-11-2",
              person: "基础平台/产品中心-龚跃健"
            },
              {
                  name: "自定义范围打印输出",
                  file: "customprint",
                  diffcult: "1",
                  detail: "绘制矩形，输出矩形范围内地图，支持增加图框、标题、左右下角说明文字",
                  icon: "customprint.png",
                  update: "最后更新时间：2018-12-18",
                  person: "基础平台/产品中心-龚跃健"
              }
          ]
        },
        {
          name: "地图事件",
          detail: "基本的地图事件，注意map.on('event', function(){})的事件机制",
          materialicon: "map",
          folder: "mapevent",
          leaffolder: true,
          childs: [
            {
              name: "地图操作事件",
              file: "operation",
              diffcult: "1",
              detail: "测试基本的地图操作事件",
              icon: "operation.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "地图状态事件",
              file: "stateevent",
              diffcult: "1",
              detail: "测试基本的地图状态事件",
              icon: "stateevent.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "地图Popup事件",
              file: "popupevent",
              diffcult: "1",
              detail: "测试基本的地图Popup事件",
              icon: "popupevent.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "地图Tooltip事件",
              file: "tooltipevent",
              diffcult: "1",
              detail: "测试基本的地图Tooltip事件",
              icon: "tooltipevent.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "地图鼠标键盘事件",
              file: "mousekeyboard",
              diffcult: "1",
              detail: "测试基本的地图鼠标键盘事件",
              icon: "mousekeyboard.png",
              update: "最后更新时间：2018-05-30"
            }
          ]
        },
        {
          name: "地图注记",
          detail: "基本的地图注记，Marker，Popup等常见标注",
          materialicon: "map",
          folder: "mapmarker",
          leaffolder: true,
          childs: [
            {
              name: "图片标注",
              file: "addpicture",
              diffcult: "1",
              detail: "测试基本的图片标注",
              icon: "addpicture.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "文字标注",
              file: "addtext",
              diffcult: "1",
              detail: "测试基本的文字标注",
              icon: "addtext.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "图文标注",
              file: "addtextandpic",
              diffcult: "1",
              detail: "测试基本的图文标注",
              icon: "addtextandpic.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "Popup弹出框",
              file: "addpopup",
              diffcult: "1",
              detail: "测试基本的Popup弹出框",
              icon: "addpopup.png",
              update: "最后更新时间：2018-05-30"
            },
            {
              name: "聚合标注",
              file: "addclusterlabels",
              diffcult: "1",
              detail: "测试基本的聚合标注",
              icon: "addclusterlabels.png",
              update: "最后更新时间：2018-05-30"
            }
          ]
        },
        {
          name: "地图底图",
          materialicon: "map",
          folder: "mapdisplay",
          leaffolder: true,
          childs: [
            {
              name: "百度炫彩地图-3857",
              file: "baidumap",
              diffcult: "1",
              detail:
                "包含百度提供的各式各样的炫彩地图，请注意这是计费收费的！！。",
              icon: "baidumap.png",
              update: "最后更新时间：2018-06-05"
            },
            {
              name: "互联网地图集锦-3857",
              file: "mapprovider",
              diffcult: "1",
              detail: "包含主流的互联网地图公司提供的瓦片地图。",
              icon: "mapprovider.png",
              update: "最后更新时间：2018-05-23"
            },
            {
              name: "瓦片地图显示-4326-BUG",
              file: "tilemapdisplay",
              diffcult: "3",
              detail: "瓦片地图显示",
              icon: "tilemapdisplay.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "矢量地图文档显示-4326",
              file: "vecdocdisplay",
              diffcult: "1",
              detail: "矢量地图文档显示",
              icon: "vecdocdisplay.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "矢量图层显示-4326",
              file: "veclayerdisplay",
              diffcult: "1",
              detail: "矢量图层显示",
              icon: "veclayerdisplay.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "天地图-内网4326",
              file: "tianditudisplay",
              diffcult: "2",
              detail: "天地图",
              icon: "tianditudisplay.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "天地图-外网4326",
              file: "tianditudisplayonline",
              diffcult: "2",
              detail: "天地图-外网4326",
              icon: "tianditudisplayonline.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "ArcGIS地图显示",
              file: "arcgismapdisplay",
              diffcult: "1",
              detail: "ArcGIS地图显示",
              icon: "arcgismapdisplay.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "Google-内网3857",
              file: "googlemapdisplay",
              diffcult: "1",
              detail: "Google-内网3857",
              icon: "googlemapdisplay.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "Google-外网3857",
              file: "googlemapdisplayonline",
              diffcult: "1",
              detail: "Google-外网3857",
              icon: "googlemapdisplayonline.png",
              update: "最后更新时间：2018-06-01"
            }
          ]
        },
        {
          name: "OGC",
          materialicon: "map",
          folder: "ogc",
          leaffolder: true,
          childs: [
            {
              name: "加载OGC的WMTS图层-4326",
              file: "ogcwmts",
              diffcult: "1",
              detail: "加载OGC的WMTS图层",
              icon: "ogcwmts.png",
              update: "最后更新时间：2018-06-01",
              person: "基础平台/创新中心-潘卓然"
            },
            {
              name: "加载OGC的WMS图层-4326",
              file: "ogcwms",
              diffcult: "1",
              detail: "加载OGC的WMS图层",
              icon: "ogcwms.png",
              update: "最后更新时间：2018-06-01",
              person: "基础平台/创新中心-潘卓然"
            },
            {
              name: "WFS地图显示-4326",
              file: "ogcwfs",
              diffcult: "1",
              detail: "WFS地图显示",
              icon: "ogcwfs.png",
              update: "最后更新时间：2018-06-01",
              person: "基础平台/创新中心-潘卓然"
            },
            {
              name: "加载OGC的WMTS图层-3857",
              file: "ogcwmts3857",
              diffcult: "1",
              detail: "加载OGC的WMTS图层-EPSG:3857",
              icon: "ogcwmts3857.png",
              update: "最后更新时间：2018-06-02",
              person: "基础平台/创新中心-潘卓然"
            },
            {
              name: "加载OGC的WMS图层-3857",
              file: "ogcwms3857",
              diffcult: "1",
              detail: "加载OGC的WMS图层-EPSG:3857",
              icon: "ogcwms3857.png",
              update: "最后更新时间：2018-06-02",
              person: "基础平台/创新中心-潘卓然"
            },
            {
              name: "WFS地图显示-3857",
              file: "ogcwfs3857",
              diffcult: "2",
              detail: "WFS地图显示-EPSG:3857",
              icon: "ogcwfs3857.png",
              update: "最后更新时间：2018-06-02",
              person: "基础平台/创新中心-潘卓然"
            }
          ]
        },
        {
          name: "自定义投影座标系",
          materialicon: "map",
          folder: "customtile",
          leaffolder: true,
          childs: [
            {
              name: "高斯投影-开源实现",
              file: "gauss",
              diffcult: "1",
              detail: "高斯投影",
              icon: "gauss.png",
              update: "最后更新时间：2018-06-05",
              person: "基础平台/创新中心-潘卓然"
            },
            {
              name: "EPSG4610-中地内置",
              file: "epsg4610",
              diffcult: "1",
              detail: "EPSG4610: 经纬度裁图，西安80椭球 ",
              icon: "epsg4610.png",
              update: "最后更新时间：2018-10-17",
              person: "基础平台-龚跃健"
            },
            {
              name: "EPSG4610-开源实现",
              file: "epsg4610proj",
              diffcult: "1",
              detail: "EPSG4610: 经纬度裁图，西安80椭球 ",
              icon: "epsg4610proj.png",
              update: "最后更新时间：2018-10-17",
              person: "基础平台/创新中心-潘卓然"
            }
          ]
        }
      ]
    },
    {
      name: "几何图元",
      materialicon: "bubble_chart",
      folder: "geometry",
      leaffolder: false,
      childs: [
        {
          name: "内置几何Object",
          materialicon: "bubble_chart",
          folder: "graphic",
          leaffolder: true,
          childs: [
            {
              name: "坐标添加点",
              file: "graphicdrawbypoint",
              diffcult: "1",
              detail: "坐标添加点",
              icon: "graphicdrawbypoint.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "坐标添加线",
              file: "graphicdrawbyline",
              diffcult: "1",
              detail: "坐标添加线",
              icon: "graphicdrawbyline.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "坐标添加圆",
              file: "graphicdrawbycircle",
              diffcult: "1",
              detail: "坐标添加圆",
              icon: "graphicdrawbycircle.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "坐标添加正方形",
              file: "graphicdrawbysquare",
              diffcult: "1",
              detail: "坐标添加正方形",
              icon: "graphicdrawbysquare.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "坐标添加矩形",
              file: "graphicdrawbyrectangle",
              diffcult: "1",
              detail: "坐标添加矩形",
              icon: "graphicdrawbyrectangle.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "坐标添加多边形",
              file: "graphicdrawbypolygon",
              diffcult: "1",
              detail: "坐标添加多边形",
              icon: "graphicdrawbypolygon.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "交互绘制图形",
              file: "drawfeatures",
              diffcult: "1",
              detail: "交互绘制图形",
              icon: "drawfeatures.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "图形样式编辑",
              file: "featuresstyle",
              diffcult: "1",
              detail: "图形样式编辑",
              icon: "featuresstyle.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取几何信息",
              file: "getgeometryinfo",
              diffcult: "1",
              detail: "获取几何信息",
              icon: "getgeometryinfo.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "绘制其他要素",
              file: "drawlinearrows",
              diffcult: "1",
              detail: "绘制其他要素",
              icon: "drawlinearrows.png",
              update: "最后更新时间：2018-06-01"
            }
          ]
        },
        {
          name: "通用几何GeoJSON",
          materialicon: "bubble_chart",
          folder: "geojson",
          leaffolder: true,
          childs: [
            {
              name: "Point",
              file: "point",
              diffcult: "1",
              detail: "给定一个geojson格式的经纬坐标点，将其展示在leaflet上。",
              icon: "point.png",
              update: "最后更新时间：2018-05-10"
            },
            {
              name: "Line",
              file: "line",
              diffcult: "1",
              detail: "将地理位置的坐标数组(二维)以geojson格式加载进leaflet。",
              icon: "line.png",
              update: "最后更新时间：2018-05-10"
            },
            {
              name: "Polygon",
              file: "polygon",
              diffcult: "1",
              detail:
                "一个环形坐标数组的数组(三维)以geojson格式加载进leaflet。针对“带洞区”，最好采取外圈顺时针，内圈逆时针的方式",
              icon: "polygon.png",
              update: "最后更新时间：2018-05-10"
            },
            {
              name: "MultiPoint",
              file: "multipoint",
              diffcult: "1",
              detail: "将位置坐标组成二维数组以geojson格式加载进leafelt中。",
              icon: "multipoint.png",
              update: "最后更新时间：2018-05-10"
            },
            {
              name: "MultiLine",
              file: "multiline",
              diffcult: "1",
              detail: "将线坐标数组的数组(三维)以geojson格式加载进leaflet。",
              icon: "multiline.png",
              update: "最后更新时间：2018-05-10"
            },
            {
              name: "MultiPolygon",
              file: "multipolygon",
              diffcult: "2",
              detail: "将面坐标数组的数组(四维)以geojson格式加载进leaflet。",
              icon: "multipolygon.png",
              update: "最后更新时间：2018-05-10"
            },
            {
              name: "FeatureCollection",
              file: "featurecollection",
              diffcult: "2",
              detail: "以Geojson特征集合数据格式将数据加载进leaflet。",
              icon: "featurecollection.png",
              update: "最后更新时间：2018-05-10"
            },
            {
              name: "地理数据转换",
              file: "transform",
              diffcult: "2",
              detail:
                "将特定或非特定格式的地理数据转换为标准的geojson格式加载进leaflet。",
              icon: "transform.png",
              update: "最后更新时间：2018-05-10"
            },
            {
              name: "JsonParse",
              file: "jsonparse",
              diffcult: "2",
              detail:
                "接受一个标准格式的JSON字符串，并返回解析后标准的JavaScript对象，可用于geojson数据的解析。",
              icon: "jsonparse.png",
              update: "最后更新时间：2018-05-10"
            }
          ]
        }
      ]
    },
    {
      name: "IGServer",
      materialicon: "dashboard",
      folder: "igserver",
      leaffolder: false,
      childs: [
        {
          name: "专题图",
          materialicon: "dashboard",
          folder: "themeservice",
          leaffolder: true,
          childs: [
            {
              name: "获取专题图信息",
              file: "mapinfo",
              diffcult: "1",
              detail: "获取igserver的专题图信息",
              icon: "mapinfo.png",
              update: "最后更新时间：2018-05-31"
            },
            {
              name: "统一专题图",
              file: "uniquetheme",
              diffcult: "1",
              detail: "获取igserver的统一专题图",
              icon: "uniquetheme.png",
              update: "最后更新时间：2018-05-31"
            },
            {
              name: "多字段专题图",
              file: "multifield",
              diffcult: "1",
              detail: "获取igserver的统一专题图",
              icon: "multifield.png",
              update: "最后更新时间：2018-05-31"
            },
            {
              name: "单字段专题图",
              file: "singlefield",
              diffcult: "1",
              detail: "获取igserver的统一专题图",
              icon: "singlefield.png",
              update: "最后更新时间：2018-05-31"
            },
            {
              name: "统一专题图",
              file: "simple",
              diffcult: "1",
              detail: "获取igserver的统一专题图",
              icon: "simple.png",
              update: "最后更新时间：2018-05-31"
            },
            {
              name: "随机专题图",
              file: "random",
              diffcult: "1",
              detail: "获取igserver的随机专题图",
              icon: "random.png",
              update: "最后更新时间：2018-05-31"
            },
            {
              name: "四色专题图",
              file: "fourcolor",
              diffcult: "3",
              detail: "获取igserver的四色专题图",
              icon: "fourcolor.png",
              update: "最后更新时间：2018-05-31"
            },
            {
              name: "表格专题图",
              file: "chart",
              diffcult: "1",
              detail: "获取igserver的表格专题图",
              icon: "chart.png",
              update: "最后更新时间：2018-05-31"
            },
            {
              name: "密度专题图",
              file: "density",
              diffcult: "1",
              detail: "获取igserver的密度专题图",
              icon: "density.png",
              update: "最后更新时间：2018-05-31"
            },
            {
              name: "等级专题图",
              file: "graduated",
              diffcult: "1",
              detail: "获取igserver的等级专题图",
              icon: "graduated.png",
              update: "最后更新时间：2018-05-31"
            },
            {
              name: "更新专题图",
              file: "updateinfo",
              diffcult: "1",
              detail: "更新igserver的专题图信息",
              icon: "updateinfo.png",
              update: "最后更新时间：2018-05-31"
            },
            {
              name: "删除专题图",
              file: "deleteinfo",
              diffcult: "1",
              detail: "删除igserver的专题图信息",
              icon: "deleteinfo.png",
              update: "最后更新时间：2018-05-31"
            }
          ]
        },
        {
          name: "空间分析",
          materialicon: "dashboard",
          folder: "analysisservice",
          leaffolder: true,
          childs: [
            {
              name: "类单圈缓冲分析",
              file: "singlebuffer",
              diffcult: "3",
              detail: "类单圈缓冲分析。",
              icon: "singlebuffer.png",
              update: "最后更新时间：2018-05-31"
            },
            {
              name: "类多圈缓冲分析",
              file: "multibuffer",
              diffcult: "3",
              detail: "类多圈缓冲分析",
              icon: "multibuffer.png",
              update: "最后更新时间：2018-05-31"
            },
            {
              name: "要素单圈缓冲分析",
              file: "singlebufferfeature",
              diffcult: "1",
              detail: "要素单圈缓冲分析",
              icon: "singlebufferfeature.png",
              update: "最后更新时间：2018-05-31"
            },
            {
              name: "要素多圈缓冲分析",
              file: "multibufferfeature",
              diffcult: "1",
              detail: "要素多圈缓冲分析",
              icon: "multibufferfeature.png",
              update: "最后更新时间：2018-05-31"
            },
            {
              name: "圆裁剪分析",
              file: "circleclip",
              diffcult: "3",
              detail: "圆裁剪分析",
              icon: "circleclip.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "多边形裁剪分析",
              file: "polygonclip",
              diffcult: "3",
              detail: "多边形裁剪分析",
              icon: "polygonclip.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "图层裁剪分析",
              file: "layerclip",
              diffcult: "3",
              detail: "图层裁剪分析",
              icon: "layerclip.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "图层叠加分析",
              file: "layeroverlayer",
              diffcult: "3",
              detail: "图层叠加分析",
              icon: "layeroverlayer.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "多边形叠加分析",
              file: "polygonoverlay",
              diffcult: "3",
              detail: "多边形叠加分析",
              icon: "polygonoverlay.png",
              update: "最后更新时间：2018-06-01"
            }
          ]
        },
        {
          name: "网络分析",
          materialicon: "dashboard",
          folder: "netservice",
          leaffolder: true,
          childs: [
            {
              name: "网络分析（新）",
              file: "netanalysistnew",
              diffcult: "1",
              detail: "网络分析（新）",
              icon: "netanalysistnew.png",
              update: "最后更新时间：2018-06-02"
            },
            {
              name: "网络分析（旧）",
              file: "netanalysistold",
              diffcult: "1",
              detail: "网络分析（旧）",
              icon: "netanalysistold.png",
              update: "最后更新时间：2018-06-02"
            }
          ]
        },
        {
          name: "等值线分析",
          materialicon: "dashboard",
          folder: "contouranalysis",
          leaffolder: true,
          childs: [
            {
              name: "等值线分析",
              file: "contouranalysis",
              diffcult: "1",
              detail: "等值线分析",
              icon: "contouranalysis.png",
              update: "最后更新时间：2018-06-02"
            }
          ]
        },
        {
          name: "投影变换",
          materialicon: "dashboard",
          folder: "projection",
          leaffolder: true,
          childs: [
            {
              name: "投影转换（图层）",
              file: "projectbylayer",
              diffcult: "1",
              detail: "投影转换（图层）",
              icon: "projectbylayer.png",
              update: "最后更新时间：2018-06-02"
            },
            {
              name: "投影转换（空间参照）",
              file: "projectbyparam",
              diffcult: "1",
              detail: "投影转换（空间参照）",
              icon: "projectbyparam.png",
              update: "最后更新时间：2018-06-02"
            }
          ]
        },
        {
          name: "要素查询",
          materialicon: "dashboard",
          folder: "catalogservice",
          leaffolder: true,
          childs: [
            {
              name: "获取文档列表",
              file: "getvectordocmanager",
              diffcult: "1",
              detail: "获取文档列表",
              icon: "getvectordocmanager.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取指定文档信息",
              file: "getmaindocinfo",
              diffcult: "1",
              detail: "获取指定文档信息",
              icon: "getmaindocinfo.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取文档地图信息",
              file: "getdocmapinfo",
              diffcult: "1",
              detail: "获取文档地图信息",
              icon: "getdocmapinfo.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取文档地图指定图层信息",
              file: "getdocmainlayerinfo",
              diffcult: "1",
              detail: "获取文档地图指定图层信息",
              icon: "getdocmainlayerinfo.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取文档地图所有图层信息",
              file: "getdoclayerinfo",
              diffcult: "1",
              detail: "获取文档地图所有图层信息",
              icon: "getdoclayerinfo.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "添加图层",
              file: "addlayer",
              diffcult: "1",
              detail: "添加图层",
              icon: "addlayer.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "删除图层",
              file: "deletelayer",
              diffcult: "1",
              detail: "删除图层",
              icon: "deletelayer.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "更改图层顺序",
              file: "changelayerindex",
              diffcult: "1",
              detail: "更改图层顺序",
              icon: "changelayerindex.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取指定图层图例信息",
              file: "doclegend",
              diffcult: "1",
              detail: "获取指定图层图例信息",
              icon: "doclegend.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取数据源列表",
              file: "getsvrmanager",
              diffcult: "1",
              detail: "获取数据源列表",
              icon: "getsvrmanager.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取指定数据源数据库列表",
              file: "getgdbmanager",
              diffcult: "1",
              detail: "获取指定数据源数据库列表",
              icon: "getgdbmanager.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取GDB下要素集列表",
              file: "getgdbdslist",
              diffcult: "1",
              detail: "获取GDB下要素集列表",
              icon: "getgdbdslist.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取GDB下所有栅格目录列表",
              file: "getgdbrcslist",
              diffcult: "1",
              detail: "获取GDB下所有栅格目录列表",
              icon: "getgdbrcslist.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取参考系列表",
              file: "getprojectlist",
              diffcult: "1",
              detail: "获取参考系列表",
              icon: "getprojectlist.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取参考系信息",
              file: "getprojectinfo",
              diffcult: "1",
              detail: "获取参考系信息",
              icon: "getprojectinfo.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "附加地理数据库",
              file: "atachgdb",
              diffcult: "1",
              detail: "附加地理数据库",
              icon: "atachgdb.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "注销地图数据库",
              file: "detachgdb",
              diffcult: "1",
              detail: "注销地图数据库",
              icon: "detachgdb.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "创建地理数据库",
              file: "creategdb",
              diffcult: "1",
              detail: "创建地理数据库",
              icon: "creategdb.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "删除地理数据库",
              file: "deletegdb",
              diffcult: "1",
              detail: "删除地理数据库",
              icon: "deletegdb.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "根据RGB值获取颜色号",
              file: "getclrno",
              diffcult: "1",
              detail: "根据RGB值获取颜色号",
              icon: "getclrno.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "根据颜色号获取颜色RGB值",
              file: "getclrrgb",
              diffcult: "1",
              detail: "根据颜色号获取颜色RGB值",
              icon: "getclrrgb.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取指定瓦片列表",
              file: "gettilelist",
              diffcult: "1",
              detail: "获取指定瓦片列表",
              icon: "gettilelist.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取指定瓦片的详细信息",
              file: "gettileinfo",
              diffcult: "1",
              detail: "获取指定瓦片的详细信息",
              icon: "gettileinfo.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取GDB下简单要素类列表",
              file: "getsfclslist",
              diffcult: "1",
              detail: "获取GDB下简单要素类列表",
              icon: "getsfclslist.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取GDB下注记类列表",
              file: "getaclslist",
              diffcult: "1",
              detail: "获取GDB下注记类列表",
              icon: "getaclslist.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取GDB下对象类列表",
              file: "getoclslist",
              diffcult: "1",
              detail: "获取GDB下对象类列表",
              icon: "getoclslist.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取GDB下网络类列表",
              file: "getnclslist",
              diffcult: "1",
              detail: "获取GDB下网络类列表",
              icon: "getnclslist.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取GDB下栅格数据集类列表",
              file: "getrdslist",
              diffcult: "1",
              detail: "获取GDB下栅格数据集类列表",
              icon: "getrdslist.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取ds下简单要素类列表",
              file: "getdssfclslist",
              diffcult: "1",
              detail: "获取ds下简单要素类列表",
              icon: "getdssfclslist.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取ds下注记类列表",
              file: "getdsaclslist",
              diffcult: "1",
              detail: "获取ds下注记类列表",
              icon: "getdsaclslist.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取ds下对象类列表",
              file: "getdsoclslist",
              diffcult: "1",
              detail: "获取ds下对象类列表",
              icon: "getdsoclslist.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取ds下网络类列表",
              file: "getdsnclslist",
              diffcult: "1",
              detail: "获取ds下网络类列表",
              icon: "getdsnclslist.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取rcs下的栅格数据集",
              file: "getrcslist",
              diffcult: "1",
              detail: "获取rcs下的栅格数据集",
              icon: "getrcslist.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取GDB某类数据列表(删)",
              file: "getfilelist",
              diffcult: "1",
              detail: "获取GDB某类数据列表(删)",
              icon: "getfilelist.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取ds某类数据列表(删)",
              file: "getdsfilelist",
              diffcult: "1",
              detail: "获取ds某类数据列表(删)",
              icon: "getdsfilelist.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取ds下图层详细信息",
              file: "getdslayerinfo",
              diffcult: "1",
              detail: "获取ds下图层详细信息",
              icon: "getdslayerinfo.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "获取GDB下图层详细信息",
              file: "getlayerinfo",
              diffcult: "1",
              detail: "获取GDB下图层详细信息",
              icon: "getlayerinfo.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "添加矢量类数据",
              file: "adddata",
              diffcult: "1",
              detail: "添加矢量类数据",
              icon: "adddata.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "删除矢量类数据",
              file: "deletedata",
              diffcult: "1",
              detail: "删除矢量类数据",
              icon: "deletedata.png",
              update: "最后更新时间：2018-06-01"
            }
          ]
        },
        {
          name: "要素编辑",
          materialicon: "dashboard",
          folder: "featureservice",
          leaffolder: true,
          childs: [
            {
              name: "地图文档要素添加",
              file: "adddocfeature",
              diffcult: "1",
              detail: "地图文档要素添加",
              icon: "adddocfeature.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "地图文档要素删除",
              file: "deletedocfeature",
              diffcult: "1",
              detail: "地图文档要素删除",
              icon: "deletedocfeature.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "地图文档要素更新",
              file: "updatedocfeature",
              diffcult: "1",
              detail: "地图文档要素更新",
              icon: "updatedocfeature.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "矢量图层要素添加",
              file: "addvecfeature",
              diffcult: "1",
              detail: "矢量图层要素添加",
              icon: "addvecfeature.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "矢量图层要素删除",
              file: "deletevecfeature",
              diffcult: "1",
              detail: "矢量图层要素删除",
              icon: "deletevecfeature.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "矢量图层要素更新",
              file: "updatevecfeature",
              diffcult: "1",
              detail: "矢量图层要素更新",
              icon: "updatevecfeature.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "地图文档要素查询",
              file: "querydocfeature",
              diffcult: "1",
              detail: "地图文档要素查询",
              icon: "querydocfeature.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "矢量图层要素查询",
              file: "queryveclayerfeature",
              diffcult: "1",
              detail: "矢量图层要素查询",
              icon: "queryveclayerfeature.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "文档要素查询(json)",
              file: "querydatageojson",
              diffcult: "1",
              detail: "文档要素查询(json)",
              icon: "querydatageojson.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "对象类要素查询",
              file: "objectclassquery",
              diffcult: "1",
              detail: "对象类要素查询",
              icon: "objectclassquery.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "多几何要素查询(多区查询)",
              file: "multitudegeometryquery",
              diffcult: "1",
              detail: "多几何要素查询(多区查询)",
              icon: "multitudegeometryquery.png",
              update: "最后更新时间：2018-06-01"
            }
          ]
        },
        {
          name: "军标绘制",
          materialicon: "dashboard",
          folder: "milstd",
          leaffolder: true,
          childs: [
            {
              name: "军标绘制(箭头)",
              file: "militaryarrow",
              diffcult: "1",
              detail: "绘制箭头",
              icon: "militaryarrow.png",
              update: "最后更新时间：2018-11-16",
              person: "基础平台/产品中心-龚跃健"
            },
            {
              name: "军标绘制(指北针)",
              file: "militarycompass",
              diffcult: "1",
              detail: "绘制指北针",
              icon: "militarycompass.png",
              update: "最后更新时间：2018-11-16",
              person: "基础平台/产品中心-龚跃健"
            },
            {
              name: "军标绘制(旗标)",
              file: "militaryflag",
              diffcult: "1",
              detail: "绘制旗标",
              icon: "militaryflag.png",
              update: "最后更新时间：2018-11-16",
              person: "基础平台/产品中心-龚跃健"
            },
            {
              name: "军标绘制",
              file: "militaryplotting",
              diffcult: "1",
              detail: "绘制箭头、指北针、旗标",
              icon: "militaryplotting.png",
              update: "最后更新时间：2018-11-16",
              person: "基础平台/产品中心-龚跃健"
            }
          ]
        },
        {
          name: "几何分析",
          materialicon: "dashboard",
          folder: "geoanaservice",
          leaffolder: true,
          childs: [
            {
              name: "计算面积",
              file: "areameasure",
              diffcult: "1",
              detail: "计算面积",
              icon: "areameasure.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "计算折线长度",
              file: "lengthmeasure",
              diffcult: "1",
              detail: "计算折线长度",
              icon: "lengthmeasure.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "投影点",
              file: "dotsproject",
              diffcult: "1",
              detail: "投影点",
              icon: "dotsproject.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "投影矩形",
              file: "rectproject",
              diffcult: "1",
              detail: "投影矩形",
              icon: "rectproject.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "光滑线",
              file: "smoothline",
              diffcult: "1",
              detail: "光滑线",
              icon: "smoothline.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "拓扑分析",
              file: "topoanalysist",
              diffcult: "1",
              detail: "拓扑分析",
              icon: "topoanalysist.png",
              update: "最后更新时间：2018-06-01"
            }
          ]
        },
        {
          name: "地图显示",
          materialicon: "dashboard",
          folder: "mapservice",
          leaffolder: true,
          childs: [
            {
              name: "获取地图文档图片URL",
              file: "getdocpicurl",
              diffcult: "1",
              detail: "获取地图文档图片URL",
              icon: "getdocpicurl.png",
              update: "最后更新时间：2018-06-02"
            },
            {
              name: "获取图层图片URL",
              file: "getlayerpicurl",
              diffcult: "1",
              detail: "获取图层图片URL",
              icon: "getlayerpicurl.png",
              update: "最后更新时间：2018-06-02"
            },
            {
              name: "获取瓦片图片URL",
              file: "gettilepicurl",
              diffcult: "1",
              detail: "获取瓦片图片URL",
              icon: "gettilepicurl.png",
              update: "最后更新时间：2018-06-02"
            },
            {
              name: "获取文档图片信息",
              file: "getdocpicinfo",
              diffcult: "1",
              detail: "获取文档图片信息",
              icon: "getdocpicinfo.png",
              update: "最后更新时间：2018-06-02"
            },
            {
              name: "获取瓦片图片信息",
              file: "gettilepicinfo",
              diffcult: "1",
              detail: "获取瓦片图片信息",
              icon: "gettilepicinfo.png",
              update: "最后更新时间：2018-06-02"
            },
            {
              name: "获取瓦片地图图片URL",
              file: "gettilemappicurl",
              diffcult: "1",
              detail: "获取瓦片地图图片URL",
              icon: "gettilemappicurl.png",
              update: "最后更新时间：2018-06-02"
            }
          ]
        }
      ]
    },
    {
      name: "IGServer-X",
      materialicon: "dashboard",
      folder: "igserverx",
      leaffolder: false,
      childs: [
        {
          name: "流图层WebSocket",
          materialicon: "search",
          folder: "socket",
          leaffolder: true,
          childs: [
            {
              name: "中地-出租车跟踪geojson",
              file: "taxi",
              diffcult: "3",
              detail: "针对igserver-x的socket进行通信",
              icon: "taxi.png",
              update: "最后更新时间：2018-11-27,如有问题请咨询创新中心"
            }, {
              name: "中地-出租车跟踪mapv",
              file: "mapv",
              diffcult: "3",
              detail: "使用mapv时无法进行点击事件的交互，该功能用于大数据展示",
              icon: "mapv.png",
              update: "最后更新时间：2018-11-29,如有问题请咨询创新中心"
            }
          ]
        }
      ]
    },
    {
      name: "ArcServer",
      materialicon: "layers",
      folder: "arcserver",
      leaffolder: true,
      childs: [
        {
          name: "arcserver-ogc-4326",
          file: "arcserver_ogc_4326",
          diffcult: "1",
          detail: "http://www.mg.cgs.gov.cn:6080/arcgis/rest/services/",
          icon: "arcserver_ogc_4326.png",
          update: "最后更新时间：2018-10-19"
        }
      ]
    },
    {
      name: "客户端可视化",
      materialicon: "camera",
      folder: "dataview",
      leaffolder: false,
      childs: [
        {
          name: "通用可视化",
          materialicon: "camera",
          folder: "common",
          leaffolder: true,
          childs: [
            {
              name: "MarkerCluster基础",
              file: "cluster_base",
              diffcult: "1",
              detail: "",
              icon: "cluster_base.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "MarkerCluster事件",
              file: "cluster_event",
              diffcult: "2",
              detail: "",
              icon: "cluster_event.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "MarkerCluster选项",
              file: "cluster_option",
              diffcult: "1",
              detail: "",
              icon: "cluster_option.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "热力图",
              file: "heat",
              diffcult: "1",
              detail: "leaflet的一个小巧，简单且快速的热力图插件。",
              icon: "heat.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "蚂蚁线",
              file: "antpath",
              diffcult: "1",
              detail: "leaflet的蚂蚁线，可以显示移动的方向。",
              icon: "antpath.png",
              update: "最后更新时间：2018-06-02"
            },
            {
              name: "leaflet的迁移图",
              file: "migrate",
              diffcult: "1",
              detail: "leaflet的迁移图显示。",
              icon: "migrate.png",
              update: "最后更新时间：2018-06-02"
            },
            {
              name: "leaflet注记移动动画",
              file: "animatemarker",
              diffcult: "1",
              detail: "leaflet注记移动动画",
              icon: "animatemarker.png",
              update: "最后更新时间：2018-06-02"
            },
            {
              name: "leaflet真实移动轨迹显示",
              file: "realmovemarker",
              diffcult: "1",
              detail: "leaflet真实移动轨迹显示",
              icon: "realmovemarker.png",
              update: "最后更新时间：2018-06-02"
            },
            {
              name: "简单热力实例",
              file: "heatersimple",
              diffcult: "1",
              detail: "leaflet的简单热力实例。",
              icon: "heatersimple.png",
              update: "最后更新时间：2018-06-02"
            },
            {
              name: "热力图层",
              file: "heatmaplayer",
              diffcult: "1",
              detail: "热力图层，来自于著名的HeatMapJs。",
              icon: "heatmaplayer.png",
              update: "最后更新时间：2018-06-02"
            },
            {
              name: "热力图层-矢量数据",
              file: "heatmapsimple",
              diffcult: "1",
              detail: "热力图层，来自于著名的HeatMapJs。",
              icon: "heatmapsimple.png",
              update: "最后更新时间：2018-06-02"
            },
            {
              name: "航班动画",
              file: "flightanimation",
              diffcult: "1",
              detail: "航班动画",
              icon: "flightanimation.png",
              update: "最后更新时间：2018-06-02"
            },
            {
              name: "要素动画",
              file: "iconpulse",
              diffcult: "1",
              detail: "要素动画",
              icon: "iconpulse.png",
              update: "最后更新时间：2018-06-02"
            }
          ]
        },
        {
          name: "echarts",
          materialicon: "camera",
          folder: "echarts",
          leaffolder: true,
          childs: [
            {
              name: "微博签到",
              file: "weibo",
              diffcult: "1",
              detail: "百度Echarts点密集图",
              icon: "weibo.png",
              update: "最后更新时间：2018-05-18"
            },
            {
              name: "北京公交路线-渐进绘制",
              file: "line",
              diffcult: "1",
              detail: "百度Echarts北京公交路线图",
              icon: "line.png",
              update: "最后更新时间：2018-05-18"
            },
            {
              name: "北京公交路线-线动画",
              file: "lineanimate",
              diffcult: "1",
              detail: "北京公交路线 - 线特效",
              icon: "lineanimate.png",
              update: "最后更新时间：2018-05-17"
            },
            {
              name: "空气质量-点动画",
              file: "point",
              diffcult: "1",
              detail: "百度全国主要城市空气质量",
              icon: "point.png",
              update: "最后更新时间：2018-05-17"
            },
            {
              name: "模拟迁徙",
              file: "migarate",
              diffcult: "1",
              detail: "",
              icon: "migarate.gif",
              update: "最后更新时间：2018-07-11"
            },
            {
              name: "全球飞行航线",
              file: "flight",
              diffcult: "1",
              detail: "",
              icon: "flight.png",
              update: "最后更新时间：2018-07-11"
            },
            {
              name: "北京网格专题图",
              file: "grid",
              diffcult: "1",
              detail: "北京网格图",
              icon: "grid.png",
              update: "最后更新时间：2018-07-11"
            },
            {
              name: "纽约-140万点数据",
              file: "bigpoint",
              diffcult: "1",
              detail: "纽约-140万点数据",
              icon: "bigpoint.png",
              update: "最后更新时间：2018-07-11"
            },
            {
              name: "纽约-100万线数据",
              file: "bigline",
              diffcult: "1",
              detail: "纽约-100万线数据",
              icon: "bigline.gif",
              update: "最后更新时间：2018-07-11"
            },
            {
              name: "中国-100万线数据",
              file: "bigroad",
              diffcult: "1",
              detail: "中国-100万线数据",
              icon: "bigroad.png",
              update: "最后更新时间：2018-07-11"
            },
            {
              name: "世界-1000万GPS点数据",
              file: "biggps",
              diffcult: "1",
              data:
                "数据来自：https://blog.openstreetmap.org/2012/04/01/bulk-gps-point-data/",
              detail: "世界-1000万GPS点数据",
              icon: "biggps.png",
              update: "最后更新时间：2018-07-11"
            }
          ]
        },
        {
          name: "Mapv",
          materialicon: "camera",
          folder: "mapv",
          leaffolder: true,
          childs: [
            {
              name: "轨迹汇聚",
              file: "path_converge",
              diffcult: "1",
              detail: "",
              icon: "pathconverge.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "迁移图",
              file: "migrate",
              diffcult: "1",
              detail: "",
              icon: "migrate.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "热力图",
              file: "heater",
              diffcult: "1",
              detail: "",
              icon: "heater.png",
              update: "最后更新时间：2018-07-03"
            },
            {
              name: "区数据渲染",
              file: "render_polygon",
              diffcult: "1",
              detail: "",
              icon: "renderpolygon.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "点数据播放",
              file: "point_animate",
              diffcult: "1",
              detail: "",
              icon: "pointanimate.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "方形网格密度",
              file: "point_grid",
              diffcult: "1",
              detail: "",
              icon: "pointgrid.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "蜂窝形密度",
              file: "point_honeycomb",
              diffcult: "1",
              detail: "",
              icon: "pointhoneycomb.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "点重叠播放",
              file: "point_mutilanimate",
              diffcult: "1",
              detail: "",
              icon: "pointmutilanimate.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "点微博数据",
              file: "point_weibo",
              diffcult: "1",
              detail: "",
              icon: "pointweibo.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "单值颜色线",
              file: "simpleline",
              diffcult: "1",
              detail: "",
              icon: "simpleline.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "多值统计线",
              file: "count_line",
              diffcult: "1",
              detail: "",
              icon: "countline.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "单一迁移轨迹",
              file: "simplemigrate",
              diffcult: "1",
              detail: "",
              icon: "simplemigrate.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "动态轨迹",
              file: "tracker",
              diffcult: "1",
              detail: "",
              icon: "tracker.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "交通轨迹",
              file: "trackerline",
              diffcult: "1",
              detail: "",
              icon: "trackerline.png",
              update: "最后更新时间：2018-05-12"
            }
          ]
        },
        {
          name: "D3-CSS/大数据",
          materialicon: "camera",
          folder: "d3",
          leaffolder: true,
          childs: [
            {
              name: "csv格式-点CSS样式",
              file: "csv",
              diffcult: "2",
              detail: "d3-swiss-cities简单示例针对csv，dsv等格式",
              icon: "csv.png",
              update: "最后更新时间：2018-05-21"
            },
            {
              name: "geojson-属性CSS样式",
              file: "line",
              diffcult: "2",
              detail: "d3-例针对geojson等格式,按照属性分类设置样式",
              icon: "line.png",
              update: "最后更新时间：2018-05-21"
            },
            {
              name: "geojson格式-图层CSS样式",
              file: "geojson",
              diffcult: "2",
              detail: "d3-针对geojson等格式,按照图层，图元分类过滤设置样式",
              icon: "geojson.png",
              update: "最后更新时间：2018-05-21"
            },
            {
              name: "蜂窝密度Hexbin",
              file: "hexbin",
              diffcult: "3",
              detail:
                "d3-hexbin简单示例针对geojson,csv,tsv等格式,数据量大的时候请使用该方式",
              icon: "hexbin.png",
              update: "最后更新时间：2018-05-21，不懂请联系潘卓然"
            },
            {
              name: "统计专题图",
              file: "choropleth",
              diffcult: "3",
              detail:
                "d3专题图示例针对geojson,csv,tsv等格式,数据量大的时候请使用该方式",
              icon: "choropleth.png",
              update: "最后更新时间：2018-05-21，不懂请联系潘卓然"
            },
            {
              name: "统计专题图-随机上色",
              file: "choroplethchina",
              diffcult: "3",
              detail:
                "d3专题图示例针对geojson,csv,tsv等格式,数据量大的时候请使用该方式",
              icon: "choroplethchina.png",
              update: "最后更新时间：2018-05-21，不懂请联系潘卓然"
            },
            {
              name: "边界专题图",
              file: "border",
              diffcult: "3",
              detail:
                "d3边界图示例针对geojson,csv,tsv等格式,数据量大的时候请使用该方式",
              icon: "border.png",
              update: "最后更新时间：2018-05-21，不懂请联系潘卓然"
            },
            {
              name: "动态专题图",
              file: "timer ",
              diffcult: "3",
              detail:
                "d3动态专题图示例针对geojson,csv,tsv等格式,数据量大的时候请使用该方式",
              icon: "timer.png",
              update: "最后更新时间：2018-05-21，不懂请联系潘卓然"
            },
            {
              name: "动态专题图-海啸",
              file: "tsunami",
              diffcult: "3",
              detail:
                "d3动态专题图示例针对geojson,csv,tsv等格式,数据量大的时候请使用该方式",
              icon: "tsunami.gif",
              update: "最后更新时间：2018-05-21，不懂请联系潘卓然"
            },
            {
              name: "拓扑专题图-县邻接",
              file: "chinatopo",
              diffcult: "3",
              detail: "拓扑专题图实现了基本的拓扑邻接关系",
              icon: "chinatopo.gif",
              update: "最后更新时间：2018-05-21，不懂请联系潘卓然"
            },
            {
              name: "交互操作Interactive",
              file: "interactive",
              diffcult: "3",
              detail: "d3-交互操作简单示例，数据量大的时候请使用该方式",
              icon: "interactive.png",
              update: "最后更新时间：2018-05-21，不懂请联系潘卓然"
            },
            {
              name: "拓扑相邻",
              file: "topo",
              diffcult: "3",
              detail: "d3-交互操作简单示例，显示邻接元素",
              icon: "topo.png",
              update: "最后更新时间：2018-06-14，不懂请联系潘卓然"
            },
            {
              name: "直方图",
              file: "histogram",
              diffcult: "1",
              detail: "d3-常规直方图绘制",
              icon: "histogram.png",
              update: "最后更新时间：2018-05-21，不懂请联系潘卓然"
            }
          ]
        }
      ]
    },
    {
      name: "客户端空间分析",
      materialicon: "iso",
      folder: "analysis",
      leaffolder: true,
      childs: [
        {
          name: "缓冲区分析",
          file: "buffer",
          diffcult: "1",
          detail:
            "给定一个缓冲半径进行缓冲区分析. 单位支持 miles 米,kilometers 千米,degrees 度.",
          icon: "buffer.png",
          update: "最后更新时间：2018-05-05"
        },
        {
          name: "泰森多边形分析",
          file: "voronoi",
          diffcult: "2",
          detail: "针对给定的点生成泰森多边形,请注意一定要传入外包矩形bbox参数",
          icon: "voronoi.png",
          update: "最后更新时间：2018-05-05"
        },
        {
          name: "TIN三角网分析",
          file: "tin",
          diffcult: "1",
          detail:
            "TIN方法将无重复点的散乱数据点集按某种规则(如Delaunay 规则) 进行三角剖分，使这些散乱点形成连续但不重叠的不规则三角面片网，并以此来描述3D 物体的表面。",
          icon: "tin.png",
          update: "最后更新时间：2018-05-05"
        },
        {
          name: "中心点提取",
          file: "centroid",
          diffcult: "1",
          detail: "计算给定GeoJSON的数据中心支持所有的GeoJSON类型",
          icon: "centroid.png",
          update: "最后更新时间：2018-05-05"
        },
        {
          name: "插值分析",
          file: "along",
          diffcult: "1",
          detail:
            "线插值操作是通过 计算起点-终点长度,然后再根据长度等分计算需要插值的点,最后再把这些点插入到原始数据中.",
          icon: "along.png",
          update: "最后更新时间：2018-05-05"
        },
        {
          name: "bezierSpline",
          file: "bezierspline",
          diffcult: "1",
          detail: "控制曲线",
          icon: "bezierspline.png",
          update: "最后更新时间：2018-08-31",
          person: "研究院-陈琪"
        },
        {
          name: "intersect",
          file: "intersect",
          diffcult: "1",
          detail: "控制曲线",
          icon: "intersect.png",
          update: "最后更新时间：2018-08-31",
          person: "研究院-陈琪"
        }
      ]
    },
    {
      name: "矢量瓦片",
      materialicon: "layers",
      folder: "vectortile",
      leaffolder: true,
      childs: [
        {
          name: "Mapbox官方矢量瓦片-3857",
          file: "mapbox",
          diffcult: "1",
          detail: "目前只支持墨卡托投影",
          icon: "mapbox.png",
          update: "最后更新时间：2018-05-12"
        },
        {
          name: "MapGIS矢量瓦片-上传样式",
          file: "mapgisstyle",
          diffcult: "1",
          detail: "加载MapGIS-IgServer上传的矢量瓦片样式",
          icon: "mapgisstyle.png",
          update: "最后更新时间：2018-07-25"
        },
        {
          name: "中地数码矢量瓦片-4326",
          file: "mapgis4326",
          diffcult: "1",
          detail: "目前IGserver无法阅览4326的矢量瓦片",
          icon: "mapgis4326.png",
          update: "最后更新时间：2018-06-22"
        },
        {
          name: "DataStore矢量瓦片-3857",
          file: "datastore",
          diffcult: "2",
          detail: "目前只支持墨卡托投影",
          icon: "datastore.png",
          update: "最后更新时间：2018-06-12"
        },
        {
          name: "OpenMapTiles矢量瓦片-3857",
          file: "openmaptile",
          diffcult: "2",
          detail: "目前只支持墨卡托投影",
          icon: "openmaptile.png",
          update: "最后更新时间：2018-05-12"
        },
        {
          name: "行业应用矢量瓦片-3857",
          file: "mapboxplugin",
          diffcult: "2",
          detail: "目前只支持墨卡托投影:EPSG-3857",
          icon: "mapboxplugin.png",
          update: "最后更新时间：2018-07-25"
        }
      ]
    },
    {
      name: "实时数据分析Els",
      materialicon: "search",
      folder: "elasticsearch",
      leaffolder: true,
      childs: [
        {
          name: "中地-时空热力",
          file: "zondyheater",
          diffcult: "2",
          detail:
            "针对els进行的封装api，针对给定空间，时间范围内的数据进行热力显示",
          icon: "zondyheater.png",
          update: "最后更新时间：2018-05-23,如有问题请咨询创新中心"
        },
        {
          name: "中地-时空聚类",
          file: "zondygrid",
          diffcult: "2",
          detail:
            "针对els进行的封装api，针对给定空间，时间范围内的数据进行聚类显示",
          icon: "zondygrid.png",
          update: "最后更新时间：2018-05-23,如有问题请咨询创新中心"
        },
        {
          name: "原生-时空热力",
          file: "elsheater",
          diffcult: "2",
          detail: "els原生查询，针对给定空间，时间范围内的数据进行热力显示",
          icon: "elsheater.png",
          update: "最后更新时间：2018-05-23,如有问题请咨询创新中心"
        },
        {
          name: "原生-时空聚类",
          file: "elsgrid",
          diffcult: "2",
          detail: "els原生查询，针对给定空间，时间范围内的数据进行聚类显示",
          icon: "elsgrid.png",
          update: "最后更新时间：2018-05-23,如有问题请咨询创新中心"
        },
        {
          name: "原生-地理围栏",
          file: "elsgeofence",
          diffcult: "3",
          detail: "els原生查询，针对给定空间时间提供地理围栏服务",
          icon: "elsgeofence.png",
          update: "最后更新时间：2018-05-23,如有问题请咨询创新中心"
        },
        {
          name: "原生-轨迹时间排序",
          file: "elstrackersort",
          diffcult: "2",
          detail: "els原生查询，针对给定空间时间提供运行轨迹时间排序服务",
          icon: "elstrackersort.png",
          update: "最后更新时间：2018-05-23,如有问题请咨询创新中心"
        },
        {
          name: "原生-轨迹Id排序",
          file: "elstrackerid",
          diffcult: "2",
          detail: "els原生查询，针对给定空间时间提供运行轨迹id排序服务",
          icon: "elstrackerid.png",
          update: "最后更新时间：2018-05-23,如有问题请咨询创新中心"
        },
        {
          name: "原生-轨迹范围Range排序",
          file: "elstrackerrange",
          diffcult: "2",
          detail: "els原生查询，针对给定空间时间提供运行轨迹id排序服务",
          icon: "elstrackerrange.png",
          update: "最后更新时间：2018-05-23,如有问题请咨询创新中心"
        }
      ]
    },
    {
      name: "官方教程",
      materialicon: "work",
      folder: "office",
      leaffolder: false,
      childs: [
        {
          name: "官方教程",
          materialicon: "work",
          folder: "tutorials",
          leaffolder: true,
          childs: [
            {
              name: "leaflet快速上手指导",
              file: "quickstart",
              diffcult: "1",
              detail:
                "此教程指导你快速开始leaflet的基础开发，包括设置一个leaflet地图、新建一个标志点、绘制线、弹出框以及事件处理。",
              icon: "quickstart.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "移动端leaflet",
              file: "mobile_leaflet",
              diffcult: "1",
              detail:
                "创建一个全屏地图，从而在移动设备中使用，例如iPhone、iPad或者Android手机。同时也将获得和使用用户当前的地理位置。",
              icon: "mobile_leaflet.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "自定义图标标记",
              file: "custom_icons",
              diffcult: "1",
              detail: "使用自定义的图标作为地图上的标注点。",
              icon: "custom_icons.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "使用GeoJSON",
              file: "geojson_leaflet",
              diffcult: "1",
              detail: "使用GeoJSON创建一个矢量图层，并与该图层进行交互",
              icon: "geojson_leaflet.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "交互式分级统计地图",
              file: "choropleth_map",
              diffcult: "2",
              detail:
                "创建一个色彩丰富可交互的分级统计地图，数据使用美国人口密度图（GeoJSON格式），并在网页中使用了一些自定义的地图控件。",
              icon: "choropleth_map.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "图层分组和图层控制",
              file: "groups_control",
              diffcult: "1",
              detail:
                "管理地图图层，并且使用图层切换控件轻松的切换地图上的不同图层。",
              icon: "groups_control.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "缩放级别",
              file: "zoom_levels",
              diffcult: "1",
              detail: "深入地了解缩放级别。",
              icon: "zoom_levels.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "非地理地图",
              file: "non_geographical_maps",
              diffcult: "1",
              detail:
                "主要是使用L.CRS.Simple，讲解在没有经纬度的概念下如何构建地图。",
              icon: "non_geographical_maps.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "WMS和TMS",
              file: "wms_tms",
              diffcult: "1",
              detail: "从专业地理信息系统中整合WMS和TMS服务。",
              icon: "wms_tms.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "使用地图分层",
              file: "map_panes",
              diffcult: "1",
              detail:
                "主要讲解如何使默认的地图分层显示在瓦片图层的顶部，并且如何覆盖它。",
              icon: "map_panes.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "视频展示",
              file: "show_video",
              diffcult: "1",
              detail: "leaflet可以帮助您在地图上的某个地方显示视频播放。",
              icon: "show_video.png",
              update: "最后更新时间：2018-05-12"
            }
          ]
        },
        {
          name: "官方插件",
          materialicon: "work",
          folder: "plugins",
          leaffolder: true,
          childs: [
            {
              name: "leaflet.Draw",
              file: "draw",
              diffcult: "2",
              detail: "leaflet的矢量绘图和编辑插件。",
              icon: "draw.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "leaflet.FullScreen",
              file: "fullscreen",
              diffcult: "1",
              detail: "leaflet的HTML5全屏插件。",
              icon: "fullscreen.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "leaflet.Graticule",
              file: "graticule",
              diffcult: "1",
              detail:
                "创建一个Canvas作为ImageOverlay来绘制经纬刻度，并在地图的边缘显示网格标记。",
              icon: "graticule.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "leaflet.Editable",
              file: "editable",
              diffcult: "1",
              detail:
                "一个很小，轻量且可完全扩展的API，用于控制几何图形的编辑。",
              icon: "editable.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "leaflet.Toolbar",
              file: "toolbar",
              diffcult: "1",
              detail: "用于leaflet地图灵活，可扩展的工具栏。",
              icon: "toolbar.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "PathDrag",
              file: "path_drag",
              diffcult: "1",
              detail: "将拖拽功能添加到leaflet路径。",
              icon: "path_drag.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "字形标记",
              file: "icon_glyph",
              diffcult: "1",
              detail: "将图标字体中的字形添加到您的leafletJS标记中。",
              icon: "icon_glyph.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "leaflet.VectorGrid",
              file: "vectorgrid",
              diffcult: "1",
              detail: "在leaflet上显示格网矢量数据。",
              icon: "vectorgrid.png",
              update: "最后更新时间：2018-05-12"
            }
          ]
        }
      ]
    }
  ]
};
