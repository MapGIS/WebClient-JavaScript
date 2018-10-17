/**初始化地图显示*/
function init() {
    //地图容器
    map = L.map('leaf_map', {
        //参考坐标系
        crs: L.CRS.EPSG3857,
        //显示中心
        center: [50, -120],
        //最小显示等级
        minZoom: 0,
        //最大显示等级
        maxZoom: 16,
        //当前显示等级
        zoom: 3
    });
    //加载瓦片图层数据（OSM）
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { noWrap: true }).addTo(map);
    //WMTS服务地址
    var wmtsUrl = "http://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/WMTS?service=wmts&request=GetTile&version=1.0.0&LAYER=Demographics_USA_Population_Density&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles";
    //加载WMTS服务图层
    var wmtsLayer = L.tileLayer(wmtsUrl, { noWrap: true }).addTo(map);
}