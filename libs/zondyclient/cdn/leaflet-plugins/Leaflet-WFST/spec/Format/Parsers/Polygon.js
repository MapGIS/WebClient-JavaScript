/**
 * Created by PRadostev on 09.06.2015.
 */

describe("L.GML.Polygon", function () {
  var parser;

  before(function () {
    parser = new L.GML.Polygon();
  });

  it('should parse gml:Polygon element', function () {
    expect(parser.elementTag).to.equal('gml:Polygon');
  });

  it('should return L.Polygon object', function () {
    var element = parseXml('<gml:Polygon></gml:Polygon>');
    var transform = sinon.stub(parser, 'transform').returns([]);
    var result = parser.parse(element);
    expect(result).to.be.instanceOf(L.Polygon);
    transform.restore();
  });
});
