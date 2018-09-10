/**
 * Created by PRadostev on 09.06.2015.
 */

describe("L.GML.MultiSurface", function () {
  var parser;

  before(function () {
    parser = new L.GML.MultiSurface();
  });

  it('should parse gml:MultiSurface elements', function () {
    expect(parser.elementTag).to.equal('gml:MultiSurface');
  });

  it('should know how to parse gml:Polygon', function () {
    var child = parser.parsers['gml:Polygon'];
    expect(child).to.be.instanceOf(L.GML.PolygonNode);
  });
});
