/**
 * Created by PRadostev on 11.08.2015.
 */

L.GML.PolygonNode = L.GML.Geometry.extend({

  initialize: function () {
    this.elementTag = 'gml:Polygon';
    this.linearRingParser = new L.GML.LinearRing();
  },

  parse: function (element) {
    var coords = [];
    for (var i = 0; i < element.childNodes.length; i++) {
      //there can be exterior and interior, by GML standard and for leaflet its not significant
      var child = element.childNodes[i];
      if (child.nodeType === document.ELEMENT_NODE) {
        coords.push(this.linearRingParser.parse(child.firstChild));
      }
    }

    return coords;
  }
});
