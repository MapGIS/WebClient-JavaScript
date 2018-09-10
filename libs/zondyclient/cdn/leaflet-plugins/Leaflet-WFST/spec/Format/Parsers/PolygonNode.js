/**
 * Created by PRadostev on 11.08.2015.
 */

describe("L.GML.PolygonNode", function () {
  var parser;

  before(function () {
    parser = new L.GML.PolygonNode();
  });

  it('should parse gml:Polygon element', function () {
    expect(parser.elementTag).to.equal('gml:Polygon');
  });

  it('should return array object', function () {
    var element = parseXml('<gml:Polygon></gml:Polygon>');
    var result = parser.parse(element);
    expect(result).to.be.instanceOf(Array);
  });

  it('linearRingParser.parse should have been called for each exterior and interior element', function () {
    var polygonElement = parseXml('<gml:Polygon><gml:exterior><exterior /></gml:exterior>' +
    '<gml:interior><interior /></gml:interior>' +
    '<gml:interior><interior /></gml:interior>' +
    '</gml:Polygon>');
    var stub = sinon.stub(parser.linearRingParser, 'parse').returns([]);
    parser.parse(polygonElement);
    expect(stub).have.been.calledThrice;
  });

});
