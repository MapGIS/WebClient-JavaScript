// WGS-84 转 web墨卡托，主要用于将坐标单位为度的值转为单位为米的值
function lonLat2Mercator(lon, lat) {
    var x = lon * 20037508.34 / 180;
    var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / Math.PI * 20037508.34;
    y = Math.max(-20037508.34, Math.min(y, 20037508.34));
    return {'x': x, 'y': y};
}
// web墨卡托 转 WGS-84，主要用于将坐标单位为米的值转为单位为度的值
function mercator2LonLat(mercatorX, mercatorY) {
    var lon = mercatorX * 180 / 20037508.34;
    var lat = 180 / Math.PI * (2 * Math.atan(Math.exp((mercatorY / 20037508.34) * Math.PI)) - Math.PI / 2);
    return {'x': lon, 'y': lat};
}