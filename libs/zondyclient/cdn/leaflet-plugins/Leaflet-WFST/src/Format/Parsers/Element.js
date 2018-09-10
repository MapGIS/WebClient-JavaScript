/**
 * Created by PRadostev on 05.06.2015.
 */

L.GML.Element = L.Class.extend({
  elementTag: '',
  parse: function () {
    throw('not implemented parse function in parser for ' + this.elementTag);
  }
});
