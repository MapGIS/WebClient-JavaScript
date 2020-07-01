import Cesium from '../../../../node_modules/cesium/Source/Cesium';

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