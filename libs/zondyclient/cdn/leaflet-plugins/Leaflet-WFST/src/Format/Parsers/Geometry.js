/**
 * Created by PRadostev on 05.06.2015.
 */

L.GML.Geometry = L.GML.Element.extend({
  statics: {
    DIM: 2
  },

  dimensions: function (element) {
    if (element.attributes.srsDimension) {
      return parseInt(element.attributes.srsDimension.value);
    }

    return L.GML.Geometry.DIM;
  }
});
