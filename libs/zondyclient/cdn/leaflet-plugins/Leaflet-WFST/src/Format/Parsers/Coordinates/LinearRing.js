/**
 * Created by PRadostev on 09.06.2015.
 */

L.GML.LinearRing = L.GML.PointSequence.extend({
  initialize: function () {
    L.GML.PointSequence.prototype.initialize.call(this);
    this.elementTag = 'gml:LinearRing';
  },

  parse: function (element) {
    var coords = L.GML.PointSequence.prototype.parse.call(this, element);
    //for leaflet polygons its not recommended insert additional last point equal to the first one
    coords.pop();
    return coords;
  }
});
