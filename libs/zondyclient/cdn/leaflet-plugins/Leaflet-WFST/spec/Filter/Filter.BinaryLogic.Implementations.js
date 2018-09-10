describe('Filter.BinaryLogic', function() {
  describe('And', function() {
    it('must return element with tagName "and"', function() {
      var filter = L.Filter.and();
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('And');
    });
  });

  describe('Or', function() {
    it('must return element with tagName "or"', function() {
      var filter = L.Filter.or();
      var filterElement = filter.toGml();
      expect(filterElement.tagName).to.be.equal('Or');
    });
  });
});
