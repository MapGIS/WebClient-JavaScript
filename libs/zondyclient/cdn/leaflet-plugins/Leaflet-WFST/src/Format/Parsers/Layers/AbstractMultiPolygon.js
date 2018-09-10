/**
 * Created by PRadostev on 09.06.2015.
 */

L.GML.AbstractMultiPolygon = L.GML.MultiGeometry.extend({

  initialize: function () {
    L.GML.MultiGeometry.prototype.initialize.call(this);
    this.appendParser(new L.GML.PolygonNode());
  },

  parse: function (element, options) {
    var latLngs = L.GML.MultiGeometry.prototype.parse.call(this, element, options);
    var layer = new L.Polygon([]);
    layer.setLatLngs(latLngs);
    return layer;
  }
});
