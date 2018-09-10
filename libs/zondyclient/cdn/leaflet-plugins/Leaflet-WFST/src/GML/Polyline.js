/**
 * Created by PRadostev on 06.03.2015.
 */

L.Polyline.include({
  _lineStringNode: function (crs, latlngs) {
    var node = L.XmlUtil.createElementNS('gml:LineString', {srsName: crs.code, srsDimension: 2});
    node.appendChild(L.GmlUtil.posListNode(L.Util.project(crs, latlngs), false));
    return node;
  },

  toGml: function (crs) {
    var latLngs = this.getLatLngs();
    if (L.Util.isFlat(latLngs)) return this._lineStringNode(crs, latLngs);

    //we have multiline
    var multi = L.XmlUtil.createElementNS('gml:MultiLineString', {srsName: crs.code, srsDimension: 2});
    var collection = multi.appendChild(L.XmlUtil.createElementNS('gml:lineStringMembers'));
    for (var i = 0; i < latLngs.length; i++) {
      collection.appendChild(this._lineStringNode(crs, latLngs[i]));
    }

    return multi;
  }
});
