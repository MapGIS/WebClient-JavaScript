describe('Filter.BBOX', function () {
  var filter;
  var bounds;
  var geometryField;
  var crs;

  before(function () {

    bounds = L.latLngBounds([40.712, -74.227], [40.774, -74.125]);
    geometryField = 'geom';
    crs = L.CRS.EPSG4326;

    filter = new L.Filter.BBox(geometryField, bounds, crs);
  });

  describe('#toGml', function () {
    var bboxElement;

    before(function () {
      bboxElement = filter.toGml();
    });

    it('must have first child element with tagName = ogc:BBOX', function () {
      expect(bboxElement.tagName).to.be.equal('ogc:BBOX');
    });

    it('must have first child element with tagName = ogc:PropertyName & content = geom', function () {
      var propertyNameElement = bboxElement.firstChild;

      expect(propertyNameElement.tagName).to.be.equal('ogc:PropertyName');
      expect(propertyNameElement.textContent).to.be.equal(geometryField);
    });

    it('must have last child element describing bounding box geometry', function () {
      var envelopeElement = bboxElement.lastChild;

      expect(envelopeElement.outerHTML).to.be.equal(bounds.toGml(crs).outerHTML);
    });
  });
});
