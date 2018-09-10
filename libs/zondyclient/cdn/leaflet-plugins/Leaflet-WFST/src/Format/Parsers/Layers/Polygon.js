/**
 * Created by PRadostev on 09.06.2015.
 */

L.GML.Polygon = L.GML.PolygonNode.extend({

  includes: L.GML.CoordsToLatLngMixin,

  parse: function (element, options) {
    var layer = new L.Polygon([]);
    var coordinates = L.GML.PolygonNode.prototype.parse.call(this, element);
    layer.setLatLngs(this.transform(coordinates, options));
    return layer;
  }
});
