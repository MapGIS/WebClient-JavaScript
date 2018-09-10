/**
 * Created by PRadostev on 09.06.2015.
 */

L.GML.MultiGeometry = L.GML.Geometry.extend({
  includes: [L.GML.ParserContainerMixin, L.GML.CoordsToLatLngMixin],

  initialize: function () {
    this.initializeParserContainer();
  },

  parse: function (element, options) {
    var childObjects = [];
    for (var i = 0; i < element.childNodes.length; i++) {
      var geometryMember = element.childNodes[i];
      if (geometryMember.nodeType !== document.ELEMENT_NODE) continue;

      for (var j = 0; j < geometryMember.childNodes.length; j++) {
        var singleGeometry = geometryMember.childNodes[j];
        if (singleGeometry.nodeType !== document.ELEMENT_NODE) continue;

        childObjects.push(this.parseElement(singleGeometry, options));
      }
    }

    return this.transform(childObjects, options);
  }
});
