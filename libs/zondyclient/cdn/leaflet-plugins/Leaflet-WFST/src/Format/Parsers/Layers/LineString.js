/**
 * Created by PRadostev on 05.06.2015.
 */

L.GML.LineString = L.GML.LineStringNode.extend({

  includes: L.GML.CoordsToLatLngMixin,

  parse: function (element, options) {
    var layer = new L.Polyline([]);
    var coordinates = L.GML.LineStringNode.prototype.parse.call(this, element);
    layer.setLatLngs(this.transform(coordinates, options));
    return layer;
  }
});
