/**
 * Created by PRadostev on 05.06.2015.
 */

L.GML.Coordinates = L.GML.Element.extend({

  defaultSeparator: {
    ds: '.', //decimal separator
    cs: ',', // component separator
    ts: ' ' // tuple separator
  },

  initialize: function () {
    this.elementTag = 'gml:coordinates';
  },

  parse: function (element) {

    var ds = this.defaultSeparator.ds;
    if (element.attributes.decimal) {
      ds = element.attributes.decimal.value;
    }

    var cs = this.defaultSeparator.cs;
    if (element.attributes.cs) {
      cs = element.attributes.cs.value;
    }

    var ts = this.defaultSeparator.ts;
    if (element.attributes.ts) {
      ts = element.attributes.ts.value;
    }

    var result = [];
    var coords = element.textContent.split(ts);

    var mapFunction = function (coord) {
      if (ds !== '.') {
        coord = coord.replace(ds, '.');
      }

      return parseFloat(coord);
    };

    for (var i = 0; i < coords.length; i++) {
      result.push(coords[i].split(cs).map(mapFunction));
    }

    if (result.length === 1) {
      return result[0];
    }

    return result;
  }
});
