describe('Filter.BinarySpatial', function () {
  var geometryField;
  var layer;

  before(function () {
      layer = { toGml: function () { } };
      geometryField = 'geom';
      sinon.stub(layer, 'toGml').returns(document.createElement('test'));
  });

  describe('Equals', function () {
    it('should return element with tagName ogc:Equals', function () {
      var filter = new L.Filter.Equals(geometryField, layer);
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('ogc:Equals');
    });
  });

  describe('Disjoint', function () {
    it('should return element with tagName ogc:Disjoint', function () {
      var filter = new L.Filter.Disjoint(geometryField, layer);
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('ogc:Disjoint');
    });
  });

  describe('Touches', function () {
    it('should return element with tagName ogc:Touches', function () {
      var filter = new L.Filter.Touches(geometryField, layer);
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('ogc:Touches');
    });
  });

  describe('Within', function () {
    it('should return element with tagName ogc:Within', function () {
      var filter = new L.Filter.Within(geometryField, layer);
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('ogc:Within');
    });
  });

  describe('Overlaps', function () {
    it('should return element with tagName ogc:Overlaps', function () {
      var filter = new L.Filter.Overlaps(geometryField, layer);
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('ogc:Overlaps');
    });
  });

  describe('Crosses', function () {
    it('should return element with tagName ogc:Crosses', function () {
      var filter = new L.Filter.Crosses(geometryField, layer);
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('ogc:Crosses');
    });
  });

  describe('Intersects', function () {
    it('should return element with tagName ogc:Intersects', function () {
      var filter = new L.Filter.Intersects(geometryField, layer);
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('ogc:Intersects');
    });
  });

  describe('Contains', function () {
    it('should return element with tagName ogc:Contains', function () {
      var filter = new L.Filter.Contains(geometryField, layer);
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('ogc:Contains');
    });
  });
});
