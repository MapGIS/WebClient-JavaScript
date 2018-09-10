/**
 * Created by PRadostev on 20.02.2015.
 */

L.Util.project = function (crs, latlngs) {
  if (L.Util.isArray(latlngs)) {
    var result = [];
    latlngs.forEach(function (latlng) {
      result.push(L.Util.project(crs, latlng));
    });

    return result;
  } else {
    return crs.projection.project(latlngs);
  }
};

// 1.0.1 <=> 1.1.0 <=> 1.2.0 compatibility.
L.Util.isFlat = L.LineUtil.isFlat || L.LineUtil._flat || L.Polyline._flat;
