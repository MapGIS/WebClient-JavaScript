/**
 * Created by PRadostev on 02.06.2015.
 */

describe("L.Marker.toGml()", function () {
  it('should return Element object with tagName "gml:Point"', function () {
    var marker = new L.Marker([0, 0]);
    var result = marker.toGml(L.CRS.Simple);
    expect(result).to.be.instanceOf(Element);
    expect(result.tagName).to.be.equal('gml:Point');
  });
});
