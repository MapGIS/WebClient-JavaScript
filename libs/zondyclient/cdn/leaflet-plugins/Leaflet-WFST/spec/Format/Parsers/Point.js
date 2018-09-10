/**
 * Created by PRadostev on 05.06.2015.
 */

describe("L.GML.Point", function () {
  it('should return L.Market object', function () {
    var pointXml = '<gml:Point srsDimension="2"></gml:Point>';
    var pointElement = parseXml(pointXml);
    var parser = new L.GML.Point();
    var parentParse = sinon.stub(L.GML.PointNode.prototype, 'parse').returns([0, 0]);
    var latLngs = [1, 1];
    var transform = sinon.stub(parser, 'transform').returns(latLngs);
    var layer = parser.parse(pointElement);
    expect(layer).to.be.instanceOf(L.Marker);
    expect(layer.getLatLng()).to.be.deep.equal(L.latLng(latLngs));
    transform.restore();
    parentParse.restore();
  });
});
