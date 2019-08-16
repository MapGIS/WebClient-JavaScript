var CESIUM_CONFIG = config = {
    name: "",
    title: "MapGIS WebClinet-Cesium演示网站",
    mapmode: "cesium",
    childs: [
        {
            name: "地形环境",
            materialicon: "terrain",
            folder: "terrain",
            leaffolder: true,
            childs: [{
                name: "默认地形环境",
                file: "defaultterrain",
                diffcult: "1",
                person:"基础平台-韩彦生",
                detail: "2.5D 3D显示下提供地形效果",
                icon: "defaultterrain.png",
                update: "最后更新时间：2018-05-05"
            }, {
                name: "默认环境光/海洋环境",
                file: "defaultlight",
                diffcult: "1",
                person:"基础平台-韩彦生",
                detail: "默认提供的最基本的光线以及海洋环境效果",
                icon: "defaultlight.png",
                update: "最后更新时间：2018-05-05"
            }, {
                name: "自定义海洋环境",
                file: "customsea",
                diffcult: "1",
                person:"基础平台-韩彦生",
                detail: "通过图片的组合自己实现对应的全球海洋效果",
                icon: "customsea.png",
                update: "最后更新时间：2018-05-05"
            }, {
                name: "自定义贴地线",
                file: "groundline",
                diffcult: "1",
                data:"模拟平台-插值测试数据",
                person:"基础平台-韩彦生",
                effect:"GTX1060M-70万点流畅显示",
                detail: "通过插值的方式再地形数据上增加对应的点，实现贴地线效果",
                icon: "groundline.png",
                update: "最后更新时间：2018-08-20"
            }]
        },
        {
            name: "Igserver",
            materialicon: "dashboard",
            folder: "igserver",
            leaffolder: true,
            childs: [{
                    name: "地图文档",
                    file: "mapdoc",
                    diffcult: "1",
                    detail: "三维场景文档服务(地形，瓦片，模型)",
                    icon: "mapDoc.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-05-05"
                },
                {
                    name: "瓦片服务",
                    file: "tile",
                    diffcult: "1",
                    detail: "显示IGServer发布的瓦片服务",
                    icon: "tile.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-05"
                },
                {
                    name: "文档瓦片服务",
                    file: "mapdoctile",
                    diffcult: "1",
                    detail: "显示IGServer发布的文档瓦片服务",
                    icon: "tile.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-05"
                },
                {
                    name: "WMTS瓦片服务",
                    file: "wmtstile",
                    diffcult: "1",
                    detail: "显示IGServer发布的WMTS瓦片服务",
                    icon: "tile.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-05"
                },
                {
                    name: "地形服务",
                    file: "terrain",
                    diffcult: "1",
                    detail: "显示IGServer发布的三维地形服务",
                    icon: "mapgisTerrain.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-05"
                }
            ]
        },
        {
            name: "地图服务",
            materialicon: "layers",
            folder: "mapprovider",
            leaffolder: true,
            childs: [{
                    name: "百度地图",
                    file: "baidu",
                    diffcult: "1",
                    detail: "",
                    icon: "baidu.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-04"
                },
                {
                    name: "高德地图",
                    file: "gaode",
                    diffcult: "1",
                    detail: "",
                    icon: "gaode.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-04"
                },
                {
                    name: "google地图",
                    file: "google",
                    diffcult: "1",
                    detail: "",
                    icon: "google.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-04"
                },
                {
                    name: "天地图",
                    file: "tianditu",
                    diffcult: "1",
                    detail: "",
                    icon: "tianditu.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-04"
                },
                {
                    name: "天地图WMTS",
                    file: "tiandituwmts",
                    diffcult: "1",
                    detail: "",
                    icon: "tiandituWMTS.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-04"
                },
                {
                    name: "OpenWeather",
                    file: "openweather",
                    diffcult: "1",
                    detail: "",
                    icon: "OpenWeather.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-04"
                }
            ]
        },
        {
            name: "工具",
            materialicon: "crop",
            folder: "tools",
            leaffolder: true,
            childs: [{
                    name: "交互距离测量",
                    file: "measurelengthtool",
                    diffcult: "1",
                    detail: "",
                    icon: "measurelengthtool.gif",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-09"
                },
                {
                    name: "交互面积测量",
                    file: "measureareatool",
                    diffcult: "1",
                    detail: "",
                    icon: "measureareatool.gif",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-09"
                },
                {
                    name: "PopUp",
                    file: "popup",
                    diffcult: "1",
                    detail: "",
                    icon: "popup.gif",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-09"
                },
                {
                    name: "场景输出(图片))",
                    file: "print",
                    diffcult: "1",
                    detail: "",
                    icon: "print.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-09"
                },
                {
                    name: "交互绘制水面",
                    file: "drawwater",
                    diffcult: "1",
                    detail: "",
                    icon: "drawwater.gif",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-09"
                },
                {
                    name: "导航比例尺状态条",
                    file: "navigationtool",
                    diffcult: "1",
                    detail: "",
                    icon: "defaultterrain.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-09"
                }
            ]
        },
        {
            name: "可视化分析",
            materialicon: "adjust",
            folder: "viewanalysis",
            leaffolder: true,
            childs: [{
                    name: "可视域分析",
                    file: "viewshedAn",
                    diffcult: "3",
                    detail: "www.smaryun.com",
                    icon: "viewshedAn.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-09"
                },
                {
                    name: "通视分析",
                    file: "visibiltyAn",
                    diffcult: "3",
                    detail: "",
                    icon: "visibiltyAn.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-09"
                },
                {
                    name: "场景投放颜色",
                    file: "sceneprocolor",
                    diffcult: "3",
                    detail: "",
                    icon: "sceneprocolor.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-09"
                },
                {
                    name: "场景投放图片",
                    file: "sceneproimg",
                    diffcult: "3",
                    detail: "",
                    icon: "sceneproimg.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-09"
                },
                {
                    name: "场景投放视频",
                    file: "sceneprovideo",
                    diffcult: "3",
                    detail: "",
                    icon: "sceneprovideo.png",
                    person: "基础平台-韩彦生",
                    update: "最后更新时间：2018-07-09"
                },

            ]
        },
        {
            name: "客户端可视化",
            materialicon: "camera",
            folder: "dataview",
            leaffolder: false,
            childs: [{
                name: "Echarts",
                materialicon: "camera",
                folder: "echarts",
                leaffolder: true,
                childs: [{
                    name: "中国微博签到图",
                    file: "weibo",
                    diffcult: "1",
                    detail: "",
                    icon: "weibo.png",
                    update: "最后更新时间：2018-07-11"
                }, {
                    name: "模拟迁徙",
                    file: "migarate",
                    diffcult: "1",
                    detail: "",
                    icon: "migarate.gif",
                    update: "最后更新时间：2018-07-11"
                }, {
                    name: "全球飞行航线",
                    file: "flight",
                    diffcult: "1",
                    detail: "",
                    icon: "flight.png",
                    update: "最后更新时间：2018-07-11"
                }, {
                    name: "全国主要城市空气质量",
                    file: "air",
                    diffcult: "1",
                    detail: "",
                    icon: "air.png",
                    update: "最后更新时间：2018-07-11"
                }, {
                    name: "北京公交路线-渐进绘制",
                    file: "line",
                    diffcult: "1",
                    detail: "百度Echarts北京公交路线图",
                    icon: "line.png",
                    update: "最后更新时间：2018-07-11"
                }, {
                    name: "北京公交路线-线动画",
                    file: "lineanimate",
                    diffcult: "1",
                    detail: "北京公交路线-线特效",
                    icon: "lineanimate.gif",
                    update: "最后更新时间：2018-07-11"
                }, {
                    name: "北京网格专题图",
                    file: "grid",
                    diffcult: "1",
                    detail: "北京网格图",
                    icon: "grid.png",
                    update: "最后更新时间：2018-07-11"
                }, {
                    name: "纽约-140万点数据",
                    file: "bigpoint",
                    diffcult: "1",
                    detail: "纽约-140万点数据",
                    icon: "bigpoint.png",
                    update: "最后更新时间：2018-07-11"
                }, {
                    name: "纽约-100万线数据",
                    file: "bigline",
                    diffcult: "1",
                    detail: "纽约-100万线数据",
                    icon: "bigline.gif",
                    update: "最后更新时间：2018-07-11"
                }, {
                    name: "中国-160万线数据",
                    file: "bigroad",
                    diffcult: "1",
                    data: "数据来自：https://blog.openstreetmap.org/2012/04/01/bulk-gps-point-data/",
                    detail: "世界-1000万GPS点数据",
                    icon: "bigroad.png",
                    update: "最后更新时间：2018-07-11"
                }, {
                    name: "世界-1000万GPS点数据",
                    file: "biggps",
                    diffcult: "1",
                    data: "数据来自：https://blog.openstreetmap.org/2012/04/01/bulk-gps-point-data/",
                    detail: "世界-1000万GPS点数据",
                    icon: "biggps.png",
                    update: "最后更新时间：2018-07-11"
                }]
            }, {
                name: "Mapv",
                materialicon: "camera",
                folder: "mapv",
                leaffolder: true,
                childs: [{
                    name: "轨迹汇聚",
                    file: "path_converge",
                    diffcult: "1",
                    detail: "",
                    icon: "path_converge.gif",
                    update: "最后更新时间：2018-07-04"
                }, {
                    name: "迁移图",
                    file: "migrate",
                    diffcult: "1",
                    detail: "",
                    icon: "migrate.gif",
                    update: "最后更新时间：2018-07-04"
                }, {
                    name: "热力图",
                    file: "heater",
                    diffcult: "1",
                    detail: "",
                    icon: "heater.gif",
                    update: "最后更新时间：2018-07-03"
                }, {
                    name: "区数据渲染",
                    file: "render_polygon",
                    diffcult: "1",
                    detail: "",
                    icon: "render_polygon.png",
                    update: "最后更新时间：2018-07-04"
                }, {
                    name: "点数据播放",
                    file: "point_animate",
                    diffcult: "1",
                    detail: "",
                    icon: "point_animate.gif",
                    update: "最后更新时间：2018-07-04"
                }, {
                    name: "方形网格密度",
                    file: "point_grid",
                    diffcult: "1",
                    detail: "",
                    icon: "point_grid.png",
                    update: "最后更新时间：2018-07-04"
                }, {
                    name: "蜂窝形密度",
                    file: "point_honeycomb",
                    diffcult: "1",
                    detail: "",
                    icon: "point_honeycomb.png",
                    update: "最后更新时间：2018-07-04"
                }, {
                    name: "点重叠播放",
                    file: "point_mutilanimate",
                    diffcult: "1",
                    detail: "",
                    icon: "point_mutilanimate.gif",
                    update: "最后更新时间：2018-07-04"
                }, {
                    name: "点微博数据",
                    file: "point_weibo",
                    diffcult: "1",
                    detail: "",
                    icon: "point_weibo.gif",
                    update: "最后更新时间：2018-07-04"
                }, {
                    name: "单值颜色线",
                    file: "simpleline",
                    diffcult: "1",
                    detail: "",
                    icon: "simpleline.png",
                    update: "最后更新时间：2018-07-04"
                }, {
                    name: "多值统计线",
                    file: "count_line",
                    diffcult: "1",
                    detail: "",
                    icon: "count_line.png",
                    update: "最后更新时间：2018-07-04"
                }, {
                    name: "单一迁移轨迹",
                    file: "simplemigrate",
                    diffcult: "1",
                    detail: "",
                    icon: "simplemigrate.gif",
                    update: "最后更新时间：2018-07-04"
                }, {
                    name: "动态轨迹",
                    file: "tracker",
                    diffcult: "1",
                    detail: "",
                    icon: "tracker.gif",
                    update: "最后更新时间：2018-07-04"
                }, {
                    name: "交通轨迹",
                    file: "trackerline",
                    diffcult: "1",
                    detail: "",
                    icon: "trackerline.png",
                    update: "最后更新时间：2018-07-04"
                }]
            }]
        },
        {
            name: "几何图元",
            materialicon: "bubble_chart",
            folder: "geometry",
            leaffolder: false,
            childs: [
                {
                    name: "内置几何Object",
                    detail: "基本的地图控件功能",
                    materialicon: "bubble_chart",
                    folder: "graphic",
                    leaffolder: true,
                    childs: [{
                        name: "盒子Box",
                        file: "box",
                        diffcult: "1",
                        detail: "绘制实心、空心Box对象",
                        icon: "box.png",
                        update: "最后更新时间：2018-05-14"
                    }, {
                        name: "圆与圆柱Circle&Ellipse",
                        file: "circle",
                        diffcult: "1",
                        detail: "绘制圆Circle、圆柱Ellipse对象",
                        icon: "circle.png",
                        update: "最后更新时间：2018-05-14"
                    }, {
                        name: "走廊Corridor",
                        file: "corridor",
                        diffcult: "1",
                        detail: "绘制走廊通道Corridor对象",
                        icon: "corridor.png",
                        update: "最后更新时间：2018-05-14"
                    }, {
                        name: "区域Plane",
                        file: "plane",
                        diffcult: "1",
                        detail: "绘制区域Plane对象",
                        icon: "plane.png",
                        update: "最后更新时间：2018-05-14"
                    }, {
                        name: "区Polygon",
                        file: "polygon",
                        diffcult: "1",
                        detail: "绘制区Polygon对象",
                        icon: "polygon.png",
                        update: "最后更新时间：2018-05-14"
                    }, {
                        name: "线polyline",
                        file: "polyline",
                        diffcult: "1",
                        detail: "绘制线polyline对象",
                        icon: "polyline.png",
                        update: "最后更新时间：2018-05-14"
                    }, {
                        name: "虚线PolylineDash",
                        file: "polylinedash",
                        diffcult: "2",
                        detail: "绘制虚线PolylineDash对象",
                        icon: "polylinedash.png",
                        update: "最后更新时间：2018-05-14"
                    }, {
                        name: "高程线PolylineVolume",
                        file: "polylinevolume",
                        diffcult: "2",
                        detail: "绘制高程线PolylineVolume对象",
                        icon: "polylinevolume.png",
                        update: "最后更新时间：2018-05-14"
                    }, {
                        name: "长方形Rectangle",
                        file: "rectangle",
                        diffcult: "1",
                        detail: "绘制长方形Rectangle对象",
                        icon: "rectangle.png",
                        update: "最后更新时间：2018-05-14"
                    }, {
                        name: "球Sphere与椭球Ellipsoid",
                        file: "ellipsoid",
                        diffcult: "1",
                        detail: "绘制球Sphere与椭球Ellipsoid对象",
                        icon: "ellipsoid.png",
                        update: "最后更新时间：2018-05-14"
                    }, {
                        name: "墙Wall",
                        file: "wall",
                        diffcult: "1",
                        detail: "绘制墙Wall对象",
                        icon: "wall.png",
                        update: "最后更新时间：2018-05-14"
                    }]
                },
                {
                    name: "通用几何GeoJSON",
                    detail: "基本的地图控件功能",
                    materialicon: "bubble_chart",
                    folder: "geojson",
                    leaffolder: true,
                    childs: [{
                        name: "Point",
                        file: "point",
                        diffcult: "1",
                        detail: "给定一个geojson格式的经纬坐标点，将其展示在cesium上。",
                        icon: "point.png",
                        person: "基础平台/创新中心-潘卓然",
                        update: "最后更新时间：2018-07-02"
                    }, {
                        name: "Line",
                        file: "line",
                        diffcult: "1",
                        detail: "将地理位置的坐标数组(二维)以geojson格式加载进cesium。",
                        icon: "line.png",
                        person: "基础平台/创新中心-潘卓然",
                        update: "最后更新时间：2018-07-02"
                    }, {
                        name: "Polygon",
                        file: "polygon",
                        diffcult: "1",
                        detail: "一个环形坐标数组的数组(三维)以geojson格式加载进cesium。针对“带洞区”，最好采取外圈顺时针，内圈逆时针的方式",
                        icon: "polygon.png",
                        person: "基础平台/创新中心-潘卓然",
                        update: "最后更新时间：2018-07-02"
                    }, {
                        name: "MultiPoint",
                        file: "multipoint",
                        diffcult: "1",
                        detail: "将位置坐标组成二维数组以geojson格式加载进leafelt中。",
                        icon: "multipoint.png",
                        person: "基础平台/创新中心-潘卓然",
                        update: "最后更新时间：2018-07-02"
                    }, {
                        name: "MultiLine",
                        file: "multiline",
                        diffcult: "1",
                        detail: "将线坐标数组的数组(三维)以geojson格式加载进cesium。",
                        icon: "multiline.png",
                        person: "基础平台/创新中心-潘卓然",
                        update: "最后更新时间：2018-07-02"
                    }, {
                        name: "MultiPolygon",
                        file: "multipolygon",
                        diffcult: "2",
                        detail: "将面坐标数组的数组(四维)以geojson格式加载进cesium。",
                        icon: "multipolygon.png",
                        person: "基础平台/创新中心-潘卓然",
                        update: "最后更新时间：2018-07-02"
                    }, {
                        name: "FeatureCollection",
                        file: "featurecollection",
                        diffcult: "2",
                        detail: "以Geojson特征集合数据格式将数据加载进cesium。",
                        icon: "featurecollection.png",
                        person: "基础平台/创新中心-潘卓然",
                        update: "最后更新时间：2018-07-02"
                    }, {
                        name: "地理数据转换",
                        file: "transform",
                        diffcult: "2",
                        detail: "将特定或非特定格式的地理数据转换为标准的geojson格式加载进cesium。",
                        icon: "transform.png",
                        person: "基础平台/创新中心-潘卓然",
                        update: "最后更新时间：2018-07-02"
                    }, {
                        name: "JsonParse",
                        file: "jsonparse",
                        diffcult: "2",
                        detail: "接受一个标准格式的JSON字符串，并返回解析后标准的JavaScript对象，可用于geojson数据的解析。",
                        icon: "jsonparse.png",
                        person: "基础平台/创新中心-潘卓然",
                        update: "最后更新时间：2018-07-02"
                    }]
                }
            ]
        },
        {
            name: "客户端空间分析",
            materialicon: "iso",
            folder: "analysis",
            leaffolder: true,
            childs: [{
                name: "缓冲区分析",
                file: "buffer",
                diffcult: "1",
                detail: "给定一个缓冲半径进行缓冲区分析. 单位支持 miles 米,kilometers 千米,degrees 度.",
                icon: "buffer.png",
                update: "最后更新时间：2018-05-05"
            }, {
                name: "泰森多边形分析",
                file: "voronoi",
                diffcult: "2",
                detail: "针对给定的点生成泰森多边形,请注意一定要传入外包矩形bbox参数",
                icon: "voronoi.png",
                update: "最后更新时间：2018-05-05"
            }, {
                name: "TIN三角网分析",
                file: "tin",
                diffcult: "1",
                detail: "TIN方法将无重复点的散乱数据点集按某种规则(如Delaunay 规则) 进行三角剖分，使这些散乱点形成连续但不重叠的不规则三角面片网，并以此来描述3D 物体的表面。",
                icon: "tin.png",
                update: "最后更新时间：2018-05-05"
            }, {
                name: "中心点提取",
                file: "centroid",
                diffcult: "1",
                detail: "计算给定GeoJSON的数据中心支持所有的GeoJSON类型",
                icon: "centroid.png",
                update: "最后更新时间：2018-05-05"
            }, {
                name: "插值分析",
                file: "along",
                diffcult: "1",
                detail: "线插值操作是通过 计算起点-终点长度,然后再根据长度等分计算需要插值的点,最后再把这些点插入到原始数据中.",
                icon: "along.png",
                update: "最后更新时间：2018-05-05"
            }]
        },
        {
            name: "矢量瓦片",
            materialicon: "map",
            folder: "vectortile",
            leaffolder: true,
            childs: [{
                name: "明亮地图",
                file: "light",
                diffcult: "2",
                detail: "针对mapbox的矢量瓦片规范进行矢量渲染",
                icon: "light.png",
                update: "最后更新时间：2019-07-31,如有问题请咨询创新中心"
            }, {
                name: "黑暗地图",
                file: "dark",
                diffcult: "2",
                detail: "针对mapbox的矢量瓦片规范进行矢量渲染",
                icon: "dark.png",
                update: "最后更新时间：2019-07-31,如有问题请咨询创新中心"
            }, {
                name: "深蓝地图",
                file: "blue",
                diffcult: "2",
                detail: "针对mapbox的矢量瓦片规范进行矢量渲染",
                icon: "blue.png",
                update: "最后更新时间：2019-07-31,如有问题请咨询创新中心"
            }, {
                name: "街道地图",
                file: "streets",
                diffcult: "2",
                detail: "针对mapbox的矢量瓦片规范进行矢量渲染",
                icon: "streets.png",
                update: "最后更新时间：2019-07-31,如有问题请咨询创新中心"
            }]
        },
        {
            name: "实时数据分析Els",
            materialicon: "search",
            folder: "elasticsearch",
            leaffolder: true,
            childs: [{
                name: "中地-时空热力",
                file: "zondyheater",
                diffcult: "2",
                detail: "针对els进行的封装api，针对给定空间，时间范围内的数据进行热力显示",
                icon: "zondyheater.png",
                update: "最后更新时间：2018-05-23,如有问题请咨询创新中心"
            }, {
                name: "中地-时空聚类",
                file: "zondygrid",
                diffcult: "2",
                detail: "针对els进行的封装api，针对给定空间，时间范围内的数据进行聚类显示",
                icon: "zondygrid.png",
                update: "最后更新时间：2018-05-23,如有问题请咨询创新中心"
            }, {
                name: "原生-时空热力",
                file: "elsheater",
                diffcult: "2",
                detail: "els原生查询，针对给定空间，时间范围内的数据进行热力显示",
                icon: "elsheater.png",
                update: "最后更新时间：2018-05-23,如有问题请咨询创新中心"
            }, {
                name: "原生-时空聚类",
                file: "elsgrid",
                diffcult: "2",
                detail: "els原生查询，针对给定空间，时间范围内的数据进行聚类显示",
                icon: "elsgrid.png",
                update: "最后更新时间：2018-05-23,如有问题请咨询创新中心"
            }]
        },
        {
            name: "军民融合-北斗",
            materialicon: "flash_on",
            folder: "gnss",
            leaffolder: true,
            childs: [{
                name: "飞机模型",
                file: "flight",
                diffcult: "1",
                detail: "提供完整的飞机模型以及渲染能力",
                icon: "flight.png",
                update: "最后更新时间：2018-05-05"
            }, {
                name: "船舶模型",
                file: "ship",
                diffcult: "1",
                detail: "提供完整的船舶模型以及渲染能力",
                icon: "ship.png",
                update: "最后更新时间：2018-05-05"
            }, {
                name: "卫星轨迹模拟",
                file: "satellite",
                diffcult: "1",
                detail: "对接北斗开放实验室用户段，地面段，空间段的全数据格式及其协议",
                icon: "satellite.png",
                update: "最后更新时间：2018-05-05"
            }, {
                name: "导弹开火",
                file: "fire",
                diffcult: "1",
                detail: "模拟摧毁萨德等目标",
                icon: "fire.png",
                update: "最后更新时间：2018-05-05"
            }, {
                name: "轨迹与爆炸联动",
                file: "boom",
                diffcult: "3",
                detail: "模拟摧毁萨德等目标",
                icon: "boom.gif",
                update: "最后更新时间：2018-05-10"
            }]
        }
    ]
};
