describe('Filter.DistanceBuffer', function () {
  var geometryField;
  var layer;

  before(function () {
      layer = { toGml: function () { } };
      geometryField = 'geom';
      sinon.stub(layer, 'toGml').returns(document.createElement('test'));
  });

  describe('DWithin', function () {
    it('should return element with tagName ogc:DWithin', function () {
      var filter = new L.Filter.DWithin(geometryField, layer);
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('ogc:DWithin');
    });
  });

  describe('Beyond', function () {
    it('should return element with tagName ogc:Beyond', function () {
      var filter = new L.Filter.Beyond(geometryField, layer);
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('ogc:Beyond');
    });
  });
});
