/**
 * Created by PRadostev on 20.02.2015.
 */

L.Polygon.include({
  toGml: function (crs) {
    var polygons = this.getLatLngs();
    var gmlPolygons = [];

    for (var i = 0; i < polygons.length; i++) {
      var polygonCoordinates = polygons[i];
      var flat = L.Util.isFlat(polygonCoordinates);
      var node = L.XmlUtil.createElementNS('gml:Polygon', {srsName: crs.code, srsDimension: 2});
      node.appendChild(L.XmlUtil.createElementNS('gml:exterior'))
        .appendChild(L.XmlUtil.createElementNS('gml:LinearRing', {srsDimension: 2}))
        .appendChild(L.GmlUtil.posListNode(L.Util.project(crs, flat ? polygonCoordinates : polygonCoordinates[0]), true));

      if (!flat) {
        for (var hole = 1; hole < polygonCoordinates.length; hole++) {
          node.appendChild(L.XmlUtil.createElementNS('gml:interior'))
            .appendChild(L.XmlUtil.createElementNS('gml:LinearRing', {srsDimension: 2}))
            .appendChild(L.GmlUtil.posListNode(L.Util.project(crs, polygonCoordinates[hole]), true));
        }
      }

      gmlPolygons.push(node);
    }

    if (gmlPolygons.length === 1) return gmlPolygons[0];

    // else make multipolygon
    var multi = L.XmlUtil.createElementNS('gml:MultiPolygon', {srsName: crs.code, srsDimension: 2});
    var collection = multi.appendChild(L.XmlUtil.createElementNS('gml:polygonMembers'));
    for (var p = 0; p < gmlPolygons.length; p++) {
      collection.appendChild(gmlPolygons[p]);
    }

    return multi;
  }
});
