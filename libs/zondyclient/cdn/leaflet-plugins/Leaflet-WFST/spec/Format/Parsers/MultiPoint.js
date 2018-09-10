/**
 * Created by PRadostev on 10.06.2015.
 */

describe("L.GML.MultiPoint", function () {
  var parser;

  before(function () {
    parser = new L.GML.MultiPoint();
  });

  it('should parse gml:MultiPoint element', function () {
    expect(parser.elementTag).to.equal('gml:MultiPoint');
  });

  it('should know how parse gml:Point', function () {
    var child = parser.parsers['gml:Point'];
    expect(child).to.be.instanceOf(L.GML.PointNode);
  });

  it('should return L.FeatureGroup object', function () {
    var stub = sinon.stub(L.GML.MultiGeometry.prototype, 'parse').returns([[0, 0]]);
    var result = parser.parse({});
    expect(result).to.be.instanceOf(L.FeatureGroup);
    stub.restore();
  });
});
