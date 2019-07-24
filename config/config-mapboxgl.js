var MAPBOXGL_CONFIG = config = {
  name: "",
  title: "MapGIS WebClinet-MapboxGL演示网站",
  mapmode: "mapbox",
  childs: [
    {
      name: "中国2000坐标",
      materialicon: "map",
      folder: "crs",
      leaffolder: true,
      childs: [{
        name: "2000坐标系-栅格影像",
        file: "4326_raster_img",
        diffcult: "1",
        detail: "2000坐标系-栅格影像",
        icon: "4326_raster_img.png",
        update: "最后更新时间：2019-01-16"
      },
      {
        name: "2000坐标系-栅格矢量",
        file: "4326_raster_vec",
        diffcult: "1",
        detail: "2000坐标系-栅格矢量",
        icon: "4326_raster_vec.png",
        update: "最后更新时间：2019-01-16"
      },
      {
        name: "2000坐标系-栅格地形",
        file: "4326_raster_ter",
        diffcult: "1",
        detail: "2000坐标系-栅格地形",
        icon: "4326_raster_ter.png",
        update: "最后更新时间：2019-01-16"
      }, {
        name: "2000坐标系-矢量瓦片",
        file: "4326_vector",
        diffcult: "1",
        detail: "2000坐标系-矢量瓦片",
        icon: "4326_vector.png",
        update: "最后更新时间：2019-01-16"
      }]
    },
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
          folder: "control",
          leaffolder: true,
          childs: [
            {
              name: "导航栏控件",
              file: "navigation",
              diffcult: "1",
              detail: "基本的导航栏控件.",
              icon: "navigation.png",
              update: "最后更新时间：2018-06-04"
            },
            {
              name: "比例尺控件",
              file: "scaleLine",
              diffcult: "1",
              detail: "基本的比例尺控件.",
              icon: "scaleline.png",
              update: "最后更新时间：2018-06-04"
            },
            {
              name: "鼠标位置控件",
              file: "mouseposition",
              diffcult: "1",
              detail: "基本的鼠标位置控件.",
              icon: "mouseposition.png",
              update: "最后更新时间：2018-06-04"
            },
            {
              name: "图层控制控件",
              file: "layercontrol",
              diffcult: "1",
              detail: "基本的图层控制控件.",
              icon: "layercontrol.png",
              update: "最后更新时间：2018-06-04"
            },
            {
              name: "卷帘控件",
              file: "layercompare",
              diffcult: "1",
              detail: "基本的卷帘控件.",
              icon: "layercompare.png",
              update: "最后更新时间：2018-06-04"
            },
            {
              name: "Popup弹出框",
              file: "addpopup",
              diffcult: "1",
              detail: "测试基本的Popup弹出框",
              icon: "addpopup.png",
              update: "最后更新时间：2018-06-06"
            },
            {
              name: "全屏控件",
              file: "fullscreen",
              diffcult: "1",
              detail: "测试基本的全屏功能",
              icon: "fullscreen.png",
              update: "最后更新时间：2018-06-13"
            } /* ,
            {
              name: "鹰眼控件",
              file: "minimap",
              diffcult: "1",
              detail: "测试基本的鹰眼控件功能",
              icon: "minimap.png",
              update: "最后更新时间：2018-12-18"
            } */
          ]
        },
        {
          name: "地图操作",
          detail: "基本的地图操作功能，主要是当前视窗坐标计算和图层控制",
          materialicon: "map",
          folder: "operation",
          leaffolder: true,
          childs: [
            {
              name: "Canvas画布操作",
              file: "canvas",
              diffcult: "1",
              detail: "",
              icon: "canvas.png",
              update: "最后更新时间：2018-06-13"
            },
            {
              name: "背景图Background",
              file: "setbackground",
              diffcult: "1",
              detail: "",
              icon: "setbackground.png",
              update: "最后更新时间：2018-06-13"
            },
            {
              name: "位置Location",
              file: "location",
              diffcult: "1",
              detail: "",
              icon: "location.png",
              update: "最后更新时间：2018-06-13"
            },
            {
              name: "视图缩放viewzoom",
              file: "viewzoom",
              diffcult: "1",
              detail: "",
              icon: "viewzoom.png",
              update: "最后更新时间：2018-06-13"
            },
            {
              name: "地图域当前信息",
              file: "information",
              diffcult: "1",
              detail: "",
              icon: "information.png",
              update: "最后更新时间：2018-06-13"
            },
            {
              name: "导出图片",
              file: "exportpicture",
              diffcult: "1",
              detail: "",
              icon: "exportpicture.png",
              update: "最后更新时间：2018-06-13"
            },
            {
              name: "导出PDF",
              file: "exportpdf",
              diffcult: "1",
              detail: "",
              icon: "exportpdf.png",
              update: "最后更新时间：2018-06-13"
            },
            {
              name: "地图单击事件",
              file: "clickevent",
              diffcult: "1",
              detail: "",
              icon: "clickevent.png",
              update: "最后更新时间：2018-06-13"
            },
            /* {
                                name: "图层探查",
                                file: "exploration",
                                diffcult: "1",
                                detail: "",
                                icon: "exploration.png",
                                update: "最后更新时间：2018-06-13"
                              }, */
            {
              name: "图层级别控制",
              file: "indexctrl",
              diffcult: "1",
              detail: "",
              icon: "indexctrl.png",
              update: "最后更新时间：2018-06-13"
            },
            {
              name: "图层组控制（调节透明度）",
              file: "layergroupcontrol",
              diffcult: "1",
              detail: "",
              icon: "layergroupcontrol.png",
              update: "最后更新时间：2018-06-13"
            },
            {
              name: "图层探查",
              file: "layersearch",
              diffcult: "3",
              detail: "",
              icon: "layersearch.png",
              update: "最后更新时间：2018-06-13"
            },
            {
              name: "地图整饰",
              file: "customprint",
              diffcult: "3",
              detail: "地图整饰打印输出",
              icon: "customprint.png",
              person: "基础平台/创新中心-潘卓然",
              effect: "如果需要经纬度网格，请调用igserver服务",
              update: "最后更新时间：2018-12-27"
            }
          ]
        },
        {
          name: "地图测量",
          detail: "基本的地图事件，注意map.on('event', function(){})的事件机制",
          materialicon: "map",
          folder: "measurement",
          leaffolder: true,
          childs: [
            {
              name: "测量距离",
              file: "measureline",
              diffcult: "1",
              detail: "测量距离",
              icon: "measureline.png",
              update: "最后更新时间：2018-06-06"
            },
            {
              name: "测量面积",
              file: "measurearea",
              diffcult: "1",
              detail: "测量面积",
              icon: "measurearea.png",
              update: "最后更新时间：2018-06-06"
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
              name: "边界标注",
              file: "addBox",
              diffcult: "1",
              detail: "测试基本的边界标注",
              icon: "addBox.png",
              update: "最后更新时间：2019-07-23",
              person: "基础平台-创新中心-潘卓然"
            },
            {
              name: "图片标注",
              file: "addpicture",
              diffcult: "1",
              detail: "测试基本的图片标注",
              icon: "addpicture.png",
              update: "最后更新时间：2018-06-06",
              person: "基础平台-创新中心-潘卓然"
            },
            {
              name: "文字标注",
              file: "addtext",
              diffcult: "1",
              detail: "测试基本的文字标注",
              icon: "addtext.png",
              update: "最后更新时间：2018-06-06",
              person: "基础平台-创新中心-潘卓然"
            },
            {
              name: "图文标注",
              file: "addtextandpic",
              diffcult: "1",
              detail: "测试基本的图文标注",
              icon: "addtextandpic.png",
              update: "最后更新时间：2018-06-06",
              person: "基础平台-创新中心-潘卓然"
            },
            {
              name: "图片标注-样式实现",
              file: "addpicturesymbol",
              diffcult: "2",
              detail: "测试基本的图片标注",
              icon: "addpicturesymbol.png",
              update: "最后更新时间：2018-06-06",
              person: "基础平台-创新中心-潘卓然"
            },
            {
              name: "文字标注-样式实现",
              file: "addtextsymbol",
              diffcult: "2",
              detail: "测试基本的文字标注",
              icon: "addtextsymbol.png",
              update: "最后更新时间：2018-06-06",
              person: "基础平台-创新中心-潘卓然"
            },
            {
              name: "图文标注-样式实现",
              file: "addtextandpicsymbol",
              diffcult: "2",
              detail: "测试基本的图文标注",
              icon: "addtextandpicsymbol.png",
              update: "最后更新时间：2018-06-06",
              person: "基础平台-创新中心-潘卓然"
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
              name: "osm-3857",
              file: "osm",
              diffcult: "1",
              detail: "",
              icon: "osm.png",
              update: "最后更新时间：2018-06-05"
            },
            {
              name: "tianditu-3857",
              file: "tianditu",
              diffcult: "1",
              detail: "",
              icon: "tianditu.png",
              update: "最后更新时间：2018-06-05"
            },
            {
              name: "google-3857",
              file: "google",
              diffcult: "1",
              detail: "",
              icon: "google.png",
              update: "最后更新时间：2018-06-05"
            },
            {
              name: "kml",
              file: "kml",
              diffcult: "1",
              detail: "",
              icon: "kml.png",
              update: "最后更新时间：2018-06-05"
            },
            {
              name: "geojson",
              file: "geojson",
              diffcult: "1",
              detail: "",
              icon: "geojson.png",
              update: "最后更新时间：2018-06-05"
            },
            {
              name: "arcgis-3857",
              file: "arcgis",
              diffcult: "1",
              detail: "",
              icon: "arcgis.png",
              update: "最后更新时间：2018-06-05"
            },
            {
              name: "gpx",
              file: "gpx",
              diffcult: "1",
              detail: "",
              icon: "gpx.png",
              update: "最后更新时间：2018-06-05"
            },
            {
              name: "MapBox地图-3857",
              file: "mapbox",
              diffcult: "1",
              detail:
                "包含Mapbox提供的各式各样的炫彩地图，请注意需要key的！！。",
              icon: "mapbox.png",
              update: "最后更新时间：2018-06-05"
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
          name: "样式库与字体库",
          materialicon: "bubble_chart",
          folder: "sprite",
          leaffolder: true,
          childs: [
            {
              name: "MapboxGL样式库",
              file: "mapbox",
              diffcult: "1",
              detail: "",
              icon: "mapbox.png",
              update: "最后更新时间：2018-06-07"
            },
            {
              name: "MapGIS样式库",
              file: "mapgis",
              diffcult: "1",
              detail: "",
              icon: "mapgis.png",
              update: "最后更新时间：2018-06-07"
            }
          ]
        },
        {
          name: "内置几何Object",
          materialicon: "bubble_chart",
          folder: "graphic",
          leaffolder: true,
          childs: [
            {
              name: "点Circle",
              file: "circle",
              diffcult: "1",
              detail: "",
              icon: "circle.png",
              update: "最后更新时间：2018-06-07"
            },
            {
              name: "线Line",
              file: "line",
              diffcult: "1",
              detail: "",
              icon: "line.png",
              update: "最后更新时间：2018-06-07"
            },
            {
              name: "面Fill",
              file: "fill",
              diffcult: "1",
              detail: "",
              icon: "fill.png",
              update: "最后更新时间：2018-06-07"
            },
            {
              name: "面立体Fill-Extrusion",
              file: "fillextrusion",
              diffcult: "1",
              detail: "",
              icon: "fillextrusion.png",
              update: "最后更新时间：2018-06-07"
            },
            {
              name: "注记-Symbol",
              file: "symbol",
              diffcult: "1",
              detail: "",
              icon: "symbol.png",
              update: "最后更新时间：2018-06-07"
            },
            {
              name: "背景-Background",
              file: "background",
              diffcult: "1",
              detail: "",
              icon: "background.png",
              update: "最后更新时间：2018-06-07"
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
              mardown: "E01GeoPoint.md",
              update: "最后更新时间：2018-05-10"
            },
            {
              name: "Line",
              file: "line",
              diffcult: "1",
              detail: "将地理位置的坐标数组(二维)以geojson格式加载进leaflet。",
              icon: "line.png",
              mardown: "E01GeoPoint.md",
              update: "最后更新时间：2018-05-10"
            },
            {
              name: "Polygon",
              file: "polygon",
              diffcult: "1",
              detail:
                "一个环形坐标数组的数组(三维)以geojson格式加载进leaflet。针对“带洞区”，最好采取外圈顺时针，内圈逆时针的方式",
              icon: "polygon.png",
              mardown: "E01GeoPoint.md",
              update: "最后更新时间：2018-05-10"
            },
            {
              name: "MultiPoint",
              file: "multipoint",
              diffcult: "1",
              detail: "将位置坐标组成二维数组以geojson格式加载进leafelt中。",
              icon: "multipoint.png",
              mardown: "E01GeoPoint.md",
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
        },
        {
          name: "WebGL",
          materialicon: "bubble_chart",
          folder: "webgl",
          leaffolder: true,
          childs: [
            {
              name: "基本绘制",
              file: "base",
              diffcult: "1",
              detail: "通过webgl直接绘制的方式，基本绘制",
              icon: "base.png",
              update: "最后更新时间：2018-01-08"
            },
            {
              name: "平移绘制",
              file: "move",
              diffcult: "1",
              detail: "通过webgl直接绘制的方式，平移绘制",
              icon: "move.png",
              update: "最后更新时间：2018-01-08"
            },
            {
              name: "旋转绘制",
              file: "rotate",
              diffcult: "1",
              detail: "通过webgl直接绘制的方式，旋转绘制",
              icon: "rotate.png",
              update: "最后更新时间：2018-01-08"
            }
          ]
        }
      ]
    },
    {
      name: "IgServer",
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
              diffcult: "3",
              detail: "更新igserver的专题图信息",
              icon: "updateinfo.png",
              update: "最后更新时间：2018-05-31"
            },
            {
              name: "删除专题图",
              file: "deleteinfo",
              diffcult: "3",
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
              update: "最后更新时间：2018-06-13"
            },
            {
              name: "网络分析（旧）",
              file: "netanalysistold",
              diffcult: "1",
              detail: "网络分析（旧）",
              icon: "netanalysistold.png",
              update: "最后更新时间：2018-06-13"
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
              update: "最后更新时间：2018-06-13"
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
              name: "获取指定数据源下数据库列表",
              file: "getgdbmanager",
              diffcult: "1",
              detail: "获取指定数据源下数据库列表",
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
              name: "地图文档要素添加点",
              file: "adddocfeaturepoint",
              diffcult: "1",
              detail: "地图文档要素添加点",
              icon: "adddocfeaturepoint.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "地图文档要素添加线",
              file: "adddocfeatureline",
              diffcult: "1",
              detail: "地图文档要素添加线",
              icon: "adddocfeatureline.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "地图文档要素添加区",
              file: "adddocfeaturepolygon",
              diffcult: "1",
              detail: "地图文档要素添加区",
              icon: "adddocfeaturepolygon.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "地图文档要素删除点",
              file: "deletedocfeaturepoint",
              diffcult: "1",
              detail: "地图文档要素删除点",
              icon: "deletedocfeaturepoint.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "地图文档要素删除线",
              file: "deletedocfeatureline",
              diffcult: "1",
              detail: "地图文档要素删除线",
              icon: "deletedocfeatureline.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "地图文档要素删除区",
              file: "deletedocfeaturepolygon",
              diffcult: "1",
              detail: "地图文档要素删除区",
              icon: "deletedocfeaturepolygon.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "地图文档要素更新点",
              file: "updatedocfeaturepoint",
              diffcult: "1",
              detail: "地图文档要素更新点",
              icon: "updatedocfeaturepoint.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "地图文档要素更新线",
              file: "updatedocfeatureline",
              diffcult: "1",
              detail: "地图文档要素更新线",
              icon: "updatedocfeatureline.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "地图文档要素更新区",
              file: "updatedocfeaturepolygon",
              diffcult: "1",
              detail: "地图文档要素更新区",
              icon: "updatedocfeaturepolygon.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "矢量图层要素添加点",
              file: "addvecfeaturepoint",
              diffcult: "1",
              detail: "矢量图层要素添加点",
              icon: "addvecfeaturepoint.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "矢量图层要素添加线",
              file: "addvecfeatureline",
              diffcult: "1",
              detail: "矢量图层要素添加线",
              icon: "addvecfeatureline.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "矢量图层要素添加区",
              file: "addvecfeaturepolygon",
              diffcult: "1",
              detail: "矢量图层要素添加区",
              icon: "addvecfeaturepolygon.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "矢量图层要素删除点",
              file: "deletevecfeaturepoint",
              diffcult: "1",
              detail: "矢量图层要素删除点",
              icon: "deletevecfeaturepoint.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "矢量图层要素删除线",
              file: "deletevecfeatureline",
              diffcult: "1",
              detail: "矢量图层要素删除线",
              icon: "deletevecfeatureline.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "矢量图层要素删除区",
              file: "deletevecfeaturepolygon",
              diffcult: "1",
              detail: "矢量图层要素删除区",
              icon: "deletevecfeaturepolygon.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "矢量图层要素更新点",
              file: "updatevecfeaturepoint",
              diffcult: "1",
              detail: "矢量图层要素更新点",
              icon: "updatevecfeaturepoint.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "矢量图层要素更新线",
              file: "updatevecfeatureline",
              diffcult: "1",
              detail: "矢量图层要素更新线",
              icon: "updatevecfeatureline.png",
              update: "最后更新时间：2018-06-01"
            },
            {
              name: "矢量图层要素更新区",
              file: "updatevecfeaturepolygon",
              diffcult: "1",
              detail: "矢量图层要素更新区",
              icon: "updatevecfeaturepolygon.png",
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
              name: "多几何要素查询（多区查询）",
              file: "multitudegeometryquery",
              diffcult: "1",
              detail: "多几何要素查询（多区查询）",
              icon: "multitudegeometryquery.png",
              update: "最后更新时间：2018-06-01"
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
              name: "要素移动",
              file: "featuremove",
              diffcult: "1",
              detail: "要素移动",
              icon: "featuremove.png",
              update: "最后更新时间：2018-06-13"
            },
            {
              name: "要素动画",
              file: "featureanimation",
              diffcult: "1",
              detail: "要素动画",
              icon: "featureanimation.png",
              update: "最后更新时间：2018-06-13"
            },
            {
              name: "立方体",
              file: "columnar",
              diffcult: "1",
              detail: "绘制时空立方体",
              icon: "columnar.png",
              update: "最后更新时间：2018-06-13"
            }
          ]
        },
        {
          name: "Echarts",
          materialicon: "camera",
          folder: "echarts",
          leaffolder: true,
          childs: [
            {
              name: "中国微博签到图",
              file: "weibo",
              diffcult: "1",
              detail: "",
              icon: "weibo.png",
              update: "最后更新时间：2018-07-11"
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
              name: "全国主要城市空气质量",
              file: "air",
              diffcult: "1",
              detail: "",
              icon: "air.png",
              update: "最后更新时间：2018-07-11"
            },
            {
              name: "北京公交路线-渐进绘制",
              file: "line",
              diffcult: "1",
              detail: "百度Echarts北京公交路线图",
              icon: "line.png",
              update: "最后更新时间：2018-07-11"
            },
            {
              name: "北京公交路线-线动画",
              file: "lineanimate",
              diffcult: "1",
              detail: "北京公交路线-线特效",
              icon: "lineanimate.gif",
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
            /* {
                        name: "北京-100万线数据",
                        file: "biglinebeijing",
                        diffcult: "1",
                        detail: "纽约-100万线数据",
                        icon: "bigline.gif",
                        update: "最后更新时间：2018-07-11"
                    }, */ {
              name: "中国-160万线数据",
              file: "bigroad",
              diffcult: "1",
              detail: "纽约-100万线数据",
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
              icon: "path_converge.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "热力图",
              file: "heater",
              diffcult: "1",
              detail: "",
              icon: "heater.png",
              update: "最后更新时间：2018-07-4"
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
              name: "区数据渲染",
              file: "render_polygon",
              diffcult: "1",
              detail: "",
              icon: "render_polygon.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "点数据播放",
              file: "point_animate",
              diffcult: "1",
              detail: "",
              icon: "point_animate.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "方形网格密度",
              file: "point_grid",
              diffcult: "1",
              detail: "",
              icon: "point_grid.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "蜂窝形密度",
              file: "point_honeycomb",
              diffcult: "1",
              detail: "",
              icon: "point_honeycomb.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "点重叠播放",
              file: "point_mutilanimate",
              diffcult: "1",
              detail: "",
              icon: "point_mutilanimate.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "点微博数据",
              file: "point_weibo",
              diffcult: "1",
              detail: "",
              icon: "point_weibo.png",
              update: "最后更新时间：2018-05-12"
            },
            {
              name: "多值统计线",
              file: "countline",
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
          name: "Echarts Gl",
          materialicon: "camera",
          folder: "echartsgl",
          leaffolder: true,
          childs: [
            {
              name: "开普敦出租车",
              file: "capton",
              diffcult: "1",
              detail: "针对出租车轨迹与建筑进行动态显示",
              icon: "capton.png",
              update: "最后更新时间：2018-05-24"
            },
            {
              name: "伦敦飞机航线",
              file: "flight",
              diffcult: "1",
              detail: "针对Uber的数据进行的飞行航线的可视化",
              icon: "flight.png",
              update: "最后更新时间：2018-05-24"
            },
            {
              name: "上海房价图",
              file: "shanghai",
              diffcult: "1",
              detail: "针对上海的房价进行统计图可视化",
              icon: "shanghai.png",
              update: "最后更新时间：2018-05-24"
            },
            {
              name: "全国微博签到图",
              file: "weibo",
              diffcult: "1",
              detail: "针对全国微博数据的签到可视化",
              icon: "weibo.png",
              update: "最后更新时间：2018-05-24"
            },
            {
              name: "彩色建筑图",
              file: "buildings",
              diffcult: "1",
              detail: "针对建筑模型的彩色可视化",
              icon: "buildings.png",
              update: "最后更新时间：2018-05-24"
            },
            {
              name: "纽约公交夜景",
              file: "newyork",
              diffcult: "1",
              detail: "针对纽约公交夜景的彩色可视化",
              icon: "newyork.png",
              update: "最后更新时间：2018-06-21"
            },
            {
              name: "北京公交夜景",
              file: "beijing",
              diffcult: "1",
              detail: "针对北京公交夜景的彩色可视化",
              icon: "beijing.png",
              update: "最后更新时间：2018-06-27"
            },
            {
              name: "世界航线",
              file: "lines",
              diffcult: "1",
              detail: "针对世界航线的彩色可视化",
              icon: "lines.png",
              update: "最后更新时间：2018-07-06"
            }
            /* , {
                                                name: "世界航线3d",
                                                file: "lines3d",
                                                diffcult: "1",
                                                detail: "针对世界航线的3d彩色可视化",
                                                icon: "lines3d.png",
                                                update: "最后更新时间：2018-07-06"
                                            } */
          ]
        },
        {
          name: "ThreeBox",
          materialicon: "camera",
          folder: "threebox",
          leaffolder: true,
          childs: [
            {
              name: "基本绘制",
              file: "basic",
              diffcult: "1",
              detail: "",
              icon: "basic.png",
              update: "最后更新时间：2018-12-18"
            },
            {
              name: "方块模型动画",
              file: "cube",
              diffcult: "1",
              detail: "",
              icon: "cube.png",
              update: "最后更新时间：2018-12-18"
            },
            {
              name: "加载3d模型",
              file: "model",
              diffcult: "1",
              detail: "",
              icon: "model.png",
              update: "最后更新时间：2018-12-18"
            },
            {
              name: "点击移动",
              file: "move",
              diffcult: "1",
              detail: "",
              icon: "move.png",
              update: "最后更新时间：2018-12-18"
            },
            {
              name: "方向",
              file: "orientation",
              diffcult: "1",
              detail: "",
              icon: "orientation.png",
              update: "最后更新时间：2018-12-18"
            },
            {
              name: "鼠标选中状态",
              file: "raycaster",
              diffcult: "1",
              detail: "",
              icon: "raycaster.png",
              update: "最后更新时间：2018-12-18"
            }
          ]
        }
        /* , {
                                    name: "KeplerGl",
                                    materialicon: "map",
                                    folder: "keplergl",
                                    leaffolder: true,
                                    childs: [{
                                        name: "纽约道路",
                                        file: "newyorkload",
                                        diffcult: "1",
                                        detail: "针对纽约的夜景和道路进行动态显示",
                                        icon: "newyorkload.png",
                                        update: "最后更新时间：2018-07-09"
                                    }]
                                } */
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
          name: "MapGIS矢量瓦片-上传样式",
          file: "mapgisstyle",
          diffcult: "1",
          detail: "加载MapGIS-IgServer上传的矢量瓦片样式",
          icon: "mapgisstyle.png",
          update: "最后更新时间：2018-06-12"
        },
        {
          name: "MapGIS矢量瓦片-默认样式",
          file: "mapgisvt",
          diffcult: "1",
          detail: "加载MapGIS-IgServer发布的矢量瓦片服务",
          icon: "mapgisvt.png",
          update: "最后更新时间：2018-06-12"
        },
        {
          name: "MapGIS矢量瓦片-马卡龙样式",
          file: "mapgisvt1",
          diffcult: "1",
          detail: "加载MapGIS-IgServer发布的矢量瓦片服务",
          icon: "mapgisvt1.png",
          update: "最后更新时间：2018-06-12"
        },
        {
          name: "MapGIS矢量瓦片-青翠样式",
          file: "mapgisvt2",
          diffcult: "1",
          detail: "加载MapGIS-IgServer发布的矢量瓦片服务",
          icon: "mapgisvt2.png",
          update: "最后更新时间：2018-06-12"
        },
        {
          name: "MapGIS矢量瓦片-粉黛样式",
          file: "mapgisvt3",
          diffcult: "1",
          detail: "加载MapGIS-IgServer发布的矢量瓦片服务",
          icon: "mapgisvt3.png",
          update: "最后更新时间：2018-06-12"
        },
        {
          name: "加载第三方图层",
          file: "othervt",
          diffcult: "1",
          detail: "",
          icon: "othervt.png",
          update: "最后更新时间：2018-06-12"
        },
        {
          name: "加载DataStore实时出图",
          file: "datastore",
          diffcult: "1",
          detail: "",
          icon: "datastore.png",
          update: "最后更新时间：2018-06-12"
        },
        {
          name: "行业符号vs栅格瓦片",
          file: "vsraster",
          diffcult: "1",
          detail: "",
          icon: "vsraster.png",
          update: "最后更新时间：2018-09-04"
        },
        {
          name: "拓扑关系vs无拓扑关系",
          file: "topo",
          diffcult: "1",
          detail: "",
          icon: "topo.bmp",
          update: "最后更新时间：2018-10-19"
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
          name: "Els-时空热力",
          file: "elsheater",
          diffcult: "2",
          detail:
            "针对els进行的封装api，针对给定空间，时间范围内的数据进行热力显示",
          icon: "elsheater.gif",
          update: "最后更新时间：2018-06-27,如有问题请咨询创新中心"
        },
        {
          name: "Els-时空聚类",
          file: "elsgrid",
          diffcult: "2",
          detail:
            "针对els进行的封装api，针对给定空间，时间范围内的数据进行聚类显示",
          icon: "elsgrid.gif",
          update: "最后更新时间：2018-06-27,如有问题请咨询创新中心"
        },
        {
          name: "Els-时空趋势",
          file: "elstrader",
          diffcult: "2",
          detail:
            "针对els进行的封装api，针对给定空间，时间范围内的数据进行聚类显示",
          icon: "elstrader.gif",
          update: "最后更新时间：2018-06-27,如有问题请咨询创新中心"
        },
        {
          name: "Els-时空立方",
          file: "elscube",
          diffcult: "2",
          detail:
            "针对els进行的封装api，针对给定空间，时间范围内的数据进行聚类显示",
          icon: "elscube.png",
          update: "最后更新时间：2018-06-27,如有问题请咨询创新中心"
        },
        {
          name: "北京公交夜景",
          file: "beijing",
          diffcult: "1",
          detail: "针对北京公交夜景的彩色可视化",
          icon: "beijing.png",
          update: "最后更新时间：2018-06-27"
        }
      ]
    },
    {
      name: "军标数据",
      materialicon: "search",
      folder: "military",
      leaffolder: true,
      childs: [
        {
          name: "mapv-方向旋转",
          file: "direction",
          diffcult: "2",
          detail: "采取mapv画布处理旋转操作",
          icon: "direction.png",
          update: "最后更新时间：2018-12-29"
        },
        {
          name: "内置-方向旋转",
          file: "rotate",
          diffcult: "2",
          detail: "采取内置rotate属性，通过映射处理旋转操作",
          icon: "rotate.png",
          update: "最后更新时间：2018-12-29"
        },
        {
          name: "电力线",
          file: "line",
          diffcult: "3",
          detail: "通过webgl直接绘制的方式，显示电力线绘制",
          icon: "line.png",
          update: "最后更新时间：2018-01-02"
        },
        {
          name: "加载地形",
          file: "dem",
          diffcult: "1",
          detail: "通过dem加上内部制图优化的样式实现地形",
          icon: "dem.png",
          update: "最后更新时间：2018-01-12"
        },
        {
          name: "实时计算速度，轨迹",
          file: "speed",
          diffcult: "1",
          detail: "通过实时插值的方式实现计算速度，轨迹",
          icon: "speed.png",
          update: "最后更新时间：2018-01-15"
        },
        {
          name: "在线地图输出",
          file: "print",
          diffcult: "1",
          detail: "地图整饰打印输出",
          icon: "print.png",
          update: "最后更新时间：2019-02-15"
        }
      ]
    }
  ]
};
