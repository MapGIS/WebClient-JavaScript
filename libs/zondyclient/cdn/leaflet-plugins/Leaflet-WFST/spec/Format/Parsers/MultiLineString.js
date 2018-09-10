/**
 * Created by PRadostev on 09.06.2015.
 */

describe("L.GML.MultiLineString", function () {
  var parser;

  before(function () {
    parser = new L.GML.MultiLineString();
  });

  it('should parse gml:MultiLineString element', function () {
    expect(parser.elementTag).to.equal('gml:MultiLineString');
  });

  it('should know how parse gml:LineStrings', function () {
    var child = parser.parsers['gml:LineString'];
    expect(child).to.be.instanceOf(L.GML.LineStringNode);
  });
});
