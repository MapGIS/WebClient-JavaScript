/**
 * Created by PRadostev on 05.06.2015.
 */

L.GML.PosList = L.GML.Element.extend({
  initialize: function () {
    this.elementTag = 'gml:posList';
  },

  parse: function (element, options) {
    var result = [];
    var dim = options.dimensions;
    var coords = element.textContent.split(' ');
    for (var i = 0; i < coords.length; i += dim) {
      var coord = [];
      for (var j = i; j < i + dim; j++) {
        coord.push(parseFloat(coords[j]));
      }
      result.push(coord);
    }

    return result;
  }
});
