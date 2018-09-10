/**
 * Created by PRadostev on 02.06.2015.
 */

describe("L.Polygon.toGml()", function () {
  var polygon, polygonGml;
  beforeEach(function () {
    polygon = new L.Polygon(
      [
        [
          [
            [-10, -10],
            [-10, 10],
            [10, 10],
            [10, -10]
          ],
          [
            [-1, -1],
            [-1, 1],
            [1, 1],
            [1, -1]
          ]
        ]
      ]);
    polygonGml = polygon.toGml(L.CRS.Simple);
  });

  it('should be not empty', function () {
    expect(polygon.getLatLngs().length).to.be.greaterThan(0);
  });

  it('should return Element object with tagName gml:Polygon', function () {
    expect(polygonGml).to.be.instanceOf(Element);
    expect(polygonGml.tagName).to.be.equal('gml:Polygon');
  });

  it('should have first child element gml:exterior with child element gml:LinearRing', function () {
    var exterior = polygonGml.firstChild;
    expect(exterior.tagName).to.be.equal('gml:exterior');

    var linearRing = exterior.firstChild;
    expect(linearRing.tagName).to.be.equal('gml:LinearRing');
  });

  it('may have child elements gml:interior with child element gml:LinearRing', function () {
    var interiors = polygonGml.getElementsByTagName('gml:interior');
    for (var i = 0; i < interiors.length; i++) {
      var interior = interiors[i];
      var linearRing = interior.firstChild;
      expect(linearRing.tagName).to.be.equal('gml:LinearRing');
    }
  });
});
