/**
 * Created by PRadostev on 09.06.2015.
 */

describe("L.GML.AbstractMultiPolyline", function () {
  var parser;

  before(function () {
    parser = new L.GML.AbstractMultiPolyline();
  });

  it('should return L.Polyline object', function () {
    var stub = sinon.stub(L.GML.MultiGeometry.prototype, 'parse').returns([[0, 0], [1, 0], [1, 1], [0, 1]]);
    var result = parser.parse({});
    expect(result).to.be.instanceOf(L.Polyline);
    stub.restore();
  });
});
