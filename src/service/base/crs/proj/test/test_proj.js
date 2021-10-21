// import * as proj4x from 'proj4';
// const proj4 = proj4x.default;
let proj4 = require('proj4');

export const EPSG = {
    WGS84: [
        { id: 4326, name: "WGS1984_度", type: 0, strProject: "+proj=longlat +datum=WGS84 +no_defs" }
    ],
    Web墨卡托: [
        { id: 3857, name: "Web墨卡托_WGS1984", type: 1, strProject: "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs" }
    ],
    经纬度西安80: [
        { id: 4610, name: "地理坐标系(西安)_度", type: 0, strProject: "+proj=longlat +a=6378140 +b=6356755.288157528 +units=degrees +no_defs" }
    ],
    经纬度北京54: [
        { id: 4214, name: "地理坐标系(北京)_度", type: 0, strProject: "+proj=longlat +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +no_defs" }
    ],
    经纬度中国2000: [
        { id: 4490, name: "中国2000国家大地坐标系_度", type: 0, strProject: "+proj=longlat +ellps=GRS80 +units=degrees +no_defs" }
    ],
    高斯西安80: [
        { id: 2348, name: "高斯大地坐标系_西安80_23带6_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=135 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2347, name: "高斯大地坐标系_西安80_22带6_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=129 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2346, name: "高斯大地坐标系_西安80_21带6_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2345, name: "高斯大地坐标系_西安80_20带6_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2344, name: "高斯大地坐标系_西安80_19带6_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2343, name: "高斯大地坐标系_西安80_18带6_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=105 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2342, name: "高斯大地坐标系_西安80_17带6_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=99 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2341, name: "高斯大地坐标系_西安80_16带6_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=93 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2340, name: "高斯大地坐标系_西安80_15带6_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=87 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2339, name: "高斯大地坐标系_西安80_14带6_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=75 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2338, name: "高斯大地坐标系_西安80_13带6_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=75 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2390, name: "高斯大地坐标系_西安80_45带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=135 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2389, name: "高斯大地坐标系_西安80_44带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=132 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2388, name: "高斯大地坐标系_西安80_43带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=129 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2387, name: "高斯大地坐标系_西安80_42带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=126 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2386, name: "高斯大地坐标系_西安80_41带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2385, name: "高斯大地坐标系_西安80_40带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2384, name: "高斯大地坐标系_西安80_39带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2383, name: "高斯大地坐标系_西安80_38带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2382, name: "高斯大地坐标系_西安80_37带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2381, name: "高斯大地坐标系_西安80_36带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=108 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2380, name: "高斯大地坐标系_西安80_35带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=105 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2379, name: "高斯大地坐标系_西安80_34带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=102 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2378, name: "高斯大地坐标系_西安80_33带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=99 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2377, name: "高斯大地坐标系_西安80_32带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=96 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2376, name: "高斯大地坐标系_西安80_31带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=93 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2375, name: "高斯大地坐标系_西安80_30带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=90 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2374, name: "高斯大地坐标系_西安80_29带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=87 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2373, name: "高斯大地坐标系_西安80_28带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=84 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2372, name: "高斯大地坐标系_西安80_27带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=81 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2371, name: "高斯大地坐标系_西安80_26带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=78 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2370, name: "高斯大地坐标系_西安80_25带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=75 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2327, name: "高斯大地坐标系_西安80_13带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=75 +k=1 +x_0=13500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2328, name: "高斯大地坐标系_西安80_14带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=81 +k=1 +x_0=14500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2329, name: "高斯大地坐标系_西安80_15带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=87 +k=1 +x_0=15500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2330, name: "高斯大地坐标系_西安80_16带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=93 +k=1 +x_0=16500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2331, name: "高斯大地坐标系_西安80_17带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=99 +k=1 +x_0=17500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2332, name: "高斯大地坐标系_西安80_18带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=105 +k=1 +x_0=18500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2333, name: "高斯大地坐标系_西安80_19带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=19500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2334, name: "高斯大地坐标系_西安80_20带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=20500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2335, name: "高斯大地坐标系_西安80_21带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=21500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2336, name: "高斯大地坐标系_西安80_22带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=129 +k=1 +x_0=22500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2337, name: "高斯大地坐标系_西安80_23带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=135 +k=1 +x_0=23500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2403, name: "高斯大地坐标系_西安80_27带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=81 +k=1 +x_0=27500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2404, name: "高斯大地坐标系_西安80_28带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=84 +k=1 +x_0=28500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2405, name: "高斯大地坐标系_西安80_29带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=87 +k=1 +x_0=29500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2406, name: "高斯大地坐标系_西安80_30带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=90 +k=1 +x_0=30500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2407, name: "高斯大地坐标系_西安80_31带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=93 +k=1 +x_0=31500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2408, name: "高斯大地坐标系_西安80_32带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=96 +k=1 +x_0=32500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2409, name: "高斯大地坐标系_西安80_33带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=99 +k=1 +x_0=33500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2410, name: "高斯大地坐标系_西安80_34带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=102 +k=1 +x_0=34500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2411, name: "高斯大地坐标系_西安80_35带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=105 +k=1 +x_0=35500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2412, name: "高斯大地坐标系_西安80_36带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=108 +k=1 +x_0=36500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2413, name: "高斯大地坐标系_西安80_37带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=37500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2414, name: "高斯大地坐标系_西安80_38带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=38500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2415, name: "高斯大地坐标系_西安80_39带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=39500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2416, name: "高斯大地坐标系_西安80_40带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=40500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2417, name: "高斯大地坐标系_西安80_41带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=41500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2418, name: "高斯大地坐标系_西安80_42带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=126 +k=1 +x_0=42500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2419, name: "高斯大地坐标系_西安80_43带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=129 +k=1 +x_0=43500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2420, name: "高斯大地坐标系_西安80_44带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=132 +k=1 +x_0=44500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2421, name: "高斯大地坐标系_西安80_45带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=135 +k=1 +x_0=45500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2349, name: "高斯大地坐标系_西安80_25带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=75 +k=1 +x_0=25500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2350, name: "高斯大地坐标系_西安80_26带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=78 +k=1 +x_0=26500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2351, name: "高斯大地坐标系_西安80_27带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=81 +k=1 +x_0=27500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2352, name: "高斯大地坐标系_西安80_28带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=84 +k=1 +x_0=28500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2353, name: "高斯大地坐标系_西安80_29带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=87 +k=1 +x_0=29500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2354, name: "高斯大地坐标系_西安80_30带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=90 +k=1 +x_0=30500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2355, name: "高斯大地坐标系_西安80_31带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=93 +k=1 +x_0=31500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2356, name: "高斯大地坐标系_西安80_32带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=96 +k=1 +x_0=32500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2357, name: "高斯大地坐标系_西安80_33带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=99 +k=1 +x_0=33500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2358, name: "高斯大地坐标系_西安80_34带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=102 +k=1 +x_0=34500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2359, name: "高斯大地坐标系_西安80_35带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=105 +k=1 +x_0=35500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2360, name: "高斯大地坐标系_西安80_36带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=108 +k=1 +x_0=36500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2361, name: "高斯大地坐标系_西安80_37带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=37500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2362, name: "高斯大地坐标系_西安80_38带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=38500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2363, name: "高斯大地坐标系_西安80_39带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=39500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2364, name: "高斯大地坐标系_西安80_40带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=40500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2365, name: "高斯大地坐标系_西安80_41带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=41500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2366, name: "高斯大地坐标系_西安80_42带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=126 +k=1 +x_0=42500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2367, name: "高斯大地坐标系_西安80_43带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=129 +k=1 +x_0=43500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2368, name: "高斯大地坐标系_西安80_44带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=132 +k=1 +x_0=44500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" },
        { id: 2369, name: "高斯大地坐标系_西安80_45带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=135 +k=1 +x_0=45500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs" }
    ],
    高斯北京54: [
        { id: 21413, name: "高斯大地坐标系_北京54_13带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=75 +k=1 +x_0=13500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 21414, name: "高斯大地坐标系_北京54_14带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=81 +k=1 +x_0=14500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 21415, name: "高斯大地坐标系_北京54_15带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=87 +k=1 +x_0=15500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 21416, name: "高斯大地坐标系_北京54_16带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=93 +k=1 +x_0=16500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 21417, name: "高斯大地坐标系_北京54_17带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=99 +k=1 +x_0=17500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 21418, name: "高斯大地坐标系_北京54_18带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=105 +k=1 +x_0=18500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 21419, name: "高斯大地坐标系_北京54_19带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=19500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 21420, name: "高斯大地坐标系_北京54_20带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=20500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 21421, name: "高斯大地坐标系_北京54_21带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=21500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 21422, name: "高斯大地坐标系_北京54_22带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=129 +k=1 +x_0=22500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 21423, name: "高斯大地坐标系_北京54_23带6_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=135 +k=1 +x_0=23500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2431, name: "高斯大地坐标系_北京54_34带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=102 +k=1 +x_0=500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2401, name: "高斯大地坐标系_北京54_25带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=75 +k=1 +x_0=25500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 2402, name: "高斯大地坐标系_北京54_26带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=78 +k=1 +x_0=26500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs" },
        { id: 32646, name: "Beijing 1954 / 3-degree Gauss-Kruger CM 102E", type: 1, strProject: "+proj=utm +zone=46 +datum=WGS84 +units=m +no_defs" }
    ],
    高斯中国2000: [
        { id: 4502, name: "高斯大地坐标系_中国2000_13带6_北", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=75 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4503, name: "高斯大地坐标系_中国2000_14带6_北", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=81 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4504, name: "高斯大地坐标系_中国2000_15带6_北", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=87 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4505, name: "高斯大地坐标系_中国2000_16带6_北", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=93 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4506, name: "高斯大地坐标系_中国2000_17带6_北", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=99 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4507, name: "高斯大地坐标系_中国2000_18带6_北", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=105 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4508, name: "高斯大地坐标系_中国2000_19带6_北", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4509, name: "高斯大地坐标系_中国2000_20带6_北", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4510, name: "高斯大地坐标系_中国2000_21带6_北", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4511, name: "高斯大地坐标系_中国2000_22带6_北", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=129 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4512, name: "高斯大地坐标系_中国2000_23带6_北", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=135 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4513, name: "高斯大地坐标系_中国2000_25带6_北", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=75 +k=1 +x_0=25500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4514, name: "高斯大地坐标系_中国2000_26带6_北", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=78 +k=1 +x_0=26500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4515, name: "高斯大地坐标系_中国2000_27带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=81 +k=1 +x_0=27500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4516, name: "高斯大地坐标系_中国2000_28带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=84 +k=1 +x_0=28500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4517, name: "高斯大地坐标系_中国2000_29带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=87 +k=1 +x_0=29500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4518, name: "高斯大地坐标系_中国2000_30带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=90 +k=1 +x_0=30500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4519, name: "高斯大地坐标系_中国2000_31带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=93 +k=1 +x_0=31500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4520, name: "高斯大地坐标系_中国2000_32带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=96 +k=1 +x_0=32500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4521, name: "高斯大地坐标系_中国2000_33带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=99 +k=1 +x_0=33500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4522, name: "高斯大地坐标系_中国2000_34带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=102 +k=1 +x_0=34500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4523, name: "高斯大地坐标系_中国2000_35带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=105 +k=1 +x_0=35500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4524, name: "高斯大地坐标系_中国2000_36带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=108 +k=1 +x_0=36500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4525, name: "高斯大地坐标系_中国2000_37带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=37500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4526, name: "高斯大地坐标系_中国2000_38带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=38500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4527, name: "高斯大地坐标系_中国2000_39带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=39500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4528, name: "高斯大地坐标系_中国2000_40带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=40500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4529, name: "高斯大地坐标系_中国2000_41带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=41500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4530, name: "高斯大地坐标系_中国2000_42带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=126 +k=1 +x_0=42500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4531, name: "高斯大地坐标系_中国2000_43带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=129 +k=1 +x_0=43500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4532, name: "高斯大地坐标系_中国2000_44带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=132 +k=1 +x_0=44500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4533, name: "高斯大地坐标系_中国2000_45带3_北2", type: 0, strProject: "+proj=tmerc +lat_0=0 +lon_0=135 +k=1 +x_0=45500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4546, name: "高斯大地坐标系_中国2000_37带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4547, name: "高斯大地坐标系_中国2000_38带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" },
        { id: 4545, name: "高斯大地坐标系_中国2000_36带3_北", type: 1, strProject: "+proj=tmerc +lat_0=0 +lon_0=108 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs" }
    ]
};

export function epsgId(epsg) {
    if (typeof epsg === 'string') {
        const str = epsg.toUpperCase()
        let result;

        if (str.indexOf('EPSG:') >= 0) {
            result = str.split('EPSG:')
        } else if (str.indexOf('EPSG_') >= 0) {
            result = str.split('EPSG_')
        } else if (str.indexOf('EPSG') >= 0) {
            result = str.split('EPSG')
        } else {
            return parseInt(epsg, 10)
        }
        if (result.length >= 2) {
            return parseInt(result[1], 10)
        } else {
            return 4326
        }
    } else {
        return epsg;
    }
}

export class ProjectTool {
    static getProj4sCascader() {
        const options = Object.keys(EPSG).map((key) => {
            const menu = {
                value: key,
                label: key,
                children: []
            };
            menu.children = EPSG[key].map((epsg) => {
                return { value: epsg.id, label: epsg.name };
            });
            return menu;
        });
        return options;
    }

    static getProj4sDetail(id) {
        let detail = '';
        const keys = Object.keys(EPSG);
        for (const key of keys) {
            const epsgs = EPSG[key];
            for (const item of epsgs) {
                if (item.id === id) {
                    detail = item.strProject;
                    break;
                }
            }
            if (detail !== '') {
                break;
            }
        }
        return detail;
    }

    static proj4Transform(source, destination, point) {
        let proj = proj4(source, destination);
        let projpoint = proj.forward(point);
        return projpoint;
    }
}


let source = epsgId("EPSG:4326");
let des = epsgId("EPSG:3857");
let point = [110, 30]
let result = ProjectTool.proj4Transform(source, des, point);
console.log('result', result);