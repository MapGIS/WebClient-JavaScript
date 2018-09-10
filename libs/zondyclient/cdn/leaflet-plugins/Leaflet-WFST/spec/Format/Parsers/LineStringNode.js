/**
 * Created by PRadostev on 11.08.2015.
 */

describe("L.GML.LineStringNode", function () {
  var parser;
  before(function () {
    parser = new L.GML.LineStringNode();
  });

  it('should parse gml:LineString element', function () {
    expect(parser.elementTag).to.equal('gml:LineString');
  });

  it('should return array object', function () {
    var element = parseXml('<gml:LineString></gml:LineString>');
    var coordinates = [[0, 0], [1, 1]];
    var parentParse = sinon.stub(L.GML.PointSequence.prototype, 'parse').returns(coordinates);
    var result = parser.parse(element);
    expect(result).to.be.instanceOf(Array);
    expect(result).to.deep.equal(coordinates);
    parentParse.restore();
  });
});
