/**
 * @description 用来调整相机视角的时候设置对应的
 * @param {Viewer} viewer Cesium的viewer对象
 * @param {Cartesian3} cartesian Cesium.cartesian3对象
 * @param {String} popupId 整个popup渲染外包div的id
 * @param {String} popupContentId 整个popup渲染内容的id
 * @param {Object} [options.longitude] 传入的经度,内部换算笛卡尔积
 * @param {Object} [options.latitude] 传入的纬度,内部换算笛卡尔积
 */
export function updataPopupPosition(viewer, cartesian, popupId, popupContentId, options) {
    if(!cartesian) return ;
    let scene = viewer.scene;
    let camera = viewer.camera;

    let rect = camera.computeViewRectangle();
    const south = Cesium.Math.toDegrees(rect.south)
    const north = Cesium.Math.toDegrees(rect.north)
    const east = Cesium.Math.toDegrees(rect.east)
    const west = Cesium.Math.toDegrees(rect.west)

    let carto, longitude, latitude;
    if(options && options.longitude && options.latitude){
        longitude = options.position.longitude;
        latitude = options.position.latitude;
        if (longitude < west || longitude > east || latitude > north || latitude < south) {
            popup.style.display = "none";
            return;
        }
    } else {
        carto = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian);    
        longitude = Cesium.Math.toDegrees(carto.longitude);
        latitude = Cesium.Math.toDegrees(carto.latitude);
    }
        
    var px_position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, cartesian);
    
    if(!px_position) return;
    var res = false;
    var e = cartesian,
        i = camera.position,
        n = scene.globe.ellipsoid.cartesianToCartographic(i).height;
    if (!(n += 1 * scene.globe.ellipsoid.maximumRadius, Cesium.Cartesian3.distance(i, e) > n)) {
        res = true;
    }

    if (longitude < west || longitude > east || latitude > north || latitude < south) {
        res = false;
    }
    
    let popup = window.document.getElementById(popupId);
    if(!popup) return;

    if (res) {
        popup.style.display = "block";
        var trackPopUpContent = window.document.getElementById(popupContentId);
        var popw = document.getElementById(popupContentId).offsetWidth;
        var poph = document.getElementById(popupContentId).offsetHeight;
        trackPopUpContent.style.left = px_position.x - (popw / 2) + "px";
        trackPopUpContent.style.top = px_position.y - (poph - 10) + "px";
    } else {
        popup.style.display = "none";
    }
}
