/**
 * Created by PRadostev on 10.06.2015.
 */

L.GML.MultiPoint = L.GML.MultiGeometry.extend({
  initialize: function () {
    L.GML.MultiGeometry.prototype.initialize.call(this);
    this.elementTag = 'gml:MultiPoint';
    this.appendParser(new L.GML.PointNode());
  },

  parse: function (element, options) {
    var coordinates = L.GML.MultiGeometry.prototype.parse.call(this, element, options);
    var multiPoint = new L.FeatureGroup();
    for (var i = 0; i < coordinates.length; i++) {
      var point = new L.Marker();
      point.setLatLng(coordinates[i]);
      multiPoint.addLayer(point);
    }

    return multiPoint;
  }
});
