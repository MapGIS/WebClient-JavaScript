/**
 * Created by PRadostev on 20.02.2015.
 */

L.GmlUtil = {
  posNode: function (coord) {
    return L.XmlUtil.createElementNS('gml:pos', { srsDimension: 2 }, { value: coord.x + ' ' + coord.y });
  },

  posListNode: function (coords, close) {
    var localcoords = [];
    coords.forEach(function (coord) {
      localcoords.push(coord.x + ' ' + coord.y);
    });
    if (close && coords.length > 0) {
      var coord = coords[0];
      localcoords.push(coord.x + ' ' + coord.y);
    }

    var posList = localcoords.join(' ');
    return L.XmlUtil.createElementNS('gml:posList', {}, { value: posList });
  }
};
