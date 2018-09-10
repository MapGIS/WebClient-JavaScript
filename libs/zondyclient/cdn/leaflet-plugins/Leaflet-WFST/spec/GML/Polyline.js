/**
 * Created by PRadostev on 02.06.2015.
 */

describe("L.Polyline.toGml()", function () {
  var polyline, polylineGml;
  beforeEach(function () {
    polyline = new L.Polyline(
      [
        [-10, -10],
        [-10, 10],
        [10, 10],
        [10, -10]
      ]);
    polylineGml = polyline.toGml(L.CRS.Simple);
  });

  it('should be not empty', function () {
    expect(polyline.getLatLngs().length).to.be.greaterThan(0);
  });

  it('should return Element object with tagName gml:LineString', function () {
    expect(polylineGml).to.be.instanceOf(Element);
    expect(polylineGml.tagName).to.be.equal('gml:LineString');
  });

  it('should have first child element gml:posList', function () {
    var posList = polylineGml.firstChild;
    expect(posList.tagName).to.be.equal('gml:posList');
  });
});
