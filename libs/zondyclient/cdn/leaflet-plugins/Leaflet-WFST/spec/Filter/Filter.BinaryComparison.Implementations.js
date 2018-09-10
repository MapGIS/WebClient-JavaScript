describe('Filter.BinaryComparison', function() {
  describe('EQ', function() {
    it('should return element with tagName ogc:PropertyIsEqualTo', function () {
      var filter = new L.Filter.EQ();
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('ogc:PropertyIsEqualTo');
    });
  });

  describe('NotEQ', function() {
    it('should return element with tagName ogc:PropertyIsNotEqualTo', function () {
      var filter = new L.Filter.NotEQ();
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('ogc:PropertyIsNotEqualTo');
    });
  });

  describe('LT', function() {
    it('should return element with tagName ogc:PropertyIsLessThan', function () {
      var filter = new L.Filter.LT();
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('ogc:PropertyIsLessThan');
    });
  });

  describe('GT', function() {
    it('should return element with tagName ogc:PropertyIsGreaterThan', function () {
      var filter = new L.Filter.GT();
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('ogc:PropertyIsGreaterThan');
    });
  });

  describe('LEQ', function() {
    it('should return element with tagName ogc:PropertyIsLessThanOrEqualTo', function () {
      var filter = new L.Filter.LEQ();
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('ogc:PropertyIsLessThanOrEqualTo');
    });
  });

  describe('GEQ', function() {
    it('should return element with tagName ogc:PropertyIsGreaterThanOrEqualTo', function () {
      var filter = new L.Filter.GEQ();
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('ogc:PropertyIsGreaterThanOrEqualTo');
    });
  });
});
