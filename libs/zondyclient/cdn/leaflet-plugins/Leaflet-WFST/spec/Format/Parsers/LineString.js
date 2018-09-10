/**
 * Created by PRadostev on 08.06.2015.
 */

describe("L.GML.LineString", function () {
  var parser, parentParse, transform, coordinates;
  before(function () {
    parser = new L.GML.LineString();
    parentParse = sinon.stub(L.GML.LineStringNode.prototype, 'parse').returns([]);
    transform = sinon.stub(parser, 'transform').returns([]);
  });

  it('should parse gml:LineString element', function () {
    expect(parser.elementTag).to.equal('gml:LineString');
  });

  it('should return L.Polyline object', function () {
    var element = parseXml('<gml:LineString></gml:LineString>');
    var result = parser.parse(element);
    expect(result).to.be.instanceOf(L.Polyline);
  });

  after(function () {
    parentParse.restore();
    transform.restore();
  });
});


