import { isMobile } from "@/utils/mobile";

export const maps_navs = [
    {
        name: "OpenLayers",
        type: "iconlayer",
        index: "/openlayers",
        mobile: true,
        list: [
            {
                name: "示例",
                type: "iconphoto_gallery_outlined",
                index: "/gallery/openlayers"
            },
            {
                name: "API",
                type: "icondocument",
                href: "/docs/openlayers/index.html"
            }
        ]
    },
    {
        name: "Mapbox GL",
        type: "iconmap2",
        index: "/mapboxgl",
        mobile: true,
        list: [
            {
                name: "示例",
                type: "iconphoto_gallery_outlined",
                index: "/gallery/mapboxgl"
            },
            {
                name: "API",
                type: "icondocument",
                href: "/docs/mapboxgl/index.html"
            }
        ]
    },
    {
        name: "Cesium",
        type: "iconsatellite",
        index: "/cesium",
        mobile: true,
        list: [
            {
                name: "示例",
                type: "iconphoto_gallery_outlined",
                index: "/gallery/cesium"
            },
            {
                name: "API",
                type: "icondocument",
                href: "/docs/cesium/index.html"
            }
        ]
    },
    {
        name: "Leaflet",
        type: "iconleaf",
        index: "/leaflet",
        mobile: true,
        list: [
            {
                name: "示例",
                type: "iconphoto_gallery_outlined",
                index: "/gallery/leaflet"
            },
            {
                name: "API",
                type: "icondocument",
                href: "/docs/leaflet/index.html"
            }
        ]
    }
];

export const main_navs = [{
    name: "概述",
    type: "iconhome",
    mobile: true,
    index: '/total',
    list: [
        {
            name: "核心服务",
            type: "iconcoreos",
            index: "/total/core"
        }, {
            name: "详细服务",
            type: "icondetail",
            index: "/total/detail"
        },
        {
            name: "插件列表",
            type: "iconlist",
            index: "/total/plugins"
        }, {
            name: "原生JS调用",
            type: "iconhelp",
            index: "/total/use"
        }, {
            name: "四大引擎选择",
            type: "iconicon-",
            index: "/total/select"
        }, {
            name: "下载",
            type: "iconClouddownload",
            index: "/total/download"
        }
    ]
}];

export const ogc_navs = [{
    name: "协议",
    type: "iconlayer",
    index: "/standard",
    mobile: true,
    list: [
        {
            name: "EPSG",
            type: "iconstandard_objects",
            index: "/standard/epsg"
        },
        {
            name: "OGC",
            type: "iconformattextdirectionrtol",
            index: "/standard/ogc"
        },
        {
            name: "GeoJson",
            type: "iconformattextdirectionrtol",
            index: "/standard/geojson"
        },
        {
            name: "流图层",
            type: "iconformatstrikethroughvariant",
            index: "/standard/socket"
        }
    ]
}];

export const maps_nav_all = [
    {
        name: "地图",
        type: "iconmap2",
        index: "/map",
        mobile: true,
        list: maps_navs
    }
]

export const main_nav_all = [
    {
        name: "地图",
        type: "iconhome",
        index: "/main",
        mobile: true,
        list: [].concat(main_navs).concat(ogc_navs)
    }
]

export const WebNavs = []
    .concat(maps_navs)
    .concat(ogc_navs)
    .concat(main_navs);

export const MobileNavs = []
    //.concat(main_nav_all)
    .concat(main_navs)
    .concat(ogc_navs)
    .concat(maps_nav_all);

export function getNavs() {
    let navs = isMobile() ? MobileNavs : WebNavs;
    return navs;
}


