/**
 * Created by PRadostev on 09.06.2015.
 */

L.GML.MultiLineString = L.GML.AbstractMultiPolyline.extend({
  initialize: function () {
    L.GML.AbstractMultiPolyline.prototype.initialize.call(this);
    this.elementTag = 'gml:MultiLineString';
  }
});
