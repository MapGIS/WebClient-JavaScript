/**
 * Created by PRadostev on 10.06.2015.
 */

describe("L.Format.Sheme", function () {
  //it describers parser for DescribeFeatureType WFS request
  var parser;

  before(function () {
    parser = new L.Format.Scheme();
  });

  it('should return L.GML.FeatureType object', function () {
    var element = parseXml('<element/>');
    var stub = sinon.stub(Element.prototype, 'getElementsByTagNameNS').returns([element]);
    var result = parser.parse(element);
    expect(result).to.be.instanceOf(L.GML.FeatureType);
    stub.restore();
  });
});
